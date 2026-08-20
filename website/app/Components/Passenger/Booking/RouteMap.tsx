"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

/* ============================================================
   TYPES
============================================================ */

interface LocationData {
  name?: string;
  latitude?: number;
  longitude?: number;
}

interface RouteMapProps {
  pickup: LocationData | null;
  drop: LocationData | null;
  currentLocation: [number, number] | null;
  setDistanceKm: (distance: number) => void;
}

/* ============================================================
   LEAFLET ICON FIX
============================================================ */

const pickupIcon = L.divIcon({
  className: "sbs-map-marker",
  html: `
    <div
      style="
        width: 38px;
        height: 38px;
        border-radius: 50% 50% 50% 0;
        background: #123f80;
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        style="
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
        "
      ></div>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const dropIcon = L.divIcon({
  className: "sbs-map-marker",
  html: `
    <div
      style="
        width: 38px;
        height: 38px;
        border-radius: 50% 50% 50% 0;
        background: #dc2626;
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        style="
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
        "
      ></div>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const currentIcon = L.divIcon({
  className: "sbs-map-marker",
  html: `
    <div
      style="
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #2563eb;
        border: 4px solid white;
        box-shadow:
          0 0 0 7px rgba(37,99,235,0.18),
          0 4px 12px rgba(0,0,0,0.25);
      "
    ></div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

/* ============================================================
   ROUTE DISTANCE
============================================================ */

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadiusKm = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
}

/* ============================================================
   MAP FITTER
============================================================ */

function MapController({
  pickup,
  drop,
  currentLocation,
}: {
  pickup: LocationData | null;
  drop: LocationData | null;
  currentLocation: [number, number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = [];

    if (
      pickup?.latitude != null &&
      pickup?.longitude != null
    ) {
      points.push([
        pickup.latitude,
        pickup.longitude,
      ]);
    }

    if (
      drop?.latitude != null &&
      drop?.longitude != null
    ) {
      points.push([
        drop.latitude,
        drop.longitude,
      ]);
    }

    if (points.length === 0 && currentLocation) {
      map.setView(currentLocation, 14);
      return;
    }

    if (points.length === 1) {
      map.setView(points[0], 14);
      return;
    }

    if (points.length >= 2) {
      const bounds =
        L.latLngBounds(points);

      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 14,
      });
    }
  }, [
    map,
    pickup?.latitude,
    pickup?.longitude,
    drop?.latitude,
    drop?.longitude,
    currentLocation,
  ]);

  return null;
}

/* ============================================================
   MAP RESIZE FIX
============================================================ */

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [map]);

  return null;
}

/* ============================================================
   MAP CONTENT
============================================================ */

function RouteMapContent({
  pickup,
  drop,
  currentLocation,
  setDistanceKm,
}: RouteMapProps) {
  const [route, setRoute] = useState<
    [number, number][]
  >([]);

  const pickupPosition = useMemo<
    [number, number] | null
  >(() => {
    if (
      pickup?.latitude == null ||
      pickup?.longitude == null
    ) {
      return null;
    }

    return [
      pickup.latitude,
      pickup.longitude,
    ];
  }, [
    pickup?.latitude,
    pickup?.longitude,
  ]);

  const dropPosition = useMemo<
    [number, number] | null
  >(() => {
    if (
      drop?.latitude == null ||
      drop?.longitude == null
    ) {
      return null;
    }

    return [
      drop.latitude,
      drop.longitude,
    ];
  }, [
    drop?.latitude,
    drop?.longitude,
  ]);

  /* ==========================================================
     CALCULATE DISTANCE
  ========================================================== */

  useEffect(() => {
    if (
      !pickupPosition ||
      !dropPosition
    ) {
      setDistanceKm(0);
      return;
    }

    const distance = calculateDistance(
      pickupPosition[0],
      pickupPosition[1],
      dropPosition[0],
      dropPosition[1]
    );

    setDistanceKm(distance);
  }, [
    pickupPosition,
    dropPosition,
    setDistanceKm,
  ]);

  /* ==========================================================
     DRAW ROUTE
  ========================================================== */

  useEffect(() => {
    if (
      !pickupPosition ||
      !dropPosition
    ) {
      setRoute([]);
      return;
    }

    /*
      Simple visual route line.

      This avoids another routing dependency and
      keeps the map stable.

      The fare distance is calculated separately.
    */

    setRoute([
      pickupPosition,
      dropPosition,
    ]);
  }, [
    pickupPosition,
    dropPosition,
  ]);

  /* ==========================================================
     DEFAULT CENTER
  ========================================================== */

  const defaultCenter: [
    number,
    number
  ] = pickupPosition ??
    dropPosition ??
    currentLocation ?? [
      11.341,
      77.7172,
    ];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={true}
      attributionControl={true}
      className="h-[420px] w-full sm:h-[500px]"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        pickup={pickup}
        drop={drop}
        currentLocation={currentLocation}
      />

      <MapResizeHandler />

      {/* ======================================================
          CURRENT LOCATION
      ====================================================== */}

      {currentLocation && (
        <Marker
          position={currentLocation}
          icon={currentIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold">
                Current Location
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Your detected GPS location
              </p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* ======================================================
          PICKUP
      ====================================================== */}

      {pickupPosition && (
        <Marker
          position={pickupPosition}
          icon={pickupIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                Pickup
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {pickup?.name ||
                  "Pickup Location"}
              </p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* ======================================================
          DROP
      ====================================================== */}

      {dropPosition && (
        <Marker
          position={dropPosition}
          icon={dropIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="text-xs font-bold uppercase tracking-wide text-red-600">
                Destination
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {drop?.name ||
                  "Destination"}
              </p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* ======================================================
          ROUTE
      ====================================================== */}

      {route.length === 2 && (
        <Polyline
          positions={route}
          pathOptions={{
            color: "#123f80",
            weight: 5,
            opacity: 0.85,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}
    </MapContainer>
  );
}

/* ============================================================
   ROUTE MAP
============================================================ */

function RouteMap({
  pickup,
  drop,
  currentLocation,
  setDistanceKm,
}: RouteMapProps) {
  /*
    IMPORTANT:

    The key changes only when the actual map locations
    change.

    This prevents React/Leaflet from attempting to reuse
    the same Leaflet container after Fast Refresh/remount.
  */

  const mapKey = useMemo(() => {
    const pickupKey =
      pickup?.latitude != null &&
      pickup?.longitude != null
        ? `${pickup.latitude}-${pickup.longitude}`
        : "no-pickup";

    const dropKey =
      drop?.latitude != null &&
      drop?.longitude != null
        ? `${drop.latitude}-${drop.longitude}`
        : "no-drop";

    const currentKey =
      currentLocation
        ? `${currentLocation[0]}-${currentLocation[1]}`
        : "no-current";

    return `sbs-route-map-${pickupKey}-${dropKey}-${currentKey}`;
  }, [
    pickup?.latitude,
    pickup?.longitude,
    drop?.latitude,
    drop?.longitude,
    currentLocation,
  ]);

  /*
    Important CSS cleanup.

    Leaflet stores `_leaflet_id` on the map DOM element.
    If a development remount happens before React-Leaflet
    finishes cleaning it, the next map can see the old ID.

    The wrapper below gives Leaflet a fresh DOM node.
  */

  return (
    <div
      key={mapKey}
      className="relative h-[420px] w-full sm:h-[500px]"
    >
      <RouteMapContent
        key={`content-${mapKey}`}
        pickup={pickup}
        drop={drop}
        currentLocation={currentLocation}
        setDistanceKm={setDistanceKm}
      />
    </div>
  );
}

/* ============================================================
   DYNAMIC EXPORT
============================================================ */

export default dynamic(
  () =>
    Promise.resolve(RouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full items-center justify-center rounded-3xl bg-slate-100 sm:h-[500px]">
        <div className="text-sm font-semibold text-slate-500">
          Loading map...
        </div>
      </div>
    ),
  }
);