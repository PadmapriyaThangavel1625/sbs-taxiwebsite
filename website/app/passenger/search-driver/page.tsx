"use client";

import {
  ArrowLeft,
  CarFront,
  Loader2,
  Route,
} from "lucide-react";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

/* ============================================================
   TYPES
============================================================ */

interface BookingInformation {
  ride_id?: number | string;
  booking_id?: number | string;
  booking_number?: string;
  booking_otp?: string;

  user_id?: number | string;

  pickup_address?: string;
  pickup_latitude?: number | string;
  pickup_longitude?: number | string;

  drop_address?: string;
  drop_latitude?: number | string;
  drop_longitude?: number | string;

  pickup_date?: string;
  pickup_time?: string;

  vehicle_type_id?: number | string;
  vehicle_type_name?: string;

  passenger_name?: string;
  passenger_phone?: string;
  passenger_email?: string;

  passenger_count?: number | string;
  babies?: number | string;
  elderly?: number | string;

  estimated_fare?: number | string;

  trip_type?: string;
  payment_method?: string;
  payment_status?: string;

  distance_km?: number | string;
  duration_minutes?: number | string;

  estimated_distance?: number | string;
  estimated_duration?: number | string;

  status?: string;

  [key: string]: unknown;
}

/* ============================================================
   GET VALUE
============================================================ */

function getValue(
  source: Record<string, unknown>,
  ...keys: string[]
): unknown {
  for (const key of keys) {
    const value = source[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return undefined;
}

/* ============================================================
   STRING VALUE
============================================================ */

function getStringValue(
  source: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  const value = getValue(source, ...keys);

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  return undefined;
}

/* ============================================================
   NUMBER / STRING VALUE
============================================================ */

function getNumberOrStringValue(
  source: Record<string, unknown>,
  ...keys: string[]
): number | string | undefined {
  const value = getValue(source, ...keys);

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return value;
  }

  return undefined;
}

/* ============================================================
   GET NESTED PASSENGER
============================================================ */

function getPassengerObject(
  source: Record<string, unknown>
): Record<string, unknown> {
  const possiblePassenger =
    source.passenger ??
    source.passenger_info ??
    source.passengerInformation ??
    source.customer;

  if (
    possiblePassenger &&
    typeof possiblePassenger === "object" &&
    !Array.isArray(possiblePassenger)
  ) {
    return possiblePassenger as Record<string, unknown>;
  }

  return {};
}

/* ============================================================
   NORMALIZE BOOKING
============================================================ */

function normalizeBooking(
  source: Record<string, unknown>
): BookingInformation {
  const passenger =
    getPassengerObject(source);

  return {
    /* ========================================================
       IDS
    ======================================================== */

    ride_id: getNumberOrStringValue(
      source,
      "ride_id",
      "rideId",
      "id"
    ),

    booking_id: getNumberOrStringValue(
      source,
      "booking_id",
      "bookingId"
    ),

    booking_number: getStringValue(
      source,
      "booking_number",
      "bookingNumber",
      "booking_reference",
      "bookingReference"
    ),

    booking_otp: getStringValue(
      source,
      "booking_otp",
      "bookingOtp",
      "ride_otp",
      "rideOtp",
      "otp"
    ),

    user_id: getNumberOrStringValue(
      source,
      "user_id",
      "userId"
    ),

    /* ========================================================
       PICKUP
    ======================================================== */

    pickup_address: getStringValue(
      source,
      "pickup_address",
      "pickupAddress",
      "pickup",
      "pickup_location",
      "pickupLocation"
    ),

    pickup_latitude: getNumberOrStringValue(
      source,
      "pickup_latitude",
      "pickupLatitude",
      "pickup_lat",
      "pickupLat"
    ),

    pickup_longitude: getNumberOrStringValue(
      source,
      "pickup_longitude",
      "pickupLongitude",
      "pickup_lng",
      "pickupLng"
    ),

    /* ========================================================
       DESTINATION
    ======================================================== */

    drop_address: getStringValue(
      source,
      "drop_address",
      "dropAddress",
      "destination",
      "drop",
      "destination_address",
      "destinationAddress"
    ),

    drop_latitude: getNumberOrStringValue(
      source,
      "drop_latitude",
      "dropLatitude",
      "drop_lat",
      "dropLat"
    ),

    drop_longitude: getNumberOrStringValue(
      source,
      "drop_longitude",
      "dropLongitude",
      "drop_lng",
      "dropLng"
    ),

    /* ========================================================
       DATE / TIME
    ======================================================== */

    pickup_date: getStringValue(
      source,
      "pickup_date",
      "pickupDate",
      "date"
    ),

    pickup_time: getStringValue(
      source,
      "pickup_time",
      "pickupTime",
      "time"
    ),

    /* ========================================================
       VEHICLE
    ======================================================== */

    vehicle_type_id: getNumberOrStringValue(
      source,
      "vehicle_type_id",
      "vehicleTypeId",
      "vehicle_id",
      "vehicleId"
    ),

    vehicle_type_name: getStringValue(
      source,
      "vehicle_type_name",
      "vehicleTypeName",
      "vehicle_name",
      "vehicleName",
      "vehicle",
      "vehicleType"
    ),

    /* ========================================================
       PASSENGER NAME
    ======================================================== */

    passenger_name:
      getStringValue(
        source,
        "passenger_name",
        "passengerName",
        "passenger_name_text",
        "customer_name",
        "customerName",
        "name"
      ) ??
      getStringValue(
        passenger,
        "name",
        "passenger_name",
        "passengerName",
        "full_name",
        "fullName"
      ),

    /* ========================================================
       PASSENGER PHONE
    ======================================================== */

    passenger_phone:
      getStringValue(
        source,
        "passenger_phone",
        "passengerPhone",
        "phone",
        "mobile",
        "mobile_number",
        "mobileNumber",
        "customer_phone",
        "customerPhone"
      ) ??
      getStringValue(
        passenger,
        "phone",
        "mobile",
        "mobile_number",
        "mobileNumber",
        "phone_number",
        "phoneNumber"
      ),

    /* ========================================================
       PASSENGER EMAIL
    ======================================================== */

    passenger_email:
      getStringValue(
        source,
        "passenger_email",
        "passengerEmail",
        "email",
        "customer_email",
        "customerEmail"
      ) ??
      getStringValue(
        passenger,
        "email",
        "email_address",
        "emailAddress"
      ),

    /* ========================================================
       PASSENGER COUNT
    ======================================================== */

    passenger_count:
      getNumberOrStringValue(
        source,
        "passenger_count",
        "passengerCount",
        "number_of_passengers",
        "numberOfPassengers",
        "passengers",
        "people",
        "passenger_number",
        "passengerNumber"
      ) ??
      getNumberOrStringValue(
        passenger,
        "passenger_count",
        "passengerCount",
        "number_of_passengers",
        "numberOfPassengers",
        "passengers",
        "people"
      ),

    /* ========================================================
       BABIES
    ======================================================== */

    babies:
      getNumberOrStringValue(
        source,
        "babies",
        "baby_count",
        "babyCount",
        "number_of_babies",
        "numberOfBabies"
      ) ??
      getNumberOrStringValue(
        passenger,
        "babies",
        "baby_count",
        "babyCount",
        "number_of_babies",
        "numberOfBabies"
      ),

    /* ========================================================
       ELDERLY
    ======================================================== */

    elderly:
      getNumberOrStringValue(
        source,
        "elderly",
        "elderly_count",
        "elderlyCount",
        "number_of_elderly",
        "numberOfElderly"
      ) ??
      getNumberOrStringValue(
        passenger,
        "elderly",
        "elderly_count",
        "elderlyCount",
        "number_of_elderly",
        "numberOfElderly"
      ),

    /* ========================================================
       FARE
    ======================================================== */

    estimated_fare: getNumberOrStringValue(
      source,
      "estimated_fare",
      "estimatedFare",
      "fare",
      "total_fare",
      "totalFare"
    ),

    /* ========================================================
       TRIP
    ======================================================== */

    trip_type: getStringValue(
      source,
      "trip_type",
      "tripType"
    ),

    payment_method: getStringValue(
      source,
      "payment_method",
      "paymentMethod"
    ),

    payment_status: getStringValue(
      source,
      "payment_status",
      "paymentStatus"
    ),

    /* ========================================================
       DISTANCE
    ======================================================== */

    distance_km: getNumberOrStringValue(
      source,
      "distance_km",
      "distanceKm",
      "estimated_distance",
      "estimatedDistance",
      "distance"
    ),

    estimated_distance: getNumberOrStringValue(
      source,
      "estimated_distance",
      "estimatedDistance",
      "distance_km",
      "distanceKm",
      "distance"
    ),

    /* ========================================================
       DURATION
    ======================================================== */

    duration_minutes:
      getNumberOrStringValue(
        source,
        "duration_minutes",
        "durationMinutes",
        "estimated_duration",
        "estimatedDuration",
        "duration"
      ),

    estimated_duration:
      getNumberOrStringValue(
        source,
        "estimated_duration",
        "estimatedDuration",
        "duration_minutes",
        "durationMinutes",
        "duration"
      ),

    /* ========================================================
       STATUS
    ======================================================== */

    status: getStringValue(
      source,
      "status",
      "ride_status",
      "rideStatus"
    ),
  };
}

/* ============================================================
   DISPLAY VALUE
============================================================ */

function displayValue(
  value?: string | number
): string {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "Not available";
  }

  return String(value);
}

/* ============================================================
   DRIVER ACCEPTED
============================================================ */

function isDriverAccepted(
  status?: string
): boolean {
  if (!status) {
    return false;
  }

  const normalized = String(status)
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  return (
    normalized === "accepted" ||
    normalized === "driver_accepted" ||
    normalized === "driveraccepted" ||
    normalized === "confirmed" ||
    normalized === "assigned" ||
    normalized === "driver_assigned"
  );
}

/* ============================================================
   SEARCH DRIVER CONTENT
============================================================ */

function SearchDriverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [booking, setBooking] =
    useState<BookingInformation | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [checkingDriver, setCheckingDriver] =
    useState(false);

  const redirectedRef =
    useRef(false);

  /* ==========================================================
     OPEN DRIVER PROFILE
  ========================================================== */

  const openDriverProfile = useCallback(
    (currentBooking: BookingInformation) => {
      if (
        redirectedRef.current ||
        !currentBooking.ride_id
      ) {
        return;
      }

      redirectedRef.current = true;

      localStorage.setItem(
        "sbs_booking_information",
        JSON.stringify(currentBooking)
      );

      localStorage.setItem(
        "sbs_search_driver_booking",
        JSON.stringify(currentBooking)
      );

      localStorage.setItem(
        "ride_id",
        String(currentBooking.ride_id)
      );

      localStorage.setItem(
        "sbs_ride_id",
        String(currentBooking.ride_id)
      );

      if (currentBooking.booking_id) {
        localStorage.setItem(
          "booking_id",
          String(currentBooking.booking_id)
        );

        localStorage.setItem(
          "sbs_booking_id",
          String(currentBooking.booking_id)
        );
      }

      if (currentBooking.booking_number) {
        localStorage.setItem(
          "booking_number",
          String(currentBooking.booking_number)
        );

        localStorage.setItem(
          "sbs_booking_number",
          String(currentBooking.booking_number)
        );
      }

      if (currentBooking.booking_otp) {
        localStorage.setItem(
          "sbs_booking_otp",
          String(currentBooking.booking_otp)
        );
      }

      const params =
        new URLSearchParams();

      params.set(
        "ride_id",
        String(currentBooking.ride_id)
      );

      if (currentBooking.booking_id) {
        params.set(
          "booking_id",
          String(currentBooking.booking_id)
        );
      }

      if (currentBooking.booking_number) {
        params.set(
          "booking_number",
          String(currentBooking.booking_number)
        );
      }

      router.push(
        `/passenger/driverprofile?${params.toString()}`
      );
    },
    [router]
  );

  /* ==========================================================
     LOAD COMPLETE BOOKING
  ========================================================== */

  useEffect(() => {
    let mounted = true;

    try {
      const storageKeys = [
        "sbs_booking_information",
        "sbs_search_driver_booking",
      ];

      let storedData:
        Record<string, unknown> = {};

      for (const key of storageKeys) {
        const raw =
          localStorage.getItem(key);

        if (!raw) {
          continue;
        }

        try {
          const parsed =
            JSON.parse(raw);

          if (
            parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed)
          ) {
            storedData = {
              ...storedData,
              ...(parsed as Record<
                string,
                unknown
              >),
            };
          }
        } catch (error) {
          console.error(
            `Failed to parse ${key}:`,
            error
          );
        }
      }

      /* ======================================================
         INDIVIDUAL PASSENGER VALUES
      ====================================================== */

      const savedPassengerName =
        localStorage.getItem(
          "passengerName"
        ) ||
        localStorage.getItem(
          "passenger_name"
        ) ||
        localStorage.getItem(
          "sbs_passenger_name"
        );

      const savedPassengerPhone =
        localStorage.getItem(
          "passengerPhone"
        ) ||
        localStorage.getItem(
          "passenger_phone"
        ) ||
        localStorage.getItem(
          "sbs_passenger_phone"
        );

      const savedPassengerEmail =
        localStorage.getItem(
          "passengerEmail"
        ) ||
        localStorage.getItem(
          "passenger_email"
        ) ||
        localStorage.getItem(
          "sbs_passenger_email"
        );

      const savedPassengers =
        localStorage.getItem(
          "passengers"
        ) ||
        localStorage.getItem(
          "number_of_passengers"
        ) ||
        localStorage.getItem(
          "passenger_count"
        );

      const savedBabies =
        localStorage.getItem("babies");

      const savedElderly =
        localStorage.getItem("elderly");

      /* ======================================================
         URL VALUES
      ====================================================== */

      const urlRideId =
        searchParams.get("ride_id");

      const urlBookingId =
        searchParams.get("booking_id");

      const urlBookingNumber =
        searchParams.get(
          "booking_number"
        );

      /* ======================================================
         LOCAL IDS
      ====================================================== */

      const localRideId =
        localStorage.getItem("ride_id") ||
        localStorage.getItem("sbs_ride_id");

      const localBookingId =
        localStorage.getItem("booking_id") ||
        localStorage.getItem(
          "sbs_booking_id"
        );

      const localBookingNumber =
        localStorage.getItem(
          "booking_number"
        ) ||
        localStorage.getItem(
          "sbs_booking_number"
        );

      /* ======================================================
         COMPLETE SOURCE
      ====================================================== */

      const completeSource: Record<
        string,
        unknown
      > = {
        ...storedData,

        ride_id:
          urlRideId ||
          storedData.ride_id ||
          storedData.rideId ||
          localRideId ||
          undefined,

        booking_id:
          urlBookingId ||
          storedData.booking_id ||
          storedData.bookingId ||
          localBookingId ||
          undefined,

        booking_number:
          urlBookingNumber ||
          storedData.booking_number ||
          storedData.bookingNumber ||
          localBookingNumber ||
          undefined,
      };

      /* ======================================================
         PASSENGER FALLBACKS
      ====================================================== */

      if (
        savedPassengerName &&
        !getValue(
          completeSource,
          "passengerName",
          "passenger_name",
          "name"
        )
      ) {
        completeSource.passengerName =
          savedPassengerName;
      }

      if (
        savedPassengerPhone &&
        !getValue(
          completeSource,
          "passengerPhone",
          "passenger_phone",
          "phone"
        )
      ) {
        completeSource.passengerPhone =
          savedPassengerPhone;
      }

      if (
        savedPassengerEmail &&
        !getValue(
          completeSource,
          "passengerEmail",
          "passenger_email",
          "email"
        )
      ) {
        completeSource.passengerEmail =
          savedPassengerEmail;
      }

      if (
        savedPassengers &&
        !getValue(
          completeSource,
          "passengers",
          "number_of_passengers",
          "passenger_count",
          "people"
        )
      ) {
        completeSource.passengers =
          savedPassengers;
      }

      if (
        savedBabies &&
        !getValue(
          completeSource,
          "babies"
        )
      ) {
        completeSource.babies =
          savedBabies;
      }

      if (
        savedElderly &&
        !getValue(
          completeSource,
          "elderly"
        )
      ) {
        completeSource.elderly =
          savedElderly;
      }

      /* ======================================================
         NORMALIZE
      ====================================================== */

      const completeBooking =
        normalizeBooking(
          completeSource
        );

      console.log(
        "=========================================="
      );

      console.log(
        "SEARCH DRIVER - COMPLETE BOOKING"
      );

      console.log(
        "PASSENGER NAME:",
        completeBooking.passenger_name
      );

      console.log(
        "PASSENGER PHONE:",
        completeBooking.passenger_phone
      );

      console.log(
        "PASSENGER EMAIL:",
        completeBooking.passenger_email
      );

      console.log(
        "PASSENGERS:",
        completeBooking.passenger_count
      );

      console.log(
        "BABIES:",
        completeBooking.babies
      );

      console.log(
        "ELDERLY:",
        completeBooking.elderly
      );

      console.log(
        "COMPLETE BOOKING:",
        completeBooking
      );

      console.log(
        "=========================================="
      );

      if (!mounted) {
        return;
      }

      /* ======================================================
         SAVE NORMALIZED BOOKING
      ====================================================== */

      localStorage.setItem(
        "sbs_booking_information",
        JSON.stringify(
          completeBooking
        )
      );

      localStorage.setItem(
        "sbs_search_driver_booking",
        JSON.stringify(
          completeBooking
        )
      );

      /* ======================================================
         SAVE IDS
      ====================================================== */

      if (completeBooking.ride_id) {
        localStorage.setItem(
          "ride_id",
          String(
            completeBooking.ride_id
          )
        );

        localStorage.setItem(
          "sbs_ride_id",
          String(
            completeBooking.ride_id
          )
        );
      }

      if (completeBooking.booking_id) {
        localStorage.setItem(
          "booking_id",
          String(
            completeBooking.booking_id
          )
        );

        localStorage.setItem(
          "sbs_booking_id",
          String(
            completeBooking.booking_id
          )
        );
      }

      if (
        completeBooking.booking_number
      ) {
        localStorage.setItem(
          "booking_number",
          String(
            completeBooking.booking_number
          )
        );

        localStorage.setItem(
          "sbs_booking_number",
          String(
            completeBooking.booking_number
          )
        );
      }

      if (
        completeBooking.booking_otp
      ) {
        localStorage.setItem(
          "sbs_booking_otp",
          String(
            completeBooking.booking_otp
          )
        );
      }

      setBooking(
        completeBooking
      );
    } catch (error) {
      console.error(
        "Search driver booking error:",
        error
      );
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [searchParams]);

  /* ==========================================================
     POLL STATUS
  ========================================================== */

  useEffect(() => {
    if (
      !booking?.ride_id ||
      redirectedRef.current
    ) {
      return;
    }

    if (
      isDriverAccepted(
        booking.status
      )
    ) {
      openDriverProfile(
        booking
      );

      return;
    }

    let cancelled = false;

    const checkRideStatus =
      async () => {
        if (
          cancelled ||
          redirectedRef.current
        ) {
          return;
        }

        try {
          setCheckingDriver(true);

          const response =
            await fetch(
              `/api/passenger/status-history?ride_id=${encodeURIComponent(
                String(
                  booking.ride_id
                )
              )}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          if (!response.ok) {
            console.error(
              "Status history HTTP error:",
              response.status
            );

            return;
          }

          const result =
            await response.json();

          console.log(
            "SEARCH DRIVER - STATUS HISTORY:",
            result
          );

          if (
            result?.success !== true
          ) {
            return;
          }

          const history =
            Array.isArray(
              result?.data?.history
            )
              ? result.data.history
              : [];

          if (
            history.length === 0
          ) {
            return;
          }

          const latestHistoryItem =
            history[
              history.length - 1
            ];

          if (
            !latestHistoryItem ||
            typeof latestHistoryItem !==
              "object"
          ) {
            return;
          }

          const latestItem =
            latestHistoryItem as Record<
              string,
              unknown
            >;

          const latestStatus =
            getValue(
              latestItem,
              "status",
              "ride_status",
              "rideStatus"
            );

          console.log(
            "SEARCH DRIVER - LATEST STATUS:",
            latestStatus
          );

          const updatedBooking: BookingInformation =
            {
              ...booking,
              status:
                typeof latestStatus ===
                "string" ||
                typeof latestStatus ===
                  "number"
                  ? String(
                      latestStatus
                    )
                  : booking.status,
            };

          if (cancelled) {
            return;
          }

          setBooking(
            updatedBooking
          );

          localStorage.setItem(
            "sbs_booking_information",
            JSON.stringify(
              updatedBooking
            )
          );

          localStorage.setItem(
            "sbs_search_driver_booking",
            JSON.stringify(
              updatedBooking
            )
          );

          if (
            isDriverAccepted(
              updatedBooking.status
            )
          ) {
            console.log(
              "DRIVER ACCEPTED - OPENING DRIVER PROFILE"
            );

            openDriverProfile(
              updatedBooking
            );

            return;
          }

          const normalizedStatus =
            String(
              updatedBooking.status ?? ""
            )
              .trim()
              .toLowerCase()
              .replace(
                /[\s-]+/g,
                "_"
              );

          if (
            normalizedStatus ===
              "cancelled" ||
            normalizedStatus ===
              "canceled" ||
            normalizedStatus ===
              "expired"
          ) {
            router.replace(
              "/passenger/booking-ride"
            );
          }
        } catch (error) {
          console.error(
            "Ride status check error:",
            error
          );
        } finally {
          if (!cancelled) {
            setCheckingDriver(false);
          }
        }
      };

    checkRideStatus();

    const interval =
      window.setInterval(
        checkRideStatus,
        3000
      );

    return () => {
      cancelled = true;

      window.clearInterval(
        interval
      );
    };
  }, [
    booking,
    openDriverProfile,
    router,
  ]);

  /* ==========================================================
     BACK
  ========================================================== */

  function goBack() {
    router.back();
  }

  /* ==========================================================
     MANUAL DRIVER PROFILE
  ========================================================== */

  function handleViewDriver() {
    if (!booking?.ride_id) {
      console.error(
        "ride_id missing"
      );

      return;
    }

    openDriverProfile(
      booking
    );
  }

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Loading your booking
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we prepare
            your booking.
          </p>

        </div>
      </main>
    );
  }

  /* ==========================================================
     NO BOOKING
  ========================================================== */

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Route className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Booking information unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We could not find your booking
            information. Please return to
            the booking page and try again.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/passenger/booking-ride"
              )
            }
            className="mt-6 w-full rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Back to Booking
          </button>

        </div>
      </main>
    );
  }

  /* ==========================================================
     MAIN PAGE
  ========================================================== */

  return (
    <main className="min-h-screen bg-slate-50">

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />

            <span className="hidden font-medium sm:inline">
              Back
            </span>
          </button>

          <div className="text-center">

            <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
              Searching for Driver
            </h1>

            {booking.booking_number && (
              <p className="mt-0.5 text-xs text-slate-500">
                {booking.booking_number}
              </p>
            )}

          </div>

          <div className="h-10 w-10" />

        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* SEARCH CARD */}

        <section className="overflow-hidden rounded-3xl bg-[var(--primary)] shadow-xl">

          <div className="relative p-7 sm:p-10">

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-white/5" />

            <div className="relative text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
                  <Loader2 className="h-9 w-9 animate-spin text-white" />
                </div>
              </div>

              <p className="mt-7 text-sm font-medium text-white/70">
                Booking confirmed
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Finding your driver
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/75 sm:text-base">
                Please wait while we connect
                you with an available SBS Taxi
                driver.
              </p>

              <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white">

                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />

                {checkingDriver
                  ? "Checking driver status..."
                  : "Searching for driver..."}

              </div>

            </div>

            <div className="relative mt-8 rounded-2xl bg-white/10 p-5">

              <p className="text-center text-xs font-medium uppercase tracking-wider text-white/60">
                Booking Number
              </p>

              <p className="mt-2 text-center text-xl font-extrabold tracking-wide text-white sm:text-2xl">
                {displayValue(
                  booking.booking_number
                )}
              </p>

            </div>

          </div>
        </section>

        {/* TRIP DETAILS */}

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm sm:p-6">

          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Trip Details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Pickup
              </p>

              <p className="mt-2 text-sm font-bold text-slate-900">
                {displayValue(
                  booking.pickup_address
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Destination
              </p>

              <p className="mt-2 text-sm font-bold text-slate-900">
                {displayValue(
                  booking.drop_address
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Pickup Date
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.pickup_date
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Pickup Time
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.pickup_time
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Vehicle
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.vehicle_type_name
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Trip Type
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.trip_type
                )}
              </p>
            </div>

          </div>

        </section>

        {/* PASSENGER INFORMATION */}

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">

            <h2 className="text-lg font-bold text-slate-900">
              Passenger Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Information provided during booking
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Passenger
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.passenger_name
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Phone
              </p>

              <p className="mt-2 break-all text-lg font-bold text-slate-900">
                {displayValue(
                  booking.passenger_phone
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Email
              </p>

              <p className="mt-2 break-all text-sm font-bold text-slate-900">
                {displayValue(
                  booking.passenger_email
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Passengers
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.passenger_count
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Babies
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.babies
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Elderly
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.elderly
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Estimated Fare
              </p>

              <p className="mt-2 text-lg font-extrabold text-slate-900">
                {booking.estimated_fare !==
                  undefined &&
                booking.estimated_fare !==
                  null &&
                booking.estimated_fare !== ""
                  ? `₹${booking.estimated_fare}`
                  : "Not available"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-medium text-slate-500">
                Payment
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {displayValue(
                  booking.payment_method
                )}
              </p>
            </div>

          </div>

        </section>

        {/* FARE / ROUTE */}

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm sm:p-6">

          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Fare & Route
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <p className="text-xs font-medium text-slate-500">
                Distance
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {booking.distance_km !==
                  undefined &&
                booking.distance_km !==
                  null &&
                booking.distance_km !== ""
                  ? `${booking.distance_km} km`
                  : "Not available"}
              </p>

            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <p className="text-xs font-medium text-slate-500">
                Duration
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {booking.duration_minutes !==
                  undefined &&
                booking.duration_minutes !==
                  null &&
                booking.duration_minutes !== ""
                  ? `${booking.duration_minutes} min`
                  : "Not available"}
              </p>

            </div>

          </div>

        </section>

        {/* IDS */}

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm sm:p-6">

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <p className="text-xs font-medium text-slate-500">
                Booking Number
              </p>

              <p className="mt-2 break-all text-lg font-bold text-slate-900">
                {displayValue(
                  booking.booking_number
                )}
              </p>

            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <p className="text-xs font-medium text-slate-500">
                Ride ID
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                #
                {displayValue(
                  booking.ride_id
                )}
              </p>

            </div>

          </div>

        </section>

        {/* DRIVER PROFILE */}

        <section className="mt-5">

          <button
            type="button"
            onClick={
              handleViewDriver
            }
            disabled={
              !booking.ride_id
            }
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[var(--primary)] px-6 py-4 text-base font-bold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <CarFront className="h-5 w-5" />

            View Driver

          </button>

          <p className="mt-3 text-center text-xs leading-5 text-slate-500">
            When the driver accepts your ride,
            you will automatically be taken to
            the Driver Profile.
          </p>

        </section>

        {/* STATUS */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">

          <div className="flex items-center justify-center gap-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

            <p className="text-sm font-semibold text-slate-900">
              Your booking is active
            </p>

          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            We are checking for a driver
            automatically. You do not need to
            refresh this page.
          </p>

        </div>

      </div>
    </main>
  );
}

/* ============================================================
   SUSPENSE FALLBACK
============================================================ */

function SearchDriverLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">

          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />

        </div>

        <h1 className="mt-5 text-xl font-bold text-slate-900">
          Loading your booking
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we prepare your booking.
        </p>

      </div>

    </main>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function SearchDriverPage() {
  return (
    <Suspense
      fallback={
        <SearchDriverLoading />
      }
    >
      <SearchDriverContent />
    </Suspense>
  );
}