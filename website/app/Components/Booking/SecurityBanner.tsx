import React from "react";
import { ShieldCheck } from "lucide-react";

export default function SecurityBanner() {
  return (
    <div
      className="flex flex-col items-center justify-between gap-4 rounded-xl border border-amber-100 bg-amber-50/30 p-5 sm:flex-row"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <div className="flex items-center space-x-3">
        <div className="text-blue-700">
          <ShieldCheck className="h-10 w-10" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Safe & Secure Rides
          </h4>

          <p className="text-xs text-slate-500">
            Your safety is our top priority. All our drivers are verified and
            vehicles are well maintained.
          </p>
        </div>
      </div>

      <div className="flex-shrink-0">
        {/* Placeholder miniature vehicle asset banner badge */}
        <div className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-blue-600" />

          <span className="text-xs font-semibold text-slate-700">
            Verified Fleet
          </span>
        </div>
      </div>
    </div>
  );
}