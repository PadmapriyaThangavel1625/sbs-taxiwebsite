"use client";

import Link from "next/link";
import {
  Home,
  Car,
  MapPin,
  Phone,
  Menu,
} from "lucide-react";

export default function BottomBar() {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-[100]
        border-t
        border-gray-200
        bg-white
        shadow-[0_-4px_15px_rgba(0,0,0,0.08)]
        md:hidden
      "
    >
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5">

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

        {/* TRACK */}
        <Link
          href="/tracking"
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
          <span>Track</span>
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

        {/* MENU */}
        <Link
          href="/menu"
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
          <Menu className="h-5 w-5" />
          <span>Menu</span>
        </Link>

      </div>
    </nav>
  );
}