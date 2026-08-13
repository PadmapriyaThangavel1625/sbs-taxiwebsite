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

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
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

const fadeScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const features = [
  {
    icon: "🛡️",
    title: "Safe & Sanitized",
    description: "100% Safe Rides",
  },
  {
    icon: "👨‍✈️",
    title: "Professional Drivers",
    description: "Verified & Trained",
  },
  {
    icon: "₹",
    title: "Transparent Pricing",
    description: "No Hidden Charges",
  },
];

export default function FleetHero() {
  return (
    <section className="relative mb-6 w-full overflow-hidden sm:mb-8">
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.02,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
        className="
          relative
          !h-[700px]
          w-full
          overflow-hidden

          sm:h-[300px]

          md:h-[280px]

          lg:h-[215px]
        "
      >
        <Image
          src="/images/car3.png"
          alt="SBS Taxi Fleet"
          fill
          priority
          sizes="100vw"
          className="
            object-cover

            object-center

            sm:object-[55%_center]

            md:object-center
          "
        />

        {/* =================================================
            OVERLAY
        ================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/15"
        />

        {/* =================================================
            CONTENT
        ================================================== */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="absolute inset-0 z-10 flex items-center"
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
              px-4

              sm:px-6

              lg:px-8
            "
          >
            <div className="flex items-center">
              <div
                className="
                  w-full
                  max-w-[600px]
                  text-left

                  /* MOBILE */
                  pt-4

                  sm:pt-0
                "
              >
                {/* =================================================
                    HEADING
                ================================================== */}
                <motion.h1
                  variants={fadeLeft}
                  className="
                    font-[var(--font-jakarta)]
                    text-3xl
                    font-extrabold
                    leading-tight
                    tracking-tight
                    !text-white

                    sm:text-4xl

                    lg:text-5xl
                  "
                >
                  Our Fleet
                </motion.h1>

                {/* =================================================
                    SUBTITLE
                ================================================== */}
                <motion.p
                  variants={fadeUp}
                  className="
                    mt-2
                    font-[var(--font-jakarta)]
                    text-lg
                    font-bold
                    leading-tight
                    !text-white

                    sm:mt-3
                    sm:text-lg

                    lg:text-xl
                  "
                >
                  Premium cars. Best comfort. Affordable fares.
                </motion.p>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}
                <motion.p
                  variants={fadeUp}
                  className="
                    mt-3
                    max-w-[550px]
                    font-[var(--font-jakarta)]
                    text-sm
                    text-white
                    font-medium
                    leading-5
                    text-[var(--primary)]

                    sm:mt-4
                    sm:text-sm
                    sm:leading-6

                    lg:text-base
                    lg:leading-7
                  "
                >
                  Choose from our wide range of well-maintained vehicles
                  <br className="hidden sm:block" />
                  that suits your travel needs and budget.
                </motion.p>

                {/* =================================================
                    FEATURES
                ================================================== */}
                <motion.div
                  variants={container}
                  className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-3

                    sm:flex
                    sm:flex-wrap
                    sm:items-center
                    sm:gap-x-6
                    sm:gap-y-4

                    lg:mt-8
                    lg:gap-x-10
                  "
                >
                  {features.map((feature) => (
                    <motion.div
                      key={feature.title}
                      variants={fadeUp}
                      whileHover={{
                        y: -5,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="flex items-center gap-3"
                    >
                      {/* ICON */}
                      <motion.div
                        variants={fadeScale}
                        whileHover={{
                          scale: 1.12,
                          rotate: 6,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          border-[var(--secondary)]
                          bg-[var(--primary)]
                          text-sm
                          text-white

                          sm:h-9
                          sm:w-9

                          lg:h-10
                          lg:w-10
                          lg:text-base
                        "
                      >
                        {feature.icon}
                      </motion.div>

                      {/* FEATURE TEXT */}
                      <div className="whitespace-nowrap">
                        <p
                          className="
                            font-[var(--font-jakarta)]
                            text-xs
                            font-bold
                            leading-tight
                            text-[var(--secondary)]

                            sm:text-xs

                            lg:text-sm
                          "
                        >
                          {feature.title}
                        </p>

                        <p
                          className="
                            mt-1
                            font-[var(--font-jakarta)]
                            text-[10px]
                            font-medium
                            leading-tight
                            text-white/85

                            sm:text-[9px]

                            lg:text-[11px]
                          "
                        >
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}