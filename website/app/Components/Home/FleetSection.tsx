"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
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
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-end justify-between"
        >
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span>🚕</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Our Fleet
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Perfect Ride
            </h2>

            <div className="mt-2 h-1 w-20 rounded-full bg-yellow-400" />
          </div>

          <Link
            href="/fleet"
            className="hidden items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-700 hover:bg-blue-50 sm:flex"
          >
            View All Fleet
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Fleet Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        >
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.name}
              variants={item}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { duration: 0.25 },
              }}
            >
              <VehicleCard {...vehicle} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex justify-center sm:hidden"
        >
          <Link
            href="/fleet"
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-blue-700"
          >
            View All Fleet
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}