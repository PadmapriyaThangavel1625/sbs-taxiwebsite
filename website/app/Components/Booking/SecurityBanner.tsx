import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SecurityBanner() {
  return (
    <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <div className="text-blue-700">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Safe & Secure Rides</h4>
          <p className="text-xs text-slate-500">Your safety is our top priority. All our drivers are verified and vehicles are well maintained.</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        {/* Placeholder miniature vehicle asset banner badge */}
        <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-slate-700">Verified Fleet</span>
        </div>
      </div>
    </div>
  );
}