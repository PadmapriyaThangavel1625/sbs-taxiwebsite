
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  User,
  Mail,
} from "lucide-react";

export default function BookRideForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [sending, setSending] = useState(false);

  const handleBookRide = async () => {
    if (
      !name ||
      !email ||
      !pickup ||
      !drop ||
      !date ||
      !time ||
      !vehicle
    ) {
      toast.error("Please fill all the fields!");
      return;
    }

    try {
      setSending(true);

      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          pickup,
          drop,
          date,
          time,
          vehicle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to send booking request."
        );
      }

      toast.success("🎉 Booking request sent successfully!");

      setName("");
      setEmail("");
      setPickup("");
      setDrop("");
      setDate("");
      setTime("");
      setVehicle("");
    } catch (error) {
      console.error("Booking error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send booking request."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      {/* Header */}
      <div className="bg-primary px-5 py-5 text-white sm:px-6">
        <h2 className="!text-white text-xl font-bold sm:text-2xl">
          Book a Ride
        </h2>

        <p className="mt-1 text-xs !text-white/80 sm:text-sm">
          Enter your trip details to book a taxi.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 p-5 sm:p-6">

        {/* Name & Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Your Name
            </label>

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[var(--primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
              <User
                size={18}
                className="mr-2 shrink-0 text-[var(--muted)]"
              />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Email Address
            </label>

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[var(--primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
              <Mail
                size={18}
                className="mr-2 shrink-0 text-[var(--muted)]"
              />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Pickup & Drop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Pickup */}
          <div>
            <label
              htmlFor="pickup"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Pickup Location
            </label>

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[var(--primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
              <MapPin
                size={18}
                className="mr-2 shrink-0 text-green-500"
              />

              <input
                id="pickup"
                name="pickup"
                type="text"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                autoComplete="street-address"
                className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Drop */}
          <div>
            <label
              htmlFor="drop"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Drop Location
            </label>

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[var(--primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
              <MapPin
                size={18}
                className="mr-2 shrink-0 text-red-500"
              />

              <input
                id="drop"
                name="drop"
                type="text"
                placeholder="Enter drop location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                autoComplete="street-address"
                className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Date
            </label>

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[var(--primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none"
              />

              <CalendarDays
                size={18}
                className="ml-2 shrink-0 text-[var(--muted)]"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Time
            </label>

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[var(--primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
              <input
                id="time"
                name="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none"
              />

              <Clock3
                size={18}
                className="ml-2 shrink-0 text-[var(--muted)]"
              />
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div>
          <label
            htmlFor="vehicle"
            className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
          >
            Select Vehicle
          </label>

          <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[var(--primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
            <select
              id="vehicle"
              name="vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full min-w-0 appearance-none bg-transparent text-sm text-[var(--text)] outline-none"
            >
              <option value="">Choose your vehicle</option>
              <option value="SBS Mini">SBS Mini</option>
              <option value="SBS Sedan">SBS Sedan</option>
              <option value="SBS Van">SBS Van</option>
              <option value="SBS SUV">SBS SUV</option>
              <option value="SBS MUV">SBS MUV</option>
              <option value="SBS MUV+">SBS MUV+</option>
            </select>

            <ChevronDown
              size={18}
              className="ml-2 shrink-0 text-[var(--muted)]"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleBookRide}
          disabled={sending}
          className="
            mt-2
            h-12
            w-full
            rounded-lg
            bg-[var(--secondary)]
            px-5
            text-sm
            font-bold
            text-black
            shadow-md
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[var(--secondary-dark)]
            hover:shadow-lg
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:text-base
          "
        >
          {sending ? "Sending Booking..." : "Book Ride Now"}
        </button>
      </div>
    </div>
  );
}
