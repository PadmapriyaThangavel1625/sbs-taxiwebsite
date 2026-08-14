"use client";

import {
  Users,
  Car,
  MapPin,
  Award,
} from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "15+",
    label: "Happy Customers & Counting",
    highlight: "Growing Fast",
  },
  {
    icon: Car,
    value: "6+",
    label: "Well-Maintained Fleet Cars",
    highlight: "Ready 24/7",
  },
  {
    icon: MapPin,
    value: "5+",
    label: "Cities Covered Across Tamil Nadu",
    highlight: "Wide Reach",
  },
  {
    icon: Award,
    value: "2026",
    label: "New Startup Venture in Travel",
    highlight: "Started Fresh",
  },
];

const customEase: Easing = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: customEase },
  },
};

export default function Statistics() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-[var(--background)] via-amber-50/20 to-[var(--background)] overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: customEase }}
          className="mb-14 text-center"
        >
          <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-100/80 rounded-full">
            Milestones
          </span>
          <h2 className="font-[family-name:var(--font-instrument)] text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
            SBS Taxi in Numbers
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-jakarta)] text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Building trust mile by mile with exceptional service and a dependable fleet across Tamil Nadu.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-xl hover:border-amber-300/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center shadow-inner group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-800 transition-colors">
                    {stat.highlight}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-[family-name:var(--font-instrument)] text-4xl sm:text-5xl font-normal text-[var(--text-primary)] tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-jakarta)] text-sm text-[var(--text-secondary)] leading-normal">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}