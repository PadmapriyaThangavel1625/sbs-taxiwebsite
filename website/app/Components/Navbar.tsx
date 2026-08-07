// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import Logo from "@/app/Components/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Fleet", href: "/fleet" },
  { name: "Pricing", href: "/pricing" },
  { name: "Destinations", href: "/destinations" },
  { name: "Offers", href: "/offers" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contacts" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // 2. Get current active route

  return (
    <header className="relative bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-[90px] items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href; // 3. Check if link matches current page

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-[15px] font-medium transition group ${
                  isActive
                    ? "text-[#0753b8]"
                    : "text-gray-700 hover:text-[#0753b8]"
                }`}
              >
                {link.name}
                {/* 4. Blue underline indicator for active/hover state */}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#0753b8] transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} 
                />
              </Link>
            );
          })}

          <Link
            href="/booking"
            className="rounded-md bg-[#ffc107] px-5 py-3 text-[14px] font-bold text-black transition hover:bg-[#eeb200]"
          >
            Book a Ride
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-t bg-white shadow-lg lg:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-gray-100 py-3 text-sm font-medium ${
                    isActive ? "text-[#0753b8] font-bold" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-md bg-[#ffc107] px-5 py-3 text-center font-bold text-black"
            >
              Book a Ride
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}