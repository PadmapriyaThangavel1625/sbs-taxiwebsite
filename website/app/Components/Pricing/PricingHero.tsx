"use client";

import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  CreditCard,
  Route,
} from "lucide-react";
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

const perks = [
  {
    icon: CheckCircle2,
    title: "Transparent",
    subtitle: "Pricing",
  },
  {
    icon: ShieldCheck,
    title: "No Hidden",
    subtitle: "Charges",
  },
  {
    icon: Clock,
    title: "No Waiting",
    subtitle: "Charges",
  },
  {
    icon: CreditCard,
    title: "No Extra Charge",
    subtitle: "For Online Payments",
  },
  {
    icon: Route,
    title: "Toll Free For",
    subtitle: "First 200 KM",
  },
];

export default function PricingHero() {
  return (
    <section className="relative w-full overflow-hidden font-[var(--font-jakarta)]">
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
          !h-[500px]
          w-full

          sm:h-[200px]

          lg:h-[215px]
        "
      >
        <Image
          src="/images/car2.png"
          alt="Taxi pricing"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Light Overlay */}
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
            <div className="w-full max-w-[650px]">

              {/* Heading */}
              <motion.h1
                variants={fadeLeft}
                className="
                  !font-[var(--font-jakarta)]
                  !text-3xl
                  !font-extrabold
                  leading-tight
                  tracking-tight
                  !text-white

                  sm:!text-3xl

                  lg:!text-4xl
                "
              >
                Simple &{" "}
                <span className="!text-primary">
                  Transparent Pricing
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="
                  mt-2
                  max-w-[500px]
                  !font-[var(--font-jakarta)]
                  text-sm
                  font-medium
                  leading-5
                  !text-white

                  sm:text-sm
                  sm:leading-5

                  lg:text-base
                  lg:leading-6
                "
              >
                No hidden charges. No surprises. Just honest pricing
                <br className="hidden sm:block" />
                for a comfortable and safe journey.
              </motion.p>

              {/* Perks Bar */}
              <motion.div
                variants={fadeUp}
                className="
                  mt-4
                  flex
                  w-fit
                  max-w-full
                  overflow-hidden
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  shadow-md
                "
              >
                {perks.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      whileHover={{
                        y: -2,
                      }}
                      className={`
                        flex
                        min-w-[105px]
                        items-center
                        gap-2
                        px-3
                        py-2.5

                        sm:min-w-[120px]
                        sm:px-3.5

                        lg:min-w-[135px]
                        lg:px-4

                        ${
                          index !== perks.length - 1
                            ? "border-r border-gray-200"
                            : ""
                        }
                      `}
                    >
                      {/* Icon */}
                      <Icon
                        className="
                          h-5
                          w-5
                          shrink-0
                          text-primary

                          sm:h-5
                          sm:w-5

                          lg:h-6
                          lg:w-6
                        "
                        strokeWidth={2}
                      />

                      {/* Text */}
                      <div className="leading-tight">
                        <p
                          className="
                            whitespace-nowrap
                            !font-[var(--font-jakarta)]
                            text-[10px]
                            font-bold
                            !text-heading

                            sm:text-[10px]

                            lg:text-[11px]
                          "
                        >
                          {item.title}
                        </p>

                        <p
                          className="
                            mt-0.5
                            whitespace-nowrap
                            !font-[var(--font-jakarta)]
                            text-[9px]
                            font-medium
                            !text-heading

                            sm:text-[9px]

                            lg:text-[10px]
                          "
                        >
                          {item.subtitle}
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