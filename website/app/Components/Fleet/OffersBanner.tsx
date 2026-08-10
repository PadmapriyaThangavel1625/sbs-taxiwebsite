
export default function OffersBanner() {
  return (
    <section className="py-6 sm:py-8">
      <div
        className="
          container-custom
          flex
          flex-col
          gap-6
          rounded-xl
          bg-primary
          p-5
          text-white
          sm:p-6
          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:gap-8
        "
      >
        {/* Title */}
        <div className="min-w-0">
          <h2 className="text-xl font-bold sm:text-2xl">
            Exclusive Offers
          </h2>

          <p className="mt-1 text-sm leading-6 text-white/90 sm:text-base">
            Book through our app and get exciting discounts!
          </p>
        </div>

        {/* Offer 1 */}
        <div className="lg:shrink-0">
          <h2 className="text-xl font-bold sm:text-2xl">
            ₹50 OFF
          </h2>

          <p className="mt-1 text-sm text-white/90">
            On first 3 bookings
          </p>
        </div>

        {/* Offer 2 */}
        <div className="lg:shrink-0">
          <h2 className="text-xl font-bold sm:text-2xl">
            ₹20 OFF
          </h2>

          <p className="mt-1 text-sm text-white/90">
            On every booking after first 3
          </p>
        </div>

        {/* Button */}
        <button
          type="button"
          className="
            w-full
            rounded-lg
            bg-white
            px-6
            py-3
            font-bold
            text-primary
            transition
            hover:bg-primary-light
            sm:w-auto
            sm:px-8
          "
        >
          Download App
        </button>
      </div>
    </section>
  );
}
