
"use client";

import {
  ShieldCheck,
  Clock,
  BadgePercent,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Verified drivers & well maintained cars",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "Punctual pickups every time",
  },
  {
    icon: BadgePercent,
    title: "Transparent Pricing",
    description: "No hidden charges, 100% transparent",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We are always here to assist you",
  },
];

export default function Features() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            grid
            grid-cols-1
            overflow-hidden
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
            shadow-xl
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="
                  flex
                  items-start
                  gap-4
                  border-b
                  border-[var(--border)]
                  p-5

                  sm:[&:nth-child(odd)]:border-r
                  sm:[&:nth-child(3)]:border-b-0
                  sm:[&:nth-child(4)]:border-b-0

                  lg:border-b-0
                  lg:border-r
                  lg:last:border-r-0
                "
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--primary-light)]
                    text-[var(--secondary)]
                  "
                >
                  <Icon className="h-6 w-6" />
                </motion.div>

                {/* Content */}
                <div className="min-w-0 pt-0.5">
                  <h3
                    className="
                      font-[family-name:var(--font-instrument)]
                      text-sm
                      font-bold
                      text-[var(--text)]
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      font-[family-name:var(--font-jakarta)]
                      text-xs
                      leading-5
                      text-[var(--muted)]
                    "
                  >
                    {feature.description}
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
