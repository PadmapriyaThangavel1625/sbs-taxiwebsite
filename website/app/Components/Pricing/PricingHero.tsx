import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  CreditCard,
  Route,
} from "lucide-react";
import Image from "next/image";

export default function PricingHero() {
  return (
    <section className="relative min-h-[420px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/car4.png"
          alt="SBS Taxi Pricing"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
            Simple &{" "}
            <span className="text-blue-600">
              Transparent Pricing
            </span>
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            No hidden charges. No surprises. Just honest pricing for a
            comfortable and safe journey.
          </p>
        </div>

        {/* Perks Bar */}
        <div className="mt-8 inline-flex rounded-xl bg-white/95 border border-gray-200 shadow-lg overflow-hidden">
          {/* Item 1 */}
          <div className="flex items-center gap-2 px-5 py-3">
            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-medium text-gray-900">
                Transparent
              </p>
              <p className="text-sm font-medium text-gray-900">
                Pricing
              </p>
            </div>
          </div>

          <div className="w-px bg-gray-200 my-3"></div>

          {/* Item 2 */}
          <div className="flex items-center gap-2 px-5 py-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-medium text-gray-900">
                No Hidden
              </p>
              <p className="text-sm font-medium text-gray-900">
                Charges
              </p>
            </div>
          </div>

          <div className="w-px bg-gray-200 my-3"></div>

          {/* Item 3 */}
          <div className="flex items-center gap-2 px-5 py-3">
            <Clock className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-medium text-gray-900">
                No Waiting
              </p>
              <p className="text-sm font-medium text-gray-900">
                Charges
              </p>
            </div>
          </div>

          <div className="w-px bg-gray-200 my-3"></div>

          {/* Item 4 */}
          <div className="flex items-center gap-2 px-5 py-3">
            <CreditCard className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-medium text-gray-900">
                No Extra Charge
              </p>
              <p className="text-sm font-medium text-gray-900">
                For Online Payments
              </p>
            </div>
          </div>

          <div className="w-px bg-gray-200 my-3"></div>

          {/* Item 5 */}
          <div className="flex items-center gap-2 px-5 py-3">
            <Route className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="leading-tight">
              <p className="text-sm font-medium text-gray-900">
                Toll Free For
              </p>
              <p className="text-sm font-medium text-gray-900">
                First 200 KM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}