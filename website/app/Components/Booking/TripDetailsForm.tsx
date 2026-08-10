"use client";

import React from "react";
import {
  Calendar,
  Clock,
  Crosshair,
  Briefcase,
  Baby,
  Dog,
  UserCheck,
} from "lucide-react";

export type TripDetails = {
  pickup: string;
  drop: string;
  tripType: string;
  date: string;
  time: string;
  isRoundTrip: boolean;
  preferences: string[];
};

type TripDetailsFormProps = {
  details: TripDetails;
  updateField: <K extends keyof TripDetails>(
    field: K,
    value: TripDetails[K]
  ) => void;
};

export default function TripDetailsForm({
  details,
  updateField,
}: TripDetailsFormProps) {
  const togglePreference = (preference: string) => {
    if (details.preferences.includes(preference)) {
      updateField(
        "preferences",
        details.preferences.filter(
          (item) => item !== preference
        )
      );
    } else {
      updateField("preferences", [
        ...details.preferences,
        preference,
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADING */}
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Trip Details
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Enter your pickup, destination and trip preferences.
        </p>
      </div>

      {/* LOCATIONS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* PICKUP */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Pickup Location{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="text"
              value={details.pickup}
              onChange={(e) =>
                updateField("pickup", e.target.value)
              }
              placeholder="Enter pickup location"
              className="
                w-full rounded-lg border border-slate-200
                bg-slate-50 px-4 py-2.5 pr-10
                text-sm text-slate-900
                focus:outline-none focus:ring-2
                focus:ring-[#1A365D]
              "
            />

            <Crosshair className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* DROP */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Drop Location{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="text"
              value={details.drop}
              onChange={(e) =>
                updateField("drop", e.target.value)
              }
              placeholder="Enter drop location"
              className="
                w-full rounded-lg border border-slate-200
                bg-slate-50 px-4 py-2.5 pr-10
                text-sm text-slate-900
                focus:outline-none focus:ring-2
                focus:ring-[#1A365D]
              "
            />

            <Crosshair className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* TRIP TYPE / DATE / TIME */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* TRIP TYPE */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Trip Type{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={details.tripType}
            onChange={(e) =>
              updateField("tripType", e.target.value)
            }
            className="
              w-full rounded-lg border border-slate-200
              bg-slate-50 px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2
              focus:ring-[#1A365D]
            "
          >
            <option value="Outstation">Outstation</option>
            <option value="Local Rental">Local Rental</option>
            <option value="Airport Transfer">
              Airport Transfer
            </option>
            <option value="Temple Tour">Temple Tour</option>
          </select>
        </div>

        {/* DATE */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Date <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="date"
              value={details.date}
              onChange={(e) =>
                updateField("date", e.target.value)
              }
              className="
                w-full rounded-lg border border-slate-200
                bg-slate-50 px-3 py-2.5 pr-10 text-sm
                focus:outline-none focus:ring-2
                focus:ring-[#1A365D]
              "
            />

            <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* TIME */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Time <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="time"
              value={details.time}
              onChange={(e) =>
                updateField("time", e.target.value)
              }
              className="
                w-full rounded-lg border border-slate-200
                bg-slate-50 px-3 py-2.5 pr-10 text-sm
                focus:outline-none focus:ring-2
                focus:ring-[#1A365D]
              "
            />

            <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* ROUND TRIP */}
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Round Trip?
          </p>

          <p className="text-xs text-slate-500">
            Yes, I want a round trip
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            updateField(
              "isRoundTrip",
              !details.isRoundTrip
            )
          }
          className={`flex h-6 w-11 items-center rounded-full p-1 transition ${
            details.isRoundTrip
              ? "bg-[#1A365D]"
              : "bg-slate-300"
          }`}
        >
          <div
            className={`h-4 w-4 rounded-full bg-white shadow-md transition-transform ${
              details.isRoundTrip
                ? "translate-x-5"
                : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* PREFERENCES */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-slate-700">
          Additional Preferences (Optional)
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* EXTRA LUGGAGE */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Extra Luggage")
            }
            className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs font-medium transition ${
              details.preferences.includes("Extra Luggage")
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <Briefcase className="h-4 w-4 text-slate-500" />
            Extra Luggage
          </button>

          {/* CHILD SEAT */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Child Seat")
            }
            className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs font-medium transition ${
              details.preferences.includes("Child Seat")
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <Baby className="h-4 w-4 text-slate-500" />
            Child Seat
          </button>

          {/* PET */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Pet Friendly")
            }
            className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs font-medium transition ${
              details.preferences.includes("Pet Friendly")
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <Dog className="h-4 w-4 text-slate-500" />
            Pet Friendly
          </button>

          {/* SENIOR */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Senior Citizen")
            }
            className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs font-medium transition ${
              details.preferences.includes(
                "Senior Citizen"
              )
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <UserCheck className="h-4 w-4 text-slate-500" />
            Senior Citizen
          </button>
        </div>
      </div>
    </div>
  );
}