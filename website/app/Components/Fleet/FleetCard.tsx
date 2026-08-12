"use client";

import Image from "next/image";
import {
  Users,
  Luggage,
  Snowflake,
  CheckCircle2,
} from "lucide-react";

export interface Fleet {
  name: string;
  type: string;
  vehicles: string;
  image: string;
  seat: string;
  bags: string;
  price: string;
}

interface Props extends Fleet {
  onSelect: () => void;
  isSelected: boolean;
}

export default function FleetCard({
  name,
  type,
  vehicles,
  image,
  seat,
  bags,
  price,
  onSelect,
  isSelected,
}: Props) {
  return (
    <div
      className={`
        flex
        h-full
        min-h-[390px]
        w-full
        flex-col
        justify-between
        rounded-xl
        border
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
        ${
          isSelected
            ? "border-primary ring-2 ring-primary/30"
            : "border-gray-200"
        }
      `}
    >
      {/* ================================
          Top Section
      ================================= */}
      <div>
        {/* Fleet Name */}
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-bold text-heading">
            {name}
          </h2>

          {isSelected && (
            <CheckCircle2
              size={20}
              className="shrink-0 text-primary"
            />
          )}
        </div>

        {/* Vehicle Image */}
        <div className="relative mt-4 h-32 w-full sm:h-36">
          <Image
            src={image}
            alt={name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="object-contain"
          />
        </div>

        {/* Vehicle Type */}
        <h3 className="mt-3 font-bold text-heading">
          {type}
        </h3>

        {/* Vehicle Description */}
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted">
          {vehicles}
        </p>
      </div>

      {/* ================================
          Bottom Section
      ================================= */}
      <div>
        {/* Features */}
        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-2
            text-center
            text-xs
            text-muted
            sm:text-sm
          "
        >
          {/* Seats */}
          <div className="flex flex-col items-center gap-1">
            <Users
              size={18}
              className="text-primary"
            />

            <span>{seat}</span>
          </div>

          {/* Bags */}
          <div className="flex flex-col items-center gap-1">
            <Luggage
              size={18}
              className="text-primary"
            />

            <span>{bags}</span>
          </div>

          {/* AC */}
          <div className="flex flex-col items-center gap-1">
            <Snowflake
              size={18}
              className="text-primary"
            />

            <span>AC</span>
          </div>
        </div>

        {/* Price */}
        <h2 className="mt-4 text-xl font-bold text-primary">
          ₹{price}
          <span className="text-sm font-normal text-muted">
            {" "}
            / km
          </span>
        </h2>

        {/* Button */}
        <button
          type="button"
          onClick={onSelect}
          className={`
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            px-4
            py-2
            font-semibold
            transition-all
            duration-200
            ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-primary text-primary hover:bg-primary hover:text-white"
            }
          `}
        >
          {isSelected && (
            <CheckCircle2 size={18} />
          )}

          {isSelected
            ? "Selected Details"
            : "View Details"}
        </button>
      </div>
    </div>
  );
}