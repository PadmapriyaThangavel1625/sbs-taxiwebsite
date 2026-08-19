"use client";

import Link from "next/link";
import {
  Home,
  BriefcaseBusiness,
  CarFront,
  IndianRupee,
  MapPin,
  Tag,
  LayoutDashboard,
  History,
  Wallet,
  UserCircle,
  MoreHorizontal,
  X,
  LogOut,
  User,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

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

/* ============================================================
   PUBLIC ITEMS
============================================================ */

const publicItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Services",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    name: "Fleet",
    href: "/fleet",
    icon: CarFront,
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: IndianRupee,
  },
  {
    name: "Destinations",
    href: "/destinations",
    icon: MapPin,
  },
  {
    name: "Offers",
    href: "/offers",
    icon: Tag,
  },
];

/* ============================================================
   PASSENGER ITEMS
============================================================ */

const passengerItems = [
  {
    name: "Dashboard",
    href: "/passenger/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Trips",
    href: "/passenger/history",
    icon: History,
  },
  {
    name: "Wallet",
    href: "/passenger/wallet",
    icon: Wallet,
  },

  {
    name: "Profile",
    href: "/passenger/profile",
    icon: UserCircle,
  },
];

export default function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] =
    useState<PassengerUser | null>(null);

  const [moreOpen, setMoreOpen] =
    useState(false);

  /* ==========================================================
     CHECK LOGIN
  ========================================================== */

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser =
          localStorage.getItem("sbs_user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    // Initial
    checkUser();

    // Other tabs
    window.addEventListener(
      "storage",
      checkUser
    );

    // Same tab
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

  /* ==========================================================
     ACTIVE LINK
  ========================================================== */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  /* ==========================================================
     SIGN OUT
  ========================================================== */

  const handleSignOut = () => {
    localStorage.removeItem("sbs_user");
    localStorage.removeItem("sbs_logged_in");

    localStorage.removeItem("sbs_user_id");
    localStorage.removeItem("sbs_user_name");
    localStorage.removeItem("sbs_user_mobile");
    localStorage.removeItem("sbs_user_email");
    localStorage.removeItem("sbs_user_status");

    setUser(null);
    setMoreOpen(false);

    window.dispatchEvent(
      new Event("sbs-auth-change")
    );

    router.replace("/signin");
  };

  /* ==========================================================
     USER
  ========================================================== */

  const passengerName =
    user?.name || "Passenger";

  /* ==========================================================
     PUBLIC BOTTOM BAR
  ========================================================== */

  if (!user) {
    return (
      <nav
        className="
          fixed
          inset-x-0
          bottom-0
          z-[9997]
          block
          border-t
          border-white/10
          bg-[var(--primary)]
          font-[var(--font-jakarta)]
          md:hidden
        "
      >
        <div
          className="
            grid
            h-16
            w-full
            grid-cols-6
            bg-[var(--primary)]
          "
        >
          {publicItems.map((item) => {
            const Icon = item.icon;
            const active =
              isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                className={`
                  group
                  relative
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  transition-colors
                  duration-200
                  ${
                    active
                      ? "text-[var(--secondary)]"
                      : "text-[var(--text-primary)] hover:text-[var(--secondary)]"
                  }
                `}
              >
                {/* ACTIVE INDICATOR */}

                <span
                  className={`
                    absolute
                    -top-[1px]
                    left-1/2
                    h-[3px]
                    -translate-x-1/2
                    rounded-b-full
                    bg-[var(--secondary)]
                    transition-all
                    duration-300
                    ${
                      active
                        ? "w-12 opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />

                {/* ICON */}

                <Icon
                  className={`
                    h-5
                    w-5
                    transition-all
                    duration-200
                    sm:h-[21px]
                    sm:w-[21px]
                    ${
                      active
                        ? "scale-110 text-[var(--secondary)]"
                        : "text-[var(--text-primary)] group-hover:scale-110 group-hover:text-[var(--secondary)]"
                    }
                  `}
                  strokeWidth={
                    active ? 2.2 : 1.9
                  }
                />

                {/* LABEL */}

                <span
                  className={`
                    text-[10px]
                    leading-none
                    transition-colors
                    duration-200
                    sm:text-[10px]
                    ${
                      active
                        ? "font-bold text-[var(--secondary)]"
                        : "font-medium text-[var(--text-primary)] group-hover:text-[var(--secondary)]"
                    }
                  `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  /* ==========================================================
     LOGGED-IN PASSENGER BOTTOM BAR
  ========================================================== */

  return (
    <>
      {/* ======================================================
          MORE POPUP
      ====================================================== */}

      {moreOpen && (
        <div
          className="
            fixed
            inset-x-3
            bottom-[76px]
            z-[9998]
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            md:hidden
          "
        >
          {/* USER INFO */}

          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-slate-100
              bg-slate-50
              p-4
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
                rounded-full
                bg-[var(--secondary)]
                text-black
              "
            >
              <User className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-bold
                  text-slate-900
                "
              >
                {passengerName}
              </p>

              {user.email && (
                <p
                  className="
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {user.email}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setMoreOpen(false)
              }
              className="
                ml-auto
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-slate-500
                transition
                hover:bg-slate-200
              "
              aria-label="Close more menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* MORE LINKS */}

          <div className="p-2">
            {/* PROFILE */}

            <Link
              href="/user/profile"
              onClick={() =>
                setMoreOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <UserCircle className="h-5 w-5" />
              Profile
            </Link>

            {/* BOOK A RIDE */}

            <Link
              href="/booking"
              onClick={() =>
                setMoreOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <CarFront className="h-5 w-5" />
              Book a Ride
            </Link>

            {/* SAVED PLACES */}

            <Link
              href="/user/saved-places"
              onClick={() =>
                setMoreOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <MapPin className="h-5 w-5" />
              Saved Places
            </Link>

            {/* OFFERS */}

            <Link
              href="/offers"
              onClick={() =>
                setMoreOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <Tag className="h-5 w-5" />
              Offers
            </Link>

            {/* SIGN OUT */}

            <button
              type="button"
              onClick={handleSignOut}
              className="
                mt-1
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border-t
                border-slate-100
                px-3
                py-3
                text-left
                text-sm
                font-semibold
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ======================================================
          PASSENGER BOTTOM BAR
      ====================================================== */}

      <nav
        className="
          fixed
          inset-x-0
          bottom-0
          z-[9997]
          block
          border-t
          border-white/10
          bg-[var(--primary)]
          font-[var(--font-jakarta)]
          md:hidden
        "
      >
        <div
          className="
            grid
            h-16
            w-full
            grid-cols-5
            bg-[var(--primary)]
          "
        >
          {/* ==================================================
              DASHBOARD / TRIPS / WALLET / PROFILE
          ================================================== */}

          {passengerItems.map((item) => {
            const Icon = item.icon;

            const active =
              isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                className={`
                  group
                  relative
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  transition-colors
                  duration-200
                  ${
                    active
                      ? "text-[var(--secondary)]"
                      : "text-[var(--text-primary)] hover:text-[var(--secondary)]"
                  }
                `}
              >
                {/* ACTIVE INDICATOR */}

                <span
                  className={`
                    absolute
                    -top-[1px]
                    left-1/2
                    h-[3px]
                    -translate-x-1/2
                    rounded-b-full
                    bg-[var(--secondary)]
                    transition-all
                    duration-300
                    ${
                      active
                        ? "w-10 opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />

                {/* ICON */}

                <Icon
                  className={`
                    h-5
                    w-5
                    transition-all
                    duration-200
                    ${
                      active
                        ? "scale-110 text-[var(--secondary)]"
                        : "text-[var(--text-primary)] group-hover:scale-110 group-hover:text-[var(--secondary)]"
                    }
                  `}
                  strokeWidth={
                    active ? 2.2 : 1.9
                  }
                />

                {/* LABEL */}

                <span
                  className={`
                    text-[10px]
                    leading-none
                    ${
                      active
                        ? "font-bold text-[var(--secondary)]"
                        : "font-medium text-[var(--text-primary)] group-hover:text-[var(--secondary)]"
                    }
                  `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* ==================================================
              MORE
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setMoreOpen(
                (previous) => !previous
              )
            }
            className={`
              relative
              flex
              flex-col
              items-center
              justify-center
              gap-1
              transition-colors
              duration-200
              ${
                moreOpen
                  ? "text-[var(--secondary)]"
                  : "text-[var(--text-primary)] hover:text-[var(--secondary)]"
              }
            `}
            aria-label="More"
            aria-expanded={moreOpen}
          >
            <MoreHorizontal
              className={`
                h-5
                w-5
                transition-all
                duration-200
                ${
                  moreOpen
                    ? "scale-110 text-[var(--secondary)]"
                    : ""
                }
              `}
              strokeWidth={
                moreOpen ? 2.2 : 1.9
              }
            />

            <span
              className={`
                text-[10px]
                leading-none
                ${
                  moreOpen
                    ? "font-bold text-[var(--secondary)]"
                    : "font-medium text-[var(--text-primary)]"
                }
              `}
            >
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}