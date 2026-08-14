"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";

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

/* ============================================================
   COMPONENT
============================================================ */

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ======================================================
          HERO IMAGE
      ======================================================= */}

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
          h-[650px]
          w-full

          sm:h-[590px]

          md:h-[600px]

          lg:h-[620px]

          xl:h-[630px]
        "
      >

        {/* ====================================================
            BACKGROUND IMAGE
        ===================================================== */}

        <Image
          src="/images/car2.png"
          alt="SBS Taxi Services"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center

            sm:object-[62%_center]

            md:object-center
          "
        />

        {/* ====================================================
            SUBTLE OVERALL OVERLAY
        ===================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black/10
          "
        />

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
          className="
            absolute
            inset-0
            z-10
          "
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
                max-w-[570px]
                pt-6

                font-[var(--font-jakarta)]

                sm:pt-0
              "
            >

              {/* =================================================
                  SERVICES LABEL
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

                Our Services
              </motion.div>

              {/* =================================================
                  MAIN HEADING
              ================================================== */}

              <motion.h1
                variants={fadeLeft}
                className="
                  max-w-[560px]

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
                Reliable Rides.
                <br />

                <span className="text-[var(--secondary)]">
                  Every Journey.
                </span>
              </motion.h1>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <motion.p
                variants={fadeUp}
                className="
                  mt-5
                  max-w-[520px]

                  font-[var(--font-jakarta)]

                  text-sm
                  font-normal
                  leading-6

                  text-white/85

                  sm:text-base
                  sm:leading-7
                "
              >
                From local rides to outstation trips, airport transfers
                to corporate travel – we provide safe, comfortable and
                reliable taxi services tailored to your needs.
              </motion.p>

              {/* =================================================
                  BREADCRUMB
              ================================================== */}

              <motion.div
                variants={fadeUp}
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2

                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-2

                  font-[var(--font-jakarta)]
                  text-xs
                  font-medium
                  text-white/90

                  backdrop-blur-sm
                "
              >
                <Home
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--secondary)]
                  "
                />

                <span>Home</span>

                <ChevronRight
                  className="
                    h-3.5
                    w-3.5
                    text-white/50
                  "
                />

                <span className="font-semibold text-white">
                  Services
                </span>
              </motion.div>

              {/* =================================================
                  SMALL FEATURE LINE
              ================================================== */}

              <motion.div
                variants={fadeUp}
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-x-6
                  gap-y-3

                  font-[var(--font-jakarta)]
                  text-[11px]
                  font-medium
                  text-white/70

                  sm:text-xs
                "
              >
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />
                  Safe & Secure
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />
                  On-Time Service
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />
                  Fair Pricing
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}