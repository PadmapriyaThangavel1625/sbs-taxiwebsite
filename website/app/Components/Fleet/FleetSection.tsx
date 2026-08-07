"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import FleetCard, { Fleet } from "./FleetCard"; // Correctly imported from FleetCard

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
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FleetSection() {
  const [selectedCar, setSelectedCar] = useState<Fleet>(cars[0]);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Choose Your Perfect Ride
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose from our well-maintained fleet of hatchbacks, sedans,
            SUVs, vans and premium vehicles for every journey.
          </p>
        </motion.div>

        {/* Fleet Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-6"
        >
          {cars.map((car) => (
            <motion.div
              key={car.name}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
            >
              <FleetCard
                {...car}
                onSelect={() => setSelectedCar(car)}
                isSelected={selectedCar?.name === car.name}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Information Section Displayed Down on the Page */}
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-white border rounded-2xl p-6 md:p-8 shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 w-full bg-gray-50 rounded-xl border p-4">
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <span className="bg-blue-900 text-white px-3 py-1 rounded text-xs font-semibold">
                  {selectedCar.name} Details
                </span>
                <h3 className="text-3xl font-bold mt-2 text-gray-900">
                  {selectedCar.type}
                </h3>
                <p className="text-gray-600 mt-2">
                  <strong className="text-gray-800">Fleet Models:</strong>{" "}
                  {selectedCar.vehicles}
                </p>

                <div className="grid grid-cols-3 gap-4 my-6 bg-blue-50 p-4 rounded-xl text-center text-sm font-semibold text-blue-900 border border-blue-100">
                  <div>
                    <p className="text-xs text-gray-500 font-normal">Capacity</p>
                    <p className="mt-1">👤 {selectedCar.seat}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-normal">Luggage</p>
                    <p className="mt-1">🧳 {selectedCar.bags}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-normal">Climate</p>
                    <p className="mt-1">❄ AC Included</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <h2 className="text-blue-900 font-bold text-2xl">
                      ₹{selectedCar.price}{" "}
                      <span className="text-sm font-normal text-gray-600">
                        / km
                      </span>
                    </h2>
                  </div>

                  <a
                    href="/book"
                    className="bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition shadow-md"
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