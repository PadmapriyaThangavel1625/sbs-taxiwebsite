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

/* ============================================================
   SERVICES HERO
============================================================ */

export default function ServicesHero() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        min-h-0

        lg:min-h-[620px]
        xl:min-h-[650px]
      "
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* ==================================================
            BACKGROUND IMAGE + ZOOM
        =================================================== */}

        <motion.div
          className="
            absolute
            inset-0
            overflow-hidden
          "
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/car2.png"
            alt="SBS Taxi Services"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-[62%_center]

              sm:object-[62%_center]

              md:object-center
            "
          />
        </motion.div>

        {/* ==================================================
            OVERALL OVERLAY
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            z-[1]
            bg-black/10
          "
        />

        {/* ==================================================
            LEFT DARK GRADIENT
        =================================================== */}

        <div
          className="
            absolute
            inset-y-0
            left-0
            z-[2]
            w-full

            bg-gradient-to-r
            from-[#071a35]/95
            via-[#071a35]/75
            to-transparent

            sm:w-[82%]

            md:w-[76%]

            lg:w-[72%]
          "
        />

        {/* ==================================================
            BOTTOM GRADIENT
        =================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-[2]
            h-40

            bg-gradient-to-t
            from-black/45
            to-transparent
          "
        />
      </div>

      {/* ======================================================
          MAIN CONTENT
      ======================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl

          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:flex
          lg:min-h-[620px]
          lg:items-center
          lg:px-8
          lg:py-8

          xl:min-h-[650px]
        "
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            flex
            w-full
            flex-col
            items-center
            text-center

            lg:items-start
            lg:text-left
          "
        >
          {/* ==================================================
              LEFT CONTENT
          =================================================== */}

          <div
            className="
              w-full
              max-w-[650px]
            "
          >
            {/* ==================================================
                SERVICES LABEL
            =================================================== */}

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

            {/* ==================================================
                HEADING
            =================================================== */}

            <motion.h1
              variants={fadeLeft}
              className="
                w-full
                max-w-[650px]

                font-[family-name:var(--font-instrument)]

                text-4xl
                font-normal
                leading-[1.05]
                tracking-tight

                !text-white

                sm:text-5xl

                md:text-[52px]

                lg:text-[58px]

                xl:text-[64px]
              "
            >
              Reliable Rides.
              <br />

              <span className="text-[var(--secondary)]">
                Every Journey.
              </span>
            </motion.h1>

            {/* ==================================================
                DESCRIPTION
            =================================================== */}

            <motion.p
              variants={fadeUp}
              className="
                mt-5
                w-full
                max-w-[560px]

                font-[var(--font-jakarta)]
                text-sm
                font-normal
                leading-6

                text-white/85

                sm:text-base
                sm:leading-7
              "
            >
              From local rides to outstation trips, airport
              transfers to corporate travel – we provide safe,
              comfortable and reliable taxi services tailored
              to your needs.
            </motion.p>

            {/* ==================================================
                BREADCRUMB
            =================================================== */}

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

            {/* ==================================================
                FEATURES
            =================================================== */}

            <motion.div
              variants={container}
              className="
                mt-8
                grid
                w-full
                max-w-[620px]

                grid-cols-3

                gap-x-3
                gap-y-5

                sm:gap-x-0
              "
            >
              {/* SAFE & SECURE */}

              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -3,
                }}
                className="
                  flex
                  items-center
                  gap-2.5
                  pr-3
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/25

                    bg-white/10

                    backdrop-blur-sm
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />
                </div>

                <div className="text-left">
                  <p
                    className="
                      whitespace-nowrap
                      font-[var(--font-jakarta)]
                      text-[11px]
                      font-semibold
                      text-white

                      sm:text-xs
                    "
                  >
                    Safe & Secure
                  </p>

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px]
                      text-white/55

                      sm:text-[10px]
                    "
                  >
                    Trusted rides
                  </p>
                </div>
              </motion.div>

              {/* ON-TIME SERVICE */}

              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -3,
                }}
                className="
                  flex
                  items-center
                  gap-2.5

                  border-l
                  border-white/20

                  px-3
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/25

                    bg-white/10

                    backdrop-blur-sm
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />
                </div>

                <div className="text-left">
                  <p
                    className="
                      whitespace-nowrap
                      font-[var(--font-jakarta)]
                      text-[11px]
                      font-semibold
                      text-white

                      sm:text-xs
                    "
                  >
                    On-Time
                  </p>

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px]
                      text-white/55

                      sm:text-[10px]
                    "
                  >
                    Service
                  </p>
                </div>
              </motion.div>

              {/* FAIR PRICING */}

              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -3,
                }}
                className="
                  flex
                  items-center
                  gap-2.5

                  border-l
                  border-white/20

                  px-3
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/25

                    bg-white/10

                    backdrop-blur-sm
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />
                </div>

                <div className="text-left">
                  <p
                    className="
                      whitespace-nowrap
                      font-[var(--font-jakarta)]
                      text-[11px]
                      font-semibold
                      text-white

                      sm:text-xs
                    "
                  >
                    Fair Pricing
                  </p>

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px]
                      text-white/55

                      sm:text-[10px]
                    "
                  >
                    No hidden charges
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}