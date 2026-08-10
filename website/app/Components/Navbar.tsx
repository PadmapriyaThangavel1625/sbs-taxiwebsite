
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <header className="relative z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative py-2 text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-[#0753b8]"
                    : "text-gray-700 hover:text-[#0753b8]"
                }`}
              >
                {link.name}

                {/* Active / Hover Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#0753b8] transition-transform duration-200 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          {/* Book a Ride */}
          <Link
            href="/booking"
            className="rounded-md bg-[#ffc107] px-5 py-3 text-[14px] font-bold text-black transition-colors hover:bg-[#eeb200]"
          >
            Book a Ride
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#0753b8] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">

            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-gray-100 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "font-bold text-[#0753b8]"
                      : "text-gray-700 hover:text-[#0753b8]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Book Button */}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-md bg-[#ffc107] px-5 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-[#eeb200]"
            >
              Book a Ride
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
