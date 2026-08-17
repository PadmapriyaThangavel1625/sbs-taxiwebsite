"use client";

import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CarFront,
  Navigation,
  Route,
  Star,
  UserCheck,
  UserRound,
  WalletCards,
} from "lucide-react";

/* =====================================================
   SERVICES
===================================================== */

const services = [
  {
    number: "01",
    title: "BECOME A BUSINESS PARTNER",
    description:
      "Partner with SBS Taxi to expand your business with dependable transportation solutions, professional service and seamless booking support.",
    icon: BriefcaseBusiness,
  },
  {
    number: "02",
    title: "BECOME A FLEET OWNER",
    description:
      "Register your vehicles with SBS Taxi, increase fleet utilization, earn consistent income and manage your vehicles efficiently.",
    icon: CarFront,
  },
  {
    number: "03",
    title: "BECOME A FLEET DRIVER",
    description:
      "Join our growing driver network with flexible working hours, attractive earning opportunities, reliable trip assignments and ongoing support.",
    icon: UserRound,
  },
  {
    number: "04",
    title: "BECOME A PREMIUM CUSTOMER",
    description:
      "Enjoy priority bookings, dedicated customer support, comfortable rides and convenient corporate travel solutions with SBS Taxi.",
    icon: Star,
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
  return (
    <main className="w-full overflow-hidden bg-white">

      {/* =================================================
          SERVICES
      ================================================= */}

      <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Section Heading */}
          <div className="mb-16 sm:mb-20 lg:mb-24">
            <SectionHeading
              label="OUR SERVICES"
              title="Solutions Designed for Everyone"
              description="Whether you are a passenger, business owner, fleet owner or driver, SBS Taxi provides convenient solutions to make every journey easier."
            />
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="
                    group
                    relative
                    flex
                    min-h-[350px]
                    flex-col
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-[var(--border)]
                    bg-white
                    p-7
                    shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-[var(--secondary)]
                    hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]
                  "
                >
                  {/* Number */}
                  <span
                    className="
                      absolute
                      right-6
                      top-5
                      font-[family-name:var(--font-instrument)]
                      text-5xl
                      font-normal
                      text-[var(--primary)]
                      opacity-[0.06]
                    "
                  >
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[var(--secondary)]
                      text-[var(--primary)]
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="mt-8 flex-1">
                    <h3
                      className="
                        max-w-[235px]
                        font-[family-name:var(--font-instrument)]
                        text-xl
                        font-normal
                        leading-tight
                        tracking-tight
                        text-[var(--primary)]
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-6
                        text-[var(--text-secondary)]
                      "
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Learn More */}
                  <div
                    className="
                      mt-8
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[var(--primary)]
                    "
                  >
                    Learn More

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>

                  {/* Bottom Line */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-8
                      right-8
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

          {/* EXTRA SPACE BETWEEN OUR SERVICES AND FEATURES */}
          <div className="h-28 sm:h-32 lg:h-40" />
        </div>
      </section>

      {/* =================================================
          FEATURES
      ================================================= */}

      <section className="relative w-full bg-[var(--background)] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Section Heading */}
          <div className="mb-16 sm:mb-20 lg:mb-24">
            <SectionHeading
              label="FEATURES"
              title="Everything You Need in One Platform"
              description="Powerful tools and smart technology help passengers, drivers, fleet owners and businesses manage transportation efficiently."
            />
          </div>

          {/* Features Grid */}
          <div
            className="
              grid
              grid-cols-1
              overflow-hidden
              rounded-[28px]
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
                    min-h-[235px]
                    border-b
                    border-[var(--border)]
                    p-7
                    transition-all
                    duration-300
                    hover:bg-[var(--secondary)]/[0.06]
                    lg:min-h-[250px]
                    lg:border-r
                    lg:last:border-r-0
                  "
                >
                  {/* Number */}
                  <span
                    className="
                      absolute
                      right-6
                      top-5
                      text-xs
                      font-bold
                      tracking-wider
                      text-[var(--primary)]
                      opacity-20
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[var(--secondary)]
                      text-[var(--primary)]
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mt-7
                      font-[family-name:var(--font-instrument)]
                      text-xl
                      font-normal
                      leading-tight
                      tracking-tight
                      text-[var(--primary)]
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
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

                  {/* Bottom Line */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-7
                      right-7
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

          {/* Space after Features */}
          <div className="h-16 sm:h-20 lg:h-24" />
        </div>
      </section>
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
    <div className="mx-auto max-w-4xl text-center">

      {/* Label */}
      <div className="flex items-center gap-4">
        <span className="hidden h-px flex-1 bg-[var(--primary)]/15 sm:block" />

        <span
          className="
            rounded-full
            bg-[var(--primary)]
            px-5
            py-2
            text-[11px]
            font-bold
            tracking-[0.16em]
            text-white
            sm:px-6
            sm:text-xs
          "
        >
          {label}
        </span>

        <span className="hidden h-px flex-1 bg-[var(--primary)]/15 sm:block" />
      </div>

      {/* SPACE AFTER BOTH LABELS */}
      <div className="h-12 sm:h-14 lg:h-16" />

      {/* Title */}
      <h2
        className="
          font-[family-name:var(--font-instrument)]
          text-3xl
          font-normal
          leading-tight
          tracking-tight
          text-[var(--primary)]
          sm:text-4xl
          lg:text-5xl
        "
      >
        {title}
      </h2>

      {/* Description */}
      <p
        className="
          mx-auto
          mt-6
          max-w-3xl
          text-sm
          leading-7
          text-[var(--text-secondary)]
          sm:mt-7
          sm:text-base
        "
      >
        {description}
      </p>
    </div>
  );
}