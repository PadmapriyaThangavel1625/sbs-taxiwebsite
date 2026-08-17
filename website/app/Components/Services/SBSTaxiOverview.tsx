"use client";

import { useState } from "react";

import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  Navigation,
  Route,
  Star,
  UserCheck,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

/* =====================================================
   TYPES
===================================================== */

type Service = {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
};

/* =====================================================
   SERVICES
===================================================== */

const services: Service[] = [
  {
    number: "01",
    title: "BECOME A BUSINESS PARTNER",
    description:
      "Partner with SBS Taxi to expand your business with dependable transportation solutions, professional service and seamless booking support.",
    icon: BriefcaseBusiness,
    details: [
      "Manage business transportation requirements easily.",
      "Get reliable taxi and travel support for your customers and employees.",
      "Simplify bookings and transportation operations.",
      "Access professional support from the SBS Taxi team.",
    ],
  },
  {
    number: "02",
    title: "BECOME A FLEET OWNER",
    description:
      "Register your vehicles with SBS Taxi, increase fleet utilization, earn consistent income and manage your vehicles efficiently.",
    icon: CarFront,
    details: [
      "Register and manage multiple vehicles.",
      "Improve vehicle utilization and trip availability.",
      "Monitor vehicle activity and trip assignments.",
      "Manage your fleet more efficiently through one platform.",
    ],
  },
  {
    number: "03",
    title: "BECOME A FLEET DRIVER",
    description:
      "Join our growing driver network with flexible working hours, attractive earning opportunities, reliable trip assignments and ongoing support.",
    icon: UserRound,
    details: [
      "Receive trip assignments based on availability.",
      "Work with flexible schedules.",
      "Track your trips and earnings.",
      "Get ongoing operational support from SBS Taxi.",
    ],
  },
  {
    number: "04",
    title: "BECOME A PREMIUM CUSTOMER",
    description:
      "Enjoy priority bookings, dedicated customer support, comfortable rides and convenient corporate travel solutions with SBS Taxi.",
    icon: Star,
    details: [
      "Enjoy priority booking support.",
      "Get comfortable and dependable transportation.",
      "Access dedicated customer assistance.",
      "Use convenient travel solutions for personal and business needs.",
    ],
  },
];

/* =====================================================
   FEATURES
===================================================== */

const features = [
  {
    title: "BUSINESS AUTOMATION",
    description:
      "Automate bookings, billing, invoicing, customer management and day-to-day transportation operations through one connected platform.",
    icon: BarChart3,
  },
  {
    title: "FLEET MANAGEMENT",
    description:
      "Track vehicles, monitor maintenance schedules, manage vehicle documents, optimize routes and improve overall fleet performance.",
    icon: CarFront,
  },
  {
    title: "DRIVER MANAGEMENT",
    description:
      "Manage driver profiles, documents, attendance, trip assignments, performance, earnings and customer ratings efficiently.",
    icon: UserCheck,
  },
  {
    title: "TRIP MANAGEMENT",
    description:
      "Create, assign and monitor trips with live tracking, trip status updates, fare calculation and complete trip history.",
    icon: Route,
  },
  {
    title: "LIVE GPS TRACKING",
    description:
      "Track vehicles and active trips in real time to improve visibility, safety, operational control and customer confidence.",
    icon: Navigation,
  },
  {
    title: "DIGITAL PAYMENTS",
    description:
      "Support secure digital payments through UPI, wallets, credit and debit cards and convenient corporate billing options.",
    icon: WalletCards,
  },
  {
    title: "ANALYTICS & REPORTS",
    description:
      "Understand your business with revenue reports, trip analytics, driver performance reports and customer statistics.",
    icon: BarChart3,
  },
  {
    title: "SMART NOTIFICATIONS",
    description:
      "Receive timely booking confirmations, trip updates, payment alerts, reminders and important service notifications.",
    icon: Bell,
  },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function SBSTaxiOverview() {
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  /* =====================================================
     OPEN MODAL
  ===================================================== */

  const openService = (service: Service) => {
    setSelectedService(service);

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeService = () => {
    setSelectedService(null);

    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* =================================================
          SERVICES
      ================================================= */}

      <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* SECTION HEADING */}

          <div className="mb-10 sm:mb-14 lg:mb-16">
            <SectionHeading
              label="OUR SERVICES"
              title="Solutions Designed for Everyone"
              description="Whether you are a passenger, business owner, fleet owner or driver, SBS Taxi provides convenient solutions to make every journey easier."
            />
          </div>

          {/* SERVICES GRID */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="
                    group
                    relative
                    flex
                    min-h-[300px]
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-white
                    p-6
                    shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[var(--secondary)]
                    hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)]
                    sm:min-h-[320px]
                    lg:p-7
                  "
                >
                  {/* NUMBER */}

                  <span
                    className="
                      absolute
                      right-5
                      top-4
                      font-[family-name:var(--font-instrument)]
                      text-4xl
                      font-normal
                      text-[var(--primary)]
                      opacity-[0.06]
                      sm:text-5xl
                    "
                  >
                    {service.number}
                  </span>

                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[var(--secondary)]
                      text-[var(--primary)]
                      shadow-sm
                      transition-transform
                      duration-300
                      group-hover:scale-105
                      sm:h-14
                      sm:w-14
                    "
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="mt-6 flex-1">
                    <h3
                      className="
                        max-w-[240px]
                        font-[family-name:var(--font-instrument)]
                        text-lg
                        font-normal
                        leading-tight
                        tracking-tight
                        text-[var(--primary)]
                        sm:text-xl
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-[var(--text-secondary)]
                      "
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* LEARN MORE */}

                  <button
                    type="button"
                    onClick={() => openService(service)}
                    className="
                      mt-6
                      flex
                      w-fit
                      cursor-pointer
                      items-center
                      gap-2
                      border-0
                      bg-transparent
                      p-0
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[var(--primary)]
                      transition-opacity
                      hover:opacity-70
                    "
                  >
                    Learn More

                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>

                  {/* BOTTOM LINE */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-6
                      right-6
                      h-[3px]
                      origin-center
                      scale-x-0
                      rounded-full
                      bg-[var(--secondary)]
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    "
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
          FEATURES
      ================================================= */}

      <section
        className="
          relative
          w-full
          bg-[var(--background)]
          py-12
          sm:py-16
          lg:py-20
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* SECTION HEADING */}

          <div className="mb-10 sm:mb-14 lg:mb-16">
            <SectionHeading
              label="FEATURES"
              title="Everything You Need in One Platform"
              description="Powerful tools and smart technology help passengers, drivers, fleet owners and businesses manage transportation efficiently."
            />
          </div>

          {/* FEATURES GRID */}

          <div
            className="
              grid
              grid-cols-1
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-white
              shadow-[0_8px_35px_rgba(0,0,0,0.04)]
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="
                    group
                    relative
                    min-h-[215px]
                    border-b
                    border-[var(--border)]
                    p-6
                    transition-all
                    duration-300
                    hover:bg-[var(--secondary)]/[0.06]
                    sm:min-h-[225px]
                    lg:min-h-[240px]
                    lg:border-r
                    lg:last:border-r-0
                  "
                >
                  {/* NUMBER */}

                  <span
                    className="
                      absolute
                      right-5
                      
                      top-4
                      text-xs
                      font-bold
                      tracking-wider
                      text-[var(--primary)]
                      opacity-20
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      !mb-5
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[var(--secondary)]
                      text-[var(--primary)]
                      shadow-sm
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* TITLE */}

                  <h3
                    className="
                      mt-5
                      font-[family-name:var(--font-instrument)]
                      text-lg
                      font-normal
                      leading-tight
                      tracking-tight
                      text-[var(--primary)]
                      sm:text-xl
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-[var(--text-secondary)]
                    "
                  >
                    {feature.description}
                  </p>

                  {/* BOTTOM LINE */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-6
                      right-6
                      h-[2px]
                      origin-left
                      scale-x-0
                      rounded-full
                      bg-[var(--secondary)]
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    "
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
          SERVICE MODAL
      ================================================= */}

      {selectedService && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
            sm:p-6
          "
          onClick={closeService}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-dialog-title"
            className="
              relative
              flex
              max-h-[90vh]
              w-full
              max-w-lg
              flex-col
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
              sm:max-h-[85vh]
              sm:rounded-3xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div
              className="
                shrink-0
                border-b
                border-[var(--border)]
                px-5
                py-5
                sm:px-7
                sm:py-6
              "
            >
              <button
                type="button"
                onClick={closeService}
                aria-label="Close"
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--background)]
                  text-[var(--text-secondary)]
                  transition
                  hover:bg-[var(--secondary)]
                  hover:text-[var(--primary)]
                  sm:right-5
                  sm:top-5
                "
              >
                <X size={18} />
              </button>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--secondary)]
                  text-[var(--primary)]
                "
              >
                <selectedService.icon
                  size={24}
                  strokeWidth={1.8}
                />
              </div>

              <p
                className="
                  mt-4
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--primary)]
                  opacity-60
                "
              >
                SERVICE {selectedService.number}
              </p>

              <h2
                id="service-dialog-title"
                className="
                  mt-2
                  pr-8
                  font-[family-name:var(--font-instrument)]
                  text-2xl
                  font-normal
                  leading-tight
                  text-[var(--primary)]
                  sm:text-3xl
                "
              >
                {selectedService.title}
              </h2>
            </div>

            {/* MODAL CONTENT */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                px-5
                py-5
                sm:px-7
                sm:py-6
              "
            >
              <p
                className="
                  text-sm
                  leading-6
                  text-[var(--text-secondary)]
                  sm:text-base
                  sm:leading-7
                "
              >
                {selectedService.description}
              </p>

              <div className="mt-6">
                <h3
                  className="
                    text-sm
                    font-bold
                    text-[var(--text-primary)]
                  "
                >
                  What you get
                </h3>

                <div className="mt-4 space-y-3">
                  {selectedService.details.map(
                    (detail) => (
                      <div
                        key={detail}
                        className="
                          flex
                          items-start
                          gap-3
                          rounded-xl
                          bg-[var(--background)]
                          p-3
                          sm:p-4
                        "
                      >
                        <CheckCircle2
                          className="
                            mt-0.5
                            h-5
                            w-5
                            shrink-0
                            text-[var(--primary)]
                          "
                        />

                        <span
                          className="
                            text-sm
                            leading-6
                            text-[var(--text-secondary)]
                          "
                        >
                          {detail}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div
              className="
                shrink-0
                border-t
                border-[var(--border)]
                bg-white
                px-5
                py-4
                sm:px-7
              "
            >
              <button
                type="button"
                onClick={closeService}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-[var(--text-primary)]
                  transition
                  hover:opacity-90
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =====================================================
   SECTION HEADING
===================================================== */
function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl text-center">

      {/* LABEL - PERFECTLY CENTERED */}
      <div className="relative flex w-full items-center justify-center">
        {/* Left line */}
        <span
          className="
            absolute
            left-0
            hidden
            h-px
            w-[calc(50%-110px)]
            bg-[var(--primary)]/15
            sm:block
          "
        />

        {/* Center label */}
        <span
          className="
            relative
            z-10
            inline-flex
            items-center
            justify-center
            rounded-full
            bg-[var(--primary)]
            !mb-5
            px-5
            py-2
            text-center
            text-[10px]
            font-bold
            tracking-[0.14em]
            text-[var(--text-primary)]
            sm:px-6
            sm:text-xs
          "
        >
          {label}
        </span>

        {/* Right line */}
        <span
          className="
            absolute
            right-0
            hidden
            h-px
            w-[calc(50%-110px)]
            bg-[var(--primary)]/15
            sm:block
          "
        />
      </div>

      {/* TITLE */}
      <h2
        className="
          mt-7
          text-center
          font-[family-name:var(--font-instrument)]
          text-3xl
          font-normal
          leading-tight
          tracking-tight
          text-[var(--primary)]
          sm:mt-8
          sm:text-4xl
          lg:text-5xl
        "
      >
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          mx-auto
          mt-4
          max-w-3xl
          text-center
          text-sm
          leading-6
          text-[var(--text-secondary)]
          sm:mt-6
          sm:text-base
          sm:leading-7
        "
      >
        {description}
      </p>
    </div>
  );
} 