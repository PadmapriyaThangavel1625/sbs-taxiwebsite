'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Crosshair, Briefcase, Baby, Dog, UserCheck } from 'lucide-react';

export default function TripDetailsForm() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
      <h2 className="text-xl font-bold text-slate-900">Trip Details</h2>

      {/* Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Pickup Location <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Enter pickup location"
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />
            <Crosshair className="absolute right-3 w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Drop Location <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Enter drop location"
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />
            <Crosshair className="absolute right-3 w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Trip Type, Date, Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Trip Type <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]">
            <option>Outstation</option>
            <option>Local Rental</option>
            <option>Airport Transfer</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Select date"
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />
            <Calendar className="absolute right-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Time <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Select time"
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]"
            />
            <Clock className="absolute right-3 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Round Trip Toggle Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-slate-800">Round Trip?</span>
          <span className="text-xs text-slate-500">Yes, I want a round trip</span>
        </div>
        <button
          onClick={() => setIsRoundTrip(!isRoundTrip)}
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            isRoundTrip ? 'bg-[#1A365D]' : 'bg-slate-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isRoundTrip ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Additional Preferences */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Additional Preferences (Optional)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex items-center space-x-2 border border-slate-200 p-2.5 rounded-lg text-xs font-medium cursor-pointer hover:border-[#1A365D]">
            <input type="checkbox" className="rounded text-[#1A365D] focus:ring-[#1A365D]" />
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span>Extra Luggage</span>
          </label>
          <label className="flex items-center space-x-2 border border-slate-200 p-2.5 rounded-lg text-xs font-medium cursor-pointer hover:border-[#1A365D]">
            <input type="checkbox" className="rounded text-[#1A365D] focus:ring-[#1A365D]" />
            <Baby className="w-4 h-4 text-slate-500" />
            <span>Child Seat</span>
          </label>
          <label className="flex items-center space-x-2 border border-slate-200 p-2.5 rounded-lg text-xs font-medium cursor-pointer hover:border-[#1A365D]">
            <input type="checkbox" className="rounded text-[#1A365D] focus:ring-[#1A365D]" />
            <Dog className="w-4 h-4 text-slate-500" />
            <span>Pet Friendly</span>
          </label>
          <label className="flex items-center space-x-2 border border-slate-200 p-2.5 rounded-lg text-xs font-medium cursor-pointer hover:border-[#1A365D]">
            <input type="checkbox" className="rounded text-[#1A365D] focus:ring-[#1A365D]" />
            <UserCheck className="w-4 h-4 text-slate-500" />
            <span>Senior Citizen</span>
          </label>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full sm:w-auto bg-[#1A365D] hover:bg-blue-900 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2 shadow-md">
        <span>Continue to Vehicle Selection</span>
        <span>→</span>
      </button>
    </div>
  );
}