"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
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
    <section className="bg-[#f5f9ff] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-[#d9e6f5] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    transition: { duration: 0.25 },
                  }}
                  className={`flex items-center gap-3 px-5 py-5 cursor-pointer ${
                    index !== items.length - 1
                      ? "border-b border-[#d9e6f5] md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.15,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <Icon
                      size={34}
                      strokeWidth={1.8}
                      className="shrink-0 text-[#0753b8]"
                    />
                  </motion.div>

                  <div>
                    <h3 className="text-[13px] font-bold text-[#0753b8]">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-[11px] text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}