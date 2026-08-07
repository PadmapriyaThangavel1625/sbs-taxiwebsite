import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  CreditCard,
  Route,
} from "lucide-react";

export default function OffersHero() {
  return (
    <section className="relative overflow-hidden min-h-[500px] flex items-center">
      {/* Background Image */}
      <Image
        src="/images/car6.png" // Replace with your image name
        alt="Offers Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">
        <div className="max-w-[600px]">
          <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
            BEST FARES GUARANTEED
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Best Offers for You!
          </h1>

          <h2 className="text-xl font-medium text-yellow-300 mb-4">
            More Savings. More Rides. More Happy Journeys.
          </h2>

          <p className="text-base text-gray-200 mb-8 leading-relaxed">
            Enjoy exciting discounts and exclusive benefits on every ride with
            SBS Taxi.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-white/10 backdrop-blur-md p-5 border border-white/20">
            <div className="flex items-center gap-3">
              <ShieldCheck
                className="bg-white text-yellow-500 rounded-lg p-2 shrink-0"
                size={40}
              />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  No Hidden Charges
                </h4>
                <p className="text-xs text-gray-200">
                  100% Transparent
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock
                className="bg-white text-yellow-500 rounded-lg p-2 shrink-0"
                size={40}
              />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  No Waiting Charges
                </h4>
                <p className="text-xs text-gray-200">
                  Ride on time, every time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard
                className="bg-white text-yellow-500 rounded-lg p-2 shrink-0"
                size={40}
              />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  No Extra Charges
                </h4>
                <p className="text-xs text-gray-200">
                  For Online Payments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Route
                className="bg-white text-yellow-500 rounded-lg p-2 shrink-0"
                size={40}
              />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Toll Free
                </h4>
                <p className="text-xs text-gray-200">
                  First 200 KM on outstation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}