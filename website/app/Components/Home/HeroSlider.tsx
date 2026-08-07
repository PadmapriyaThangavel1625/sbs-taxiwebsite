"use client";

import Image from "next/image";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="SBS Taxi"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}