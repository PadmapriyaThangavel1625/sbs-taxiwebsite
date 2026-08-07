import Image from "next/image";
import { Users, Briefcase } from "lucide-react";

interface VehicleCardProps {
  name: string;
  type: string;
  image: string;
  seats: number;
  luggage: number;
  price: string;
}

export default function VehicleCard({
  name,
  type,
  image,
  seats,
  luggage,
  price,
}: VehicleCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Vehicle Image */}
      <div className="relative flex h-[145px] items-center justify-center bg-white px-3">
        <Image
          src={image}
          alt={name}
          width={300}
          height={160}
          className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="px-3 pb-4">
        <h3 className="text-[16px] font-semibold text-gray-900">
          {name}
        </h3>

        <p className="mt-0.5 text-[12px] text-gray-500">
          {type}
        </p>

        {/* Seats / Luggage */}
        <div className="mt-4 flex items-center gap-5 text-[12px] text-gray-600">
          <div className="flex items-center gap-1.5">
            <Users size={15} strokeWidth={1.7} />
            <span>{seats} Seater</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Briefcase size={15} strokeWidth={1.7} />
            <span>{luggage} Luggage</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-3">
          <span className="text-[16px] font-bold text-blue-700">
            ₹{price}
          </span>

          <span className="ml-1 text-[12px] text-gray-500">
            / km
          </span>
        </div>
      </div>
    </div>
  );
}