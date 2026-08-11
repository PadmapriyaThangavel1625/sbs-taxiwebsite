import React from "react";
import { CheckCircle2 } from "lucide-react";

const features = [
  "No Hidden Charges",
  "100% Transparent Pricing",
  "Verified & Experienced Drivers",
  "24/7 Customer Support",
];

export default function WhyBookWithUs() {
  return (
    <div
      className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/60 p-5"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <h4 className="text-sm font-bold text-slate-900">
        Why book with SBS Taxi?
      </h4>

      <div className="space-y-2">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 text-xs font-medium text-slate-700"
          >
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}