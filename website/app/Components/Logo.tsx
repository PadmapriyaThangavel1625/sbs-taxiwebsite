
import Image from "next/image";

type LogoProps = {
  variant?: "navbar" | "footer";
};

export default function Logo({ variant = "navbar" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
      {/* Circular Logo */}
      <div
        className={`
          relative
          shrink-0
          overflow-hidden
          rounded-full
          bg-white
          ${
            isFooter
              ? "h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
              : "h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[68px] lg:w-[68px]"
          }
        `}
      >
        <Image
          src="/logo.png"
          alt="SBS Taxi Logo"
          fill
          priority
          sizes={
            isFooter
              ? "(max-width: 640px) 44px, (max-width: 768px) 48px, 56px"
              : "(max-width: 640px) 44px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 68px"
          }
          className="rounded-full object-cover"
        />
      </div>

      {/* Brand Name */}
      <div className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={`
            whitespace-nowrap
            font-extrabold
            tracking-tight
            ${
              isFooter
                ? "text-lg sm:text-xl md:text-2xl text-white"
                : "text-xl sm:text-2xl md:text-[27px] lg:text-[30px]"
            }
          `}
          style={{ fontFamily: "var(--font-instrument)" }}
        >
          {isFooter ? (
            <span className="text-white">SBS Taxi</span>
          ) : (
            <>
              <span className="text-blue-600">SBS</span>{" "}
              <span className="text-yellow-400">Taxi</span>
            </>
          )}
        </span>

        <span
          className={`
            mt-1.5
            whitespace-nowrap
            font-medium
            tracking-[0.14em]
            ${
              isFooter
                ? "text-[8px] text-gray-300 sm:text-[9px]"
                : "text-[8px] text-gray-500 sm:text-[9px] md:text-[10px]"
            }
          `}
        >
          SAFE • RELIABLE • FAST
        </span>
      </div>
    </div>
  );
}
