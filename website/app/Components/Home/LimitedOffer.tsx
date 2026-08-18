"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Tag,
  User,
  CarFront,
  BriefcaseBusiness,
  ArrowRight,
  X,
} from "lucide-react";

export default function LimitedOffer() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        bottom-[80px]
        left-4
        z-50
        md:bottom-4
      "
    >
      {/* =====================================================
          MAIN POPUP
      ====================================================== */}

      <div
        className="
          relative
          w-[320px]
          max-w-[calc(100vw-32px)]
          overflow-hidden
          rounded-2xl
          border
          border-[#d8e5f2]
          bg-white
          shadow-[0_20px_60px_rgba(13,27,42,0.22)]
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            relative
            bg-[#ffcd38]
            px-4
            py-3.5
          "
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close offers"
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
              bg-black/5
              text-[#0d1b2a]
              transition
              hover:bg-black/10
            "
          >
            <X className="h-4 w-4" />
          </button>

          {/* HEADER CONTENT */}

          <div
            className="
              flex
              items-center
              gap-3
              pr-8
            "
          >
            {/* ICON */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#0047ab]
                text-[#ffcd38]
                shadow-md
              "
            >
              <Tag className="h-5 w-5" />
            </div>

            {/* TEXT */}

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-[#0d1b2a]
                "
              >
                Limited Time
              </p>

              <h2
                className="
                  mt-0.5
                  text-[17px]
                  font-extrabold
                  leading-tight
                  text-[#0d1b2a]
                "
              >
                Exclusive Offers
              </h2>
            </div>
          </div>
        </div>

        {/* ===================================================
            OFFER CONTENT
        ==================================================== */}

        <div
          className="
            space-y-2.5
            bg-[#eef4f8]
            p-3.5
          "
        >
          {/* =================================================
              OFFER 1 — ₹50 OFF
          ================================================== */}

          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="
              group
              relative
              block
              overflow-hidden
              rounded-xl
              border
              border-[#0047ab]/20

              bg-gradient-to-br
              from-[#0047ab]
              via-[#1e6091]
              to-[#184e77]

              p-3

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            <div className="flex items-center gap-3">
              {/* ICON */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#ffcd38]
                  text-[#0047ab]
                  shadow-sm
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <User className="h-4 w-4" />
              </div>

              {/* CONTENT */}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className="
                      text-[14px]
                      font-extrabold
                      leading-5
                      !text-[var(--text-primary)]
                    "
                  >
                    ₹50 OFF
                  </h3>

                  <span
                    className="
                      rounded-full
                      bg-[#ffcd38]
                      px-1.5
                      py-0.5
                      text-[8px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-[#0d1b2a]
                    "
                  >
                    NEW USER
                  </span>
                </div>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    leading-[16px]
                    text-white/85
                  "
                >
                  On your first 3 bookings
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-bold
                    text-[#ffcd38]
                  "
                >
                  Coupon : SBSNEW50
                </p>
              </div>
            </div>
          </Link>

          {/* =================================================
              OFFER 2 — ₹20 OFF
          ================================================== */}

          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="
              group
              relative
              block
              overflow-hidden
              rounded-xl
              border
              border-[#e5b91f]

              bg-[#ffcd38]

              p-3

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            <div className="flex items-center gap-3">
              {/* ICON */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0047ab]
                  text-[#ffcd38]
                  shadow-sm
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <CarFront className="h-4 w-4" />
              </div>

              {/* CONTENT */}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className="
                      text-[14px]
                      font-extrabold
                      leading-5
                      text-[#0d1b2a]
                    "
                  >
                    ₹20 OFF
                  </h3>

                  <span
                    className="
                      rounded-full
                      bg-[#0047ab]
                      px-1.5
                      py-0.5
                      text-[8px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-white
                    "
                  >
                    REGULAR
                  </span>
                </div>

                <p
                  className="
                    mt-0.5
                    whitespace-pre-line
                    text-[11px]
                    leading-[16px]
                    text-[#0d1b2a]/70
                  "
                >
                  On Every Booking
                  {"\n"}
                  After First 3 Bookings
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-bold
                    text-[#0047ab]
                  "
                >
                  Coupon : SBSREGULAR20
                </p>
              </div>
            </div>
          </Link>

          {/* =================================================
              OFFER 3 — 10% OFF
          ================================================== */}

          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="
              group
              relative
              block
              overflow-hidden
              rounded-xl
              border
              border-[#c5d5e2]

              bg-gradient-to-b
              from-[#eef4f8]
              to-[#d6e2ec]

              p-3

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            <div className="flex items-center gap-3">
              {/* ICON */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1d3557]
                  text-[#ffcd38]
                  shadow-sm
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <BriefcaseBusiness className="h-4 w-4" />
              </div>

              {/* CONTENT */}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className="
                      text-[14px]
                      font-extrabold
                      leading-5
                      text-[#0d1b2a]
                    "
                  >
                    10% OFF
                  </h3>

                  <span
                    className="
                      rounded-full
                      bg-[#1d3557]
                      px-1.5
                      py-0.5
                      text-[8px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-white
                    "
                  >
                    WEEKEND
                  </span>
                </div>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    leading-[16px]
                    text-[#0d1b2a]/70
                  "
                >
                  On Outstation Trips (Round Trip)
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-bold
                    text-[#0047ab]
                  "
                >
                  Coupon : SBSWEEKEND10
                </p>
              </div>
            </div>
          </Link>

         

          {/* =================================================
              BOOK BUTTON
          ================================================== */}

          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl

              bg-[#ffcd38]

              px-4
              py-2.5

              text-[12px]
              font-extrabold
              text-[#0d1b2a]

              shadow-md

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-[#f5c32f]
              hover:shadow-lg
            "
          >
            <CarFront className="h-4 w-4" />

            <span>Book a Ride</span>

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}