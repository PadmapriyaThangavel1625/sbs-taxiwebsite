"use client";

import {
  Users,
  ShieldCheck,
  UserCheck,
  Star,
  Lightbulb,
} from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion";

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We put our customers first in everything we do.",
    tag: "Core Focus",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Honest, transparent and fair in all our dealings.",
    tag: "Trust",
  },
  {
    icon: UserCheck,
    title: "Safety",
    description: "Your safety is our top priority, always.",
    tag: "Priority",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We strive for excellence in every ride.",
    tag: "Quality",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace technology to serve you better.",
    tag: "Future",
  },
];

const customEase: Easing = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: customEase,
    },
  },
};

export default function Values() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-[var(--background)] via-slate-50/50 to-[var(--background)] border-y border-[var(--border)] overflow-hidden my-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: customEase }}
          className="mb-14 text-center"
        >
          <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold uppercase tracking-widest text-sky-700 bg-sky-100/80 rounded-full">
            Principles
          </span>
          <h2 className="font-[family-name:var(--font-instrument)] text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
            Our Values
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-jakarta)] text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            The fundamental beliefs and commitments that drive every journey we create for you.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {values.map((val, idx) => {
            const Icon = val.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-xl hover:border-sky-300/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100/70 text-sky-800 flex items-center justify-center shadow-inner group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-800 transition-colors">
                      {val.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-instrument)] text-xl font-normal text-[var(--text-primary)] tracking-tight mb-2">
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p className="font-[family-name:var(--font-jakarta)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {val.description}
                  </p>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}