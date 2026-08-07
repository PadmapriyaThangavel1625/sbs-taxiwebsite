import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">


        <div>
          <Logo />

          <p className="max-w-[280px] text-sm leading-6 text-gray-300 mt-4">
            Safe, reliable and affordable taxi services
            available 24/7.
          </p>
        </div>


        <div>
          <h3 className="mb-4 font-bold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/fleet">Fleet</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
        </div>


        <div>
          <h3 className="mb-4 font-bold">
            Services
          </h3>

          <div className="flex flex-col gap-2 text-sm text-gray-300">

            <Link href="/services">
              Local Taxi
            </Link>

            <Link href="/services">
              Airport Transfer
            </Link>

            <Link href="/services">
              Outstation Taxi
            </Link>

            <Link href="/services">
              Corporate Travel
            </Link>

          </div>
        </div>


        <div>
          <h3 className="mb-4 font-bold">
            Contact Us
          </h3>

          <div className="space-y-2 text-sm text-gray-300">
            <p>📞 +91 99999 99999</p>
            <p>✉ support@sbstaxi.com</p>
            <p>📍 Tamil Nadu, India</p>
          </div>

        </div>


      </div>


      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">

        © {new Date().getFullYear()} SBS TAXI. All Rights Reserved.

      </div>


    </footer>
  );
}