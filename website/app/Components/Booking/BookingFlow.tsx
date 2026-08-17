"use client";

import React, { useState } from "react";

import {
  Check,
  Car,
  Users,
  CreditCard,
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
  User,
  Baby,
  UserRound,
  Banknote,
  Smartphone,
  WalletCards,
  CheckCircle2,
} from "lucide-react";

import TripDetailsForm, {
  TripDetails,
} from "./TripDetailsForm";

type Vehicle = {
  id: string;
  type: string;
  model: string;
  seats: number;
  price: string;
};

type PassengerDetails = {
  name: string;
  people: number;
  babies: number;
  elderly: number;
};

type PaymentMethod = "Cash" | "UPI" | "Card";

const vehicles: Vehicle[] = [
  {
    id: "mini",
    type: "SBS MINI",
    model: "Maruti Suzuki Baleno / Wagon R",
    seats: 4,
    price: "₹12 / km",
  },
  {
    id: "sedan",
    type: "SBS SEDAN",
    model: "Comfortable Sedan",
    seats: 4,
    price: "₹12.50 / km",
  },
  {
    id: "van",
    type: "SBS VAN",
    model: "Spacious Van",
    seats: 6,
    price: "₹14 / km",
  },
  {
    id: "suv",
    type: "SBS SUV",
    model: "Premium SUV",
    seats: 6,
    price: "₹17 / km",
  },
];

const steps = [
  {
    id: 1,
    title: "Trip Details",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Choose Vehicle",
    icon: Car,
  },
  {
    id: 3,
    title: "Passenger Details",
    icon: Users,
  },
  {
    id: 4,
    title: "Payment Method",
    icon: CreditCard,
  },
];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const [tripDetails, setTripDetails] = useState<TripDetails>({
    pickup: "",
    drop: "",
    tripType: "Outstation",
    date: "",
    time: "",
    isRoundTrip: false,
    preferences: [],
  });

  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);

  const [passengerDetails, setPassengerDetails] =
    useState<PassengerDetails>({
      name: "",
      people: 1,
      babies: 0,
      elderly: 0,
    });

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const updateTripField = <K extends keyof TripDetails>(
    field: K,
    value: TripDetails[K]
  ) => {
    setTripDetails((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updatePassengerField = <
    K extends keyof PassengerDetails
  >(
    field: K,
    value: PassengerDetails[K]
  ) => {
    setPassengerDetails((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const tripValid =
    tripDetails.pickup.trim() !== "" &&
    tripDetails.drop.trim() !== "" &&
    tripDetails.date !== "" &&
    tripDetails.time !== "";

  const passengerValid =
    passengerDetails.name.trim() !== "" &&
    passengerDetails.people >= 1;

  const nextStep = () => {
    if (currentStep === 1 && !tripValid) return;

    if (currentStep === 2 && !selectedVehicle) return;

    if (currentStep === 3 && !passengerValid) return;

    if (currentStep < 4) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const confirmBooking = () => {
    if (!selectedVehicle || !paymentMethod) return;

    const bookingDetails = `
SBS TAXI - BOOKING CONFIRMATION

PASSENGER DETAILS
-----------------
Passenger Name: ${passengerDetails.name}
Number of People: ${passengerDetails.people}
Babies: ${passengerDetails.babies}
Elderly People: ${passengerDetails.elderly}

TRIP DETAILS
------------
Pickup: ${tripDetails.pickup}
Drop: ${tripDetails.drop}
Trip Type: ${tripDetails.tripType}
Date: ${tripDetails.date}
Time: ${tripDetails.time}
Round Trip: ${tripDetails.isRoundTrip ? "Yes" : "No"}

VEHICLE DETAILS
---------------
Vehicle: ${selectedVehicle.type}
Model: ${selectedVehicle.model}
Seats: ${selectedVehicle.seats}
Price: ${selectedVehicle.price}

PAYMENT
-------
Payment Method: ${paymentMethod}

PREFERENCES
-----------
${
  tripDetails.preferences.length > 0
    ? tripDetails.preferences.join(", ")
    : "None"
}
`;

    setIsConfirmed(true);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sbs-booking-confirmed", {
          detail: bookingDetails,
        })
      );

      const emailAddress = "your-email@example.com";

      const subject = "SBS Taxi - Booking Confirmation";

      const mailto =
        `mailto:${emailAddress}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(bookingDetails)}`;

      setTimeout(() => {
        window.location.href = mailto;
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden">

      {/* =====================================================
          STEP TRACKER
      ===================================================== */}

      <div className="mb-5 w-full">

        {/* DESKTOP */}
        <div className="hidden sm:flex w-full items-start">

          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed = currentStep > step.id;
            const active = currentStep === step.id;

            return (
              <React.Fragment key={step.id}>

                <div className="flex min-w-0 flex-1 flex-col items-center">

                  <div
                    className={`
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-full border-2 transition-all
                      ${
                        completed || active
                          ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--text-primary)]"
                          : "border-slate-300 bg-white text-[var(--text-secondary)]"
                      }
                    `}
                  >
                    {completed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  <span
                    className={`
                      mt-2 text-center text-xs font-semibold leading-tight
                      ${
                        active || completed
                          ? "text-[var(--primary)]"
                          : "text-[var(--text-secondary)]"
                      }
                    `}
                  >
                    {step.title}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`
                      mt-5 h-0.5 min-w-3 flex-1
                      ${
                        currentStep > step.id
                          ? "bg-[var(--primary)]"
                          : "bg-slate-200"
                      }
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* MOBILE */}
        <div className="grid grid-cols-4 gap-1 sm:hidden">

          {steps.map((step) => {
            const Icon = step.icon;

            const completed = currentStep > step.id;
            const active = currentStep === step.id;

            return (
              <div
                key={step.id}
                className="flex min-w-0 flex-col items-center"
              >

                <div
                  className={`
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-full border-2
                    ${
                      completed || active
                        ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--text-primary)]"
                        : "border-slate-300 bg-white text-[var(--text-secondary)]"
                    }
                  `}
                >
                  {completed ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>

                <span
                  className={`
                    mt-2
                    w-full
                    px-0.5
                    text-center
                    text-[10px]
                    font-semibold
                    leading-tight
                    ${
                      active || completed
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-secondary)]"
                    }
                  `}
                >
                  {step.title}
                </span>

              </div>
            );
          })}
        </div>

        {/* MOBILE PROGRESS */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-200 sm:hidden">
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>

      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >

        <div className="w-full p-4 sm:p-5 md:p-7">

          {/* =================================================
              STEP 1
          ================================================= */}

          {currentStep === 1 && (
            <div className="animate-[fadeIn_0.25s_ease-out]">

              <TripDetailsForm
                details={tripDetails}
                updateField={updateTripField}
              />

              <div className="mt-6 flex justify-end">

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!tripValid}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl
                    bg-[var(--primary)]
                    px-6 py-3
                    text-sm font-semibold
                    text-[var(--text-primary)]
                    transition
                    hover:bg-[var(--primary-dark)]
                    disabled:cursor-not-allowed
                    disabled:bg-slate-300
                    sm:w-auto
                  "
                >
                  Choose Vehicle
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            </div>
          )}

          {/* =================================================
              STEP 2
          ================================================= */}

          {currentStep === 2 && (
            <div className="animate-[fadeIn_0.25s_ease-out]">

              <div className="mb-5">

                <h2 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                  Choose Your Vehicle
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Select the vehicle that best suits your journey.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

                {vehicles.map((vehicle) => {
                  const selected =
                    selectedVehicle?.id === vehicle.id;

                  return (
                    <button
                      key={vehicle.id}
                      type="button"
                      onClick={() =>
                        handleVehicleSelect(vehicle)
                      }
                      aria-pressed={selected}
                      className={`
                        w-full min-w-0 rounded-xl border-2 p-4
                        text-left transition-all
                        ${
                          selected
                            ? "border-[var(--primary)] bg-[var(--secondary)] shadow-md"
                            : "border-slate-200 bg-white hover:border-[var(--primary)]"
                        }
                      `}
                    >

                      <div className="flex min-w-0 items-start justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <div
                            className={`
                              flex h-11 w-11 shrink-0 items-center
                              justify-center rounded-xl
                              ${
                                selected
                                  ? "bg-[var(--primary)] text-[var(--text-primary)]"
                                  : "bg-slate-100 text-[var(--text-secondary)]"
                              }
                            `}
                          >
                            <Car className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate font-bold text-[var(--text-primary)]">
                              {vehicle.type}
                            </h3>

                            <p className="mt-1 break-words text-xs text-[var(--text-secondary)]">
                              {vehicle.model}
                            </p>

                          </div>

                        </div>

                        {selected && (
                          <div
                            className="
                              flex h-7 w-7 shrink-0 items-center
                              justify-center rounded-full
                              bg-[var(--primary)]
                              text-[var(--text-primary)]
                            "
                          >
                            <Check className="h-4 w-4" />
                          </div>
                        )}

                      </div>

                      <div
                        className="
                          mt-4 flex items-center justify-between
                          gap-2 border-t border-slate-200 pt-3
                        "
                      >

                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] sm:text-sm">
                          <Users className="h-4 w-4 shrink-0" />
                          {vehicle.seats} Seats
                        </div>

                        <span className="text-sm font-bold text-[var(--primary)]">
                          {vehicle.price}
                        </span>

                      </div>

                    </button>
                  );
                })}

              </div>

              <div
                className="
                  mt-6 flex flex-col gap-3
                  sm:flex-row sm:items-center sm:justify-between
                "
              >

                <button
                  type="button"
                  onClick={previousStep}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl border border-slate-200
                    px-5 py-3
                    text-sm font-semibold
                    text-[var(--text-secondary)]
                    transition
                    hover:bg-[var(--secondary)]
                    sm:w-auto
                  "
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedVehicle}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl
                    bg-[var(--primary)]
                    px-6 py-3
                    text-sm font-semibold
                    text-[var(--text-primary)]
                    transition
                    hover:bg-[var(--primary-dark)]
                    disabled:cursor-not-allowed
                    disabled:bg-slate-300
                    sm:w-auto
                  "
                >
                  Passenger Details
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              STEP 3
          ================================================= */}

          {currentStep === 3 && (
            <div className="animate-[fadeIn_0.25s_ease-out]">

              <div className="mb-5">

                <h2 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                  Passenger Details
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Enter the passenger information for this booking.
                </p>

              </div>

              <div className="space-y-4">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                    Passenger Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <User
                      className="
                        absolute left-3 top-1/2
                        h-4 w-4 -translate-y-1/2
                        text-[var(--text-secondary)]
                      "
                    />

                    <input
                      type="text"
                      value={passengerDetails.name}
                      onChange={(event) =>
                        updatePassengerField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Enter passenger name"
                      className="
                        w-full rounded-lg
                        border border-slate-200
                        bg-[var(--secondary)]
                        py-3 pl-10 pr-4
                        text-sm text-[var(--text-primary)]
                        placeholder:text-[var(--text-secondary)]
                        focus:border-[var(--primary)]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--primary)]/20
                      "
                    />

                  </div>
                </div>

                {/* COUNTS */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">

                  {/* PEOPLE */}

                  <div className="rounded-xl border border-slate-200 p-4">

                    <div className="mb-3 flex items-center gap-2">

                      <Users className="h-5 w-5 text-[var(--primary)]" />

                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Total People
                      </span>

                    </div>

                    <input
                      type="number"
                      min="1"
                      value={passengerDetails.people}
                      onChange={(event) =>
                        updatePassengerField(
                          "people",
                          Math.max(
                            1,
                            Number(event.target.value) || 1
                          )
                        )
                      }
                      className="
                        w-full rounded-lg
                        border border-slate-200
                        bg-[var(--secondary)]
                        px-3 py-2.5
                        text-sm font-semibold
                        text-[var(--text-primary)]
                        focus:border-[var(--primary)]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--primary)]/20
                      "
                    />

                  </div>

                  {/* BABIES */}

                  <div className="rounded-xl border border-slate-200 p-4">

                    <div className="mb-3 flex items-center gap-2">

                      <Baby className="h-5 w-5 text-[var(--primary)]" />

                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Babies
                      </span>

                    </div>

                    <input
                      type="number"
                      min="0"
                      value={passengerDetails.babies}
                      onChange={(event) =>
                        updatePassengerField(
                          "babies",
                          Math.max(
                            0,
                            Number(event.target.value) || 0
                          )
                        )
                      }
                      className="
                        w-full rounded-lg
                        border border-slate-200
                        bg-[var(--secondary)]
                        px-3 py-2.5
                        text-sm font-semibold
                        text-[var(--text-primary)]
                        focus:border-[var(--primary)]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--primary)]/20
                      "
                    />

                  </div>

                  {/* ELDERLY */}

                  <div className="rounded-xl border border-slate-200 p-4">

                    <div className="mb-3 flex items-center gap-2">

                      <UserRound className="h-5 w-5 text-[var(--primary)]" />

                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Elderly People
                      </span>

                    </div>

                    <input
                      type="number"
                      min="0"
                      value={passengerDetails.elderly}
                      onChange={(event) =>
                        updatePassengerField(
                          "elderly",
                          Math.max(
                            0,
                            Number(event.target.value) || 0
                          )
                        )
                      }
                      className="
                        w-full rounded-lg
                        border border-slate-200
                        bg-[var(--secondary)]
                        px-3 py-2.5
                        text-sm font-semibold
                        text-[var(--text-primary)]
                        focus:border-[var(--primary)]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--primary)]/20
                      "
                    />

                  </div>

                </div>
              </div>

              {/* ACTIONS */}

              <div
                className="
                  mt-6 flex flex-col gap-3
                  sm:flex-row sm:items-center sm:justify-between
                "
              >

                <button
                  type="button"
                  onClick={previousStep}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl border border-slate-200
                    px-5 py-3
                    text-sm font-semibold
                    text-[var(--text-secondary)]
                    hover:bg-[var(--secondary)]
                    sm:w-auto
                  "
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!passengerValid}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl bg-[var(--primary)]
                    px-6 py-3
                    text-sm font-semibold
                    text-[var(--text-primary)]
                    disabled:cursor-not-allowed
                    disabled:bg-slate-300
                    sm:w-auto
                  "
                >
                  Payment Method
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              STEP 4
          ================================================= */}

          {currentStep === 4 && !isConfirmed && (
            <div className="animate-[fadeIn_0.25s_ease-out]">

              <div className="mb-5">

                <h2 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                  Payment Method
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Choose your preferred payment method.
                </p>

              </div>

              {/* PAYMENT OPTIONS */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">

                {/* CASH */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Cash")}
                  className={`
                    rounded-xl border-2 p-4 text-left transition
                    ${
                      paymentMethod === "Cash"
                        ? "border-[var(--primary)] bg-[var(--secondary)]"
                        : "border-slate-200 hover:border-[var(--primary)]"
                    }
                  `}
                >
                  <Banknote className="h-7 w-7 text-[var(--primary)]" />

                  <h3 className="mt-3 font-bold text-[var(--text-primary)]">
                    Cash
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Pay directly to the driver.
                  </p>
                </button>

                {/* UPI */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("UPI")}
                  className={`
                    rounded-xl border-2 p-4 text-left transition
                    ${
                      paymentMethod === "UPI"
                        ? "border-[var(--primary)] bg-[var(--secondary)]"
                        : "border-slate-200 hover:border-[var(--primary)]"
                    }
                  `}
                >
                  <Smartphone className="h-7 w-7 text-[var(--primary)]" />

                  <h3 className="mt-3 font-bold text-[var(--text-primary)]">
                    UPI
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Pay using any UPI app.
                  </p>
                </button>

                {/* CARD */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Card")}
                  className={`
                    rounded-xl border-2 p-4 text-left transition
                    ${
                      paymentMethod === "Card"
                        ? "border-[var(--primary)] bg-[var(--secondary)]"
                        : "border-slate-200 hover:border-[var(--primary)]"
                    }
                  `}
                >
                  <WalletCards className="h-7 w-7 text-[var(--primary)]" />

                  <h3 className="mt-3 font-bold text-[var(--text-primary)]">
                    Card
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Pay using debit or credit card.
                  </p>
                </button>

              </div>

              {/* SUMMARY */}

              <div className="mt-5 rounded-xl border border-slate-200 bg-[var(--secondary)] p-4 sm:p-5">

                <h3 className="mb-4 font-bold text-[var(--text-primary)]">
                  Booking Summary
                </h3>

                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">

                  {/* ROUTE */}

                  <div className="flex min-w-0 items-start gap-3">

                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />

                    <div className="min-w-0">

                      <p className="text-xs text-[var(--text-secondary)]">
                        Route
                      </p>

                      <p className="break-words font-semibold text-[var(--text-primary)]">
                        {tripDetails.pickup} → {tripDetails.drop}
                      </p>

                    </div>
                  </div>

                  {/* DATE */}

                  <div className="flex items-start gap-3">

                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />

                    <div>

                      <p className="text-xs text-[var(--text-secondary)]">
                        Date & Time
                      </p>

                      <p className="font-semibold text-[var(--text-primary)]">
                        {tripDetails.date} {tripDetails.time}
                      </p>

                    </div>
                  </div>

                  {/* VEHICLE */}

                  <div className="flex items-start gap-3">

                    <Car className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />

                    <div>

                      <p className="text-xs text-[var(--text-secondary)]">
                        Vehicle
                      </p>

                      <p className="font-semibold text-[var(--text-primary)]">
                        {selectedVehicle?.type} · {selectedVehicle?.seats} Seats
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[var(--primary)]">
                        {selectedVehicle?.price}
                      </p>

                    </div>
                  </div>

                  {/* PASSENGERS */}

                  <div className="flex items-start gap-3">

                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />

                    <div>

                      <p className="text-xs text-[var(--text-secondary)]">
                        Passengers
                      </p>

                      <p className="font-semibold text-[var(--text-primary)]">
                        {passengerDetails.people} People
                      </p>

                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        Babies: {passengerDetails.babies} · Elderly:{" "}
                        {passengerDetails.elderly}
                      </p>

                    </div>
                  </div>

                </div>
              </div>

              {/* ACTIONS */}

              <div
                className="
                  mt-6 flex flex-col gap-3
                  sm:flex-row sm:items-center sm:justify-between
                "
              >

                <button
                  type="button"
                  onClick={previousStep}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl border border-slate-200
                    px-5 py-3
                    text-sm font-semibold
                    text-[var(--text-secondary)]
                    hover:bg-[var(--secondary)]
                    sm:w-auto
                  "
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={confirmBooking}
                  disabled={!paymentMethod}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl bg-[var(--primary)]
                    px-6 py-3
                    text-sm font-semibold
                    text-[var(--text-primary)]
                    disabled:cursor-not-allowed
                    disabled:bg-slate-300
                    sm:w-auto
                  "
                >
                  Confirm Booking
                  <CheckCircle2 className="h-4 w-4" />
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              CONFIRMATION
          ================================================= */}

          {isConfirmed && (
            <div className="py-8 text-center sm:py-10">

              <div
                className="
                  mx-auto flex h-16 w-16
                  items-center justify-center
                  rounded-full bg-[var(--secondary)]
                "
              >
                <CheckCircle2 className="h-9 w-9 text-[var(--primary)]" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                Booking Confirmed!
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                Your SBS Taxi booking has been confirmed.
                Your booking details are ready for email confirmation.
              </p>

              <div
                className="
                  mx-auto mt-5 max-w-md
                  rounded-xl border border-slate-200
                  bg-[var(--secondary)]
                  p-4 text-left sm:p-5
                "
              >

                <div className="flex justify-between gap-4 py-2">

                  <span className="text-xs text-[var(--text-secondary)]">
                    Passenger
                  </span>

                  <span className="break-words text-right text-sm font-semibold text-[var(--text-primary)]">
                    {passengerDetails.name}
                  </span>

                </div>

                <div className="flex justify-between gap-4 py-2">

                  <span className="text-xs text-[var(--text-secondary)]">
                    Vehicle
                  </span>

                  <span className="text-right text-sm font-semibold text-[var(--text-primary)]">
                    {selectedVehicle?.type}
                  </span>

                </div>

                <div className="flex justify-between gap-4 py-2">

                  <span className="text-xs text-[var(--text-secondary)]">
                    Seats
                  </span>

                  <span className="text-right text-sm font-semibold text-[var(--text-primary)]">
                    {selectedVehicle?.seats}
                  </span>

                </div>

                <div className="flex justify-between gap-4 py-2">

                  <span className="text-xs text-[var(--text-secondary)]">
                    People
                  </span>

                  <span className="text-right text-sm font-semibold text-[var(--text-primary)]">
                    {passengerDetails.people}
                  </span>

                </div>

                <div className="flex justify-between gap-4 py-2">

                  <span className="text-xs text-[var(--text-secondary)]">
                    Payment
                  </span>

                  <span className="text-right text-sm font-semibold text-[var(--text-primary)]">
                    {paymentMethod}
                  </span>

                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}