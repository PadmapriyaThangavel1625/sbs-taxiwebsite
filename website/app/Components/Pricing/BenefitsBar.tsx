// components/pricing/BenefitsBar.tsx

import React from "react";

export default function BenefitsBar() {
  const benefits = [
    {
      icon: "₹",
      title: "No",
      subtitle: "Hidden Charges",
    },
    {
      icon: "👤",
      title: "No Driver",
      subtitle: "Bata Charges",
    },
    {
      icon: "◷",
      title: "No Waiting",
      subtitle: "Charges",
    },
    {
      icon: "▣",
      title: "No Extra Charge",
      subtitle: "for Online Payments",
    },
    {
      icon: "🛣",
      title: "Toll Free for",
      subtitle: "the First 200 KM",
    },
  ];

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
      {/* =====================================================
          SAME WIDTH STRUCTURE
      ====================================================== */}

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
        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            lg:grid-cols-[7fr_3fr]
            lg:gap-6
          "
        >
          {/* =================================================
              CUSTOMER BENEFITS - 70%
          ================================================== */}

          <div
            className="
              flex
              w-full
              flex-col
              justify-between
              rounded-xl
              border
              border-gray-100
              bg-white
              p-5
              shadow-sm

              sm:p-6
            "
          >
            {/* Heading */}

            <h3
              className="
                mb-5
                text-base
                font-bold
                text-heading
              "
            >
              Customer Benefits
            </h3>

            {/* Benefits */}

            <div
              className="
                grid
                grid-cols-2
                gap-y-6
                text-center

                sm:grid-cols-5
                sm:divide-x
                sm:divide-gray-200
              "
            >
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    px-2
                  "
                >
                  {/* Icon */}

                  <span
                    className="
                      mb-2
                      text-2xl
                      text-[var(--primary)]
                    "
                  >
                    {item.icon}
                  </span>

                  {/* Text */}

                  <p
                    className="
                      text-xs
                      font-medium
                      leading-tight
                      text-muted
                    "
                  >
                    {item.title}
                    <br />
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              IMPORTANT NOTE - 30%
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
      </div>
    </section>
  );
}