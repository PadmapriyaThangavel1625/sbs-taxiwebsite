"use client";

import { motion, Variants } from "framer-motion";
import {
  CreditCard,
  FileText,
  Route,
  Timer,
  UserRound,
} from "lucide-react";

const items = [
  {
    icon: FileText,
    title: "No Hidden Charges",
    text: "100% Transparent billing",
  },
  {
    icon: UserRound,
    title: "No Driver Bata",
    text: "What you see is what you pay",
  },
  {
    icon: Timer,
    title: "No Waiting Charges",
    text: "Ride on time, every time",
  },
  {
    icon: CreditCard,
    title: "Online Payment",
    text: "No extra charges",
  },
  {
    icon: Route,
    title: "Toll Free",
    text: "First 200 KM on outstation",
  },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function TrustBadges() {
  return (
    <section className="relative w-full bg-transparent py-6 sm:py-8 md:py-10 lg:py-12">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-3
          sm:px-4
          md:px-6
          lg:px-8
          xl:px-10
          2xl:px-12
        "
      >
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
            w-full
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-[0_10px_35px_rgba(0,0,0,0.07)]

            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-5
          "
        >
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(248,250,252,1)",
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className={`
                  group
                  relative
                  flex
                  w-full
                  min-w-0
                  items-center
                  gap-3
                  px-4
                  py-4
                  transition-colors
                  duration-300

                  sm:px-4
                  sm:py-4

                  md:px-5
                  md:py-5

                  lg:min-h-[92px]
                  lg:px-4
                  lg:py-4

                  xl:px-5

                  2xl:px-6

                  ${
                    index !== items.length - 1
                      ? `
                        border-b
                        border-gray-100

                        lg:border-b-0
                        lg:border-r
                      `
                      : ""
                  }

                  ${
                    index === 1
                      ? `
                        sm:border-r-0
                        lg:border-r
                      `
                      : ""
                  }

                  ${
                    index === 3
                      ? `
                        sm:border-r-0
                        lg:border-r
                      `
                      : ""
                  }
                `}
              >
                {/* =================================================
                    HOVER ACCENT
                ================================================== */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    origin-left
                    scale-x-0
                    bg-[var(--secondary)]
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-x-100
                  "
                />

                {/* =================================================
                    ICON
                ================================================== */}

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.15,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-[var(--primary)]
                    transition-all
                    duration-300

                    group-hover:bg-[var(--secondary)]/10
                    group-hover:text-[var(--secondary)]
                    group-hover:drop-shadow-[0_0_5px_rgba(255,193,7,0.25)]

                    sm:h-10
                    sm:w-10

                    md:h-11
                    md:w-11

                    lg:h-10
                    lg:w-10

                    xl:h-11
                    xl:w-11
                  "
                >
                  <Icon
                    className="
                      h-6
                      w-6

                      sm:h-6
                      sm:w-6

                      md:h-7
                      md:w-7

                      lg:h-6
                      lg:w-6
                    "
                    strokeWidth={1.8}
                  />
                </motion.div>

                {/* =================================================
                    CONTENT
                ================================================== */}

                <div className="min-w-0 flex-1">
                  <h3
                    className="
                      truncate
                      text-[11px]
                      font-bold
                      leading-4
                      text-[var(--primary)]
                      transition-colors
                      duration-300

                      group-hover:text-[var(--secondary)]

                      sm:text-xs
                      sm:leading-5

                      md:text-[13px]

                      lg:text-[11px]

                      xl:text-xs

                      2xl:text-[13px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-0.5
                      line-clamp-2
                      text-[9px]
                      font-medium
                      leading-4
                      text-[var(--muted)]
                      transition-colors
                      duration-300

                      sm:text-[10px]

                      md:text-[11px]

                      lg:text-[10px]

                      xl:text-[11px]
                    "
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}