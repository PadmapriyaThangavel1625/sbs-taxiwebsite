"use client";

import Image from "next/image";

import {
  Users,
  Luggage,
  Snowflake,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

/* =========================================================
   TYPES
========================================================= */

export interface Fleet {
  name: string;
  type: string;
  vehicles: string;
  image: string;
  seat: string;
  bags: string;
  price: string;
}

interface Props extends Fleet {}

/* =========================================================
   COMPONENT
========================================================= */

export default function FleetCard({
  name,
  type,
  vehicles,
  image,
  seat,
  bags,
  price,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="
        flex
        h-full
        min-h-[390px]
        w-full
        flex-col
        justify-between
        overflow-hidden
        rounded-2xl
        border
        border-[var(--border)]
        bg-white
        p-4
        shadow-sm
        transition-shadow
        duration-300
        hover:shadow-lg
        sm:p-5
      "
    >
      {/* =====================================================
          TOP SECTION
      ====================================================== */}

      <div>
        {/* Vehicle Name */}

        <div className="flex items-center justify-between gap-2">
          <h2
            className="
              font-[family-name:var(--font-jakarta)]
              text-base
              font-bold
              text-[var(--text-primary)]
            "
          >
            {name}
          </h2>

          <span
            className="
              rounded-full
              bg-[var(--secondary)]
              px-2.5
              py-1
              font-[family-name:var(--font-jakarta)]
              text-[10px]
              font-semibold
              text-[var(--text-primary)]
            "
          >
            {type}
          </span>
        </div>

        {/* =================================================
            VEHICLE IMAGE
        ================================================== */}

        <motion.div
          whileHover={{
            scale: 1.04,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            relative
            mt-5
            h-32
            w-full
            sm:h-36
          "
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-contain
              transition-transform
              duration-500
            "
          />
        </motion.div>

        {/* =================================================
            VEHICLE TYPE
        ================================================== */}

        <h3
          className="
            mt-4
            font-[family-name:var(--font-instrument)]
            text-xl
            font-normal
            text-[var(--text-primary)]
          "
        >
          {type}
        </h3>

        {/* =================================================
            VEHICLE DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-1
            line-clamp-2
            font-[family-name:var(--font-jakarta)]
            text-sm
            leading-5
            text-[var(--text-secondary)]
          "
        >
          {vehicles}
        </p>
      </div>

      {/* =====================================================
          BOTTOM SECTION
      ====================================================== */}

      <div>
        {/* =================================================
            FEATURES
        ================================================== */}

        <div
          className="
            mt-5
            grid
            grid-cols-3
            gap-2
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--secondary-light)]
            p-3
            text-center
          "
        >
          {/* Seats */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-1
            "
          >
            <Users
              size={18}
              className="text-[var(--primary)]"
            />

            <span
              className="
                font-[family-name:var(--font-jakarta)]
                text-[10px]
                text-[var(--text-secondary)]
                sm:text-xs
              "
            >
              {seat}
            </span>
          </div>

          {/* Bags */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-1
            "
          >
            <Luggage
              size={18}
              className="text-[var(--primary)]"
            />

            <span
              className="
                font-[family-name:var(--font-jakarta)]
                text-[10px]
                text-[var(--text-secondary)]
                sm:text-xs
              "
            >
              {bags}
            </span>
          </div>

          {/* AC */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-1
            "
          >
            <Snowflake
              size={18}
              className="text-[var(--primary)]"
            />

            <span
              className="
                font-[family-name:var(--font-jakarta)]
                text-[10px]
                text-[var(--text-secondary)]
                sm:text-xs
              "
            >
              AC
            </span>
          </div>
        </div>

        {/* =================================================
            PRICE
        ================================================== */}

        <div className="mt-4">
          <span
            className="
              font-[family-name:var(--font-jakarta)]
              text-[10px]
              text-[var(--text-secondary)]
            "
          >
            Starting from
          </span>

          <h2
            className="
              mt-0.5
              font-[family-name:var(--font-instrument)]
              text-2xl
              font-normal
              text-[var(--primary)]
            "
          >
            ₹{price}

            <span
              className="
                font-[family-name:var(--font-jakarta)]
                text-sm
                font-normal
                text-[var(--text-secondary)]
              "
            >
              {" "}
              / km
            </span>
          </h2>
        </div>

        {/* =================================================
            VIEW DETAILS BUTTON
        ================================================== */}

        <button
          type="button"
          className="
            group
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[var(--primary)]
            px-4
            py-2.5
            font-[family-name:var(--font-jakarta)]
            text-sm
            font-semibold
            text-[var(--text-primary)]
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[var(--primary-dark)]
            hover:shadow-md
          "
        >
          View Details

          <ArrowRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </button>
      </div>
    </motion.div>
  );
}