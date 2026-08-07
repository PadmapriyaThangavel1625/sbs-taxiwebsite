"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Chennai Office
const office: [number, number] = [13.0827, 80.2707];

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

function FlyToLocation({
  position,
}: {
  position: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15, {
      duration: 1.5,
    });
  }, [position, map]);

  return null;
}

export default function LeafletMap() {
  const [userLocation, setUserLocation] =
    useState<[number, number]>(office);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      () => {
        console.log("Using office location.");
      }
    );
  }, []);

  return (
    <MapContainer
      center={userLocation}
      zoom={14}
      scrollWheelZoom
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <ResizeMap />

      <FlyToLocation position={userLocation} />

      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Location */}
      <Marker position={userLocation}>
        <Popup>Your Current Location</Popup>
      </Marker>

      {/* SBS Office */}
      <Marker position={office}>
        <Popup>
          <strong>SBS Taxi Office</strong>
          <br />
          123, Anna Salai,
          <br />
          Chennai - 600002
        </Popup>
      </Marker>
    </MapContainer>
  );
}