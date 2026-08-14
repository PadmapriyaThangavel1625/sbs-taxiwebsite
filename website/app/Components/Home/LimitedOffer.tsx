"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Sparkles, ArrowRight, X, Percent } from "lucide-react";

export default function LimitedOffer() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed bottom-[80px] left-4 z-50 md:bottom-4">
      {/* SMALL PROMOTIONAL WIDGET */}
      <div
        className="
          relative
          w-[320px]
          max-w-[calc(100vw-32px)]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="relative bg-[var(--secondary)] px-4 py-3.5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close offer"
            className="
              absolute
              right-3
              top-3
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-white/10
              text-white
              transition
              hover:bg-white/20
            "
          >
            <X className="h-4 w-4 text-black" />
          </button>

          <div className="flex items-center gap-3 pr-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--secondary)] shadow-md">
              <Tag className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] !font-bold uppercase tracking-[0.14em] text-black">
                Limited Time
              </p>

              <h2 className="mt-0.5 text-[17px] !font-bold leading-tight !text-black">
                Exclusive Offers
              </h2>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-2.5 bg-[#fffdf4] p-3.5">
          
          {/* OFFER / LIMITED NOTE */}
          <div className="rounded-xl border border-[#e8d9a7] bg-[var(--secondary-light)] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--secondary)] shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>

              <Link
                href="/offers"
                onClick={() => setOpen(false)}
                className="block cursor-pointer transition-opacity hover:opacity-90 min-w-0"
              >
                <div>
                  <h3 className="text-[13px] font-bold leading-5 text-[#c17b00]">
                    Special Taxi Offers
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-[18px] text-slate-600">
                    Book your ride today and enjoy our{" "}
                    <strong className="text-slate-800">
                      limited-time special rates.
                    </strong>
                  </p>

                  <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                    Limited availability remaining
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* OFFER 1: ₹50 OFF */}
          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="block rounded-xl border border-[#e8d9a7] bg-[var(--secondary-light)] p-3 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--secondary)] shadow-sm">
                <Tag className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] font-bold leading-5 text-[#c17b00]">
                  ₹50 OFF
                </h3>
                <p className="mt-0.5 text-[11px] leading-[16px] text-slate-600">
                  On your first 3 bookings with SBS Taxi
                </p>
              </div>
            </div>
          </Link>

          {/* OFFER 2: ₹20 OFF */}
          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="block rounded-xl border border-[#e8d9a7] bg-[var(--secondary-light)] p-3 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--secondary)] shadow-sm">
                <Percent className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] font-bold leading-5 text-[#c17b00]">
                  ₹20 OFF
                </h3>
                <p className="mt-0.5 text-[11px] leading-[16px] text-slate-600">
                  On every booking after your first 3 rides
                </p>
              </div>
            </div>
          </Link>

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
              !bg-[var(--secondary)]
              px-4
              py-2.5
              text-[12px]
              font-bold
              !text-black
              shadow-md
              transition
              hover:shadow-lg
            "
          >
            <span>Book a Ride</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </div>
    </div>
  );
}