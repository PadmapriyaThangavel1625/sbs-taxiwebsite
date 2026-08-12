"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FleetHero() {
  return (
    <section className="w-full overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
      >
        <Image
          src="/images/fleet.webp"
          alt="Our Fleet"
          width={1920}
          height={700}
          priority
          quality={100}
          sizes="100vw"
          className="
            block
            w-full
            h-auto
            max-w-none
          "
        />
      </motion.div>
    </section>
  );
}