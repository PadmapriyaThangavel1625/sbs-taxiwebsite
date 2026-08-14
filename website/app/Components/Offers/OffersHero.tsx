"use client";

import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  CreditCard,
  Route,
} from "lucide-react";
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

/* ============================================================
   FEATURES
============================================================ */

const features = [
  {
    icon: ShieldCheck,
    title: "No Hidden Charges",
    description: "100% Transparent",
  },
  {
    icon: Clock,
    title: "No Waiting Charges",
    description: "Ride on time, every time",
  },
  {
    icon: CreditCard,
    title: "No Extra Charges",
    description: "For Online Payments",
  },
  {
    icon: Route,
    title: "Toll Free",
    description: "First 200 KM on outstation",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function OffersHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ======================================================
          HERO CONTAINER
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
          className="absolute inset-0"
        >
          <Image
            src="/images/car6.png"
            alt="SBS Taxi Offers"
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
              mt-3

              sm:mt-8

              md:mt-10

              lg:mt-12

              sm:px-6

              lg:px-8
            "
          >
            <div
              className="
                w-full
                max-w-[700px]
                pt-6
                font-[var(--font-jakarta)]

                sm:pt-0
              "
            >
              {/* =================================================
                  OFFERS LABEL
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

                Special Offers
              </motion.div>

              {/* =================================================
                  MAIN HEADING
              ================================================== */}

              <motion.h1
                variants={fadeLeft}
                className="
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
                "
              >
                More Savings.
                <br />

                <span className="text-[var(--secondary)]">
                  More Happy Journeys.
                </span>
              </motion.h1>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <motion.p
                variants={fadeUp}
                className="
                  mt-5
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
                Enjoy exciting discounts and exclusive benefits
                on every ride with SBS Taxi. Get more value from
                every journey with our special offers.
              </motion.p>

              {/* =================================================
                  FEATURES - 2 COLUMN GRID
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
                  sm:grid-cols-2
                  sm:gap-x-8

                  lg:grid-cols-4
                  lg:gap-x-0
                  lg:gap-y-0
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
                          index % 2 === 0
                            ? "sm:border-r sm:border-white/20"
                            : ""
                        }

                        lg:border-r
                        lg:border-white/20

                        ${
                          index === features.length - 1
                            ? "lg:border-r-0"
                            : ""
                        }
                      `}
                    >
                      {/* =================================================
                          ICON
                      ================================================== */}

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

                      {/* =================================================
                          TEXT
                      ================================================== */}

                      <div className="min-w-0">
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