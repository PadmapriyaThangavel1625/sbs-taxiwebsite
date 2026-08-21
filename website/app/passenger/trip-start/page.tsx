"use client";

import {
  ArrowLeft,
  Baby,
  CarFront,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  Navigation,
  PlayCircle,
  Route,
  ShieldCheck,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";

import Link from "next/link";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import toast from "react-hot-toast";

/* ============================================================
   TYPES
============================================================ */

interface TripBooking {
  ride_id?: number | string | null;
  booking_id?: number | string | null;
  booking_number?: string | null;

  user_id?: number | string | null;

  pickup_address?: string | null;
  pickup_latitude?: number | string | null;
  pickup_longitude?: number | string | null;

  drop_address?: string | null;
  drop_latitude?: number | string | null;
  drop_longitude?: number | string | null;

  destination_address?: string | null;
  destination_latitude?: number | string | null;
  destination_longitude?: number | string | null;

  passenger_name?: string | null;
  passenger_phone?: string | null;
  passenger_email?: string | null;

  passenger_count?: number | string | null;
  people?: number | string | null;
  passengers?: number | string | null;

  babies?: number | string | null;
  elderly?: number | string | null;

  vehicle_type_id?: number | string | null;
  vehicle_type_name?: string | null;

  estimated_fare?: number | string | null;
  fare?: number | string | null;

  distance_km?: number | string | null;
  distance?: number | string | null;

  duration_minutes?: number | string | null;
  duration?: number | string | null;

  trip_type?: string | null;

  pickup_date?: string | null;
  pickup_time?: string | null;

  status?: string | null;

  driver_id?: number | string | null;
  driver_name?: string | null;
  driver_mobile?: string | null;
  driver_email?: string | null;

  vehicle_id?: number | string | null;
  vehicle_number?: string | null;
  vehicle_model?: string | null;
  vehicle_color?: string | null;

  [key: string]: unknown;
}

interface StartTripResponse {
  success: boolean;
  message?: string;

  data?: {
    ride_id?: number | string;
    booking_id?: number | string;
    booking_number?: string;
    status?: string;

    pickup_address?: string;
    drop_address?: string;

    pickup_latitude?: number | string;
    pickup_longitude?: number | string;

    drop_latitude?: number | string;
    drop_longitude?: number | string;

    distance_km?: number | string;
    duration_minutes?: number | string;

    estimated_fare?: number | string;
    fare?: number | string;

    [key: string]: unknown;
  };
}

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
}

/* ============================================================
   PAGE
============================================================ */

export default function TripStartPage() {
  return (
    <Suspense fallback={<TripStartLoading />}>
      <TripStartContent />
    </Suspense>
  );
}

/* ============================================================
   MAIN
============================================================ */

function TripStartContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [booking, setBooking] =
    useState<TripBooking | null>(null);

  const [rideId, setRideId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [startingTrip, setStartingTrip] =
    useState(false);

  const [tripStarted, setTripStarted] =
    useState(false);

  const [cancelling, setCancelling] =
    useState(false);

  /* ==========================================================
     GET RIDE ID
  ========================================================== */

  const getRideId = useCallback(() => {
    const urlRideId =
      searchParams.get("ride_id");

    const storedRideId =
      typeof window !== "undefined"
        ? localStorage.getItem("ride_id")
        : null;

    const finalRideId =
      urlRideId || storedRideId;

    if (urlRideId) {
      localStorage.setItem(
        "ride_id",
        urlRideId
      );
    }

    if (finalRideId) {
      setRideId(finalRideId);
    }

    console.log(
      "Trip Start ride_id:",
      finalRideId
    );

    return finalRideId;
  }, [searchParams]);

  /* ==========================================================
     READ BOOKING DATA
  ========================================================== */

  const getStoredBooking =
    useCallback(
      (
        currentRideId?: string | null
      ): TripBooking | null => {
        try {
          let bookingData:
            | TripBooking
            | null = null;

          const storageKeys = [
            "sbs_trip_start_booking",
            "sbs_booking_data",
            "sbs_search_driver_booking",
            "sbs_booking",
            "booking_data",
          ];

          for (
            const key of storageKeys
          ) {
            const stored =
              sessionStorage.getItem(key);

            if (!stored) {
              continue;
            }

            try {
              const parsed =
                JSON.parse(
                  stored
                ) as TripBooking;

              if (
                parsed &&
                typeof parsed === "object"
              ) {
                bookingData = parsed;

                console.log(
                  "Trip booking found:",
                  key,
                  bookingData
                );

                break;
              }
            } catch (parseError) {
              console.error(
                `Unable to parse ${key}:`,
                parseError
              );
            }
          }

          const storedRideId =
            localStorage.getItem(
              "ride_id"
            );

          const storedBookingId =
            sessionStorage.getItem(
              "sbs_booking_id"
            );

          const storedBookingNumber =
            sessionStorage.getItem(
              "sbs_booking_number"
            );

          const finalRideId =
            currentRideId ||
            bookingData?.ride_id ||
            storedRideId;

          const mergedBooking: TripBooking = {
            ...(bookingData || {}),

            ride_id:
              finalRideId || null,

            booking_id:
              bookingData?.booking_id ||
              storedBookingId ||
              null,

            booking_number:
              bookingData?.booking_number ||
              storedBookingNumber ||
              null,
          };

          const hasData =
            Object.values(
              mergedBooking
            ).some(
              (value) =>
                value !== null &&
                value !== undefined &&
                value !== ""
            );

          if (!hasData) {
            return null;
          }

          return mergedBooking;
        } catch (err) {
          console.error(
            "Get stored booking error:",
            err
          );

          return null;
        }
      },
      []
    );

  /* ==========================================================
     LOAD BOOKING
  ========================================================== */

  const loadBooking =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const currentRideId =
          getRideId();

        if (!currentRideId) {
          throw new Error(
            "ride_id is required"
          );
        }

        const storedBooking =
          getStoredBooking(
            currentRideId
          );

        if (storedBooking) {
          setBooking(
            storedBooking
          );

          console.log(
            "Loaded trip booking:",
            storedBooking
          );

          /*
           * Restore trip started state.
           */

          const storedStarted =
            sessionStorage.getItem(
              "sbs_trip_started"
            );

          if (
            storedStarted === "true"
          ) {
            setTripStarted(
              true
            );
          }

          return;
        }

        /*
         * Fetch ride information
         * when sessionStorage has no data.
         */

        const apiUrl =
          `/api/passenger/ride-details?ride_id=${encodeURIComponent(
            currentRideId
          )}`;

        console.log(
          "Fetching ride details:",
          apiUrl
        );

        const response =
          await fetch(
            apiUrl,
            {
              method: "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache: "no-store",
            }
          );

        const text =
          await response.text();

        console.log(
          "Ride details response:",
          text
        );

        let data:
          | {
              success?: boolean;
              message?: string;
              data?: TripBooking;
            }
          | null = null;

        try {
          data =
            JSON.parse(text);
        } catch {
          throw new Error(
            "Ride details API returned invalid JSON"
          );
        }

        if (
          !response.ok ||
          !data?.success
        ) {
          throw new Error(
            data?.message ||
              "Unable to load ride details"
          );
        }

        if (!data.data) {
          throw new Error(
            "Ride information was not found"
          );
        }

        const finalBooking:
          TripBooking = {
          ...data.data,

          ride_id:
            data.data.ride_id ||
            currentRideId,
        };

        setBooking(
          finalBooking
        );

        sessionStorage.setItem(
          "sbs_trip_start_booking",
          JSON.stringify(
            finalBooking
          )
        );
      } catch (err) {
        console.error(
          "Trip start loading error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load trip"
        );
      } finally {
        setLoading(false);
      }
    }, [
      getRideId,
      getStoredBooking,
    ]);

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  /* ==========================================================
     NUMERIC HELPER
  ========================================================== */

  const toNumber = (
    value:
      | number
      | string
      | null
      | undefined
  ) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    const number =
      Number(value);

    return Number.isFinite(
      number
    )
      ? number
      : null;
  };

  /* ==========================================================
     DISPLAY VALUES
  ========================================================== */

  const passengerCount =
    useMemo(() => {
      const value =
        booking?.passenger_count ??
        booking?.people ??
        booking?.passengers ??
        0;

      return (
        toNumber(value) ?? 0
      );
    }, [booking]);

  const babies =
    useMemo(() => {
      return (
        toNumber(
          booking?.babies
        ) ?? 0
      );
    }, [booking]);

  const elderly =
    useMemo(() => {
      return (
        toNumber(
          booking?.elderly
        ) ?? 0
      );
    }, [booking]);

  const distance =
    useMemo(() => {
      return toNumber(
        booking?.distance_km ??
          booking?.distance
      );
    }, [booking]);

  const duration =
    useMemo(() => {
      return toNumber(
        booking?.duration_minutes ??
          booking?.duration
      );
    }, [booking]);

  const fare =
    useMemo(() => {
      return toNumber(
        booking?.estimated_fare ??
          booking?.fare
      );
    }, [booking]);

  /* ==========================================================
     FORMAT FARE
  ========================================================== */

  function formatFare(
    value: number | null
  ) {
    if (value === null) {
      return "Fare unavailable";
    }

    return `₹${value.toLocaleString(
      "en-IN"
    )}`;
  }

  /* ==========================================================
     FORMAT DISTANCE
  ========================================================== */

  function formatDistance(
    value: number | null
  ) {
    if (value === null) {
      return "—";
    }

    return `${value.toFixed(
      1
    )} km`;
  }

  /* ==========================================================
     FORMAT DURATION
  ========================================================== */

  function formatDuration(
    value: number | null
  ) {
    if (value === null) {
      return "—";
    }

    const rounded =
      Math.round(value);

    if (rounded < 60) {
      return `${rounded} min`;
    }

    const hours =
      Math.floor(
        rounded / 60
      );

    const minutes =
      rounded % 60;

    if (minutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${minutes} min`;
  }

  /* ==========================================================
     START TRIP
     
     OTP VERIFICATION REMOVED.
     
     Driver can directly start the trip.
  ========================================================== */

  async function handleStartTrip() {
    if (!rideId) {
      toast.error(
        "Ride ID is missing"
      );

      return;
    }

    if (startingTrip) {
      return;
    }

    try {
      setStartingTrip(
        true
      );

      const payload = {
        ride_id:
          Number(rideId),

        booking_id:
          toNumber(
            booking?.booking_id
          ),

        booking_number:
          booking?.booking_number ||
          null,

        pickup_address:
          booking?.pickup_address ||
          null,

        pickup_latitude:
          booking?.pickup_latitude ||
          null,

        pickup_longitude:
          booking?.pickup_longitude ||
          null,

        drop_address:
          booking?.drop_address ||
          booking?.destination_address ||
          null,

        drop_latitude:
          booking?.drop_latitude ||
          booking?.destination_latitude ||
          null,

        drop_longitude:
          booking?.drop_longitude ||
          booking?.destination_longitude ||
          null,

        passenger_name:
          booking?.passenger_name ||
          null,

        passenger_phone:
          booking?.passenger_phone ||
          null,

        passenger_count:
          passengerCount,

        babies:
          babies,

        elderly:
          elderly,

        driver_id:
          booking?.driver_id ||
          null,

        driver_name:
          booking?.driver_name ||
          null,

        driver_mobile:
          booking?.driver_mobile ||
          null,

        vehicle_id:
          booking?.vehicle_id ||
          null,

        vehicle_number:
          booking?.vehicle_number ||
          null,

        vehicle_type_id:
          booking?.vehicle_type_id ||
          null,

        vehicle_type_name:
          booking?.vehicle_type_name ||
          null,

        vehicle_model:
          booking?.vehicle_model ||
          null,

        vehicle_color:
          booking?.vehicle_color ||
          null,
      };

      console.log(
        "================================="
      );

      console.log(
        "START TRIP PAYLOAD"
      );

      console.log(
        payload
      );

      console.log(
        "================================="
      );

      const response =
        await fetch(
          "/api/passenger/start-trip",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),

            cache: "no-store",
          }
        );

      const text =
        await response.text();

      console.log(
        "Start trip response:",
        text
      );

      let data:
        StartTripResponse;

      try {
        data =
          JSON.parse(
            text
          ) as StartTripResponse;
      } catch {
        throw new Error(
          "Start trip API returned invalid JSON"
        );
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to start trip"
        );
      }

      setTripStarted(
        true
      );

      sessionStorage.setItem(
        "sbs_trip_started",
        "true"
      );

      /*
       * Merge returned API information
       * with existing booking information.
       */

      const updatedBooking:
        TripBooking = {
        ...(booking || {}),

        ...(data.data || {}),

        ride_id:
          data.data?.ride_id ||
          booking?.ride_id ||
          rideId,

        status:
          data.data?.status ||
          "started",
      };

      setBooking(
        updatedBooking
      );

      sessionStorage.setItem(
        "sbs_trip_start_booking",
        JSON.stringify(
          updatedBooking
        )
      );

      sessionStorage.setItem(
        "sbs_booking_data",
        JSON.stringify(
          updatedBooking
        )
      );

      toast.success(
        data.message ||
          "Trip started successfully"
      );
    } catch (error) {
      console.error(
        "Start trip error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to start trip"
      );
    } finally {
      setStartingTrip(
        false
      );
    }
  }

  /* ==========================================================
     CANCEL RIDE
  ========================================================== */

  async function handleCancelRide() {
    if (!rideId) {
      toast.error(
        "Ride ID is missing"
      );

      return;
    }

    if (cancelling) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to cancel ride #${rideId}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(
        true
      );

      const loadingToast =
        toast.loading(
          "Cancelling ride..."
        );

      const response =
        await fetch(
          "/api/passenger/cancel",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body: JSON.stringify({
              ride_id:
                Number(rideId),
            }),

            cache: "no-store",
          }
        );

      const text =
        await response.text();

      let data:
        ApiErrorResponse;

      try {
        data =
          JSON.parse(
            text
          ) as ApiErrorResponse;
      } catch {
        toast.dismiss(
          loadingToast
        );

        toast.error(
          "Invalid cancellation server response"
        );

        return;
      }

      toast.dismiss(
        loadingToast
      );

      if (
        !response.ok ||
        !data.success
      ) {
        toast.error(
          data.message ||
            "Unable to cancel ride"
        );

        return;
      }

      toast.success(
        data.message ||
          "Ride cancelled successfully"
      );

      localStorage.removeItem(
        "ride_id"
      );

      sessionStorage.removeItem(
        "sbs_trip_start_booking"
      );

      sessionStorage.removeItem(
        "sbs_booking_data"
      );

      sessionStorage.removeItem(
        "sbs_trip_started"
      );

      router.push(
        "/passenger/search-driver"
      );
    } catch (error) {
      console.error(
        "Cancel ride error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to cancel ride"
      );
    } finally {
      setCancelling(
        false
      );
    }
  }

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <TripStartLoading />
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (
    error ||
    !booking
  ) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[var(--background)]
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-gray-200
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
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-600
            "
          >
            <XCircle
              size={30}
            />
          </div>

          <h1
            className="
              mt-5
              text-xl
              font-bold
              text-gray-900
            "
          >
            Unable to load trip
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            {error ||
              "Trip information was not found."}
          </p>

          <div
            className="
              mt-6
              flex
              flex-col
              gap-3
            "
          >
            <button
              type="button"
              onClick={
                loadBooking
              }
              className="
                rounded-xl
                bg-[var(--primary)]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Try Again
            </button>

            <Link
              href="/passenger/search-driver"
              className="
                rounded-xl
                border
                border-gray-200
                px-5
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              Back
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     PICKUP / DROP
  ========================================================== */

  const pickupAddress =
    booking.pickup_address ||
    "Pickup unavailable";

  const dropAddress =
    booking.drop_address ||
    booking.destination_address ||
    "Destination unavailable";

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        py-5
        sm:py-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <Link
            href={`/passenger/driverprofile?ride_id=${encodeURIComponent(
              rideId || ""
            )}`}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-gray-700
              shadow-sm
              transition
              hover:border-[var(--primary)]
              hover:text-[var(--primary)]
            "
          >
            <ArrowLeft
              size={18}
            />

            Back
          </Link>

          {tripStarted && (
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-4
                py-2
                text-xs
                font-bold
                text-emerald-700
              "
            >
              <CheckCircle2
                size={15}
              />

              Trip Started
            </span>
          )}
        </div>

        {/* ======================================================
            TITLE
        ====================================================== */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              bg-[var(--primary)]
              px-5
              py-7
              text-white
              sm:px-8
              sm:py-9
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
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white/10
                    "
                  >
                    <Navigation
                      size={25}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-white/70
                      "
                    >
                      SBS Taxi
                    </p>

                    <h1
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        sm:text-3xl
                      "
                    >
                      Start Trip
                    </h1>
                  </div>
                </div>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-6
                    text-white/80
                  "
                >
                  Start the passenger trip
                  when you are ready.
                </p>
              </div>

              {rideId && (
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/10
                    px-4
                    py-3
                  "
                >
                  <p
                    className="
                      text-[11px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-white/60
                    "
                  >
                    Ride ID
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-bold
                    "
                  >
                    #{rideId}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ====================================================
              PASSENGER SUMMARY
          ==================================================== */}

          <div
            className="
              grid
              border-b
              border-gray-100
              sm:grid-cols-3
            "
          >
            <SummaryItem
              icon={
                <Users
                  size={21}
                />
              }
              label="Passengers"
              value={String(
                passengerCount
              )}
            />

            <SummaryItem
              icon={
                <Baby
                  size={21}
                />
              }
              label="Babies"
              value={String(
                babies
              )}
            />

            <SummaryItem
              icon={
                <UserRound
                  size={21}
                />
              }
              label="Elderly"
              value={String(
                elderly
              )}
            />
          </div>
        </section>

        {/* ======================================================
            ROUTE
        ====================================================== */}

        <section
          className="
            mt-6
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
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
                bg-gray-50
                text-[var(--primary)]
              "
            >
              <Route
                size={21}
              />
            </div>

            <div>
              <h2
                className="
                  font-bold
                  text-gray-900
                "
              >
                Route
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Pickup to destination
              </p>
            </div>
          </div>

          <div
            className="
              mt-6
              grid
              gap-4
              lg:grid-cols-[1fr_auto_1fr]
              lg:items-center
            "
          >
            <LocationCard
              type="Pickup"
              address={
                pickupAddress
              }
              icon={
                <MapPin
                  size={21}
                />
              }
            />

            <div
              className="
                hidden
                items-center
                justify-center
                text-gray-300
                lg:flex
              "
            >
              <div
                className="
                  h-px
                  w-14
                  bg-gray-200
                "
              />

              <Navigation
                size={20}
                className="
                  -mx-1
                  rotate-90
                  text-[var(--primary)]
                "
              />

              <div
                className="
                  h-px
                  w-14
                  bg-gray-200
                "
              />
            </div>

            <div
              className="
                flex
                items-center
                justify-center
                py-1
                text-[var(--primary)]
                lg:hidden
              "
            >
              <Navigation
                size={20}
                className="
                  rotate-90
                "
              />
            </div>

            <LocationCard
              type="Destination"
              address={
                dropAddress
              }
              icon={
                <Navigation
                  size={21}
                />
              }
            />
          </div>
        </section>

        {/* ======================================================
            TRIP INFORMATION
        ====================================================== */}

        <section
          className="
            mt-6
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <MetricCard
            icon={
              <Route size={21} />
            }
            label="Distance"
            value={formatDistance(
              distance
            )}
          />

          <MetricCard
            icon={
              <Clock3
                size={21}
              />
            }
            label="Duration"
            value={formatDuration(
              duration
            )}
          />

          <MetricCard
            icon={
              <CarFront
                size={21}
              />
            }
            label="Vehicle"
            value={
              booking.vehicle_type_name ||
              "Vehicle"
            }
          />

          <MetricCard
            icon={
              <ShieldCheck
                size={21}
              />
            }
            label="Fare"
            value={formatFare(
              fare
            )}
          />
        </section>

        {/* ======================================================
            START TRIP
        ====================================================== */}

        <section
          className="
            mt-6
            rounded-3xl
            border
            border-emerald-200
            bg-white
            p-5
            shadow-sm
            sm:p-7
          "
        >
          {tripStarted ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-5
                text-center
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-50
                  text-emerald-600
                "
              >
                <CheckCircle2
                  size={34}
                />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                Trip Started
              </h2>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                The ride has been
                successfully started.
                Pickup and destination
                information is available
                above.
              </p>

              <Link
                href={`/passenger/ride-tracking?ride_id=${encodeURIComponent(
                  rideId || ""
                )}`}
                className="
                  mt-6
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  px-6
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-emerald-700
                "
              >
                <Navigation
                  size={18}
                />

                Track Trip
              </Link>
            </div>
          ) : (
            <>
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
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-emerald-50
                      text-emerald-600
                    "
                  >
                    <PlayCircle
                      size={26}
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        font-bold
                        text-gray-900
                      "
                    >
                      Ready to Start?
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-6
                        text-gray-500
                      "
                    >
                      The ride is ready.
                      Start the passenger
                      trip now.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    handleStartTrip
                  }
                  disabled={
                    startingTrip
                  }
                  className="
                    inline-flex
                    h-13
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-emerald-600
                    px-7
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-emerald-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    sm:w-auto
                  "
                >
                  {startingTrip ? (
                    <>
                      <Loader2
                        size={19}
                        className="
                          animate-spin
                        "
                      />

                      Starting Trip...
                    </>
                  ) : (
                    <>
                      <PlayCircle
                        size={20}
                      />

                      Start Trip
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </section>

        {/* ======================================================
            CANCEL
        ====================================================== */}

        {!tripStarted && (
          <section
            className="
              mt-6
              rounded-3xl
              border
              border-red-200
              bg-white
              p-5
              shadow-sm
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
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-red-50
                    text-red-600
                  "
                >
                  <XCircle
                    size={24}
                  />
                </div>

                <div>
                  <h2
                    className="
                      font-bold
                      text-gray-900
                    "
                  >
                    Cancel Ride
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    Cancel this ride if
                    the passenger no longer
                    needs the trip.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleCancelRide
                }
                disabled={
                  cancelling
                }
                className="
                  inline-flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-6
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {cancelling ? (
                  <>
                    <Loader2
                      size={18}
                      className="
                        animate-spin
                      "
                    />

                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle
                      size={18}
                    />

                    Cancel Ride
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {/* ======================================================
            DRIVER / VEHICLE
        ====================================================== */}

        {(booking.driver_name ||
          booking.vehicle_number) && (
          <section
            className="
              mt-6
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              sm:p-7
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
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
                  bg-gray-50
                  text-[var(--primary)]
                "
              >
                <CarFront
                  size={21}
                />
              </div>

              <div>
                <h2
                  className="
                    font-bold
                    text-gray-900
                  "
                >
                  Driver & Vehicle
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Assigned for this trip
                </p>
              </div>
            </div>

            <div
              className="
                mt-5
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              <InfoBox
                label="Driver"
                value={
                  booking.driver_name
                }
              />

              <InfoBox
                label="Vehicle"
                value={
                  booking.vehicle_type_name
                }
              />

              <InfoBox
                label="Vehicle Number"
                value={
                  booking.vehicle_number
                }
              />

              <InfoBox
                label="Model"
                value={
                  booking.vehicle_model
                }
              />
            </div>
          </section>
        )}

        {/* ======================================================
            FOOTER STATUS
        ====================================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            text-center
            text-xs
            text-gray-400
          "
        >
          <ShieldCheck
            size={15}
          />

          <span>
            SBS Taxi secure trip
          </span>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   SUMMARY ITEM
============================================================ */

function SummaryItem({
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
        items-center
        gap-3
        border-gray-100
        p-5
        sm:border-r
        last:border-r-0
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-gray-50
          text-[var(--primary)]
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-xs
            font-medium
            text-gray-500
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            text-lg
            font-bold
            text-gray-900
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   LOCATION CARD
============================================================ */

function LocationCard({
  type,
  address,
  icon,
}: {
  type: string;
  address: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-100
        bg-gray-50
        p-5
      "
    >
      <div
        className="
          flex
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
            bg-white
            text-[var(--primary)]
            shadow-sm
          "
        >
          {icon}
        </div>

        <div
          className="
            min-w-0
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            {type}
          </p>

          <p
            className="
              mt-1.5
              text-sm
              font-semibold
              leading-6
              text-gray-900
            "
          >
            {address}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
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
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-gray-50
            text-[var(--primary)]
          "
        >
          {icon}
        </div>

        <p
          className="
            text-xs
            font-medium
            text-gray-500
          "
        >
          {label}
        </p>
      </div>

      <p
        className="
          mt-4
          text-lg
          font-bold
          text-gray-900
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value?:
    | string
    | number
    | null;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-100
        bg-gray-50
        p-4
      "
    >
      <p
        className="
          text-xs
          font-medium
          text-gray-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          truncate
          text-sm
          font-bold
          text-gray-900
        "
      >
        {value ||
          "Not available"}
      </p>
    </div>
  );
}

/* ============================================================
   LOADING
============================================================ */

function TripStartLoading() {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        py-6
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            mb-6
            h-10
            w-32
            animate-pulse
            rounded-xl
            bg-gray-200
          "
        />

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              h-44
              animate-pulse
              bg-gray-200
            "
          />

          <div
            className="
              grid
              gap-px
              bg-gray-100
              sm:grid-cols-3
            "
          >
            <div
              className="
                h-24
                animate-pulse
                bg-white
              "
            />

            <div
              className="
                h-24
                animate-pulse
                bg-white
              "
            />

            <div
              className="
                h-24
                animate-pulse
                bg-white
              "
            />
          </div>
        </div>

        <div
          className="
            mt-6
            rounded-3xl
            bg-white
            p-6
          "
        >
          <div
            className="
              h-7
              w-32
              animate-pulse
              rounded-lg
              bg-gray-200
            "
          />

          <div
            className="
              mt-6
              grid
              gap-4
              lg:grid-cols-2
            "
          >
            <div
              className="
                h-28
                animate-pulse
                rounded-2xl
                bg-gray-100
              "
            />

            <div
              className="
                h-28
                animate-pulse
                rounded-2xl
                bg-gray-100
              "
            />
          </div>
        </div>

        <div
          className="
            mt-6
            h-32
            animate-pulse
            rounded-3xl
            bg-white
          "
        />

        <div
          className="
            mt-6
            h-44
            animate-pulse
            rounded-3xl
            bg-white
          "
        />
      </div>
    </main>
  );
}