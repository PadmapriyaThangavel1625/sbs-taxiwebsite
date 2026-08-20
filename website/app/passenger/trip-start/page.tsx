"use client";

import {
  ArrowLeft,
  CarFront,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  Route,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

/* ============================================================
   TYPES
============================================================ */

interface RideDetails {
  ride_id: number;
  booking_number?: string;
  status: string;

  pickup_address: string;
  pickup_latitude?: number;
  pickup_longitude?: number;

  drop_address: string;
  drop_latitude?: number;
  drop_longitude?: number;

  estimated_distance?: number | string | null;
  estimated_duration?: number | string | null;
  estimated_fare?: number | string | null;
  payment_method?: string | null;

  user_id?: number;
  user_name?: string;
  user_mobile?: string;

  vehicle_number?: string;
  manufacturer?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  vehicle_type_name?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: RideDetails;
}

/* ============================================================
   PAGE
   IMPORTANT:
   useSearchParams() is inside TripStartContent,
   which is wrapped with Suspense below.
============================================================ */

export default function TripStartPage() {
  return (
    <Suspense fallback={<TripStartLoading />}>
      <TripStartContent />
    </Suspense>
  );
}

/* ============================================================
   LOADING UI
============================================================ */

function TripStartLoading() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />

        {/* Main skeleton */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="h-40 animate-pulse bg-gray-200" />

          <div className="space-y-5 p-6">
            <div className="h-7 w-56 animate-pulse rounded-lg bg-gray-200" />

            <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />

            <div className="h-28 animate-pulse rounded-2xl bg-gray-100" />

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
            </div>

            <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />

            <div className="h-16 animate-pulse rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   MAIN CONTENT
============================================================ */

function TripStartContent() {
  const searchParams = useSearchParams();

  const rideId = searchParams.get("ride_id");

  const [ride, setRide] =
    useState<RideDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [starting, setStarting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* ==========================================================
     LOAD RIDE
  ========================================================== */

  const loadRide = useCallback(async () => {
    if (!rideId) {
      setError("Ride ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/driver/details?ride_id=${encodeURIComponent(
          rideId
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      let data: ApiResponse;

      try {
        data =
          (await response.json()) as ApiResponse;
      } catch {
        throw new Error(
          "Invalid response received from server."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load ride details."
        );
      }

      setRide(data.data ?? null);

      if (!data.data) {
        setError(
          "Ride details were not found."
        );
      }
    } catch (err) {
      console.error(
        "Trip start ride details error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load ride details."
      );
    } finally {
      setLoading(false);
    }
  }, [rideId]);

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    void loadRide();
  }, [loadRide]);

  /* ==========================================================
     START TRIP
  ========================================================== */

  async function startTrip() {
    if (!rideId || !ride) {
      return;
    }

    if (starting) {
      return;
    }

    try {
      setStarting(true);
      setError("");
      setSuccess("");

      const numericRideId =
        Number(rideId);

      if (
        !Number.isInteger(numericRideId) ||
        numericRideId <= 0
      ) {
        throw new Error(
          "Invalid ride ID."
        );
      }

      const response = await fetch(
        "/api/driver/start",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Accept:
              "application/json",
          },

          body: JSON.stringify({
            ride_id: numericRideId,
          }),

          cache: "no-store",
        }
      );

      let data: ApiResponse;

      try {
        data =
          (await response.json()) as ApiResponse;
      } catch {
        throw new Error(
          "Invalid response received from server."
        );
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to start trip."
        );
      }

      setSuccess(
        "Trip started successfully."
      );

      setRide((previous) =>
        previous
          ? {
              ...previous,
              status: "in_progress",
            }
          : previous
      );

      /*
       * Navigate to trip-running page.
       */
      window.setTimeout(() => {
        window.location.href =
          `/trip-running?ride_id=${encodeURIComponent(
            rideId
          )}`;
      }, 800);
    } catch (err) {
      console.error(
        "Start trip error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to start trip."
      );

      setStarting(false);
    }
  }

  /* ==========================================================
     FORMAT DISTANCE
  ========================================================== */

  function formatDistance(
    value?: number | string | null
  ) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return String(value);
    }

    return `${number.toFixed(1)} km`;
  }

  /* ==========================================================
     FORMAT DURATION
  ========================================================== */

  function formatDuration(
    value?: number | string | null
  ) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return String(value);
    }

    if (number < 60) {
      return `${number} min`;
    }

    const hours =
      Math.floor(number / 60);

    const minutes =
      number % 60;

    return minutes > 0
      ? `${hours}h ${minutes}m`
      : `${hours}h`;
  }

  /* ==========================================================
     FORMAT FARE
  ========================================================== */

  function formatFare(
    value?: number | string | null
  ) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return `₹${value}`;
    }

    return `₹${number.toLocaleString(
      "en-IN"
    )}`;
  }

  /* ==========================================================
     ERROR WITHOUT RIDE
  ========================================================== */

  if (error && !ride && !loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Route size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-900">
            Unable to load trip
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              void loadRide();
            }}
            className="mt-6 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Try Again
          </button>

          <Link
            href="/driverdashboard"
            className="mt-3 block text-sm font-semibold text-gray-500 hover:text-gray-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  /* ==========================================================
     NO RIDE
  ========================================================== */

  if (!ride) {
    return <TripStartLoading />;
  }

  /* ==========================================================
     CAN START
  ========================================================== */

  const canStart =
    ride.status.trim().toLowerCase() ===
    "arrived";

  /* ==========================================================
     STATUS LABEL
  ========================================================== */

  const statusLabel =
    ride.status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  /* ==========================================================
     MAIN UI
  ========================================================== */

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/driverdashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ArrowLeft size={18} />

            <span>Back</span>
          </Link>

          <div
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              canStart
                ? "bg-emerald-50 text-emerald-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {canStart
              ? "Ready to Start"
              : statusLabel.toUpperCase()}
          </div>
        </div>

        {/* ====================================================
            MAIN CARD
        ==================================================== */}

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* ==================================================
              TOP BANNER
          ================================================== */}

          <div className="relative overflow-hidden bg-[var(--primary)] px-5 py-7 sm:px-8 sm:py-9">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />

            <div className="absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative">

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Navigation size={24} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Trip
                  </p>

                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Start Trip
                  </h1>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">

                {ride.booking_number && (
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                    Booking #
                    {ride.booking_number}
                  </span>
                )}

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold capitalize text-white">
                  {ride.status.replace(
                    /_/g,
                    " "
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div className="p-5 sm:p-8">

            {/* ==================================================
                PASSENGER
            ================================================== */}

            <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[var(--primary)] shadow-sm">
                  <UserRound size={22} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Passenger
                  </p>

                  <h2 className="mt-0.5 font-bold text-gray-900">
                    {ride.user_name ||
                      "Passenger"}
                  </h2>
                </div>
              </div>

              {ride.user_mobile && (
                <a
                  href={`tel:${ride.user_mobile}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[var(--primary)] shadow-sm transition hover:opacity-80"
                >
                  <Phone size={17} />

                  Call Passenger
                </a>
              )}
            </div>

            {/* ==================================================
                ROUTE
            ================================================== */}

            <div className="mt-6 rounded-2xl border border-gray-200 p-5">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                    Route
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-gray-900">
                    Pickup to Destination
                  </h2>
                </div>

                <Route
                  size={22}
                  className="text-[var(--primary)]"
                />
              </div>

              <div className="relative">

                {/* Vertical line */}
                <div className="absolute left-[9px] top-6 h-[calc(100%-48px)] w-px bg-gray-200" />

                {/* Pickup */}
                <div className="relative flex gap-4">

                  <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-emerald-50">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  <div className="pb-7">
                    <p className="text-xs font-medium text-emerald-600">
                      PICKUP
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-900">
                      {ride.pickup_address}
                    </p>
                  </div>
                </div>

                {/* Destination */}
                <div className="relative flex gap-4">

                  <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 ring-4 ring-red-50">
                    <MapPin
                      size={11}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-red-600">
                      DESTINATION
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-900">
                      {ride.drop_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================================================
                TRIP INFORMATION
            ================================================== */}

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <TripInfo
                icon={<Route size={19} />}
                label="Distance"
                value={formatDistance(
                  ride.estimated_distance
                )}
              />

              <TripInfo
                icon={<Clock3 size={19} />}
                label="Duration"
                value={formatDuration(
                  ride.estimated_duration
                )}
              />

              <TripInfo
                icon={<CarFront size={19} />}
                label="Vehicle"
                value={
                  ride.vehicle_number ||
                  ride.vehicle_type_name ||
                  "Assigned"
                }
              />
            </div>

            {/* ==================================================
                FARE
            ================================================== */}

            <div className="mt-6 rounded-2xl border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 p-5">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Estimated Fare
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-gray-900">
                    {formatFare(
                      ride.estimated_fare
                    )}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    Payment
                  </p>

                  <p className="mt-1 text-sm font-bold uppercase text-gray-900">
                    {ride.payment_method ||
                      "Cash"}
                  </p>
                </div>

              </div>
            </div>

            {/* ==================================================
                VEHICLE
            ================================================== */}

            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                <CarFront size={23} />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-medium text-gray-500">
                  Assigned Vehicle
                </p>

                <p className="mt-1 truncate text-sm font-bold text-gray-900">
                  {[
                    ride.manufacturer,
                    ride.vehicle_model,
                  ]
                    .filter(Boolean)
                    .join(" ") ||
                    "Vehicle"}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {ride.vehicle_number ||
                    "Number unavailable"}

                  {ride.vehicle_color
                    ? ` • ${ride.vehicle_color}`
                    : ""}
                </p>
              </div>
            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">

                <span>{error}</span>

                {ride && (
                  <button
                    type="button"
                    onClick={() => {
                      void loadRide();
                    }}
                    className="shrink-0 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}

            {/* ==================================================
                SUCCESS
            ================================================== */}

            {success && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                <CheckCircle2 size={18} />

                {success}
              </div>
            )}

            {/* ==================================================
                START BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={startTrip}
              disabled={!canStart || starting}
              className={`mt-6 flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-base font-bold shadow-sm transition ${
                canStart && !starting
                  ? "bg-[var(--primary)] text-white hover:opacity-90 active:scale-[0.99]"
                  : "cursor-not-allowed bg-gray-200 text-gray-500"
              }`}
            >
              {starting ? (
                <>
                  <Loader2
                    size={21}
                    className="animate-spin"
                  />

                  Starting Trip...
                </>
              ) : (
                <>
                  <Navigation size={21} />

                  {canStart
                    ? "Start Trip"
                    : "Trip Cannot Be Started"}
                </>
              )}
            </button>

            {/* ==================================================
                START CONDITION
            ================================================== */}

            {!canStart && (
              <p className="mt-3 text-center text-xs leading-5 text-gray-500">
                The trip can be started only
                after the driver has arrived at
                the pickup location.
              </p>
            )}

          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   TRIP INFO CARD
============================================================ */

function TripInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

      <div className="flex items-center gap-2 text-[var(--primary)]">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-gray-900">
        {value}
      </p>

    </div>
  );
}