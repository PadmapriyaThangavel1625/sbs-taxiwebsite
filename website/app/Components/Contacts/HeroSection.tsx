"use client";

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
   COMPONENT
============================================================ */

export default function ContactHero() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[var(--primary)]
        font-[var(--font-jakarta)]
      "
    >
      {/* ======================================================
          BACKGROUND EFFECT
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* TOP RIGHT GLOW */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[-100px]
            top-[-80px]

            h-[350px]
            w-[350px]

            rounded-full

            bg-[var(--secondary)]/10

            blur-[100px]
          "
        />

        {/* BOTTOM LEFT GLOW */}

        <div
          className="
            absolute
            bottom-[-120px]
            left-[-100px]

            h-[300px]
            w-[300px]

            rounded-full

            bg-[var(--secondary)]/5

            blur-[100px]
          "
        />

        {/* SUBTLE DOT GRID */}

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(
              circle_at_center,
              rgba(255,255,255,0.04)_1px,
              transparent_1px
            )]

            bg-[length:28px_28px]

            opacity-40
          "
        />
      </div>

      {/* ======================================================
          HERO CONTAINER
      ======================================================= */}

      <div
        className="
          relative
          min-h-[500px]
          w-full

          sm:min-h-[480px]

          md:min-h-[500px]

          lg:min-h-[520px]
        "
      >
        {/* ====================================================
            CONTENT
        ===================================================== */}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            relative
            z-10
            h-full
          "
        >
          <div
            className="
              mx-auto
              flex
              min-h-[500px]
              w-full
              max-w-7xl
              items-center

              px-4
              py-16

              sm:min-h-[480px]
              sm:px-6
              sm:py-20

              md:min-h-[500px]

              lg:min-h-[520px]
              lg:px-8
              lg:py-24
            "
          >
            <div
              className="
                w-full
                max-w-[750px]
              "
            >
              {/* =================================================
                  SMALL LABEL
              ================================================== */}

              <motion.div
                variants={fadeLeft}
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2

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

                Contact Us
              </motion.div>

              {/* =================================================
                  MAIN HEADING
              ================================================== */}

              <motion.h1
                variants={fadeLeft}
                className="
                  max-w-[700px]

                  font-[family-name:var(--font-instrument)]

                  text-4xl
                  font-normal
                  leading-[1.05]
                  tracking-tight
                  !text-white

                  sm:text-5xl

                  md:text-[54px]

                  lg:text-[60px]
                "
              >
                We&apos;re Here to
                <br />

                <span className="text-[var(--secondary)]">
                  Help You.
                </span>
              </motion.h1>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <motion.p
                variants={fadeUp}
                className="
                  mt-6
                  max-w-[650px]

                  text-sm
                  font-normal
                  leading-6

                  text-white/80

                  sm:text-base
                  sm:leading-7

                  lg:text-lg
                  lg:leading-8
                "
              >
                Have questions, feedback, or need support with your
                rides? Get in touch with us. Our support team is
                available 24/7 to assist you with inquiries,
                corporate bookings, and general assistance.
              </motion.p>

              {/* =================================================
                  BOTTOM LINE
              ================================================== */}

              <motion.div
                variants={fadeUp}
                className="
                  mt-8
                  h-[2px]
                  w-20
                  rounded-full
                  bg-[var(--secondary)]
                "
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}