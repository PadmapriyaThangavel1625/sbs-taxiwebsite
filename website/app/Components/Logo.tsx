import Image from "next/image";

type LogoProps = {
  variant?: "navbar" | "footer";
};

export default function Logo({ variant = "navbar" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">

      {/* Brand Name */}
      <div className="flex min-w-0 flex-col justify-center leading-none">

        {/* SBS Taxi */}
        <span
          className={`
            whitespace-nowrap
            font-extrabold
            tracking-tight
            ${
              isFooter
                ? "text-lg text-white sm:text-xl md:text-2xl"
                : "text-xl sm:text-2xl md:text-[27px] lg:text-[30px]"
            }
          `}
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {isFooter ? (
            <>
              <span className="text-[var(--secondary)] text-md">SBS</span>{" "}
              <span className="text-[var(--secondary)] text-md">Taxi</span>
            </>
          ) : (
            <>
              <span className="text-[var(--primary)]">SBS</span>{" "}
              <span className="text-[var(--secondary)]">Taxi</span>
            </>
          )}
        </span>

        {/* Tagline */}
        <span
          className={`
            mt-1
            whitespace-nowrap
            font-medium
            !font-bold
            tracking-[0.14em]
            ${
              isFooter
                ? "text-[8px] !text-white sm:text-[9px]"
                : "text-[8px] !text-white-600 sm:text-[9px] md:text-[10px]"
            }
          `}
        >
          SAFE • RELIABLE • FAST
        </span>

      </div>
    </div>
  );
}