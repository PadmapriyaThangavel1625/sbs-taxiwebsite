"use client";

import HeroBanner from "@/app/Components/Booking/HeroBanner";
import BookingFlow from "@/app/Components/Booking/BookingFlow";
import BookingSummary from "@/app/Components/Booking/BookingSummary";
import WhyBookWithUs from "@/app/Components/Booking/WhyBookWithUs";
import PromoCard from "@/app/Components/Booking/PromoCard";
import SecurityBanner from "@/app/Components/Booking/SecurityBanner";
import TempleTripBooking from "@/app/Components/Booking/TempleTourBooking";

export default function BookingPage() {
return ( <main>

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
      MAIN CONTENT
  ================================================= */}

  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

    <div className="mt-2 grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* =================================================
          LEFT
      ================================================= */}

      <div className="space-y-6 lg:col-span-2">

        <BookingFlow />

        <SecurityBanner />

        <TempleTripBooking />

      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

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
