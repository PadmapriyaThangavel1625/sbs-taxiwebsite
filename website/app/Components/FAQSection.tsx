"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Search,
  CarFront,
  IndianRupee,
  ShieldCheck,
  CreditCard,
  Headphones,
  Users,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

/* ============================================================
   FAQ DATA
============================================================ */

const faqs: FAQ[] = [
  /* =========================
     BOOKING
  ========================= */

  {
    id: 1,
    question: "How do I book an SBS Taxi?",
    answer:
      "You can book through our website, mobile app, or by calling our customer support.",
    category: "Booking",
  },
  {
    id: 2,
    question: "Can I book a taxi in advance?",
    answer:
      "Yes. You can schedule your ride for any future date and time.",
    category: "Booking",
  },
  {
    id: 3,
    question: "Do you provide instant bookings?",
    answer: "Yes, subject to vehicle availability.",
    category: "Booking",
  },
  {
    id: 4,
    question: "Can I cancel my booking?",
    answer:
      "Yes. Cancellation policies may apply depending on the booking type.",
    category: "Booking",
  },

  /* =========================
     SERVICES
  ========================= */

  {
    id: 5,
    question: "What services do you offer?",
    answer:
      "We provide Local City Rides, Airport Pickup & Drop, Outstation Trips, One-Way Trips, Round Trips, Corporate Travel, and Hourly Rental Packages.",
    category: "Services",
  },
  {
    id: 6,
    question: "Do you provide airport pickup?",
    answer:
      "Yes, we provide 24/7 airport pickup and drop services.",
    category: "Services",
  },
  {
    id: 7,
    question: "Do you offer corporate accounts?",
    answer:
      "Yes. We offer customized corporate travel solutions for businesses.",
    category: "Services",
  },

  /* =========================
     FLEET
  ========================= */

  {
    id: 8,
    question: "What vehicle types are available?",
    answer:
      "We offer SBS Mini, SBS Sedan, SBS Van, SBS SUV, SBS MUV, SBS EV, SBS Premium, SBS Luxury, and SBS Traveller.",
    category: "Fleet",
  },
  {
    id: 9,
    question: "Can I choose my preferred vehicle?",
    answer:
      "Yes, you can select your preferred vehicle during booking.",
    category: "Fleet",
  },

  /* =========================
     PRICING
  ========================= */

  {
    id: 10,
    question: "How is the fare calculated?",
    answer:
      "The fare depends on the trip distance, vehicle type, and travel duration.",
    category: "Pricing",
  },
  {
    id: 11,
    question: "Are there any hidden charges?",
    answer:
      "No. SBS Taxi follows transparent pricing with no hidden charges.",
    category: "Pricing",
  },
  {
    id: 12,
    question: "Is online payment available?",
    answer:
      "Yes. We accept UPI, credit/debit cards, net banking, and cash.",
    category: "Pricing",
  },

  /* =========================
     DRIVERS
  ========================= */

  {
    id: 13,
    question: "Are your drivers verified?",
    answer:
      "Yes. All SBS Taxi drivers are background-verified and professionally trained.",
    category: "Drivers",
  },
  {
    id: 14,
    question: "Can I contact my driver before pickup?",
    answer:
      "Yes. Driver contact details are shared before your trip.",
    category: "Drivers",
  },

  /* =========================
     SAFETY
  ========================= */

  {
    id: 15,
    question: "Is SBS Taxi safe for women and families?",
    answer:
      "Yes. Passenger safety is our top priority with verified drivers and trip tracking.",
    category: "Safety",
  },
  {
    id: 16,
    question: "Can I share my trip with family?",
    answer:
      "Yes. You can share your live trip details with your family or friends.",
    category: "Safety",
  },

  /* =========================
     PAYMENTS
  ========================= */

  {
    id: 17,
    question: "Which payment methods are accepted?",
    answer:
      "Cash, UPI, debit cards, credit cards, and online payments are accepted.",
    category: "Payments",
  },
  {
    id: 18,
    question: "Will I receive an invoice?",
    answer:
      "Yes. A digital invoice is sent after every completed trip.",
    category: "Payments",
  },

  /* =========================
     SUPPORT
  ========================= */

  {
    id: 19,
    question: "How can I contact customer support?",
    answer:
      "Contact us by phone, email, or through the in-app support section.",
    category: "Support",
  },
  {
    id: 20,
    question: "What are your customer support hours?",
    answer:
      "Our customer support is available 24×7.",
    category: "Support",
  },

  /* =========================
     GENERAL
  ========================= */

  {
    id: 21,
    question: "Do you operate 24×7?",
    answer:
      "Yes. SBS Taxi is available 24 hours a day, 7 days a week.",
    category: "General",
  },
  {
    id: 22,
    question: "Which cities do you serve?",
    answer:
      "We primarily serve Erode and nearby locations, with outstation services across Tamil Nadu and neighboring states.",
    category: "General",
  },
  {
    id: 23,
    question: "Can I book a taxi for an entire day?",
    answer:
      "Yes. We offer flexible hourly and full-day rental packages.",
    category: "General",
  },
  {
    id: 24,
    question: "Do you provide GST invoices for business travel?",
    answer:
      "Yes. GST invoices are available for eligible bookings.",
    category: "General",
  },
  {
    id: 25,
    question: "Why should I choose SBS Taxi?",
    answer:
      "We offer transparent pricing, verified drivers, clean and comfortable vehicles, 24/7 availability, multiple vehicle options, secure online payments, reliable customer support, and a safe and comfortable travel experience.",
    category: "General",
  },
];

/* ============================================================
   CATEGORY DATA
   "ALL" REMOVED
============================================================ */

const categories = [
  {
    name: "Booking",
    icon: CarFront,
  },
  {
    name: "Services",
    icon: Headphones,
  },
  {
    name: "Fleet",
    icon: CarFront,
  },
  {
    name: "Pricing",
    icon: IndianRupee,
  },
  {
    name: "Safety",
    icon: ShieldCheck,
  },
  {
    name: "Payments",
    icon: CreditCard,
  },
  {
    name: "Support",
    icon: Users,
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("Booking");
  const [openId, setOpenId] = useState<number | null>(1);
  const [search, setSearch] = useState("");

  /* ==========================================================
     FILTER FAQ
  ========================================================== */

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      faq.category === activeCategory;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      faq.question.toLowerCase().includes(searchText) ||
      faq.answer.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  /* ==========================================================
     TOGGLE FAQ
  ========================================================== */

  const toggleFAQ = (id: number) => {
    setOpenId((current) =>
      current === id ? null : id
    );
  };

  /* ==========================================================
     RESET
  ========================================================== */

  const resetFAQ = () => {
    setSearch("");
    setActiveCategory("Booking");
    setOpenId(1);
  };

  /* ==========================================================
     CATEGORY CHANGE
  ========================================================== */

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setSearch("");

    const firstFAQ = faqs.find(
      (faq) => faq.category === category
    );

    setOpenId(firstFAQ?.id ?? null);
  };

  return (
    <section
      className="
        w-full
        bg-[var(--background)]
        py-10
        font-[family-name:var(--font-jakarta)]

        sm:py-12
        md:py-16
        lg:py-20
      "
    >
      {/* ====================================================
          SAME CONTAINER AS NAVBAR + HERO + TRUST BADGES
      ===================================================== */}

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
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          {/* BADGE */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[var(--primary)]/10
              px-4
              py-2
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[var(--primary)]
              sm:text-xs
            "
          >
            <HelpCircle
              className="
                h-3.5
                w-3.5
                sm:h-4
                sm:w-4
              "
            />

            Frequently Asked Questions
          </div>

          {/* HEADING */}

          <h2
            className="
              font-[family-name:var(--font-instrument)]
              text-4xl
              font-normal
              leading-tight
              tracking-tight
              text-[var(--text)]

              sm:text-5xl
              lg:text-6xl
            "
          >
            Everything You Need to Know
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-[var(--muted)]

              sm:text-base
              sm:leading-7
            "
          >
            Find quick answers about SBS Taxi bookings,
            services, pricing, vehicles, payments and
            customer support.
          </p>
        </div>

        {/* ====================================================
            SEARCH
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-8
            w-full
            max-w-2xl

            sm:mt-10
          "
        >
          <div
            className="
              group
              flex
              w-full
              items-center
              rounded-2xl
              border
              border-[var(--border)]
              bg-white

              shadow-[0_8px_30px_rgba(15,23,42,0.05)]

              transition-shadow
              duration-200

              focus-within:shadow-[0_8px_30px_rgba(15,23,42,0.05)]
            "
          >
            {/* SEARCH ICON */}

            <Search
              className="
                ml-4
                h-5
                w-5
                shrink-0
                text-[var(--muted)]

                sm:ml-5
              "
            />

            {/* INPUT */}

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                if (e.target.value.trim()) {
                  setOpenId(null);
                }
              }}
              placeholder="Search your question..."
              aria-label="Search frequently asked questions"
              className="
                w-full
                border-0
                bg-transparent
                px-4
                py-3.5
                text-sm
                font-medium
                text-[var(--text)]
                outline-none
                ring-0
                focus:border-0
                focus:outline-none
                focus:ring-0
                placeholder:text-gray-400

                sm:px-5
                sm:py-4
                sm:text-base
              "
            />

            {/* CLEAR BUTTON */}

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setOpenId(
                    faqs.find(
                      (faq) =>
                        faq.category === activeCategory
                    )?.id ?? null
                  );
                }}
                aria-label="Clear search"
                className="
                  mr-3
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-sm
                  font-bold
                  text-gray-500
                  transition-colors
                  hover:bg-gray-200
                "
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* ====================================================
            CATEGORY FILTER
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-7
            flex
            w-full
            gap-2
            overflow-x-auto
            pb-2

            scrollbar-none

            lg:justify-center
            lg:overflow-visible
          "
        >
          {categories.map((category) => {
            const Icon = category.icon;

            const active =
              activeCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() =>
                  changeCategory(category.name)
                }
                className={`
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  transition-all
                  duration-200

                  sm:text-sm

                  ${
                    active
                      ? `
                        border-[var(--primary)]
                        bg-[var(--primary)]
                        !text-white
                        shadow-md
                      `
                      : `
                        border-[var(--border)]
                        bg-white
                        text-[var(--text)]
                        hover:border-[var(--primary)]
                        hover:text-[var(--primary)]
                      `
                  }
                `}
              >
                <Icon className="h-4 w-4" />

                {category.name}
              </button>
            );
          })}
        </div>

        {/* ====================================================
            FAQ LIST
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-8
            w-full

            sm:mt-10
          "
        >
          {filteredFaqs.length > 0 ? (
            <div className="w-full space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`
                      w-full
                      overflow-hidden
                      rounded-2xl
                      border
                      transition-all
                      duration-300

                      ${
                        isOpen
                          ? `
                            border-[var(--primary)]/30
                            bg-white
                            shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                          `
                          : `
                            border-[var(--border)]
                            bg-white
                            hover:border-[var(--primary)]/30
                            hover:shadow-[0_6px_20px_rgba(15,23,42,0.04)]
                          `
                      }
                    `}
                  >
                    {/* ==================================================
                        QUESTION
                    =================================================== */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleFAQ(faq.id)
                      }
                      aria-expanded={isOpen}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                        px-4
                        py-4
                        text-left

                        sm:gap-4
                        sm:px-6
                        sm:py-5
                      "
                    >
                      <div
                        className="
                          flex
                          min-w-0
                          items-start
                          gap-3
                        "
                      >
                        {/* NUMBER */}

                        <span
                          className={`
                            mt-0.5
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-[11px]
                            font-bold
                            transition-all
                            duration-300

                            ${
                              isOpen
                                ? `
                                  bg-[var(--primary)]
                                  !text-white
                                `
                                : `
                                  bg-[var(--primary)]/10
                                  text-[var(--primary)]
                                `
                            }
                          `}
                        >
                          {faq.id}
                        </span>

                        {/* QUESTION */}

                        <span
                          className={`
                            pr-1
                            text-sm
                            font-bold
                            leading-6
                            transition-colors
                            duration-200

                            sm:pr-2
                            sm:text-base

                            ${
                              isOpen
                                ? "text-[var(--primary)]"
                                : "text-[var(--text)]"
                            }
                          `}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* CHEVRON */}

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          transition-all
                          duration-300

                          ${
                            isOpen
                              ? `
                                rotate-180
                                bg-[var(--primary)]
                                !text-white
                              `
                              : `
                                bg-gray-100
                                text-gray-600
                              `
                          }
                        `}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    {/* ==================================================
                        ANSWER
                    =================================================== */}

                    <div
                      className={`
                        grid
                        transition-all
                        duration-300
                        ease-in-out

                        ${
                          isOpen
                            ? `
                              grid-rows-[1fr]
                              opacity-100
                            `
                            : `
                              grid-rows-[0fr]
                              opacity-0
                            `
                        }
                      `}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="
                            border-t
                            border-[var(--border)]
                            px-4
                            pb-5
                            pt-4

                            sm:px-6
                            sm:pb-6
                          "
                        >
                          <p
                            className="
                              pl-10
                              text-sm
                              leading-7
                              text-[var(--muted)]

                              sm:text-[15px]
                            "
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ==================================================
               NO RESULTS
            ================================================== */

            <div
              className="
                w-full
                rounded-2xl
                border
                border-dashed
                border-[var(--border)]
                px-5
                py-12
                text-center

                sm:px-6
                sm:py-14
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]/10
                  text-[var(--primary)]
                "
              >
                <Search className="h-5 w-5" />
              </div>

              <h3
                className="
                  mt-4
                  text-base
                  font-bold
                  text-[var(--text)]
                "
              >
                No questions found
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-[var(--muted)]
                "
              >
                Try a different search term or
                select another category.
              </p>

              <button
                type="button"
                onClick={resetFAQ}
                className="
                  mt-5
                  rounded-xl
                  bg-[var(--primary)]
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  !text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[var(--primary-dark)]
                  hover:shadow-md
                "
              >
                View Booking Questions
              </button>
            </div>
          )}
        </div>

        {/* ====================================================
            SUPPORT CTA
        ===================================================== */}

        <div
          className="
            mt-10
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-[var(--primary)]/20
            bg-[var(--primary)]/[0.04]
            p-5

            sm:mt-12
            sm:p-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* SUPPORT CONTENT */}

            <div
              className="
                flex
                min-w-0
                items-start
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]
                  !text-white
                "
              >
                <Headphones className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3
                  className="
                    text-base
                    font-bold
                    text-[var(--text)]
                  "
                >
                  Still have questions?
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-[var(--muted)]
                  "
                >
                  Our customer support team is
                  available 24×7 to help you.
                </p>
              </div>
            </div>

            {/* CONTACT BUTTON */}

            <a
              href="tel:+919843544844"
              className="
                inline-flex
                w-full
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]
                px-5
                py-3
                text-sm
                font-bold
                !text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--primary-dark)]
                hover:shadow-md

                sm:w-auto
              "
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}