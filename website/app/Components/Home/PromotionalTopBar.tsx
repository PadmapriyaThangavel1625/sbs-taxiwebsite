"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, X, Phone } from "lucide-react";

export default function PromotionalTopBar() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="w-full bg-[var(--secondary)] text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div
          className="
            flex
            min-h-[48px]
            w-full
            items-center
            justify-between
            gap-2
            sm:min-h-[52px]
            sm:gap-4
          "
        >
          {/* LEFT CONTENT */}
          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="flex min-w-0 flex-1 items-center gap-2 cursor-pointer transition-opacity hover:opacity-90 sm:gap-3"
          >
            {/* ICON */}
            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-[var(--primary)]
                text-[var(--secondary)]

                sm:h-8
                sm:w-8
                sm:rounded-lg
              "
            >
              <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4 " />
            </div>

            {/* TEXT */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              {/* LIMITED TIME */}
              <span
                className="
                  hidden
                  shrink-0
                  text-[10px]
                  !font-bold
                  uppercase
                  tracking-[0.12em]
                  text-black

                  sm:inline
                  sm:text-xs
                "
              >
                Limited Time
              </span>

              {/* MAIN OFFER */}
              <span
                className="
                  truncate
                  text-[12px]
                  !font-bold
                  leading-5
                  text-[var(--primary)]

                  sm:text-sm
                  md:text-base
                "
              >
                Special Taxi Offers
              </span>

              {/* DESCRIPTION */}
              <span
                className="
                  hidden
                  truncate
                  text-xs
                  text-[var(--primary)]

                  md:inline
                  lg:text-sm
                "
              >
                — Book today and enjoy special rates!
              </span>
            </div>
          </Link>

          {/* RIGHT CONTENT */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* BOOK NOW / PHONE */}
            <Link
              href="tel:9843544844"
              className="
                ml-1
                rounded-lg
                bg-[var(--primary)]
                px-2
                py-2
                text-[14px]
                font-bold
                !text-[var(--secondary)]
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--primary)]
                hover:shadow-md
                lg:flex
              "
              style={{
                fontFamily: "var(--font-jakarta)",
              }}
            >
              <Phone className="h-4 !w-5 !leading[1.5]" />
            </Link>

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close offer banner"
              className="
                flex
                !h-5
                !w-5
                shrink-0
                items-center
                justify-center
                rounded-md
                !text-white/75
                transition

                hover:bg-white/10
                hover:text-white

                sm:h-5
                sm:w-5
                sm:rounded-lg
              "
            >
              <X className="!h-3 !w-3 sm:h-3 sm:w-3 text-[var(--primary)]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}