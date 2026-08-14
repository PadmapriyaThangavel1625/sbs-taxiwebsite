
"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="h-full font-[family-name:var(--font-jakarta)]">
      {/* =========================
          Heading
      ========================== */}
      <div className="mb-6">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-[var(--primary-light)]
            px-3
            py-1
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-[var(--secondary)]
          "
        >
          Contact Us
        </span>

        <h2
          className="
            mt-3
            font-[family-name:var(--font-instrument)]
            text-2xl
            font-normal
            tracking-tight
            text-[var(--text)]
            sm:text-3xl
          "
        >
          Get in Touch
        </h2>

        <p
          className="
            mt-2
            max-w-lg
            text-sm
            leading-6
            text-[var(--muted)]
          "
        >
          Have a question or need a ride? Our team is available to help you
          with bookings, enquiries and support.
        </p>
      </div>

      {/* =========================
          Contact Cards
      ========================== */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
        "
      >
        {/* =========================
            Call Us
        ========================== */}
        <a
          href="tel:+919843544844"
          className="
            group
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
            p-4
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[var(--primary)]
            hover:shadow-lg
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--primary-light)]
              text-[var(--secondary)]
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <Phone className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[var(--muted)]
                "
              >
                Call Us
              </p>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  shrink-0
                  text-[var(--secondary)]
                  opacity-0
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
                mt-1
                text-sm
                font-bold
                text-[var(--text)]
                sm:text-base
              "
            >
              +91 9843544844
            </p>

            <p
              className="
                mt-1
                text-xs
                text-[var(--muted)]
              "
            >
              Available 24/7
            </p>
          </div>
        </a>

        {/* =========================
            WhatsApp
        ========================== */}
        <a
          href="https://wa.me/919843544844"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
            p-4
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[var(--primary)]
            hover:shadow-lg
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--primary-light)]
              !text-[var(--secondary)]
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <MessageCircle className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[var(--muted)]
                "
              >
                WhatsApp
              </p>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  shrink-0
                  text-[var(--muted)]
                  opacity-0
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
                mt-1
                text-sm
                font-bold
                text-[var(--text)]
                sm:text-base
              "
            >
              +91 9843544844
            </p>

            <p
              className="
                mt-1
                text-xs
                text-[var(--muted)]
              "
            >
              Chat with us
            </p>
          </div>
        </a>

        {/* =========================
            Email
            Full Width
        ========================== */}
        <a
          href="mailto:hr@sbstechnologies.in"
          className="
            group
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
            p-4
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[var(--primary)]
            hover:shadow-lg
            sm:col-span-2
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--primary-light)]
              text-[var(--secondary)]
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <Mail className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[var(--muted)]
                "
              >
                Email Us
              </p>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  text-[var(--muted)]
                  opacity-0
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
                mt-1
                break-all
                text-sm
                font-bold
                text-[var(--primary)]
              "
            >
              hr@sbstechnologies.in
            </p>

            <p
              className="
                mt-1
                text-xs
                text-[var(--muted)]
              "
            >
              Send us your enquiry anytime
            </p>
          </div>
        </a>

        {/* =========================
            Visit Us
            Full Width
        ========================== */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=1%2F166%20Vallalar%20Street%2C%20Municipal%20Colony%20Main%20Road%2C%20Erode%2C%20Tamil%20Nadu%20638004"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-[var(--border)]
            bg-white
            p-4
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[var(--primary)]
            hover:shadow-lg
            sm:col-span-2
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--primary-light)]
              text-[var(--secondary)]
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <MapPin className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[var(--muted)]
                "
              >
                Visit Us
              </p>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  text-[var(--muted)]
                  opacity-0
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
                mt-1
                text-sm
                font-bold
                leading-5
                text-[var(--text)]
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
              View location on Google Maps →
            </p>
          </div>
        </a>
      </div>

      {/* =========================
          Internal Navigation
      ========================== */}
      <div
        className="
          mt-6
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
