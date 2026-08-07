import React from 'react';
import { Gift } from 'lucide-react';

export default function PromoCard() {
  return (
    <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-amber-100/60 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="bg-amber-500 text-white p-2.5 rounded-lg shadow-sm">
          <Gift className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-bold text-slate-900 text-sm">New User Offer!</h5>
          <p className="text-xs text-slate-600">Get ₹50 OFF on your first 3 bookings</p>
        </div>
      </div>
      <span className="text-slate-400 font-bold">›</span>
    </div>
  );
}