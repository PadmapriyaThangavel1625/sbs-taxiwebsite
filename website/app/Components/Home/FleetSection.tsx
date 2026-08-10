
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

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

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

export default function FleetSection() {
  return (
    <section className="w-full bg-[var(--background)] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container-custom">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            mb-6
            flex
            flex-col
            gap-4

            sm:mb-7
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* Heading */}
          <div className="w-full">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-base sm:text-lg">🚕</span>

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[var(--primary)]

                  sm:text-xs
                "
              >
                Our Fleet
              </span>
            </div>

            <h2
              className="
                text-2xl
                font-bold
                leading-tight
                text-[var(--heading)]

                sm:text-3xl

                md:text-[32px]

                lg:text-[34px]
              "
            >
              Choose Your Perfect Ride
            </h2>

            <div
              className="
                mt-2
                h-1
                w-16
                rounded-full
                bg-[var(--secondary)]

                sm:w-20
              "
            />
          </div>

          {/* Desktop / Tablet Button */}
          <Link
            href="/fleet"
            className="
              hidden
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-gray-300
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[var(--primary)]
              shadow-sm
              transition

              hover:border-[var(--primary)]
              hover:bg-[var(--primary-light)]

              sm:flex
            "
          >
            View All Fleet

            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* ================= FLEET CARDS ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="
            grid
            grid-cols-1
            gap-5

            min-[420px]:grid-cols-2

            sm:grid-cols-2
            sm:gap-5

            md:grid-cols-3
            md:gap-6

            lg:grid-cols-3
            lg:gap-6

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
                y: -10,
                scale: 1.03,
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

        {/* ================= MOBILE BUTTON ================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
          }}
          className="
            mt-6
            flex
            justify-center

            sm:hidden
          "
        >
          <Link
            href="/fleet"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-gray-300
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[var(--primary)]
              shadow-sm
              transition

              hover:border-[var(--primary)]
              hover:bg-[var(--primary-light)]
            "
          >
            View All Fleet

            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
