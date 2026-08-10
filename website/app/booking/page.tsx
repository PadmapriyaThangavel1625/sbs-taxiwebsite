
"use client";

import React, { useState } from "react";

import HeroBanner from "@/app/Components/Booking/HeroBanner";
import StepTracker from "@/app/Components/Booking/StepTracker";
import TripDetailsForm, {
  TripDetails,
} from "@/app/Components/Booking/TripDetailsForm";
import BookingSummary from "@/app/Components/Booking/BookingSummary";
import WhyBookWithUs from "@/app/Components/Booking/WhyBookWithUs";
import PromoCard from "@/app/Components/Booking/PromoCard";
import SecurityBanner from "@/app/Components/Booking/SecurityBanner";

export default function BookingPage() {
  const [details, setDetails] = useState<TripDetails>({
    pickup: "",
    drop: "",
    tripType: "Outstation",
    date: "",
    time: "",
    isRoundTrip: false,
    preferences: [],
  });

  const updateField = <K extends keyof TripDetails>(
    field: K,
    value: TripDetails[K]
  ) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <HeroBanner
        title="Book a Ride"
        breadcrumb={[
          { label: "Home", href: "/" },
          {
            label: "Book a Ride",
            href: "/booking",
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Steps */}
        <StepTracker currentStep={1} />

        {/* Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* Trip Details */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <TripDetailsForm
                details={details}
                updateField={updateField}
              />

              {/* Continue Button */}
              <button
                type="button"
                className="mt-6 w-full sm:w-auto bg-[#1A365D] hover:bg-blue-900 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <span>
                  Continue to Vehicle Selection
                </span>

                <span>→</span>
              </button>
            </div>

            {/* Security */}
            <SecurityBanner />

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* Booking Summary */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <BookingSummary
                details={details}
              />
            </div>

            {/* Why Book */}
            <WhyBookWithUs />

            {/* Promo */}
            <PromoCard />

          </div>

        </div>
      </div>
    </main>
  );
}
