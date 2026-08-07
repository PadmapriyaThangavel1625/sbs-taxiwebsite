"use client";

import { motion, Variants } from "framer-motion";
import {
  IndianRupee,
  UserRound,
  Clock3,
  CreditCard,
  Route,
} from "lucide-react";

const benefits = [
  {
    icon: IndianRupee,
    title: "No Hidden Charges",
    desc: "100% Transparent Billing",
  },
  {
    icon: UserRound,
    title: "No Driver Bata",
    desc: "What you see is what you pay",
  },
  {
    icon: Clock3,
    title: "No Waiting Charges",
    desc: "Ride on time, every time",
  },
  {
    icon: CreditCard,
    title: "Online Payment",
    desc: "No extra charge",
  },
  {
    icon: Route,
    title: "Toll Free",
    desc: "First 200 KM on outstation",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
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
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function BenefitsBar() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="
            bg-white
            border
            rounded-xl
            shadow-sm
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            divide-y
            sm:divide-y-0
            lg:divide-x
          "
        >
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25 },
                }}
                className="flex items-center gap-4 p-5 cursor-pointer"
              >
                {/* Animated Icon */}
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.15,
                    backgroundColor: "#EFF6FF",
                  }}
                  transition={{ duration: 0.25 }}
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-blue-200
                    text-blue-900
                  "
                >
                  <Icon size={28} />
                </motion.div>

                {/* Text */}
                <div>
                  <h3 className="text-sm font-bold text-blue-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.desc}
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