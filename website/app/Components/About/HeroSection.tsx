"use client";

import Image from "next/image";
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
    x: -35,
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
    y: 18,
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
    icon: "🛡️",
    title: "Safe & Secure",
    description: "Verified drivers &\nwell maintained cars",
  },
  {
    icon: "◷",
    title: "On-Time Service",
    description: "Punctual pickups\nevery time",
  },
  {
    icon: "₹",
    title: "Transparent Pricing",
    description: "No hidden charges,\n100% transparent",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    description: "We are always here\nto assist you",
  },
];

export default function AboutHero() {
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
        className="
          relative
          h-[700px]
          w-full

          sm:h-[600px]

          lg:h-[600px]
        "
      >
        <Image
          src="/images/car4.png"
          alt="SBS Taxi - Your Journey Our Commitment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Very light overlay */}
        <div className="absolute inset-0 bg-white/5" />

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
            <div
              className="
                w-full
                max-w-[520px]
                font-[var(--font-jakarta)]
              "
            >
              {/* Small Label */}
              <motion.div
                variants={fadeLeft}
                className="
                  mb-2
                  inline-block
                  border-b-2
                  border-secondary
                  pb-1
                  !font-[var(--font-jakarta)]
                  text-[11px]
                  !font-bold
                  uppercase
                  tracking-wide
                  text-[var(--primary)]

                  sm:text-xs

                  lg:text-sm
                "
              >
                About Us
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeLeft}
                className="
                  !font-[var(--font-jakarta)]
                  text-3xl
                  !font-extrabold
                  leading-tight
                  tracking-tight
                  text-heading
                  text-[var(--primary)]

                  sm:text-4xl

                  lg:text-5xl
                "
              >
                Your Journey. Our Commitment.
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="
                  mt-3
                  max-w-[480px]
                  !font-[var(--font-jakarta)]
                  text-sm
                  font-medium
                  leading-5
                  text-heading
                  text-semibold

                  sm:text-base
                  sm:leading-6

                  lg:text-base
                  lg:leading-6
                "
              >
                SBS Taxi is a trusted taxi service provider committed to
                delivering safe, reliable and comfortable travel experiences
                across the city and beyond. Whether it&apos;s a local ride or
                an outstation trip, we make every journey smooth and memorable.
              </motion.p>

              {/* Features */}
              <motion.div
                variants={container}
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-start
                  gap-x-5
                  gap-y-4

                  sm:gap-x-6

                  lg:gap-x-7
                "
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeUp}
                    whileHover={{
                      y: -3,
                    }}
                    className="
                      flex
                      items-start
                      gap-2
                    "
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
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
                        border-primary
                        bg-[var(--primary)]
                        text-[var(--secondary)]
                        text-sm
                        shadow-sm

                        sm:h-9
                        sm:w-9
                      "
                    >
                      {feature.icon}
                    </motion.div>

                    {/* Text */}
                    <div className="leading-tight">
                      <p
                        className="
                          whitespace-nowrap
                          !font-[var(--font-jakarta)]
                          text-[10px]
                          font-bold
                          text-heading
                          !text-white

                          sm:text-[11px]

                          lg:text-[15px]
                        "
                      >
                        {feature.title}
                      </p>

                      <p
                        className="
                          mt-1
                          whitespace-pre-line
                          !font-[var(--font-jakarta)]
                          text-[8px]
                          font-medium
                          leading-3
                          text-muted
                          !text-white
                          !text-30px

                          sm:text-[9px]
                          sm:leading-3.5

                          lg:text-[10px]
                          lg:leading-4
                        "
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}