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
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
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

/* =====================================================
   HERO SECTION
===================================================== */

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* =================================================
          HERO BACKGROUND
          
          Static background:
          - No zoom
          - No scale animation
          - No transform animation
      ================================================== */}

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

      {/* =================================================
          LIGHT OVERLAY

          Fixed opacity - no animation
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-white/20
        "
      />

      {/* =================================================
          HERO CONTAINER
      ================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            min-h-[calc(100vh-72px)]
            grid-cols-1
            items-center
            gap-8
            py-8

            sm:gap-10
            sm:py-10

            md:gap-12
            md:py-12

            lg:min-h-[600px]
            lg:grid-cols-[minmax(0,1fr)_380px]
            lg:gap-8
            lg:py-10

            xl:grid-cols-[minmax(0,1fr)_400px]
            xl:gap-10

            2xl:min-h-[680px]
            2xl:grid-cols-[minmax(0,1fr)_420px]
            2xl:gap-12
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
              lg:justify-center
              lg:text-left
            "
          >

            {/* =================================================
                HEADING
            ================================================== */}

            <motion.h1
              variants={fadeUp}
              className="
                w-full
                max-w-[680px]
                text-[28px]
                font-extrabold
                leading-[1.12]
                tracking-[-0.02em]
                !text-[var(--primary)]

                sm:text-[34px]

                md:text-[40px]

                lg:text-[46px]
                lg:leading-[1.1]

                xl:text-[52px]

                2xl:text-[58px]

                !font-bold
              "
            >
              One Brand.
              <br />

              <span className="!text-[var(--primary)] font-bold">
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
                mt-4
                w-full
                max-w-[560px]
                text-[13px]
                font-semibold
                leading-6
                text-[var(--muted)]

                sm:text-sm

                md:text-[15px]
                md:leading-7

                lg:mt-5
                lg:text-base
              "
            >
              Book your ride anytime, anywhere with SBS Taxi.
              Safe rides, affordable fares and happy journeys!
            </motion.p>

            {/* =================================================
                TRUST CARDS
            ================================================== */}

            <motion.div
              variants={fadeUp}
              className="
                mt-6
                grid
                w-full
                max-w-[580px]
                grid-cols-3
                overflow-hidden
                rounded-xl
                bg-white
                shadow-lg
              "
            >

              {/* =================================================
                  24/7
              ================================================== */}

              <motion.div
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                className="
                  flex
                  min-h-[72px]
                  items-center
                  justify-center
                  gap-2
                  px-2
                  py-3
                  text-center
                  transition
                  sm:gap-3
                  sm:px-3
                "
              >
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.15,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[var(--primary)]
                    text-[var(--primary)]
                    sm:h-9
                    sm:w-9
                  "
                >
                  <CheckCircle2 size={17} />
                </motion.div>

                <div className="text-left">
                  <p className="text-[11px] font-bold text-[var(--primary)] sm:text-[13px]">
                    24/7
                  </p>

                  <p className="text-[10px] leading-4 text-[var(--muted)] sm:text-[12px]">
                    Taxi Service
                  </p>
                </div>
              </motion.div>

              {/* =================================================
                  NO HIDDEN CHARGES
              ================================================== */}

              <div className="relative">

                <div
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-10
                    w-px
                    -translate-y-1/2
                    bg-gray-200
                  "
                />

                <motion.div
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  className="
                    flex
                    min-h-[72px]
                    items-center
                    justify-center
                    gap-2
                    px-2
                    py-3
                    text-center
                    transition
                    sm:gap-3
                    sm:px-3
                  "
                >
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.15,
                    }}
                    className="shrink-0"
                  >
                    <ShieldCheck
                      size={24}
                      className="text-[var(--primary)] sm:h-7 sm:w-7"
                    />
                  </motion.div>

                  <div className="text-left">
                    <p className="text-[11px] font-bold text-[var(--heading)] sm:text-[13px]">
                      No Hidden
                    </p>

                    <p className="text-[10px] leading-4 text-[var(--muted)] sm:text-[12px]">
                      Charges
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* =================================================
                  VERIFIED DRIVERS
              ================================================== */}

              <div className="relative">

                <div
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-10
                    w-px
                    -translate-y-1/2
                    bg-gray-200
                  "
                />

                <motion.div
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  className="
                    flex
                    min-h-[72px]
                    items-center
                    justify-center
                    gap-2
                    px-2
                    py-3
                    text-center
                    transition
                    sm:gap-3
                    sm:px-3
                  "
                >
                  <motion.div
                    whileHover={{
                      rotate: -10,
                      scale: 1.15,
                    }}
                    className="shrink-0"
                  >
                    <UserCheck
                      size={24}
                      className="text-[var(--primary)] sm:h-7 sm:w-7"
                    />
                  </motion.div>

                  <div className="text-left">
                    <p className="text-[11px] font-bold text-[var(--heading)] sm:text-[13px]">
                      Verified
                    </p>

                    <p className="text-[10px] leading-4 text-[var(--muted)] sm:text-[12px]">
                      Drivers
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <motion.div
              variants={fadeUp}
              className="
                mt-6
                flex
                w-full
                flex-col
                items-center
                justify-center
                gap-3

                sm:w-auto
                sm:flex-row
                sm:flex-wrap

                lg:justify-start
              "
            >

              {/* =================================================
                  BOOK NOW
              ================================================== */}

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
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
                    text-white
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
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </Link>
              </motion.div>

              {/* =================================================
                  WHATSAPP
              ================================================== */}

              <motion.a
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
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
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                  }}
                >
                  <MessageCircle
                    size={20}
                    className="text-[#25D366]"
                  />
                </motion.div>

                Chat on WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>

          {/* =================================================
              BOOKING FORM
          ================================================== */}

          <motion.div
            variants={fadeLeft}
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
                max-w-[400px]

                sm:max-w-[420px]

                md:max-w-[440px]

                lg:max-w-[380px]

                xl:max-w-[400px]

                2xl:max-w-[420px]
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