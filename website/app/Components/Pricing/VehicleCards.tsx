"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

/* =========================================================
   VEHICLE DATA FROM CONFIG
========================================================= */

const vehicles = Object.values(
  SBS_TAXI_CONFIG.vehicles
);

/* =========================================================
   COMPONENT
========================================================= */

export default function VehiclePricing() {
  return (
    <section
      className="
        section-bg
        w-full
        py-10
        font-[var(--font-jakarta)]
        sm:py-12
        lg:py-16
      "
    >
      {/* =====================================================
          SAME WIDTH STRUCTURE
      ====================================================== */}

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
        {/* ===================================================
            VEHICLE GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-stretch
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-8
          "
        >
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.name}
              className="
                group
                flex
                h-full
                flex-col
                rounded-2xl
                border
                border-[var(--border)]
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[var(--secondary)]
                hover:shadow-xl
                sm:p-6
              "
            >
              {/* =================================================
                  VEHICLE BADGE
              ================================================== */}

              <div>
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-[var(--primary)]
                    px-4
                    py-1.5
                    font-[var(--font-jakarta)]
                    text-xs
                    font-semibold
                    !text-[var(--text-primary)]
                  "
                >
                  {vehicle.name}
                </span>
              </div>

              {/* =================================================
                  VEHICLE IMAGE
                  FROM SBS_TAXI_CONFIG
              ================================================== */}

              <div
                className="
                  relative
                  mt-5
                  h-40
                  w-full
                  sm:h-44
                "
              >
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "
                  className="
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* =================================================
                  VEHICLE MODELS
              ================================================== */}

              <h3
                className="
                  mt-5
                  font-[family-name:var(--font-instrument)]
                  text-2xl
                  font-normal
                  text-[var(--text-primary)]
                "
              >
                {vehicle.type}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  mt-2
                  min-h-[48px]
                  font-[var(--font-jakarta)]
                  text-sm
                  leading-5
                  text-[var(--text-secondary)]
                "
              >
                {vehicle.description}
              </p>

              {/* =================================================
                  SPECS
              ================================================== */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  border-t
                  border-[var(--border)]
                  pt-5
                  font-[var(--font-jakarta)]
                  text-sm
                  text-[var(--text-secondary)]
                "
              >
                {/* Seats */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Users
                    size={18}
                    className="
                      shrink-0
                      text-[var(--primary)]
                    "
                  />

                  <span>
                    {vehicle.seats} Seats
                  </span>
                </div>

                {/* Luggage */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Briefcase
                    size={18}
                    className="
                      shrink-0
                      text-[var(--primary)]
                    "
                  />

                  <span>
                    {vehicle.luggage} Bags
                  </span>
                </div>
              </div>

              {/* =================================================
                  PRICE
              ================================================== */}

              <div className="mt-5">
                <p
                  className="
                    font-[var(--font-jakarta)]
                    text-sm
                    text-[var(--text-secondary)]
                  "
                >
                  Starting From
                </p>

                <h3
                  className="
                    mt-1
                    font-[family-name:var(--font-instrument)]
                    text-3xl
                    font-normal
                    text-[var(--primary)]
                  "
                >
                  {vehicle.rate}
                </h3>
              </div>

              {/* =================================================
                  BOOK BUTTON
              ================================================== */}

              <Link
                href={`/booking?vehicle=${encodeURIComponent(
                  vehicle.name
                )}`}
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[var(--primary)]
                  px-5
                  py-3
                  font-[var(--font-jakarta)]
                  text-sm
                  font-semibold
                  !text-[var(--text-primary)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[var(--primary-dark)]
                  hover:gap-3
                  hover:shadow-md
                "
              >
                Book a Ride

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          ))}
        </div>

        {/* =====================================================
            NOTE
        ====================================================== */}

        <div
          className="
            mt-8
            rounded-xl
            border
            border-[var(--secondary)]
            bg-[var(--secondary)]
            p-4
            text-center
            font-[var(--font-jakarta)]
            text-sm
            leading-6
            text-[var(--text-secondary)]
            sm:mt-10
          "
        >
          <strong className="text-[var(--text-primary)] !mr:2">
            Note  : 
          </strong>{" "}
          Prices mentioned are starting rates per kilometer.
          Applicable for local and outstation trips. Toll,
          parking, permit and state taxes (if applicable) are
          extra.
        </div>
      </div>
    </section>
  );
}