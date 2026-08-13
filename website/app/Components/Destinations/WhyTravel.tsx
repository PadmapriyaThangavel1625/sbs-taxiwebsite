
import {
  ShieldCheck,
  IndianRupee,
  Clock3,
  Headphones,
  MessageCircle,
} from "lucide-react";

const data = [
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description:
      "Your safety is our top priority with verified drivers and well-maintained cars.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. 100% transparent billing.",
  },
  {
    icon: Clock3,
    title: "On-Time Every Time",
    description: "Punctual pickups and timely drop-offs guaranteed.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "We are always here to assist you anytime.",
  },
];

export default function WhyTravel() {
  return (
    <div className="rounded-2xl bg-blue-50 p-6 shadow-sm sm:p-7">
      {/* Heading */}
      <h2 className="mb-6 w-fit border-b-4 border-yellow-400 pb-1 text-xl font-bold text-gray-900 sm:text-2xl">
        Why Travel with SBS Taxi?
      </h2>

      {/* Benefits */}
      <div className="space-y-6">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--secondary)]">
                <Icon size={22} strokeWidth={2} />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp CTA */}
      <div className="mt-7 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--secondary)]">
            <MessageCircle size={21} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              Need help choosing a destination?
            </p>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-bold text-green-600 transition hover:text-green-700"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
