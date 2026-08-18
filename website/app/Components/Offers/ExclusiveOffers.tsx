"use client";

import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Gift,
  Luggage,
  Percent,
  X,
} from "lucide-react";

interface Offer {
  id: string;
  tag: string;
  title: string;
  description: string;
  code?: string;
  customBody?: string;
  bg: string;
  text: string;
  tagBg: string;
  action: string;
  enquire?: boolean;
  icon: "gift" | "coupon" | "luggage" | "briefcase";
}

export default function ExclusiveOffers() {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedOffer, setSelectedOffer] =
    useState<Offer | null>(null);

  const offers: Offer[] = [
    {
      id: "new-user",
      tag: "NEW USER OFFER",
      title: "₹50 OFF",
      description: "On First 3 Bookings",
      code: "SBSNEW50",
      bg: "bg-gradient-to-br from-[#0047ab] via-[#1e6091] to-[#184e77]",
      text: "text-white",
      tagBg: "bg-[#FFD23F] text-[#041e43]",
      action: "Book Now",
      icon: "gift",
    },

    {
      id: "regular",
      tag: "REGULAR OFFER",
      title: "₹20 OFF",
      description:
        "On Every Booking\nAfter First 3 Bookings",
      code: "SBSREGULAR20",
      bg: "bg-[#FFD23F]",
      text: "text-[#041e43]",
      tagBg: "bg-[#041e43] text-white",
      action: "Book Now",
      icon: "coupon",
    },

    {
      id: "weekend",
      tag: "WEEKEND OFFER",
      title: "10% OFF",
      description:
        "On Outstation Trips\n(Round Trip)",
      code: "SBSWEEKEND10",
      bg: "bg-gradient-to-br from-[#eef4f8] to-[#d6e2ec]",
      text: "text-[#041e43]",
      tagBg: "bg-[#24428f] text-white",
      action: "Book Now",
      icon: "luggage",
    },

    {
      id: "corporate",
      tag: "CORPORATE OFFER",
      title: "15% OFF",
      description:
        "Special pricing for corporate bookings",
      customBody:
        "Contact us for special corporate pricing.",
      bg: "bg-gradient-to-br from-[#e2f6eb] to-[#c7e9d7]",
      text: "text-[#041e43]",
      tagBg: "bg-[#2d6a4f] text-white",
      action: "Explore Now",
      enquire: true,
      icon: "briefcase",
    },
  ];

  const handleOfferClick = (
    offer: Offer
  ) => {
    if (offer.enquire) {
      setSelectedOffer(offer);
      setDialogOpen(true);
      return;
    }

    const booking =
      document.getElementById("booking");

    if (booking) {
      booking.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(
        'Booking section with id="booking" was not found.'
      );
    }
  };

  return (
    <>
      {/* =====================================================
          OFFERS SECTION
      ====================================================== */}

      <section
        className="
          w-full
          bg-white
          py-12
          sm:py-14
          md:py-16
          lg:py-20
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
          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              mx-auto
              mb-10
              max-w-3xl
              text-center
              sm:mb-12
            "
          >
            <div
              className="
                mb-4
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-gray-300
                  sm:w-20
                  md:w-28
                "
              />

              <span
                className="
                  rounded-full
                  bg-[#24428f]
                  px-4
                  py-2
                  font-[var(--font-jakarta)]
                  text-[10px]
                  font-bold
                  tracking-[0.15em]
                  text-white
                  sm:text-xs
                "
              >
                EXCLUSIVE OFFERS
              </span>

              <span
                className="
                  h-px
                  w-10
                  bg-gray-300
                  sm:w-20
                  md:w-28
                "
              />
            </div>

            <h2
              className="
                font-[family-name:var(--font-instrument)]
                text-4xl
                font-normal
                leading-tight
                text-[#041e43]
                sm:text-5xl
                md:text-6xl
              "
            >
              Special Offers for
              <span
                className="
                  block
                  text-[#24428f]
                "
              >
                Every Journey
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                font-[var(--font-jakarta)]
                text-sm
                leading-7
                text-gray-500
                sm:text-base
              "
            >
              Save more on every ride with exclusive
              discounts and special offers from SBS Taxi.
            </p>
          </div>

          {/* =================================================
              CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="
                  group
                  flex
                  min-h-[390px]
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  mb-5
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* =========================================
                    CARD TOP
                ========================================== */}

                <div
                  className={`
                    ${offer.bg}
                    ${offer.text}
                    relative
                    min-h-[210px]
                    overflow-hidden
                    p-5
                  `}
                >
                  {/* DECORATION */}

                  <div
                    className="
                      absolute
                      -right-12
                      -top-12
                      h-36
                      w-36
                      rounded-full
                      bg-white/10
                    "
                  />

                  <div
                    className="
                      absolute
                      -bottom-16
                      -left-10
                      h-32
                      w-32
                      rounded-full
                      bg-white/10
                    "
                  />

                  {/* TEXT */}

                  <div
                    className="
                      relative
                      z-10
                    "
                  >
                    <span
                      className={`
                        ${offer.tagBg}
                        inline-flex
                        rounded-md
                        px-3
                        py-1.5
                        mb-5
                        font-[var(--font-jakarta)]
                        text-[9px]
                        font-extrabold
                        tracking-wider
                      `}
                    >
                      {offer.tag}
                    </span>

                    <h3
                      className="
                        mt-4
                        font-[var(--font-jakarta)]
                        text-3xl
                        font-extrabold
                      "
                    >
                      {offer.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[72%]
                        whitespace-pre-line
                        font-[var(--font-jakarta)]
                        text-xs
                        leading-5
                        opacity-90
                      "
                    >
                      {offer.description}
                    </p>
                  </div>

                  {/* ICON */}

                  <div
                    className="
                      absolute
                      bottom-5
                      right-5
                      flex
                      h-20
                      
                      w-20
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white/15
                      backdrop-blur-sm
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    {offer.icon === "gift" && (
                      <Gift
                        size={42}
                        strokeWidth={1.5}
                      />
                    )}

                    {offer.icon === "coupon" && (
                      <Percent
                        size={42}
                        strokeWidth={1.5}
                      />
                    )}

                    {offer.icon === "luggage" && (
                      <Luggage
                        size={42}
                        strokeWidth={1.5}
                      />
                    )}

                    {offer.icon ===
                      "briefcase" && (
                      <BriefcaseBusiness
                        size={42}
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                </div>

                {/* =========================================
                    CARD BODY
                ========================================== */}

                <div
                  className="
                    flex
                    min-h-[85px]
                    flex-1
                    items-center
                    px-5
                    py-4
                  "
                >
                  {offer.enquire ? (
                    <p
                      className="
                        whitespace-pre-line
                        font-[var(--font-jakarta)]
                        text-xs
                        leading-5
                        text-gray-500
                      "
                    >
                      {offer.customBody}
                    </p>
                  ) : (
                    <div
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <span
                        className="
                          font-[var(--font-jakarta)]
                          text-xs
                          font-medium
                          text-gray-500
                        "
                      >
                        Use Code
                      </span>

                      <span
                        className="
                          rounded-lg
                          border
                          border-dashed
                          border-[#24428f]
                          bg-[#24428f]/5
                          px-3
                          py-1.5
                          font-[var(--font-jakarta)]
                          text-xs
                          font-bold
                          tracking-wider
                          text-[#24428f]
                        "
                      >
                        {offer.code}
                      </span>
                    </div>
                  )}
                </div>

                {/* =========================================
                    BUTTON
                ========================================== */}

                <div
                  className="
                    border-t
                    border-gray-100
                    p-4
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleOfferClick(offer)
                    }
                    className="
                      group/button
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[var(--primary)]
                      px-5
                      py-3.5
                      font-[var(--font-jakarta)]
                      text-sm
                      font-bold
                      text-white
                      transition-all
                      duration-200
                      hover:bg-[var(--primary-dark)]
                      hover:shadow-lg
                      focus:outline-none
                    "
                  >
                    {offer.action}

                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        duration-200
                        group-hover/button:translate-x-1
                      "
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DIALOG
      ====================================================== */}

      {dialogOpen &&
        selectedOffer && (
          <div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              bg-black/60
              p-4
              backdrop-blur-sm
            "
            onClick={() =>
              setDialogOpen(false)
            }
          >
            <div
              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-2xl
              "
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* CLOSE BUTTON */}

              <button
                type="button"
                aria-label="Close"
                onClick={() =>
                  setDialogOpen(false)
                }
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-gray-600
                  shadow-md
                  transition
                  hover:bg-gray-100
                  hover:text-[#041e43]
                  focus:outline-none
                "
              >
                <X size={18} />
              </button>

              {/* DIALOG HEADER */}

              <div
                className="
                  bg-gradient-to-br
                  from-[#041e43]
                  via-[#123b70]
                  to-[#24428f]
                  px-6
                  py-8
                  text-white
                "
              >
                <span
                  className="
                    inline-flex
                    rounded-md
                    bg-[#FFD23F]
                    px-3
                    mb-5
                    py-1.5
                    font-[var(--font-jakarta)]
                    text-[9px]
                    font-extrabold
                    tracking-wider
                    text-[#041e43]
                  "
                >
                  {selectedOffer.tag}
                </span>

                <h3
                  className="
                    mt-4
                    font-[var(--font-jakarta)]
                    text-3xl
                    !text-[var(--text-primary)]
                    font-extrabold
                  "
                >
                  {selectedOffer.title}
                </h3>

                <p
                  className="
                    mt-2
                    font-[var(--font-jakarta)]
                    text-sm
                    leading-6
                    text-white/75
                  "
                >
                  {selectedOffer.description}
                </p>
              </div>

              {/* DIALOG CONTENT */}

              <div className="p-6">
                <h4
                  className="
                    font-[var(--font-jakarta)]
                    text-lg
                    font-bold
                    mb-5
                    text-[#041e43]
                  "
                >
                  Corporate Travel
                </h4>

                <p
                  className="
                    mt-2
                    font-[var(--font-jakarta)]
                    text-sm
                    leading-6
                    text-gray-500
                  "
                >
                  Get special pricing and dedicated
                  support for your corporate travel
                  requirements.
                </p>

                <div
                  className="
                    mt-5
                    space-y-3
                  "
                >
                  {[
                    "Special corporate pricing",
                    "Dedicated travel support",
                    "Flexible booking options",
                  ].map((item) => (
                    <div
                      key={item}
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-gray-50
                        px-4
                        py-3
                      "
                    >
                      <div
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-[#FFD23F]
                        "
                      />

                      <span
                        className="
                          font-[var(--font-jakarta)]
                          text-sm
                          font-medium
                          text-gray-700
                        "
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="
                    mt-6
                    flex
                    gap-3
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setDialogOpen(false)
                    }
                    className="
                      flex-1
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      py-3
                      font-[var(--font-jakarta)]
                      text-sm
                      font-bold
                      text-gray-600
                      hover:bg-gray-50
                    "
                  >
                    Close
                  </button>

                  <a
                    href="tel:+919843544844"
                    className="
                      flex-1
                      rounded-xl
                      bg-[#041e43]
                      px-4
                      py-3
                      text-center
                      font-[var(--font-jakarta)]
                      text-sm
                      font-bold
                      !text-[var(--text-primary)]
                      hover:bg-[#062958]
                    "
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}