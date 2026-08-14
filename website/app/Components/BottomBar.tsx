"use client";

import Link from "next/link";
import {
  Home,
  BriefcaseBusiness,
  CarFront,
  IndianRupee,
  MapPin,
  Tag,
} from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Services",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    name: "Fleet",
    href: "/fleet",
    icon: CarFront,
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: IndianRupee,
  },
  {
    name: "Destinations",
    href: "/destinations",
    icon: MapPin,
  },
  {
    name: "Offers",
    href: "/offers",
    icon: Tag,
  },
];

export default function BottomBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className="
        fixed
        inset-x-0
        bottom-0
        z-[9997]
        block
        border-t
        border-white/10
        bg-[var(--primary)]
        font-[var(--font-jakarta)]
        md:hidden
      "
    >
      <div
        className="
          grid
          h-16
          w-full
          grid-cols-6
          bg-[var(--primary)]
        "
      >
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`
                group
                relative
                flex
                flex-col
                items-center
                justify-center
                gap-1
                transition-colors
                duration-200
                ${
                  active
                    ? "text-[var(--secondary)]"
                    : "text-[var(--text-primary)] hover:text-[var(--secondary)]"
                }
              `}
            >
              {/* =================================================
                  ACTIVE TOP INDICATOR
              ================================================== */}

              <span
                className={`
                  absolute
                  -top-[1px]
                  left-1/2
                  h-[3px]
                  -translate-x-1/2
                  rounded-b-full
                  bg-[var(--secondary)]
                  transition-all
                  duration-300
                  ${
                    active
                      ? "w-12 opacity-100"
                      : "w-0 opacity-0"
                  }
                `}
              />

              {/* =================================================
                  ICON
              ================================================== */}

              <Icon
                className={`
                  h-5
                  w-5
                  transition-all
                  duration-200

                  sm:h-[21px]
                  sm:w-[21px]

                  ${
                    active
                      ? "scale-110 text-[var(--secondary)]"
                      : "text-[var(--text-primary)] group-hover:scale-110 group-hover:text-[var(--secondary)]"
                  }
                `}
                strokeWidth={active ? 2.2 : 1.9}
              />

              {/* =================================================
                  LABEL
              ================================================== */}

              <span
                className={`
                  text-[10px]
                  leading-none
                  transition-colors
                  duration-200

                  sm:text-[10px]

                  ${
                    active
                      ? "font-bold text-[var(--secondary)]"
                      : "font-medium text-[var(--text-primary)] group-hover:text-[var(--secondary)]"
                  }
                `}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}