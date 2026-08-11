
"use client";

import {
  Users,
  Car,
  MapPin,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Happy Customers and counting",
  },
  {
    icon: Car,
    value: "1,500+",
    label: "Cars on Road well maintained fleet",
  },
  {
    icon: MapPin,
    value: "100+",
    label: "Cities Covered across India",
  },
  {
    icon: Award,
    value: "8+",
    label: "Years of Service trusted since 2016",
  },
];

export default function Statistics() {
  return (
    <section className="w-full py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 text-center sm:mb-10 lg:mb-12"
        >
          <h2
            className="
              font-[family-name:var(--font-instrument)]
              text-2xl
              font-normal
              text-slate-900
              sm:text-3xl
              lg:text-4xl
            "
          >
            SBS Taxi in Numbers
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-2xl
              font-[family-name:var(--font-jakarta)]
              text-sm
              leading-6
              text-slate-600
              sm:text-base
            "
          >
            Trusted by thousands of customers with a growing fleet
            and expanding service coverage across India.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.value}
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="
                  flex
                  min-w-0
                  flex-col
                  items-center
                  rounded-xl
                  border
                  border-slate-100
                  bg-white
                  p-4
                  text-center
                  shadow-sm
                  transition-shadow
                  duration-300
                  hover:shadow-lg
                  sm:p-6
                  lg:p-7
                "
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.12 + 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                  }}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-[#1A365D]
                    sm:h-12
                    sm:w-12
                  "
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>

                {/* Number */}
                <h4
                  className="
                    mt-4
                    font-[family-name:var(--font-instrument)]
                    text-2xl
                    font-normal
                    text-slate-900
                    sm:mt-5
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  {stat.value}
                </h4>

                {/* Label */}
                <p
                  className="
                    mt-2
                    font-[family-name:var(--font-jakarta)]
                    text-xs
                    leading-5
                    text-slate-600
                    sm:text-sm
                    sm:leading-6
                  "
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
