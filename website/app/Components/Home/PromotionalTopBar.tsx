"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, ArrowRight, X, Phone } from "lucide-react";

export default function PromotionalTopBar() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="w-full bg-[#1A365D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[52px] items-center justify-between gap-3">
          
          {/* LEFT */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFC107] text-[#1A365D]">
              <Tag className="h-4 w-4" />
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <span className="hidden text-xs font-bold uppercase tracking-wider text-[#FFC107] sm:inline">
                Limited Time
              </span>

              <span className="truncate text-sm font-bold sm:text-base">
                Special Taxi Offers
              </span>

              <span className="hidden text-sm text-white/80 md:inline">
                — Book today and enjoy special rates!
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex shrink-0 items-center gap-2">
            
            {/* PHONE */}
            <a
              href="tel:+918144065688"
              className="
                hidden
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-white/90
                transition
                hover:text-[#FFC107]
                lg:flex
              "
            >
              <Phone className="h-4 w-4" />
              +91 9843544844
            </a>

            {/* BOOK */}
            <Link
              href="/booking"
              className="
                flex
                items-center
                gap-1
                rounded-lg
                bg-[#FFC107]
                px-3
                py-2
                text-xs
                font-bold
                text-[#1A365D]
                transition
                hover:bg-yellow-300
                sm:px-4
              "
            >
              Book Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close offer"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-white/80
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}