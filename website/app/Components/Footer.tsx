"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Clock3,
  Mail,
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0d1d46] text-white">
      {/* =====================================================
          MOBILE FOOTER
      ====================================================== */}
      <div className="block px-6 py-12 sm:px-8 lg:hidden">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-[#0753b8]">
            <Logo />
          </div>

          <div>
            <h2 className="font-serif text-[20px] font-bold text-white">
              SBS Taxi
            </h2>

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400">
              Safe. Reliable. Anytime.
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-7 max-w-[400px] text-[15px] leading-7 text-blue-200/75">
          Safe, reliable and affordable taxi services available 24/7.
          Your journey is our commitment.
        </p>

        {/* Contact Details */}
        <div className="mt-8 space-y-5">
          {/* Address */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=1%2F166%20Vallalar%20Street%2C%20Municipal%20Colony%20Road%2C%20Erode%2C%20Tamil%20Nadu%20638004"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 text-[15px] leading-6 text-blue-200/80 transition hover:text-[#FFC107]"
          >
            <MapPin
              size={19}
              className="mt-0.5 shrink-0 text-[#6ea8ff]"
            />

            <span>
              1/166, Vallalar Street,
              <br />
              Municipal Colony Road,
              <br />
              Erode, Tamil Nadu - 638004
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+918144065688"
            className="flex items-center gap-4 text-[15px] text-blue-200/80 transition hover:text-[#FFC107]"
          >
            <Phone
              size={18}
              className="shrink-0 text-[#6ea8ff]"
            />

            <span>+91 81440 65688</span>
          </a>

          {/* Email */}
          <a
            href="mailto:info@sbstaxi.in"
            className="flex items-center gap-4 text-[15px] text-blue-200/80 transition hover:text-[#FFC107]"
          >
            <Mail
              size={18}
              className="shrink-0 text-[#6ea8ff]"
            />

            <span>info@sbstaxi.in</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918144065688"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-[15px] text-blue-200/80 transition hover:text-[#FFC107]"
          >
            <MessageCircle
              size={19}
              className="shrink-0 text-[#6ea8ff]"
            />

            <span>WhatsApp Support</span>
          </a>

          {/* Working Hours */}
          <div className="flex items-start gap-4 text-[15px] text-blue-200/80">
            <Clock3
              size={19}
              className="mt-0.5 shrink-0 text-[#6ea8ff]"
            />

            <div>
              <p>Mon - Sun: 24/7</p>
              <p className="mt-1 text-blue-200/60">
                Available anytime for your journey
              </p>
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <Link
          href="/booking"
          className="
            mt-9
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-blue-500/60
            px-7
            py-3.5
            text-sm
            font-bold
            text-white
            transition-all
            duration-200
            hover:border-[#FFC107]
            hover:bg-[#FFC107]
            hover:text-black
          "
        >
          Book Your Ride
          <ArrowUpRight size={17} />
        </Link>

        {/* Mobile Trust */}
        <div className="mt-9 flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white/5
            "
          >
            <ShieldCheck
              size={19}
              className="text-[#FFC107]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Safe & Reliable
            </p>

            <p className="mt-0.5 text-xs text-blue-200/55">
              Trusted taxi service
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP FOOTER
      ====================================================== */}
      <div className="hidden lg:block">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-14
            sm:px-6
            lg:px-8
          "
        >
          <div className="grid grid-cols-4 gap-10">
            {/* =================================================
                COLUMN 1 — COMPANY
            ================================================== */}
            <div>
              <Logo />

              <p
                className="
                  mt-5
                  max-w-[300px]
                  text-sm
                  leading-7
                  text-blue-200/70
                "
              >
                Safe, reliable and affordable taxi services available
                24/7. Your journey is our commitment.
              </p>

              {/* Trust badges */}
              <div className="mt-7 space-y-4">
                {/* Safe */}
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-white/5
                    "
                  >
                    <ShieldCheck
                      size={19}
                      className="text-[#FFC107]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Safe & Reliable
                    </p>

                    <p className="mt-0.5 text-xs text-blue-200/60">
                      Trusted taxi service
                    </p>
                  </div>
                </div>

                {/* 24/7 */}
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-white/5
                    "
                  >
                    <Clock3
                      size={19}
                      className="text-[#FFC107]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Available 24/7
                    </p>

                    <p className="mt-0.5 text-xs text-blue-200/60">
                      Book your ride anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                COLUMN 2 — EXPLORE
            ================================================== */}
            <div>
              <h3
                className="
                  mb-6
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#FFC107]
                "
              >
                Explore
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Us" },
                  { href: "/services", label: "Services" },
                  { href: "/fleet", label: "Our Fleet" },
                  { href: "/pricing", label: "Pricing" },
                  {
                    href: "/destinations",
                    label: "Destinations",
                  },
                  { href: "/offers", label: "Offers" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-blue-200/75
                      transition-colors
                      duration-200
                      hover:text-white
                    "
                  >
                    <span>{item.label}</span>

                    <ArrowUpRight
                      size={14}
                      className="
                        -translate-x-1
                        opacity-0
                        transition-all
                        duration-200
                        group-hover:translate-x-0
                        group-hover:opacity-100
                        group-hover:text-[#FFC107]
                      "
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* =================================================
                COLUMN 3 — SERVICES
            ================================================== */}
            <div>
              <h3
                className="
                  mb-6
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#FFC107]
                "
              >
                Services
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  "Local City Rides",
                  "Airport Transfers",
                  "Outstation Trips",
                  "One Way Trips",
                  "Round Trips",
                  "Corporate Trips",
                ].map((service) => (
                  <Link
                    key={service}
                    href="/services"
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-blue-200/75
                      transition-colors
                      duration-200
                      hover:text-white
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-[#FFC107]
                      "
                    />

                    <span>{service}</span>
                  </Link>
                ))}
              </div>

              <Link
                href="/booking"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#FFC107]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-slate-950
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#ffca28]
                "
              >
                Book Your Ride

                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* =================================================
                COLUMN 4 — LOCATION
            ================================================== */}
            <div>
              <h3
                className="
                  mb-6
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#FFC107]
                "
              >
                Location
              </h3>

              {/* Google Map */}
              <div
                className="
                  relative
                  h-[210px]
                  w-full
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-slate-800
                "
              >
                <iframe
                  title="SBS Taxi Office Location"
                  src="https://www.google.com/maps?q=1%2F166%20Vallalar%20Street%2C%20Municipal%20Colony%20Road%2C%20Erode%2C%20Tamil%20Nadu%20638004&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <a
                  href="https://www.google.com/maps/search/?api=1&query=1%2F166%20Vallalar%20Street%2C%20Municipal%20Colony%20Road%2C%20Erode%2C%20Tamil%20Nadu%20638004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    absolute
                    left-3
                    top-3
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-md
                    bg-white
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-[#1a73e8]
                    shadow-md
                  "
                >
                  Open in Maps
                  <ArrowUpRight size={13} />
                </a>
              </div>

              {/* Address */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=1%2F166%20Vallalar%20Street%2C%20Municipal%20Colony%20Road%2C%20Erode%2C%20Tamil%20Nadu%20638004"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-5
                  flex
                  items-start
                  gap-2.5
                  text-sm
                  leading-6
                  text-blue-200/75
                  hover:text-[#FFC107]
                "
              >
                <MapPin
                  size={17}
                  className="mt-1 shrink-0 text-[#FFC107]"
                />

                <span>
                  1/166, Vallalar Street,
                  <br />
                  Municipal Colony Road,
                  <br />
                  Erode, Tamil Nadu - 638004
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+919843544844"
                className="
                  mt-4
                  flex
                  items-center
                  gap-2.5
                  text-sm
                  text-blue-200/75
                  hover:text-[#FFC107]
                "
              >
                <Phone
                  size={15}
                  className="text-[#FFC107]"
                />
                +91 9843544844
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919843544844"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-3
                  flex
                  items-center
                  gap-2.5
                  text-sm
                  text-blue-200/75
                  hover:text-[#FFC107]
                "
              >
                <MessageCircle
                  size={16}
                  className="text-[#FFC107]"
                />
                WhatsApp Support
              </a>
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
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-4
            px-4
            py-5
            text-xs
            sm:flex-row
            sm:px-6
            lg:px-8
          "
        >
          {/* Made in India */}
          <div className="flex items-center gap-2 text-blue-200/50">
            <span>Made in India</span>

            <Image
              src="/flag.jpg"
              alt="Indian Flag"
              width={24}
              height={16}
              className="h-4 w-6 rounded-sm object-cover"
            />
          </div>

          {/* Copyright */}
          <p className="text-center text-blue-200/50">
            © {new Date().getFullYear()} SBS Taxi. All rights reserved.
          </p>

          {/* Powered by */}
          <a
            href="https://sbstechnologies.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-medium
              text-blue-200/60
              hover:text-[#FFC107]
            "
          >
            Powered by SBS Technologies
          </a>
        </div>
      </div>
    </footer>
  );
}