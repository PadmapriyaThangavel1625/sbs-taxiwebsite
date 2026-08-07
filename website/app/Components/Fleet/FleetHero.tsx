"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
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

export default function FleetHero() {
  return (
    <section className="relative h-[450px] overflow-hidden">
      {/* Background Image with Scale Animation */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/car3.png"
          alt="fleet"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-950/70" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-8 pt-12 text-white"
      >
        <motion.h1 variants={fadeUp} className="text-5xl font-bold">
          Our Fleet
        </motion.h1>

        <motion.h3
          variants={fadeUp}
          className="text-yellow-400 text-xl font-semibold mt-2"
        >
          Premium cars. Best comfort. Affordable fares.
        </motion.h3>

        <motion.p variants={fadeUp} className="mt-4 max-w-lg text-lg">
          Choose from our wide range of well-maintained vehicles
          that suits your travel needs and budget.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-8 mt-8">
          <div>
            🛡️ Safe & Sanitized
            <p className="text-sm">
              100% Safe Rides
            </p>
          </div>

          <div>
            👨‍✈️ Professional Drivers
            <p className="text-sm">
              Verified & Trained
            </p>
          </div>

          <div>
            ₹ Transparent Pricing
            <p className="text-sm">
              No Hidden Charges
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}