"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import {
  useEffect,
  useMemo,
} from "react";

// =====================================================
// TYPES
// =====================================================

type Coordinates = {
  lat: number;
  lng: number;
};

type Spot = {
  name: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
};

type Destination = {
  name: string;
  km: string;
  price: string;
  image: string;
  spots: readonly Spot[];
  route: {
    start: Coordinates;
    destination: Coordinates;
    touristPlaces: Array<
      Coordinates & {
        name: string;
      }
    >;
  };
};

type Props = {
  city: Destination;
  selectedSpotIndex: number;
};

// =====================================================
// ERODE
// =====================================================

const ERODE: Coordinates = {
  lat: 11.341036,
  lng: 77.717164,
};

// =====================================================
// DEFAULT ICON
// =====================================================

const createIcon = (
  color: string,
  size: number = 32
) => {
  return L.divIcon({
    className:
      "custom-route-marker",

    html: `
      <div
        style="
          width:${size}px;
          height:${size}px;
          border-radius:50% 50% 50% 0;
          background:${color};
          border:3px solid white;
          box-shadow:0 3px 10px rgba(0,0,0,.35);
          transform:rotate(-45deg);
          display:flex;
          align-items:center;
          justify-content:center;
        "
      >
        <div
          style="
            width:${size / 3}px;
            height:${size / 3}px;
            border-radius:50%;
            background:white;
          "
        ></div>
      </div>
    `,

    iconSize: [
      size,
      size,
    ],

    iconAnchor: [
      size / 2,
      size,
    ],

    popupAnchor: [
      0,
      -size,
    ],
  });
};

// =====================================================
// MAP FIT
// Initial city view
// =====================================================

function MapFit({
  points,
}: {
  points: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const bounds =
      L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [map, points]);

  return null;
}

// =====================================================
// FOCUS SELECTED TOURIST SPOT
// =====================================================

function FocusSelectedSpot({
  spot,
}: {
  spot: Coordinates | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!spot) return;

    map.flyTo(
      [
        spot.lat,
        spot.lng,
      ],
      14,
      {
        duration: 1.2,
        easeLinearity: 0.25,
      }
    );
  }, [map, spot]);

  return null;
}

// =====================================================
// MAP COMPONENT
// =====================================================

export default function DestinationRouteMap({
  city,
  selectedSpotIndex,
}: Props) {

  // ===================================================
  // DESTINATION FROM CONFIG
  // ===================================================

  const destination =
    city.route?.destination;

  // ===================================================
  // TOURIST SPOTS
  // Coordinates now come directly from config
  // ===================================================

  const spotPoints = useMemo(() => {
    return city.spots
      .map((spot) => ({
        ...spot,

        coordinate: {
          lat: spot.lat,
          lng: spot.lng,
        },
      }))
      .filter(
        (spot) =>
          Number.isFinite(
            spot.coordinate.lat
          ) &&
          Number.isFinite(
            spot.coordinate.lng
          )
      );
  }, [city.spots]);

  // ===================================================
  // SELECTED TOURIST SPOT
  // ===================================================

  const selectedSpot =
    spotPoints[
      selectedSpotIndex
    ]?.coordinate ?? null;

  // ===================================================
  // ROUTE POINTS
  // ===================================================

  const routePoints = useMemo(() => {
    if (!destination) {
      return [];
    }

    return [
      [
        ERODE.lat,
        ERODE.lng,
      ] as [number, number],

      [
        destination.lat,
        destination.lng,
      ] as [number, number],

      ...spotPoints.map(
        (spot) =>
          [
            spot.coordinate.lat,
            spot.coordinate.lng,
          ] as [number, number]
      ),
    ];
  }, [
    destination,
    spotPoints,
  ]);

  // ===================================================
  // NO COORDINATES
  // ===================================================

  if (!destination) {
    return (
      <div
        className="
          flex
          h-[500px]
          items-center
          justify-center
          rounded-2xl
          bg-gray-100
          text-sm
          text-gray-500
        "
      >
        Map coordinates not available for{" "}
        {city.name}.
      </div>
    );
  }

  // ===================================================
  // MAP
  // ===================================================

  return (
    <div
      className="
        relative
        z-0
        h-[500px]
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        shadow-md
      "
    >
      <MapContainer
        center={[
          destination.lat,
          destination.lng,
        ]}
        zoom={8}
        scrollWheelZoom={true}
        className="h-full w-full"
      >

        {/* =================================================
            OPENSTREETMAP
        ================================================== */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* =================================================
            INITIAL VIEW
        ================================================== */}

        <MapFit
          points={routePoints}
        />

        {/* =================================================
            WHEN SLIDER CHANGES:
            ZOOM TO SELECTED TOURIST PLACE
        ================================================== */}

        <FocusSelectedSpot
          spot={selectedSpot}
        />

        {/* =================================================
            ERODE START
        ================================================== */}

        <Marker
          position={[
            ERODE.lat,
            ERODE.lng,
          ]}
          icon={createIcon(
            "#16a34a",
            38
          )}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="font-bold">
                Erode
              </h3>

              <p className="text-sm text-gray-600">
                SBS Taxi Starting Point
              </p>
            </div>
          </Popup>
        </Marker>

        {/* =================================================
            DESTINATION
        ================================================== */}

        <Marker
          position={[
            destination.lat,
            destination.lng,
          ]}
          icon={createIcon(
            "#dc2626",
            38
          )}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold">
                {city.name}
              </h3>

              <p className="text-sm text-gray-600">
                Destination
              </p>

              <p className="mt-1 font-semibold">
                {city.km} • ₹
                {city.price}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* =================================================
            TOURIST PLACE MARKERS
        ================================================== */}

        {spotPoints.map(
          (spot, index) => {

            const isSelected =
              index ===
              selectedSpotIndex;

            return (
              <Marker
                key={spot.name}
                position={[
                  spot.coordinate.lat,
                  spot.coordinate.lng,
                ]}
                icon={createIcon(
                  isSelected
                    ? "#f59e0b"
                    : "#0066ff",
                  isSelected
                    ? 40
                    : 32
                )}
              >
                <Popup>
                  <div className="w-[220px]">
                    <h3 className="font-bold text-gray-900">
                      {index + 1}.{" "}
                      {spot.name}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-600">
                      {spot.description}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          }
        )}

        {/* =================================================
            ROUTE LINE
        ================================================== */}

        {routePoints.length > 1 && (
          <Polyline
            positions={routePoints}
            pathOptions={{
              color: "#0066ff",
              weight: 5,
              opacity: 0.8,
              dashArray: "10 8",
            }}
          />
        )}

      </MapContainer>

      {/* =================================================
          MAP LEGEND
      ================================================== */}

      <div
        className="
          absolute
          bottom-4
          left-4
          z-[1000]
          rounded-xl
          bg-white/95
          p-4
          shadow-lg
          backdrop-blur
        "
      >
        <div className="space-y-2 text-xs">

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-600" />

            <span>
              Erode - Start
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-600" />

            <span>
              {city.name} - Destination
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />

            <span>
              Tourist Places
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />

            <span>
              Selected Place
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}