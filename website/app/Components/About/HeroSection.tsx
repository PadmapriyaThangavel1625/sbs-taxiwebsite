"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  IndianRupee,
  Headphones,
} from "lucide-react";

/* ============================================================
   ANIMATIONS
============================================================ */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

/* ============================================================
   FEATURES
============================================================ */

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Verified drivers",
  },
  {
    icon: Clock3,
    title: "On-Time Service",
    description: "Punctual pickups",
  },
  {
    icon: IndianRupee,
    title: "Fair Pricing",
    description: "No hidden charges",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

/* ============================================================
   ABOUT HERO
============================================================ */

export default function AboutHero() {
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
            BACKGROUND IMAGE
        =================================================== */}

        <motion.div
          className="
            absolute
            inset-0
            overflow-hidden
          "
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/car4.png"
            alt="SBS Taxi"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-[67%_center]

              sm:object-[65%_center]

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
            bg-[#061a31]/30
          "
        />

        {/* ==================================================
            MAIN GRADIENT
        =================================================== */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-[#061a31]/75
            via-[#061a31]/65
            to-[#061a31]/90

            lg:bg-gradient-to-r
            lg:from-[#061a31]/90
            lg:via-[#061a31]/65
            lg:to-[#061a31]/25
          "
        />

        {/* ==================================================
            BOTTOM FADE
        =================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-36
            bg-gradient-to-t
            from-[#061a31]/80
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
          flex
          min-h-0
          w-full
          max-w-7xl
          items-center

          px-4
          py-10

          sm:px-6
          sm:py-12

          lg:min-h-[620px]
          lg:px-8
          lg:py-16

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
              ABOUT US LABEL
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
            {/* LEFT LINE */}

            <span
              className="
                h-[2px]
                w-8
                rounded-full
                bg-[var(--secondary)]
              "
            />

            About Us

            {/* RIGHT LINE */}

            <span
              className="
                h-[3px]
                w-10
                rounded-full
                bg-[var(--secondary)]

                sm:w-12

                lg:hidden
              "
            />
          </motion.div>

          {/* ==================================================
              HEADING
          =================================================== */}

          <motion.h1
            variants={fadeScale}
            className="
              w-full
              max-w-[700px]

              font-[family-name:var(--font-instrument)]
              text-[48px]
              font-normal
              leading-[0.98]
              tracking-tight

              !text-white

              sm:text-[58px]

              md:text-[64px]

              lg:text-[68px]

              xl:text-[74px]
            "
          >
            Your Journey.
            <br />

            <span className="text-[var(--secondary)]">
              Our Commitment.
            </span>
          </motion.h1>

          {/* ==================================================
              DESCRIPTION
          =================================================== */}

          <motion.p
            variants={fadeUp}
            className="
              mt-6
              w-full
              max-w-[620px]

              font-[var(--font-jakarta)]
              text-[15px]
              font-normal
              leading-7

              text-white/85

              sm:mt-7
              sm:text-base
              sm:leading-7

              md:max-w-[680px]

              lg:mt-6
            "
          >
            SBS Taxi is a trusted taxi service provider committed
            to delivering safe, reliable and comfortable travel
            experiences across the city and beyond. Whether it&apos;s
            a local ride or an outstation trip, we make every
            journey smooth and memorable.
          </motion.p>

          {/* ==================================================
              FEATURES
          =================================================== */}

          <motion.div
            variants={container}
            className="
              mt-9
              grid
              w-full
              max-w-[700px]

              grid-cols-2

              gap-y-6

              sm:mt-10
              sm:grid-cols-4
              sm:gap-x-0
              sm:gap-y-0

              lg:mt-9
            "
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -4,
                  }}
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2.5

                    sm:px-4

                    ${
                      index > 0
                        ? "sm:border-l sm:border-white/20"
                        : ""
                    }

                    ${
                      index === 0
                        ? "sm:pl-0"
                        : ""
                    }

                    ${
                      index === 3
                        ? "sm:pr-0"
                        : ""
                    }
                  `}
                >
                  {/* ==================================================
                      ICON
                  =================================================== */}

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/25

                      bg-white/10

                      text-[var(--secondary)]

                      backdrop-blur-md

                      sm:h-11
                      sm:w-11
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="
                        h-[18px]
                        w-[18px]

                        sm:h-5
                        sm:w-5
                      "
                    />
                  </motion.div>

                  {/* ==================================================
                      TEXT
                  =================================================== */}

                  <div className="text-left">
                    <p
                      className="
                        whitespace-nowrap

                        font-[var(--font-jakarta)]
                        text-[10px]
                        font-semibold
                        leading-4

                        text-white

                        sm:text-xs
                      "
                    >
                      {feature.title}
                    </p>

                    <p
                      className="
                        mt-0.5
                        whitespace-nowrap

                        font-[var(--font-jakarta)]
                        text-[8px]
                        leading-3

                        text-white/55

                        sm:text-[10px]
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}