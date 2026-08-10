

import {
  Headphones,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export default function BottomCTA() {
  return (
    <section className="bg-[var(--primary-dark)] py-8">
      <div
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
          lg:gap-0
        "
      >
        {/* Item 1 */}
        <div
          className="
            flex items-center
            space-x-4
            border-b
            lg:border-b-0
            lg:border-r
            border-white/20
            pb-6
            lg:pb-0
            lg:pr-6
          "
        >
          <div
            className="
              w-12 h-12
              rounded-full
              bg-white/10
              flex items-center justify-center
              text-[var(--secondary)]
              shrink-0
            "
          >
            <Headphones className="w-6 h-6" />
          </div>

          <div>
            <h4 className="font-semibold text-white text-base">
              Have Questions?
            </h4>

            <p className="text-white/70 text-xs sm:text-sm mt-0.5">
              We're here to help you 24/7
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div
          className="
            flex items-center
            space-x-4
            border-b
            lg:border-b-0
            lg:border-r
            border-white/20
            pb-6
            lg:pb-0
            lg:pr-6
            lg:pl-6
          "
        >
          <div
            className="
              w-12 h-12
              rounded-full
              bg-white/10
              flex items-center justify-center
              text-[var(--secondary)]
              shrink-0
            "
          >
            <PhoneCall className="w-6 h-6" />
          </div>

          <div>
            <a
              href="tel:8144065688"
              className="
                font-bold
                text-white
                text-lg
                hover:underline
              "
            >
              81440 65688
            </a>

            <p className="text-white/70 text-xs sm:text-sm mt-0.5">
              Call Us Now
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <a
          href="https://wa.me/918144065688"
          target="_blank"
          rel="noreferrer"
          className="
            flex items-center
            space-x-4
            lg:pl-6
            group
          "
        >
          <div
            className="
              w-12 h-12
              rounded-full
              bg-white/10
              flex items-center justify-center
              text-[var(--secondary)]
              shrink-0
              group-hover:bg-white/15
              transition-colors
            "
          >
            <MessageCircle className="w-6 h-6" />
          </div>

          <div>
            <h4 className="font-semibold text-white text-base">
              Chat on WhatsApp
            </h4>

            <p className="text-white/70 text-xs sm:text-sm mt-0.5">
              Quick support
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
