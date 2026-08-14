"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag,User, CarFront,Sparkles, BriefcaseBusiness,ArrowRight, X, Percent,Star } from "lucide-react";

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
        <div className="space-y-2.5 !bg-[var(--primary)] p-3.5">
          
         

          {/* OFFER 1: ₹50 OFF */}
          <Link
  href="/offers"
  onClick={() => setOpen(false)}
  className="
    block
    rounded-xl
    border
    border-[#d8e5f2]
    bg-white
    p-3
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:border-[#0047ab]/30
    hover:shadow-md
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
        bg-[var(--primary)]
        text-[var(--secondary)]
        shadow-sm
      "
    >
      <User className="h-4 w-4" />
    </div>

    {/* CONTENT */}
    <div className="min-w-0 flex-1 ">
      
      <div className="flex items-center   gap-2">
        <h3
          className="
            text-[14px]
            font-bold
            leading-5
            text-[#0047ab]
          "
        >
          ₹50 OFF
        </h3>

        <span
          className="
            rounded-full
            bg-[var(--primary)]
            px-1.5
            py-0.5
            text-[8px]
            font-bold
            uppercase
            tracking-wide
            !text-[var(--text-primary)]
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
          text-slate-600
        "
      >
        On your first 3 bookings
      </p>

      <p
        className="
          mt-1
          text-[10px]
          font-semibold
          text-[#0047ab]
        "
      >
        Coupon : SBSNEW50
      </p>
    </div>
  </div>
</Link>


          {/* OFFER 2: ₹20 OFF */}
        <Link
  href="/offers"
  onClick={() => setOpen(false)}
  className="
    block
    rounded-xl
    border
    border-[#d8e5f2]
    bg-white
    p-3
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:border-[#0047ab]/30
    hover:shadow-md
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
        bg-[var(--primary)]
        text-[var(--secondary)]
        shadow-sm
      "
    >
      <CarFront className="h-4 w-4" />
    </div>

    {/* CONTENT */}
    <div className="min-w-0 flex-1">
      
      <div className="flex items-center bg[var(--primary)] gap-2">
        <h3
          className="
            text-[14px]
            font-bold
            leading-5
            text-[#0047ab]
          "
        >
          ₹20 OFF
        </h3>

        <span
          className="
            rounded-full
            bg-[var(--primary)]
            px-1.5
            py-0.5
            text-[8px]
            font-bold
            uppercase
            tracking-wide
            !text-[var(--text-primary)]
          "
        >
          REGULAR OFFER
        </span>
      </div>

      <p
        className="
          mt-0.5
          text-[11px]
          leading-[16px]
          text-slate-600
        "
      >
       On Every Booking
After First 3 Bookings
      </p>

      <p
        className="
          mt-1
          text-[10px]
          font-semibold
          text-[#0047ab]
        "
      >
        Coupon : SBSREGULAR20
      </p>
    </div>
  </div>
</Link>


          <Link
  href="/offers"
  onClick={() => setOpen(false)}
  className="
    block
    rounded-xl
    border
    border-[#d8e5f2]
    bg-white
    p-3
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:border-[#0047ab]/30
    hover:shadow-md
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
        bg-[var(--primary)]
        text-[var(--secondary)]
        shadow-sm
      "
    >
      <BriefcaseBusiness className="h-4 w-4" />
    </div>

    {/* CONTENT */}
    <div className="min-w-0 flex-1">
      
      <div className="flex items-center bg[var(--primary)] gap-2">
        <h3
          className="
            text-[14px]
            font-bold
            leading-5
            text-[#0047ab]
          "
        >
          ₹10 OFF
        </h3>

        <span
          className="
            rounded-full
            bg-[var(--primary)]
            px-1.5
            py-0.5
            text-[8px]
            font-bold
            uppercase
            tracking-wide
            !text-[var(--text-primary)]
          "
        >
          WEEKEND OFFER
        </span>
      </div>

      <p
        className="
          mt-0.5
          text-[11px]
          leading-[16px]
          text-slate-600
        "
      >
        On Outstation Trips (Round Trip)

      </p>

      <p
        className="
          mt-1
          text-[10px]
          font-semibold
          text-[#0047ab]
        "
      >
        Coupon : SBSWEEKEND10
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