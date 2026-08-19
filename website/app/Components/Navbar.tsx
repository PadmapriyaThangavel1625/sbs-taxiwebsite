"use client";

import Link from "next/link";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  CarFront,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/app/Components/Logo";
import { SBS_TAXI_CONFIG } from "@/config/sbsTaxiConfig";

/* ============================================================
   TYPES
============================================================ */

interface PassengerUser {
  id?: string | number;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  status?: string;
}

interface NavigationLink {
  name: string;
  href: string;
}

/* ============================================================
   PASSENGER NAVIGATION
============================================================ */

const passengerLinks: NavigationLink[] = [
  {
    name: "Dashboard",
    href: "/passenger/dashboard",
  },
  {
    name: "Wallet",
    href: "/passenger/wallet",
  },
  {
    name: "My History",
    href: "/passenger/history",
  },
  {
    name: "My Places",
    href: "/passenger/saved-place",
  },
  {
    name: "Profile",
    href: "/passenger/profile",
  },
];

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navbar = SBS_TAXI_CONFIG.navbar;

  /* =========================================================
     STATE
  ========================================================= */

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /*
   * Prevent hydration mismatch.
   *
   * localStorage is only accessed after the component
   * has mounted in the browser.
   */
  const [mounted, setMounted] = useState(false);

  const [user, setUser] =
    useState<PassengerUser | null>(null);

  /* =========================================================
     AUTH CHECK
  ========================================================= */

  useEffect(() => {
    setMounted(true);

    const checkUser = () => {
      try {
        const storedUser =
          window.localStorage.getItem("sbs_user");

        if (!storedUser) {
          setUser(null);
          return;
        }

        const parsedUser =
          JSON.parse(storedUser) as PassengerUser;

        setUser(parsedUser);
      } catch (error) {
        console.error(
          "SBS USER CHECK ERROR:",
          error
        );

        setUser(null);
      }
    };

    /* Initial check */
    checkUser();

    /* Cross-tab authentication */
    window.addEventListener(
      "storage",
      checkUser
    );

    /* Same-tab authentication */
    window.addEventListener(
      "sbs-auth-change",
      checkUser
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkUser
      );

      window.removeEventListener(
        "sbs-auth-change",
        checkUser
      );
    };
  }, []);

  /* =========================================================
     MOBILE BODY SCROLL
  ========================================================= */

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";

      return;
    }

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [open]);

  /* =========================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  /* =========================================================
     ACTIVE LINK
  ========================================================= */

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  /* =========================================================
     CLOSE MENU
  ========================================================= */

  const closeMenu = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  /* =========================================================
     SIGN OUT
  ========================================================= */

  const handleSignOut = () => {
    try {
      const authKeys = [
        "sbs_user",
        "sbs_logged_in",
        "sbs_user_id",
        "sbs_user_name",
        "sbs_user_mobile",
        "sbs_user_email",
        "sbs_user_status",
      ];

      authKeys.forEach((key) => {
        window.localStorage.removeItem(key);
      });

      /* Clear state */
      setUser(null);
      setProfileOpen(false);
      setOpen(false);

      /* Notify application */
      window.dispatchEvent(
        new Event("sbs-auth-change")
      );

      /* Go home */
      router.replace("/");
    } catch (error) {
      console.error(
        "SBS SIGN OUT ERROR:",
        error
      );

      window.location.replace("/");
    }
  };

  /* =========================================================
     PASSENGER NAME
  ========================================================= */

  const passengerName =
    user?.name || "Passenger";

  const firstName =
    passengerName.trim().split(/\s+/)[0] ||
    "Passenger";

  /* =========================================================
     AUTH STATE
  ========================================================= */

  const isAuthenticated =
    mounted && !!user;

  /* =========================================================
     NAVIGATION LINKS
  ========================================================= */

  const desktopLinks: NavigationLink[] =
    isAuthenticated
      ? passengerLinks
      : navbar.links;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <header
      className="
        sticky
        top-[var(--promo-bar-height,40px)]
        z-40
        w-full
        max-w-full
        overflow-visible
        border-b
        border-white/10
        bg-[var(--primary)]
        shadow-sm
      "
    >
      {/* =====================================================
          NAVBAR MAIN
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[72px]
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-4
          overflow-visible
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
            min-w-0
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
            min-w-0
            items-center
            gap-5
            lg:flex
            xl:gap-7
          "
        >
          {/* =================================================
              NAVIGATION LINKS
          ================================================== */}

          {desktopLinks.map((link) => {
            const active =
              isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
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
                      : "!text-[var(--text-primary)] hover:!text-[var(--secondary)]"
                  }
                `}
              >
                {link.name}

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
              BOOK A RIDE
          ================================================== */}

          <Link
            href={navbar.booking.href}
            className="
              ml-1
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
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
            <CarFront className="h-4 w-4" />
            {navbar.booking.name}
          </Link>

          {/* =================================================
              LOGGED IN USER
          ================================================== */}

          {isAuthenticated && (
            <div className="relative shrink-0">

              {/* USER BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setProfileOpen(
                    (previous) =>
                      !previous
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/10
                  px-3
                  py-2
                  text-[var(--text-primary)]
                  transition-all
                  duration-200
                  hover:border-[var(--secondary)]
                  hover:bg-white/5
                "
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                {/* USER ICON */}

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--secondary)]
                    text-black
                  "
                >
                  <User className="h-4 w-4" />
                </span>

                {/* FIRST NAME */}

                <span
                  className="
                    max-w-[110px]
                    truncate
                    font-[family-name:var(--font-jakarta)]
                    text-sm
                    font-semibold
                  "
                >
                  {firstName}
                </span>

                {/* ARROW */}

                <ChevronDown
                  className={`
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {/* =================================================
                  SIMPLE PROFILE DROPDOWN
                  
                  ONLY:
                  - Name
                  - Email
                  - Sign Out
              ================================================== */}

              {profileOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-[100]
                    mt-3
                    w-64
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-xl
                  "
                >
                  {/* =========================================
                      USER INFORMATION
                  ========================================== */}

                  <div
                    className="
                      px-4
                      py-5
                    "
                  >
                    <div className="flex items-center gap-3">

                      {/* USER ICON */}

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[var(--secondary)]
                          text-black
                        "
                      >
                        <User className="h-5 w-5" />
                      </div>

                      {/* NAME + EMAIL */}

                      <div className="min-w-0">

                        <p
                          className="
                            truncate
                            font-[family-name:var(--font-jakarta)]
                            text-sm
                            font-bold
                            text-slate-900
                          "
                        >
                          {passengerName}
                        </p>

                        {user?.email && (
                          <p
                            className="
                              mt-1
                              truncate
                              text-xs
                              text-slate-500
                            "
                          >
                            {user.email}
                          </p>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* =========================================
                      SIGN OUT ONLY
                  ========================================== */}

                  <div
                    className="
                      border-t
                      border-slate-100
                    "
                  >
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3.5
                        text-left
                        text-sm
                        font-semibold
                        text-red-600
                        transition
                        hover:bg-red-50
                      "
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* ===================================================
            MOBILE MENU BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={() =>
            setOpen(
              (previous) => !previous
            )
          }
          className="
            flex
            h-10
            w-10
            shrink-0
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
          z-[90]
          w-full
          max-w-full
          overflow-hidden
          border-t
          border-white/10
          bg-[var(--primary)]
          shadow-lg
          transition-[max-height,opacity,visibility]
          duration-300
          lg:hidden
          ${
            open
              ? "visible max-h-[calc(100dvh-var(--promo-bar-height,40px)-72px)] opacity-100"
              : "invisible max-h-0 opacity-0"
          }
        `}
      >
        {/* ===================================================
            MOBILE SCROLL AREA
        ==================================================== */}

        <div
          className="
            max-h-[calc(100dvh-var(--promo-bar-height,40px)-72px)]
            w-full
            overflow-x-hidden
            overflow-y-auto
            overscroll-contain
            px-4
            py-3
            pb-5
            sm:px-6
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* =================================================
              MOBILE USER INFO
              
              ONLY NAME + EMAIL
          ================================================== */}

          {isAuthenticated && (
            <div
              className="
                mb-3
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >
              <div className="flex items-center gap-3">

                {/* USER ICON */}

                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--secondary)]
                    text-black
                  "
                >
                  <User className="h-5 w-5" />
                </span>

                {/* NAME + EMAIL */}

                <div className="min-w-0">

                  <p
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-[var(--text-primary)]
                    "
                  >
                    {passengerName}
                  </p>

                  {user?.email && (
                    <p
                      className="
                        mt-0.5
                        truncate
                        text-xs
                        text-white/60
                      "
                    >
                      {user.email}
                    </p>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* =================================================
              MOBILE LINKS
          ================================================== */}

          <nav
            aria-label="Mobile navigation"
            className="
              flex
              w-full
              flex-col
            "
          >
            {desktopLinks.map((link) => {
              const active =
                isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                  className={`
                    block
                    w-full
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
                        : "font-medium !text-[var(--text-primary)] hover:!text-[var(--secondary)]"
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
              gap-2
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
            "
          >
            <CarFront className="h-4 w-4" />
            {navbar.booking.name}
          </Link>

          {/* =================================================
              MOBILE SIGN OUT
          ================================================== */}

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleSignOut}
              className="
                mt-2
                mb-1
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-red-400/20
                px-5
                py-3
                text-sm
                font-semibold
                text-red-300
                transition
                hover:bg-red-500/10
              "
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}