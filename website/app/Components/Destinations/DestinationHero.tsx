"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* ============================================================
   ANIMATIONS
============================================================ */

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
    x: -30,
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
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
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

/* ============================================================
   COMPONENT
============================================================ */

export default function DestinationHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ======================================================
          HERO CONTAINER
      ======================================================= */}

      <div
        className="
          relative
          min-h-[650px]
          w-full

          sm:min-h-[590px]

          md:min-h-[600px]

          lg:min-h-[620px]

          xl:min-h-[630px]
        "
      >
        {/* ====================================================
            BACKGROUND IMAGE
        ===================================================== */}

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
          className="absolute inset-0"
        >
          <Image
            src="/images/car5.png"
            alt="SBS Taxi Popular Destinations"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-[68%_center]

              sm:object-[62%_center]

              md:object-center
            "
          />
        </motion.div>

        {/* ====================================================
            OVERALL OVERLAY
        ===================================================== */}

        <div className="absolute inset-0 bg-black/10" />

        {/* ====================================================
            LEFT CONTENT GRADIENT
        ===================================================== */}

        <div
          className="
            absolute
            inset-y-0
            left-0
            w-full

            bg-gradient-to-r
            from-[#071a35]/95
            via-[#071a35]/75
            to-transparent

            sm:w-[80%]

            md:w-[74%]

            lg:w-[70%]
          "
        />

        {/* ====================================================
            BOTTOM GRADIENT
        ===================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-44
            bg-gradient-to-t
            from-black/40
            to-transparent
          "
        />

        {/* ====================================================
            CONTENT
        ===================================================== */}

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
              pt-10

              sm:px-6
              sm:pt-8

              lg:px-8
            "
          >
            <div
              className="
                w-full
                max-w-[850px]
                pt-6

                sm:pt-0
              "
            >
              {/* =================================================
                  DESTINATION LABEL
              ================================================== */}

              <motion.div
                variants={fadeLeft}
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2

                  font-[var(--font-jakarta)]
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.16em]

                  text-[var(--secondary)]

                  sm:text-base
                "
              >
                <span
                  className="
                    h-[2px]
                    w-8
                    rounded-full
                    bg-[var(--secondary)]
                  "
                />

                Destinations
              </motion.div>

              {/* =================================================
                  MAIN HEADING
              ================================================== */}

              <motion.h1
                variants={fadeLeft}
                className="
                  max-w-[700px]

                  font-[family-name:var(--font-instrument)]

                  text-4xl
                  font-normal
                  leading-[1.05]
                  tracking-tight
                  !text-white

                  sm:text-5xl

                  md:text-[52px]

                  lg:text-[58px]
                "
              >
                Discover New Places.
                <br />

                <span className="text-[var(--secondary)]">
                  Enjoy Every Journey.
                </span>
              </motion.h1>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <motion.p
                variants={fadeUp}
                className="
                  mt-5
                  max-w-[600px]

                  font-[var(--font-jakarta)]

                  text-sm
                  font-normal
                  leading-6
                  text-white/85

                  sm:text-base
                  sm:leading-7
                "
              >
                From city rides to outstation trips, explore popular
                destinations with SBS Taxi and enjoy a safe, comfortable
                and reliable journey.
              </motion.p>

              {/* =================================================
                  SEARCH CARD
              ================================================== */}

              <motion.div
                variants={searchAnimation}
                className="
                  mt-7
                  w-full
                  max-w-[850px]
                  overflow-hidden
                  rounded-xl
                  bg-white
                  shadow-2xl
                "
              >
                <div
                  className="
                    grid
                    grid-cols-1

                    md:grid-cols-[1fr_1fr_160px_160px]
                  "
                >
                  {/* PICKUP */}

                  <input
                    type="text"
                    placeholder="📍 Enter pickup location"
                    className="
                      border-b
                      border-[var(--border)]
                      bg-white
                      px-4
                      py-4
                      text-sm
                      text-[var(--text)]
                      outline-none

                      md:border-b-0
                      md:border-r
                    "
                  />

                  {/* DROP */}

                  <input
                    type="text"
                    placeholder="📍 Enter drop location"
                    className="
                      border-b
                      border-[var(--border)]
                      bg-white
                      px-4
                      py-4
                      text-sm
                      text-[var(--text)]
                      outline-none

                      md:border-b-0
                      md:border-r
                    "
                  />

                  {/* DATE */}

                  <input
                    type="date"
                    className="
                      border-b
                      border-[var(--border)]
                      bg-white
                      px-4
                      py-4
                      text-sm
                      text-[var(--text)]
                      outline-none

                      md:border-b-0
                      md:border-r
                    "
                  />

                  {/* BUTTON */}

                  <div className="flex items-center justify-center bg-white p-3">
                    <motion.button
                      type="button"
                      whileHover={{
                        scale: 1.04,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      className="
                        w-full
                        rounded-lg
                        !bg-[var(--primary)]
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-colors
                        hover:bg-[var(--primary-dark)]
                      "
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}