"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

import VehicleCard from "./VehicleCard";
import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

/* =====================================================
   FLEET DATA

   Main vehicle information comes from config.
   Type, seats and luggage are display information.
===================================================== */

const vehicles = [
  {
    ...SBS_TAXI_CONFIG.vehicles.mini,
    type: "Hatchback",
    seats: 4,
    luggage: 2,
    price: "12",
  },

  {
    ...SBS_TAXI_CONFIG.vehicles.sedan,
    type: "Sedan",
    seats: 4,
    luggage: 3,
    price: "12.50",
  },

  {
    ...SBS_TAXI_CONFIG.vehicles.van,
    type: "Van",
    seats: 7,
    luggage: 4,
    price: "14",
  },

  {
    ...SBS_TAXI_CONFIG.vehicles.suv,
    type: "SUV",
    seats: 6,
    luggage: 4,
    price: "17",
  },

  {
    ...SBS_TAXI_CONFIG.vehicles.muv,
    type: "MUV",
    seats: 7,
    luggage: 5,
    price: "18",
  },

  {
    ...SBS_TAXI_CONFIG.vehicles.muvPlus,
    type: "Innova",
    seats: 7,
    luggage: 5,
    price: "19",
  },
];

/* =====================================================
   CONTAINER ANIMATION
===================================================== */

const container: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =====================================================
   CARD ANIMATION
===================================================== */

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =====================================================
   FLEET SECTION
===================================================== */

export default function FleetSection() {
  return (
    <section
      className="
        w-full
        bg-[var(--background)]
        py-10
        sm:py-12
        md:py-16
        lg:py-20
      "
    >
      {/* =================================================
          MAIN CONTAINER
      ================================================== */}

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
        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-8
            flex
            flex-col
            gap-5

            sm:mb-10
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* =================================================
              HEADING
          ================================================== */}

          <div className="max-w-2xl">
            {/* SMALL LABEL */}

            <div className="mb-2 flex items-center gap-2">
              <span
                className="
                  text-lg
                  sm:text-xl
                "
                aria-hidden="true"
              >
                🚕
              </span>

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[var(--primary)]

                  sm:text-xs
                "
                style={{
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                Our Fleet
              </span>
            </div>

            {/* MAIN HEADING */}

            <h2
              className="
                text-2xl
                font-bold
                leading-tight
                text-[var(--heading)]

                sm:text-3xl

                md:text-[34px]

                lg:text-[38px]
              "
              style={{
                fontFamily: "var(--font-jakarta)",
              }}
            >
              Choose Your Perfect Ride
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-[var(--muted)]

                sm:text-base
              "
              style={{
                fontFamily: "var(--font-jakarta)",
              }}
            >
              Comfortable, reliable and well-maintained vehicles
              for every journey.
            </p>

            {/* SECONDARY COLOR LINE */}

            <div
              className="
                mt-3
                h-1
                w-16
                rounded-full
                bg-[var(--secondary)]

                sm:w-20
              "
            />
          </div>

          {/* =================================================
              DESKTOP BUTTON
          ================================================== */}

          <Link
            href="/fleet"
            className="
              group
              hidden
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-[var(--secondary)]
              px-5
              py-3
              text-sm
              font-semibold
              text-[var(--text-secondary)]
              shadow-sm
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:border-[var(--secondary)]
              hover:bg-[var(--secondary-dark)]
              hover:shadow-md

              sm:flex
            "
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            View All Fleet

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>

        {/* =================================================
            FLEET CARDS
        ================================================== */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="
            grid
            w-full
            grid-cols-1
            gap-5

            min-[420px]:grid-cols-2

            sm:gap-6

            md:grid-cols-3

            lg:gap-7

            xl:grid-cols-6
            xl:gap-4

            2xl:gap-5
          "
        >
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.name}
              variants={item}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <VehicleCard
                name={vehicle.name}
                type={vehicle.type}
                image={vehicle.image}
                seats={vehicle.seats}
                luggage={vehicle.luggage}
                price={vehicle.price}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* =================================================
            MOBILE BUTTON
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.4,
            duration: 0.4,
          }}
          className="
            mt-7
            flex
            justify-center

            sm:hidden
          "
        >
          <Link
  href="/fleet"
  className="
    group
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-[var(--secondary)]
    !bg-[var(--secondary)]
    px-6
    py-3
    text-sm
    font-semibold
    text-[var(--text-secondary)]
    shadow-sm
    transition-all
    duration-200

    hover:-translate-y-0.5
    hover:border-[var(--secondary-dark)]
    hover:bg-[var(--secondary-dark)]
    hover:shadow-md
  "
  style={{
    fontFamily: "var(--font-jakarta)",
  }}
>
  View All Fleet

  <ArrowRight
    size={16}
    className="
      text-[var(--text-secondary)]
      transition-transform
      duration-200
      group-hover:translate-x-1
    "
  />
</Link>
        </motion.div>
      </div>
    </section>
  );
}