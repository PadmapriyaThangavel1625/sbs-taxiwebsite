"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, ArrowRight } from "lucide-react";

const vehicles = [
  {
    name: "SBS MINI",
    cars: [
      "Maruti Suzuki Baleno",
      "Toyota Glanza",
      "Maruti Suzuki Wagon R",
    ],
    seat: "4 Seats",
    bag: "2 Bags",
    price: "₹12 / km",
    image: "/vehicle/mini.png",
  },
  {
    name: "SBS SEDAN",
    cars: [
      "Maruti Suzuki Dzire",
      "Hyundai Aura",
      "Tata Xpres-T Electric Taxi",
    ],
    seat: "4 Seats",
    bag: "3 Bags",
    price: "₹12.50 / km",
    image: "/vehicle/sedan.png",
  },
  {
    name: "SBS VAN",
    cars: ["Maruti Suzuki Eeco"],
    seat: "6 Seats",
    bag: "4 Bags",
    price: "₹14 / km",
    image: "/vehicle/van.png",
  },
  {
    name: "SBS SUV",
    cars: [
      "Mahindra Xylo",
      "Chevrolet Tavera",
    ],
    seat: "6 Seats",
    bag: "4 Bags",
    price: "₹17 / km",
    image: "/vehicle/suv.png",
  },
  {
    name: "SBS MUV",
    cars: [
      "Maruti Suzuki Ertiga",
      "Kia Carens",
    ],
    seat: "7 Seats",
    bag: "5 Bags",
    price: "₹18 / km",
    image: "/vehicle/muv.png",
  },
  {
    name: "SBS MUV+",
    cars: ["Toyota Innova"],
    seat: "7 Seats",
    bag: "5 Bags",
    price: "₹19 / km",
    image: "/vehicle/muv_plus.png",
  },
];

export default function VehiclePricing() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">

        

        {/* Vehicle Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((v) => (
            <div
              key={v.name}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Badge */}
              <span className="rounded-full bg-[#0753b8] px-4 py-1 text-xs font-semibold text-white">
                {v.name}
              </span>

              {/* Image */}
              <div className="relative mt-6 h-44">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Vehicle Models */}
              <h3 className="mt-5 text-xl font-bold">
                Available Vehicles
              </h3>

              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {v.cars.map((car) => (
                  <li key={car}>• {car}</li>
                ))}
              </ul>

              {/* Specs */}
              <div className="mt-6 flex items-center justify-between border-t pt-5 text-sm">
                <div className="flex items-center gap-2">
                  <Users
                    size={18}
                    className="text-[#0753b8]"
                  />
                  {v.seat}
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase
                    size={18}
                    className="text-[#0753b8]"
                  />
                  {v.bag}
                </div>
              </div>

              {/* Price */}
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Starting From
                </p>

                <h3 className="text-3xl font-bold text-[#0753b8]">
                  {v.price}
                </h3>
              </div>

              {/* Button */}
              <Link
                href={`/booking?vehicle=${encodeURIComponent(v.name)}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0753b8] px-5 py-3 font-semibold text-white transition hover:bg-[#06479d]"
              >
                Book Now
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-10 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center text-sm text-gray-700">
          <strong>Note:</strong> Prices mentioned are starting rates per
          kilometer. Applicable for local and outstation trips.
          Toll, parking, permit and state taxes (if applicable) are extra.
        </div>

      </div>
    </section>
  );
}