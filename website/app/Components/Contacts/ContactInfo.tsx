"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock3,
  ArrowUpRight,
  Navigation,
  CheckCircle2,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="w-full font-[family-name:var(--font-jakarta)]">
     

      {/* =========================================================
          ADDRESS
      ========================================================== */}
      <div className="mb-5 sm:mb-6">
        <p
          className="
            mb-2.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[var(--secondary)]
            sm:text-[11px]
          "
        >
          Our Office
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=1%2F166%20Vallalar%20Street%2C%20Municipal%20Colony%20Main%20Road%2C%20Erode%2C%20Tamil%20Nadu%20638004"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            block
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
            p-3.5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[var(--primary)]/30
            hover:shadow-md
            sm:p-4
          "
        >
          <div className="flex items-start gap-3 sm:gap-3.5">
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
                bg-[var(--primary)]
                text-[var(--secondary)]
                transition-transform
                duration-300
                group-hover:scale-105
                sm:h-11
                sm:w-11
              "
            >
              <MapPin className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p
                    className="
                      text-base
                      font-bold
                      leading-tight
                      text-[var(--text)]
                      sm:text-lg
                    "
                  >
                    SBS Taxi
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      font-medium
                      text-[var(--muted)]
                    "
                  >
                    Erode, Tamil Nadu
                  </p>
                </div>

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-[var(--muted)]
                    opacity-60
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[var(--primary)]
                    group-hover:opacity-100
                  "
                />
              </div>

              <p
                className="
                  mt-2
                  text-[12px]
                  leading-5
                  text-[var(--muted)]
                  sm:text-sm
                  sm:leading-5
                "
              >
                1/166, Vallalar Street, Municipal Colony Main Road, Erode,
                Tamil Nadu – 638004
              </p>

              <div
                className="
                  mt-2
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  font-bold
                  text-[var(--primary)]
                "
              >
                <Navigation className="h-3.5 w-3.5" />
                View on Google Maps
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* =========================================================
          CONTACT DETAILS
      ========================================================== */}
      <div className="mb-5 sm:mb-6">
        <div className="mb-2.5 flex items-center justify-between">
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[var(--secondary)]
              sm:text-[11px]
            "
          >
            Contact Details
          </p>

          <span
            className="
              hidden
              text-[11px]
              font-medium
              text-[var(--muted)]
              sm:block
            "
          >
            We're here to help
          </span>
        </div>

        <div
          className="
            divide-y
            divide-[var(--border)]
            overflow-hidden
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
            shadow-sm
          "
        >
          {/* PHONE */}
          <a
            href="tel:+919843544844"
            className="
              group
              flex
              items-center
              gap-3
              p-3.5
              transition-colors
              duration-200
              hover:bg-[var(--primary)]/[0.03]
              sm:gap-3.5
              sm:p-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]/10
                text-[var(--primary)]
                transition-all
                duration-300
                group-hover:bg-[var(--primary)]
                group-hover:text-[var(--secondary)]
                sm:h-10
                sm:w-10
              "
            >
              <Phone className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--muted)]
                "
              >
                Customer Care
              </p>

              <p
                className="
                  mt-0.5
                  text-base
                  font-bold
                  leading-tight
                  text-[var(--text)]
                  sm:text-lg
                "
              >
                +91 98435 44844
              </p>
            </div>

            <span
              className="
                hidden
                rounded-lg
                bg-[var(--primary)]/5
                px-2
                py-1
                text-[9px]
                font-bold
                text-[var(--primary)]
                sm:block
              "
            >
              CALL
            </span>

            <ArrowUpRight
              className="
                h-4
                w-4
                shrink-0
                text-[var(--muted)]
                transition-all
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-[var(--primary)]
              "
            />
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/919843544844"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              gap-3
              p-3.5
              transition-colors
              duration-200
              hover:bg-[var(--primary)]/[0.03]
              sm:gap-3.5
              sm:p-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]/10
                text-[var(--primary)]
                transition-all
                duration-300
                group-hover:bg-[var(--primary)]
                group-hover:text-[var(--secondary)]
              "
            >
              <MessageCircle className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--muted)]
                "
              >
                WhatsApp
              </p>

              <p
                className="
                  mt-0.5
                  text-base
                  font-bold
                  leading-tight
                  text-[var(--text)]
                  sm:text-lg
                "
              >
                +91 98435 44844
              </p>
            </div>

            <span
              className="
                hidden
                rounded-lg
                bg-[var(--primary)]/5
                px-2
                py-1
                text-[9px]
                font-bold
                text-[var(--primary)]
                sm:block
              "
            >
              CHAT
            </span>

            <ArrowUpRight
              className="
                h-4
                w-4
                shrink-0
                text-[var(--muted)]
                transition-all
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-[var(--primary)]
              "
            />
          </a>

          {/* EMAIL */}
          <a
            href="mailto:hr@sbstechnologies.in"
            className="
              group
              flex
              items-center
              gap-3
              p-3.5
              transition-colors
              duration-200
              hover:bg-[var(--primary)]/[0.03]
              sm:gap-3.5
              sm:p-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]/10
                text-[var(--primary)]
                transition-all
                duration-300
                group-hover:bg-[var(--primary)]
                group-hover:text-[var(--secondary)]
              "
            >
              <Mail className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--muted)]
                "
              >
                Email
              </p>

              <p
                className="
                  mt-0.5
                  break-all
                  text-sm
                  font-bold
                  leading-5
                  text-[var(--text)]
                  sm:text-base
                "
              >
                hr@sbstechnologies.in
              </p>
            </div>

            <ArrowUpRight
              className="
                h-4
                w-4
                shrink-0
                text-[var(--muted)]
                transition-all
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-[var(--primary)]
              "
            />
          </a>
        </div>
      </div>

      {/* =========================================================
          SERVICE AVAILABILITY
      ========================================================== */}
      <div className="mb-5 sm:mb-6">
        <p
          className="
            mb-2.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[var(--secondary)]
            sm:text-[11px]
          "
        >
          Service Availability
        </p>

        <div
          className="
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--primary)]/[0.035]
            p-3.5
            sm:p-4
          "
        >
          {/* STATUS */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]
                text-[var(--secondary)]
              "
            >
              <Clock3 className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className="
                    text-sm
                    font-bold
                    text-[var(--text)]
                    sm:text-base
                  "
                >
                  Available 24/7
                </p>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    bg-green-500/10
                    px-2
                    py-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-green-600
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Online
                </span>
              </div>

              <p
                className="
                  mt-0.5
                  text-xs
                  leading-5
                  text-[var(--muted)]
                "
              >
                Customer support and taxi bookings are available anytime.
              </p>
            </div>
          </div>

          {/* SERVICE ROWS */}
          <div
            className="
              mt-3
              grid
              grid-cols-1
              gap-2
              border-t
              border-[var(--border)]
              pt-3
              sm:grid-cols-2
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-3
                py-2
              "
            >
              <CheckCircle2
                className="
                  h-4
                  w-4
                  shrink-0
                  text-[var(--primary)]
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  text-[var(--text)]
                "
              >
                Customer Support
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-3
                py-2
              "
            >
              <CheckCircle2
                className="
                  h-4
                  w-4
                  shrink-0
                  text-[var(--primary)]
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  text-[var(--text)]
                "
              >
                Taxi Booking
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          QUICK ACCESS
      ========================================================== */}
      <div
        className="
          border-t
          border-[var(--border)]
          pt-4
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2.5
            sm:flex-row
            sm:flex-wrap
            sm:items-center
          "
        >
          <span
            className="
              text-xs
              font-semibold
              text-[var(--muted)]
            "
          >
            Quick access
          </span>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/booking"
              className="
                rounded-full
                border
                border-[var(--border)]
                bg-white
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-[var(--text)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                hover:shadow-sm
              "
            >
              Book a Ride
            </Link>

            <Link
              href="/services"
              className="
                rounded-full
                border
                border-[var(--border)]
                bg-white
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-[var(--text)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                hover:shadow-sm
              "
            >
              Services
            </Link>

            <Link
              href="/pricing"
              className="
                rounded-full
                border
                border-[var(--border)]
                bg-white
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-[var(--text)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                hover:shadow-sm
              "
            >
              Pricing
            </Link>

            <Link
              href="/fleet"
              className="
                rounded-full
                border
                border-[var(--border)]
                bg-white
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-[var(--text)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                hover:shadow-sm
              "
            >
              Fleet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}