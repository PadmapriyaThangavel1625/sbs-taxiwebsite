
"use client";

import Image from "next/image";

export default function HeroSlider() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="SBS Taxi"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}
