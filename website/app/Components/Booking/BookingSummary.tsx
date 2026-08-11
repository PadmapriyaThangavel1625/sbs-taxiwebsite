"use client";

import React from "react";
import {
  MapPin,
  Calendar,
  Navigation,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

type TripDetails = {
  pickup: string;
  drop: string;
  tripType: string;
  date: string;
  time: string;
  isRoundTrip: boolean;
  preferences: string[];
};

type BookingSummaryProps = {
  details?: TripDetails;
};

export default function BookingSummary({
  details,
}: BookingSummaryProps) {
  const trip = details ?? {
    pickup: "",
    drop: "",
    tripType: "Outstation",
    date: "",
    time: "",
    isRoundTrip: false,
    preferences: [],
  };

  const formatDate = (date: string) => {
    if (!date) {
      return "Select date";
    }

    const dateObject = new Date(`${date}T00:00:00`);

    return dateObject.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    if (!time) {
      return "Select time";
    }

    const [hours, minutes] = time.split(":");

    const dateObject = new Date();

    dateObject.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return dateObject.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const dateTime =
    trip.date && trip.time
      ? `${formatDate(trip.date)} • ${formatTime(trip.time)}`
      : "Select date & time";

  return (
    <div
      className="space-y-4"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* Heading */}
      <h2 className="booking-card-title">
        Booking Summary
      </h2>

      {/* Trip Information */}
      <div className="space-y-3 text-sm">
        {/* Trip Type */}
        <div className="flex items-center justify-between gap-4 text-slate-600">
          <span className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-slate-400" />
            <span>Trip Type</span>
          </span>

          <span className="text-right font-semibold text-slate-900">
            {trip.tripType || "Outstation"}
          </span>
        </div>

        {/* From */}
        <div className="flex items-start justify-between gap-4 text-slate-600">
          <span className="flex flex-shrink-0 items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span>From</span>
          </span>

          <span
            className={`max-w-[65%] break-words text-right font-medium ${
              trip.pickup
                ? "text-slate-900"
                : "text-slate-500"
            }`}
          >
            {trip.pickup || "Enter pickup location"}
          </span>
        </div>

        {/* To */}
        <div className="flex items-start justify-between gap-4 text-slate-600">
          <span className="flex flex-shrink-0 items-center gap-2">
            <MapPin className="h-4 w-4 text-rose-600" />
            <span>To</span>
          </span>

          <span
            className={`max-w-[65%] break-words text-right font-medium ${
              trip.drop
                ? "text-slate-900"
                : "text-slate-500"
            }`}
          >
            {trip.drop || "Enter drop location"}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-start justify-between gap-4 text-slate-600">
          <span className="flex flex-shrink-0 items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>Date & Time</span>
          </span>

          <span
            className={`text-right font-medium ${
              trip.date && trip.time
                ? "text-slate-900"
                : "text-slate-500"
            }`}
          >
            {dateTime}
          </span>
        </div>

        {/* Round Trip */}
        <div className="flex items-center justify-between gap-4 text-slate-600">
          <span className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-slate-400" />
            <span>Round Trip</span>
          </span>

          <span
            className={`font-semibold ${
              trip.isRoundTrip
                ? "text-emerald-600"
                : "text-slate-500"
            }`}
          >
            {trip.isRoundTrip ? "Yes" : "No"}
          </span>
        </div>
      </div>

      {/* Preferences */}
      {trip.preferences.length > 0 && (
        <>
          <hr className="border-slate-100" />

          <div>
            <p className="mb-2 text-xs font-semibold text-slate-700">
              Additional Preferences
            </p>

            <div className="space-y-2">
              {trip.preferences.map((preference) => (
                <div
                  key={preference}
                  className="flex items-center gap-2 text-xs text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                  <span>{preference}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Divider */}
      <hr className="border-slate-100" />

      {/* Estimates */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Estimated Distance</span>

          <span className="font-semibold text-slate-900">
            -
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Estimated Time</span>

          <span className="font-semibold text-slate-900">
            -
          </span>
        </div>
      </div>
    </div>
  );
}