"use client";

import {
  Users,
  ShieldCheck,
  UserCheck,
  Star,
  Lightbulb,
} from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion";

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We put our customers first in everything we do.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Honest, transparent and fair in all our dealings.",
  },
  {
    icon: UserCheck,
    title: "Safety",
    description: "Your safety is our top priority, always.",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We strive for excellence in every ride.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace technology to serve you better.",
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
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: customEase,
    },
  },
};

export default function Values() {
  return (
    <section
      className="
        bg-[var(--background)]
        border-y border-[var(--border)]
        py-16
        my-8
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
          space-y-12
        "
      >
        {/* Heading */}
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
            duration: 0.7,
            ease: customEase,
          }}
          className="text-center"
        >
          <h2
            className="
              font-[family-name:var(--font-instrument)]
              text-2xl
              sm:text-3xl
              font-normal
              text-[var(--text)]
            "
          >
            Our Values
          </h2>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {values.map((val, idx) => {
            const Icon = val.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="
                  group
                  bg-white
                  p-6
                  rounded-2xl
                  border border-[var(--border)]
                  shadow-sm
                  flex flex-col
                  items-center
                  text-center
                  space-y-4
                  hover:shadow-xl
                  transition-shadow
                  duration-300
                "
              >
                {/* Icon */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: -10,
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
                    delay: 0.2,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 4,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                    },
                  }}
                  className="
                    w-12 h-12
                    rounded-full
                    bg-[var(--secondary)]
                    text-[var(--primary)]
                    flex items-center justify-center
                    shadow-sm
                    group-hover:shadow-md
                    transition-shadow
                    duration-300
                  "
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{
                    opacity: 0,
                    y: 10,
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
                    duration: 0.4,
                    delay: 0.3,
                    ease: customEase,
                  }}
                  className="
                    font-[family-name:var(--font-instrument)]
                    font-normal
                    text-[var(--text-primary)]
                    text-base
                  "
                >
                  {val.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 10,
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
                    duration: 0.4,
                    delay: 0.4,
                    ease: customEase,
                  }}
                  className="
                    font-[family-name:var(--font-jakarta)]
                    text-[var(--text-secondary)]
                    text-xs
                    leading-relaxed
                  "
                >
                  {val.description}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}