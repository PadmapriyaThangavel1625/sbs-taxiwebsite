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
        py-8

        sm:py-10

        md:py-12

        lg:py-14
      "
    >
      {/* =====================================================
          SAME WIDTH STRUCTURE
      ====================================================== */}

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
            HEADING
        ==================================================== */}

        <div
          className="
            mb-6
            text-center

            sm:mb-8

            md:mb-9
          "
        >
          <h2
            className="
              text-xl
              font-bold
              leading-tight
              text-heading

              sm:text-2xl

              md:text-3xl

              lg:text-[32px]
            "
          >
            Exclusive Offers
          </h2>

          <div
            className="
              mx-auto
              mt-2
              h-1
              w-10
              rounded-full
              bg-[var(--secondary)]

              sm:mt-3
              sm:w-12
            "
          />
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