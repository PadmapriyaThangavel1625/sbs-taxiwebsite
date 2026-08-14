"use client";

import {
  CheckCircle2,
  Cookie,
  Database,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

const privacySections = [
  {
    title: "Information We Collect",
    icon: Database,
    points: [
      "Full Name",
      "Mobile Number",
      "Email Address",
      "Pickup & Drop Locations",
      "GPS/Location Data (with your permission)",
      "Booking History",
      "Payment Information (processed securely through payment partners)",
      "Device and browser information",
    ],
  },
  {
    title: "How We Use Your Information",
    icon: UserCheck,
    points: [
      "Confirm and manage taxi bookings",
      "Assign drivers and vehicles",
      "Process payments",
      "Send booking confirmations and trip updates",
      "Provide customer support",
      "Improve our services and user experience",
      "Meet legal and regulatory requirements",
    ],
  },
  {
    title: "Information Sharing",
    icon: Users,
    points: [
      "Assigned drivers for trip completion",
      "Payment gateway providers",
      "Government authorities when required by law",
    ],
    description:
      "We do not sell, rent, or trade your personal information to third parties.",
  },
  {
    title: "Data Security",
    icon: Lock,
    points: [
      "We use appropriate technical and administrative security measures to protect your personal information from unauthorized access, misuse, or disclosure.",
    ],
  },
  {
    title: "Location Information",
    icon: MapPin,
    points: [
      "Detect your pickup location",
      "Improve route navigation",
      "Provide accurate ride tracking",
    ],
    description:
      "You may disable location permissions, but some features may not function properly.",
  },
  {
    title: "Cookies",
    icon: Cookie,
    points: [
      "Improve website performance",
      "Remember user preferences",
      "Analyze website traffic",
    ],
    description:
      "You can manage or disable cookies through your browser settings.",
  },
  {
    title: "Data Retention",
    icon: Database,
    points: [
      "We retain your information only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our policies.",
    ],
  },
  {
    title: "Your Rights",
    icon: ShieldCheck,
    points: [
      "Access your personal information",
      "Request corrections to inaccurate information",
      "Request deletion of your personal data (subject to legal requirements)",
      "Withdraw consent where applicable",
    ],
  },
  {
    title: "Children's Privacy",
    icon: Users,
    points: [
      "Our services are not intended for children under the age of 18 without the supervision of a parent or legal guardian.",
    ],
  },
  {
    title: "Changes to this Privacy Policy",
    icon: FileText,
    points: [
      "SBS Taxi may update this Privacy Policy from time to time. The latest version will always be available through our official communication channels.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
              At SBS Taxi, we value your privacy and are committed to
              protecting your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="w-full bg-[var(--primary)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-8">

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
                text-[var(--primary)]
                sm:h-14
                sm:w-14
              "
            >
              <ShieldCheck
                size={26}
                strokeWidth={2}
                className="text-[var(--primary)] !bg-[var(--secondary)]/15"
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
                "
              >
                Your Privacy Matters
              </h2>

              <p
                className="
                  mt-2
                  max-w-5xl
                  text-sm
                  leading-7
                  text-gray-600
                  sm:text-base
                  sm:leading-8
                "
              >
                This Privacy Policy explains how we collect, use, store, and
                protect your data when you use our taxi booking services,
                website, or mobile application.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          PRIVACY SECTIONS
      ====================================================== */}
      <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">

          {/* Heading */}
          <div className="mb-10 text-center sm:mb-12">
            <span
              className="
                !text-4xl
                !font-extrabold
                uppercase
                tracking-[0.2em]
                text-[var(--secondary-dark)]
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
              How We Protect Your Information
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
              We are committed to handling your information responsibly and
              maintaining appropriate safeguards for your privacy.
            </p>
          </div>

          {/* Privacy Cards */}
          <div className="space-y-5 sm:space-y-6">
            {privacySections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.title}
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
                    hover:shadow-md
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
                      "
                    >
                      <Icon
                        size={25}
                        strokeWidth={2}
                        className="text-[var(--secondary)]"
                      />
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================== */}
                    <div className="min-w-0 flex-1">

                      {/* Heading */}
                      <h3
                        className="
                          text-lg
                          font-extrabold
                          leading-snug
                          text-[var(--primary)]
                          sm:text-xl
                          lg:text-2xl
                        "
                      >
                        {section.title}
                      </h3>

                      {/* Points */}
                      <ul className="mt-4 space-y-3 sm:mt-5">
                        {section.points.map((point, index) => (
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
                      {section.description && (
                        <p
                          className="
                            mt-5
                            rounded-xl
                            border
                            border-[var(--primary)]/5
                            bg-[var(--primary)]
                            px-4
                            py-3
                            text-sm
                            leading-7
                            !text-[var(--text-primary)]/80
                            sm:px-5
                            sm:py-4
                            sm:text-base
                          "
                        >
                          {section.description}
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
      <section className="w-full bg-[var(--primary)] py-14 sm:py-16">
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
                  "
                >
                  Contact
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
                  If you have any questions about this Privacy Policy or how
                  we handle your information, please contact SBS Taxi.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 md:min-w-[320px]">

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
                    !text-[var(--text-primary)]
                    transition-colors
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
                      !text-white
                      transition-colors
                      group-hover:bg-[var(--secondary)]
                    "
                  >
                    <Mail
                      size={19}
                      className="
                        text-[var(--secondary)]
                        transition-colors
                        group-hover:text-white
                      "
                    />
                  </div>

                  <span className="break-all">
                    hr@sbstechnologies.in
                  </span>
                </a>

                {/* Mobile */}
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
                    !text-[var(--text-primary)]
                    transition-colors
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
                      transition-colors
                      group-hover:bg-[var(--secondary)]
                    "
                  >
                    <Phone
                      size={19}
                      className="
                        text-[var(--text-secondary)])]
                        transition-colors
                        group-hover:text-white
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
      <section className="w-full bg-white py-10 sm:py-14">
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
            "
          >
            <CheckCircle2
              size={28}
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
            "
          >
            Your Privacy Matters
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
            By using SBS Taxi services, you acknowledge that you have read
            and agree to this Privacy Policy.
          </p>

        </div>
      </section>

    </main>
  );
}