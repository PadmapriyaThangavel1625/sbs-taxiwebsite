import React from "react";
import { Gift } from "lucide-react";

export default function PromoCard() {
  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-xl border border-[var(--secondary)] bg-[var(--secondary)] p-4 transition-colors hover:bg-[var(--secondary-dark)]"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <div className="flex items-center space-x-3">
        <div className="rounded-lg bg-amber-500 p-2.5 text-[var(--text-primary)] shadow-sm">
          <Gift className="h-5 w-5" />
        </div>

        <div>
          <h5 className="text-sm font-bold text-slate-900">
            New User Offer!
          </h5>

          <p className="text-xs text-slate-600">
            Get ₹50 OFF on your first 3 bookings
          </p>
        </div>
      </div>

      <span className="font-bold text-slate-400">›</span>
    </div>
  );
}