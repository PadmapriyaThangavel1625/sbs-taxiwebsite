"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import Logo from "@/app/Components/Logo";
import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* =========================================================
     CONFIG
  ========================================================= */

  const navbar = SBS_TAXI_CONFIG.navbar;

  /* =========================================================
     ACTIVE LINK
  ========================================================= */

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /* =========================================================
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    setOpen(false);
  };

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
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

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
        {/* ===================================================
            LOGO
        ==================================================== */}

        <Link
          href="/"
          onClick={closeMenu}
          aria-label="SBS Taxi Home"
          className="
            flex
            shrink-0
            items-center
          "
        >
          <Logo variant="footer" />
        </Link>

        {/* ===================================================
            DESKTOP NAVIGATION
        ==================================================== */}

        <nav
          aria-label="Main navigation"
          className="
            hidden
            items-center
            gap-6
            lg:flex
            xl:gap-8
          "
        >
          {navbar.links.map((link) => {
            const active = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`
                  group
                  relative
                  whitespace-nowrap
                  py-2
                  font-[family-name:var(--font-jakarta)]
                  text-[15px]
                  font-medium
                  transition-colors
                  duration-200
                  ${
                    active
                      ? "!text-[var(--secondary)]"
                      : "!text-[var(--text-primary)] !hover:text-[var(--secondary)]"
                  }
                `}
              >
                {link.name}

                {/* =================================================
                    ACTIVE / HOVER INDICATOR
                ================================================== */}

                <span
                  className={`
                    absolute
                    bottom-0
                    left-1/2
                    h-[2px]
                    -translate-x-1/2
                    rounded-full
                    bg-[var(--secondary)]
                    transition-all
                    duration-300
                    ${
                      active
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }
                  `}
                />
              </Link>
            );
          })}

          {/* =================================================
              DESKTOP BOOK A RIDE
          ================================================== */}

          <Link
            href={navbar.booking.href}
            className="
              ml-1
              inline-flex
              items-center
              justify-center
              rounded-lg
              bg-[var(--secondary)]
              px-5
              py-3
              font-[family-name:var(--font-jakarta)]
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
          >
            {navbar.booking.name}
          </Link>
        </nav>

        {/* ===================================================
            MOBILE MENU BUTTON
        ==================================================== */}

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
            text-[var(--text-primary)]
            transition-colors
            duration-200
            hover:bg-white/10
            hover:text-[var(--secondary)]
            lg:hidden
          "
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      <div
        id="mobile-navigation"
        className={`
          absolute
          left-0
          right-0
          top-full
          overflow-hidden
          border-t
          border-white/10
          !bg-[var(--primary)]
          shadow-lg
          transition-all
          duration-300
          lg:hidden
          ${
            open
              ? "visible max-h-[700px] opacity-100"
              : "invisible max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-3
            sm:px-6
          "
        >
          {/* =================================================
              MOBILE LINKS
          ================================================== */}

          <nav
            aria-label="Mobile navigation"
            className="flex flex-col"
          >
            {navbar.links.map((link) => {
              const active = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`
                    border-b
                    border-white/10
                    py-3.5
                    font-[family-name:var(--font-jakarta)]
                    text-sm
                    transition-colors
                    duration-200
                    ${
                      active
                        ? "font-bold !text-[var(--secondary)]"
                        : "font-medium !text-[var(--text-primary)] !hover:text-[var(--secondary)]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* =================================================
              MOBILE BOOK A RIDE
          ================================================== */}

          <Link
            href={navbar.booking.href}
            onClick={closeMenu}
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
              font-[family-name:var(--font-jakarta)]
              text-sm
              font-bold
              text-black
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[var(--secondary-dark)]
              hover:shadow-md
            "
          >
            {navbar.booking.name}
          </Link>
        </div>
      </div>
    </header>
  );
}