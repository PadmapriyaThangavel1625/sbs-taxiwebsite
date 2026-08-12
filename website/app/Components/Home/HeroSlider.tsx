"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Background Image */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/hero.png"
          alt="SBS Taxi"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
            sm:object-center
            lg:object-[center_45%]
            xl:object-[center_40%]
          "
        />
      </motion.div>

    </div>
  );
}