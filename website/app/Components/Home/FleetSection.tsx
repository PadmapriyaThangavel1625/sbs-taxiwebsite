"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import VehicleCard from "./VehicleCard";

const vehicles = [
  {
    name: "SBS Mini",
    type: "Hatchback",
    image: "/vehicle/mini.png",
    seats: 4,
    luggage: 2,
    price: "12",
  },
  {
    name: "SBS Sedan",
    type: "Sedan",
    image: "/vehicle/sedan.png",
    seats: 4,
    luggage: 3,
    price: "12.50",
  },
  {
    name: "SBS Van",
    type: "Van",
    image: "/vehicle/van.png",
    seats: 7,
    luggage: 4,
    price: "14",
  },
  {
    name: "SBS SUV",
    type: "SUV",
    image: "/vehicle/suv.png",
    seats: 6,
    luggage: 4,
    price: "17",
  },
  {
    name: "SBS MUV",
    type: "MUV",
    image: "/vehicle/muv.png",
    seats: 7,
    luggage: 5,
    price: "18",
  },
  {
    name: "SBS MUV+",
    type: "Innova",
    image: "/vehicle/muv-plus.png",
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
    },
  },
};

/* =====================================================
   FLEET SECTION
===================================================== */

export default function FleetSection() {
  return (
    <section className="w-full bg-[var(--background)] py-10 sm:py-12 md:py-16 lg:py-20">
      {/* =================================================
          SAME CONTAINER AS NAVBAR + HERO + TRUST BADGES

          Left edge:
          Navbar Logo
          Hero Content
          Trust Badges
          Fleet Content

          Right edge:
          Navbar Book a Ride
          Hero Booking Form
          Trust Badges
          Fleet Button
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
          }}
          transition={{
            duration: 0.5,
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
            {/* Small Label */}
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg sm:text-xl">
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
              >
                Our Fleet
              </span>
            </div>

            {/* Main Heading */}
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
            >
              Choose Your Perfect Ride
            </h2>

            {/* Description */}
            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-[var(--muted)]

                sm:text-base
              "
            >
              Comfortable, reliable and well-maintained vehicles
              for every journey.
            </p>

            {/* Yellow Line */}
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
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[var(--primary)]
              shadow-sm
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:border-[var(--primary)]
              hover:bg-[var(--primary-light)]
              hover:shadow-md

              sm:flex
            "
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
                transition: {
                  duration: 0.25,
                },
              }}
              className="w-full"
            >
              <VehicleCard {...vehicle} />
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
              border-gray-200
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-[var(--primary)]
              shadow-sm
              transition-all
              duration-200

              hover:border-[var(--primary)]
              hover:bg-[var(--primary-light)]
              hover:shadow-md
            "
          >
            View All Fleet

            <ArrowRight
              size={16}
              className="
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