"use client";

import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  CreditCard,
  Route,
  Star,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

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
    y: 15,
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

export default function OffersHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
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
        className="relative h-[500px] w-full"
      >
        <Image
          src="/images/car6.png"
          alt="SBS Taxi Offers"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Content */}
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
              sm:px-6
              lg:px-8
            "
          >
            <div className="w-full max-w-[600px] font-[var(--font-jakarta)]">

              {/* Heading */}
              <motion.h1
                variants={fadeLeft}
                className="
                  !font-[var(--font-jakarta)]
                  text-3xl
                  !font-extrabold
                  leading-tight
                  tracking-tight
                  !text-white

                  sm:text-4xl

                  lg:text-5xl
                "
              >
                Best Offers for You!
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                variants={fadeUp}
                className="
                  mt-2
                  !font-[var(--font-jakarta)]
                  text-base
                  font-bold
                  leading-tight
                  text-secondary

                  sm:text-lg

                  lg:text-xl
                "
              >
                More Savings. More Rides. More Happy Journeys.
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="
                  mt-3
                  max-w-[500px]
                  !font-[var(--font-jakarta)]
                  text-sm
                  font-medium
                  leading-6
                  text-white

                  sm:text-base
                  sm:leading-6

                  lg:text-base
                "
              >
                Enjoy exciting discounts and exclusive benefits on
                <br className="hidden sm:block" />
                every ride with SBS Taxi.
              </motion.p>

              {/* Features */}
              <motion.div
                variants={container}
                className="
                  mt-7
                  inline-flex
                  max-w-full
                  flex-wrap
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/25
                  bg-black/20
                  backdrop-blur-[3px]
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
                        flex
                        min-w-[140px]
                        items-center
                        gap-2.5
                        px-4
                        py-3

                        sm:min-w-[150px]

                        lg:min-w-[155px]

                        ${
                          index !== features.length - 1
                            ? "border-r border-white/25"
                            : ""
                        }
                      `}
                    >
                      {/* Icon */}
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                        }}
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-[var(--primary)]
                        "
                      >
                        <Icon className="h-5 w-5 text-[var(--secondary)]" />
                      </motion.div>

                      {/* Text */}
                      <div className="leading-tight">
                        <h4
                          className="
                            whitespace-nowrap
                            !font-[var(--font-jakarta)]
                            text-[11px]
                            !font-bold
                            !text-white

                            lg:text-xs
                          "
                        >
                          {feature.title}
                        </h4>

                        <p
                          className="
                            mt-1
                            whitespace-nowrap
                            !font-[var(--font-jakarta)]
                            text-[9px]
                            font-medium
                            text-white/85

                            lg:text-[10px]
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

       
      </motion.div>
    </section>
  );
}