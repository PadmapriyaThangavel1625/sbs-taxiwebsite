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
import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

/* =====================================================
   FOOTER CONFIG
===================================================== */

const footer = SBS_TAXI_CONFIG.footer;
const contact = SBS_TAXI_CONFIG.contact;
const address = SBS_TAXI_CONFIG.address;
const images = SBS_TAXI_CONFIG.images;

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
        text-[var(--text-primary)]
        md:pb-0
      "
    >
      {/* =================================================
          MAIN FOOTER
      ================================================== */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-10
          sm:px-8
          lg:px-8
          lg:py-14
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-12
            lg:gap-8
          "
        >
          {/* =================================================
              COLUMN 1 — COMPANY
          ================================================== */}

          <div className="lg:col-span-3">
            {/* LOGO */}

            <Link href="/" aria-label={SBS_TAXI_CONFIG.company.name}>
              <Logo variant="footer" />
            </Link>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[300px]
                text-[15px]
                leading-7
                text-[var(--text-third)]
                lg:text-sm
              "
            >
              {footer.description}
            </p>

            {/* TRUST ITEMS */}

            <div className="mt-7 space-y-4">
              {/* SAFE & RELIABLE */}

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
                    bg-[var(--secondary)]
                  "
                >
                  <ShieldCheck
                    size={19}
                    strokeWidth={2}
                    className="text-[var(--primary)]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {footer.trust.safe.title}
                  </p>

                  <p className="mt-0.5 text-xs text-[var(--text-third)]/60">
                    {footer.trust.safe.description}
                  </p>
                </div>
              </div>

              {/* AVAILABLE 24/7 */}

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
                    bg-[var(--secondary)]
                  "
                >
                  <Clock3
                    size={19}
                    strokeWidth={2}
                    className="text-[var(--primary)]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {footer.trust.available.title}
                  </p>

                  <p className="mt-0.5 text-xs text-[var(--text-third)]/60">
                    {footer.trust.available.description}
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
                !font-[var(--font-instrument)]
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
              {footer.serviceLinks.map((service, index) => (
                <Link
                  key={`${service.name}-${service.href}-${index}`}
                  href={service.href}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-[var(--text-primary)]
                    transition-colors
                    duration-200
                    hover:[var(--secondary)]
                  "
                >
                  {/* DOT */}

                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      !text-[var(--text-primary)]
                      bg-[var(--secondary)]
                    "
                  />

                  {/* SERVICE NAME */}

                  <span>{service.name}</span>
                </Link>
              ))}
            </nav>

            {/* BOOKING BUTTON */}

            <Link
              href={SBS_TAXI_CONFIG.booking.href}
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-[var(--secondary)]
                px-5
                py-3
                text-sm
                font-bold
                !text-[var(--text-secondary)]
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--secondary-dark)]
                hover:shadow-md
              "
            >
              <span>
                {SBS_TAXI_CONFIG.booking.name}
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
                !font-[var(--font-instrument)]
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
              {footer.exploreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-[var(--text-primary)]
                    transition-colors
                    duration-200
                    hover:text-[var(--secondary)]
                  "
                >
                  <span>{item.name}</span>

                  <ArrowUpRight
                    size={14}
                    className="
                      -translate-x-1
                      opacity-0
                      transition-all
                      duration-200
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
              COLUMN 4 — CONTACT
          ================================================== */}

          <div className="lg:col-span-4">
            {/* CONTACT HEADING */}

            <h3
              className="
                !mb-4
                !font-[var(--font-instrument)]
                text-lg
                !font-semibold
                uppercase
                tracking-[0.2em]
                !text-[var(--secondary)]
              "
            >
              Contact Us
            </h3>

            {/* =================================================
                ADDRESS
            ================================================== */}

            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[var(--secondary)]
                "
              >
                <MapPin
                  size={19}
                  strokeWidth={2}
                  className="text-[var(--primary)]"
                />
              </div>

              <div className="pt-0.5">
                <p className="text-xs leading-5 text-[var(--text-primary)]">
                  {address.line1}
                  <br />

                  {address.line2}
                  <br />

                  {address.city},{" "}
                  {address.state} -{" "}
                  {address.pincode}
                </p>
              </div>
            </div>

            {/* =================================================
                CUSTOMER CARE
            ================================================== */}

            <a
              href={contact.phoneHref}
              aria-label={`Call ${SBS_TAXI_CONFIG.company.name}`}
              className="
                group
                mt-5
                flex
                items-center
                gap-3
                rounded-lg
                py-1
                transition-colors
                duration-200
                hover:bg-white/[0.03]
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
                  bg-[var(--secondary)]
                  transition-colors
                  duration-200
                  group-hover:bg-[var(--secondary-dark)]
                "
              >
                <Phone
                  size={18}
                  strokeWidth={2}
                  className="text-[var(--primary)]"
                />
              </div>

              <div>
                <p className="text-[11px] text-[var(--text-primary)]">
                  Customer Care
                </p>

                <p className="mt-0.5 text-xs text-[var(--text-primary)]">
                  {contact.customerCare}
                </p>
              </div>
            </a>

            {/* =================================================
                EMAIL
            ================================================== */}

            <a
              href={contact.hrEmailHref}
              aria-label={`Email ${SBS_TAXI_CONFIG.company.name}`}
              className="
                group
                mt-5
                flex
                items-center
                gap-3
                rounded-lg
                py-1
                transition-colors
                duration-200
                hover:bg-white/[0.03]
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
                  bg-[var(--secondary)]
                  transition-colors
                  duration-200
                  group-hover:bg-[var(--secondary-dark)]
                "
              >
                <Mail
                  size={18}
                  strokeWidth={2}
                  className="text-[var(--primary)]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] text-[var(--text-primary)]">
                  Email
                </p>

                <p className="mt-0.5 break-all text-xs text-[var(--text-primary)]">
                  {contact.hrEmail}
                </p>
              </div>
            </a>

            {/* =================================================
                SOCIAL MEDIA
            ================================================== */}

            <div className="mt-7">
              <p
                className="
                  mb-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[var(--text-primary)]
                "
              >
                Follow Us
              </p>

              <div className="flex items-center gap-3">
                {footer.socialLinks.map((social, index) => (
                  <Link
                    key={`${social.label}-${index}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${SBS_TAXI_CONFIG.company.name} on ${social.label}`}
                    className="
                      group
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      text-[var(--text-primary)]
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:border-[var(--secondary)]
                      hover:bg-[var(--secondary-dark)]
                      hover:text-[var(--primary)]
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
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-center
            gap-3
            px-5
            py-5
            text-xs
            sm:px-8
            lg:flex-row
            lg:justify-between
            lg:px-8
          "
        >
          {/* =================================================
              MADE IN INDIA
          ================================================== */}

          <div className="flex items-center gap-2 text-[var(--text-primary)]">
  <Image
    src="/flag.jpg"
    alt="Indian Flag"
    width={24}
    height={16}
    className="h-4 w-6 object-cover"
  />

  <span className="text-xs font-medium sm:text-sm">
    {footer.madeInIndia}
  </span>
</div>

          {/* =================================================
              COPYRIGHT
          ================================================== */}

          <p className="text-center text-xs text-[var(--text-primary)] sm:text-sm">
            © {new Date().getFullYear()}{" "}
            {footer.copyright}
          </p>

          {/* =================================================
              PRIVACY / TERMS / POWERED BY
          ================================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              sm:gap-4
            "
          >
            {/* PRIVACY POLICY */}

            <Link
              href={footer.privacy.href}
              className="
                text-xs
                font-medium
                text-[var(--text-primary)]
                transition-colors
                duration-200
                hover:text-[var(--secondary)]
                sm:text-sm
              "
            >
              {footer.privacy.name}
            </Link>

            {/* DIVIDER */}

            <span className="h-4 w-px bg-white/15" />

            {/* TERMS */}

            <Link
              href={footer.terms.href}
              className="
                text-xs
                font-medium
                text-[var(--text-primary)]
                transition-colors
                duration-200
                hover:text-[var(--secondary)]
                sm:text-sm
              "
            >
              {footer.terms.name}
            </Link>

            {/* DIVIDER */}

            <span className="h-4 w-px bg-white/15" />

            {/* POWERED BY */}

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-light text-[var(--text-primary)] sm:text-xs">
                {footer.poweredBy.label}
              </span>

              <Link
                href={footer.poweredBy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-xs
                  font-semibold
                  text-[var(--text-primary)]
                  transition-colors
                  duration-200
                  hover:text-[var(--secondary)]
                  sm:text-sm
                "
              >
                {footer.poweredBy.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}