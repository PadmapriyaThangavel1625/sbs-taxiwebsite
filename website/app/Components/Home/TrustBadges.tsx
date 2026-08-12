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
    scale: 0.95,
    y: 40,
  },

  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function TrustBadges() {
  return (
    <section className="relative w-full bg-transparent py-6 sm:py-8 lg:py-10">
      {/* =====================================================
          TRUST BADGES CONTAINER
          Positioned BELOW the banner/image
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-7xl
          justify-center
          px-4
          sm:px-6
          lg:px-8
          mt-0
          sm:mt-2
          lg:mt-4
        "
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            grid
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-gray-200/80
            bg-white
            shadow-2xl

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
                  y: -4,
                  backgroundColor: "rgba(249, 250, 251, 1)",
                  transition: {
                    duration: 0.2,
                  },
                }}
                className={`
                  group
                  flex
                  min-h-[76px]
                  cursor-pointer
                  items-center
                  gap-3
                  px-4
                  py-3.5
                  transition-colors

                  sm:min-h-[82px]
                  sm:px-5
                  sm:py-4

                  lg:min-h-[88px]
                  lg:px-4

                  xl:px-5

                  ${
                    index !== items.length - 1
                      ? `
                        border-b
                        border-gray-100

                        sm:border-b
                        ${
                          index % 2 === 0
                            ? "sm:border-r"
                            : "sm:border-r-0"
                        }

                        lg:border-b-0
                        lg:border-r

                        lg:last:border-r-0
                      `
                      : ""
                  }
                `}
              >
                {/* =================================================
                    ICON
                ================================================== */}
                <motion.div
                  whileHover={{
                    rotate: 12,
                    scale: 1.15,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="shrink-0"
                >
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="
                      text-[var(--primary)]

                      sm:h-8
                      sm:w-8

                      lg:h-[30px]
                      lg:w-[30px]
                    "
                  />
                </motion.div>

                {/* =================================================
                    CONTENT
                ================================================== */}
                <div className="min-w-0">
                  <h3
                    className="
                      text-[11px]
                      font-bold
                      leading-4
                      text-[var(--primary)]

                      sm:text-[12px]
                      sm:leading-5

                      lg:text-[12px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      leading-4
                      text-[var(--muted)]

                      sm:text-[10px]

                      lg:text-[10px]
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