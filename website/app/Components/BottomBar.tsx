
"use client";

import Link from "next/link";
import {
  Home,
  BriefcaseBusiness,
  CarFront,
  IndianRupee,
  MapPin,
  Tag,
} from "lucide-react";

export default function BottomBar() {
  return (
    <nav
      className="
        fixed
        inset-x-0
        bottom-0
        z-[9997]
        block
        border-t
        border-gray-200
        bg-white
        md:hidden
        font-[var(--font-jakarta)]
      "
    >
      <div className="grid h-16 w-full grid-cols-6 bg-white">

        {/* HOME */}
        <Link
          href="/"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-gray-600
            active:bg-gray-100
          "
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">
            Home
          </span>
        </Link>

        {/* SERVICES */}
        <Link
          href="/services"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-gray-600
            active:bg-gray-100
          "
        >
          <BriefcaseBusiness className="h-5 w-5" />
          <span className="text-[10px] font-medium">
            Services
          </span>
        </Link>

        {/* FLEET */}
        <Link
          href="/fleet"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-gray-600
            active:bg-gray-100
          "
        >
          <CarFront className="h-5 w-5" />
          <span className="text-[10px] font-medium">
            Fleet
          </span>
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
            text-gray-600
            active:bg-gray-100
          "
        >
          <IndianRupee className="h-5 w-5" />
          <span className="text-[10px] font-medium">
            Pricing
          </span>
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
            text-gray-600
            active:bg-gray-100
          "
        >
          <MapPin className="h-5 w-5" />
          <span className="text-[10px] font-medium">
            Destinations
          </span>
        </Link>

        {/* OFFERS */}
        <Link
          href="/offers"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
            text-gray-600
            active:bg-gray-100
          "
        >
          <Tag className="h-5 w-5" />
          <span className="text-[10px] font-medium">
            Offers
          </span>
        </Link>

      </div>
    </nav>
  );
}
