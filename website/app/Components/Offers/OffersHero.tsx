import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  CreditCard,
  Route,
} from "lucide-react";

export default function OffersHero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/car6.png"
        alt="SBS Taxi Offers"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="container-custom relative z-10 flex min-h-[520px] items-center py-12">
        <div className="max-w-2xl text-white">
          {/* Badge */}
          <span className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-black">
            BEST FARES GUARANTEED
          </span>

          {/* Heading */}
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Best Offers for You!
          </h1>

          {/* Subtitle */}
          <h2 className="mt-3 text-lg font-medium text-secondary sm:text-xl">
            More Savings. More Rides. More Happy Journeys.
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-200 sm:text-base">
            Enjoy exciting discounts and exclusive benefits on every ride
            with SBS Taxi.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:grid-cols-2">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <ShieldCheck
                className="shrink-0 rounded-lg bg-white p-2 text-secondary"
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

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <Clock
                className="shrink-0 rounded-lg bg-white p-2 text-secondary"
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

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <CreditCard
                className="shrink-0 rounded-lg bg-white p-2 text-secondary"
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

            {/* Feature 4 */}
            <div className="flex items-center gap-3">
              <Route
                className="shrink-0 rounded-lg bg-white p-2 text-secondary"
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