import {
  Headphones,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export default function BottomCTA() {
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
        {/* Item 1 */}
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
        </div>

        {/* Item 2 */}
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
              href="tel:98435 44844"
              className="
                font-[family-name:var(--font-jakarta)]
                text-lg
                font-bold
                !text-white
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
              Call Us Now
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <a
          href="https://wa.me/9843544844"
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
              transition-colors
              group-hover:bg-white/15
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