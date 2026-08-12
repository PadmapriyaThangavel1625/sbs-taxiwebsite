"use client";

import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="w-full bg-white">
      <div className="w-full aspect-[1536/912] relative">
        <Image
          src="/images/service.webp"
          alt="SBS Taxi Services"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}