"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/app/Components/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Fleet", href: "/fleet" },
  { name: "Pricing", href: "/pricing" },
  { name: "Destinations", href: "/destinations" },
  { name: "Offers", href: "/offers" },
  { name: "Contact Us", href: "/contacts" },
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
        border-white/10
        bg-[var(--primary)]
        shadow-sm
      "
    >
      {/* NAVBAR INNER */}

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
        {/* LOGO */}

        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Logo variant="footer" />
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
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
                  whitespace-nowrap
                  py-2
                  text-[15px]
                  !text-white
                  font-medium
                  transition-colors
                  duration-200
                  ${
                    isActive
                      ? "text-[var(--secondary)]"
                      : "text-white hover:text-[var(--secondary)]"
                  }
                `}
                style={{
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                {link.name}

                {/* UNDERLINE */}

                <span
                  className={`
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    origin-left
                    rounded-full
                    bg-[var(--secondary)]
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

          {/* BOOK A RIDE */}

          <Link
            href="/booking"
            className="
              ml-1
              rounded-lg
              bg-[var(--secondary)]
              px-5
              py-3
              text-[14px]
              font-bold
              text-black
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[var(--secondary-dark)]
              hover:shadow-md
            "
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            Book a Ride
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}

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
            text-white
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-[var(--secondary)]
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

      {/* MOBILE MENU */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-full
          overflow-hidden
          border-t
          border-white/10
          bg-[var(--primary)]
          !text-white
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
          {/* MOBILE LINKS */}

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
                    border-white/10
                    py-3.5
                    text-sm
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "font-bold text-[var(--secondary)]"
                        : "font-medium text-white hover:text-[var(--secondary)]"
                    }
                  `}
                  style={{
                    fontFamily: "var(--font-jakarta)",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* MOBILE BOOK BUTTON */}

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
              bg-[var(--secondary)]
              px-5
              py-3
              text-sm
              font-bold
              text-black
              transition-all
              duration-200
              hover:bg-[var(--secondary-dark)]
            "
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            Book a Ride
          </Link>
        </div>
      </div>
    </header>
  );
}