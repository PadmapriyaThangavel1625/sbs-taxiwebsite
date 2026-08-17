"use client";

import HeroBanner from "@/app/Components/Booking/HeroBanner";
import BookingFlow from "@/app/Components/Booking/BookingFlow";
import BookingSummary from "@/app/Components/Booking/BookingSummary";
import WhyBookWithUs from "@/app/Components/Booking/WhyBookWithUs";
import PromoCard from "@/app/Components/Booking/PromoCard";
import SecurityBanner from "@/app/Components/Booking/SecurityBanner";
import TempleTripBooking from "@/app/Components/Booking/TempleTourBooking";

export default function BookingPage() {
  return (
    <main>
      {/* =================================================
          HERO
      ================================================= */}
      <HeroBanner
        title="Book a Ride"
        breadcrumb={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Book a Ride",
            href: "/booking",
          },
        ]}
      />

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            NORMAL BOOKING SECTION
        ================================================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            <BookingFlow />
            <SecurityBanner />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <BookingSummary />
            <WhyBookWithUs />
            <PromoCard />
          </div>

        </div>

        {/* =================================================
            TEMPLE TOUR SECTION
            FULL WIDTH
        ================================================= */}
        <div className="mt-8">

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">

            {/* TEMPLE TOUR BOOKING */}
            <div className="min-w-0">
              <TempleTripBooking />
            </div>

            {/* TEMPLE TOUR IMAGE */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/images/trip.webp"
                  alt="Tamil Nadu Temple Tour"
                  className="block h-auto w-full rounded-2xl object-cover"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}