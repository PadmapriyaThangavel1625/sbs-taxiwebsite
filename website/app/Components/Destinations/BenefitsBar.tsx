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
    <section className="w-full px-3 !mb-7 sm:px-4">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          overflow-hidden
          rounded-xl
          border
          border-[var(--border)]
          bg-white
          font-[family-name:var(--font-jakarta)]
          shadow-sm
        "
      >
        <div
          className="
            grid
            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-5
          "
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`
                flex
                min-w-0
                items-center
                gap-3
                px-4
                py-4

                sm:px-5
                sm:py-5

                lg:justify-center
                lg:px-3
                lg:py-5

                ${
                  index !== items.length - 1
                    ? `
                      border-b
                      border-[var(--border)]

                      lg:border-b-0
                      lg:border-r
                    `
                    : ""
                }
              `}
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary-light)]
                  text-[var(--secondary)]
                "
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3
                  className="
                    text-sm
                    font-semibold
                    leading-5
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
      </div>
    </section>
  );
}