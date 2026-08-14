"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="h-full font-[family-name:var(--font-jakarta)]">
      {/* =========================================================
          HEADING
      ========================================================== */}
      <div className="mb-8">
        <span
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-[var(--secondary)]
          "
        >
          Contact Us
        </span>

        <h2
          className="
            mt-3
            font-[family-name:var(--font-instrument)]
            text-3xl
            font-normal
            tracking-tight
            text-[var(--text)]
            sm:text-4xl
          "
        >
          We’re Here to Help
        </h2>

        <p
          className="
            mt-3
            max-w-xl
            text-sm
            leading-6
            text-[var(--muted)]
            sm:text-base
          "
        >
          Have a question, need a ride, or want to know more about our
          services? Get in touch with the SBS Taxi team anytime.
        </p>
      </div>

      {/* =========================================================
          ADDRESS
      ========================================================== */}
      <div className="mb-8">
        <p
          className="
            mb-4
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-[var(--secondary)]
          "
        >
          Address
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=1%2F166%20Vallalar%20Street%2C%20Municipal%20Colony%20Main%20Road%2C%20Erode%2C%20Tamil%20Nadu%20638004"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-start
            gap-4
            transition-colors
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
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--primary)]
              text-[var(--secondary)]
              transition-all
              duration-300
              group-hover:border-[var(--primary-dark)]
              group-hover:scale-105
            "
          >
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <p
              className="
                text-base
                font-semibold
                text-[var(--text)]
              "
            >
              SBS Taxi
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-[var(--muted)]
              "
            >
              1/166, Vallalar Street,
              <br />
              Municipal Colony Main Road,
              <br />
              Erode, Tamil Nadu – 638004
            </p>

            <p
              className="
                mt-2
                text-xs
                font-semibold
                text-[var(--primary)]
              "
            >
              View on Google Maps →
            </p>
          </div>
        </a>
      </div>

      {/* =========================================================
          CONTACT
      ========================================================== */}
      <div className="mb-8">
        <p
          className="
            mb-4
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-[var(--secondary)]
          "
        >
          Contact
        </p>

        <div className="space-y-4">
          {/* ================= PHONE ================= */}
          <a
            href="tel:+919843544844"
            className="
              group
              flex
              items-center
              gap-4
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
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--primary)]
                text-[var(--secondary)]
                transition-all
                duration-300
                group-hover:border-[var(--primary)]
                group-hover:scale-105
              "
            >
              <Phone className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
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
                  text-[var(--primary)]
                "
              >
                +91 98435 44844
              </p>
            </div>

            <ArrowUpRight
              className="
                ml-auto
                h-4
                w-4
                text-[var(--muted)]
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                group-hover:text-[var(--primary-dark)]
                group-hover:opacity-100
              "
            />
          </a>

          {/* ================= WHATSAPP ================= */}
          <a
            href="https://wa.me/919843544844"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              gap-4
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
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--primary)]
                text-[var(--secondary)]
                transition-all
                duration-300
                group-hover:border-[var(--primary-dark)]
                group-hover:scale-105
              "
            >
              <MessageCircle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
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
                  text-[var(--primary)]
                "
              >
                +91 98435 44844
              </p>
            </div>

            <ArrowUpRight
              className="
                ml-auto
                h-4
                w-4
                text-[var(--muted)]
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                group-hover:text-[var(--primary)]
                group-hover:opacity-100
              "
            />
          </a>

          {/* ================= EMAIL ================= */}
          <a
            href="mailto:hr@sbstechnologies.in"
            className="
              group
              flex
              items-center
              gap-4
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
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--primary)]
                text-[var(--secondary)]
                transition-all
                duration-300
                group-hover:border-[var(--primary)]
                group-hover:scale-105
              "
            >
              <Mail className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
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
                  text-[var(--primary)]
                  sm:text-base
                "
              >
                hr@sbstechnologies.in
              </p>
            </div>

            <ArrowUpRight
              className="
                ml-auto
                h-4
                w-4
                shrink-0
                text-[var(--muted)]
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                group-hover:text-[var(--primary)]
                group-hover:opacity-100
              "
            />
          </a>
        </div>
      </div>

      {/* =========================================================
          SERVICE HOURS
      ========================================================== */}
      <div className="mb-8">
        <p
          className="
            mb-4
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-[var(--secondary)]
          "
        >
          Service Availability
        </p>

        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--primary)]
              text-[var(--secondary)]
            "
          >
            <Clock3 className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-sm text-[var(--muted)]">
                Customer Support
              </span>

              <span
                className="
                  text-sm
                  font-bold
                  text-[var(--primary)]
                "
              >
                24/7
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-8">
              <span className="text-sm text-[var(--muted)]">
                Taxi Booking
              </span>

              <span
                className="
                  text-sm
                  font-bold
                  text-[var(--primary)]
                "
              >
                Available Anytime
              </span>
            </div>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-[var(--muted)]
              "
            >
              We’re available to assist you with bookings,
              enquiries and travel support whenever you need us.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          QUICK ACCESS
      ========================================================== */}
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-x-5
          gap-y-2
          border-t
          border-[var(--border)]
          pt-5
        "
      >
        <span
          className="
            text-xs
            font-medium
            text-[var(--muted)]
          "
        >
          Quick access:
        </span>

        <Link
          href="/booking"
          className="
            text-xs
            font-semibold
            text-[var(--text)]
            transition-colors
            hover:text-[var(--primary)]
          "
        >
          Book a Ride
        </Link>

        <Link
          href="/services"
          className="
            text-xs
            font-semibold
            text-[var(--text)]
            transition-colors
            hover:text-[var(--primary)]
          "
        >
          Services
        </Link>

        <Link
          href="/pricing"
          className="
            text-xs
            font-semibold
            text-[var(--text)]
            transition-colors
            hover:text-[var(--primary)]
          "
        >
          Pricing
        </Link>

        <Link
          href="/fleet"
          className="
            text-xs
            font-semibold
            text-[var(--text)]
            transition-colors
            hover:text-[var(--primary)]
          "
        >
          Fleet
        </Link>
      </div>
    </section>
  );
}