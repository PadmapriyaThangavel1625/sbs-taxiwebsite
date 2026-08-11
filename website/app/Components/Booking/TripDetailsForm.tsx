
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
  /* =====================================================
     TOGGLE PREFERENCE
  ===================================================== */

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

  /* =====================================================
     PREFERENCE DATA
  ===================================================== */

  const preferences = [
    {
      label: "Extra Luggage",
      icon: Briefcase,
    },
    {
      label: "Child Seat",
      icon: Baby,
    },
    {
      label: "Pet Friendly",
      icon: Dog,
    },
    {
      label: "Senior Citizen",
      icon: UserCheck,
    },
  ];

  /* =====================================================
     INPUT STYLE
  ===================================================== */

  const inputClass = `
    h-12
    w-full
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    px-4
    text-sm
    font-medium
    text-slate-900
    outline-none
    transition-all
    placeholder:text-slate-400
    hover:border-slate-300
    focus:border-[#1A365D]
    focus:bg-white
    focus:ring-2
    focus:ring-[#1A365D]/10
  `;

  return (
    <div
      className="
        space-y-6
        font-[var(--font-jakarta)]
      "
    >
      {/* =================================================
          HEADING
      ================================================= */}

      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          Trip Details
        </h2>

        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
          Enter your pickup, destination and trip
          preferences.
        </p>
      </div>

      {/* =================================================
          LOCATIONS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* PICKUP */}

        <div>
          <label className="mb-2 block text-xs font-bold text-slate-700">
            Pickup Location{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="text"
              value={details.pickup}
              onChange={(e) =>
                updateField(
                  "pickup",
                  e.target.value
                )
              }
              placeholder="Enter pickup location"
              className={`${inputClass} pr-11`}
            />

            <Crosshair
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-[18px]
                w-[18px]
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

        {/* DROP */}

        <div>
          <label className="mb-2 block text-xs font-bold text-slate-700">
            Drop Location{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="text"
              value={details.drop}
              onChange={(e) =>
                updateField(
                  "drop",
                  e.target.value
                )
              }
              placeholder="Enter drop location"
              className={`${inputClass} pr-11`}
            />

            <Crosshair
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-[18px]
                w-[18px]
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

      </div>

      {/* =================================================
          TRIP TYPE / DATE / TIME
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* TRIP TYPE */}

        <div>
          <label className="mb-2 block text-xs font-bold text-slate-700">
            Trip Type{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={details.tripType}
            onChange={(e) =>
              updateField(
                "tripType",
                e.target.value
              )
            }
            className={`
              ${inputClass}
              cursor-pointer
            `}
          >
            <option value="Outstation">
              Outstation
            </option>

            <option value="Local Rental">
              Local Rental
            </option>

            <option value="Airport Transfer">
              Airport Transfer
            </option>

            <option value="Temple Tour">
              Temple Tour
            </option>
          </select>
        </div>

        {/* DATE */}

        <div>
          <label className="mb-2 block text-xs font-bold text-slate-700">
            Date{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="date"
              value={details.date}
              onChange={(e) =>
                updateField(
                  "date",
                  e.target.value
                )
              }
              className={`${inputClass} pr-11`}
            />

            <Calendar
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-[18px]
                w-[18px]
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

        {/* TIME */}

        <div>
          <label className="mb-2 block text-xs font-bold text-slate-700">
            Time{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="time"
              value={details.time}
              onChange={(e) =>
                updateField(
                  "time",
                  e.target.value
                )
              }
              className={`${inputClass} pr-11`}
            />

            <Clock
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-[18px]
                w-[18px]
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

      </div>

      {/* =================================================
          ROUND TRIP
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-4
          transition
          hover:border-slate-300
        "
      >
        <div>
          <p className="text-sm font-bold text-slate-800">
            Round Trip?
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Yes, I want a round trip
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={details.isRoundTrip}
          aria-label="Round trip"
          onClick={() =>
            updateField(
              "isRoundTrip",
              !details.isRoundTrip
            )
          }
          className={`
            relative
            flex
            h-7
            w-12
            shrink-0
            items-center
            rounded-full
            p-1
            transition-all
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-[#1A365D]/20
            ${
              details.isRoundTrip
                ? "bg-[#1A365D]"
                : "bg-slate-300"
            }
          `}
        >
          <span
            className={`
              block
              h-5
              w-5
              rounded-full
              bg-white
              shadow-sm
              transition-transform
              duration-200
              ${
                details.isRoundTrip
                  ? "translate-x-5"
                  : "translate-x-0"
              }
            `}
          />
        </button>
      </div>

      {/* =================================================
          PREFERENCES
      ================================================= */}

      <div>
        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-700 sm:text-sm">
            Additional Preferences
            <span className="ml-1 font-medium text-slate-400">
              (Optional)
            </span>
          </label>

          <p className="mt-1 text-xs text-slate-400">
            Select any requirements for your ride.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          {preferences.map(
            ({ label, icon: Icon }) => {
              const isSelected =
                details.preferences.includes(
                  label
                );

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    togglePreference(label)
                  }
                  className={`
                    flex
                    min-h-[58px]
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    px-3
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      isSelected
                        ? "border-[#1A365D] bg-blue-50 text-[#1A365D] shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#1A365D]/40 hover:bg-slate-50"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${
                        isSelected
                          ? "bg-[#1A365D] text-white"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="leading-4">
                    {label}
                  </span>
                </button>
              );
            }
          )}

        </div>
      </div>

    </div>
  );
}
