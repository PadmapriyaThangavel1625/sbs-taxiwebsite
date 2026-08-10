
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.2,
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

export default function ServicesHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden">

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
          alt="Taxi services"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

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
          Our Services
        </motion.h1>

        {/* Animated Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
          }}
          className="mt-4 h-1 bg-secondary"
        />

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="
            mt-5
            max-w-xl
            text-sm
            leading-6
            sm:text-base
            lg:text-lg
          "
        >
          From local rides to outstation trips, airport transfers
          to corporate travel – we provide safe, comfortable and
          reliable taxi services.
        </motion.p>

        {/* Breadcrumb */}
        <motion.div
          variants={fadeUp}
          className="
            mt-5
            flex
            items-center
            gap-2
            text-sm
          "
        >
          <Link
            href="/"
            className="transition-colors hover:text-secondary"
          >
            Home
          </Link>

          <span>›</span>

          <span className="text-secondary">
            Services
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
