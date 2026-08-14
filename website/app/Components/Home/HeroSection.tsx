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

import HeroSlider from "./HeroSlider";
import BookRideForm from "./BookRideForm";

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
    <section className="relative w-full overflow-hidden">

      {/* =================================================
          BACKGROUND
      ================================================== */}

      <div
        className="
          relative
          h-[760px]
          w-full

          sm:h-[700px]

          md:h-[680px]

          lg:h-[650px]

          xl:h-[670px]
        "
      >
        {/* Background Slider */}
        <div
          className="
            absolute
            inset-0
            z-0
            overflow-hidden

            [&_*]:!transform-none
            [&_*]:!scale-100
            [&_*]:!transition-none
          "
        >
          <HeroSlider />
        </div>

        {/* Overall overlay */}
        <div
          className="
            pointer-events-none
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
            pointer-events-none
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

        {/* Bottom gradient */}
        <div
          className="
            pointer-events-none
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

        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <div
          className="
            relative
            z-10
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
              grid
              w-full
              grid-cols-1
              items-center
              gap-8

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

              {/* Label */}
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

              {/* Heading */}
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

              {/* Description */}
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
                        text-white
                        sm:text-xs
                      "
                    >
                      24/7
                    </p>

                    <p
                      className="
                        whitespace-nowrap
                        text-[9px]
                        text-white/60
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
                        text-white
                        sm:text-xs
                      "
                    >
                      No Hidden
                    </p>

                    <p
                      className="
                        whitespace-nowrap
                        text-[9px]
                        text-white/60
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
                        text-white
                        sm:text-xs
                      "
                    >
                      Verified
                    </p>

                    <p
                      className="
                        whitespace-nowrap
                        text-[9px]
                        text-white/60
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
                    <span className="text-black">
                      Book a Ride
                    </span>

                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                      }}
                    >
                      <ArrowRight
                        size={18}
                        className="text-black"
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
                    text-[var(--heading)]
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
      </div>
    </section>
  );
}