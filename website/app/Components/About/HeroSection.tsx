"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-white">
      <Image
        src="/images/aboutus.webp"
        alt="SBS Taxi About Us"
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
    </section>
  );
}