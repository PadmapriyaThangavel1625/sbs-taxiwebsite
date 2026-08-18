"use client";

import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  CreditCard,
} from "lucide-react";
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

/* ============================================================
   PERKS
============================================================ */

const perks = [
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    description: "Clear & honest fares",
  },
  {
    icon: ShieldCheck,
    title: "No Hidden Charges",
    description: "What you see is what you pay",
  },
  {
    icon: Clock3,
    title: "No Waiting Charges",
    description: "No unnecessary extra fees",
  },
  {
    icon: CreditCard,
    title: "Online Payments",
    description: "Easy & secure payments",
  },
];

/* ============================================================
   PRICING HERO
============================================================ */

export default function PricingHero() {
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
            alt="SBS Taxi Pricing"
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
              max-w-[700px]
            "
          >
            {/* ==================================================
                PRICING LABEL
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

              Our Pricing
            </motion.div>

            {/* ==================================================
                MAIN HEADING
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
              Simple Pricing.
              <br />

              <span className="text-[var(--secondary)]">
                No Surprises.
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
                max-w-[550px]

                font-[var(--font-jakarta)]
                text-sm
                font-normal
                leading-6

                text-white/85

                sm:text-base
                sm:leading-7
              "
            >
              Enjoy clear and transparent fares with SBS Taxi.
              No hidden charges, no unexpected fees — just honest
              pricing for a comfortable and reliable journey.
            </motion.p>

            {/* ==================================================
                PERKS
            =================================================== */}

            <motion.div
              variants={container}
              className="
                mt-8
                grid
                w-full
                max-w-[700px]

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
              {perks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
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
                        index === perks.length - 1
                          ? "lg:border-r-0 lg:pr-0"
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
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/25

                        bg-white/10

                        text-[var(--secondary)]

                        backdrop-blur-sm

                        sm:h-10
                        sm:w-10
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="
                          h-4
                          w-4

                          sm:h-[18px]
                          sm:w-[18px]
                        "
                      />
                    </motion.div>

                    {/* ==================================================
                        TEXT
                    =================================================== */}

                    <div className="min-w-0 text-left">
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
                        {item.title}
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

                          sm:text-[10px]
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}