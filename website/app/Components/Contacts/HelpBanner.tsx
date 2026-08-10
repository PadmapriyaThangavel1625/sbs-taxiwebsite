
import { Headphones } from "lucide-react";

export default function HelpBanner() {
  return (
    <div
      className="
        bg-[var(--primary-light)]
        border border-[var(--border)]
        rounded-2xl
        p-6
        flex flex-col lg:flex-row
        items-center justify-between
        gap-6
        shadow-sm
      "
    >
      {/* Left Content */}
      <div className="flex items-center gap-4 text-center lg:text-left">
        <div
          className="
            w-12 h-12
            bg-[var(--primary)]
            rounded-full
            flex items-center justify-center
            text-white
            shrink-0
            shadow-md
          "
        >
          <Headphones className="w-6 h-6" />
        </div>

        <div>
          <h4 className="font-bold text-[var(--text)] text-base">
            Need Immediate Assistance?
          </h4>

          <p className="text-xs text-[var(--text-light)] mt-0.5">
            Our team is available 24/7 to help you with bookings,
            cancellations, or any queries.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
        {/* Call Button */}
        <a
          href="tel:8144065688"
          className="
            px-5 py-2.5
            bg-[var(--primary)]
            hover:bg-[var(--primary-dark)]
            text-white
            font-medium
            rounded-xl
            text-sm
            flex items-center gap-2
            shadow
            transition-colors
          "
        >
          <span>📞 Call 81440 65688</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/918144065688"
          target="_blank"
          rel="noreferrer"
          className="
            px-5 py-2.5
            bg-white
            border border-[var(--secondary)]
            text-[var(--text)]
            hover:bg-[var(--secondary-light)]
            font-medium
            rounded-xl
            text-sm
            flex items-center gap-2
            shadow-sm
            transition-colors
          "
        >
          <span>💬 Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
