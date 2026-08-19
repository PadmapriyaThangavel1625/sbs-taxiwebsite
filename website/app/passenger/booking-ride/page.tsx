"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  CarFront,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  Navigation,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";

import CurrentLocation from "@/app/Components/Passenger/Booking/CurrentLocation";

import PlaceSearch, {
  PlaceData,
} from "@/app/Components/Passenger/Booking/PlaceSearch";

/* ============================================================
   ROUTE MAP
============================================================ */

const RouteMap = dynamic(
  () => import("@/app/Components/Passenger/Booking/RouteMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] items-center justify-center rounded-3xl bg-slate-100">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading map...
        </div>
      </div>
    ),
  }
);

/* ============================================================
   VEHICLE DATA
============================================================ */

interface Vehicle {
  id: number;
  name: string;
  model: string;
  seats: number;
  rate: number;
  description: string;
}

const VEHICLES: Vehicle[] = [
  {
    id: 1,
    name: "SBS MINI",
    model: "Maruti Suzuki Baleno / Wagon R",
    seats: 4,
    rate: 12,
    description: "Affordable ride",
  },
  {
    id: 2,
    name: "SBS SEDAN",
    model: "Dzire / Etios",
    seats: 4,
    rate: 12.5,
    description: "Comfortable ride",
  },
  {
    id: 3,
    name: "SBS MUV",
    model: "Ertiga",
    seats: 6,
    rate: 18,
    description: "Family ride",
  },
  {
    id: 4,
    name: "SBS SUV",
    model: "SUV",
    seats: 6,
    rate: 17,
    description: "Premium comfort",
  },
  {
    id: 5,
    name: "SBS MUV+",
    model: "Premium MUV",
    seats: 7,
    rate: 19,
    description: "Large group ride",
  },
  {
    id: 6,
    name: "SBS VAN",
    model: "Tempo Traveller",
    seats: 12,
    rate: 21,
    description: "Group travel",
  },
];

/* ============================================================
   HELPERS
============================================================ */

function money(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

/*
  Fare calculation.

  Minimum fare is applied so very short trips do not become ₹0.
  Change this value according to your actual SBS Taxi pricing.
*/
function calculateFare(
  distanceKm: number,
  rate: number
) {
  if (distanceKm <= 0) {
    return 0;
  }

  const baseFare = distanceKm * rate;

  const minimumFare = 150;

  return Math.max(
    Math.round(baseFare),
    minimumFare
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function BookingRidePage() {
  /* ==========================================================
     LOCATION
  ========================================================== */

  const [currentLocation, setCurrentLocation] =
    useState<[number, number] | null>(null);

  const [pickup, setPickup] =
    useState<PlaceData | null>(null);

  const [drop, setDrop] =
    useState<PlaceData | null>(null);

  /* ==========================================================
     ROUTE
  ========================================================== */

  const [distanceKm, setDistanceKm] =
    useState(0);

  const [durationMinutes, setDurationMinutes] =
    useState(0);

  /*
    RouteMap currently only sends distance.
    We estimate duration from the distance here.
    RouteMap can continue showing its own exact duration.
  */
  useEffect(() => {
    if (distanceKm > 0) {
      const estimated =
        Math.max(
          1,
          Math.round(
            (distanceKm / 45) * 60
          )
        );

      setDurationMinutes(
        estimated
      );
    } else {
      setDurationMinutes(0);
    }
  }, [distanceKm]);

  /* ==========================================================
     VEHICLE
  ========================================================== */

  const [selectedVehicleId, setSelectedVehicleId] =
    useState(1);

  const selectedVehicle =
    VEHICLES.find(
      (vehicle) =>
        vehicle.id === selectedVehicleId
    ) || VEHICLES[0];

  /* ==========================================================
     PASSENGER
  ========================================================== */

  const [passengerName, setPassengerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  /* ==========================================================
     BOOKING
  ========================================================== */

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [bookingNumber, setBookingNumber] =
    useState("");

  /* ==========================================================
     USER ID

     For now this supports several common localStorage formats.

     IMPORTANT:
     In production, get user_id from your authenticated session.
  ========================================================== */

  const [userId, setUserId] =
    useState<number | null>(null);

  useEffect(() => {
    try {
      const possibleKeys = [
        "sbs_user",
        "user",
        "userData",
        "passenger",
      ];

      for (const key of possibleKeys) {
        const raw =
          localStorage.getItem(key);

        if (!raw) continue;

        try {
          const parsed =
            JSON.parse(raw);

          const id = Number(
            parsed?.id ??
              parsed?.user_id ??
              parsed?.userId
          );

          if (id > 0) {
            setUserId(id);
            return;
          }
        } catch {
          const id =
            Number(raw);

          if (id > 0) {
            setUserId(id);
            return;
          }
        }
      }

      /*
        Development fallback.

        Remove this fallback when your login system
        always provides the authenticated user ID.
      */
      setUserId(1);
    } catch {
      setUserId(1);
    }
  }, []);

  /* ==========================================================
     FARE
  ========================================================== */

  const estimatedFare =
    useMemo(() => {
      return calculateFare(
        distanceKm,
        selectedVehicle.rate
      );
    }, [
      distanceKm,
      selectedVehicle.rate,
    ]);

  /* ==========================================================
     CONFIRM BOOKING
  ========================================================== */

  const handleConfirmBooking =
    async () => {
      setMessage("");
      setError("");
      setBookingNumber("");

      /* ------------------------------------------
         VALIDATION
      ------------------------------------------ */

      if (!pickup) {
        setError(
          "Please select your pickup location."
        );
        return;
      }

      if (!drop) {
        setError(
          "Please select your destination."
        );
        return;
      }

      if (
        !pickup.latitude ||
        !pickup.longitude ||
        !drop.latitude ||
        !drop.longitude
      ) {
        setError(
          "Valid pickup and destination coordinates are required."
        );
        return;
      }

      if (distanceKm <= 0) {
        setError(
          "Please wait for the route distance to be calculated."
        );
        return;
      }

      if (!passengerName.trim()) {
        setError(
          "Please enter passenger name."
        );
        return;
      }

      if (!phone.trim()) {
        setError(
          "Please enter passenger phone number."
        );
        return;
      }

      if (!userId || userId <= 0) {
        setError(
          "Please sign in before booking."
        );
        return;
      }

      /* ------------------------------------------
         API
      ------------------------------------------ */

      try {
        setLoading(true);

        const response =
          await fetch(
            "/api/passenger/booking",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body: JSON.stringify({
                user_id: userId,

                pickup_address:
                  pickup.name,

                pickup_latitude:
                  pickup.latitude,

                pickup_longitude:
                  pickup.longitude,

                drop_address:
                  drop.name,

                drop_latitude:
                  drop.latitude,

                drop_longitude:
                  drop.longitude,

                estimated_fare:
                  estimatedFare,

                vehicle_type_id:
                  selectedVehicle.id,

                passengerName:
                  passengerName.trim(),

                email:
                  email.trim(),

                phone:
                  phone.trim(),

                vehicleType:
                  selectedVehicle.name,

                vehicleModel:
                  selectedVehicle.model,

                seats:
                  selectedVehicle.seats,

                distanceKm,

                durationMinutes,

                paymentMethod,
              }),
            }
          );

        const result =
          await response.json();

        console.log(
          "BOOKING API RESULT:",
          result
        );

        if (
          !response.ok ||
          result?.success !== true
        ) {
          throw new Error(
            result?.message ||
              "Unable to create booking."
          );
        }

        const number =
          result?.data
            ?.booking_number ||
          "-";

        setBookingNumber(number);

        setMessage(
          "Your ride has been booked successfully."
        );
      } catch (err) {
        console.error(
          "BOOKING ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to create booking."
        );
      } finally {
        setLoading(false);
      }
    };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-6">
          <p className="text-sm font-semibold text-[#123f80]">
            SBS TAXI
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Book Your Ride
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Choose pickup, destination and vehicle
            to get your fare estimate.
          </p>
        </div>

        {/* ====================================================
            MAIN GRID

            LEFT  = LOCATION + VEHICLE
            RIGHT = MAP + FARE
        ==================================================== */}

        <div className="grid items-start gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <section className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#123f80]">
                  <Route className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Ride Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    Select your pickup and destination
                  </p>
                </div>
              </div>

              {/* CURRENT LOCATION */}

              <CurrentLocation
                setLocation={
                  setCurrentLocation
                }
                onLocation={setPickup}
              />

              {/* PICKUP */}

              <PlaceSearch
                label="Pickup Location"
                placeholder="Search pickup location"
                value={pickup}
                onSelect={setPickup}
              />

              {/* DROP */}

              <div className="mt-5">
                <PlaceSearch
                  label="Drop Location"
                  placeholder="Search destination"
                  value={drop}
                  onSelect={setDrop}
                />
              </div>

              {/* CURRENT LOCATION INFO */}

              {currentLocation && (
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Navigation className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-blue-800">
                        Current Location
                      </p>

                      <p className="mt-1 text-xs text-blue-600">
                        GPS location detected
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PICKUP DETAILS */}

              {pickup && (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                        Pickup
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {pickup.name}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        {pickup.latitude},{" "}
                        {pickup.longitude}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* DROP DETAILS */}

              {drop && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-red-600">
                        Destination
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {drop.name}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        {drop.latitude},{" "}
                        {drop.longitude}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* DISTANCE */}

              {distanceKm > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Trip Distance
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {distanceKm.toFixed(2)} km
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Estimated Time
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xl font-bold text-slate-900">
                      <Clock3 className="h-4 w-4" />

                      {durationMinutes || "-"} mins
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                VEHICLE SELECTION
            ================================================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Choose Vehicle
                  </h2>

                  <p className="text-xs text-slate-500">
                    Select your preferred vehicle
                  </p>
                </div>

                <CarFront className="h-5 w-5 text-[#123f80]" />
              </div>

              <div className="space-y-3">
                {VEHICLES.map(
                  (vehicle) => {
                    const fare =
                      calculateFare(
                        distanceKm,
                        vehicle.rate
                      );

                    const selected =
                      selectedVehicleId ===
                      vehicle.id;

                    return (
                      <button
                        key={vehicle.id}
                        type="button"
                        onClick={() =>
                          setSelectedVehicleId(
                            vehicle.id
                          )
                        }
                        className={`w-full rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-[#123f80] bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              selected
                                ? "bg-[#123f80] text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <CarFront className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-bold text-slate-900">
                                {vehicle.name}
                              </p>

                              <p className="font-bold text-[#123f80]">
                                {distanceKm > 0
                                  ? money(fare)
                                  : `₹${vehicle.rate}/km`}
                              </p>
                            </div>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {vehicle.model}
                            </p>

                            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {vehicle.seats} seats
                              </span>

                              <span>
                                {vehicle.description}
                              </span>
                            </div>
                          </div>

                          {selected && (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#123f80]" />
                          )}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* =================================================
                PASSENGER DETAILS
            ================================================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-bold text-slate-900">
                Passenger Details
              </h2>

              <div className="mt-4 space-y-4">
                <input
                  value={passengerName}
                  onChange={(e) =>
                    setPassengerName(
                      e.target.value
                    )
                  }
                  placeholder="Passenger name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Email address"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                />

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123f80]"
                >
                  <option value="Cash">
                    Cash
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Card">
                    Card
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <section className="min-w-0">
            {/* MAP */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <RouteMap
                pickup={pickup}
                drop={drop}
                currentLocation={
                  currentLocation
                }
                setDistanceKm={
                  setDistanceKm
                }
              />
            </div>

            {/* =================================================
                FARE ESTIMATE BELOW MAP
            ================================================= */}

            <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />

                    <p className="text-sm font-semibold text-slate-600">
                      Fare Estimate
                    </p>
                  </div>

                  <h2 className="mt-1 text-3xl font-black text-[#123f80]">
                    {estimatedFare > 0
                      ? money(
                          estimatedFare
                        )
                      : "₹0"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedVehicle.name} ·{" "}
                    {distanceKm > 0
                      ? `${distanceKm.toFixed(
                          2
                        )} km`
                      : "Distance pending"}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-xs text-blue-600">
                    Rate
                  </p>

                  <p className="mt-1 font-bold text-blue-900">
                    ₹{selectedVehicle.rate}
                    /km
                  </p>
                </div>
              </div>

              {/* SUMMARY */}

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Vehicle
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {selectedVehicle.name}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Distance
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {distanceKm > 0
                      ? `${distanceKm.toFixed(
                          2
                        )} km`
                      : "-"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Payment
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {paymentMethod}
                  </p>
                </div>
              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}

              {message && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />

                    <div>
                      <p className="font-bold text-emerald-800">
                        {message}
                      </p>

                      {bookingNumber && (
                        <p className="mt-1 text-sm text-emerald-700">
                          Booking Number:{" "}
                          <strong>
                            {bookingNumber}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  CONFIRM BOOKING
              ================================================= */}

              <button
                type="button"
                onClick={
                  handleConfirmBooking
                }
                disabled={
                  loading ||
                  !pickup ||
                  !drop ||
                  distanceKm <= 0
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123f80] px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#0d3268] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />

                    Creating Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />

                    Confirm Booking ·{" "}
                    {estimatedFare > 0
                      ? money(
                          estimatedFare
                        )
                      : "₹0"}
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Your booking will be created only
                after the SBS Taxi server confirms it.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}