"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { PlaceData } from "./PlaceSearch";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  pickup: PlaceData | null;
  drop: PlaceData | null;
  currentLocation: [number, number] | null;
  setDistanceKm: (distance: number) => void;
}

// Separate interface for FitBounds
interface FitBoundsProps {
  pickup: PlaceData | null;
  drop: PlaceData | null;
  currentLocation: [number, number] | null;
}

function FitBounds({
  pickup,
  drop,
  currentLocation,
}: FitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = [];

    if (currentLocation) {
      points.push(currentLocation);
    }

    if (pickup) {
      points.push([
        pickup.latitude,
        pickup.longitude,
      ]);
    }

    if (drop) {
      points.push([
        drop.latitude,
        drop.longitude,
      ]);
    }

    if (points.length > 0) {
      map.fitBounds(points, {
        padding: [50, 50],
      });
    }
  }, [
    pickup,
    drop,
    currentLocation,
    map,
  ]);

  return null;
}

export default function RouteMap({
  pickup,
  drop,
  currentLocation,
  setDistanceKm,
}: Props) {
  const [route, setRoute] = useState<
    [number, number][]
  >([]);

  const [distance, setDistance] =
    useState("");

  const [duration, setDuration] =
    useState("");

  useEffect(() => {
    if (!pickup || !drop) {
      setRoute([]);
      setDistance("");
      setDuration("");
      setDistanceKm(0);
      return;
    }

    // TypeScript-safe references
    const currentPickup = pickup;
    const currentDrop = drop;

    async function getRoute() {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${currentPickup.longitude},${currentPickup.latitude};${currentDrop.longitude},${currentDrop.latitude}?overview=full&geometries=geojson`;

        const response = await fetch(url);

        const data = await response.json();

        if (data.routes?.length) {
          const routeData = data.routes[0];

          const coords =
            routeData.geometry.coordinates.map(
              (item: number[]) =>
                [
                  item[1],
                  item[0],
                ] as [number, number]
            );

          setRoute(coords);

          const km = Number(
            (
              routeData.distance / 1000
            ).toFixed(2)
          );

          setDistance(`${km} km`);

          // Send distance to BookingPage
          setDistanceKm(km);

          const mins = Math.round(
            routeData.duration / 60
          );

          setDuration(`${mins} mins`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getRoute();
  }, [
    pickup,
    drop,
    setDistanceKm,
  ]);
    return (
    <div className="space-y-4">
      <div className="h-[500px] overflow-hidden rounded-xl border shadow">
        <MapContainer
          center={
            currentLocation ?? [11.341036, 77.717164]
          }
          zoom={13}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds
            pickup={pickup}
            drop={drop}
            currentLocation={currentLocation}
          />

          {currentLocation && (
            <CircleMarker
              center={currentLocation}
              radius={10}
              pathOptions={{
                color: "#2563eb",
                fillColor: "#2563eb",
                fillOpacity: 1,
              }}
            >
              <Popup>Current Location</Popup>
            </CircleMarker>
          )}

          {pickup && (
            <Marker
              position={[
                pickup.latitude,
                pickup.longitude,
              ]}
            >
              <Popup>
                <b>Pickup</b>
                <br />
                {pickup.name}
              </Popup>
            </Marker>
          )}

          {drop && (
            <Marker
              position={[
                drop.latitude,
                drop.longitude,
              ]}
            >
              <Popup>
                <b>Drop</b>
                <br />
                {drop.name}
              </Popup>
            </Marker>
          )}

          {route.length > 0 && (
            <Polyline
              positions={route}
              pathOptions={{
                color: "#2563eb",
                weight: 5,
              }}
            />
          )}
        </MapContainer>
      </div>

      {distance && (
        <div className="rounded-xl border bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">
            Trip Details
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Distance
              </p>
              <p className="text-lg font-bold">
                {distance}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Estimated Time
              </p>
              <p className="text-lg font-bold">
                {duration}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}