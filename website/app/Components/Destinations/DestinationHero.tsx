"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const searchAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function DestinationHero() {
  return (
    <section className="relative min-h-[500px] w-full overflow-hidden pb-12">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/car5.png"
          alt="Popular Destinations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pt-16"
      >
        <div className="w-full max-w-3xl">

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl !font-bold text-[var(--primary)] sm:text-5xl"
            style={{
              fontFamily: "var(--font-instrument)",
            }}
          >
            Popular Destinations
          </motion.h1>

          {/* Subtitle */}
          <motion.h3
            variants={fadeUp}
            className="mt-2 text-xl font-bold text-secondary sm:text-2xl"
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            Travel anywhere with SBS Taxi.
          </motion.h3>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-3 text-base leading-relaxed text-white/95 sm:text-lg"
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            From city rides to outstation trips, we make every journey
            comfortable, safe and memorable.
          </motion.p>

          {/* Search Card */}
          <motion.div
            variants={searchAnimation}
            className="mt-6 w-full overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_160px_160px]">

              {/* Pickup */}
              <input
                type="text"
                placeholder="📍 Enter pickup location"
                className="border-b border-[var(--border)] bg-white px-4 py-4 text-sm text-[var(--text)] outline-none md:border-b-0 md:border-r"
              />

              {/* Drop */}
              <input
                type="text"
                placeholder="📍 Enter drop location"
                className="border-b border-[var(--border)] bg-white px-4 py-4 text-sm text-[var(--text)] outline-none md:border-b-0 md:border-r"
              />

              {/* Date */}
              <input
                type="date"
                className="border-b border-[var(--border)] bg-white px-4 py-4 text-sm text-[var(--text)] outline-none md:border-b-0 md:border-r"
              />

              {/* Explore Button */}
              <div className="flex items-center justify-center bg-white p-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full rounded-lg !bg-[var(--primary)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
                  style={{
                    fontFamily: "var(--font-jakarta)",
                  }}
                >
                  Explore Fares
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}