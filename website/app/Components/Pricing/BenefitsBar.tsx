// components/pricing/BenefitsBar.tsx

import React from "react";

export default function BenefitsBar() {
  return (
    <section
      className="
        section-bg
        w-full
        py-6
        font-[var(--font-jakarta)]
        sm:py-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            IMPORTANT NOTE
        ================================================== */}

        <div
          className="
            flex
            w-full
            flex-col
            justify-between
            rounded-xl
            border
            border-[var(--secondary)]
            bg-[var(--secondary-light)]
            p-5
            shadow-sm
            sm:p-6
          "
        >
          <div>
            {/* Heading */}

            <div
              className="
                mb-3
                flex
                items-center
                justify-between
              "
            >
              <h3
                className="
                  text-base
                  font-bold
                  text-heading
                "
              >
                Important Note
              </h3>

              {/* Info Icon */}

              <span
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--secondary)]
                  text-sm
                  font-bold
                  text-heading
                "
              >
                i
              </span>
            </div>

            {/* Description */}

            <p
              className="
                text-xs
                leading-relaxed
                text-muted
                sm:text-sm
              "
            >
              Prices may vary for long distance, hill stations,
              night travel and special requests. Please check
              fare calculator or contact our support for exact
              pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}