"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Clock3,
  Mail,
} from "lucide-react";
import Logo from "@/app/Components/Logo";

/* =====================================================
   SOCIAL MEDIA LINKS
===================================================== */

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/YOUR_FACEBOOK_ID",
    mark: "f",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/YOUR_INSTAGRAM_ID",
    mark: "◎",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/YOUR_LINKEDIN_ID",
    mark: "in",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@YOUR_YOUTUBE_ID",
    mark: "▶",
  },
];

/* =====================================================
   NAVIGATION
===================================================== */

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/pricing", label: "Pricing" },
  { href: "/destinations", label: "Destinations" },
  { href: "/offers", label: "Offers" },
  { href: "/contacts", label: "Contact Us" },
];

const services = [
  "Local City Rides",
  "Airport Transfers",
  "Outstation Trips",
  "One Way Trips",
  "Round Trips",
  "Corporate Trips",
];

/* =====================================================
   FOOTER
===================================================== */

export default function Footer() {
  return (
    <footer
      className="
        bg-[var(--primary)]
        pb-16
        font-[var(--font-jakarta)]
        text-white
        md:pb-0
      "
    >
      {/* =================================================
          MAIN FOOTER
      ================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">

          {/* =================================================
              COLUMN 1 — COMPANY
          ================================================== */}

          <div className="lg:col-span-3">
            <Logo variant="footer" />

            <p className="mt-6 max-w-[300px] text-[15px] leading-7 text-blue-100/80 lg:text-sm">
              Comfortable rides, professional drivers, and transparent fares
              for every journey. Travel with confidence wherever the road
              takes you.
            </p>

            {/* Trust Items */}
            <div className="mt-7 space-y-4">

              {/* Safe & Reliable */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-lg bg-white/10
                  "
                >
                  <ShieldCheck
                    size={19}
                    strokeWidth={2}
                    className="text-[var(--secondary)]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Safe & Reliable
                  </p>

                  <p className="mt-0.5 text-xs text-blue-100/60">
                    Trusted taxi service
                  </p>
                </div>
              </div>

              {/* Available 24/7 */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-lg bg-white/10
                  "
                >
                  <Clock3
                    size={19}
                    strokeWidth={2}
                    className="text-[var(--secondary)]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Available 24/7
                  </p>

                  <p className="mt-0.5 text-xs text-blue-100/60">
                    Book your ride anytime
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* =================================================
              COLUMN 2 — SERVICES
          ================================================== */}

          <div className="lg:col-span-3">

            <h3
              className="
                !mb-4
                !font-var(--font-instrument)
                text-lg
                !font-semibold
                uppercase
                tracking-[0.2em]
                !text-[var(--secondary)]
              "
            >
              Services
            </h3>
            
            <nav
              aria-label="Services"
              className="flex flex-col gap-4"
            >
              {services.map((service) => (
                <Link
                  key={service}
                  href="/services"
                  className="
                    group flex items-center gap-3
                    text-sm text-blue-100/75
                    transition-colors duration-200
                    hover:text-white
                  "
                >
                  <span
                    className="
                      h-1.5 w-1.5 shrink-0
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />

                  <span>{service}</span>
                </Link>
              ))}
            </nav>

            {/* Booking Button */}
            <Link
              href="/booking"
              className="
                mt-8 inline-flex items-center gap-2
                rounded-lg
                bg-[var(--secondary)]
                px-5 py-3
                text-sm font-bold
                text-black
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--secondary-dark)]
                hover:shadow-md
              "
            >
              <span className="text-black">
                Book a Ride
              </span>

              <ArrowUpRight
                size={16}
                className="text-black"
              />
            </Link>

          </div>

          {/* =================================================
              COLUMN 3 — SITE MAP
          ================================================== */}

          <div className="lg:col-span-2">

            <h3
              className="
                !mb-4
                font-!var(--font-instrument)
                text-lg
                !font-semibold
                uppercase
                tracking-[0.2em]
                !text-[var(--secondary)]
              "
            >
              Site Map
            </h3>

            <nav
              aria-label="Explore"
              className="flex flex-col gap-4"
            >
              {exploreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group flex items-center gap-2
                    text-sm text-blue-100/75
                    transition-colors duration-200
                    hover:text-white
                  "
                >
                  <span>{item.label}</span>

                  <ArrowUpRight
                    size={14}
                    className="
                      -translate-x-1 opacity-0
                      transition-all duration-200
                      group-hover:translate-x-0
                      group-hover:opacity-100
                      group-hover:text-[var(--secondary)]
                    "
                  />
                </Link>
              ))}
            </nav>

          </div>

          {/* =================================================
              COLUMN 4 — CONTACT + SOCIAL
          ================================================== */}

          <div className="lg:col-span-4">

            {/* Contact Heading */}
            <h3
              className="
                !mb-4
                !font-!var(--font-instrument)
                text-lg
                !font-semibold
                uppercase
                tracking-[0.2em]
                !text-[var(--secondary)]
              "
            >
              Contact Us
            </h3>

            {/* ADDRESS */}
            <div className="flex items-start gap-3">

              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-lg bg-white/10
                "
              >
                <MapPin
                  size={19}
                  strokeWidth={2}
                  className="text-[var(--secondary)]"
                />
              </div>

              <div className="pt-0.5">
                <p className="mt-0.5 text-xs leading-5 text-white-100/60">
                  1/166, Vallalar Street,
                  <br />
                  Municipal Colony Road,
                  <br />
                  Erode, Tamil Nadu - 638004
                </p>
              </div>

            </div>

            {/* CALL */}
            <a
              href="tel:9843544844"
              aria-label="Call SBS Taxi"
              className="
                group mt-5 flex items-center gap-3
                rounded-lg py-1
                transition-colors duration-200
                hover:bg-white/[0.03]
              "
            >
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-lg bg-white/10
                  transition-colors duration-200
                  group-hover:bg-white/15
                "
              >
                <Phone
                  size={18}
                  strokeWidth={2}
                  className="text-[var(--secondary)]"
                />
              </div>

              <div>
                <p className="mt-0.5 text-xs text-white-100/60">
                  98435 44844
                </p>
              </div>
            </a>

            {/* EMAIL */}
            <a
              href="mailto:hr@sbstechnologies.in"
              aria-label="Email SBS Taxi"
              className="
                group mt-5 flex items-center gap-3
                rounded-lg py-1
                transition-colors duration-200
                hover:bg-white/[0.03]
              "
            >
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-lg bg-white/10
                  transition-colors duration-200
                  group-hover:bg-white/15
                "
              >
                <Mail
                  size={18}
                  strokeWidth={2}
                  className="text-[var(--secondary)]"
                />
              </div>

              <div className="min-w-0">
                <p className="mt-0.5 break-all text-xs text-white-100/60">
                  hr@sbstechnologies.in
                </p>
              </div>
            </a>

            {/* SOCIAL MEDIA */}
            <div className="mt-7">

              <p
                className="
                  mb-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-blue-100/60
                "
              >
                Follow Us
              </p>

              <div className="flex items-center gap-3">

                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow SBS Taxi on ${social.label}`}
                    className="
                      group flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      text-white/80
                      transition-all duration-200
                      hover:-translate-y-1
                      hover:border-[var(--secondary)]
                      hover:bg-[var(--secondary)]
                      hover:text-black
                    "
                  >
                    <span
                      className={
                        social.label === "LinkedIn"
                          ? "text-sm font-extrabold"
                          : social.label === "YouTube"
                          ? "text-sm"
                          : "text-lg font-bold"
                      }
                    >
                      {social.mark}
                    </span>
                  </Link>
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="border-t border-white/10">

        <div
          className="
            mx-auto flex max-w-7xl
            flex-col items-center
            justify-between gap-3
            px-5 py-5
            text-xs
            sm:flex-row sm:px-8
            lg:px-8
          "
        >

          {/* Made in India */}
          <div className="flex items-center gap-2 text-blue-100/50">

            <Image
              src="/flag.jpg"
              alt="Indian Flag"
              width={24}
              height={16}
              className="h-4 w-6 rounded-sm object-cover"
            />

            <span>
              Made in India
            </span>

          </div>

          {/* Copyright */}
          <p className="text-center text-blue-100/50">
            © {new Date().getFullYear()} SBS Taxi.
            All Rights Reserved.
          </p>

          {/* Powered By */}
          <div className="flex items-center gap-1">

            <span className="text-[10px] font-light text-blue-100/50 sm:text-[11px]">
              Powered by
            </span>

            <Link
              href="https://sbstechnologies.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-xs font-medium
                text-blue-100/65
                transition-colors
                hover:text-[var(--secondary)]
                sm:text-sm
              "
            >
              SBS Technologies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}