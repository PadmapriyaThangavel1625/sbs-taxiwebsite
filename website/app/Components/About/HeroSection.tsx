"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  IndianRupee,
  Headphones,
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* =====================================================
          BACKGROUND IMAGE + ZOOM IN / ZOOM OUT
      ====================================================== */}

      <motion.div
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
        "
        animate={{
          scale: [1, 1.035, 1],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: "url('/images/car4.png')",
          }}
        />
      </motion.div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[280px]
          max-w-7xl
          items-center
          px-4
          py-10
          sm:min-h-[320px]
          sm:px-6
          sm:py-12
          lg:min-h-[390px]
          lg:px-8
          lg:py-14
        "
      >
        <div className="w-full max-w-[590px]">
          {/* =================================================
              ABOUT US LABEL
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div
              className="
                mb-2
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[var(--primary)]
                sm:text-xs
              "
              style={{
                fontFamily: "var(--font-jakarta)",
              }}
            >
              <span
                className="
                  h-[2px]
                  w-6
                  rounded-full
                  bg-[var(--secondary)]
                "
              />

              ABOUT US
            </div>
          </motion.div>

          {/* =================================================
              TITLE
          ================================================== */}

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="
              text-2xl
              font-extrabold
              leading-[1.1]
              tracking-tight
              text-[var(--primary)]
              sm:text-3xl
              md:text-4xl
            "
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            Your Journey.
            <span className="text-[var(--primary)]">
              {" "}
              Our Commitment.
            </span>
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="
              mt-2
              max-w-[430px]
              text-[10px]
              font-medium
              leading-[1.55]
              text-gray-700
              sm:text-xs
              md:text-[13px]
            "
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            SBS Taxi is a trusted taxi service provider committed to
            delivering safe, reliable and comfortable travel experiences
            across the city and beyond. Whether it's a local ride or an
            outstation trip, we make every journey smooth and memorable.
          </motion.p>

          {/* =================================================
              FEATURES
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: "easeOut",
            }}
            className="
              mt-5
              grid
              grid-cols-2
              gap-x-4
              gap-y-4
              sm:mt-6
              sm:grid-cols-4
              sm:gap-x-3
              sm:gap-y-0
            "
          >
            {/* FEATURE 1 */}

            <Feature
              icon={<ShieldCheck />}
              title="Safe & Secure"
              description="Verified drivers and well-maintained cars"
            />

            {/* FEATURE 2 */}

            <Feature
              icon={<Clock3 />}
              title="On-Time Service"
              description="Reliable pickups every time"
            />

            {/* FEATURE 3 */}

            <Feature
              icon={<IndianRupee />}
              title="Transparent Pricing"
              description="No hidden charges, 100% transparent"
            />

            {/* FEATURE 4 */}

            <Feature
              icon={<Headphones />}
              title="24/7 Support"
              description="We're always here to assist you"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2">
      {/* ICON */}

      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[var(--primary)]
          bg-white
          text-[var(--primary)]
          sm:h-8
          sm:w-8
        "
      >
        <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </span>
      </div>

      {/* TEXT */}

      <div className="min-w-0">
        <h3
          className="
            text-[8px]
            font-bold
            leading-tight
            text-[var(--primary)]
            sm:text-[9px]
            md:text-[10px]
          "
          style={{
            fontFamily: "var(--font-jakarta)",
          }}
        >
          {title}
        </h3>

        <p
          className="
            mt-0.5
            max-w-[105px]
            text-[7px]
            leading-[1.35]
            text-gray-600
            sm:text-[8px]
          "
          style={{
            fontFamily: "var(--font-jakarta)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}