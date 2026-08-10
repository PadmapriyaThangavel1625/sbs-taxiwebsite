
"use client";

import Image from "next/image";

// Export the interface so it can be imported elsewhere
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
        transition
        duration-200
        hover:shadow-lg
        ${
          isSelected
            ? "ring-2 ring-primary"
            : ""
        }
      `}
    >
      {/* Top Section */}
      <div>
        {/* Fleet Name */}
        <h2 className="text-base font-bold text-heading">
          {name}
        </h2>

        {/* Vehicle Image */}
        <div className="relative mt-4 h-32 w-full sm:h-36">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

      {/* Bottom Section */}
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
          <span>👤 {seat}</span>
          <span>🧳 {bags}</span>
          <span>❄ AC</span>
        </div>

        {/* Price */}
        <h2 className="mt-4 text-xl font-bold text-primary">
          ₹{price} / km
        </h2>

        {/* Button */}
        <button
          type="button"
          onClick={onSelect}
          className="
            mt-3
            w-full
            rounded-lg
            border
            border-primary
            px-4
            py-2
            font-semibold
            text-primary
            transition
            duration-200
            hover:bg-primary
            hover:text-white
          "
        >
          {isSelected ? "Selected Details" : "View Details"}
        </button>
      </div>
    </div>
  );
}
