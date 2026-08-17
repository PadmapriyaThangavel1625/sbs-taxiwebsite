"use client";

import {
  Users,
  ShieldCheck,
  UserCheck,
  Star,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion";

const values = [
  {
    icon: Users,
    title: "Customer First",
    description:
      "We put our customers first in every decision, every service, and every journey.",
    tag: "Core Focus",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We believe in honest pricing, transparent service, and doing the right thing.",
    tag: "Trust",
  },
  {
    icon: UserCheck,
    title: "Safety",
    description:
      "Your safety comes first with responsible drivers and dependable vehicles.",
    tag: "Priority",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "We continuously improve our service to make every ride smooth and reliable.",
    tag: "Quality",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We use modern technology to make booking, travelling, and support easier.",
    tag: "Future",
  },
  {
    icon: HeartHandshake,
    title: "Reliability",
    description:
      "We are committed to being there when you need us, from pickup to destination.",
    tag: "Commitment",
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
      staggerChildren: 0.1,
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

export default function Values() {
  return (
    <section
      className="
        relative
        w-full
        py-20
        bg-[var(--background)]
        border-y
        border-[var(--border)]
        overflow-hidden
        my-8
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[600px]
          h-[300px]
          rounded-full
          bg-[var(--secondary)]
          opacity-[0.05]
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
          {/* Small Label */}
          <span
            className="
              inline-flex
              items-center
              px-3.5
              py-1
              mb-4
              rounded-full
              bg-[var(--secondary)]
              text-[var(--primary)]
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.18em]
            "
          >
            Principles
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
            What We Stand For
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              font-[family-name:var(--font-jakarta)]
              text-sm
              sm:text-base
              text-[var(--text-secondary)]
              leading-relaxed
            "
          >
            The principles that guide every ride, every interaction,
            and every decision we make at SBS Taxi.
          </p>
        </motion.div>

        {/* ================= VALUES GRID ================= */}
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
            lg:grid-cols-3
            gap-6
          "
        >
          {values.map((val, idx) => {
            const Icon = val.icon;

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
                  min-h-[270px]
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
                {/* Hover Glow */}
                <div
                  className="
                    absolute
                    -top-16
                    -right-16
                    w-36
                    h-36
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

                {/* Card Content */}
                <div className="relative z-10">

                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-7">

                    {/* Icon */}
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-[var(--secondary)]
                        text-[var(--primary)]
                        flex
                        items-center
                        justify-center
                        border
                        border-[var(--secondary)]
                        shadow-sm
                        group-hover:scale-105
                        transition-transform
                        duration-300
                      "
                    >
                      <Icon
                        className="w-6 h-6"
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Tag */}
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
                      {val.tag}
                    </span>
                  </div>

                  {/* Number */}
                  <span
                    className="
                      absolute
                      top-0
                      right-0
                      text-5xl
                      font-[family-name:var(--font-instrument)]
                      font-normal
                      text-[var(--primary)]
                      opacity-[0.04]
                      select-none
                    "
                  >
                    0{idx + 1}
                  </span>

                  {/* Title */}
                  <h3
                    className="
                      font-[family-name:var(--font-instrument)]
                      text-2xl
                      font-normal
                      tracking-tight
                      text-[var(--primary)]
                    "
                  >
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-3
                      max-w-sm
                      font-[family-name:var(--font-jakarta)]
                      text-sm
                      text-[var(--text-secondary)]
                      leading-relaxed
                    "
                  >
                    {val.description}
                  </p>
                </div>

                {/* Bottom Accent */}
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