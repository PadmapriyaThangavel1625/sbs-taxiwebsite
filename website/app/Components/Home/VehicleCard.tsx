"use client";

import Image from "next/image";
import { Users, Briefcase } from "lucide-react";

interface VehicleCardProps {
  name: string;
  type: string;
  image?: string;
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
  const validImage =
    typeof image === "string" && image.trim().length > 0
      ? image
      : null;

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
        hover:-translate-y-1
        hover:border-[var(--secondary)]
        hover:shadow-lg
      "
    >
      {/* =====================================================
          VEHICLE IMAGE
      ====================================================== */}

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
        {validImage ? (
          <Image
            src={validImage}
            alt={`${name} - ${type}`}
            width={300}
            height={160}
            sizes="
              (max-width: 420px) 90vw,
              (max-width: 640px) 45vw,
              (max-width: 768px) 45vw,
              (max-width: 1024px) 30vw,
              (max-width: 1280px) 17vw,
              16vw
            "
            className="
              h-auto
              max-h-full
              w-full
              object-contain
              transition-transform
              duration-500
              ease-out
              group-hover:scale-105
            "
          />
        ) : (
          /* =================================================
             IMAGE FALLBACK
          ================================================== */

          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gray-50
              text-xs
              font-medium
              text-[var(--muted)]
            "
          >
            Vehicle Image
          </div>
        )}
      </div>

      {/* =====================================================
          DETAILS
      ====================================================== */}

      <div
        className="
          px-3
          pb-3.5
          pt-2

          sm:px-4
          sm:pb-4
        "
      >
        {/* =================================================
            VEHICLE NAME
        ================================================== */}

        <h3
          className="
            truncate
            text-[14px]
            font-bold
            leading-5
            text-[var(--heading)]

            sm:text-[15px]

            md:text-[16px]
          "
          style={{
            fontFamily: "var(--font-jakarta)",
          }}
        >
          {name}
        </h3>

        {/* =================================================
            VEHICLE TYPE
        ================================================== */}

        <p
          className="
            mt-0.5
            text-[10px]
            leading-4
            text-[var(--muted)]

            sm:text-[11px]

            md:text-[12px]
          "
          style={{
            fontFamily: "var(--font-jakarta)",
          }}
        >
          {type}
        </p>

        {/* =================================================
            SEATS / LUGGAGE
        ================================================== */}

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
          style={{
            fontFamily: "var(--font-jakarta)",
          }}
        >
          {/* SEATS */}

          <div
            className="
              flex
              items-center
              gap-1.5
              whitespace-nowrap
            "
          >
            <Users
              size={14}
              strokeWidth={1.8}
              className="
                shrink-0
                text-[var(--primary)]
                transition-colors
                duration-200
                group-hover:text-[var(--secondary)]
              "
            />

            <span>
              {seats} Seater
            </span>
          </div>

          {/* LUGGAGE */}

          <div
            className="
              flex
              items-center
              gap-1.5
              whitespace-nowrap
            "
          >
            <Briefcase
              size={14}
              strokeWidth={1.8}
              className="
                shrink-0
                text-[var(--primary)]
                transition-colors
                duration-200
                group-hover:text-[var(--secondary)]
              "
            />

            <span>
              {luggage} Luggage
            </span>
          </div>
        </div>

        {/* =================================================
            PRICE
        ================================================== */}

        <div
          className="
            mt-2.5
            flex
            items-baseline
          "
        >
          <span
            className="
              text-[15px]
              font-bold
              leading-5
              text-[var(--primary)]

              sm:text-[16px]

              md:text-[17px]
            "
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
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