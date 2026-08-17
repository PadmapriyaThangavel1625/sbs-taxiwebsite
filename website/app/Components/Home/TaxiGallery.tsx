"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

const images = [
  SBS_TAXI_CONFIG.images.service,
  SBS_TAXI_CONFIG.images.fleet,
  SBS_TAXI_CONFIG.images.destination,
  SBS_TAXI_CONFIG.images.offers,
  SBS_TAXI_CONFIG.images.airport,
];

const SLIDES_PER_VIEW = 3;

export default function TaxiGallery() {
  const [current, setCurrent] = useState(0);

  const totalSlides = Math.ceil(
    images.length / SLIDES_PER_VIEW
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">

      {/* =========================
          CONTENT
      ========================== */}

      <div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:mb-10">

        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--secondary)] sm:text-base">
          Our Fleet
        </span>

        <h2 className="mt-2 text-3xl font-extrabold text-[var(--primary)] sm:text-4xl lg:text-5xl">
          Explore SBS Taxi
        </h2>

        <h3 className="mt-1 text-xl font-bold text-[var(--primary)] sm:text-2xl lg:text-3xl">
          Your Journey. Our Commitment.
        </h3>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--primary)] sm:text-base sm:leading-7">
          Take a look at our taxis, journeys, and the experiences
          we create for our customers. From city rides to
          long-distance trips, SBS Taxi is committed to making
          every journey safe, comfortable, and reliable.
        </p>

      </div>

      {/* =========================
          GALLERY
      ========================== */}

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-2xl">

          {/* SLIDER */}

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >

            {Array.from({ length: totalSlides }).map(
              (_, slideIndex) => {

                const slideImages = images.slice(
                  slideIndex * SLIDES_PER_VIEW,
                  slideIndex * SLIDES_PER_VIEW + SLIDES_PER_VIEW
                );

                return (
                  <div
                    key={slideIndex}
                    className="
                      grid
                      w-full
                      min-w-full
                      shrink-0
                      grid-cols-1
                      gap-3
                      sm:grid-cols-3
                    "
                  >

                    {slideImages.map((image, imageIndex) => {

                      const actualIndex =
                        slideIndex * SLIDES_PER_VIEW +
                        imageIndex;

                      return (
                        <div
                          key={`${image}-${actualIndex}`}
                          className="
                            relative
                            aspect-[4/3]
                            w-full
                            overflow-hidden
                            rounded-xl
                            bg-gray-100
                            sm:aspect-[4/3]
                            lg:aspect-[4/3]
                          "
                        >

                          <Image
                            src={image}
                            alt={`SBS Taxi Gallery ${
                              actualIndex + 1
                            }`}
                            fill
                            priority={actualIndex < 3}
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="
                              object-contain
                              bg-gray-100
                              transition-transform
                              duration-500
                              hover:scale-105
                            "
                          />

                        </div>
                      );
                    })}

                    {/* Keep final slide aligned */}
                    {slideImages.length < 3 &&
                      Array.from({
                        length: 3 - slideImages.length,
                      }).map((_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="
                            hidden
                            aspect-[4/3]
                            sm:block
                          "
                        />
                      ))}

                  </div>
                );
              }
            )}

          </div>

          {/* =========================
              DOTS
          ========================== */}

          <div
            className="
              absolute
              bottom-4
              left-1/2
              z-20
              flex
              -translate-x-1/2
              gap-2
            "
          >

            {Array.from({ length: totalSlides }).map(
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={`
                    h-2.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      index === current
                        ? "w-8 bg-yellow-400"
                        : "w-2.5 bg-white/80 hover:bg-white"
                    }
                  `}
                />
              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
}



{/* 
  "use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

const images = [
  SBS_TAXI_CONFIG.images.service,
  SBS_TAXI_CONFIG.images.fleet,
  SBS_TAXI_CONFIG.images.destination,
  SBS_TAXI_CONFIG.images.offers,
  SBS_TAXI_CONFIG.images.airport,
 
];

export default function TaxiGallery() {
  const [current, setCurrent] = useState(0);

  /* =========================
     AUTOMATIC SLIDER
  ========================== 

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
      ========================== 

      <div className="mx-auto mb-10 max-w-3xl px-4 text-center">

        <span className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
          Our Fleet
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
      ========================== 

      <div className="mx-auto w-full max-w-7xl px-4">

        <div
          className="
            relative
            aspect-[3/2]
            w-full
            overflow-hidden
            rounded-2xl
            bg-gray-100
          "
        >

          {/* =========================
              AUTO SLIDER
          ========================== *

          <div
            className="
              flex
              h-full
              w-full
              transition-transform
              duration-1000
              ease-in-out
            "
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >

            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="
                  relative
                  h-full
                  w-full
                  min-w-full
                  shrink-0
                "
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
          ========================== 

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/10
            "
          />

          {/* =========================
              DOTS
          ========================== 

          <div
            className="
              absolute
              bottom-5
              left-1/2
              z-10
              flex
              -translate-x-1/2
              gap-2
            "
          >

            {images.map((_, index) => (
              <button
                key={`gallery-dot-${index}`}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === current}
                className={`
                  h-2.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    index === current
                      ? "w-8 bg-yellow-400"
                      : "w-2.5 bg-white/70 hover:bg-white"
                  }
                `}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
  */}