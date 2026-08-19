"use client";

import { useEffect } from "react";
import type { PlaceData } from "./PlaceSearch";

interface Props {
  setLocation: (location: [number, number]) => void;
  onLocation: (place: PlaceData) => void;
}

export default function CurrentLocation({
  setLocation,
  onLocation,
}: Props) {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation([latitude, longitude]);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                "Accept-Language": "en",
                "User-Agent": "SBS-Taxi-App",
              },
            }
          );

          const data = await response.json();

          onLocation({
            name: data.display_name,
            latitude,
            longitude,
          });
        } catch (error) {
          console.log("Reverse geocoding failed", error);

          onLocation({
            name: "Current Location",
            latitude,
            longitude,
          });
        }
      },
      (error) => {
        console.log("Location error", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  }, [setLocation, onLocation]);

  return null;
}