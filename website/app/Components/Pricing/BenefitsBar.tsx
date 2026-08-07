// components/pricing/BenefitsBar.tsx
import React from "react";

export default function BenefitsBar() {
  const benefits = [
    { icon: "₹", title: "No", subtitle: "Hidden Charges" },
    { icon: "👤", title: "No Driver", subtitle: "Bata Charges" },
    { icon: "◷", title: "No Waiting", subtitle: "Charges" },
    { icon: "▣", title: "No Extra Charge", subtitle: "for Online Payments" },
    { icon: "🛣", title: "Toll Free for", subtitle: "the First 200 KM" },
  ];

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-5 w-full">

        {/* Customer Benefits 70% */}
        <div className="bg-white border rounded-xl p-6 shadow-sm w-full flex flex-col justify-between">
          <h3 className="font-bold text-gray-900 text-base mb-5">
            Customer Benefits
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 text-center gap-y-6 sm:divide-x divide-gray-200">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="px-2 flex flex-col items-center justify-center"
              >
                <span className="text-blue-600 text-2xl mb-2">
                  {item.icon}
                </span>

                <p className="text-xs text-gray-700 font-medium leading-tight">
                  {item.title}
                  <br />
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note 30% */}
        <div className="bg-[#fffdf5] border border-yellow-200 rounded-xl p-6 shadow-sm w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-base">
                Important Note
              </h3>

              <span className="text-yellow-600 bg-yellow-100 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                i
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Prices may vary for long distance, hill stations,
              night travel and special requests. Please check
              fare calculator or contact our support for exact pricing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}