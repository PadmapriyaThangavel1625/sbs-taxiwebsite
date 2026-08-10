
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cities } from "@/app/data/cities";

export default function CityDestinations() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [currentSpot, setCurrentSpot] = useState(0);

  const handleCityChange = (city: (typeof cities)[number]) => {
    setSelectedCity(city);
    setCurrentSpot(0);
  };

  const nextSpot = () => {
    setCurrentSpot((prev) =>
      prev === selectedCity.touristSpots.length - 1 ? 0 : prev + 1
    );
  };

  const previousSpot = () => {
    setCurrentSpot((prev) =>
      prev === 0 ? selectedCity.touristSpots.length - 1 : prev - 1
    );
  };

  const spot = selectedCity.touristSpots[currentSpot];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Popular Destinations
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Cab Booking From Coimbatore
          </h2>

          <p className="mt-4 text-gray-600">
            Select a city to view tourist places, distance, travel time and
            estimated cab fare.
          </p>
        </div>

        {/* City Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {cities.map((city) => {
            const active = selectedCity.slug === city.slug;

            return (
              <button
                key={city.slug}
                onClick={() => handleCityChange(city)}
                className={`rounded-full border px-6 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white shadow-md"
                    : "border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>

        {/* Selected City */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

          {/* Header */}
          <div className="bg-blue-600 p-6 text-white md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <MapPin size={22} />

                  <span className="text-sm font-medium">
                    Erode → {selectedCity.name}
                  </span>
                </div>

                <h3 className="text-3xl font-bold md:text-4xl">
                  {selectedCity.name} Cab Booking
                </h3>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-bold text-gray-900 transition hover:bg-yellow-300">
                Book Cab
                <ArrowRight size={18} />
              </button>

            </div>
          </div>

          {/* City Information */}
          <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">

            {/* Fare */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                  <IndianRupee size={20} />
                </div>

                <span className="font-semibold text-gray-700">
                  One-Way Fare
                </span>
              </div>

              <p className="text-3xl font-bold text-gray-900">
                {selectedCity.fare}
              </p>
            </div>

            {/* Distance */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <MapPin size={20} />
                </div>

                <span className="font-semibold text-gray-700">
                  Distance
                </span>
              </div>

              <p className="text-3xl font-bold text-gray-900">
                {selectedCity.distance}
              </p>
            </div>

            {/* Travel Time */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                  <Clock size={20} />
                </div>

                <span className="font-semibold text-gray-700">
                  Travel Time
                </span>
              </div>

              <p className="text-3xl font-bold text-gray-900">
                {selectedCity.travelTime}
              </p>
            </div>
          </div>

          {/* Tourist Spots Slider */}
          <div className="border-t border-gray-200 p-6 md:p-8">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Tourist Places in {selectedCity.name}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Popular places to visit
                </p>
              </div>

              {/* Desktop arrows */}
              <div className="hidden gap-2 sm:flex">
                <button
                  onClick={previousSpot}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextSpot}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Slider */}
            <div className="relative overflow-hidden rounded-2xl">

              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSpot * 100}%)`,
                }}
              >
                {selectedCity.touristSpots.map((place) => (
                  <div
                    key={place.name}
                    className="w-full shrink-0"
                  >
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                      {/* Image */}
                      <div className="relative h-72 w-full">
                        <Image
                          src={place.image}
                          alt={place.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 1200px"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                          <h5 className="text-2xl font-bold text-white">
                            {place.name}
                          </h5>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin
                            size={17}
                            className="text-blue-600"
                          />

                          {selectedCity.name}
                        </div>

                        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                          Book Cab
                          <ArrowRight size={17} />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Mobile arrows */}
            <div className="mt-4 flex justify-center gap-3 sm:hidden">
              <button
                onClick={previousSpot}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSpot}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-5 flex justify-center gap-2">
              {selectedCity.touristSpots.map((place, index) => (
                <button
                  key={place.name}
                  onClick={() => setCurrentSpot(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSpot
                      ? "w-7 bg-blue-600"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Show ${place.name}`}
                />
              ))}
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="border-t border-gray-200 bg-gray-50 p-6 md:p-8">
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  Planning a trip to {selectedCity.name}?
                </h4>

                <p className="mt-1 text-gray-600">
                  Book a comfortable and reliable SBS Taxi.
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700">
                Book {selectedCity.name} Cab
                <ArrowRight size={18} />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
