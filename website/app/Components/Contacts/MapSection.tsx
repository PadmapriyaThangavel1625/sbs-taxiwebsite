
export default function MapSection() {
  return (
    <section
      className="
        h-full
        font-[family-name:var(--font-jakarta)]
      "
    >
      {/* Heading */}
      <div className="mb-6">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-[var(--primary-light)]
            px-3
            py-1
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-[var(--primary)]
          "
        >
          Find Us
        </span>

        <h2
          className="
            mt-3
            font-[family-name:var(--font-instrument)]
            text-3xl
            font-normal
            tracking-tight
            text-[var(--text)]
            sm:text-4xl
          "
        >
          Our Location
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-[var(--muted)]
          "
        >
          Visit our office in Erode. We’re conveniently located at Municipal
          Colony Main Road.
        </p>
      </div>

      {/* Map Card */}
      <div
        className="
          relative
          h-[420px]
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-[var(--border)]
          bg-slate-100
          shadow-lg
        "
      >
        <iframe
          title="SBS Taxi Office Location"
          src="https://www.google.com/maps?q=1/166%20Vallalar%20Street,%20Municipal%20Colony%20Main%20Road,%20Erode,%20Tamil%20Nadu%20638004&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Location Overlay */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-4
            left-4
            right-4
            rounded-xl
            border
            border-white/20
            bg-black/70
            p-4
            text-white
            backdrop-blur-md
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#FFC107]
                text-slate-950
              "
            >
              📍
            </div>

            <div>
              <p className="text-sm font-bold">
                SBS Taxi Office
              </p>

              <p className="mt-0.5 text-xs leading-5 text-white/75">
                1/166, Vallalar Street, Municipal Colony Main Road,
                Erode – 638004
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
