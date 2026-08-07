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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-100">
        <HeroSlider />
      </div>

      <div className="container-custom relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-8 py-8 lg:min-h-[550px] lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px]">

          {/* Left Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left pt-2 lg:pl-3"
          >
            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="w-full max-w-[550px] text-3xl font-extrabold leading-[1.2] text-black sm:text-4xl md:text-[42px] lg:text-[46px]"
            >
              One Brand.
              <br />
              <span className="text-[#0753b8]">One Fare.</span>
              <br />
              One Trusted Service.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-3.5 max-w-[460px] text-sm leading-relaxed text-gray-700 sm:text-base"
            >
              Book your ride anytime, anywhere with SBS Taxi. Safe rides, affordable fares and happy journeys!
            </motion.p>

            {/* Trust Cards */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl bg-white shadow-md sm:flex-row"
            >
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex flex-1 cursor-pointer items-center justify-center gap-3 px-3 py-3 sm:justify-start"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#0753b8] text-[#0753b8]"
                >
                  <CheckCircle2 size={18} />
                </motion.div>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-[#0753b8]">24/7</p>
                  <p className="text-[12px] text-gray-600">Taxi Service</p>
                </div>
              </motion.div>

              <div className="hidden h-auto w-px bg-gray-200 sm:block my-2" />
              <div className="h-px w-full bg-gray-200 sm:hidden" />

              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex flex-1 cursor-pointer items-center justify-center gap-3 px-3 py-3 sm:justify-start"
              >
                <motion.div whileHover={{ rotate: 10, scale: 1.15 }} className="shrink-0">
                  <ShieldCheck size={28} className="text-[#0753b8]" />
                </motion.div>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-gray-900">No Hidden</p>
                  <p className="text-[12px] text-gray-600">Charges</p>
                </div>
              </motion.div>

              <div className="hidden h-auto w-px bg-gray-200 sm:block my-2" />
              <div className="h-px w-full bg-gray-200 sm:hidden" />

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex flex-1 cursor-pointer items-center justify-center gap-3 px-3 py-3 sm:justify-start"
              >
                <motion.div whileHover={{ rotate: -10, scale: 1.15 }} className="shrink-0">
                  <UserCheck size={28} className="text-[#0753b8]" />
                </motion.div>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-gray-900">Verified</p>
                  <p className="text-[12px] text-gray-600">Drivers</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-3 rounded-lg bg-[#0753b8] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#06439a]"
                >
                  Book Now
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-lg border border-[#25D366] bg-white px-5 py-3.5 text-sm font-bold text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <MessageCircle size={20} className="text-[#25D366]" />
                </motion.div>
                Chat on WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            className="w-full flex justify-center lg:justify-end mt-4 lg:mt-0"
          >
            <div className="w-full max-w-[385px]">
              <BookRideForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}