"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  CheckCircle2,
  Clock3,
  CreditCard,
  History,
  MapPin,
  RefreshCw,
  Route,
  Star,
  Wallet,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

interface Ride {
  ride_id: number;
  booking_number: string;

  pickup_address: string;
  pickup_latitude?: string;
  pickup_longitude?: string;

  drop_address: string;
  drop_latitude?: string;
  drop_longitude?: string;

  estimated_distance?: string;
  actual_distance?: string;

  estimated_fare?: string;
  final_fare?: string;

  payment_method?: string;

  status: string;

  requested_at?: string;
  completed_at?: string;
  cancelled_at?: string | null;

  driver_id?: number | null;
  driver_name?: string | null;
  driver_profile_image?: string | null;
  driver_rating?: string | null;

  vehicle_id?: number | null;
  vehicle_number?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  color?: string | null;

  vehicle_type_id?: number | null;
  vehicle_type?: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Ride[] | null;
}

interface PassengerUser {
  id?: number | string;
  user_id?: number | string;
  name?: string;
  email?: string;
  phone?: string;
}

/* ============================================================
   ANIMATIONS
============================================================ */

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

/* ============================================================
   PAGE
============================================================ */

export default function PassengerHistoryPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  /* ============================================================
     GET LOGGED-IN USER
  ============================================================ */

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("sbs_user");

      if (!storedUser) {
        setError(
          "Please sign in to view your ride history."
        );

        setLoading(false);
        return;
      }

      const user: PassengerUser =
        JSON.parse(storedUser);

      const id = Number(
        user.user_id ?? user.id ?? 0
      );

      if (!id) {
        setError(
          "Passenger ID not found. Please sign in again."
        );

        setLoading(false);
        return;
      }

      setUserId(id);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to read your account information."
      );

      setLoading(false);
    }
  }, []);

  /* ============================================================
     FETCH HISTORY
  ============================================================ */

  useEffect(() => {
    if (!userId) return;

    fetchRideHistory(userId);
  }, [userId]);

  async function fetchRideHistory(id: number) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/passenger/ride-history?user_id=${encodeURIComponent(
          String(id)
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      const result: ApiResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to fetch ride history."
        );
      }

      setRides(result.data ?? []);
    } catch (err) {
      console.error(
        "Ride history error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to fetch ride history."
      );
    } finally {
      setLoading(false);
    }
  }

  /* ============================================================
     FILTER
  ============================================================ */

  const filteredRides = useMemo(() => {
    if (filter === "All") {
      return rides;
    }

    return rides.filter(
      (ride) =>
        ride.status?.toLowerCase() ===
        filter.toLowerCase()
    );
  }, [rides, filter]);

  /* ============================================================
     STATS
  ============================================================ */

  const completedCount = rides.filter(
    (ride) =>
      ride.status?.toLowerCase() ===
      "completed"
  ).length;

  const cancelledCount = rides.filter(
    (ride) =>
      ride.status?.toLowerCase() ===
      "cancelled"
  ).length;

  const totalSpent = rides.reduce(
    (total, ride) => {
      const fare = Number(
        ride.final_fare ??
          ride.estimated_fare ??
          0
      );

      return (
        total +
        (Number.isFinite(fare)
          ? fare
          : 0)
      );
    },
    0
  );

  function refreshHistory() {
    if (userId) {
      fetchRideHistory(userId);
    }
  }

  /* ============================================================
     UI
  ============================================================ */

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#f8fafc]
        via-[#f8fafc]
        to-[#eef2f7]
        font-[family-name:var(--font-jakarta)]
        text-slate-900
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
          py-7
          sm:px-6
          sm:py-9
          lg:px-8
          lg:py-10
        "
      >
        {/* ====================================================
            HEADER
        ===================================================== */}

        <motion.section
          variants={itemVariants}
          className="
            flex
            flex-col
            gap-5
            border-b
            border-slate-200
            pb-6
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <Link
              href="/passenger/dashboard"
              className="
                group
                mb-4
                inline-flex
                items-center
                gap-2
                text-xs
                font-bold
                text-slate-500
                transition-colors
                hover:text-[#0b1f3a]
              "
            >
              <ArrowLeft
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  group-hover:-translate-x-1
                "
              />

              Back to Dashboard
            </Link>

            <div className="flex items-center gap-3.5">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#0b1f3a]
                  text-[#ffd23f]
                  shadow-md
                "
              >
                <History className="h-5 w-5" />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.2em]
                    text-slate-400
                  "
                >
                  Passenger Portal
                </p>

                <h1
                  className="
                    mt-0.5
                    text-2xl
                    font-black
                    tracking-tight
                    text-[#0b1f3a]
                    sm:text-3xl
                  "
                >
                  Ride History
                </h1>
              </div>
            </div>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-relaxed
                text-slate-500
              "
            >
              View your previous SBS Taxi trips,
              fares, routes, drivers and vehicle
              information.
            </p>
          </div>

          {/* REFRESH */}

          <motion.button
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
            type="button"
            onClick={refreshHistory}
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-xs
              font-bold
              text-[#0b1f3a]
              shadow-sm
              transition-all
              hover:border-[#0b1f3a]/30
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              className={`
                h-4
                w-4
                ${
                  loading
                    ? "animate-spin"
                    : ""
                }
              `}
            />

            Refresh
          </motion.button>
        </motion.section>

        {/* ====================================================
            SUMMARY STATS
        ===================================================== */}

        <motion.section
          variants={itemVariants}
          className="
            mt-7
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-3
          "
        >
          <Stat
            icon={
              <CarFront className="h-5 w-5" />
            }
            value={String(rides.length)}
            label="Total Rides"
            badge="All time"
          />

          <Stat
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            value={String(completedCount)}
            label="Completed"
            badge={
              rides.length
                ? `${Math.round(
                    (completedCount /
                      rides.length) *
                      100
                  )}% success`
                : "0%"
            }
          />

          <Stat
            icon={
              <Wallet className="h-5 w-5" />
            }
            value={`₹${totalSpent.toLocaleString(
              "en-IN"
            )}`}
            label="Total Spent"
            badge="All time"
          />
        </motion.section>

        {/* ====================================================
            FILTERS
        ===================================================== */}

        <motion.section
          variants={itemVariants}
          className="
            mt-7
            flex
            items-center
            gap-2
            overflow-x-auto
            pb-1
            scrollbar-none
          "
        >
          {[
            "All",
            "Completed",
            "Cancelled",
          ].map((item) => {
            const active =
              filter === item;

            return (
              <motion.button
                key={item}
                whileTap={{
                  scale: 0.95,
                }}
                type="button"
                onClick={() =>
                  setFilter(item)
                }
                className={`
                  shrink-0
                  rounded-full
                  px-5
                  py-2
                  text-xs
                  font-bold
                  transition-all
                  ${
                    active
                      ? "bg-[#0b1f3a] text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                {item}

                {item === "Cancelled" &&
                  cancelledCount > 0 &&
                  ` (${cancelledCount})`}
              </motion.button>
            );
          })}
        </motion.section>

        {/* ====================================================
            CONTENT
        ===================================================== */}

        <motion.section
          variants={itemVariants}
          className="mt-5"
        >
          {loading && (
            <div className="space-y-4">
              <Skeleton />
              <Skeleton />
            </div>
          )}

          {!loading && error && (
            <ErrorBox
              message={error}
              onRetry={refreshHistory}
            />
          )}

          {!loading &&
            !error &&
            filteredRides.length === 0 && (
              <EmptyHistory
                filter={filter}
              />
            )}

          {!loading &&
            !error &&
            filteredRides.length > 0 && (
              <div className="space-y-4">
                {filteredRides.map(
                  (ride) => (
                    <RideCard
                      key={ride.ride_id}
                      ride={ride}
                    />
                  )
                )}
              </div>
            )}
        </motion.section>

        {/* ====================================================
            BOOK RIDE CTA
        ===================================================== */}

        {!loading && !error && (
          <motion.section
            variants={itemVariants}
            className="
              relative
              mt-8
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-[#0b1f3a]
              via-[#102b52]
              to-[#071324]
              px-6
              py-8
              text-white
              shadow-xl
              sm:px-10
            "
          >
            <div
              className="
                absolute
                -right-16
                -top-16
                h-64
                w-64
                rounded-full
                bg-white/5
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-16
                -left-16
                h-64
                w-64
                rounded-full
                bg-[#ffd23f]/10
                blur-3xl
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
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-widest
                    text-[#ffd23f]
                  "
                >
                  Need a ride?
                </p>

                <h2
                  className="
                    mt-1
                    text-xl
                    font-extrabold
                    !text-[var(--text-primary)]
                    sm:text-2xl
                  "
                >
                  Ready for your next journey?
                </h2>

                <p
                  className="
                    mt-1.5
                    max-w-md
                    text-xs
                    leading-relaxed
                    text-slate-300
                  "
                >
                  Book your next SBS Taxi with
                  transparent pricing and
                  reliable service.
                </p>
              </div>

              <Link
                href="/passenger/booking-ride"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[var(--secondary)]
                  px-6
                  py-3.5
                  text-xs
                  font-black
                  !text-[var(--text-secondary)]
                  shadow-lg
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[var(--secondary-dark)]
                "
              >
                Book a Ride
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.section>
        )}
      </motion.div>
    </main>
  );
}

/* ============================================================
   STAT
============================================================ */

function Stat({
  icon,
  value,
  label,
  badge,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  badge: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#0b1f3a]
            text-[#ffd23f]
          "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className="
              text-xl
              font-black
              tracking-tight
              text-slate-900
            "
          >
            {value}
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-xs
              font-semibold
              text-slate-500
            "
          >
            {label}
          </p>
        </div>
      </div>

      <span
        className="
          ml-2
          hidden
          shrink-0
          rounded-full
          bg-slate-100
          px-2.5
          py-1
          text-[10px]
          font-bold
          text-slate-600
          sm:block
        "
      >
        {badge}
      </span>
    </motion.div>
  );
}

/* ============================================================
   RIDE CARD
============================================================ */

function RideCard({
  ride,
}: {
  ride: Ride;
}) {
  const status =
    ride.status?.toLowerCase();

  const completed =
    status === "completed";

  const cancelled =
    status === "cancelled";

  return (
    <motion.article
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      {/* ==================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-100
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${
                cancelled
                  ? "bg-rose-50 text-rose-500"
                  : "bg-emerald-50 text-emerald-600"
              }
            `}
          >
            {cancelled ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p
                className="
                  truncate
                  text-sm
                  font-bold
                  text-slate-900
                "
              >
                {ride.booking_number}
              </p>

              <span className="text-slate-300">
                •
              </span>

              <span
                className="
                  shrink-0
                  text-xs
                  font-medium
                  text-slate-500
                "
              >
                {formatDate(
                  ride.requested_at
                )}
              </span>
            </div>

            <p
              className="
                mt-0.5
                text-[10px]
                font-medium
                text-slate-400
              "
            >
              Booking reference
            </p>
          </div>
        </div>

        <span
          className={`
            w-fit
            rounded-full
            border
            px-3
            py-1
            text-[10px]
            font-extrabold
            uppercase
            tracking-wider
            ${
              cancelled
                ? "border-rose-100 bg-rose-50 text-rose-600"
                : completed
                ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                : "border-amber-100 bg-amber-50 text-amber-600"
            }
          `}
        >
          {ride.status}
        </span>
      </div>

      {/* ==================================================
          ROUTE + FARE
      =================================================== */}

      <div
        className="
          grid
          gap-5
          px-5
          py-5
          sm:px-6
          lg:grid-cols-[1fr_150px]
          lg:gap-8
        "
      >
        {/* ROUTE */}

        <div className="relative">
          {/* CONNECTOR */}

          <div
            className="
              absolute
              left-[6px]
              top-[20px]
              bottom-[20px]
              border-l
              border-dashed
              border-slate-300
            "
          />

          {/* PICKUP */}

          <div className="relative flex gap-3.5">
            <div
              className="
                relative
                z-10
                mt-1
                h-3.5
                w-3.5
                shrink-0
                rounded-full
                bg-[#0b1f3a]
                ring-4
                ring-[#0b1f3a]/10
              "
            />

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Pickup
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                  leading-5
                  text-slate-800
                "
              >
                {ride.pickup_address}
              </p>
            </div>
          </div>

          {/* DROP */}

          <div className="relative mt-6 flex gap-3.5">
            <div
              className="
                relative
                z-10
                mt-1
                flex
                h-3.5
                w-3.5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#ffd23f]
                ring-4
                ring-[#ffd23f]/20
              "
            >
              <MapPin
                className="
                  h-2
                  w-2
                  text-[#0b1f3a]
                "
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Drop
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                  leading-5
                  text-slate-800
                "
              >
                {ride.drop_address}
              </p>
            </div>
          </div>
        </div>

        {/* FARE */}

        <div
          className="
            flex
            flex-col
            justify-center
            rounded-2xl
            border
            border-slate-100
            bg-slate-50
            px-4
            py-4
          "
        >
          <p
            className="
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.15em]
              text-slate-400
            "
          >
            Final Fare
          </p>

          <p
            className="
              mt-1
              text-2xl
              font-black
              tracking-tight
              text-[#0b1f3a]
            "
          >
            ₹
            {Number(
              ride.final_fare ??
                ride.estimated_fare ??
                0
            ).toLocaleString("en-IN")}
          </p>

          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5
              text-[10px]
              font-semibold
              capitalize
              text-slate-500
            "
          >
            <CreditCard className="h-3.5 w-3.5" />

            {ride.payment_method ||
              "Online"}
          </div>
        </div>
      </div>

      {/* ==================================================
          TRIP INFORMATION
      =================================================== */}

      <div
        className="
          grid
          grid-cols-2
          border-t
          border-slate-100
          bg-slate-50/70
          sm:grid-cols-4
        "
      >
        <RideMetric
          icon={
            <Route className="h-4 w-4" />
          }
          label="Distance"
          value={
            ride.actual_distance
              ? `${ride.actual_distance} km`
              : ride.estimated_distance
              ? `${ride.estimated_distance} km`
              : "—"
          }
        />

        <RideMetric
          icon={
            <CarFront className="h-4 w-4" />
          }
          label="Vehicle"
          value={
            ride.vehicle_type ||
            "Standard"
          }
        />

        <RideMetric
          icon={
            <Wallet className="h-4 w-4" />
          }
          label="Payment"
          value={
            ride.payment_method ||
            "Cash"
          }
        />

        <RideMetric
          icon={
            <Clock3 className="h-4 w-4" />
          }
          label="Time"
          value={formatTime(
            ride.requested_at
          )}
        />
      </div>

      {/* ==================================================
          DRIVER
      =================================================== */}

      {ride.driver_name && (
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-slate-100
            px-5
            py-3.5
            sm:px-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-[#0b1f3a]
                text-white
              "
            >
              {ride.driver_profile_image ? (
                <img
                  src={
                    ride.driver_profile_image
                  }
                  alt=""
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <CarFront className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-xs
                  font-bold
                  text-slate-900
                "
              >
                {ride.driver_name}
              </p>

              <div
                className="
                  mt-0.5
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  text-slate-500
                "
              >
                {ride.driver_rating && (
                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      font-semibold
                      text-slate-700
                    "
                  >
                    <Star
                      className="
                        h-3
                        w-3
                        fill-[#ffd23f]
                        text-[#ffd23f]
                      "
                    />

                    {ride.driver_rating}
                  </span>
                )}

                {ride.vehicle_number && (
                  <>
                    <span>•</span>

                    <span className="font-mono">
                      {ride.vehicle_number}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {ride.model && (
            <span
              className="
                hidden
                shrink-0
                rounded-lg
                bg-slate-100
                px-2.5
                py-1
                text-[10px]
                font-bold
                text-slate-700
                sm:block
              "
            >
              {ride.manufacturer
                ? `${ride.manufacturer} `
                : ""}
              {ride.model}
            </span>
          )}
        </div>
      )}
    </motion.article>
  );
}

/* ============================================================
   RIDE METRIC
============================================================ */

function RideMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-2.5
        border-r
        border-slate-200/70
        px-4
        py-3.5
        last:border-r-0
        sm:px-5
      "
    >
      {/* ICON */}

      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-white
          text-slate-500
          shadow-sm
          ring-1
          ring-slate-100
        "
      >
        {icon}
      </div>

      {/* TEXT */}

      <div className="min-w-0">
        <p
          className="
            truncate
            text-[9px]
            font-extrabold
            uppercase
            tracking-[0.12em]
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-xs
            font-bold
            text-slate-800
          "
          title={value}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY
============================================================ */

function EmptyHistory({
  filter,
}: {
  filter: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        px-6
        py-16
        text-center
        shadow-sm
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-slate-400
        "
      >
        <History className="h-8 w-8" />
      </div>

      <h2
        className="
          mt-5
          text-lg
          font-bold
          text-slate-900
        "
      >
        {filter === "All"
          ? "No ride history found"
          : `No ${filter.toLowerCase()} rides available`}
      </h2>

      <p
        className="
          mx-auto
          mt-2
          max-w-sm
          text-xs
          leading-relaxed
          text-slate-500
        "
      >
        Your previous rides will appear
        here once you book a trip.
      </p>

      <Link
        href="/booking"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-[var(--primary)]
          px-6
          py-3
          text-xs
          font-black
          !text-[var(--text-primary)]
          transition-all
          hover:bg-[var(--primary-dark)]
        "
      >
        Book a Ride
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ============================================================
   ERROR
============================================================ */

function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-rose-200
        bg-white
        p-8
        text-center
        shadow-sm
      "
    >
      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-rose-50
          text-rose-500
        "
      >
        <XCircle className="h-7 w-7" />
      </div>

      <h2
        className="
          mt-4
          text-base
          font-bold
          text-slate-900
        "
      >
        Unable to load ride history
      </h2>

      <p
        className="
          mx-auto
          mt-1
          max-w-md
          text-xs
          text-slate-500
        "
      >
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="
          mt-6
          rounded-xl
          bg-[#0b1f3a]
          px-5
          py-2.5
          text-xs
          font-bold
          text-white
          transition-all
          hover:bg-[#14345c]
        "
      >
        Try Again
      </button>
    </div>
  );
}

/* ============================================================
   SKELETON
============================================================ */

function Skeleton() {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="h-16 bg-slate-100" />

      <div className="space-y-4 p-6">
        <div className="h-4 w-1/3 rounded bg-slate-100" />
        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="h-4 w-1/2 rounded bg-slate-100" />
      </div>

      <div className="h-14 bg-slate-50" />
    </div>
  );
}

/* ============================================================
   DATE
============================================================ */

function formatDate(value?: string) {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(
    value.replace(" ", "T")
  );

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* ============================================================
   TIME
============================================================ */

function formatTime(value?: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(
    value.replace(" ", "T")
  );

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}