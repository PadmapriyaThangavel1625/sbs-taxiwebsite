
"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import FleetCard, { Fleet } from "./FleetCard";

const cars: Fleet[] = [
  {
    name: "SBS MINI",
    type: "Hatchback",
    vehicles: "Maruti Suzuki Baleno, Toyota Glanza, Wagon R",
    image: "/vehicle/mini.png",
    seat: "4 Seats",
    bags: "2 Bags",
    price: "12",
  },
  {
    name: "SBS SEDAN",
    type: "Sedan",
    vehicles: "Maruti Suzuki Dzire, Hyundai Aura, Xpres-T EV",
    image: "/vehicle/sedan.png",
    seat: "4 Seats",
    bags: "3 Bags",
    price: "12.50",
  },
  {
    name: "SBS VAN",
    type: "Van",
    vehicles: "Maruti Suzuki Eeco",
    image: "/vehicle/van.png",
    seat: "6 Seats",
    bags: "4 Bags",
    price: "14",
  },
  {
    name: "SBS SUV",
    type: "SUV",
    vehicles: "Mahindra Xylo, Chevrolet Tavera",
    image: "/vehicle/suv.png",
    seat: "6 Seats",
    bags: "4 Bags",
    price: "17",
  },
  {
    name: "SBS MUV",
    type: "MUV",
    vehicles: "Maruti Suzuki Ertiga, Kia Carens",
    image: "/vehicle/muv.png",
    seat: "7 Seats",
    bags: "5 Bags",
    price: "18",
  },
  {
    name: "SBS MUV+",
    type: "MUV+",
    vehicles: "Toyota Innova",
    image: "/vehicle/muv-plus.png",
    seat: "7 Seats",
    bags: "5 Bags",
    price: "19",
  },
];

const containerVariants: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FleetSection() {
  const [selectedCar, setSelectedCar] = useState<Fleet>(cars[0]);

  return (
    <section className="section-bg py-10 sm:py-12 lg:py-16">
      <div className="container-custom">

        {/* Heading */}
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
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-10 text-center sm:mb-12 lg:mb-14"
        >
          <h2 className="text-2xl font-bold text-heading sm:text-3xl lg:text-4xl">
            Choose Your Perfect Ride
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Choose from our well-maintained fleet of hatchbacks, sedans,
            SUVs, vans and premium vehicles for every journey.
          </p>
        </motion.div>

        {/* Fleet Cards */}
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
                y: -10,
                transition: {
                  duration: 0.25,
                },
              }}
            >
              <FleetCard
                {...car}
                onSelect={() => setSelectedCar(car)}
                isSelected={selectedCar.name === car.name}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Vehicle Details */}
        {selectedCar && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              mt-10
              overflow-hidden
              rounded-2xl
              border
              bg-white
              p-5
              shadow-md
              sm:mt-12
              sm:p-6
              lg:mt-16
              lg:p-8
            "
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">

              {/* Vehicle Image */}
              <div
                className="
                  relative
                  h-56
                  w-full
                  overflow-hidden
                  rounded-xl
                  border
                  bg-primary-light
                  p-4
                  sm:h-64
                "
              >
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

              {/* Vehicle Details */}
              <div>

                {/* Label */}
                <span
                  className="
                    inline-flex
                    rounded
                    bg-primary
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  {selectedCar.name} Details
                </span>

                {/* Type */}
                <h3 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
                  {selectedCar.type}
                </h3>

                {/* Models */}
                <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
                  <strong className="text-heading">
                    Fleet Models:
                  </strong>{" "}
                  {selectedCar.vehicles}
                </p>

                {/* Features */}
                <div
                  className="
                    my-5
                    grid
                    grid-cols-1
                    gap-3
                    rounded-xl
                    border
                    border-primary-light
                    bg-primary-light
                    p-4
                    text-center
                    text-sm
                    font-semibold
                    text-primary
                    sm:grid-cols-3
                    sm:gap-4
                    sm:my-6
                  "
                >
                  {/* Capacity */}
                  <div>
                    <p className="text-xs font-normal text-muted">
                      Capacity
                    </p>

                    <p className="mt-1">
                      👤 {selectedCar.seat}
                    </p>
                  </div>

                  {/* Luggage */}
                  <div>
                    <p className="text-xs font-normal text-muted">
                      Luggage
                    </p>

                    <p className="mt-1">
                      🧳 {selectedCar.bags}
                    </p>
                  </div>

                  {/* Climate */}
                  <div>
                    <p className="text-xs font-normal text-muted">
                      Climate
                    </p>

                    <p className="mt-1">
                      ❄ AC Included
                    </p>
                  </div>
                </div>

                {/* Fare + Button */}
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    border-t
                    pt-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  {/* Fare */}
                  <div>
                    <p className="text-xs text-muted">
                      Fare Rate
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-primary">
                      ₹{selectedCar.price}{" "}
                      <span className="text-sm font-normal text-muted">
                        / km
                      </span>
                    </h2>
                  </div>

                  {/* Book Button */}
                  <a
                    href="/book"
                    className="
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary
                      px-6
                      py-3
                      font-semibold
                      text-white
                      shadow-md
                      transition
                      hover:bg-primary-dark
                      sm:w-auto
                    "
                  >
                    Book This Ride
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
