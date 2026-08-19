"use client";

import { useEffect, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

export interface PlaceData {
  name: string;
  latitude: number;
  longitude: number;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface PlaceSearchProps {
  label: string;
  placeholder: string;
  value?: PlaceData | null;
  onSelect: (place: PlaceData) => void;
}

export default function PlaceSearch({
  label,
  placeholder,
  value,
  onSelect,
}: PlaceSearchProps) {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Show current location or selected place in the input
  useEffect(() => {
    if (value) {
      setQuery(value.name);
    }
  }, [value]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setPlaces([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5&addressdetails=1&accept-language=en`,
          {
            signal: controller.signal,
            headers: {
              "Accept-Language": "en",
              "User-Agent": "SBS-Taxi-App",
            },
          }
        );

        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.log("Search error", error);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="relative w-full">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          outline-none
          focus:border-blue-600
          focus:ring-2
          focus:ring-blue-200
        "
      />

      {loading && (
        <Loader2
          className="
            absolute
            right-4
            top-12
            h-5
            w-5
            animate-spin
            text-blue-600
          "
        />
      )}

      {places.length > 0 && (
        <div
          className="
            absolute
            z-50
            mt-2
            max-h-72
            w-full
            overflow-y-auto
            rounded-xl
            border
            bg-white
            shadow-xl
          "
        >
          {places.map((place, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                const selected: PlaceData = {
                  name: place.display_name,
                  latitude: Number(place.lat),
                  longitude: Number(place.lon),
                };

                setQuery(place.display_name);
                setPlaces([]);
                onSelect(selected);
              }}
              className="
                flex
                w-full
                gap-3
                border-b
                px-4
                py-3
                text-left
                hover:bg-gray-100
              "
            >
              <MapPin
                className="
                  mt-1
                  h-5
                  w-5
                  text-red-500
                "
              />

              <div>
                <p
                  className="
                    line-clamp-2
                    text-sm
                    font-medium
                    text-gray-800
                  "
                >
                  {place.display_name}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                  "
                >
                  {place.lat}, {place.lon}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}