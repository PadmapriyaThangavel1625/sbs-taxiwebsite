
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
    const exists = details.preferences.includes(preference);

    if (exists) {
      updateField(
        "preferences",
        details.preferences.filter((item) => item !== preference)
      );
    } else {
      updateField("preferences", [
        ...details.preferences,
        preference,
      ]);
    }
  };

  return (
    <div className="space-y-5">
      {/* Heading */}
      <h2 className="text-lg font-bold text-slate-900">
        Trip Details
      </h2>

      {/* Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pickup */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
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
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />

            <Crosshair className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>

        {/* Drop */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
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
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />

            <Crosshair className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Trip Type / Date / Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trip Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Trip Type{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={details.tripType}
            onChange={(e) =>
              updateField("tripType", e.target.value)
            }
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
          >
            <option value="Outstation">Outstation</option>
            <option value="Local Rental">
              Local Rental
            </option>
            <option value="Airport Transfer">
              Airport Transfer
            </option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="date"
              value={details.date}
              onChange={(e) =>
                updateField("date", e.target.value)
              }
              className="w-full px-3 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />

            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Time <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="time"
              value={details.time}
              onChange={(e) =>
                updateField("time", e.target.value)
              }
              className="w-full px-3 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />

            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Round Trip */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
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
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            details.isRoundTrip
              ? "bg-[#1A365D]"
              : "bg-slate-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              details.isRoundTrip
                ? "translate-x-5"
                : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Preferences */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Additional Preferences (Optional)
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Extra Luggage */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Extra Luggage")
            }
            className={`flex items-center gap-2 border p-2.5 rounded-lg text-xs font-medium text-left transition ${
              details.preferences.includes("Extra Luggage")
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span>Extra Luggage</span>
          </button>

          {/* Child Seat */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Child Seat")
            }
            className={`flex items-center gap-2 border p-2.5 rounded-lg text-xs font-medium text-left transition ${
              details.preferences.includes("Child Seat")
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <Baby className="w-4 h-4 text-slate-500" />
            <span>Child Seat</span>
          </button>

          {/* Pet Friendly */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Pet Friendly")
            }
            className={`flex items-center gap-2 border p-2.5 rounded-lg text-xs font-medium text-left transition ${
              details.preferences.includes("Pet Friendly")
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <Dog className="w-4 h-4 text-slate-500" />
            <span>Pet Friendly</span>
          </button>

          {/* Senior Citizen */}
          <button
            type="button"
            onClick={() =>
              togglePreference("Senior Citizen")
            }
            className={`flex items-center gap-2 border p-2.5 rounded-lg text-xs font-medium text-left transition ${
              details.preferences.includes(
                "Senior Citizen"
              )
                ? "border-[#1A365D] bg-blue-50"
                : "border-slate-200 hover:border-[#1A365D]"
            }`}
          >
            <UserCheck className="w-4 h-4 text-slate-500" />
            <span>Senior Citizen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
