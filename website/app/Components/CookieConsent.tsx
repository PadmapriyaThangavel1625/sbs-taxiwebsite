// components/CookieConsent.tsx

"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const COOKIE_NAME = "sbs_taxi_cookie_consent";
const COOKIE_DAYS = 365;

function setCookie(
  name: string,
  value: string,
  days: number
) {
  const expires = new Date();

  expires.setTime(
    expires.getTime() +
      days * 24 * 60 * 60 * 1000
  );

  document.cookie =
    `${name}=${encodeURIComponent(value)};` +
    `expires=${expires.toUTCString()};` +
    `path=/;` +
    `SameSite=Lax`;
}

function getCookie(name: string) {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) =>
    item.startsWith(`${name}=`)
  );

  return cookie
    ? decodeURIComponent(cookie.split("=")[1])
    : null;
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);

    if (!consent) {
      setShow(true);
    }
  }, []);

  const saveConsent = (
    analyticsValue: boolean,
    marketingValue: boolean
  ) => {
    const consent = {
      necessary: true,
      analytics: analyticsValue,
      marketing: marketingValue,
      savedAt: new Date().toISOString(),
    };

    setCookie(
      COOKIE_NAME,
      JSON.stringify(consent),
      COOKIE_DAYS
    );

    setShow(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent(true, true);
  };

  const rejectOptional = () => {
    saveConsent(false, false);
  };

  const saveSettings = () => {
    saveConsent(analytics, marketing);
  };

  // Close popup without saving cookie preference
  const closeCookieBox = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <>
      {/* =================================================
          SMALL COOKIE BOX
          RIGHT SIDE
      ================================================= */}

      <div
        className="
          fixed
          bottom-4
          right-4
          z-[9999]
          w-[calc(100%-2rem)]
          max-w-[330px]
          sm:bottom-5
          sm:right-5
          sm:w-[330px]
        "
      >
        <div
          className="
            relative
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-[0_10px_35px_rgba(0,0,0,0.15)]
          "
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeCookieBox}
            className="
              absolute
              right-2
              top-2
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
            aria-label="Close cookie notice"
          >
            <X className="h-4 w-4" />
          </button>

          {/* HEADER */}

          <div className="flex items-start gap-3 pr-6">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[var(--secondary)]
                text-[var(--primary)]
              "
            >
              <Cookie className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  text-sm
                  font-bold
                  text-[var(--text-primary)]
                "
              >
                We use cookies
              </h3>

              <p
                className="
                  mt-1
                  text-[11px]
                  leading-5
                  text-[var(--text-secondary)]
                "
              >
                SBS Taxi uses cookies to provide
                essential features and improve
                your website experience.
              </p>
            </div>

          </div>

          {/* SETTINGS */}

          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="
              mt-2
              text-[11px]
              font-semibold
              text-[var(--primary)]
              underline
              underline-offset-2
            "
          >
            Cookie Settings
          </button>

          {/* BUTTONS */}

          <div className="mt-3 grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={rejectOptional}
              className="
                rounded-lg
                border
                border-slate-200
                px-3
                py-2
                text-[11px]
                font-semibold
                text-[var(--text-secondary)]
                transition
                hover:bg-slate-50
              "
            >
              Reject
            </button>

            <button
              type="button"
              onClick={acceptAll}
              className="
                rounded-lg
                bg-[var(--primary)]
                px-3
                py-2
                text-[11px]
                font-semibold
                text-[var(--text-primary)]
                transition
                hover:opacity-90
              "
            >
              Accept All
            </button>

          </div>
        </div>
      </div>

      {/* =================================================
          SETTINGS MODAL
      ================================================= */}

      {showSettings && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-black/50
            px-4
          "
        >
          <div
            className="
              relative
              w-full
              max-w-lg
              max-h-[90vh]
              overflow-y-auto
              rounded-2xl
              bg-white
              p-5
              shadow-2xl
              sm:p-6
            "
          >
            {/* CLOSE SETTINGS */}

            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-slate-500
                hover:bg-slate-100
              "
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* TITLE */}

            <div className="pr-10">
              <h2
                className="
                  text-xl
                  font-bold
                  text-[var(--text-primary)]
                  !mr-5
                "
              >
                Cookie Settings
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-[var(--text-secondary)]
                "
              >
                Choose which cookies you want SBS
                Taxi to use.
              </p>
            </div>

            {/* NECESSARY */}

            <div
              className="
                mt-6
                rounded-xl
                border
                border-slate-200
                p-4
              "
            >
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Necessary Cookies
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[var(--text-secondary)]
                    "
                  >
                    Required for login, security,
                    booking and basic website
                    functionality.
                  </p>
                </div>

                <span
                  className="
                    shrink-0
                    text-xs
                    font-semibold
                    text-green-600
                  "
                >
                  Always On
                </span>

              </div>
            </div>

            {/* ANALYTICS */}

            <div
              className="
                mt-3
                rounded-xl
                border
                border-slate-200
                p-4
              "
            >
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Analytics Cookies
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[var(--text-secondary)]
                    "
                  >
                    Help us understand website usage
                    and improve our services.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAnalytics(!analytics)}
                  className={`
                    relative
                    h-6
                    w-11
                    shrink-0
                    rounded-full
                    transition
                    ${
                      analytics
                        ? "bg-[var(--primary)]"
                        : "bg-slate-300"
                    }
                  `}
                  aria-label="Toggle analytics cookies"
                >
                  <span
                    className={`
                      absolute
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      transition
                      ${
                        analytics
                          ? "left-6"
                          : "left-1"
                      }
                    `}
                  />
                </button>

              </div>
            </div>

            {/* MARKETING */}

            <div
              className="
                mt-3
                rounded-xl
                border
                border-slate-200
                p-4
              "
            >
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Marketing Cookies
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[var(--text-secondary)]
                    "
                  >
                    Used to provide relevant
                    promotions and marketing
                    experiences.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMarketing(!marketing)}
                  className={`
                    relative
                    h-6
                    w-11
                    shrink-0
                    rounded-full
                    transition
                    ${
                      marketing
                        ? "bg-[var(--primary)]"
                        : "bg-slate-300"
                    }
                  `}
                  aria-label="Toggle marketing cookies"
                >
                  <span
                    className={`
                      absolute
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      transition
                      ${
                        marketing
                          ? "left-6"
                          : "left-1"
                      }
                    `}
                  />
                </button>

              </div>
            </div>

            {/* SAVE */}

            <button
              type="button"
              onClick={saveSettings}
              className="
                mt-6
                w-full
                rounded-xl
                bg-[var(--primary)]
                px-5
                py-3
                text-sm
                font-semibold
                text-[var(--text-primary)]
                transition
                hover:opacity-90
              "
            >
              Save Cookie Preferences
            </button>

          </div>
        </div>
      )}
    </>
  );
}