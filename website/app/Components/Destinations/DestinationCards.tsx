"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  IndianRupee,
} from "lucide-react";

import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

// =====================================================
// LEAFLET MAP - CLIENT ONLY
// =====================================================

const DestinationRouteMap = dynamic(
  () => import("./DestinationRouteMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full items-center justify-center rounded-2xl bg-gray-100">
        <div className="text-sm text-gray-500">
          Loading map...
        </div>
      </div>
    ),
  }
);

// =====================================================
// TYPES
// =====================================================

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
    start: {
      lat: number;
      lng: number;
    };
    destination: {
      lat: number;
      lng: number;
    };
    touristPlaces: Array<{
      name: string;
      lat: number;
      lng: number;
    }>;
  };
};

// =====================================================
// DESTINATIONS
// =====================================================

const destinations: readonly Destination[] =
  SBS_TAXI_CONFIG.destinations;

// =====================================================
// COMPONENT
// =====================================================

export default function DestinationCards() {
  const [selectedCity, setSelectedCity] =
    useState<Destination | null>(null);

  const [slideIndex, setSlideIndex] =
    useState<number>(0);

  // =====================================================
  // SELECT CITY
  // =====================================================

  const handleCityClick = (
    city: Destination
  ) => {
    setSelectedCity(city);
    setSlideIndex(0);

    setTimeout(() => {
      document
        .getElementById("city-spots")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  // =====================================================
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    if (!selectedCity) return;

    setSlideIndex((current) => {
      const next = current + 1;

      if (
        next >= selectedCity.spots.length
      ) {
        return 0;
      }

      return next;
    });
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const previousSlide = () => {
    if (!selectedCity) return;

    setSlideIndex((current) => {
      const previous = current - 1;

      if (previous < 0) {
        return (
          selectedCity.spots.length - 1
        );
      }

      return previous;
    });
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <section
      className="
        w-full
        bg-gray-50
        px-4
        py-12
        font-[var(--font-jakarta)]

        sm:px-6
        sm:py-16

        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-widest
              text-[var(--primary)]
            "
          >
            Popular Destinations
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-gray-900
              sm:text-3xl
              md:text-4xl
            "
          >
            Popular Taxi Destinations
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-gray-600
              sm:text-base
            "
          >
            Choose your destination to view tourist
            places, route map and cab fare details.
          </p>
        </div>

        {/* =====================================================
            DESTINATION CARDS
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            sm:gap-6
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {destinations.map(
            (destination) => (
              <div
                key={destination.name}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-md
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* IMAGE */}

                <div
                  className="
                    relative
                    h-48
                    w-full
                    overflow-hidden
                    sm:h-52
                  "
                >
                  <Image
                    src={destination.image}
                    alt={`${destination.name} taxi`}
                    fill
                    className="
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      (max-width: 1280px) 33vw,
                      25vw
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/50
                      via-transparent
                      to-transparent
                    "
                  />

                  <div className="absolute bottom-3 left-4">
                    <span
                      className="
                        rounded-full
                        bg-white/95
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-gray-800
                        shadow
                      "
                    >
                      {destination.km}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-4 sm:p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {destination.name}
                  </h3>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <span
                      className="
                        flex
                        items-center
                        gap-1
                        text-sm
                        text-gray-500
                      "
                    >
                      <MapPin size={16} />

                      {destination.km}
                    </span>

                    <span
                      className="
                        text-lg
                        font-bold
                        text-[var(--primary)]
                      "
                    >
                      ₹{destination.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCityClick(
                        destination
                      )
                    }
                    className="
                      mt-5
                      w-full
                      rounded-lg
                      bg-[var(--primary)]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-[var(--primary-dark)]
                      active:scale-[0.98]
                    "
                  >
                    View Tourist Spots
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* =====================================================
            SELECTED CITY
        ====================================================== */}

        {selectedCity && (
          <div
            id="city-spots"
            className="
              mt-10
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-xl
              sm:mt-12
              md:mt-14
            "
          >

            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                bg-[var(--primary)]
                px-5
                py-7
                text-[var(--secondary)]
                sm:px-8
                sm:py-8
                md:px-10
              "
            >
              <p
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-[var(--secondary)]
                  sm:text-sm
                "
              >
                <MapPin size={17} />

                Erode → {selectedCity.name}
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  !text-[var(--secondary)]
                  sm:text-3xl
                  md:text-4xl
                "
              >
                {selectedCity.name} Tourist Route
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-[var(--secondary)]
                  sm:text-base
                "
              >
                Erode → {selectedCity.name} with all
                popular tourist places.
              </p>
            </div>

            {/* =================================================
                ROUTE MAP
            ================================================== */}

            <div className="p-5 sm:p-7 md:p-10">

              <div className="mb-8">
                <h3
                  className="
                    mb-2
                    text-xl
                    font-bold
                    text-gray-900
                    sm:text-2xl
                  "
                >
                  Tourist Route Map
                </h3>

                <p className="mb-5 text-sm text-gray-500">
                  Starting from Erode, view the selected
                  destination and all tourist places on one map.
                </p>

                {/* IMPORTANT:
                    slideIndex is passed to the map
                */}

                <DestinationRouteMap
                  city={selectedCity}
                  selectedSpotIndex={
                    slideIndex
                  }
                />
              </div>

              {/* =================================================
                  FARE INFORMATION
              ================================================== */}

              <div
                className="
                  mb-8
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-3
                "
              >
                <div
                  className="
                    rounded-xl
                    bg-gray-50
                    p-5
                  "
                >
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-gray-500
                    "
                  >
                    <MapPin size={18} />

                    <p className="text-sm">
                      Distance
                    </p>
                  </div>

                  <p
                    className="
                      text-2xl
                      font-bold
                      text-gray-900
                    "
                  >
                    {selectedCity.km}
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    bg-gray-50
                    p-5
                  "
                >
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-gray-500
                    "
                  >
                    <IndianRupee size={18} />

                    <p className="text-sm">
                      One Way Fare
                    </p>
                  </div>

                  <p
                    className="
                      text-2xl
                      font-bold
                      text-[var(--primary)]
                    "
                  >
                    ₹{selectedCity.price}
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    bg-gray-50
                    p-5
                  "
                >
                  <p className="text-sm text-gray-500">
                    Destination
                  </p>

                  <p
                    className="
                      mt-1
                      text-2xl
                      font-bold
                      text-gray-900
                    "
                  >
                    {selectedCity.name}
                  </p>
                </div>
              </div>

              {/* =================================================
                  TOURIST SPOTS HEADER
              ================================================== */}

              <div
                className="
                  mb-5
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <h3
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                      sm:text-2xl
                    "
                  >
                    Popular Tourist Spots
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-gray-500
                    "
                  >
                    Explore places to visit in{" "}
                    {selectedCity.name}
                  </p>
                </div>

                {/* DESKTOP BUTTONS */}

                <div className="hidden gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous tourist place"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gray-300
                      bg-white
                      text-gray-700
                      transition
                      hover:border-[var(--primary)]
                      hover:bg-[var(--primary)]
                      hover:text-white
                    "
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next tourist place"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gray-300
                      bg-white
                      text-gray-700
                      transition
                      hover:border-[var(--primary)]
                      hover:bg-[var(--primary)]
                      hover:text-white
                    "
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* =================================================
                  SLIDER
              ================================================== */}

              <div className="relative overflow-hidden">
                <div
                  className="
                    flex
                    transition-transform
                    duration-500
                    ease-in-out
                  "
                  style={{
                    transform: `translateX(-${
                      slideIndex * 100
                    }%)`,
                  }}
                >
                  {selectedCity.spots.map(
                    (spot) => (
                      <div
                        key={spot.name}
                        className="
                          w-full
                          min-w-full
                          shrink-0
                          px-0.5
                        "
                      >
                        <div
                          className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            shadow-sm
                          "
                        >
                          {/* IMAGE */}

                          <div
                            className="
                              relative
                              h-56
                              w-full
                              sm:h-64
                              md:h-72
                            "
                          >
                            <Image
                              src={spot.image}
                              alt={spot.name}
                              fill
                              className="object-cover"
                              sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 1024px) 90vw,
                                1000px
                              "
                            />

                            <div
                              className="
                                absolute
                                inset-x-0
                                bottom-0
                                bg-gradient-to-t
                                from-black/80
                                via-black/30
                                to-transparent
                                p-5
                                pt-20
                              "
                            >
                              <h4
                                className="
                                  text-xl
                                  font-bold
                                  text-white
                                  sm:text-2xl
                                "
                              >
                                {spot.name}
                              </h4>
                            </div>
                          </div>

                          {/* CONTENT */}

                          <div className="p-5 sm:p-6">
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-gray-500
                              "
                            >
                              <MapPin
                                size={16}
                                className="text-[var(--primary)]"
                              />

                              {selectedCity.name}
                            </div>

                            <p
                              className="
                                mt-3
                                text-sm
                                leading-6
                                text-gray-600
                                sm:text-base
                              "
                            >
                              {spot.description}
                            </p>

                            <Link
                              href="/booking"
                              className="
                                mt-5
                                block
                                w-full
                                rounded-lg
                                bg-[var(--secondary)]
                                py-3
                                text-center
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-[var(--secondary-dark)]
                                active:scale-[0.98]
                              "
                            >
                              Book Cab
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* =================================================
                  MOBILE BUTTONS
              ================================================== */}

              <div
                className="
                  mt-4
                  flex
                  justify-center
                  gap-3
                  sm:hidden
                "
              >
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous tourist place"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-300
                    bg-white
                    text-[var(--secondary)]
                    shadow-sm
                  "
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next tourist place"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-300
                    bg-white
                    text-[var(--secondary)]
                    shadow-sm
                  "
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* =================================================
                  INDICATORS
              ================================================== */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  justify-center
                  gap-2
                "
              >
                {selectedCity.spots.map(
                  (spot, index) => (
                    <button
                      type="button"
                      key={spot.name}
                      onClick={() =>
                        setSlideIndex(index)
                      }
                      aria-label={`Go to ${spot.name}`}
                      className={`
                        h-2
                        rounded-full
                        transition-all
                        ${
                          index === slideIndex
                            ? "w-7 bg-[var(--primary)]"
                            : "w-2 bg-[var(--primary-dark)]"
                        }
                      `}
                    />
                  )
                )}
              </div>

              {/* =================================================
                  BOOKING CTA
              ================================================== */}

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  gap-5
                  rounded-xl
                  bg-gray-50
                  p-5
                  sm:p-6
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <div>
                  <h4
                    className="
                      text-lg
                      font-bold
                      text-gray-900
                      sm:text-xl
                    "
                  >
                    Book a Cab to{" "}
                    {selectedCity.name}
                  </h4>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-gray-600
                      sm:text-base
                    "
                  >
                    Comfortable and reliable travel
                    with SBS Taxi.
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="
                    w-full
                    rounded-lg
                    bg-[var(--secondary)]
                    px-8
                    py-3
                    text-center
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[var(--secondary-dark)]
                    active:scale-[0.98]
                    sm:w-auto
                  "
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}