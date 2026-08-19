"use client";

import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Clock3,
  History,
  MapPin,
  Wallet,
  XCircle,
  User,
  CalendarDays,
  Navigation,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

interface PassengerUser {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
}

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const cardHover = {
  y: -3,
  transition: {
    duration: 0.2,
    ease: "easeOut" as const,
  },
};

/* ============================================================
   DASHBOARD
============================================================ */

export default function PassengerDashboard() {
  const [user, setUser] = useState<PassengerUser | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("sbs_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const passengerName = user?.name || "Passenger";
  const firstName = passengerName.split(" ")[0] || "Passenger";

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-slate-900/5
        font-[family-name:var(--font-jakarta)]
        selection:bg-[var(--secondary)]
        selection:text-black
      "
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          mx-auto
          max-w-7xl
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
          lg:py-10
        "
      >
        {/* ====================================================
            WELCOME HERO
        ===================================================== */}

        <motion.section
          variants={itemVariants}
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-[var(--primary)]
            to-slate-900
            p-6
            shadow-2xl
            sm:p-8
            lg:p-10
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-white/5
              blur-2xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              right-20
              h-72
              w-72
              rounded-full
              bg-[var(--secondary)]/15
              blur-3xl
            "
          />

          <div className="relative z-10">
            <div
              className="
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div className="max-w-2xl">
                <div
                  className="
                    mb-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-3.5
                    py-1.5
                    text-xs
                    font-medium
                    text-white/90
                    backdrop-blur-md
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--secondary)]
                    "
                  />
                  Passenger Dashboard
                </div>

                <h1
                  className="
                    text-3xl
                    font-extrabold
                    tracking-tight
                    !text-[var(--text-primary)]
                    sm:text-4xl
                  "
                >
                  Welcome back, {firstName} 👋
                </h1>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-relaxed
                    text-white/75
                    sm:text-base
                  "
                >
                  Ready for your next journey? Book a reliable SBS Taxi and
                  experience supreme comfort on every ride.
                </p>

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    gap-4
                    text-xs
                    font-medium
                    text-white/80
                  "
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[var(--secondary)]" />
                    Verified Safe Rides
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-[var(--secondary)]" />
                    Top Rated Drivers
                  </span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/booking"
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-[var(--secondary)]
                    px-7
                    py-4
                    text-sm
                    font-bold
                    text-black
                    shadow-lg
                    shadow-[var(--secondary)]/20
                    transition-all
                    hover:brightness-105
                    sm:w-auto
                  "
                >
                  <CarFront className="h-5 w-5" />
                  Book a Ride
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ====================================================
            STATS
        ==================================================== */}

        <motion.section
          variants={itemVariants}
          className="
            mt-6
            grid
            grid-cols-2
            gap-3
            sm:gap-4
            lg:grid-cols-4
          "
        >
          <StatCard
            icon={<CarFront className="h-5 w-5" />}
            label="Total Rides"
            value="12"
            iconClass="bg-blue-50 text-[var(--primary)]"
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Completed"
            value="10"
            iconClass="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            icon={<XCircle className="h-5 w-5" />}
            label="Cancelled"
            value="2"
            iconClass="bg-rose-50 text-rose-500"
          />
          <StatCard
            icon={<Wallet className="h-5 w-5" />}
            label="Wallet Balance"
            value="₹0"
            iconClass="bg-amber-50 text-amber-600"
          />
        </motion.section>

        {/* ====================================================
            QUICK ACTIONS
        ==================================================== */}

        <motion.section
          variants={itemVariants}
          className="
            mt-6
            rounded-3xl
            border
            border-slate-200/80
            bg-white
            p-5
            shadow-sm
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-[var(--primary)]
                "
              >
                Shortcuts
              </p>
              <h2
                className="
                  mt-1
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                Quick Actions
              </h2>
            </div>
          </div>

          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-4
            "
          >
            <QuickAction
              href="/booking"
              icon={<CarFront className="h-6 w-6" />}
              title="Book a Ride"
              description="Get a taxi instantly"
            />
            <QuickAction
              href="/passenger/history"
              icon={<History className="h-6 w-6" />}
              title="Ride History"
              description="View past trips"
            />
            <QuickAction
              href="/passenger/saved-places"
              icon={<MapPin className="h-6 w-6" />}
              title="Saved Places"
              description="Favourite locations"
            />
            <QuickAction
              href="/passenger/wallet"
              icon={<Wallet className="h-6 w-6" />}
              title="Wallet"
              description="Add funds & pay"
            />
          </div>
        </motion.section>

        {/* ====================================================
            MAIN CONTENT SECTION
        ==================================================== */}

        <section
          className="
            mt-6
            grid
            gap-6
            lg:grid-cols-3
          "
        >
          {/* RECENT RIDES */}
          <motion.div
            variants={itemVariants}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200/80
              bg-white
              shadow-sm
              lg:col-span-2
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-5
                py-5
                sm:px-6
              "
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Rides
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Your latest SBS Taxi bookings.
                </p>
              </div>

              <Link
                href="/passenger/history"
                className="
                  hidden
                  items-center
                  gap-1
                  text-sm
                  font-semibold
                  text-[var(--primary)]
                  transition-colors
                  hover:text-slate-900
                  sm:flex
                "
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <RideItem
              from="Erode"
              to="Coimbatore"
              date="18 Aug 2026"
              time="10:30 AM"
              fare="₹850"
            />

            <RideItem
              from="Erode"
              to="Salem"
              date="15 Aug 2026"
              time="08:00 AM"
              fare="₹720"
              last
            />

            <div className="border-t border-slate-100 px-5 py-4 sm:hidden">
              <Link
                href="/passenger/history"
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  text-sm
                  font-semibold
                  text-[var(--primary)]
                "
              >
                View All Rides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* PROFILE CARD */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHover}
            className="
              flex
              flex-col
              justify-between
              rounded-3xl
              border
              border-slate-200/80
              bg-white
              p-5
              shadow-sm
              sm:p-6
            "
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-[var(--primary)]
                    "
                  >
                    Account
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    My Profile
                  </h2>
                </div>
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-[var(--primary)]
                  "
                >
                  <User className="h-5 w-5" />
                </div>
              </div>

              <div
                className="
                  mt-6
                  rounded-2xl
                  bg-slate-50
                  p-4
                  border
                  border-slate-100
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--primary)]
                      text-white
                      font-bold
                    "
                  >
                    {firstName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {passengerName}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user?.email || "Passenger account"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/passenger/profile"
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  transition-colors
                  hover:border-[var(--primary)]
                  hover:bg-slate-50
                  hover:text-[var(--primary)]
                "
              >
                Manage Profile
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div
                className="
                  mt-4
                  rounded-xl
                  border
                  border-dashed
                  border-slate-200
                  p-4
                  bg-slate-50/50
                "
              >
                <div className="flex gap-3">
                  <ShieldCheck
                    className="
                      mt-0.5
                      h-5
                      w-5
                      shrink-0
                      text-emerald-600
                    "
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Account is secure
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                      Your passenger data is fully protected and encrypted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ====================================================
            BOTTOM CTA
        ==================================================== */}

        <motion.section
          variants={itemVariants}
          className="
            relative
            mt-6
            overflow-hidden
            rounded-3xl
            border
            border-slate-200/80
            bg-white
            p-6
            shadow-sm
            sm:p-8
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              h-full
              w-1/3
              bg-gradient-to-l
              from-[var(--secondary)]/10
              to-transparent
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-[var(--primary)]" />
                <h2 className="text-lg font-bold text-slate-900">
                  Planning your next trip?
                </h2>
              </div>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500">
                Book your SBS Taxi in advance and enjoy a smooth, reliable, and comfortable journey to any destination.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/booking"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  !text-[var(--text-primary)]
                  shadow-md
                  transition-opacity
                  hover:opacity-95
                "
              >
                Book Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconClass: string;
}

function StatCard({ icon, label, value, iconClass }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={cardHover}
      className="
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          ${iconClass}
        `}
      >
        {icon}
      </div>

      <p
        className="
          mt-4
          text-xl
          font-bold
          text-slate-900
          sm:text-2xl
        "
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</p>
    </motion.div>
  );
}

/* ============================================================
   QUICK ACTION
============================================================ */

interface QuickActionProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function QuickAction({ href, icon, title, description }: QuickActionProps) {
  return (
    <motion.div whileHover={cardHover}>
      <Link
        href={href}
        className="
          group
          block
          rounded-2xl
          border
          border-slate-200/80
          bg-white
          p-4
          transition-all
          duration-200
          hover:border-[var(--secondary)]
          hover:shadow-md
          sm:p-5
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-50
            text-[var(--primary)]
            transition-colors
            group-hover:bg-[var(--secondary)]
          "
        >
          {icon}
        </div>

        <div className="mt-4">
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="mt-0.5 text-[11px] text-slate-500">{description}</p>
        </div>

        <div
          className="
            mt-4
            flex
            items-center
            text-[11px]
            font-semibold
            text-[var(--primary)]
          "
        >
          Open
          <ArrowRight
            className="
              ml-1
              h-3.5
              w-3.5
              transition-transform
              group-hover:translate-x-1
            "
          />
        </div>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   RIDE ITEM
============================================================ */

interface RideItemProps {
  from: string;
  to: string;
  date: string;
  time: string;
  fare: string;
  last?: boolean;
}

function RideItem({ from, to, date, time, fare, last = false }: RideItemProps) {
  return (
    <motion.div
      whileHover={{
        backgroundColor: "rgba(248, 250, 252, 0.6)",
      }}
      className={`
        flex
        flex-col
        gap-4
        px-5
        py-4
        transition-colors
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
        ${!last ? "border-b border-slate-100" : ""}
      `}
    >
      <div className="flex min-w-0 gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-emerald-50
            text-emerald-600
          "
        >
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-slate-900">{from}</p>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <p className="truncate text-sm font-bold text-slate-900">{to}</p>
          </div>

          <div
            className="
              mt-1.5
              flex
              flex-wrap
              gap-3
              text-[11px]
              text-slate-500
            "
          >
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {time}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:block sm:text-right">
        <div>
          <p className="text-base font-bold text-slate-900">{fare}</p>
          <p className="mt-0.5 text-[11px] font-semibold text-emerald-600">
            Completed
          </p>
        </div>
      </div>
    </motion.div>
  );
}