"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Sparkles, ArrowRight, X, Phone } from "lucide-react";

export default function LimitedOffer() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        bottom-4
        left-4
        z-[80]
        w-[calc(100%-2rem)]
        max-w-md
        sm:bottom-5
        sm:left-5
        md:bottom-6
        md:left-6
      "
    >
      <div className="overflow-hidden rounded-3xl bg-[#1A365D] shadow-2xl ring-1 ring-black/10">

        {/* HEADER */}
        <div className="relative p-5 sm:p-6">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close offer"
            className="
              absolute
              right-4
              top-4
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-white/10
              text-white
              transition
              hover:bg-white/20
            "
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4 pr-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFC107] text-[#1A365D] shadow-lg">
              <Tag className="h-7 w-7" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFC107]">
                Limited Time
              </p>

              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Special Promotion
              </h2>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-3 bg-[#fffdf4] p-5 sm:p-6">

          {/* OFFER */}
          <div className="rounded-2xl border border-[#e8d9a7] bg-[#fff8df] p-4">
            <div className="flex gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#d89200]" />

              <div>
                <h3 className="font-bold text-[#c17b00]">
                  Special Taxi Offers
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Book your ride today and enjoy our{" "}
                  <strong className="text-slate-800">
                    limited-time special rates.
                  </strong>
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Limited availability remaining
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#1A365D]" />

              <div>
                <h3 className="font-bold text-[#1A365D]">
                  Contact Us Today
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Call us now for full details on current offers.
                </p>

                <a
                  href="tel:+918144065688"
                  className="mt-1 inline-block text-sm font-bold text-[#1A365D] hover:text-[#FFC107]"
                >
                  +91 81440 65688
                </a>
              </div>
            </div>
          </div>

          {/* BOOK BUTTON */}
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[#1A365D]
              px-5
              py-4
              text-base
              font-bold
              text-white
              shadow-lg
              transition
              hover:bg-[#0753b8]
              hover:shadow-xl
            "
          >
            <span>Book Your Ride</span>
            <ArrowRight className="h-5 w-5" />
          </Link>

          {/* PHONE */}
          <div className="text-center">
            <span className="text-xs text-slate-400">
              Call us:{" "}
            </span>

            <a
              href="tel:+918144065688"
              className="text-xs font-semibold text-slate-500 hover:text-[#1A365D]"
            >
              +91 81440 65688
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}