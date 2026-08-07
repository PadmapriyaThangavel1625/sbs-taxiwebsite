import { Users, Car, MapPin, Award } from "lucide-react";

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
    <div className="h-full bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
      {/* Heading */}
      <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
        SBS Taxi in Numbers
      </h3>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1 content-center py-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <div
              key={idx}
              className="flex flex-col justify-center space-y-3"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>

              {/* Number */}
              <h4 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {stat.value}
              </h4>

              {/* Label */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}