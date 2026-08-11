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
  /* =====================================================
     CURRENT STEP
  ===================================================== */

  const [currentStep, setCurrentStep] = useState(1);

  /* =====================================================
     TRIP DETAILS
  ===================================================== */

  const [tripDetails, setTripDetails] = useState<TripDetails>({
    pickup: "",
    drop: "",
    tripType: "Outstation",
    date: "",
    time: "",
    isRoundTrip: false,
    preferences: [],
  });

  /* =====================================================
     SELECTED VEHICLE
  ===================================================== */

  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);

  /* =====================================================
     PASSENGER DETAILS
  ===================================================== */

  const [passengerDetails, setPassengerDetails] =
    useState<PassengerDetails>({
      name: "",
      people: 1,
      babies: 0,
      elderly: 0,
    });

  /* =====================================================
     PAYMENT
  ===================================================== */

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod | null>(null);

  /* =====================================================
     CONFIRMATION
  ===================================================== */

  const [isConfirmed, setIsConfirmed] = useState(false);

  /* =====================================================
     UPDATE TRIP FIELD
  ===================================================== */

  const updateTripField = <
    K extends keyof TripDetails
  >(
    field: K,
    value: TripDetails[K]
  ) => {
    setTripDetails((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =====================================================
     UPDATE PASSENGER FIELD
  ===================================================== */

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

  /* =====================================================
     VALIDATION
  ===================================================== */

  const tripValid =
    tripDetails.pickup.trim() !== "" &&
    tripDetails.drop.trim() !== "" &&
    tripDetails.date !== "" &&
    tripDetails.time !== "";

  const passengerValid =
    passengerDetails.name.trim() !== "" &&
    passengerDetails.people >= 1;

  /* =====================================================
     NEXT STEP
  ===================================================== */

  const nextStep = () => {
    if (currentStep === 1 && !tripValid) {
      return;
    }

    if (currentStep === 2 && !selectedVehicle) {
      return;
    }

    if (currentStep === 3 && !passengerValid) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  /* =====================================================
     PREVIOUS STEP
  ===================================================== */

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  /* =====================================================
     VEHICLE SELECTION
  ===================================================== */

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  /* =====================================================
     CONFIRM BOOKING
  ===================================================== */

  const confirmBooking = () => {
    if (!selectedVehicle || !paymentMethod) {
      return;
    }

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

      /*
       * Replace this email address
       * with your real SBS Taxi email.
       */

      const emailAddress = "your-email@example.com";

      const subject =
        "SBS Taxi - Booking Confirmation";

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
    <div className="w-full">
      {/* =================================================
          STEP TRACKER
      ================================================= */}

      <div className="mb-6 overflow-x-auto">
        <div className="min-w-[600px] flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed =
              currentStep > step.id;

            const active =
              currentStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      border-2
                      transition-all
                      ${
                        completed
                          ? "bg-[#1A365D] border-[#1A365D] text-white"
                          : active
                          ? "bg-[#1A365D] border-[#1A365D] text-white shadow-lg"
                          : "bg-white border-slate-300 text-slate-400"
                      }
                    `}
                  >
                    {completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  <span
                    className={`
                      mt-2
                      text-xs
                      font-semibold
                      whitespace-nowrap
                      ${
                        active || completed
                          ? "text-[#1A365D]"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {step.title}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`
                      h-0.5
                      flex-1
                      mx-3
                      transition-colors
                      ${
                        currentStep > step.id
                          ? "bg-[#1A365D]"
                          : "bg-slate-200"
                      }
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 md:p-7">

          {/* =================================================
              STEP 1 - TRIP DETAILS
          ================================================= */}

          {currentStep === 1 && (
            <div className="animate-[fadeIn_0.25s_ease-out]">
              <TripDetailsForm
                details={tripDetails}
                updateField={updateTripField}
              />

              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!tripValid}
                  className="
                    flex
                    items-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    bg-[#1A365D]
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-[#142b4d]
                    disabled:bg-slate-300
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  Choose Vehicle

                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              STEP 2 - CHOOSE VEHICLE
          ================================================= */}

          {currentStep === 2 && (
            <div className="animate-[fadeIn_0.25s_ease-out]">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Choose Your Vehicle
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select the vehicle that best suits your journey.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        w-full
                        text-left
                        border-2
                        rounded-xl
                        p-5
                        transition-all
                        cursor-pointer
                        ${
                          selected
                            ? "border-[#1A365D] bg-blue-50 shadow-md"
                            : "border-slate-200 bg-white hover:border-[#1A365D] hover:bg-slate-50"
                        }
                      `}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              w-12
                              h-12
                              rounded-xl
                              flex
                              items-center
                              justify-center
                              transition
                              ${
                                selected
                                  ? "bg-[#1A365D] text-white"
                                  : "bg-slate-100 text-slate-500"
                              }
                            `}
                          >
                            <Car className="w-6 h-6" />
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900">
                              {vehicle.type}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {vehicle.model}
                            </p>
                          </div>
                        </div>

                        {selected && (
                          <div
                            className="
                              w-7
                              h-7
                              rounded-full
                              bg-[#1A365D]
                              text-white
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div
                        className="
                          mt-5
                          pt-4
                          border-t
                          border-slate-200
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                            text-sm
                            text-slate-600
                          "
                        >
                          <Users className="w-4 h-4" />

                          <span>
                            {vehicle.seats} Seats
                          </span>
                        </div>

                        <span className="font-bold text-[#1A365D]">
                          {vehicle.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div
                className="
                  mt-7
                  flex
                  flex-col-reverse
                  sm:flex-row
                  items-stretch
                  sm:items-center
                  justify-between
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={previousStep}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:bg-slate-50
                    transition
                  "
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedVehicle}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    bg-[#1A365D]
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-[#142b4d]
                    disabled:bg-slate-300
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  Passenger Details

                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              STEP 3 - PASSENGER DETAILS
          ================================================= */}

          {currentStep === 3 && (
            <div className="animate-[fadeIn_0.25s_ease-out]">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Passenger Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the passenger information for this booking.
                </p>
              </div>

              <div className="space-y-5">
                {/* NAME */}

                <div>
                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >
                    Passenger Name

                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <User
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-slate-400
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
                        w-full
                        pl-10
                        pr-4
                        py-3
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-lg
                        text-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#1A365D]
                      "
                    />
                  </div>
                </div>

                {/* PASSENGER COUNTS */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    gap-4
                  "
                >
                  {/* PEOPLE */}

                  <div
                    className="
                      border
                      border-slate-200
                      rounded-xl
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-3
                      "
                    >
                      <Users className="w-5 h-5 text-[#1A365D]" />

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                        "
                      >
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
                        w-full
                        px-3
                        py-2.5
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-lg
                        text-sm
                        font-semibold
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#1A365D]
                      "
                    />
                  </div>

                  {/* BABIES */}

                  <div
                    className="
                      border
                      border-slate-200
                      rounded-xl
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-3
                      "
                    >
                      <Baby className="w-5 h-5 text-[#1A365D]" />

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                        "
                      >
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
                        w-full
                        px-3
                        py-2.5
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-lg
                        text-sm
                        font-semibold
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#1A365D]
                      "
                    />
                  </div>

                  {/* ELDERLY */}

                  <div
                    className="
                      border
                      border-slate-200
                      rounded-xl
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-3
                      "
                    >
                      <UserRound className="w-5 h-5 text-[#1A365D]" />

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                        "
                      >
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
                        w-full
                        px-3
                        py-2.5
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-lg
                        text-sm
                        font-semibold
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#1A365D]
                      "
                    />
                  </div>
                </div>
              </div>

              {/* PASSENGER ACTIONS */}

              <div
                className="
                  mt-7
                  flex
                  flex-col-reverse
                  sm:flex-row
                  items-stretch
                  sm:items-center
                  justify-between
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={previousStep}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:bg-slate-50
                  "
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!passengerValid}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    bg-[#1A365D]
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-[#142b4d]
                    disabled:bg-slate-300
                    disabled:cursor-not-allowed
                  "
                >
                  Payment Method

                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              STEP 4 - PAYMENT
          ================================================= */}

          {currentStep === 4 && !isConfirmed && (
            <div className="animate-[fadeIn_0.25s_ease-out]">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Payment Method
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose your preferred payment method.
                </p>
              </div>

              {/* PAYMENT OPTIONS */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-4
                "
              >
                {/* CASH */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("Cash")
                  }
                  className={`
                    p-5
                    rounded-xl
                    border-2
                    text-left
                    transition
                    ${
                      paymentMethod === "Cash"
                        ? "border-[#1A365D] bg-blue-50"
                        : "border-slate-200 hover:border-[#1A365D]"
                    }
                  `}
                >
                  <Banknote className="w-7 h-7 text-[#1A365D]" />

                  <h3 className="mt-3 font-bold text-slate-900">
                    Cash
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Pay directly to the driver.
                  </p>
                </button>

                {/* UPI */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("UPI")
                  }
                  className={`
                    p-5
                    rounded-xl
                    border-2
                    text-left
                    transition
                    ${
                      paymentMethod === "UPI"
                        ? "border-[#1A365D] bg-blue-50"
                        : "border-slate-200 hover:border-[#1A365D]"
                    }
                  `}
                >
                  <Smartphone className="w-7 h-7 text-[#1A365D]" />

                  <h3 className="mt-3 font-bold text-slate-900">
                    UPI
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Pay using any UPI app.
                  </p>
                </button>

                {/* CARD */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("Card")
                  }
                  className={`
                    p-5
                    rounded-xl
                    border-2
                    text-left
                    transition
                    ${
                      paymentMethod === "Card"
                        ? "border-[#1A365D] bg-blue-50"
                        : "border-slate-200 hover:border-[#1A365D]"
                    }
                  `}
                >
                  <WalletCards className="w-7 h-7 text-[#1A365D]" />

                  <h3 className="mt-3 font-bold text-slate-900">
                    Card
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Pay using debit or credit card.
                  </p>
                </button>
              </div>

              {/* SUMMARY */}

              <div
                className="
                  mt-6
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-xl
                  p-5
                "
              >
                <h3
                  className="
                    font-bold
                    text-slate-900
                    mb-4
                  "
                >
                  Booking Summary
                </h3>

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-4
                    text-sm
                  "
                >
                  {/* ROUTE */}

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="
                        w-4
                        h-4
                        text-[#1A365D]
                        mt-0.5
                      "
                    />

                    <div>
                      <p className="text-xs text-slate-500">
                        Route
                      </p>

                      <p
                        className="
                          font-semibold
                          text-slate-800
                        "
                      >
                        {tripDetails.pickup} →{" "}
                        {tripDetails.drop}
                      </p>
                    </div>
                  </div>

                  {/* DATE */}

                  <div className="flex items-start gap-3">
                    <Calendar
                      className="
                        w-4
                        h-4
                        text-[#1A365D]
                        mt-0.5
                      "
                    />

                    <div>
                      <p className="text-xs text-slate-500">
                        Date & Time
                      </p>

                      <p
                        className="
                          font-semibold
                          text-slate-800
                        "
                      >
                        {tripDetails.date}{" "}
                        {tripDetails.time}
                      </p>
                    </div>
                  </div>

                  {/* VEHICLE */}

                  <div className="flex items-start gap-3">
                    <Car
                      className="
                        w-4
                        h-4
                        text-[#1A365D]
                        mt-0.5
                      "
                    />

                    <div>
                      <p className="text-xs text-slate-500">
                        Vehicle
                      </p>

                      <p
                        className="
                          font-semibold
                          text-slate-800
                        "
                      >
                        {selectedVehicle?.type} ·{" "}
                        {selectedVehicle?.seats} Seats
                      </p>

                      <p
                        className="
                          text-xs
                          text-[#1A365D]
                          mt-1
                          font-semibold
                        "
                      >
                        {selectedVehicle?.price}
                      </p>
                    </div>
                  </div>

                  {/* PASSENGERS */}

                  <div className="flex items-start gap-3">
                    <Users
                      className="
                        w-4
                        h-4
                        text-[#1A365D]
                        mt-0.5
                      "
                    />

                    <div>
                      <p className="text-xs text-slate-500">
                        Passengers
                      </p>

                      <p
                        className="
                          font-semibold
                          text-slate-800
                        "
                      >
                        {passengerDetails.people} People
                      </p>

                      <p
                        className="
                          text-xs
                          text-slate-500
                          mt-1
                        "
                      >
                        Babies: {passengerDetails.babies} ·
                        Elderly:{" "}
                        {passengerDetails.elderly}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT ACTIONS */}

              <div
                className="
                  mt-7
                  flex
                  flex-col-reverse
                  sm:flex-row
                  items-stretch
                  sm:items-center
                  justify-between
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={previousStep}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:bg-slate-50
                  "
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={confirmBooking}
                  disabled={!paymentMethod}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    bg-[#1A365D]
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-[#142b4d]
                    disabled:bg-slate-300
                    disabled:cursor-not-allowed
                  "
                >
                  Confirm Booking

                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              CONFIRMATION
          ================================================= */}

          {isConfirmed && (
            <div className="py-10 text-center">
              <div
                className="
                  mx-auto
                  w-16
                  h-16
                  rounded-full
                  bg-green-100
                  flex
                  items-center
                  justify-center
                "
              >
                <CheckCircle2
                  className="
                    w-9
                    h-9
                    text-green-600
                  "
                />
              </div>

              <h2
                className="
                  mt-5
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                Booking Confirmed!
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                  max-w-md
                  mx-auto
                "
              >
                Your SBS Taxi booking has been confirmed.
                Your booking details are ready for email
                confirmation.
              </p>

              <div
                className="
                  mt-6
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-xl
                  p-5
                  text-left
                  max-w-md
                  mx-auto
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    py-2
                  "
                >
                  <span className="text-xs text-slate-500">
                    Passenger
                  </span>

                  <span className="text-sm font-semibold">
                    {passengerDetails.name}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    py-2
                  "
                >
                  <span className="text-xs text-slate-500">
                    Vehicle
                  </span>

                  <span className="text-sm font-semibold">
                    {selectedVehicle?.type}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    py-2
                  "
                >
                  <span className="text-xs text-slate-500">
                    Seats
                  </span>

                  <span className="text-sm font-semibold">
                    {selectedVehicle?.seats}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    py-2
                  "
                >
                  <span className="text-xs text-slate-500">
                    People
                  </span>

                  <span className="text-sm font-semibold">
                    {passengerDetails.people}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    py-2
                  "
                >
                  <span className="text-xs text-slate-500">
                    Payment
                  </span>

                  <span className="text-sm font-semibold">
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