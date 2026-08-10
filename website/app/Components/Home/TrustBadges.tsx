
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
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TrustBadges() {
  return (
    <section className="w-full bg-[var(--background)] py-6 sm:py-8 md:py-10">
      <div className="container-custom">
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
            border-gray-200
            bg-white
            shadow-sm

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
                  y: -6,
                  scale: 1.03,
                  transition: {
                    duration: 0.25,
                  },
                }}
                className={`
                  group
                  flex
                  min-h-[82px]
                  cursor-pointer
                  items-center
                  gap-3
                  px-4
                  py-4
                  transition

                  sm:px-5
                  sm:py-5

                  lg:px-4
                  xl:px-5

                  ${
                    index !== items.length - 1
                      ? `
                        border-b
                        border-gray-200

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
                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.15,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="shrink-0"
                >
                  <Icon
                    size={32}
                    strokeWidth={1.8}
                    className="
                      text-[var(--primary)]

                      sm:h-[34px]
                      sm:w-[34px]
                    "
                  />
                </motion.div>

                {/* Content */}
                <div className="min-w-0">
                  <h3
                    className="
                      text-[12px]
                      font-bold
                      leading-5
                      text-[var(--primary)]

                      sm:text-[13px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      leading-4
                      text-[var(--muted)]

                      sm:text-[11px]
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
