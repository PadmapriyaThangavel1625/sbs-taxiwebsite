"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Tag,
  X,
  Phone,
  UserPlus,
  LogIn,
} from "lucide-react";

export default function PromotionalTopBar() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="w-full bg-[var(--secondary)] text-white">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8">
        <div
          className="
            flex
            min-h-[48px]
            w-full
            items-center
            justify-between
            gap-1.5
            sm:min-h-[52px]
            sm:gap-4
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="
              flex
              min-w-0
              flex-1
              cursor-pointer
              items-center
              gap-1.5
              transition-opacity
              hover:opacity-90
              sm:gap-3
            "
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
              <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>

            {/* TEXT */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-2
                sm:gap-3
              "
            >
              {/* LIMITED TIME */}

              <span
                className="
                  hidden
                  shrink-0
                  text-[10px]
                  font-bold
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
                  text-[11px]
                  font-bold
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

          {/* =====================================================
              RIGHT CONTENT
          ====================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              sm:gap-2
            "
          >
            {/* =================================================
                PHONE
            ================================================== */}

            <Link
              href="tel:9843544844"
              aria-label="Call SBS Taxi"
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
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                sm:h-9
                sm:w-9
                sm:rounded-lg
              "
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>

            {/* =================================================
                SIGN IN
            ================================================== */}

            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="
                flex
                h-7
                shrink-0
                items-center
                justify-center
                gap-1
                rounded-md
                border
                border-[var(--primary)]
                bg-[var(--primary)]
                px-2
                text-[9px]
                font-bold
                text-[var(--text-primary)]
                transition-all
                duration-200
                hover:shadow-md
                sm:h-9
                sm:gap-1.5
                sm:rounded-lg
                sm:px-3
                sm:text-xs
              "
            >
              <LogIn className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

              <span>Sign In</span>
            </Link>

            {/* =================================================
                SIGN UP
            ================================================== */}

            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="
                flex
                h-7
                shrink-0
                items-center
                justify-center
                gap-1
                rounded-md
                bg-[var(--primary)]
                px-2
                text-[9px]
                font-bold
                text-[var(--secondary)]
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                sm:h-9
                sm:gap-1.5
                sm:rounded-lg
                sm:px-3
                sm:text-xs
              "
            >
              <UserPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

              <span>Sign Up</span>
            </Link>

            {/* =================================================
                CLOSE
            ================================================== */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close offer banner"
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-md
                text-[var(--primary)]
                transition
                hover:bg-white/10
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