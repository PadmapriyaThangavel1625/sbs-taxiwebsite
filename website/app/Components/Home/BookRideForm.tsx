"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  CarFront,
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
    <div className="w-full rounded-xl bg-white p-6 shadow-xl">
      {/* Heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
          <CarFront className="h-5 w-5 text-yellow-600" />
        </div>

        <h2 className="text-[18px] font-bold text-gray-900">
          Book Your Ride
        </h2>
      </div>

      {/* Pickup */}
      <label className="mb-1 block text-[12px] text-gray-700">
        Pickup Location
      </label>

      <div className="mb-3 flex h-[38px] items-center rounded-md border border-gray-200 px-3">
        <MapPin size={18} className="mr-2 text-green-500" />

        <input
          type="text"
          placeholder="Enter pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full text-[12px] outline-none"
        />
      </div>

      {/* Drop */}
      <label className="mb-1 block text-[12px] text-gray-700">
        Drop Location
      </label>

      <div className="mb-3 flex h-[38px] items-center rounded-md border border-gray-200 px-3">
        <MapPin size={18} className="mr-2 text-red-500" />

        <input
          type="text"
          placeholder="Enter drop location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          className="w-full text-[12px] outline-none"
        />
      </div>

      {/* Date / Time */}
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-[12px] text-gray-700">
            Date
          </label>

          <div className="flex h-[38px] items-center rounded-md border border-gray-200 px-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-[12px] outline-none"
            />

            <CalendarDays size={16} className="text-gray-500" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[12px] text-gray-700">
            Time
          </label>

          <div className="flex h-[38px] items-center rounded-md border border-gray-200 px-3">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-[12px] outline-none"
            />

            <Clock3 size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Vehicle */}
      <label className="mb-1 block text-[12px] text-gray-700">
        Select Vehicle
      </label>

      <div className="mb-4 flex h-[40px] items-center rounded-md border border-gray-200 px-3">
        <select
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="w-full appearance-none bg-transparent text-[12px] outline-none"
        >
          <option value="">Choose your vehicle</option>
          <option>SBS Mini</option>
          <option>SBS Sedan</option>
          <option>SBS Van</option>
          <option>SBS SUV</option>
          <option>SBS MUV</option>
          <option>SBS MUV+</option>
        </select>

        <ChevronDown size={16} />
      </div>

      {/* Button */}
      <button
        onClick={handleBookRide}
        className="h-[39px] w-full rounded-md bg-[#ffc107] text-[14px] font-bold text-black transition hover:bg-[#e9ae00]"
      >
        Book Ride Now
      </button>
    </div>
  );
}