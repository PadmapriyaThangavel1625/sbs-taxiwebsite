"use client";

import Image from "next/image";

// Export the interface here so it can be imported elsewhere
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
    <div className={`bg-white rounded-xl shadow-sm border p-3 hover:shadow-lg transition flex flex-col justify-between h-full ${isSelected ? 'ring-2 ring-blue-900' : ''}`}>
      <div>
        <span className="bg-blue-900 text-white px-3 py-1 rounded text-xs">
          {name}
        </span>

        <div className="relative h-32 mt-4">
          <Image src={image} alt={name} fill className="object-contain" />
        </div>

        <h3 className="font-bold mt-3">{type}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">{vehicles}</p>
      </div>

      <div>
        <div className="flex justify-between text-sm mt-4 text-gray-700">
          <span>👤 {seat}</span>
          <span>🧳 {bags}</span>
          <span>❄ AC</span>
        </div>

        <h2 className="text-blue-900 font-bold text-xl mt-4">
          ₹{price} / km
        </h2>

        <button
          onClick={onSelect}
          className="w-full border border-blue-900 text-blue-900 rounded py-2 mt-3 font-semibold hover:bg-blue-900 hover:text-white transition cursor-pointer"
        >
          {isSelected ? "Selected Details" : "View Details"}
        </button>
      </div>
    </div>
  );
}