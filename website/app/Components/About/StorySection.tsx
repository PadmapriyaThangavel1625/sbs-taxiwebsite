
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6"
          >
            <h2
              className="
                font-[family-name:var(--font-instrument)]
                text-3xl
                font-normal
                text-[var(--text)]
                md:text-4xl
              "
            >
              Our Story
            </h2>

            <div
              className="
                space-y-4
                font-[family-name:var(--font-jakarta)]
                text-base
                leading-relaxed
                text-[var(--muted)]
              "
            >
              <p>
                Founded with a vision to transform urban mobility, SBS Taxi has
                grown to become one of the most reliable taxi services trusted
                by thousands of customers.
              </p>

              <p>
                We believe in providing quality rides at fair prices with a
                strong focus on safety, punctuality, and customer satisfaction.
              </p>

              <p>
                From daily commutes to weekend getaways, we're here to take you
                wherever you need to go—comfortably and confidently.
              </p>
            </div>

            <Link
              href="/booking"
              className="
                group
                inline-flex
                items-center
                rounded-xl
                bg-[var(--primary)]
                px-6
                py-3
                font-[family-name:var(--font-jakarta)]
                !text-white
                transition-all
                duration-300
                hover:bg-[var(--primary-dark)]
                hover:shadow-lg
              "
            >
              Book a Ride

              <ArrowRight
                className="
                  ml-2
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
  initial={{ opacity: 0, x: 40, scale: 0.97 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    relative
    w-full
    aspect-[1536/910]
    overflow-hidden
    rounded-2xl
    shadow-lg
    bg-slate-100
  "
>
  <Image
    src="/images/offers.webp"
    alt="SBS Taxi Drivers Team"
    fill
    priority
    sizes="(max-width: 1024px) 100vw, 50vw"
    className="
      object-contain
      transition-transform
      duration-700
      hover:scale-105
    "
  />
</motion.div>
        </div>
      </div>
    </section>
  );
}
