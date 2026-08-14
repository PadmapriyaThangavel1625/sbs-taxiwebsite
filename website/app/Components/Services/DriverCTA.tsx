"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CarFront,
  CheckCircle2,
  Clock3,
  FileCheck,
  FileText,
  Gift,
  IdCard,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Wallet,
} from "lucide-react";

export default function DriverCTA() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADING
        ====================================================== */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--secondary)] sm:text-base">
            SBS Taxi Drivers
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[var(--primary)] sm:text-4xl lg:text-5xl">
            Drivers &amp; Documents
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Whether you are looking to join SBS Taxi or want to arrange a
            trusted driver, we make the process simple and convenient.
          </p>
        </div>

        {/* =====================================================
            TOP AND DOWN
            1. DRIVERS WANTED
            2. DRIVER DOCUMENTS
        ====================================================== */}
        <div className="flex flex-col gap-8">

          {/* =====================================================
              TOP - DRIVERS WANTED
          ====================================================== */}
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
            "
          >
            {/* TOP HEADER */}
            <div className="bg-[var(--primary)] px-6 py-7 sm:px-8 sm:py-8">
              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--secondary)]
                    text-[var(--primary)]
                  "
                >
                  <UserRound className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--secondary)]">
                    SBS Taxi
                  </p>

                  <h3 className="mt-1 text-3xl font-extrabold !text-white sm:text-4xl">
                    Drivers Wanted
                  </h3>

                  <div className="mt-2 inline-flex rounded-full bg-[var(--secondary)] px-4 py-1.5 text-sm font-extrabold text-black">
                    JOIN IMMEDIATELY!
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 sm:p-8">

              {/* MAIN MESSAGE */}
              <div className="rounded-2xl bg-[var(--primary)] p-5">
                <h4 className="text-xl font-extrabold !text-[var(--text-primary)] sm:text-2xl">
                  SBS Taxi is hiring Drivers in{" "}
                  <span className="text-[var(--secondary)]">
                    ERODE!
                  </span>
                </h4>

                <p className="mt-3 text-sm leading-6 !text-[var(--text-primary)] sm:text-base">
                  Start earning with a trusted fleet partner.
                </p>
              </div>

              {/* BENEFITS */}
              <div className="mt-6 space-y-3">

                {/* Immediate Joining */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3.5
                    shadow-sm
                  "
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[var(--primary)] sm:text-base">
                      Immediate Joining
                    </p>

                    <p className="text-xs text-slate-500">
                      Start your journey with SBS Taxi
                    </p>
                  </div>
                </div>

                {/* Attractive Incentives */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3.5
                    shadow-sm
                  "
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Gift className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[var(--primary)] sm:text-base">
                      Attractive Incentives
                    </p>

                    <p className="text-xs text-slate-500">
                      Earn additional benefits
                    </p>
                  </div>
                </div>

                {/* Better Earning */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3.5
                    shadow-sm
                  "
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[var(--primary)] sm:text-base">
                      Better Earning Opportunities
                    </p>

                    <p className="text-xs text-slate-500">
                      Grow your income with SBS Taxi
                    </p>
                  </div>
                </div>

                {/* Flexible Working */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3.5
                    shadow-sm
                  "
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[var(--primary)] sm:text-base">
                      Flexible Working Hours
                    </p>

                    <p className="text-xs text-slate-500">
                      Work according to your schedule
                    </p>
                  </div>
                </div>

                {/* Weekly Payout */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3.5
                    shadow-sm
                  "
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Wallet className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[var(--primary)] sm:text-base">
                      Weekly Payout Support
                    </p>

                    <p className="text-xs text-slate-500">
                      Reliable payout assistance
                    </p>
                  </div>
                </div>

              </div>

              {/* VACANCIES + LOCATION */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[var(--primary)] p-5">
                  <div className="flex items-center gap-3">

                    <BadgeCheck className="h-7 w-7 text-[var(--primary)]" />

                    <div>
                      <p className="text-sm font-extrabold uppercase  text-[var(--secondary)]">
                        Limited Vacancies
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[var(--secondary)]">
                        Available now!
                      </p>
                    </div>

                  </div>
                </div>

                <div className="rounded-2xl bg-[var(--primary)] p-5">
                  <div className="flex items-center gap-3">

                    <MapPin className="h-7 w-7 text-[var(--secondary)]" />

                    <div>
                      <p className="text-xs font-bold uppercase text-blue-100">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-white">
                        Erode, Tamil Nadu
                      </p>
                    </div>

                  </div>
                </div>

              </div>


              {/* BUTTON */}
              <Link
                href="/fleet"
                className="
                  mt-6
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  !text-[var(--secondary)]
                  transition-all
                  duration-300
                  hover:gap-3
                "
              >
                Join SBS Taxi
                <ArrowRight className="h-5 w-5" />
              </Link>

            </div>
          </div>


          {/* =====================================================
              DOWN - DRIVER DOCUMENTS
          ====================================================== */}
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
            "
          >

            {/* TOP HEADER */}
            <div className="bg-[var(--primary)] px-6 py-7 sm:px-8 sm:py-8">
              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--secondary)]
                    text-[var(--primary)]
                  "
                >
                  <FileText className="h-7 w-7" />
                </div>

                <div>

                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--secondary)]">
                    SBS Taxi
                  </p>

                  <h3 className="mt-1 text-3xl font-extrabold !text-[var(--text-primary)] sm:text-4xl">
                    Driver Documents
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-primary)] sm:text-base">
                    Your Documents. Our Trust. Better Rides Together.
                  </p>

                </div>
              </div>
            </div>


            {/* CONTENT */}
            <div className="p-6 sm:p-8">

              {/* DRIVER DOCUMENTS */}
              <div>

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <h4 className="text-xl font-extrabold text-[var(--primary)]">
                    Required Driver Documents
                  </h4>

                </div>


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <DocumentItem
                    icon={<IdCard />}
                    number="1"
                    title="Aadhaar Card"
                  />

                  <DocumentItem
                    icon={<FileText />}
                    number="2"
                    title="PAN Card"
                  />

                  <DocumentItem
                    icon={<BadgeCheck />}
                    number="3"
                    title="Valid Driving Licence"
                    description="Transport/Commercial, if required"
                  />

                  <DocumentItem
                    icon={<UserRound />}
                    number="4"
                    title="Passport Size Photo"
                  />

                  <DocumentItem
                    icon={<Phone />}
                    number="5"
                    title="Mobile Number"
                  />

                  <DocumentItem
                    icon={<FileText />}
                    number="6"
                    title="Email ID"
                    description="if available"
                  />

                  <DocumentItem
                    icon={<Banknote />}
                    number="7"
                    title="Bank Passbook or Cancelled Cheque"
                    description="for payouts"
                  />

                  <DocumentItem
                    icon={<MapPin />}
                    number="8"
                    title="Address Proof"
                    description="if different from Aadhaar"
                  />

                  <DocumentItem
                    icon={<ShieldCheck />}
                    number="9"
                    title="Police Verification Certificate"
                    description="recommended"
                  />

                  <DocumentItem
                    icon={<CheckCircle2 />}
                    number="10"
                    title="Medical Fitness Certificate"
                    description="recommended"
                  />

                </div>
              </div>


              {/* VEHICLE DOCUMENTS */}
              <div className="mt-8">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--primary)]">
                    <CarFront className="h-5 w-5" />
                  </div>

                  <h4 className="text-xl font-extrabold text-[var(--primary)]">
                    Vehicle Documents
                  </h4>

                </div>


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <DocumentItem
                    icon={<FileText />}
                    number="1"
                    title="RC Book"
                    description="Registration Certificate"
                    yellow
                  />

                  <DocumentItem
                    icon={<ShieldCheck />}
                    number="2"
                    title="Vehicle Insurance"
                    yellow
                  />

                  <DocumentItem
                    icon={<CheckCircle2 />}
                    number="3"
                    title="Pollution Under Control (PUC) Certificate"
                    yellow
                  />

                  <DocumentItem
                    icon={<FileCheck />}
                    number="4"
                    title="Fitness Certificate"
                    description="Commercial Vehicle"
                    yellow
                  />

                  <DocumentItem
                    icon={<Banknote />}
                    number="5"
                    title="Road Tax Receipt"
                    yellow
                  />

                  <DocumentItem
                    icon={<FileText />}
                    number="6"
                    title="Permit"
                    description="if applicable"
                    yellow
                  />

                </div>
              </div>


              {/* ADDITIONAL INFORMATION */}
              <div className="mt-8 rounded-2xl border-2 border-green-500/60 bg-green-50 p-5">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                    <Info className="h-5 w-5" />
                  </div>

                  <h4 className="text-xl font-extrabold text-green-700">
                    Additional Information
                  </h4>

                </div>


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <InfoItem
                    icon={<UserRound />}
                    text="Driver Name"
                  />

                  <InfoItem
                    icon={<TrendingUp />}
                    text="Years of Driving Experience"
                  />

                  <InfoItem
                    icon={<FileText />}
                    text="Date of Birth"
                  />

                  <InfoItem
                    icon={<MapPin />}
                    text="Preferred Service Area"
                  />

                  <InfoItem
                    icon={<Phone />}
                    text="Emergency Contact Number"
                  />

                  <InfoItem
                    icon={<Wallet />}
                    text="UPI ID (optional)"
                  />

                  <InfoItem
                    icon={<BadgeCheck />}
                    text="Blood Group"
                  />

                </div>
              </div>


              {/* DRIVER DECLARATION */}
              <div className="mt-8 rounded-2xl bg-[var(--primary)] p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--primary)]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <h4 className="text-xl font-extrabold !text-[var(--secondary)]">
                    Driver Declaration
                  </h4>

                </div>


                <p className="mt-4 text-sm leading-6 text-slate-700 !text-[var(--secondary)]">
                  I hereby declare that all the information and documents
                  submitted are true and valid.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 !text-[var(--secondary)]">
                  I agree to follow all SBS Taxi policies, traffic rules, and
                  customer service standards.
                </p>


                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-sm font-bold text-[var(--secondary)]">
                      Driver Signature:
                    </p>

                    <div className="mt-3 border-b border-slate-400" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[var(--secondary)]">
                      Date:
                    </p>

                    <div className="mt-3 border-b border-slate-400" />
                  </div>

                </div>
              </div>


              {/* BUTTON */}
              <Link
                href="/fleet"
                className="
                  mt-6
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  !text-white
                  transition-all
                  duration-300
                  hover:gap-3
                  hover:bg-[var(--primary-dark)]
                "
              >
                View Driver Documents
                <ArrowRight className="h-5 w-5" />
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


/* ============================================================
   DOCUMENT ITEM
============================================================ */

function DocumentItem({
  icon,
  number,
  title,
  description,
  yellow = false,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description?: string;
  yellow?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-start
        gap-3
        rounded-2xl
        border
        p-3
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-sm
        ${
          yellow
            ? "border-yellow-200 bg-yellow-50"
            : "border-slate-200 bg-slate-50"
        }
      `}
    >

      <div className="relative shrink-0">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            ${
              yellow
                ? "bg-[var(--secondary)] text-[var(--primary)]"
                : "bg-[var(--primary)] text-white"
            }
          `}
        >
          {icon}
        </div>

        <span
          className="
            absolute
            -right-1
            -top-2
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-[var(--primary)]
            text-[10px]
            font-extrabold
            text-white
          "
        >
          {number}
        </span>

      </div>


      <div className="min-w-0">

        <p className="text-sm font-bold leading-5 text-[var(--primary)]">
          {title}
        </p>

        {description && (
          <p className="mt-0.5 text-xs leading-4 text-slate-500">
            {description}
          </p>
        )}

      </div>

    </div>
  );
}


/* ============================================================
   ADDITIONAL INFORMATION ITEM
============================================================ */

function InfoItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center text-green-700">
        {icon}
      </div>

      <span className="text-sm font-semibold text-slate-700">
        {text}
      </span>

    </div>
  );
}