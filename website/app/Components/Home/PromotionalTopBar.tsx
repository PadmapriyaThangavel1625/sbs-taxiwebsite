"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Tag,
  X,
  Phone,
  UserPlus,
  LogIn,
  LogOut,
  User,
} from "lucide-react";

export default function PromotionalTopBar() {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // ============================================================
  // CHECK LOGIN STATUS
  // ============================================================

  useEffect(() => {
    function checkLogin() {
      if (typeof window === "undefined") return;

      const isLoggedIn =
        localStorage.getItem("sbs_logged_in") === "true";

      const savedName =
        localStorage.getItem("sbs_user_name") || "";

      setLoggedIn(isLoggedIn);
      setUserName(savedName);
    }

    // Initial check
    checkLogin();

    // ----------------------------------------------------------
    // Listen for login/logout changes
    // ----------------------------------------------------------

    window.addEventListener("storage", checkLogin);

    // Custom event for same-tab login/logout
    window.addEventListener(
      "sbs-auth-changed",
      checkLogin
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkLogin
      );

      window.removeEventListener(
        "sbs-auth-changed",
        checkLogin
      );
    };
  }, []);

  // ============================================================
  // SIGN OUT
  // ============================================================

  function handleSignOut() {
    // ----------------------------------------------------------
    // REMOVE LOGIN DATA
    // ----------------------------------------------------------

    localStorage.removeItem("sbs_user");
    localStorage.removeItem("sbs_logged_in");

    localStorage.removeItem("sbs_user_id");
    localStorage.removeItem("sbs_user_name");
    localStorage.removeItem("sbs_user_mobile");
    localStorage.removeItem("sbs_user_email");
    localStorage.removeItem("sbs_user_status");

    // ----------------------------------------------------------
    // UPDATE TOP BAR IMMEDIATELY
    // ----------------------------------------------------------

    setLoggedIn(false);
    setUserName("");

    // ----------------------------------------------------------
    // INFORM OTHER COMPONENTS
    // ----------------------------------------------------------

    window.dispatchEvent(
      new Event("sbs-auth-changed")
    );

    // ----------------------------------------------------------
    // GO BACK TO SBS TAXI WEBSITE
    // ----------------------------------------------------------

    router.push("/");
  }

  // ============================================================
  // CLOSE
  // ============================================================

  if (!open) return null;

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="w-full bg-[var(--secondary)] text-white">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-2
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            flex
            min-h-[48px]
            w-full
            items-center
            justify-between
            gap-1.5
            sm:min-h-[52px]
            sm:gap-4
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <Link
            href="/offers"
            onClick={() => setOpen(false)}
            className="
              flex
              min-w-0
              flex-1
              cursor-pointer
              items-center
              gap-1.5
              transition-opacity
              hover:opacity-90
              sm:gap-3
            "
          >
            {/* ICON */}

            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-[var(--primary)]
                text-[var(--secondary)]
                sm:h-8
                sm:w-8
                sm:rounded-lg
              "
            >
              <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>

            {/* TEXT */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-2
                sm:gap-3
              "
            >
              {/* LIMITED TIME */}

              <span
                className="
                  hidden
                  shrink-0
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-black
                  sm:inline
                  sm:text-xs
                "
              >
                Limited Time
              </span>

              {/* MAIN OFFER */}

              <span
                className="
                  truncate
                  text-[11px]
                  font-bold
                  leading-5
                  text-[var(--primary)]
                  sm:text-sm
                  md:text-base
                "
              >
                Special Taxi Offers
              </span>

              {/* DESCRIPTION */}

              <span
                className="
                  hidden
                  truncate
                  text-xs
                  text-[var(--primary)]
                  md:inline
                  lg:text-sm
                "
              >
                — Book today and enjoy special rates!
              </span>
            </div>
          </Link>

          {/* =====================================================
              RIGHT CONTENT
          ====================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              sm:gap-2
            "
          >
            {/* =================================================
                PHONE
            ================================================== */}

            <Link
              href="tel:9843544844"
              aria-label="Call SBS Taxi"
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-[var(--primary)]
                text-[var(--secondary)]
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                sm:h-9
                sm:w-9
                sm:rounded-lg
              "
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>

            {/* =================================================
                LOGGED IN USER
            ================================================== */}

            {loggedIn ? (
              <>
                {/* USER */}

                <Link
                  href="/user/dashboard"
                  className="
                    flex
                    h-7
                    max-w-[120px]
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                    rounded-md
                    border
                    border-[var(--primary)]
                    bg-[var(--primary)]
                    px-2
                    text-[9px]
                    font-bold
                    text-[var(--text-primary)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-md
                    sm:h-9
                    sm:max-w-[180px]
                    sm:gap-1.5
                    sm:rounded-lg
                    sm:px-3
                    sm:text-xs
                  "
                >
                  <User className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />

                  <span className="truncate">
                    {userName || "My Account"}
                  </span>
                </Link>

                {/* SIGN OUT */}

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="
                    flex
                    h-7
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                    rounded-md
                    border
                    border-white/30
                    bg-[var(--primary)]
                    px-2
                    text-[9px]
                    font-bold
                    text-[var(--text-primary)]
                    transition-all
                    duration-200
                    hover:[var(--primary-dark)]
                    sm:h-9
                    sm:gap-1.5
                    sm:rounded-lg
                    sm:px-3
                    sm:text-xs
                  "
                >
                  <LogOut className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                {/* =================================================
                    SIGN IN
                ================================================== */}

                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    h-7
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                    rounded-md
                    border
                    border-[var(--primary)]
                    bg-[var(--primary)]
                    px-2
                    text-[9px]
                    font-bold
                    text-[var(--text-primary)]
                    transition-all
                    duration-200
                    hover:shadow-md
                    sm:h-9
                    sm:gap-1.5
                    sm:rounded-lg
                    sm:px-3
                    sm:text-xs
                  "
                >
                  <LogIn className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                  <span>Sign In</span>
                </Link>

                {/* =================================================
                    SIGN UP
                ================================================== */}

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    h-7
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                    rounded-md
                    bg-[var(--primary)]
                    px-2
                    text-[9px]
                    font-bold
                    text-[var(--secondary)]
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-md
                    sm:h-9
                    sm:gap-1.5
                    sm:rounded-lg
                    sm:px-3
                    sm:text-xs
                  "
                >
                  <UserPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                  <span>Sign Up</span>
                </Link>
              </>
            )}

            {/* =================================================
                CLOSE
            ================================================== */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close offer banner"
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-md
                text-[var(--primary)]
                transition
                hover:bg-white/10
                sm:h-8
                sm:w-8
                sm:rounded-lg
              "
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}