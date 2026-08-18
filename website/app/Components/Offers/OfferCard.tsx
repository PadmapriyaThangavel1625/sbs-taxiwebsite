"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Gift,
  Luggage,
  Percent,
} from "lucide-react";

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

  onBookNow?: () => void;
  onEnquire?: () => void;
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
  onBookNow,
  onEnquire,
}: OfferCardProps) {
  const backgroundStyle =
    bgGradient ||
    headerBg ||
    "bg-[#041e43]";

  const handleAction = () => {
    if (isEnquire) {
      onEnquire?.();
    } else {
      onBookNow?.();
    }
  };

  return (
    <article
      className="
        group

        relative

        flex
        h-full
        min-h-[390px]

        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-slate-200/80

        bg-white

        shadow-[0_8px_30px_rgba(4,30,67,0.06)]

        transition-all
        duration-300

        hover:-translate-y-1.5

        hover:border-[#041e43]/10

        hover:shadow-[0_20px_45px_rgba(4,30,67,0.13)]
      "
    >
      {/* =====================================================
          OFFER HEADER
      ====================================================== */}

      <div
        className={`
          ${backgroundStyle}
          ${textColor}

          relative

          flex

          min-h-[215px]

          flex-col

          justify-between

          overflow-hidden

          p-5

          sm:p-6
        `}
      >
        {/* Decorative circles */}

        <div
          className="
            pointer-events-none
            absolute
            -right-12
            -top-12

            h-32
            w-32

            rounded-full

            border
            border-white/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-16
            -left-10

            h-32
            w-32

            rounded-full

            border
            border-white/10
          "
        />

        {/* Content */}

        <div className="relative z-10">
          <span
            className={`
              ${tagBg}

              inline-flex

              rounded-full

              px-3
              py-1.5

              font-[var(--font-jakarta)]

              text-[9px]

              font-extrabold

              uppercase

              tracking-[0.12em]

              shadow-sm
            `}
          >
            {tag}
          </span>

          <h3
            className="
              mt-5

              font-[var(--font-jakarta)]

              text-[34px]

              font-extrabold

              leading-none

              tracking-[-0.04em]

              sm:text-[38px]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-3

              max-w-[68%]

              font-[var(--font-jakarta)]

              text-xs

              font-medium

              leading-5

              opacity-80
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

            bottom-4
            right-5

            z-10

            transition-transform
            duration-500

            group-hover:scale-110
            group-hover:-rotate-2
          "
        >
          {illustrationType === "gift" && (
            <Gift
              size={72}
              strokeWidth={1.5}
              className="
                text-[#FFD23F]
                drop-shadow-lg
              "
            />
          )}

          {illustrationType === "coupon" && (
            <div
              className="
                flex
                h-20
                w-20

                rotate-6

                items-center
                justify-center

                rounded-2xl

                bg-[#041e43]

                shadow-xl
              "
            >
              <Percent
                size={34}
                strokeWidth={2.5}
                className="text-[#FFD23F]"
              />
            </div>
          )}

          {illustrationType === "luggage" && (
            <Luggage
              size={76}
              strokeWidth={1.5}
              className="text-[#041e43]"
            />
          )}

          {illustrationType === "briefcase" && (
            <BriefcaseBusiness
              size={76}
              strokeWidth={1.5}
              className="text-[#21613f]"
            />
          )}
        </div>
      </div>

      {/* =====================================================
          PROMO BODY
      ====================================================== */}

      <div
        className="
          flex
          min-h-[90px]
          flex-1
          items-center

          border-b
          border-slate-100

          bg-white

          px-5
          py-4

          sm:px-6
        "
      >
        {isEnquire ? (
          <div>
            <div
              className="
                mb-2

                font-[var(--font-jakarta)]

                text-[10px]

                font-bold

                uppercase

                tracking-[0.12em]

                text-[#21613f]
              "
            >
              Corporate Benefits
            </div>

            <p
              className="
                whitespace-pre-line

                font-[var(--font-jakarta)]

                text-xs

                font-medium

                leading-5

                text-slate-500
              "
            >
              {customBody}
            </p>
          </div>
        ) : (
          <div className="w-full">
            <div
              className="
                mb-2

                font-[var(--font-jakarta)]

                text-[10px]

                font-bold

                uppercase

                tracking-[0.12em]

                text-slate-400
              "
            >
              Promo Code
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <span
                className="
                  font-[var(--font-jakarta)]

                  text-xs

                  font-medium

                  text-slate-500
                "
              >
                Use this code
              </span>

              <span
                className="
                  rounded-lg

                  border
                  border-dashed
                  border-[#041e43]/25

                  bg-[#041e43]/5

                  px-3
                  py-1.5

                  font-[var(--font-jakarta)]

                  text-[11px]

                  font-extrabold

                  tracking-[0.08em]

                  text-[#041e43]
                "
              >
                {code}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          ACTION
      ====================================================== */}

      <div className="bg-white p-4 sm:p-5">
        <button
          type="button"
          onClick={handleAction}
          className="
            group/button

            flex
            min-h-[46px]
            w-full

            items-center
            justify-center

            gap-2

            rounded-xl

            bg-[#041e43]

            px-4

            font-[var(--font-jakarta)]

            text-xs

            font-bold

            text-white

            shadow-sm

            transition-all
            duration-300

            hover:bg-[#062958]
            hover:shadow-md

            focus:outline-none
            focus:ring-2
            focus:ring-[#FFD23F]/50
          "
        >
          {actionText}

          <ArrowRight
            size={15}
            className="
              transition-transform
              duration-300

              group-hover/button:translate-x-1
            "
          />
        </button>
      </div>
    </article>
  );
}