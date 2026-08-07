"use client";

import { CarFront, UserRound } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="h-[36px] bg-[#0753b8] text-white">
      <div className="mx-auto flex h-full w-[min(1320px,calc(100%-40px))] items-center justify-between text-[12px]">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <CarFront size={17} />
            <span>24/7 Taxi Service</span>
          </div>

          <span className="h-4 w-px bg-white/40" />

          <span className="hidden sm:block">
            One Brand. One Fare. One Trusted Service.
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          
          {/* Social Media */}
          <div className="hidden items-center gap-3 sm:flex">
            <span>Follow Us :</span>

            <a
              href="#"
              aria-label="Facebook"
              className="transition hover:text-[#ffc107]"
            >
              <FaFacebookF size={15} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="transition hover:text-[#ffc107]"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="transition hover:text-[#ffc107]"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>

          {/* Driver Login */}
          <a
            href="/drivers/login"
            className="flex items-center gap-1.5 rounded border border-white px-3 py-1 text-[12px] font-medium transition hover:bg-white hover:text-[#0753b8]"
          >
            <UserRound size={15} />
            Driver Login
          </a>
        </div>
      </div>
    </div>
  );
}