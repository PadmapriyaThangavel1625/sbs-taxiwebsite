import OfferCard from "./OfferCard";

export default function ExclusiveOffers() {
  const offers = [
    {
      tag: "NEW USER OFFER",
      title: "₹50 OFF",
      description: "On First 3 Bookings",
      code: "SBSNEW50",
      bgGradient:
        "bg-gradient-to-br from-[#0047ab] via-[#1e6091] to-[#184e77]",
      textColor: "text-white",
      tagBg: "bg-[#fca311] text-[#0d1b2a]",
      actionText: "Book Now",
      isEnquire: false,
      illustrationType: "gift",
    },
    {
      tag: "REGULAR OFFER",
      title: "₹20 OFF",
      description: "On Every Booking\nAfter First 3 Bookings",
      code: "SBS20",
      bgGradient: "bg-[#ffcd38]",
      textColor: "text-[#0d1b2a]",
      tagBg: "bg-[#0d1b2a] text-white",
      actionText: "Book Now",
      isEnquire: false,
      illustrationType: "coupon",
    },
    {
      tag: "WEEKEND OFFER",
      title: "10% OFF",
      description: "On Outstation Trips\n(Round Trip)",
      code: "SBSOUT10",
      bgGradient:
        "bg-gradient-to-b from-[#eef4f8] to-[#d6e2ec]",
      textColor: "text-[#0d1b2a]",
      tagBg: "bg-[#1d3557] text-white",
      actionText: "Book Now",
      isEnquire: false,
      illustrationType: "luggage",
    },
    {
      tag: "CORPORATE OFFER",
      title: "15% OFF",
      description: "For Corporate\nBookings",
      code: "",
      customBody: "Contact Us For\nSpecial Corporate Pricing",
      bgGradient:
        "bg-gradient-to-b from-[#e2f6eb] to-[#c7e9d7]",
      textColor: "text-[#0d1b2a]",
      tagBg: "bg-[#2d6a4f] text-white",
      actionText: "Enquire Now",
      isEnquire: true,
      illustrationType: "briefcase",
    },
  ];

  return (
    <section
      className="
        section-bg
        w-full
        py-10
        sm:py-12
        md:py-14
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            SECTION HEADING
        ==================================================== */}
        <div
          className="
            mb-8
            text-center
            sm:mb-10
            md:mb-12
          "
        >
          {/* Label */}
          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-16
                bg-slate-300
                sm:w-24
                md:w-32
              "
            />

            <span
              className="
                rounded-full
                bg-[#24428f]
                px-6
                py-2
                text-xs
                font-bold
                tracking-[0.12em]
                text-white
              "
            >
              EXCLUSIVE OFFERS
            </span>

            <span
              className="
                h-px
                w-16
                bg-slate-300
                sm:w-24
                md:w-32
              "
            />
          </div>

          {/* Main Heading */}
          <h2
            className="
              font-serif
              text-3xl
              leading-tight
              text-black
              sm:text-4xl
              md:text-5xl
            "
          >
            Special Offers for Every Journey
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-sm
              leading-7
              text-gray-700
              sm:text-base
            "
          >
            Save more on your rides with exclusive discounts and
            special offers designed to make every journey with SBS
            Taxi more rewarding.
          </p>
        </div>

        {/* ===================================================
            OFFERS GRID
        ==================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-4
            lg:gap-5
            xl:gap-6
          "
        >
          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              {...offer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}