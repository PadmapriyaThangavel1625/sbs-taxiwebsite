"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Headphones,
  IndianRupee,
  Map,
  MapPin,
  Navigation,
  Phone,
  Route,
  ShieldCheck,
  Smartphone,
  Star,
  UserCheck,
  UserRound,
  Users,
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
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
  },
  {
    number: "02",
    title: "BECOME A FLEET OWNER",
    description:
      "Register your vehicles with SBS Taxi, increase fleet utilization, earn consistent income and manage your vehicles efficiently.",
    icon: CarFront,
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
  },
  {
    number: "03",
    title: "BECOME A FLEET DRIVER",
    description:
      "Join our growing driver network with flexible working hours, attractive earning opportunities, reliable trip assignments and ongoing support.",
    icon: UserRound,
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
  },
  {
    number: "04",
    title: "BECOME A PREMIUM CUSTOMER",
    description:
      "Enjoy priority bookings, dedicated customer support, comfortable rides and convenient corporate travel solutions with SBS Taxi.",
    icon: Star,
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
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
   BENEFITS
===================================================== */

const benefits = [
  {
    title: "Safe & Reliable",
    description: "Professional and dependable rides",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Pricing",
    description: "Clear and honest fares",
    icon: IndianRupee,
  },
  {
    title: "Available 24/7",
    description: "Support whenever you need us",
    icon: Clock3,
  },
  {
    title: "Trusted by Thousands",
    description: "Growing customer network",
    icon: Star,
  },
];

/* =====================================================
   SUPPORT ITEMS
===================================================== */

const supportItems = [
  "Passenger assistance",
  "Driver support",
  "Fleet owner assistance",
  "Business partner support",
];

/* =====================================================
   COMPONENT
===================================================== */

export default function SBSTaxiOverview() {
  return (
    <main className="w-full overflow-hidden bg-white">



           

      {/* =================================================
          SERVICES
      ================================================= */}

      <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <SectionHeading
            label="OUR SERVICES"
            title="Solutions Designed for Everyone"
            description="Whether you are a passenger, business owner, fleet owner or driver, SBS Taxi provides convenient solutions to make every journey easier."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-black/5
                    ${service.bg}
                    p-6
                    text-center
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  `}
                >

                  {/* Number */}
                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-base
                      font-extrabold
                      text-[var(--primary)]
                      shadow-sm
                    "
                  >
                    {service.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`
                      mx-auto
                      flex
                      !h-10
                      !w-10
                      !mb-6
                      items-center
                      justify-center
                      !bg-[var(--secondary)]
                      rounded-full
                      ${service.iconBg}
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    `}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.7}
                      className="text-[var(--primary)]"
                      
                    />
                  </div>

                  <h3 className="mt-6 min-h-[52px] text-lg font-extrabold leading-6 text-[var(--primary)]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center justify-center gap-1 text-xs font-bold text-[var(--primary)]">
                    Learn More
                    <ArrowRight size={14} />
                  </div>

                </article>
              );
            })}

          </div>
        </div>
      </section>

      {/* =================================================
          FEATURES
      ================================================= */}

      <section className="w-full bg-gray-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <SectionHeading
            label="FEATURES"
            title="Everything You Need in One Platform"
            description="Powerful tools and smart technology help passengers, drivers, fleet owners and businesses manage transportation efficiently."
          />

          <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-gray-200 bg-white sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className={`
                    group
                    border-gray-200
                    p-6
                    transition-all
                    duration-300
                    hover:bg-blue-50
                    ${
                      index < 4
                        ? "border-b"
                        : "border-b"
                    }
                    sm:nth-[odd]:border-r
                    lg:border-r
                    lg:nth-[4n]:border-r-0
                  `}
                >

                  <div className="flex items-start gap-4">

                    {/* Icon */}
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[var(--secondary-light)]
                        transition-all
                        duration-300
                        group-hover:bg-[var(--secondary)]
                        group-hover:scale-105
                      "
                    >
                      <Icon
                        size={27}
                        strokeWidth={1.8}
                        className="text-[var(--primary)]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold leading-5 text-[var(--primary)] sm:text-base">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                        {feature.description}
                      </p>
                    </div>

                  </div>

                </article>
              );
            })}

          </div>
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

      <div className="flex items-center gap-4">

        <span className="hidden h-px flex-1 bg-[var(--primary)]/20 sm:block" />

        <span
          className="
            rounded-full
            bg-[var(--primary)]
            px-6
            py-2
            text-sm
            font-extrabold
            tracking-wide
            text-white
            sm:text-base
          "
        >
          {label}
        </span>

        <span className="hidden h-px flex-1 bg-[var(--primary)]/20 sm:block" />

      </div>

      <h2 className="mt-5 text-2xl font-extrabold text-[var(--primary)] sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
        {description}
      </p>

    </div>
  );
}

/* =====================================================
   MINI BENEFIT
===================================================== */

function MiniBenefit({
  icon: Icon,
  text,
}: {
  icon: typeof ShieldCheck;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white/80 px-3 py-2 shadow-sm">
      <Icon
        size={17}
        className="shrink-0 text-[var(--primary)]"
      />

      <span className="text-[11px] font-bold text-[var(--primary)] sm:text-xs">
        {text}
      </span>
    </div>
  );
}

/* =====================================================
   SUPPORT ICON
===================================================== */

function SupportIcon({
  icon: Icon,
  label,
  bg,
}: {
  icon: typeof Users;
  label: string;
  bg: string;
}) {
  return (
    <div className="text-center">

      <div
        className={`
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          ${bg}
          shadow-sm
          sm:h-28
          sm:w-28
        `}
      >
        <Icon
          size={48}
          strokeWidth={1.5}
          className="text-[var(--primary)]"
        />
      </div>

      <p className="mt-3 text-xs font-extrabold text-[var(--primary)]">
        {label}
      </p>

    </div>
  );
}