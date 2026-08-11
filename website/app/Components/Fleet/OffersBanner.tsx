
"use client";

import Link from "next/link";
import {
  Smartphone,
  Tag,
  ArrowRight,
} from "lucide-react";

export default function OffersBanner() {
  return (
    <section className="py-6 sm:py-8">
      <div
        className="
          container-custom
          overflow-hidden
          rounded-2xl
          bg-primary
          p-5
          text-white
          shadow-md
          sm:p-6
          lg:p-7
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-8
          "
        >
          {/* Title */}
          <div className="min-w-0 lg:flex-1">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                "
              >
                <Smartphone size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Exclusive Offers
                </h2>

                <p className="mt-1 text-sm leading-6 text-white/90 sm:text-base">
                  Book through our app and get exciting discounts!
                </p>
              </div>
            </div>
          </div>

          {/* Offer 1 */}
          <div
            className="
              rounded-xl
              border
              border-white/15
              bg-white/10
              p-4
              lg:min-w-[170px]
            "
          >
            <div className="flex items-center gap-2">
              <Tag size={18} />

              <h2 className="text-xl font-bold sm:text-2xl">
                ₹50 OFF
              </h2>
            </div>

            <p className="mt-1 text-sm text-white/90">
              On first 3 bookings
            </p>
          </div>

          {/* Offer 2 */}
          <div
            className="
              rounded-xl
              border
              border-white/15
              bg-white/10
              p-4
              lg:min-w-[190px]
            "
          >
            <div className="flex items-center gap-2">
              <Tag size={18} />

              <h2 className="text-xl font-bold sm:text-2xl">
                ₹20 OFF
              </h2>
            </div>

            <p className="mt-1 text-sm text-white/90">
              On every booking after first 3
            </p>
          </div>

          {/* Button */}
          <Link
            href="#download-app"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              px-6
              py-3
              font-bold
              text-primary
              shadow-sm
              transition-all
              duration-200
              hover:bg-primary-light
              hover:shadow-md
              sm:w-auto
              sm:px-8
            "
          >
            Download App
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
