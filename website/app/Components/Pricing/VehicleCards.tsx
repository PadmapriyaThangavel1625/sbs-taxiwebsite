
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";

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
    image: "/vehicle/muv-plus.png",
  },
];

export default function VehiclePricing() {
  return (
    <section className="section-bg py-10 sm:py-12 lg:py-16 font-[var(--font-jakarta)]">
      <div className="container-custom">

        {/* Vehicle Grid */}
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
                flex
                h-full
                flex-col
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                sm:p-6
              "
            >
              {/* Badge */}
              <div>
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-primary
                    px-4
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  {vehicle.name}
                </span>
              </div>

              {/* Image */}
              <div className="relative mt-5 h-40 w-full sm:h-44">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "
                  className="object-contain"
                />
              </div>

              {/* Vehicle Models */}
              <h3 className="mt-5 text-xl font-bold text-heading">
                Available Vehicles
              </h3>

              <ul
                className="
                  mt-3
                  min-h-[72px]
                  space-y-1
                  text-sm
                  leading-5
                  text-muted
                "
              >
                {vehicle.cars.map((car) => (
                  <li key={car}>
                    • {car}
                  </li>
                ))}
              </ul>

              {/* Specs */}
              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  border-t
                  pt-5
                  text-sm
                  text-muted
                "
              >
                <div className="flex items-center gap-2">
                  <Users
                    size={18}
                    className="shrink-0 text-primary"
                  />

                  <span>{vehicle.seat}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase
                    size={18}
                    className="shrink-0 text-primary"
                  />

                  <span>{vehicle.bag}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-5">
                <p className="text-sm text-muted">
                  Starting From
                </p>

                <h3 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">
                  {vehicle.price}
                </h3>
              </div>

              {/* Button */}
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
                  bg-primary
                  px-5
                  py-3
                  font-semibold
                  !text-white
                  transition
                  hover:bg-primary-dark
                "
              >
                Book Now
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className="
            mt-8
            rounded-xl
            border
            border-primary
            bg-primary-light
            p-4
            text-center
            text-sm
            leading-6
            text-muted
            sm:mt-10
          "
        >
          <strong className="text-heading">
            Note:
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
