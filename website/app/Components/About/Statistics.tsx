"use client";

import {
  Users,
  Car,
  MapPin,
  Award,
} from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "15+",
    label: "Happy Customers & Counting",
    highlight: "Growing Fast",
  },
  {
    icon: Car,
    value: "6+",
    label: "Well-Maintained Fleet Cars",
    highlight: "Ready 24/7",
  },
  {
    icon: MapPin,
    value: "5+",
    label: "Cities Covered Across Tamil Nadu",
    highlight: "Wide Reach",
  },
  {
    icon: Award,
    value: "2026",
    label: "New Startup Venture in Travel",
    highlight: "Started Fresh",
  },
];

const customEase: Easing = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: customEase,
    },
  },
};

export default function Statistics() {
  return (
    <section
      className="
        relative
        w-full
        py-20
        bg-[var(--background)]
        overflow-hidden
      "
    >
      {/* Soft Background Decoration */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[300px]
          rounded-full
          bg-[var(--secondary)]
          opacity-[0.06]
          blur-3xl
          pointer-events-none
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            ease: customEase,
          }}
          className="mb-14 text-center"
        >
          {/* Label */}
          <span
            className="
              inline-flex
              items-center
              px-3.5
              py-1
              mb-4
              rounded-full
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.18em]
              bg-[var(--secondary)]
              text-[var(--primary)]
            "
          >
            Milestones
          </span>

          {/* Heading */}
          <h2
            className="
              font-[family-name:var(--font-instrument)]
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-normal
              tracking-tight
              text-[var(--primary)]
            "
          >
            SBS Taxi in Numbers
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              font-[family-name:var(--font-jakarta)]
              text-sm
              sm:text-base
              text-[var(--text-secondary)]
              leading-relaxed
            "
          >
            Building trust mile by mile with exceptional service
            and a dependable fleet across Tamil Nadu.
          </p>
        </motion.div>

        {/* ================= STATISTICS ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  min-h-[250px]
                  p-7
                  sm:p-8
                  rounded-3xl
                  bg-white
                  border
                  border-[var(--border)]
                  shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                  hover:border-[var(--secondary)]
                  hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
                  transition-all
                  duration-300
                  overflow-hidden
                "
              >

                {/* Subtle Hover Glow */}
                <div
                  className="
                    absolute
                    -top-16
                    -right-16
                    w-32
                    h-32
                    rounded-full
                    bg-[var(--secondary)]
                    opacity-0
                    blur-3xl
                    group-hover:opacity-20
                    transition-opacity
                    duration-500
                    pointer-events-none
                  "
                />

                {/* ================= TOP ================= */}
                <div className="relative flex items-center justify-between w-full mb-8">

                  {/* Icon */}
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      rounded-2xl
                      bg-[var(--secondary)]
                      text-[var(--primary)]
                      border
                      border-[var(--secondary)]
                      shadow-sm
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>

                  {/* Highlight */}
                  <span
                    className="
                      px-2.5
                      py-1
                      rounded-full
                      text-[10px]
                      font-semibold
                      tracking-wide
                      bg-[var(--background)]
                      text-[var(--primary)]
                      border
                      border-[var(--border)]
                      group-hover:border-[var(--secondary)]
                      transition-colors
                      duration-300
                    "
                  >
                    {stat.highlight}
                  </span>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="relative">

                  {/* Number */}
                  <h3
                    className="
                      font-[family-name:var(--font-instrument)]
                      text-4xl
                      sm:text-5xl
                      font-normal
                      tracking-tight
                      text-[var(--primary)]
                    "
                  >
                    {stat.value}
                  </h3>

                  {/* Label */}
                  <p
                    className="
                      mt-3
                      max-w-[220px]
                      font-[family-name:var(--font-jakarta)]
                      text-sm
                      text-[var(--text-secondary)]
                      leading-relaxed
                    "
                  >
                    {stat.label}
                  </p>
                </div>

                {/* ================= BOTTOM LINE ================= */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-8
                    right-8
                    h-[2px]
                    rounded-full
                    bg-[var(--secondary)]
                    scale-x-0
                    origin-center
                    group-hover:scale-x-100
                    transition-transform
                    duration-500
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}