
import { ArrowRight } from "lucide-react";

interface OfferCardProps {
  tag: string;
  title: string;
  description: string;
  code?: string;
  customBody?: string;
  headerBg?: string;
  bgGradient?: string;
  textColor: string;
  tagBg: string;
  actionText: string;
  isEnquire?: boolean;
  illustrationType: string;
}

export default function OfferCard({
  tag,
  title,
  description,
  code,
  customBody,
  headerBg,
  bgGradient,
  textColor,
  tagBg,
  actionText,
  isEnquire,
  illustrationType,
}: OfferCardProps) {
  const backgroundStyle = bgGradient || headerBg || "bg-primary";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Top Banner */}
      <div
        className={`
          ${backgroundStyle}
          ${textColor}
          relative
          flex
          min-h-[175px]
          flex-col
          justify-between
          overflow-hidden
          p-5
          sm:min-h-[185px]
        `}
      >
        <div>
          {/* Tag */}
          <span
            className={`
              ${tagBg}
              mb-3
              inline-block
              rounded-md
              px-2.5
              py-1
              text-[9px]
              font-extrabold
              uppercase
              tracking-wider
              shadow-sm
            `}
          >
            {tag}
          </span>

          {/* Title */}
          <h3
            className="
              mb-1
              text-3xl
              font-extrabold
              tracking-tight
              font-[var(--font-jakarta)]
            "
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="
              max-w-[75%]
              whitespace-pre-line
              text-xs
              font-medium
              leading-relaxed
              opacity-90
              font-[var(--font-jakarta)]
            "
          >
            {description}
          </p>
        </div>

        {/* Illustration */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-3
            right-3
            opacity-90
          "
        >
          {/* Gift */}
          {illustrationType === "gift" && (
            <div
              className="
                relative
                flex
                h-20
                w-16
                rotate-3
                items-center
                justify-center
                rounded-lg
                border
                border-blue-400
                bg-blue-600
                shadow-xl
              "
            >
              <div className="absolute top-0 h-full w-4 bg-secondary" />
              <div className="absolute h-4 w-full bg-secondary" />

              <div
                className="
                  absolute
                  -top-3
                  h-4
                  w-6
                  rounded-full
                  border-2
                  border-secondary
                "
              />
            </div>
          )}

          {/* Coupon */}
          {illustrationType === "coupon" && (
            <div
              className="
                flex
                h-16
                w-16
                rotate-12
                items-center
                justify-center
                rounded-xl
                border-2
                border-white
                bg-blue-600
                text-xl
                font-bold
                text-white
                shadow-lg
              "
            >
              %
            </div>
          )}

          {/* Luggage */}
          {illustrationType === "luggage" && (
            <div className="flex items-end gap-1">
              <div className="h-4 w-5 rounded-t-full bg-secondary" />

              <div
                className="
                  relative
                  h-12
                  w-10
                  rounded-lg
                  border
                  border-blue-400
                  bg-blue-600
                  shadow-md
                "
              >
                <div className="absolute top-2 h-1 w-full bg-blue-800" />
              </div>
            </div>
          )}

          {/* Briefcase */}
          {illustrationType === "briefcase" && (
            <div className="flex items-end gap-1">
              <div
                className="
                  relative
                  flex
                  h-8
                  w-10
                  flex-col
                  items-center
                  justify-center
                  rounded-md
                  bg-blue-900
                  shadow-md
                "
              >
                <div
                  className="
                    absolute
                    -top-2
                    h-2
                    w-4
                    rounded-t-full
                    border-2
                    border-blue-900
                  "
                />

                <div
                  className="
                    flex
                    h-3
                    w-3
                    items-center
                    justify-center
                    rounded-full
                    bg-secondary
                    text-[8px]
                    font-bold
                    text-black
                  "
                >
                  ID
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Promo Code / Body */}
      <div className="flex min-h-[62px] items-center justify-between bg-white p-4 text-xs">
        {isEnquire ? (
          <p
            className="
              py-1
              text-[11px]
              font-medium
              leading-snug
              text-muted
              whitespace-pre-line
              font-[var(--font-jakarta)]
            "
          >
            {customBody}
          </p>
        ) : (
          <div className="flex w-full items-center gap-2">
            <span className="text-[11px] font-medium text-muted font-[var(--font-jakarta)]">
              Use Code
            </span>

            <span
              className="
                rounded-md
                border
                border-dashed
                border-primary
                bg-primary-light
                px-3
                py-1
                text-xs
                font-bold
                tracking-wider
                text-primary
                font-[var(--font-jakarta)]
              "
            >
              {code}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="
          border-t
          border-gray-100
          bg-white
          p-3
          text-center
        "
      >
        <a
          href="#"
          className="
            flex
            items-center
            justify-center
            gap-1.5
            text-xs
            font-bold
            text-primary
            transition-all
            hover:gap-2.5
            font-[var(--font-jakarta)]
          "
        >
          {actionText}
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
