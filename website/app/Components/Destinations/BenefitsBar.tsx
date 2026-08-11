
import {
  ShieldCheck,
  UserRound,
  Clock3,
  CreditCard,
  Route,
} from "lucide-react";

const items = [
  {
    title: "No Hidden Charges",
    desc: "100% Transparent Billing",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "No Driver Bata",
    desc: "What you see is what you pay",
    icon: <UserRound className="h-5 w-5" />,
  },
  {
    title: "No Waiting Charges",
    desc: "Ride on time, every time",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Online Payment",
    desc: "No extra charge for online payments",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Toll Free",
    desc: "First 200 KM on outstation trips",
    icon: <Route className="h-5 w-5" />,
  },
];

export default function BenefitsBar() {
  return (
    <div
      className="
        mx-auto
        max-w-7xl
        px-4 sm:px-6
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-5
        border
        border-[var(--border)]
        rounded-xl
        p-5
        bg-white
        font-[family-name:var(--font-jakarta)]
      "
    >
      {items.map((item, index) => (
        <div
          key={item.title}
          className={`
            flex
            gap-3
            items-center
            justify-center
            p-3
            ${
              index !== items.length - 1
                ? "md:border-r border-[var(--border)]"
                : ""
            }
          `}
        >
          {/* Icon */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-center
              text-[var(--primary)]
              bg-[var(--primary-light)]
              p-3
              rounded-full
            "
          >
            {item.icon}
          </div>

          {/* Content */}
          <div>
            <h3
              className="
                font-semibold
                text-sm
                text-[var(--primary-dark)]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-0.5
                text-xs
                leading-5
                text-[var(--muted)]
              "
            >
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
