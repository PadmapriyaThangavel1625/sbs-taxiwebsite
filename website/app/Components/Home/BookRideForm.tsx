
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
} from "lucide-react";

export default function BookRideForm() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState("");

  const handleBookRide = () => {
    if (!pickup || !drop || !date || !time || !vehicle) {
      toast.error("Please fill all the fields!");
      return;
    }

    toast.success("🎉 Ride booked successfully!");

    // Reset form
    setPickup("");
    setDrop("");
    setDate("");
    setTime("");
    setVehicle("");
  };

  return (
    <div
      className="
        w-full
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-lg

        sm:p-5
        md:p-6
      "
    >
      {/* ================= HEADING ================= */}
      <div className="mb-5">
        <h2
          className="
            text-[18px]
            font-bold
            text-[var(--heading)]

            sm:text-[20px]
          "
        >
          Book Your Ride
        </h2>

        <p className="mt-1 text-[12px] text-[var(--muted)]">
          Enter your trip details to book a taxi.
        </p>
      </div>

      {/* ================= PICKUP ================= */}
      <div className="mb-3">
        <label
          htmlFor="pickup"
          className="
            mb-1
            block
            text-[12px]
            font-medium
            text-[var(--text)]
          "
        >
          Pickup Location
        </label>

        <div
          className="
            flex
            h-[42px]
            w-full
            items-center
            rounded-md
            border
            border-gray-200
            bg-white
            px-3
            transition

            focus-within:border-[var(--primary)]
            focus-within:ring-1
            focus-within:ring-[var(--primary)]
          "
        >
          <MapPin
            size={18}
            className="mr-2 shrink-0 text-green-500"
          />

          <input
            id="pickup"
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="
              w-full
              min-w-0
              bg-transparent
              text-[12px]
              text-[var(--text)]
              outline-none
              placeholder:text-gray-400

              sm:text-[13px]
            "
          />
        </div>
      </div>

      {/* ================= DROP ================= */}
      <div className="mb-3">
        <label
          htmlFor="drop"
          className="
            mb-1
            block
            text-[12px]
            font-medium
            text-[var(--text)]
          "
        >
          Drop Location
        </label>

        <div
          className="
            flex
            h-[42px]
            w-full
            items-center
            rounded-md
            border
            border-gray-200
            bg-white
            px-3
            transition

            focus-within:border-[var(--primary)]
            focus-within:ring-1
            focus-within:ring-[var(--primary)]
          "
        >
          <MapPin
            size={18}
            className="mr-2 shrink-0 text-red-500"
          />

          <input
            id="drop"
            type="text"
            placeholder="Enter drop location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="
              w-full
              min-w-0
              bg-transparent
              text-[12px]
              text-[var(--text)]
              outline-none
              placeholder:text-gray-400

              sm:text-[13px]
            "
          />
        </div>
      </div>

      {/* ================= DATE / TIME ================= */}
      <div
        className="
          mb-3
          grid
          grid-cols-1
          gap-3

          sm:grid-cols-2
          sm:gap-4
        "
      >
        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="
              mb-1
              block
              text-[12px]
              font-medium
              text-[var(--text)]
            "
          >
            Date
          </label>

          <div
            className="
              flex
              h-[42px]
              w-full
              items-center
              rounded-md
              border
              border-gray-200
              bg-white
              px-3
              transition

              focus-within:border-[var(--primary)]
              focus-within:ring-1
              focus-within:ring-[var(--primary)]
            "
          >
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
                min-w-0
                w-full
                bg-transparent
                text-[12px]
                text-[var(--text)]
                outline-none

                sm:text-[13px]
              "
            />

            <CalendarDays
              size={16}
              className="ml-2 shrink-0 text-[var(--muted)]"
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label
            htmlFor="time"
            className="
              mb-1
              block
              text-[12px]
              font-medium
              text-[var(--text)]
            "
          >
            Time
          </label>

          <div
            className="
              flex
              h-[42px]
              w-full
              items-center
              rounded-md
              border
              border-gray-200
              bg-white
              px-3
              transition

              focus-within:border-[var(--primary)]
              focus-within:ring-1
              focus-within:ring-[var(--primary)]
            "
          >
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
                min-w-0
                w-full
                bg-transparent
                text-[12px]
                text-[var(--text)]
                outline-none

                sm:text-[13px]
              "
            />

            <Clock3
              size={16}
              className="ml-2 shrink-0 text-[var(--muted)]"
            />
          </div>
        </div>
      </div>

      {/* ================= VEHICLE ================= */}
      <div className="mb-4">
        <label
          htmlFor="vehicle"
          className="
            mb-1
            block
            text-[12px]
            font-medium
            text-[var(--text)]
          "
        >
          Select Vehicle
        </label>

        <div
          className="
            flex
            h-[42px]
            w-full
            items-center
            rounded-md
            border
            border-gray-200
            bg-white
            px-3
            transition

            focus-within:border-[var(--primary)]
            focus-within:ring-1
            focus-within:ring-[var(--primary)]
          "
        >
          <select
            id="vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="
              w-full
              min-w-0
              appearance-none
              bg-transparent
              text-[12px]
              text-[var(--text)]
              outline-none

              sm:text-[13px]
            "
          >
            <option value="">
              Choose your vehicle
            </option>

            <option value="SBS Mini">
              SBS Mini
            </option>

            <option value="SBS Sedan">
              SBS Sedan
            </option>

            <option value="SBS Van">
              SBS Van
            </option>

            <option value="SBS SUV">
              SBS SUV
            </option>

            <option value="SBS MUV">
              SBS MUV
            </option>

            <option value="SBS MUV+">
              SBS MUV+
            </option>
          </select>

          <ChevronDown
            size={16}
            className="ml-2 shrink-0 text-[var(--muted)]"
          />
        </div>
      </div>

      {/* ================= BOOK BUTTON ================= */}
      <button
        type="button"
        onClick={handleBookRide}
        className="
          h-[43px]
          w-full
          rounded-md
          bg-[var(--secondary)]
          px-4
          text-[13px]
          font-bold
          text-black
          shadow-sm
          transition

          hover:bg-[var(--secondary-dark)]

          active:scale-[0.98]

          sm:text-[14px]
        "
      >
        Book Ride Now
      </button>
    </div>
  );
}

