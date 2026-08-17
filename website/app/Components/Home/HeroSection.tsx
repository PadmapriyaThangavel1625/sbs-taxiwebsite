"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import HeroSlider from "@/app/Components/Home/HeroSlider";
import BookRideForm from "@/app/Components/Home/BookRideForm";

/* =====================================================
   ANIMATIONS
===================================================== */

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

const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
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

/* =====================================================
   HERO SECTION
===================================================== */

export default function HeroSection() {
  return (
    <section
      className="
        relative
        w-full
        overflow-visible

        min-h-0

        lg:min-h-[650px]
        xl:min-h-[670px]
      "
    >
      {/* =================================================
          BACKGROUND
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* =================================================
            BACKGROUND SLIDER + ZOOM ANIMATION
        ================================================== */}

        <motion.div
          className="
            absolute
            inset-0
            z-0
            overflow-hidden
          "
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0">
            <HeroSlider />
          </div>
        </motion.div>

        {/* =================================================
            OVERALL OVERLAY
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            z-[1]
            bg-black/10
          "
        />

        {/* =================================================
            LEFT DARK GRADIENT
        ================================================== */}

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

        {/* =================================================
            BOTTOM GRADIENT
        ================================================== */}

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

      {/* =================================================
          MAIN CONTENT
      ================================================== */}

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
          lg:min-h-[650px]
          lg:items-center
          lg:px-8
          lg:py-8

          xl:min-h-[670px]
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center

            gap-10

            sm:gap-12

            lg:grid-cols-[minmax(0,1fr)_380px]
            lg:gap-10

            xl:grid-cols-[minmax(0,1fr)_400px]
            xl:gap-12
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

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
            {/* =================================================
                LABEL
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

              SBS Taxi
            </motion.div>

            {/* =================================================
                HEADING
            ================================================== */}

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
              One Brand.
              <br />

              <span className="text-[var(--secondary)]">
                One Fare.
              </span>

              <br />

              One Trusted Service.
            </motion.h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

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
              Book your ride anytime, anywhere with SBS Taxi.
              Safe rides, affordable fares and happy journeys!
            </motion.p>

            {/* =================================================
                FEATURES
            ================================================== */}

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

                sm:mt-9
                sm:gap-x-0
              "
            >
              {/* 24/7 */}

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="
                  relative
                  flex
                  items-center
                  gap-2.5
                  pr-3
                "
              >
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6 }}
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
                  "
                >
                  <CheckCircle2 size={18} />
                </motion.div>

                <div className="text-left">
                  <p
                    className="
                      whitespace-nowrap
                      font-[var(--font-jakarta)]
                      text-[11px]
                      font-semibold
                      text-[var(--text-primary)]

                      sm:text-xs
                    "
                  >
                    24/7
                  </p>

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px]
                      text-[var(--text-third)]/50

                      sm:text-[10px]
                    "
                  >
                    Taxi Service
                  </p>
                </div>
              </motion.div>

              {/* No Hidden Charges */}

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="
                  relative
                  flex
                  items-center
                  gap-2.5
                  border-l
                  border-white/20
                  px-3
                "
              >
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.1,
                  }}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    text-[var(--secondary)]
                  "
                >
                  <ShieldCheck size={24} />
                </motion.div>

                <div className="text-left">
                  <p
                    className="
                      whitespace-nowrap
                      font-[var(--font-jakarta)]
                      text-[11px]
                      font-semibold
                      text-[var(--text-primary)]

                      sm:text-xs
                    "
                  >
                    No Hidden
                  </p>

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px]
                      text-[var(--text-third)]/50

                      sm:text-[10px]
                    "
                  >
                    Charges
                  </p>
                </div>
              </motion.div>

              {/* Verified Drivers */}

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="
                  relative
                  flex
                  items-center
                  gap-2.5
                  border-l
                  border-white/20
                  px-3
                "
              >
                <motion.div
                  whileHover={{
                    rotate: -10,
                    scale: 1.1,
                  }}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    text-[var(--secondary)]
                  "
                >
                  <UserCheck size={24} />
                </motion.div>

                <div className="text-left">
                  <p
                    className="
                      whitespace-nowrap
                      font-[var(--font-jakarta)]
                      text-[11px]
                      font-semibold
                      text-[var(--text-primary)]

                      sm:text-xs
                    "
                  >
                    Verified
                  </p>

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px]
                      text-[var(--text-third)]/50

                      sm:text-[10px]
                    "
                  >
                    Drivers
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <motion.div
              variants={fadeUp}
              className="
                mt-7
                flex
                w-full
                flex-col
                items-center
                gap-3

                sm:w-auto
                sm:flex-row

                lg:justify-start
              "
            >
              {/* Book Ride */}

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/booking"
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-lg
                    bg-[var(--secondary)]
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    shadow-md
                    transition

                    hover:bg-[var(--secondary-dark)]

                    sm:w-auto
                  "
                >
                  <span className="text-[var(--text-secondary)]">
                    Book a Ride
                  </span>

                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                  >
                    <ArrowRight
                      size={18}
                      className="text-[var(--text-secondary)]"
                    />
                  </motion.div>
                </Link>
              </motion.div>

              {/* WhatsApp */}

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/9843544844"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-lg
                  border
                  border-[#25D366]
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-[var(--text-primary)]
                  shadow-sm
                  transition

                  hover:bg-gray-50

                  sm:w-auto
                "
              >
                <MessageCircle
                  size={20}
                  className="text-[#25D366]"
                />

                Chat on WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>

          {/* =================================================
              BOOKING FORM
          ================================================== */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="
              flex
              w-full
              justify-center

              lg:justify-end
            "
          >
            <div
              className="
                w-full

                max-w-[390px]

                sm:max-w-[410px]

                md:max-w-[430px]

                lg:max-w-[380px]

                xl:max-w-[400px]
              "
            >
              <BookRideForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}