
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
          h-[135px]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-white
          px-3

          sm:h-[145px]
          md:h-[150px]
          lg:h-[145px]
          xl:h-[140px]
          2xl:h-[155px]
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
          pb-4
          pt-1

          sm:px-4
          sm:pb-5
        "
      >
        {/* Vehicle Name */}
        <h3
          className="
            truncate
            text-[15px]
            font-semibold
            text-[var(--heading)]

            sm:text-[16px]
          "
        >
          {name}
        </h3>

        {/* Vehicle Type */}
        <p
          className="
            mt-0.5
            text-[11px]
            text-[var(--muted)]

            sm:text-[12px]
          "
        >
          {type}
        </p>

        {/* ================= SEATS / LUGGAGE ================= */}
        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            gap-x-4
            gap-y-2
            text-[10px]
            text-[var(--muted)]

            sm:mt-4
            sm:gap-x-5
            sm:text-[12px]
          "
        >
          {/* Seats */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Users
              size={15}
              strokeWidth={1.7}
              className="shrink-0 text-[var(--primary)]"
            />

            <span>{seats} Seater</span>
          </div>

          {/* Luggage */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Briefcase
              size={15}
              strokeWidth={1.7}
              className="shrink-0 text-[var(--primary)]"
            />

            <span>{luggage} Luggage</span>
          </div>
        </div>

        {/* ================= PRICE ================= */}
        <div className="mt-3 flex items-baseline">
          <span
            className="
              text-[16px]
              font-bold
              text-[var(--primary)]

              sm:text-[17px]
            "
          >
            ₹{price}
          </span>

          <span
            className="
              ml-1
              text-[11px]
              text-[var(--muted)]

              sm:text-[12px]
            "
          >
            / km
          </span>
        </div>
      </div>
    </div>
  );
}
