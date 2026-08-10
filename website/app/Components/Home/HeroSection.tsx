
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

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <HeroSlider />
      </div>

      {/* Light Overlay */}
      <div className="absolute inset-0 z-10 bg-white/20" />

      {/* Main Container */}
      <div className="container-custom relative z-20">
        <div
          className="
            grid
            min-h-[calc(100vh-80px)]
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
            lg:gap-10
            lg:py-10

            xl:grid-cols-[minmax(0,1fr)_400px]
            xl:gap-14

            2xl:min-h-[680px]
            2xl:grid-cols-[minmax(0,1fr)_420px]
            2xl:gap-16
          "
        >
          {/* =====================================
              LEFT CONTENT
          ====================================== */}
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
            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="
                w-full
                max-w-[650px]
                text-[30px]
                font-extrabold
                leading-[1.15]
                tracking-tight
                text-[var(--heading)]

                sm:text-[36px]

                md:text-[42px]

                lg:text-[46px]

                xl:text-[52px]

                2xl:text-[58px]
              "
            >
              One Brand.
              <br />

              <span className="text-[var(--primary)]">
                One Fare.
              </span>

              <br />

              One Trusted Service.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="
                mt-4
                w-full
                max-w-[550px]
                text-[13px]
                leading-6
                text-[var(--muted)]

                sm:text-sm

                md:text-base
                md:leading-7

                lg:mt-5
              "
            >
              Book your ride anytime, anywhere with SBS Taxi.
              Safe rides, affordable fares and happy journeys!
            </motion.p>

            {/* =====================================
                TRUST CARDS
            ====================================== */}
            <motion.div
              variants={fadeUp}
              className="
                mt-6
                grid
                w-full
                max-w-[560px]
                overflow-hidden
                rounded-xl
                bg-white
                shadow-lg

                sm:grid-cols-3
              "
            >
              {/* 24/7 */}
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
                  gap-3
                  px-4
                  py-3
                  text-center
                  transition

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
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[var(--primary)]
                    text-[var(--primary)]
                  "
                >
                  <CheckCircle2 size={18} />
                </motion.div>

                <div className="text-left">
                  <p className="text-[13px] font-bold text-[var(--primary)]">
                    24/7
                  </p>

                  <p className="text-[12px] text-[var(--muted)]">
                    Taxi Service
                  </p>
                </div>
              </motion.div>

              {/* Mobile Divider */}
              <div className="h-px w-full bg-gray-200 sm:hidden" />

              {/* Desktop Divider */}
              <div className="my-3 hidden w-px bg-gray-200 sm:block" />

              {/* No Hidden Charges */}
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
                  gap-3
                  px-4
                  py-3
                  text-center

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
                    size={28}
                    className="text-[var(--primary)]"
                  />
                </motion.div>

                <div className="text-left">
                  <p className="text-[13px] font-bold text-[var(--heading)]">
                    No Hidden
                  </p>

                  <p className="text-[12px] text-[var(--muted)]">
                    Charges
                  </p>
                </div>
              </motion.div>

              {/* Mobile Divider */}
              <div className="h-px w-full bg-gray-200 sm:hidden" />

              {/* Verified Drivers */}
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
                  gap-3
                  px-4
                  py-3
                  text-center

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
                    size={28}
                    className="text-[var(--primary)]"
                  />
                </motion.div>

                <div className="text-left">
                  <p className="text-[13px] font-bold text-[var(--heading)]">
                    Verified
                  </p>

                  <p className="text-[12px] text-[var(--muted)]">
                    Drivers
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* =====================================
                BUTTONS
            ====================================== */}
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
              {/* Book Now */}
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
                    bg-[var(--primary)]
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-md
                    transition
                    hover:bg-[var(--primary-dark)]

                    sm:w-auto
                  "
                >
                  Book Now

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

              {/* WhatsApp */}
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

          {/* =====================================
              BOOKING FORM
          ====================================== */}
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
                max-w-[420px]

                sm:max-w-[440px]

                md:max-w-[460px]

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
