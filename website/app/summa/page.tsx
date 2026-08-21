"use client";

import { useState } from "react";
import {
  CheckCircle2,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
  Baby,
  UserRound,
  ShieldCheck,
  Hash,
  Phone,
  Mail,
  Navigation,
  XCircle,
  Loader2,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

interface BookingData {
  booking_id: string;
  booking_number: string;
  ride_id: string;

  /* OTP */
  ride_otp: string;

  status: string;

  /* Passenger */
  passengerName: string;
  email: string;
  phone: string;

  passengers: number;
  babies: number;
  elderly: number;

  /* Locations */
  pickup: string;
  drop: string;

  /* Trip */
  pickupDate: string;
  pickupTime: string;
  tripType: string;

  /* Payment */
  paymentMethod: string;
  paymentStatus?: string;

  /* Journey */
  distanceKm: number;
  durationMinutes: number;

  /* Fare */
  estimatedFare: number;
}

/* ============================================================
   API RESPONSE TYPES
============================================================ */

interface ApiBookingData {
  booking_id?: string | number;
  bookingId?: string | number;

  booking_number?: string | number;
  bookingNumber?: string | number;

  ride_id?: string | number;
  rideId?: string | number;

  ride_otp?: string | number;
  rideOtp?: string | number;

  booking_otp?: string | number;
  bookingOtp?: string | number;

  otp?: string | number;

  status?: string;
  ride_status?: string;
  rideStatus?: string;

  passengerName?: string;
  passenger_name?: string;
  name?: string;

  email?: string;
  phone?: string;

  passengers?: string | number;
  people?: string | number;
  passenger_count?: string | number;

  babies?: string | number;
  baby?: string | number;
  babyCount?: string | number;
  baby_count?: string | number;

  elderly?: string | number;
  elders?: string | number;
  elder?: string | number;
  elderCount?: string | number;
  elder_count?: string | number;

  pickup?: string;
  pickup_address?: string;

  drop?: string;
  drop_address?: string;

  pickupDate?: string;
  pickup_date?: string;
  date?: string;

  pickupTime?: string;
  pickup_time?: string;
  time?: string;

  tripType?: string;
  trip_type?: string;

  paymentMethod?: string;
  payment_method?: string;

  paymentStatus?: string;
  payment_status?: string;

  distanceKm?: string | number;
  distance_km?: string | number;

  durationMinutes?: string | number;
  duration_minutes?: string | number;

  estimatedFare?: string | number;
  estimated_fare?: string | number;
  price?: string | number;
}

/* ============================================================
   API RESPONSE
============================================================ */

interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  data?: ApiBookingData;
}

/* ============================================================
   HELPERS
============================================================ */

function stringValue(
  value: unknown,
  fallback = ""
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  return String(value).trim() || fallback;
}

function numberValue(
  value: unknown,
  fallback = 0
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

/* ============================================================
   NORMALIZE API DATA
============================================================ */

function normalizeBooking(
  data: ApiBookingData
): BookingData {
  /* ----------------------------------------------------------
     OTP

     IMPORTANT:
     Check ride_otp first.
  ---------------------------------------------------------- */

  const rideOtp = stringValue(
    data.ride_otp ??
      data.rideOtp ??
      data.booking_otp ??
      data.bookingOtp ??
      data.otp
  );

  /* ----------------------------------------------------------
     PASSENGER COUNT
  ---------------------------------------------------------- */

  const passengers = numberValue(
    data.passengers ??
      data.people ??
      data.passenger_count,
    0
  );

  /* ----------------------------------------------------------
     BABIES
  ---------------------------------------------------------- */

  const babies = numberValue(
    data.babies ??
      data.baby ??
      data.babyCount ??
      data.baby_count,
    0
  );

  /* ----------------------------------------------------------
     ELDERLY
  ---------------------------------------------------------- */

  const elderly = numberValue(
    data.elderly ??
      data.elders ??
      data.elder ??
      data.elderCount ??
      data.elder_count,
    0
  );

  console.log(
    "================ NORMALIZED BOOKING ================"
  );

  console.log(
    "Booking ID:",
    data.booking_id ??
      data.bookingId
  );

  console.log(
    "Booking Number:",
    data.booking_number ??
      data.bookingNumber
  );

  console.log(
    "Ride ID:",
    data.ride_id ??
      data.rideId
  );

  console.log(
    "Ride OTP:",
    rideOtp || "NOT AVAILABLE"
  );

  console.log(
    "Passengers:",
    passengers
  );

  console.log(
    "Babies:",
    babies
  );

  console.log(
    "Elderly:",
    elderly
  );

  console.log(
    "===================================================="
  );

  return {
    booking_id: stringValue(
      data.booking_id ??
        data.bookingId
    ),

    booking_number: stringValue(
      data.booking_number ??
        data.bookingNumber
    ),

    ride_id: stringValue(
      data.ride_id ??
        data.rideId
    ),

    ride_otp: rideOtp,

    status: stringValue(
      data.status ??
        data.ride_status ??
        data.rideStatus,
      "pending"
    ),

    /* Passenger */

    passengerName: stringValue(
      data.passengerName ??
        data.passenger_name ??
        data.name
    ),

    email: stringValue(
      data.email
    ),

    phone: stringValue(
      data.phone
    ),

    passengers,

    babies,

    elderly,

    /* Locations */

    pickup: stringValue(
      data.pickup ??
        data.pickup_address
    ),

    drop: stringValue(
      data.drop ??
        data.drop_address
    ),

    /* Trip */

    pickupDate: stringValue(
      data.pickupDate ??
        data.pickup_date ??
        data.date
    ),

    pickupTime: stringValue(
      data.pickupTime ??
        data.pickup_time ??
        data.time
    ),

    tripType: stringValue(
      data.tripType ??
        data.trip_type
    ),

    /* Payment */

    paymentMethod: stringValue(
      data.paymentMethod ??
        data.payment_method,
      "Not selected"
    ),

    paymentStatus: stringValue(
      data.paymentStatus ??
        data.payment_status,
      "pending"
    ),

    /* Journey */

    distanceKm: numberValue(
      data.distanceKm ??
        data.distance_km
    ),

    durationMinutes: numberValue(
      data.durationMinutes ??
        data.duration_minutes
    ),

    /* Fare */

    estimatedFare: numberValue(
      data.estimatedFare ??
        data.estimated_fare ??
        data.price
    ),
  };
}

/* ============================================================
   SMALL COMPONENT
============================================================ */

function DetailItem({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-5">
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          highlight
            ? "bg-blue-50 text-[#123f80]"
            : "bg-slate-50 text-slate-500"
        }`}
      >
        <Icon
          size={17}
          strokeWidth={2}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 break-words text-sm ${
            highlight
              ? "font-bold text-[#123f80]"
              : "font-semibold text-slate-800"
          }`}
        >
          {value !== undefined &&
          value !== null &&
          String(value).trim() !== ""
            ? value
            : "-"}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   TEST DATA
============================================================ */

const TEST_BOOKING: BookingData = {
  booking_id:
    "SBS-20260820-101530-4587",

  booking_number:
    "SBSBK4587",

  ride_id:
    "1258",

  ride_otp:
    "7392",

  status:
    "confirmed",

  passengerName:
    "Padmapriya",

  email:
    "customer@example.com",

  phone:
    "+91 98435 44844",

  passengers:
    3,

  babies:
    1,

  elderly:
    1,

  pickup:
    "SBS Technologies, Erode",

  drop:
    "Coimbatore Airport",

  pickupDate:
    "20 Aug 2026",

  pickupTime:
    "10:30 AM",

  tripType:
    "One Way",

  paymentMethod:
    "Cash",

  paymentStatus:
    "pending",

  distanceKm:
    105,

  durationMinutes:
    150,

  estimatedFare:
    1890,
};

/* ============================================================
   PAGE
============================================================ */

export default function BookingRideTestPage() {
  const [
    booking,
    setBooking,
  ] = useState<BookingData | null>(
    TEST_BOOKING
  );

  const [
    showOtp,
    setShowOtp,
  ] = useState(true);

  /* ==========================================================
     CANCEL
  ========================================================== */

  const [
    cancelling,
    setCancelling,
  ] = useState(false);

  const [
    cancelled,
    setCancelled,
  ] = useState(
    TEST_BOOKING.status.toLowerCase() ===
      "cancelled"
  );

  const [
    cancelMessage,
    setCancelMessage,
  ] = useState("");

  /* ==========================================================
     TEST API RESPONSE
  ========================================================== */

  const testApiResponse = () => {
    /*
      This intentionally uses different API field names
      to verify the normalizer works.
    */

    const apiResponse: ApiResponse = {
      success: true,

      data: {
        booking_id:
          "SBS-20260820-101530-4587",

        booking_number:
          "SBSBK4587",

        ride_id:
          "1258",

        ride_otp:
          "7392",

        status:
          "confirmed",

        passengerName:
          "Padmapriya",

        email:
          "customer@example.com",

        phone:
          "+91 98435 44844",

        /*
          API uses people
        */

        people:
          3,

        /*
          API uses babies
        */

        babies:
          1,

        /*
          API uses elderly
        */

        elderly:
          1,

        pickup_address:
          "SBS Technologies, Erode",

        drop_address:
          "Coimbatore Airport",

        pickupDate:
          "20 Aug 2026",

        pickupTime:
          "10:30 AM",

        tripType:
          "One Way",

        paymentMethod:
          "Cash",

        distanceKm:
          105,

        durationMinutes:
          150,

        estimatedFare:
          1890,
      },
    };

    if (!apiResponse.data) {
      return;
    }

    const normalized =
      normalizeBooking(
        apiResponse.data
      );

    setBooking(normalized);

    setShowOtp(
      Boolean(normalized.ride_otp)
    );

    setCancelled(
      normalized.status.toLowerCase() ===
        "cancelled"
    );

    setCancelMessage("");
  };

  /* ==========================================================
     TEST ALTERNATIVE RESPONSE
     
     This tests:
     otp
     passenger_count
     baby_count
     elder_count
  ========================================================== */

  const testAlternativeApiResponse =
    () => {
      const apiResponse: ApiResponse = {
        success: true,

        data: {
          booking_id:
            "SBS-ALT-1001",

          booking_number:
            "SBSBK1001",

          ride_id:
            "2001",

          /*
            Different OTP field
          */

          otp:
            "4821",

          status:
            "confirmed",

          name:
            "Padmapriya",

          email:
            "customer@example.com",

          phone:
            "+91 98435 44844",

          /*
            Different passenger fields
          */

          passenger_count:
            4,

          baby_count:
            2,

          elder_count:
            1,

          pickup:
            "Erode",

          drop:
            "Coimbatore",

          date:
            "21 Aug 2026",

          time:
            "11:00 AM",

          trip_type:
            "One Way",

          payment_method:
            "Cash",

          distance_km:
            100,

          duration_minutes:
            140,

          estimated_fare:
            1800,
        },
      };

      if (!apiResponse.data) {
        return;
      }

      const normalized =
        normalizeBooking(
          apiResponse.data
        );

      setBooking(normalized);

      setShowOtp(
        Boolean(normalized.ride_otp)
      );

      setCancelled(false);

      setCancelMessage("");
    };

  /* ==========================================================
     RESET
  ========================================================== */

  const resetTest = () => {
    setBooking(
      TEST_BOOKING
    );

    setShowOtp(
      Boolean(TEST_BOOKING.ride_otp)
    );

    setCancelled(
      TEST_BOOKING.status.toLowerCase() ===
        "cancelled"
    );

    setCancelling(false);

    setCancelMessage("");
  };

  /* ==========================================================
     CANCEL BOOKING
  ========================================================== */

  const handleCancelBooking =
    async () => {
      if (!booking) {
        return;
      }

      if (
        !booking.booking_id &&
        !booking.booking_number &&
        !booking.ride_id
      ) {
        setCancelMessage(
          "Booking ID is missing. Unable to cancel this ride."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to cancel this booking?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setCancelling(true);

        setCancelMessage("");

        const response =
          await fetch(
            "/api/passenger/cancel-booking",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                booking_id:
                  booking.booking_id,

                booking_number:
                  booking.booking_number,

                ride_id:
                  booking.ride_id,
              }),
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.error ||
              result.message ||
              "Unable to cancel booking."
          );
        }

        setCancelled(true);

        setBooking(
          (previous) => {
            if (!previous) {
              return previous;
            }

            return {
              ...previous,
              status:
                "cancelled",
            };
          }
        );

        setCancelMessage(
          result.message ||
            "Booking cancelled successfully."
        );
      } catch (error) {
        console.error(
          "Cancel booking error:",
          error
        );

        setCancelMessage(
          error instanceof Error
            ? error.message
            : "Unable to cancel booking. Please try again."
        );
      } finally {
        setCancelling(false);
      }
    };

  /* ==========================================================
     NO BOOKING
  ========================================================== */

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <p className="font-semibold text-slate-700">
            No booking data
          </p>
        </div>
      </main>
    );
  }

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#eef4f9] py-4 sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-5 lg:px-6">

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="bg-[#123f80] px-4 py-6 text-center sm:px-8 sm:py-8">

            <div className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              SBS
              <span className="text-[#f2b900]">
                {" "}TAXI
              </span>
            </div>

            <p className="mt-2 text-xs font-medium text-blue-100 sm:text-sm">
              One Brand. One Fare. One Trusted Service.
            </p>

            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                cancelled
                  ? "bg-red-100 text-red-700"
                  : "bg-white text-[#123f80]"
              }`}
            >
              {cancelled ? (
                <XCircle size={15} />
              ) : (
                <CheckCircle2 size={15} />
              )}

              {cancelled
                ? "BOOKING CANCELLED"
                : "RIDE BOOKING CONFIRMED"}
            </div>
          </div>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div className="p-3 sm:p-6">

            {/* =================================================
                STATUS
            ================================================= */}

            <div
              className={`rounded-2xl border p-4 sm:p-5 ${
                cancelled
                  ? "border-red-200 bg-red-50"
                  : "border-green-200 bg-green-50"
              }`}
            >
              <div className="flex items-start gap-3">

                {cancelled ? (
                  <XCircle
                    className="mt-0.5 shrink-0 text-red-600"
                    size={23}
                  />
                ) : (
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    size={23}
                  />
                )}

                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${
                      cancelled
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    Ride Status
                  </p>

                  <p
                    className={`mt-1 text-xl font-extrabold capitalize ${
                      cancelled
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    {booking.status}
                  </p>

                  {cancelMessage && (
                    <p
                      className={`mt-2 text-sm font-semibold ${
                        cancelled
                          ? "text-red-700"
                          : "text-green-700"
                      }`}
                    >
                      {cancelMessage}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* =================================================
                OTP
            ================================================= */}

            {!cancelled && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">

                {booking.ride_otp ? (
                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2b900] text-white">
                        <ShieldCheck size={20} />
                      </div>

                      <div>

                        <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                          Ride OTP
                        </p>

                        <p className="mt-1 text-2xl font-extrabold tracking-[0.25em] text-[#123f80]">
                          {showOtp
                            ? booking.ride_otp
                            : "••••"}
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowOtp(
                          (value) =>
                            !value
                        )
                      }
                      className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-50"
                    >
                      {showOtp
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>
                ) : (
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                        Ride OTP
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        OTP not available from booking API
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Check the browser console for the API response.
                      </p>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* =================================================
                BOOKING REFERENCE
            ================================================= */}

            <section className="mt-6">

              <h2 className="mb-3 px-1 text-lg font-extrabold text-[#123f80]">
                Booking Reference
              </h2>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                <DetailItem
                  icon={Hash}
                  label="Booking ID"
                  value={
                    booking.booking_id
                  }
                  highlight
                />

                <DetailItem
                  icon={Hash}
                  label="Booking Number"
                  value={
                    booking.booking_number
                  }
                  highlight
                />

                <DetailItem
                  icon={Navigation}
                  label="Ride ID"
                  value={
                    booking.ride_id
                  }
                  highlight
                />

                {booking.ride_otp && (
                  <DetailItem
                    icon={
                      ShieldCheck
                    }
                    label="Ride OTP"
                    value={
                      booking.ride_otp
                    }
                    highlight
                  />
                )}

              </div>

            </section>

            {/* =================================================
                TRIP DETAILS
            ================================================= */}

            <section className="mt-6">

              <h2 className="mb-3 px-1 text-lg font-extrabold text-[#123f80]">
                Trip Details
              </h2>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                <DetailItem
                  icon={MapPin}
                  label="Pickup Location"
                  value={
                    booking.pickup
                  }
                  highlight
                />

                <DetailItem
                  icon={MapPin}
                  label="Drop Location"
                  value={
                    booking.drop
                  }
                  highlight
                />

                <DetailItem
                  icon={CalendarDays}
                  label="Pickup Date"
                  value={
                    booking.pickupDate
                  }
                />

                <DetailItem
                  icon={Clock3}
                  label="Pickup Time"
                  value={
                    booking.pickupTime
                  }
                />

                <DetailItem
                  icon={Navigation}
                  label="Trip Type"
                  value={
                    booking.tripType
                  }
                />

              </div>

            </section>

            {/* =================================================
                PASSENGER DETAILS
            ================================================= */}

            <section className="mt-6">

              <h2 className="mb-3 px-1 text-lg font-extrabold text-[#123f80]">
                Passenger Details
              </h2>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                <DetailItem
                  icon={UserRound}
                  label="Passenger Name"
                  value={
                    booking.passengerName
                  }
                />

                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={
                    booking.email
                  }
                />

                <DetailItem
                  icon={Phone}
                  label="Phone"
                  value={
                    booking.phone
                  }
                />

                {/* PASSENGERS */}

                <DetailItem
                  icon={Users}
                  label="Passengers"
                  value={
                    booking.passengers
                  }
                  highlight
                />

                {/* BABIES */}

                <DetailItem
                  icon={Baby}
                  label="Babies"
                  value={
                    booking.babies
                  }
                  highlight
                />

                {/* ELDERLY */}

                <DetailItem
                  icon={UserRound}
                  label="Elderly"
                  value={
                    booking.elderly
                  }
                  highlight
                />

              </div>

              {/* =================================================
                  PASSENGER SUMMARY
              ================================================= */}

              <div className="mt-3 grid grid-cols-3 gap-2">

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-center">
                  <Users
                    className="mx-auto text-[#123f80]"
                    size={20}
                  />

                  <p className="mt-1 text-xl font-extrabold text-[#123f80]">
                    {booking.passengers}
                  </p>

                  <p className="text-[11px] font-bold uppercase text-slate-500">
                    Passengers
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-center">
                  <Baby
                    className="mx-auto text-amber-600"
                    size={20}
                  />

                  <p className="mt-1 text-xl font-extrabold text-amber-700">
                    {booking.babies}
                  </p>

                  <p className="text-[11px] font-bold uppercase text-slate-500">
                    Babies
                  </p>
                </div>

                <div className="rounded-xl border border-purple-100 bg-purple-50 p-3 text-center">
                  <UserRound
                    className="mx-auto text-purple-600"
                    size={20}
                  />

                  <p className="mt-1 text-xl font-extrabold text-purple-700">
                    {booking.elderly}
                  </p>

                  <p className="text-[11px] font-bold uppercase text-slate-500">
                    Elderly
                  </p>
                </div>

              </div>

            </section>

            {/* =================================================
                JOURNEY ESTIMATE
            ================================================= */}

            <section className="mt-6">

              <h2 className="mb-3 px-1 text-lg font-extrabold text-[#123f80]">
                Journey Estimate
              </h2>

              <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white">

                <div className="border-b border-r border-slate-100 p-4 sm:p-5">

                  <p className="text-xs font-semibold text-slate-400">
                    DISTANCE
                  </p>

                  <p className="mt-1 text-lg font-extrabold text-slate-800">
                    {booking.distanceKm} km
                  </p>

                </div>

                <div className="border-b border-slate-100 p-4 sm:p-5">

                  <p className="text-xs font-semibold text-slate-400">
                    DURATION
                  </p>

                  <p className="mt-1 text-lg font-extrabold text-slate-800">
                    {booking.durationMinutes} min
                  </p>

                </div>

                <div className="col-span-2 border-b border-slate-100 p-4 sm:p-5">

                  <p className="text-xs font-semibold text-slate-400">
                    PAYMENT METHOD
                  </p>

                  <p className="mt-1 text-lg font-extrabold text-[#123f80]">
                    {booking.paymentMethod}
                  </p>

                </div>

                <div className="col-span-2 p-4 sm:p-5">

                  <p className="text-xs font-semibold text-slate-400">
                    PAYMENT STATUS
                  </p>

                  <p className="mt-1 text-lg font-extrabold capitalize text-slate-800">
                    {booking.paymentStatus ||
                      "pending"}
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                FARE
            ================================================= */}

            <section className="mt-6">

              <h2 className="mb-3 px-1 text-lg font-extrabold text-[#123f80]">
                Fare Estimate
              </h2>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">

                <p className="text-xs font-semibold text-slate-500">
                  ESTIMATED FARE
                </p>

                <p className="mt-1 text-3xl font-extrabold text-[#123f80] sm:text-4xl">
                  ₹
                  {booking.estimatedFare.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </section>

            {/* =================================================
                CANCEL BOOKING
            ================================================= */}

            <section className="mt-6">

              {!cancelled ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">

                  <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <XCircle size={21} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                        Booking Actions
                      </p>

                      <h2 className="mt-1 text-lg font-extrabold text-red-700 sm:text-xl">
                        Need to cancel your ride?
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-red-600">
                        You can cancel this booking if
                        you no longer need the ride.
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={
                      handleCancelBooking
                    }
                    disabled={
                      cancelling
                    }
                    className="
                      mt-5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-red-600
                      px-5
                      py-3.5
                      text-sm
                      font-extrabold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-red-700
                      hover:shadow-md
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:w-auto
                    "
                  >
                    {cancelling ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Cancelling...
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={18}
                        />

                        Cancel Booking
                      </>
                    )}
                  </button>

                  {cancelMessage && (
                    <p className="mt-3 text-sm font-semibold text-red-700">
                      {cancelMessage}
                    </p>
                  )}

                  <div className="mt-4 border-t border-red-200 pt-4">

                    <p className="text-xs text-red-500">
                      Booking ID:{" "}
                      <span className="font-bold">
                        {
                          booking.booking_id
                        }
                      </span>
                    </p>

                    <p className="mt-1 text-xs text-red-500">
                      Ride ID:{" "}
                      <span className="font-bold">
                        {
                          booking.ride_id
                        }
                      </span>
                    </p>

                  </div>

                </div>
              ) : (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">

                  <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <XCircle size={22} />
                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                        Booking Status
                      </p>

                      <h2 className="mt-1 text-xl font-extrabold text-red-700">
                        Booking Cancelled
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-red-600">
                        Your taxi booking has been
                        cancelled successfully.
                      </p>

                      <p className="mt-3 text-sm font-semibold text-red-700">
                        Booking ID:{" "}
                        {
                          booking.booking_id
                        }
                      </p>

                    </div>

                  </div>

                </div>
              )}

            </section>

            {/* =================================================
                TEST CONTROLS
            ================================================= */}

            <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                TSX Testing
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Test different API field names to verify
                OTP, passengers, babies and elderly mapping.
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">

                <button
                  type="button"
                  onClick={
                    testApiResponse
                  }
                  className="rounded-xl bg-[#123f80] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d3268]"
                >
                  Test Normal API
                </button>

                <button
                  type="button"
                  onClick={
                    testAlternativeApiResponse
                  }
                  className="rounded-xl bg-[#f2b900] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#dca900]"
                >
                  Test Alternative API
                </button>

                <button
                  type="button"
                  onClick={
                    resetTest
                  }
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Reset
                </button>

              </div>

            </section>

            {/* =================================================
                DEBUG
            ================================================= */}

            <section className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">

              <p className="text-xs font-bold uppercase tracking-wider text-[#123f80]">
                Current Booking Data
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">

                <div className="rounded-lg bg-white p-3">
                  <p className="text-slate-400">
                    OTP
                  </p>

                  <p className="mt-1 font-bold text-[#123f80]">
                    {booking.ride_otp ||
                      "MISSING"}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-slate-400">
                    Passengers
                  </p>

                  <p className="mt-1 font-bold text-[#123f80]">
                    {booking.passengers}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-slate-400">
                    Babies
                  </p>

                  <p className="mt-1 font-bold text-[#123f80]">
                    {booking.babies}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-slate-400">
                    Elderly
                  </p>

                  <p className="mt-1 font-bold text-[#123f80]">
                    {booking.elderly}
                  </p>
                </div>

              </div>

            </section>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="mt-8 border-t border-slate-200 pt-6 text-center">

              <div className="text-lg font-extrabold text-[#123f80]">
                SBS
                <span className="text-[#f2b900]">
                  {" "}TAXI
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                One Brand. One Fare. One Trusted Service.
              </p>

              <p className="mt-3 text-xs font-medium text-slate-500">
                🇮🇳 Made in India
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Powered by{" "}
                <span className="font-bold text-[#123f80]">
                  SBS Technologies
                </span>
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}