
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
    <section className="section-bg py-6 sm:py-8">
      <div
        className="
          container-custom
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-[7fr_3fr]
          lg:gap-6
        "
      >
        {/* Customer Benefits - 70% */}
        <div
          className="
            flex
            w-full
            flex-col
            justify-between
            rounded-xl
            border
            bg-white
            p-5
            shadow-sm
            sm:p-6
          "
        >
          <h3 className="mb-5 text-base font-bold text-heading">
            Customer Benefits
          </h3>

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
                <span className="mb-2 text-2xl text-primary">
                  {item.icon}
                </span>

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

        {/* Important Note - 30% */}
        <div
          className="
            flex
            w-full
            flex-col
            justify-between
            rounded-xl
            border
            border-secondary
            bg-secondary-light
            p-5
            shadow-sm
            sm:p-6
          "
        >
          <div>
            {/* Heading */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-heading">
                Important Note
              </h3>

              <span
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-secondary
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
