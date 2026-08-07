import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const features = [
  "No Hidden Charges",
  "100% Transparent Pricing",
  "Verified & Experienced Drivers",
  "24/7 Customer Support"
];

export default function WhyBookWithUs() {
  return (
    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-5 space-y-3">
      <h4 className="font-bold text-slate-900 text-sm">Why book with SBS Taxi?</h4>
      <div className="space-y-2">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-xs font-medium text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}