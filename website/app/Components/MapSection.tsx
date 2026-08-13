import { MapPin, ExternalLink } from "lucide-react";

export default function MapSection() {
  return (
    <section
      className="
        w-full
        font-[family-name:var(--font-jakarta)]
      "
    >
      {/* =====================================================
          HEADING
      ====================================================== */}

      <div className="mb-6 sm:mb-7">
        <h2
          className="
            font-[family-name:var(--font-instrument)]
            text-3xl
            font-normal
            tracking-tight
            text-[var(--text)]
            sm:text-4xl
            lg:text-[2.5rem]
          "
        >
          Visit SBS Taxi
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-[var(--muted)]
            sm:text-[15px]
          "
        >
          Find our office in Erode and get in touch with
          the SBS Taxi team for reliable and comfortable
          transportation services.
        </p>
      </div>

      {/* =====================================================
          MAP CARD
      ====================================================== */}

      <div
        className="
          relative
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-[var(--border)]
          bg-slate-100
          shadow-lg
          shadow-slate-900/5
        "
      >
        {/* GOOGLE MAP */}

        <div
          className="
            h-[320px]
            w-full
            sm:h-[380px]
            lg:h-[420px]
          "
        >
          <iframe
            title="SBS Taxi Office Location"
            src="https://www.google.com/maps?q=1/166%20Vallalar%20Street,%20Municipal%20Colony%20Main%20Road,%20Erode,%20Tamil%20Nadu%20638004&output=embed"
            className="
              h-full
              w-full
              border-0
            "
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* ===================================================
            LOCATION CARD
        ==================================================== */}

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            sm:bottom-5
            sm:left-5
            sm:right-auto
            sm:w-[380px]
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-white/20
              bg-slate-950/85
              p-4
              text-white
              shadow-xl
              backdrop-blur-md
              sm:p-5
            "
          >
            <div className="flex items-start gap-3.5">

              {/* LOCATION ICON */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#FFC107]
                  text-slate-950
                  shadow-sm
                "
              >
                <MapPin
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </div>

              {/* ADDRESS */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  SBS Taxi 
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-white/70
                    sm:text-[13px]
                  "
                >
                  1/166, Vallalar Street,
                  Municipal Colony Main Road,
                  Erode – 638004,
                  Tamil Nadu
                </p>
              </div>
            </div>

            {/* =================================================
                DIRECTIONS LINK
            ================================================== */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=1/166+Vallalar+Street,+Municipal+Colony+Main+Road,+Erode,+Tamil+Nadu+638004"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[var(--secondary)]
                px-4
                py-2.5
                text-xs
                !text-black
                font-bold
                text-slate-900
                transition-all
                duration-200
                hover:bg-[var(--secondary-dark)]
                hover:text-slate-950
                focus:outline-none
                focus:ring-2
                focus:ring-white/60
              "
            >
              <span>Get Directions</span>

              <ExternalLink
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}