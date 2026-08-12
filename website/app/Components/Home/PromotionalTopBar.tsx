
"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, ArrowRight, X, Phone } from "lucide-react";

export default function PromotionalTopBar() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="w-full bg-[var(--primary)] text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-[48px] items-center justify-between gap-2 sm:min-h-[52px] sm:gap-3">

          {/* LEFT */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">

            {/* ICON */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--secondary)] text-[var(--primary)] sm:h-8 sm:w-8 sm:rounded-lg">
              <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>

            {/* TEXT */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--secondary)] sm:inline sm:text-xs">
                Limited Time
              </span>

              <span className="truncate text-[12px] font-bold leading-5 sm:text-sm md:text-base">
                Special Taxi Offers
              </span>

              <span className="hidden truncate text-xs text-white/80 md:inline lg:text-sm">
                — Book today and enjoy special rates!
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

            {/* PHONE */}
            <a
              href="tel:9843544844"
              className="
                hidden
                items-center
                gap-1.5
                text-[11px]
                font-semibold
                text-white/90
                transition
                hover:text-[var(--secondary)]
                lg:flex
              "
            >
              <Phone className="h-3.5 w-3.5" />
              98435 44844
            </a>

           <Link
  href="/booking"
  className="
    flex
    items-center
    gap-1
    rounded-md
    !bg-[var(--secondary)]
    px-2.5
    py-1.5
    !text-[var(--primary)]
    text-[11px]
    font-bold
    leading-4
    transition
    hover:!bg-[var(--secondary-dark)]
    sm:rounded-lg
    sm:px-4
    sm:py-2
    sm:text-xs
  "
>
  Book Now
  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
</Link>

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close offer"
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                text-white/80
                transition
                hover:bg-white/10
                hover:text-white
                sm:h-8
                sm:w-8
                sm:rounded-lg
              "
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
