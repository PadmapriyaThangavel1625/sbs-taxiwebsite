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
   COMPONENT
============================================================ */

export default function AboutHero() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
      "
    >
      {/* ======================================================
          HERO IMAGE
      ======================================================= */}

      <div
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
          src="/images/car4.png"
          alt="SBS Taxi - Your Journey Our Commitment"
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

        {/* ====================================================
            SUBTLE OVERALL OVERLAY

            Keeps image visible while slightly improving
            overall contrast.
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

            This is the main readability layer.
            It darkens only the text area instead of
            blurring the complete image.
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

            Adds depth and blends the hero naturally.
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
                  ABOUT LABEL
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

                About Us
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
                Your Journey.
                <br />

                <span
                  className="
                    text-[var(--secondary)]
                  "
                >
                  Our Commitment.
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
                SBS Taxi is a trusted taxi service provider committed
                to delivering safe, reliable and comfortable travel
                experiences across the city and beyond. Whether it&apos;s
                a local ride or an outstation trip, we make every
                journey smooth and memorable.
              </motion.p>

              {/* =================================================
                  PREMIUM FEATURES
              ================================================== */}

              <motion.div
                variants={container}
                className="
                  mt-8

                  grid
                  grid-cols-2
                  gap-x-6
                  gap-y-5

                  sm:mt-9
                  sm:grid-cols-4
                  sm:gap-x-0
                  sm:gap-y-0
                "
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={feature.title}
                      variants={fadeUp}
                      whileHover={{
                        y: -3,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className={`
                        relative
                        flex
                        items-center
                        gap-2.5
                        pr-4

                        sm:px-5

                        ${
                          index === 0
                            ? "sm:pl-0"
                            : ""
                        }

                        ${
                          index !==
                          features.length - 1
                            ? "sm:border-r sm:border-white/20"
                            : ""
                        }
                      `}
                    >
                      {/* ==========================================
                          ICON
                      =========================================== */}

                      <motion.div
                        whileHover={{
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full

                          border
                          border-white/25

                          bg-white/10

                          text-[var(--secondary)]

                          backdrop-blur-sm

                          sm:h-9
                          sm:w-9
                        "
                      >
                        <Icon
                          aria-hidden="true"
                          className="
                            h-4
                            w-4

                            sm:h-[17px]
                            sm:w-[17px]
                          "
                        />
                      </motion.div>

                      {/* ==========================================
                          TEXT
                      =========================================== */}

                      <div
                        className="
                          min-w-0
                        "
                      >
                        <p
                          className="
                            whitespace-nowrap

                            font-[var(--font-jakarta)]

                            text-[10px]
                            font-semibold
                            leading-4

                            text-white

                            sm:text-[11px]

                            lg:text-xs
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
                            font-normal
                            leading-3

                            text-white/60

                            sm:text-[9px]
                            sm:leading-3.5
                          "
                        >
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}