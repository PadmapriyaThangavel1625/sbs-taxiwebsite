"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Users,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

/* =========================================================
   VEHICLE DATA
========================================================= */

const vehicles = Object.values(SBS_TAXI_CONFIG.vehicles);

/* =========================================================
   COMPONENT
========================================================= */

export default function VehiclePricing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [destination, setDestination] = useState("");

  const selectedVehicle = vehicles[activeIndex];

  /* =========================================================
     PREVIOUS VEHICLE
  ========================================================= */

  const previousVehicle = () => {
    setActiveIndex((current) =>
      current === 0 ? vehicles.length - 1 : current - 1
    );
  };

  /* =========================================================
     NEXT VEHICLE
  ========================================================= */

  const nextVehicle = () => {
    setActiveIndex((current) =>
      current === vehicles.length - 1 ? 0 : current + 1
    );
  };

  /* =========================================================
     BOOKING URL
  ========================================================= */

  const bookingUrl = destination
    ? `/booking?vehicle=${encodeURIComponent(
        selectedVehicle.name
      )}&destination=${encodeURIComponent(destination)}`
    : `/booking?vehicle=${encodeURIComponent(
        selectedVehicle.name
      )}`;

  return (
    <section
      className="
        section-bg
        w-full
        py-10
        font-[var(--font-jakarta)]
        text-[var(--text-secondary)]
        sm:py-12
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div
          className="
            w-full
            overflow-hidden
            rounded-[30px]
            border
            border-[var(--border)]
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          "
        >
          {/* ===================================================
              LEFT + RIGHT
          =================================================== */}

          <div className="grid w-full grid-cols-1 lg:grid-cols-2">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div
              className="
                relative
                flex
                min-h-[700px]
                flex-col
                bg-[var(--background)]
                p-6
                text-[var(--text-secondary)]
                sm:min-h-[720px]
                sm:p-10
                lg:min-h-[760px]
                lg:p-10
              "
            >
              {/* =================================================
                  OUR FLEET
              ================================================= */}

              <div className="w-full text-left">
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-secondary)]
                  "
                >
                  OUR FLEET
                </p>

                <h2
                  className="
                    mt-2
                    font-[family-name:var(--font-instrument)]
                    text-3xl
                    font-normal
                    leading-tight
                    text-[var(--text-secondary)]
                    sm:text-4xl
                  "
                >
                  Choose Your Ride
                </h2>
              </div>

              {/* =================================================
                  LEFT VEHICLE CONTENT
              ================================================= */}

              <div
                className="
                  relative
                  mt-14
                  flex
                  flex-1
                  flex-col
                  sm:mt-16
                  lg:mt-20
                "
              >
                {/* =================================================
                    CAR IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    h-[230px]
                    w-full
                    sm:h-[270px]
                    lg:h-[300px]
                  "
                >
                  <Image
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    fill
                    priority
                    sizes="90vw"
                    className="
                      object-contain
                      transition-all
                      duration-500
                    "
                  />
                </div>

                {/* =================================================
                    PREVIOUS BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={previousVehicle}
                  aria-label="Previous vehicle"
                  className="
                    absolute
                    left-0
                    top-[115px]
                    z-20
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-white
                    text-[var(--text-secondary)]
                    shadow-md
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-[var(--primary)]
                  "
                >
                  <ArrowLeft size={19} />
                </button>

                {/* =================================================
                    NEXT BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={nextVehicle}
                  aria-label="Next vehicle"
                  className="
                    absolute
                    right-0
                    top-[115px]
                    z-20
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-white
                    text-[var(--text-secondary)]
                    shadow-md
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-[var(--primary)]
                  "
                >
                  <ArrowRight size={19} />
                </button>

                {/* =================================================
                    VEHICLE NAME / TYPE
                ================================================= */}

                <div
                  className="
                    mt-5
                    text-center
                    text-[var(--text-secondary)]
                  "
                >
                  <span
                    className="
                      inline-flex
                      rounded-full
                      bg-[var(--primary)]
                      px-5
                      py-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[var(--text-primary)]
                    "
                  >
                    {selectedVehicle.name}
                  </span>

                  <h3
                    className="
                      mt-3
                      font-[family-name:var(--font-instrument)]
                      text-3xl
                      font-normal
                      leading-tight
                      text-[var(--text-secondary)]
                      sm:text-4xl
                    "
                  >
                    {selectedVehicle.type}
                  </h3>

                  {/* =================================================
                      SEATS + BAGS
                  ================================================= */}

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-sm
                      text-[var(--text-secondary)]
                    "
                  >
                    <span>
                      {selectedVehicle.seats} Seats
                    </span>

                    <span>•</span>

                    <span>
                      {selectedVehicle.luggage} Bags
                    </span>
                  </div>
                </div>

                {/* =================================================
                    SLIDER DOTS
                ================================================= */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  {vehicles.map((vehicle, index) => (
                    <button
                      key={vehicle.name}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Select ${vehicle.name}`}
                      aria-pressed={activeIndex === index}
                      className={`
                        h-2
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          activeIndex === index
                            ? "w-8 bg-[var(--primary)]"
                            : "w-2 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/50"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div
              className="
                flex
                min-h-[700px]
                flex-col
                p-6
                text-[var(--text-secondary)]
                sm:min-h-[720px]
                sm:p-10
                lg:min-h-[760px]
                lg:p-12
              "
            >
              {/* =================================================
                  RIGHT CONTENT
              ================================================= */}

              <div className="flex flex-1 flex-col">

                {/* =================================================
                    FLEET BASED PRICING
                ================================================= */}

                <span
                  className="
                    inline-flex
                    w-fit
                    rounded-full
                    bg-[var(--primary)]
                    px-5
                    py-2
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-primary)]
                  "
                >
                  FLEET BASED PRICING
                </span>

                {/* =================================================
                    VEHICLE TYPE
                ================================================= */}

                <h2
                  className="
                    mt-6
                    font-[family-name:var(--font-instrument)]
                    text-4xl
                    font-normal
                    leading-tight
                    text-[var(--text-secondary)]
                    sm:text-5xl
                  "
                >
                  {selectedVehicle.type}
                </h2>

                {/* =================================================
                    VEHICLE NAME
                ================================================= */}

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-[var(--text-secondary)]
                  "
                >
                  {selectedVehicle.name}
                </p>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p
                  className="
                    mt-4
                    max-w-xl
                    text-sm
                    leading-7
                    text-[var(--text-secondary)]
                    sm:text-base
                  "
                >
                  {selectedVehicle.description}
                </p>

                {/* =================================================
                    SEATS + BAGS
                ================================================= */}

                <div className="mt-7 grid grid-cols-2 gap-4">

                  {/* Seats */}

                  <div
                    className="
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--background)]
                      p-4
                      text-[var(--text-secondary)]
                    "
                  >
                    <Users
                      size={21}
                      className="text-[var(--text-secondary)]"
                    />

                    <p
                      className="
                        mt-3
                        text-xs
                        text-[var(--text-secondary)]
                      "
                    >
                      Passenger Capacity
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-semibold
                        text-[var(--text-secondary)]
                      "
                    >
                      {selectedVehicle.seats} Seats
                    </p>
                  </div>

                  {/* Bags */}

                  <div
                    className="
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--background)]
                      p-4
                      text-[var(--text-secondary)]
                    "
                  >
                    <Briefcase
                      size={21}
                      className="text-[var(--text-secondary)]"
                    />

                    <p
                      className="
                        mt-3
                        text-xs
                        text-[var(--text-secondary)]
                      "
                    >
                      Luggage
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-semibold
                        text-[var(--text-secondary)]
                      "
                    >
                      {selectedVehicle.luggage} Bags
                    </p>
                  </div>
                </div>

                {/* =================================================
                    PRICE
                ================================================= */}

                <div
                  className="
                    mt-7
                    border-t
                    border-[var(--border)]
                    pt-6
                  "
                >
                  <p
                    className="
                      text-sm
                      text-[var(--text-secondary)]
                    "
                  >
                    Starting From
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <h3
                      className="
                        font-[family-name:var(--font-instrument)]
                        text-4xl
                        font-normal
                        text-[var(--text-secondary)]
                        sm:text-5xl
                      "
                    >
                      {selectedVehicle.rate}
                    </h3>

                    <span
                      className="
                        mb-1
                        text-sm
                        text-[var(--text-secondary)]
                      "
                    >
                      / km
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  BOOK BUTTON
              ================================================= */}

              <Link
                href={bookingUrl}
                className="
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--secondary)]
                  px-6
                  py-3.5
                  font-[var(--font-jakarta)]
                  text-sm
                  font-semibold
                  text-[var(--text-secondary)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[var(--secondary-dark)]
                  hover:gap-3
                  hover:shadow-lg
                "
              >
                Book a Ride

                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* =====================================================
              NOTE - BELOW BOTH COLUMNS
          ===================================================== */}

          <div
            className="
              w-full
              border-t
              border-[var(--border)]
              bg-[#D71920]
              px-4
              py-3
              text-center
              text-xs
              leading-5
              text-[var(--text-primary)]
              sm:px-6
              sm:text-sm
            "
          >
            <strong
              className="
                mr-1
                font-semibold
                text-[var(--text-primary)]
              "
            >
              Note:
            </strong>

            Prices mentioned are starting rates per kilometer.
            Applicable for local and outstation trips. Toll,
            parking, permit and state taxes (if applicable) are
            extra.
          </div>
        </div>
      </div>
    </section>
  );
}