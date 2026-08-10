
"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Sparkles, ArrowRight, X, Phone } from "lucide-react";

export default function LimitedOffer() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* SMALL PROMOTIONAL WIDGET */}
      <div className="relative w-[300px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="relative bg-[#1A365D] p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close offer"
            className="
              absolute
              right-3
              top-3
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-white/10
              text-white
              transition
              hover:bg-white/20
            "
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 pr-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFC107] text-[#1A365D] shadow-md">
              <Tag className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FFC107]">
                Limited Time
              </p>

              <h2 className="mt-0.5 text-lg font-bold text-white">
                Special Promotion
              </h2>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-2.5 bg-[#fffdf4] p-4">

          {/* OFFER */}
          <div className="rounded-xl border border-[#e8d9a7] bg-[#fff8df] p-3">
            <div className="flex gap-2.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#d89200]" />

              <div>
                <h3 className="text-sm font-bold text-[#c17b00]">
                  Special Taxi Offers
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-slate-600">
                  Book your ride today and enjoy our{" "}
                  <strong className="text-slate-800">
                    limited-time special rates.
                  </strong>
                </p>

                <p className="mt-0.5 text-[10px] font-semibold text-slate-500">
                  Limited availability remaining
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#1A365D]" />

              <div>
                <h3 className="text-sm font-bold text-[#1A365D]">
                  Contact Us Today
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-slate-600">
                  Call us for details on current offers.
                </p>

                <a
                  href="tel:+918144065688"
                  className="mt-0.5 inline-block text-xs font-bold text-[#1A365D] hover:text-[#FFC107]"
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
              rounded-xl
              bg-[#1A365D]
              px-4
              py-3
              text-sm
              font-bold
              text-white
              shadow-md
              transition
              hover:bg-[#0753b8]
              hover:shadow-lg
            "
          >
            <span>Book Your Ride</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* PHONE */}
          <div className="text-center">
            <span className="text-[10px] text-slate-400">
              Call us:{" "}
            </span>

            <a
              href="tel:+918144065688"
              className="text-[10px] font-semibold text-slate-500 hover:text-[#1A365D]"
            >
              +91 9843544844
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
