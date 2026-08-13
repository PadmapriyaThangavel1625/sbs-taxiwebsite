"use client";

import {
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Luggage,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const terms = [
  {
    title: "Booking Confirmation",
    icon: FileText,
    points: [
      "All bookings are subject to vehicle and driver availability.",
      "A booking is confirmed only after receiving confirmation from SBS Taxi.",
      "Customers must provide accurate pickup, drop, date, time, and contact details.",
    ],
  },
  {
    title: "Fares & Payments",
    icon: CreditCard,
    points: [
      "Fares are calculated based on the selected vehicle category and travel distance.",
      "Toll charges, parking fees, state taxes, and other government charges (if applicable) are payable by the customer unless otherwise specified.",
      "Payments can be made through cash, UPI, debit/credit cards, net banking, or other supported digital payment methods.",
    ],
  },
  {
    title: "Cancellation Policy",
    icon: Clock3,
    points: [
      "Free cancellation is available up to the specified time before pickup (if applicable).",
      "Late cancellations or no-shows may attract cancellation charges.",
      "Refunds, where applicable, will be processed within the standard refund timeline.",
    ],
  },
  {
    title: "Waiting Charges",
    icon: Clock3,
    points: [
      "Complimentary waiting time may be provided depending on the booking type.",
      "Additional waiting time beyond the free limit may be charged.",
    ],
  },
  {
    title: "Customer Responsibilities",
    icon: UserCheck,
    points: [
      "Customers must treat drivers and vehicles with respect.",
      "Smoking, alcohol consumption, illegal substances, and unlawful activities inside the vehicle are strictly prohibited.",
      "Any damage caused by passengers or excessive cleaning required will be charged to the customer.",
    ],
  },
  {
    title: "Driver Responsibilities",
    icon: ShieldCheck,
    points: [
      "Drivers will follow traffic rules and ensure safe driving practices.",
      "Drivers may refuse service if passenger behavior is unsafe, abusive, or illegal.",
    ],
  },
  {
    title: "Luggage",
    icon: Luggage,
    points: [
      "Passengers are responsible for their personal belongings.",
      "SBS Taxi is not liable for lost, stolen, or forgotten items left in the vehicle.",
    ],
  },
  {
    title: "Delays & Force Majeure",
    icon: Clock3,
    points: [
      "SBS Taxi is not responsible for delays caused by traffic, road closures, weather conditions, natural disasters, strikes, or other events beyond our control.",
    ],
  },
  {
    title: "Safety",
    icon: ShieldCheck,
    points: [
      "Seat belts must be worn by all passengers.",
      "Children should be accompanied by a responsible adult.",
      "Customers must comply with all applicable traffic and safety regulations.",
    ],
  },
  {
    title: "Privacy Policy",
    icon: ShieldCheck,
    points: [
      "Customer information is collected only for booking, service delivery, customer support, and legal compliance.",
      "Personal information will not be shared with unauthorized third parties except where required by law.",
    ],
  },
  {
    title: "Liability",
    icon: ShieldCheck,
    points: [
      "SBS Taxi's liability is limited to the value of the booked service.",
      "SBS Taxi shall not be liable for indirect, incidental, or consequential damages arising from the use of the service.",
    ],
  },
  {
    title: "Service Refusal",
    icon: ShieldCheck,
    points: [
      "Incorrect booking information.",
      "Safety or security concerns.",
      "Fraudulent or suspicious activities.",
      "Violation of these Terms & Conditions.",
    ],
    description:
      "SBS Taxi reserves the right to refuse or cancel a booking in cases of incorrect information, safety concerns, suspicious activity, or violation of these Terms & Conditions.",
  },
  {
    title: "Amendments",
    icon: FileText,
    points: [
      "SBS Taxi reserves the right to update these Terms & Conditions at any time. The latest version will be published on the official website.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative w-full overflow-hidden bg-[var(--primary)]">
        <div className="absolute inset-0 bg-[var(--primary)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-8">
          <div className="max-w-4xl">

            <span
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--secondary)]
                sm:text-base
              "
            >
              Legal Information
            </span>

            <h1
              className="
                mt-4
                text-4xl
                font-extrabold
                leading-tight
                !text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Terms & Conditions
            </h1>

            <p
              className="
                mt-5
                max-w-3xl
                text-base
                leading-7
                text-blue-100/80
                sm:text-lg
                sm:leading-8
              "
            >
              Please read these Terms & Conditions carefully before booking
              or using SBS Taxi services.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="w-full bg-[var(--primary-light)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

          <div
            className="
              flex
              items-start
              gap-4
              rounded-2xl
              border
              border-[var(--primary)]/5
              bg-white
              p-5
              shadow-sm
              sm:gap-5
              sm:p-7
            "
          >

            {/* Icon */}
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--secondary)]/15
                sm:h-14
                sm:w-14
              "
            >
              <CheckCircle2
                size={27}
                strokeWidth={2}
                className="text-[var(--primary)]"
              />
            </div>

            {/* Content */}
            <div className="min-w-0">

              <h2
                className="
                  text-xl
                  font-extrabold
                  leading-tight
                  text-[var(--primary)]
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                Important Information
              </h2>

              <p
                className="
                  mt-3
                  max-w-6xl
                  text-sm
                  leading-7
                  text-gray-600
                  sm:text-base
                  sm:leading-8
                "
              >
                By booking or using SBS Taxi services, you acknowledge that
                you have read, understood, and agree to these Terms &
                Conditions.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          TERMS
      ====================================================== */}
      <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">

          {/* Section Heading */}
          <div className="mb-10 text-center sm:mb-12">

            <span
              className="
                !text-4xl
                !font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--secondary-dark)]
                sm:text-base
              "
            >
              SBS Taxi
            </span>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                leading-tight
                text-[var(--primary)]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Our Terms of Service
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-3xl
                text-sm
                leading-7
                text-gray-500
                sm:text-base
                sm:leading-8
              "
            >
              Clear and transparent terms designed to provide a safe,
              reliable, and comfortable experience for every SBS Taxi
              customer.
            </p>

          </div>

          {/* Terms Cards */}
          <div className="space-y-5 sm:space-y-6">

            {terms.map((term) => {
              const Icon = term.icon;

              return (
                <article
                  key={term.title}
                  className="
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    p-5
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    sm:p-7
                    lg:p-8
                  "
                >
                  <div className="flex items-start gap-4 sm:gap-6">

                    {/* =================================================
                        ICON
                    ================================================== */}
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[var(--primary)]
                        shadow-sm
                        sm:h-14
                        sm:w-14
                        lg:h-16
                        lg:w-16
                      "
                    >
                      <Icon
                        size={25}
                        strokeWidth={2}
                        className="
                          text-[var(--secondary)]
                          sm:h-7
                          sm:w-7
                        "
                      />
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================== */}
                    <div className="min-w-0 flex-1">

                      {/* Title */}
                      <h3
                        className="
                          text-xl
                          font-extrabold
                          leading-snug
                          text-[var(--primary)]
                          sm:text-2xl
                        "
                      >
                        {term.title}
                      </h3>

                      {/* Points */}
                      <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">

                        {term.points.map((point, index) => (
                          <li
                            key={index}
                            className="
                              flex
                              items-start
                              gap-3
                              text-sm
                              leading-7
                              text-gray-600
                              sm:text-base
                              sm:leading-8
                              lg:text-[17px]
                            "
                          >
                            <span
                              className="
                                mt-3
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-[var(--secondary)]
                              "
                            />

                            <span>{point}</span>
                          </li>
                        ))}

                      </ul>

                      {/* Additional Description */}
                      {term.description && (
                        <p
                          className="
                            mt-5
                            rounded-xl
                            border
                            border-[var(--primary)]/5
                            bg-[var(--primary-light)]
                            px-4
                            py-4
                            text-sm
                            leading-7
                            text-[var(--primary)]/80
                            sm:px-5
                            sm:text-base
                            sm:leading-8
                          "
                        >
                          {term.description}
                        </p>
                      )}

                    </div>
                  </div>
                </article>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT US
      ====================================================== */}
      <section className="w-full bg-[var(--primary-light)] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">

          <div
            className="
              rounded-2xl
              bg-[var(--primary)]
              p-6
              sm:p-8
              lg:p-10
            "
          >

            <div
              className="
                flex
                flex-col
                gap-8
                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              {/* Content */}
              <div className="max-w-2xl">

                <span
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[var(--secondary)]
                    sm:text-base
                  "
                >
                  Get In Touch
                </span>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-extrabold
                    !text-white
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  Contact Us
                </h2>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-blue-100/70
                    sm:text-base
                    sm:leading-8
                  "
                >
                  If you have any questions regarding these Terms &
                  Conditions, please contact SBS Taxi.
                </p>

              </div>

              {/* Contact Details */}
              <div className="space-y-3 md:min-w-[330px]">

                {/* Email */}
                <a
                  href="mailto:hr@sbstechnologies.in"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    p-2
                    text-sm
                    !text-white
                    transition-all
                    duration-300
                    hover:bg-white/5
                    hover:text-white
                    sm:text-base
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
                      bg-white/10
                      transition-all
                      duration-300
                      group-hover:bg-[var(--secondary)]
                    "
                  >
                    <Mail
                      size={19}
                      className="
                        text-[var(--secondary)]
                        transition-colors
                        duration-300
                        group-hover:text-black
                      "
                    />
                  </div>

                  <span className="break-all">
                    hr@sbstechnologies.in
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+919843544844"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    p-2
                    text-sm
                    !text-white
                    transition-all
                    duration-300
                    hover:bg-white/5
                    hover:text-white
                    sm:text-base
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
                      bg-white/10
                      
                      transition-all
                      duration-300
                      group-hover:bg-[var(--secondary)]
                    "
                  >
                    <Phone
                      size={19}
                      className="
                        text-[var(--secondary)]
                        transition-colors
                        duration-300
                        group-hover:text-black
                      "
                    />
                  </div>

                  <span>
                    +91 98435 44844
                  </span>
                </a>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL AGREEMENT
      ====================================================== */}
      <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[var(--primary)]
              shadow-sm
              sm:h-16
              sm:w-16
            "
          >
            <ShieldCheck
              size={29}
              strokeWidth={2}
              className="text-[var(--secondary)]"
            />
          </div>

          <h2
            className="
              mt-5
              text-xl
              font-extrabold
              text-[var(--primary)]
              sm:text-2xl
              lg:text-3xl
            "
          >
            Your Agreement
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-3xl
              text-sm
              leading-7
              text-gray-600
              sm:text-base
              sm:leading-8
            "
          >
            By booking or using SBS Taxi services, you acknowledge that you
            have read, understood, and agree to these Terms & Conditions.
          </p>

        </div>
      </section>

    </main>
  );
}