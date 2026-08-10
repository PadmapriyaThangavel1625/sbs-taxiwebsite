"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/app/Components/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Fleet", href: "/fleet" },
  { name: "Pricing", href: "/pricing" },
  { name: "Destinations", href: "/destinations" },
  { name: "Offers", href: "/offers" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contacts" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="
        sticky
        top-[var(--promo-bar-height,40px)]
        z-40
        w-full
        border-b
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* =================================================
          NAVBAR INNER
      ================================================== */}
      <div
        className="
          mx-auto
          flex
          h-[72px]
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            LOGO
        ================================================== */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" &&
                pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  group
                  relative
                  py-2
                  text-[15px]
                  font-medium
                  transition-colors
                  duration-200
                  ${
                    isActive
                      ? "text-[#0753b8]"
                      : "text-gray-700 hover:text-[#0753b8]"
                  }
                `}
              >
                {link.name}

                {/* Active / Hover Underline */}
                <span
                  className={`
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    origin-left
                    rounded-full
                    bg-[#0753b8]
                    transition-transform
                    duration-200
                    ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </Link>
            );
          })}

          {/* =================================================
              BOOK A RIDE
          ================================================== */}
          <Link
            href="/booking"
            className="
              ml-1
              rounded-lg
              bg-[#ffc107]
              px-5
              py-3
              text-[14px]
              font-bold
              text-black
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#eeb200]
              hover:shadow-md
            "
          >
            Book a Ride
          </Link>
        </nav>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-gray-700
            transition-all
            duration-200
            hover:bg-gray-100
            hover:text-[#0753b8]
            lg:hidden
          "
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* =================================================
          MOBILE MENU
      ================================================== */}
      <div
        className={`
          absolute
          left-0
          right-0
          top-full
          overflow-hidden
          border-t
          border-gray-100
          bg-white
          shadow-lg
          transition-all
          duration-200
          lg:hidden
          ${
            open
              ? "visible max-h-[700px] opacity-100"
              : "invisible max-h-0 opacity-0"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          {/* Navigation Links */}
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" &&
                  pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`
                    border-b
                    border-gray-100
                    py-3.5
                    text-sm
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "font-bold text-[#0753b8]"
                        : "font-medium text-gray-700 hover:text-[#0753b8]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Book Button */}
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              rounded-lg
              bg-[#ffc107]
              px-5
              py-3
              text-sm
              font-bold
              text-black
              transition-all
              duration-200
              hover:bg-[#eeb200]
            "
          >
            Book a Ride
          </Link>
        </div>
      </div>
    </header>
  );
}