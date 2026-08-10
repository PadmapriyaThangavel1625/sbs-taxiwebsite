
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
    <section className="section-bg py-8 sm:py-10 lg:py-12">
      <div className="container-custom">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2
            className="
              text-2xl
              font-bold
              text-heading
              sm:text-3xl
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
              bg-secondary
            "
          />
        </div>

        {/* Offers Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
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
