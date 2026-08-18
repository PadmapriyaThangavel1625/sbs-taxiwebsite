"use client";

import {
  Headphones,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export default function BottomCTA() {
  const goToFAQ = () => {
    const faqSection = document.getElementById("faq");

    if (faqSection) {
      faqSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="bg-[var(--primary)] py-8">
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-6
          px-4
          sm:px-6
          lg:grid-cols-3
          lg:gap-0
          lg:px-8
        "
      >
        {/* =====================================================
            HAVE QUESTIONS
        ====================================================== */}

        <button
          type="button"
          onClick={goToFAQ}
          className="
            group
            flex
            w-full
            items-center
            space-x-4
            border-b
            border-white/20
            pb-6
            text-left

            lg:border-b-0
            lg:border-r
            lg:pb-0
            lg:pr-6
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-[var(--secondary)]
              transition-all
              duration-200
              group-hover:bg-white/15
              group-hover:scale-105
            "
          >
            <Headphones className="h-6 w-6" />
          </div>

          <div>
            <h4
              className="
                font-[family-name:var(--font-jakarta)]
                text-base
                font-semibold
                !text-white
                transition-colors
                duration-200
                group-hover:text-[var(--secondary)]
              "
            >
              Have Questions?
            </h4>

            <p
              className="
                mt-0.5
                font-[family-name:var(--font-jakarta)]
                text-xs
                !text-white/70
                sm:text-sm
              "
            >
              We're here to help you 24/7
            </p>
          </div>
        </button>

        {/* =====================================================
            PHONE
        ====================================================== */}

        <div
          className="
            flex
            items-center
            space-x-4
            border-b
            border-white/20
            pb-6

            lg:border-b-0
            lg:border-r
            lg:px-6
            lg:pb-0
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-[var(--secondary)]
            "
          >
            <PhoneCall className="h-6 w-6" />
          </div>

          <div>
            <a
              href="tel:+919843544844"
              className="
                font-[family-name:var(--font-jakarta)]
                text-lg
                font-bold
                !text-white
                hover:text-[var(--secondary)]
                hover:underline
              "
            >
              98435 44844
            </a>

            <p
              className="
                mt-0.5
                font-[family-name:var(--font-jakarta)]
                text-xs
                !text-white/70
                sm:text-sm
              "
            >
              Book a Ride
            </p>
          </div>
        </div>

        {/* =====================================================
            WHATSAPP
        ====================================================== */}

        <a
          href="https://wa.me/919843544844"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-center
            space-x-4
            lg:pl-6
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-[var(--secondary)]
              transition-all
              duration-200
              group-hover:bg-white/15
              group-hover:scale-105
            "
          >
            <MessageCircle className="h-6 w-6" />
          </div>

          <div>
            <h4
              className="
                font-[family-name:var(--font-jakarta)]
                text-base
                font-semibold
                !text-white
                group-hover:text-[var(--secondary)]
              "
            >
              Chat on WhatsApp
            </h4>

            <p
              className="
                mt-0.5
                font-[family-name:var(--font-jakarta)]
                text-xs
                !text-white/70
                sm:text-sm
              "
            >
              Quick support
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}