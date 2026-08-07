// components/contact/HelpBanner.tsx
import { Headphones } from "lucide-react";

export default function HelpBanner() {
  return (
    <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="flex items-center gap-4 text-center lg:text-left">
        <div className="w-12 h-12 bg-[#003399] rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
          <Headphones className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base">Need Immediate Assistance?</h4>
          <p className="text-xs text-gray-600 mt-0.5">
            Our team is available 24/7 to help you with bookings, cancellations, or any queries.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
        <a
          href="tel:8144065688"
          className="px-5 py-2.5 bg-[#003399] hover:bg-blue-900 text-white font-medium rounded-xl text-sm flex items-center gap-2 shadow transition-colors"
        >
          <span>📞 Call 81440 65688</span>
        </a>
        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium rounded-xl text-sm flex items-center gap-2 shadow-sm transition-colors"
        >
          <span>💬 Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}