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
    label: "Happy Customers and counting",
  },
  {
    icon: Car,
    value: "6+",
    label: "Cars on Road well maintained fleet",
  },
  {
    icon: MapPin,
    value: "5+",
    label: "Cities Covered across Tamil Nadu",
  },
  {
    icon: Award,
    value: "",
    label: "New Startup Venture in Travel Business 2026",
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
      staggerChildren: 0.14,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: customEase,
    },
  },
};

export default function Statistics() {
  return (
    <section className="w-full py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.7,
            ease: customEase,
          }}
          className="mb-8 text-center sm:mb-10 lg:mb-12"
        >
          <h2
            className="
              font-[family-name:var(--font-instrument)]
              text-2xl
              font-normal
              text-[var(--text-primary)]
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
              text-[var(--text-secondary)]
              sm:text-base
            "
          >
            Trusted by thousands of customers with a growing fleet
            and expanding service coverage across India.
          </p>
        </motion.div>

        {/* Statistics Grid */}
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
            grid-cols-2
            gap-4
            sm:gap-6
            lg:grid-cols-4
            lg:gap-8
          "
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="
                  group
                  relative
                  flex
                  min-w-0
                  flex-col
                  items-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-white
                  p-4
                  text-center
                  shadow-sm
                  transition-shadow
                  duration-300
                  hover:shadow-xl
                  sm:p-6
                  lg:p-7
                "
              >

                {/* Hover glow */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-[var(--secondary)]
                    opacity-0
                    blur-2xl
                  "
                />

                {/* Icon */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.4,
                    rotate: -15,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                    delay: 0.25,
                  }}
                  whileHover={{
                    scale: 1.12,
                    rotate: 5,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                    },
                  }}
                  className="
                    relative
                    z-10
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--secondary)]
                    text-[var(--primary)]
                    shadow-sm
                    transition-shadow
                    duration-300
                    group-hover:shadow-md
                    sm:h-12
                    sm:w-12
                  "
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>

                {/* Number */}
                <motion.h4
                  initial={{
                    opacity: 0,
                    y: 15,
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
                    duration: 0.5,
                    delay: 0.35,
                    ease: customEase,
                  }}
                  className="
                    relative
                    z-10
                    mt-4
                    font-[family-name:var(--font-instrument)]
                    text-2xl
                    font-normal
                    text-[var(--text-primary)]
                    transition-transform
                    duration-300
                    group-hover:scale-105
                    sm:mt-5
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  {stat.value}
                </motion.h4>

                {/* Label */}
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 12,
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
                    duration: 0.5,
                    delay: 0.45,
                    ease: customEase,
                  }}
                  className="
                    relative
                    z-10
                    mt-2
                    font-[family-name:var(--font-jakarta)]
                    text-xs
                    leading-5
                    text-[var(--text-secondary)]
                    sm:text-sm
                    sm:leading-6
                  "
                >
                  {stat.label}
                </motion.p>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}