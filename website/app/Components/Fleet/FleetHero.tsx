
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
    <section className="relative min-h-[420px] overflow-hidden">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/car2.png"
          alt="Our Fleet"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary-dark/80" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="
          container-custom
          relative
          z-10
          flex
          min-h-[420px]
          flex-col
          justify-center
          py-12
          text-white
        "
      >
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="
            text-3xl
            font-bold
            sm:text-4xl
            lg:text-5xl
          "
        >
          Our Fleet
        </motion.h1>

        {/* Subtitle */}
        <motion.h3
          variants={fadeUp}
          className="
            mt-2
            text-lg
            font-semibold
            text-secondary
            sm:text-xl
          "
        >
          Premium cars. Best comfort. Affordable fares.
        </motion.h3>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="
            mt-4
            max-w-lg
            text-sm
            leading-6
            sm:text-base
            lg:text-lg
          "
        >
          Choose from our wide range of well-maintained vehicles
          that suits your travel needs and budget.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={fadeUp}
          className="
            mt-8
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-3
            sm:gap-8
          "
        >
          {/* Feature 1 */}
          <div>
            <div className="font-semibold">
              🛡️ Safe & Sanitized
            </div>

            <p className="mt-1 text-sm text-white/80">
              100% Safe Rides
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="font-semibold">
              👨‍✈️ Professional Drivers
            </div>

            <p className="mt-1 text-sm text-white/80">
              Verified & Trained
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="font-semibold">
              ₹ Transparent Pricing
            </div>

            <p className="mt-1 text-sm text-white/80">
              No Hidden Charges
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
