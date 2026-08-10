
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company */}
          <div>
            <Logo />

            <p className="max-w-[280px] text-sm leading-6 text-slate-300 mt-4">
              Safe, reliable and affordable taxi services available 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <Link
                href="/"
                className="hover:text-[#FFC107] transition-colors"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="hover:text-[#FFC107] transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/services"
                className="hover:text-[#FFC107] transition-colors"
              >
                Services
              </Link>

              <Link
                href="/fleet"
                className="hover:text-[#FFC107] transition-colors"
              >
                Fleet
              </Link>

              <Link
                href="/pricing"
                className="hover:text-[#FFC107] transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-bold text-white">
              Services
            </h3>

            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <Link
                href="/services"
                className="hover:text-[#FFC107] transition-colors"
              >
                Local Taxi
              </Link>

              <Link
                href="/services"
                className="hover:text-[#FFC107] transition-colors"
              >
                Airport Transfer
              </Link>

              <Link
                href="/services"
                className="hover:text-[#FFC107] transition-colors"
              >
                Outstation Taxi
              </Link>

              <Link
                href="/services"
                className="hover:text-[#FFC107] transition-colors"
              >
                Corporate Travel
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-bold text-white">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm text-slate-300">

              {/* General / Payments */}
              <div>
                <p className="font-semibold text-white">
                  General / Payments
                </p>

                <a
                  href="tel:+918144065688"
                  className="block hover:text-[#FFC107] transition-colors"
                >
                  📞 +91 81440 65688
                </a>

                <a
                  href="https://wa.me/918144065688"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFC107] transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              {/* Business / Projects */}
              <div>
                <p className="font-semibold text-white">
                  Business / Projects
                </p>

                <a
                  href="tel:+919698529560"
                  className="block hover:text-[#FFC107] transition-colors"
                >
                  📞 +91 96985 29560
                </a>

                <a
                  href="https://wa.me/919698529560"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFC107] transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              {/* Landline */}
              <div>
                <p className="font-semibold text-white">
                  Landline
                </p>

                <a
                  href="tel:04243553661"
                  className="hover:text-[#FFC107] transition-colors"
                >
                  ☎ 0424 3553661
                </a>
              </div>

              {/* Office Address */}
              <div>
                <p className="font-semibold text-white">
                  Office Location
                </p>

                <p className="leading-6">
                  📍 1/166, Vallalar Street,
                  <br />
                  Municipal Colony Road,
                  <br />
                  Erode, Tamil Nadu - 638004
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-400">

          {/* Made in India */}
          <div className="flex items-center gap-2">
            <span>Made in India</span>

            <Image
              src="/flag.jpg"
              alt="Indian Flag"
              width={24}
              height={16}
              className="object-cover"
            />
          </div>
          <br />
          

          {/* Powered by SBS Technologies */}
          <a
            href="https://sbstechnologies.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-[#FFC107] transition-colors"
          >
            Powered by SBS Technologies
          </a>

        </div>
      </div>

    </footer>
  );
}
