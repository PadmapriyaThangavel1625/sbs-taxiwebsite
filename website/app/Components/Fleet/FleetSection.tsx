"use client";

import { motion, Variants, Easing } from "framer-motion";

import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

import FleetCard, { Fleet } from "./FleetCard";

/* =========================================================
   ANIMATION
========================================================= */

const customEase: Easing = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: customEase,
    },
  },
};

/* =========================================================
   FLEET DATA FROM CONFIG
========================================================= */

const cars: Fleet[] = [
  {
    name: SBS_TAXI_CONFIG.vehicles.mini.name,
    type: SBS_TAXI_CONFIG.vehicles.mini.type,
    vehicles: SBS_TAXI_CONFIG.vehicles.mini.description,
    image: SBS_TAXI_CONFIG.vehicles.mini.image,
    seat: `${SBS_TAXI_CONFIG.vehicles.mini.seats} Seats`,
    bags: `${SBS_TAXI_CONFIG.vehicles.mini.luggage} Bags`,
    price: SBS_TAXI_CONFIG.vehicles.mini.price,
  },

  {
    name: SBS_TAXI_CONFIG.vehicles.sedan.name,
    type: SBS_TAXI_CONFIG.vehicles.sedan.type,
    vehicles: SBS_TAXI_CONFIG.vehicles.sedan.description,
    image: SBS_TAXI_CONFIG.vehicles.sedan.image,
    seat: `${SBS_TAXI_CONFIG.vehicles.sedan.seats} Seats`,
    bags: `${SBS_TAXI_CONFIG.vehicles.sedan.luggage} Bags`,
    price: SBS_TAXI_CONFIG.vehicles.sedan.price,
  },

  {
    name: SBS_TAXI_CONFIG.vehicles.van.name,
    type: SBS_TAXI_CONFIG.vehicles.van.type,
    vehicles: SBS_TAXI_CONFIG.vehicles.van.description,
    image: SBS_TAXI_CONFIG.vehicles.van.image,
    seat: `${SBS_TAXI_CONFIG.vehicles.van.seats} Seats`,
    bags: `${SBS_TAXI_CONFIG.vehicles.van.luggage} Bags`,
    price: SBS_TAXI_CONFIG.vehicles.van.price,
  },

  {
    name: SBS_TAXI_CONFIG.vehicles.suv.name,
    type: SBS_TAXI_CONFIG.vehicles.suv.type,
    vehicles: SBS_TAXI_CONFIG.vehicles.suv.description,
    image: SBS_TAXI_CONFIG.vehicles.suv.image,
    seat: `${SBS_TAXI_CONFIG.vehicles.suv.seats} Seats`,
    bags: `${SBS_TAXI_CONFIG.vehicles.suv.luggage} Bags`,
    price: SBS_TAXI_CONFIG.vehicles.suv.price,
  },

  {
    name: SBS_TAXI_CONFIG.vehicles.muv.name,
    type: SBS_TAXI_CONFIG.vehicles.muv.type,
    vehicles: SBS_TAXI_CONFIG.vehicles.muv.description,
    image: SBS_TAXI_CONFIG.vehicles.muv.image,
    seat: `${SBS_TAXI_CONFIG.vehicles.muv.seats} Seats`,
    bags: `${SBS_TAXI_CONFIG.vehicles.muv.luggage} Bags`,
    price: SBS_TAXI_CONFIG.vehicles.muv.price,
  },

  {
    name: SBS_TAXI_CONFIG.vehicles.muvPlus.name,
    type: SBS_TAXI_CONFIG.vehicles.muvPlus.type,
    vehicles: SBS_TAXI_CONFIG.vehicles.muvPlus.description,
    image: SBS_TAXI_CONFIG.vehicles.muvPlus.image,
    seat: `${SBS_TAXI_CONFIG.vehicles.muvPlus.seats} Seats`,
    bags: `${SBS_TAXI_CONFIG.vehicles.muvPlus.luggage} Bags`,
    price: SBS_TAXI_CONFIG.vehicles.muvPlus.price,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function FleetSection() {
  return (
    <section
      className="
        section-bg
        w-full
        py-10
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
            HEADING
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: customEase,
          }}
          className="
            mb-10
            text-center
            sm:mb-12
            lg:mb-14
          "
        >
          <h2
            className="
              font-[family-name:var(--font-instrument)]
              text-2xl
              font-normal
              text-[var(--text-primary)]
              sm:text-3xl
              lg:text-4xl
            "
          >
            Choose Your Perfect Ride
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              font-[family-name:var(--font-jakarta)]
              text-sm
              leading-6
              text-[var(--text-secondary)]
              sm:text-base
            "
          >
            Choose from our well-maintained fleet of hatchbacks,
            sedans, SUVs, vans and premium vehicles for every journey.
          </p>
        </motion.div>

        {/* =====================================================
            FLEET CARDS
        ====================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
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
          {cars.map((car) => (
            <motion.div
              key={car.name}
              variants={cardVariants}
              className="h-full"
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <FleetCard {...car} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}