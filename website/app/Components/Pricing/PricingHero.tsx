"use client";

import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  CreditCard,
  Route,
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
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -25,
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
    description: "No extra payment charges",
  },
  {
    icon: Route,
    title: "First 200 KM Toll Free",
    description: "More value on your journey",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function PricingHero() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        font-[var(--font-jakarta)]
      "
    >
      {/* =====================================================
          HERO CONTAINER
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="
          relative
          min-h-[650px]
          w-full
          overflow-hidden

          sm:min-h-[520px]

          md:min-h-[480px]

          lg:min-h-[450px]
        "
      >
        {/* ===================================================
            BACKGROUND IMAGE
        ==================================================== */}

        <Image
          src="/images/car2.png"
          alt="SBS Taxi pricing"
          fill
          priority
          sizes="100vw"
          className="
            object-cover

            object-[62%_center]

            sm:object-[58%_center]

            md:object-center

            lg:object-center
          "
        />

        {/* ===================================================
            DARK GRADIENT OVERLAY

            Helps text remain readable without making
            the entire image dark.
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/70
            via-black/45
            to-black/10
          "
        />

        {/* Bottom subtle darkening */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-40
            bg-gradient-to-t
            from-black/45
            to-transparent
          "
        />

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            absolute
            inset-0
            z-10
          "
        >
          <div
            className="
              mx-auto
              flex
              min-h-[620px]
              w-full
              max-w-7xl
              items-center
              px-4
              py-12

              sm:min-h-[520px]
              sm:px-6

              md:min-h-[480px]

              lg:min-h-[450px]
              lg:px-8
            "
          >
            <div
              className="
                w-full
                max-w-[850px]
              "
            >
             

              {/* =================================================
                  HEADING
              ================================================== */}

              <motion.h1
                variants={fadeLeft}
                className="
                  max-w-[760px]
                  font-[var(--font-jakarta)]
                  text-4xl
                  font-extrabold
                  leading-[1.08]
                  tracking-tight
                  !text-white
                  drop-shadow-lg

                  sm:text-5xl

                  md:text-5xl

                  lg:text-[52px]
                "
              >
                Simple &{" "}
                <span className="text-[var(--secondary)]">
                  Transparent Pricing
                </span>
              </motion.h1>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <motion.p
                variants={fadeUp}
                className="
                  mt-4
                  max-w-[600px]
                  font-[var(--font-jakarta)]
                  text-sm
                  font-medium
                  leading-6
                  text-white/85

                  sm:text-base
                  sm:leading-7
                "
              >
                No hidden charges. No surprises. Just honest pricing
                for a comfortable, safe and reliable journey with SBS
                Taxi.
              </motion.p>

              {/* =================================================
                  PERKS
              ================================================== */}

              <motion.div
                variants={container}
                className="
                  mt-8
                  grid
                  grid-cols-2
                  gap-3

                  sm:mt-9
                  sm:grid-cols-2
                  sm:gap-4

                  md:grid-cols-3

                  lg:grid-cols-5
                  lg:gap-3
                "
              >
                {perks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      whileHover={{
                        y: -4,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="
                        group
                        relative
                        flex
                        min-h-[82px]
                        items-center
                        gap-3
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/20
                        bg-white/[0.08]
                        px-3
                        py-3
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-white/35
                        hover:bg-white/[0.14]

                        sm:min-h-[88px]
                        sm:px-3.5

                        lg:min-h-[94px]
                      "
                    >
                      {/* =================================================
                          SUBTLE HOVER GLOW
                      ================================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-br
                          from-white/[0.08]
                          via-transparent
                          to-transparent
                          opacity-0
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      />

                      {/* =================================================
                          ICON
                      ================================================== */}

                      <div
                        className="
                          relative
                          z-10
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/20
                          bg-white/10
                          backdrop-blur-sm

                          sm:h-10
                          sm:w-10
                        "
                      >
                        <Icon
                          aria-hidden="true"
                          className="
                            h-[18px]
                            w-[18px]
                            text-[var(--secondary)]

                            sm:h-5
                            sm:w-5
                          "
                          strokeWidth={2}
                        />
                      </div>

                      {/* =================================================
                          TEXT
                      ================================================== */}

                      <div
                        className="
                          relative
                          z-10
                          min-w-0
                        "
                      >
                        <p
                          className="
                            font-[var(--font-jakarta)]
                            text-[10px]
                            font-bold
                            leading-4
                            text-white

                            sm:text-[11px]
                          "
                        >
                          {item.title}
                        </p>

                        <p
                          className="
                            mt-0.5
                            font-[var(--font-jakarta)]
                            text-[8px]
                            font-medium
                            leading-3.5
                            !text-white/90

                            sm:text-[9px]
                            sm:leading-4
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
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}