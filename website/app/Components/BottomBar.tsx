"use client";

import Link from "next/link";
import {
  Home,
  Car,
  MapPin,
  Phone,
  IndianRupee,
} from "lucide-react";

export default function BottomBar() {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-[9997]
        block
        border-t
        border-gray-200
        bg-white
        shadow-[0_-4px_15px_rgba(0,0,0,0.08)]
        md:hidden
      "
    >
      <div
        className="
          mx-auto
          grid
          h-16
          max-w-md
          grid-cols-5
          items-center
        "
      >
        {/* HOME */}
        <Link
          href="/"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-xs
            font-medium
            text-gray-600
            transition
            hover:text-[#1A365D]
          "
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>

        {/* BOOKING */}
        <Link
          href="/booking"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-xs
            font-medium
            text-gray-600
            transition
            hover:text-[#1A365D]
          "
        >
          <Car className="h-5 w-5" />
          <span>Book</span>
        </Link>

        {/* DESTINATIONS */}
        <Link
          href="/destinations"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-xs
            font-medium
            text-gray-600
            transition
            hover:text-[#1A365D]
          "
        >
          <MapPin className="h-5 w-5" />
          <span>Destinations</span>
        </Link>

        {/* PRICING */}
        <Link
          href="/pricing"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-xs
            font-medium
            text-gray-600
            transition
            hover:text-[#1A365D]
          "
        >
          <IndianRupee className="h-5 w-5" />
          <span>Pricing</span>
        </Link>

        {/* CALL */}
        <a
          href="tel:+918144065688"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-xs
            font-medium
            text-gray-600
            transition
            hover:text-[#1A365D]
          "
        >
          <Phone className="h-5 w-5" />
          <span>Call</span>
        </a>
      </div>
    </nav>
  );
}