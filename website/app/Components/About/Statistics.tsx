
import {
  Users,
  Car,
  MapPin,
  Award,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Happy Customers and counting",
  },
  {
    icon: Car,
    value: "1,500+",
    label: "Cars on Road well maintained fleet",
  },
  {
    icon: MapPin,
    value: "100+",
    label: "Cities Covered across India",
  },
  {
    icon: Award,
    value: "8+",
    label: "Years of Service trusted since 2016",
  },
];

export default function Statistics() {
  return (
    <section className="w-full py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            SBS Taxi in Numbers
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Trusted by thousands of customers with a growing fleet
            and expanding service coverage across India.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className="flex min-w-0 flex-col items-center rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6 lg:p-7"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#1A365D] sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                {/* Number */}
                <h4 className="mt-4 text-2xl font-extrabold text-slate-900 sm:mt-5 sm:text-3xl lg:text-4xl">
                  {stat.value}
                </h4>

                {/* Label */}
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
