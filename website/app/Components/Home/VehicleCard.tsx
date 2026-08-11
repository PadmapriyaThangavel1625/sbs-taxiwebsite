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
    <div
      className="
        group
        w-full
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-[var(--primary)]
        hover:shadow-lg
      "
    >
      {/* ================= VEHICLE IMAGE ================= */}
      <div
        className="
          relative
          flex
          h-[130px]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-white
          px-3
          sm:h-[140px]
          md:h-[145px]
          lg:h-[140px]
          xl:h-[135px]
          2xl:h-[150px]
        "
      >
        <Image
          src={image}
          alt={name}
          width={300}
          height={160}
          sizes="
            (max-width: 640px) 90vw,
            (max-width: 768px) 45vw,
            (max-width: 1024px) 30vw,
            17vw
          "
          className="
            h-auto
            max-h-full
            w-full
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* ================= DETAILS ================= */}
      <div
        className="
          px-3
          pb-3.5
          pt-1
          sm:px-4
          sm:pb-4
        "
      >
        {/* Vehicle Name */}
        <h3
          className="
            truncate
            text-[14px]
            font-semibold
            leading-5
            text-[var(--heading)]
            sm:text-[15px]
            md:text-[16px]
          "
        >
          {name}
        </h3>

        {/* Vehicle Type */}
        <p
          className="
            mt-0.5
            text-[10px]
            leading-4
            text-[var(--muted)]
            sm:text-[11px]
            md:text-[12px]
          "
        >
          {type}
        </p>

        {/* ================= SEATS / LUGGAGE ================= */}
        <div
          className="
            mt-2.5
            flex
            flex-wrap
            items-center
            gap-x-3
            gap-y-1.5
            text-[9px]
            leading-4
            text-[var(--muted)]
            sm:mt-3
            sm:gap-x-4
            sm:text-[10px]
            md:text-[11px]
          "
        >
          {/* Seats */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Users
              size={14}
              strokeWidth={1.7}
              className="shrink-0 text-[var(--primary)]"
            />

            <span>{seats} Seater</span>
          </div>

          {/* Luggage */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Briefcase
              size={14}
              strokeWidth={1.7}
              className="shrink-0 text-[var(--primary)]"
            />

            <span>{luggage} Luggage</span>
          </div>
        </div>

        {/* ================= PRICE ================= */}
        <div className="mt-2.5 flex items-baseline">
          <span
            className="
              text-[15px]
              font-bold
              leading-5
              text-[var(--primary)]
              sm:text-[16px]
              md:text-[17px]
            "
          >
            ₹{price}
          </span>

          <span
            className="
              ml-1
              text-[10px]
              leading-4
              text-[var(--muted)]
              sm:text-[11px]
              md:text-[12px]
            "
          >
            / km
          </span>
        </div>
      </div>
    </div>
  );
}