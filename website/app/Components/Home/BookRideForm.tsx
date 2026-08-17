"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logo from "../Logo";
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

  const [pickup, setPickup] = useState("SBS Technologies");
  const [drop, setDrop] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [vehicle, setVehicle] = useState("SBS Mini");

  const [sending, setSending] = useState(false);

  /* =====================================================
     INPUT WRAPPER
  ===================================================== */

  const inputWrapper = () => `
    flex
    h-11
    items-center
    rounded-lg
    border
    border-gray-200
    bg-gray-50
    px-3
    transition-all
    duration-200
    focus-within:border-gray-200
    focus-within:outline-none
    focus-within:ring-0
    focus-within:ring-offset-0
  `;

  /* =====================================================
     INPUT CLASS
     Removes browser focus outlines/borders/rings completely
  ===================================================== */

  const inputClass = `
    w-full
    min-w-0
    bg-transparent
    text-sm
    text-[var(--text)]
    border-none
    outline-none
    ring-0
    focus:border-none
    focus:outline-none
    focus:ring-0
    focus-visible:border-none
    focus-visible:outline-none
    focus-visible:ring-0
    placeholder:text-gray-400
  `;

  /* =====================================================
     DATE / TIME
  ===================================================== */

  useEffect(() => {
    const now = new Date();

    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    const currentTime = [
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
    ].join(":");

    setDate(today);
    setTime(currentTime);
  }, []);

  /* =====================================================
     BOOK RIDE
  ===================================================== */

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
          bookingType: "simple-booking",
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

      toast.success(
        "🎉 Booking request sent successfully!"
      );

      /* Reset */

      setName("");
      setEmail("");
      setPickup("SBS Technologies");
      setDrop("");

      const now = new Date();

      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      const currentTime = [
        String(now.getHours()).padStart(2, "0"),
        String(now.getMinutes()).padStart(2, "0"),
      ].join(":");

      setDate(today);
      setTime(currentTime);
      setVehicle("SBS Mini");
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

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-primary px-5 py-5 text-white sm:px-6">
        <Logo variant="footer" />

        <p className="mt-1 text-xs !text-white/80 sm:text-sm">
          Enter your trip details to book a taxi.
        </p>
      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <div className="space-y-4 p-5 sm:p-6">

        {/* =================================================
            NAME + EMAIL
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* NAME */}

          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Your Name
            </label>

            <div className={inputWrapper()}>
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
                className={inputClass}
              />
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Email Address
            </label>

            <div className={inputWrapper()}>
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
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* =================================================
            PICKUP + DROP
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* PICKUP */}

          <div>
            <label
              htmlFor="pickup"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Pickup Location
            </label>

            <div className={inputWrapper()}>
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
                className={inputClass}
              />
            </div>
          </div>

          {/* DROP */}

          <div>
            <label
              htmlFor="drop"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Drop Location
            </label>

            <div className={inputWrapper()}>
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
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* =================================================
            DATE + TIME
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* DATE */}

          <div>
            <label
              htmlFor="date"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Date
            </label>

            <div className={inputWrapper()}>
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />

              <CalendarDays
                size={18}
                className="ml-2 shrink-0 text-[var(--muted)]"
              />
            </div>
          </div>

          {/* TIME */}

          <div>
            <label
              htmlFor="time"
              className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
            >
              Time
            </label>

            <div className={inputWrapper()}>
              <input
                id="time"
                name="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputClass}
              />

              <Clock3
                size={18}
                className="ml-2 shrink-0 text-[var(--muted)]"
              />
            </div>
          </div>
        </div>

        {/* =================================================
            VEHICLE
        ================================================= */}

        <div>
          <label
            htmlFor="vehicle"
            className="mb-1.5 block text-xs font-semibold text-[var(--text)]"
          >
            Select Vehicle
          </label>

          <div className={inputWrapper()}>
            <select
              id="vehicle"
              name="vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className={`
                ${inputClass}
                appearance-none
                cursor-pointer
              `}
            >
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
              size={18}
              className="ml-2 shrink-0 text-[var(--muted)]"
            />
          </div>
        </div>

        {/* =================================================
            BUTTON
        ================================================= */}

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
          {sending ? "Sending Booking..." : "Book a Ride"}
        </button>
      </div>
    </div>
  );
}