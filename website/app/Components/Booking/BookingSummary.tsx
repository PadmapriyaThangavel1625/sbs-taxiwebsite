import React from 'react';
import { MapPin, Calendar, Navigation, Clock } from 'lucide-react';

export default function BookingSummary() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
        Booking Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center text-slate-600">
          <span className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-slate-400" />
            <span>Trip Type</span>
          </span>
          <span className="font-semibold text-slate-900">Outstation</span>
        </div>

        <div className="flex justify-between items-start text-slate-600">
          <span className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>From</span>
          </span>
          <span className="font-medium text-slate-500 text-right">Enter pickup location</span>
        </div>

        <div className="flex justify-between items-start text-slate-600">
          <span className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>To</span>
          </span>
          <span className="font-medium text-slate-500 text-right">Enter drop location</span>
        </div>

        <div className="flex justify-between items-center text-slate-600">
          <span className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Date & Time</span>
          </span>
          <span className="font-medium text-slate-500">Select date & time</span>
        </div>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Estimated Distance</span>
          <span className="font-semibold text-slate-900">-</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Estimated Time</span>
          <span className="font-semibold text-slate-900">-</span>
        </div>
      </div>
    </div>
  );
}