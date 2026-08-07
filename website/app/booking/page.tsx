import React from 'react';
import HeroBanner from '@/app/Components/Booking/HeroBanner';
import StepTracker from '@/app/Components/Booking/StepTracker';
import TripDetailsForm from '@/app/Components/Booking/TripDetailsForm';
import BookingSummary from '@/app/Components/Booking/BookingSummary';
import WhyBookWithUs from '@/app/Components/Booking/WhyBookWithUs';
import PromoCard from '@/app/Components/Booking/PromoCard';
import SecurityBanner from '@/app/Components/Booking/SecurityBanner';

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <HeroBanner 
        title="Book a Ride" 
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Book a Ride", href: "/booking" }]} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepTracker currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column: Form & Security */}
          <div className="lg:col-span-2 space-y-6">
            <TripDetailsForm />
            <SecurityBanner />
          </div>

          {/* Right Column: Summary, Why Book & Promo */}
          <div className="space-y-6">
            <BookingSummary />
            <WhyBookWithUs />
            <PromoCard />
          </div>
        </div>
      </div>
    </main>
  );
}