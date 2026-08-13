"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/images/aboutus.webp",
  "/images/service.webp",
  "/images/fleet.webp",
  "/images/destination.webp",
  "/images/offers.webp",
  "/images/airport.webp",
  "/images/corporate.webp",
];

export default function TaxiGallery() {
  const [current, setCurrent] = useState(0);

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      {/* =========================
          SECTION CONTENT
      ========================== */}
      <div className="mx-auto mb-10 max-w-3xl px-4 text-center">
        <span className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
          Our Gallery
        </span>

        <h2 className="mt-3 text-3xl font-extrabold text-[var(--primary)] sm:text-4xl lg:text-5xl">
          Explore SBS Taxi
        </h2>

        <h3 className="mt-1 text-2xl font-bold text-[var(--primary)] sm:text-3xl lg:text-4xl">
          Your Journey. Our Commitment.
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--primary)] sm:text-lg">
          Take a look at our taxis, journeys, and the experiences we create
          for our customers. From city rides to long-distance trips, SBS Taxi
          is committed to making every journey safe, comfortable, and reliable.
        </p>
      </div>

      {/* =========================
          GALLERY
      ========================== */}
      <div className="mx-auto w-full max-w-7xl px-4">
        <div
          className="
            relative
            aspect-[4/3]
            w-full
            overflow-hidden
            rounded-2xl
            bg-white
            sm:aspect-video
          "
        >
          {/* =========================
              AUTO SLIDER
          ========================== */}
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={image}
                className="relative h-full min-w-full shrink-0"
              >
                <Image
                  src={image}
                  alt={`SBS Taxi Gallery ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* =========================
              LIGHT OVERLAY
          ========================== */}
          <div className="pointer-events-none absolute inset-0 bg-black/10" />

          {/* =========================
              DOTS ONLY
          ========================== */}
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-yellow-400"
                    : "w-2.5 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}