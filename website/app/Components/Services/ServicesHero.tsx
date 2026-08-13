"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.03,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          relative
          h-[600px]
          w-full
        "
      >
        <Image
          src="/images/car2.png"
          alt="SBS Taxi Services"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="absolute inset-0 z-10"
        >
          <div
            className="
              mx-auto
              flex
              h-full
              w-full
              max-w-7xl
              items-center
              px-4

              sm:px-6

              lg:px-8
            "
          >
            <div
              className="
                w-full
                max-w-[430px]
                font-[var(--font-jakarta)]
              "
            >
              {/* Heading */}
              <motion.h1
                variants={fadeLeft}
                className="
                  !font-[var(--font-jakarta)]
                  text-4xl
                  !font-extrabold
                  leading-tight
                  tracking-tight
                  !text-white

                  sm:text-5xl

                  lg:text-6xl
                "
              >
                Our Services
              </motion.h1>

              {/* Yellow Line */}
              <motion.div
                variants={fadeLeft}
                className="
                  mt-3
                  h-[3px]
                  w-11
                  bg-secondary

                  sm:w-12
                "
              />

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="
                  mt-3
                  max-w-[400px]
                  !font-[var(--font-jakarta)]
                  text-sm
                  font-medium
                  leading-5
                  text-white/95

                  sm:text-base
                  sm:leading-6
                "
              >
                From local rides to outstation trips, airport transfers to
                corporate travel – we provide safe, comfortable and reliable
                taxi services tailored to your needs.
              </motion.p>

              {/* Breadcrumb */}
              <motion.div
                variants={fadeUp}
                className="
                  mt-5
                  flex
                  items-center
                  gap-1.5
                  !font-[var(--font-jakarta)]
                  text-xs
                  font-medium
                  text-white/90
                "
              >
                <Home className="h-3.5 w-3.5" />

                <span>Home</span>

                <ChevronRight className="h-3.5 w-3.5 text-white/70" />

                <span className="text-white">
                  Services
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}