import { Headphones, Phone } from "lucide-react";

export default function HelpBanner() {
  return (
    <div
      className="
        mt-5
        flex
        w-full
        flex-col
        items-center
        justify-between
        gap-5
        rounded-xl
        bg-primary
        p-5
        text-white
        sm:p-6
        md:flex-row
        md:gap-6
        lg:p-7
      "
    >
      {/* Left Content */}
      <div
        className="
          flex
          w-full
          items-center
          gap-3
          sm:gap-4
          md:w-auto
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/10
            sm:h-12
            sm:w-12
          "
        >
          <Headphones
            size={28}
            className="sm:h-8 sm:w-8"
          />
        </div>

        <div>
          <h3
            className="
              text-base
              font-bold
              leading-tight
              sm:text-lg
              md:text-xl
            "
          >
            Need Help Choosing the Right Service?
          </h3>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-white/80
              sm:text-sm
            "
          >
            Our team is available 24/7 to assist you.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div
        className="
          flex
          w-full
          flex-col
          gap-2.5
          sm:flex-row
          sm:gap-3
          md:w-auto
          md:shrink-0
        "
      >
        <a
          href="tel:9843544844"
          className="
            flex
            min-h-[42px]
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-white
            px-5
            py-2.5
            text-xs
            font-bold
            text-primary
            transition
            hover:bg-primary-light
            sm:px-6
            sm:text-sm
            md:px-7
          "
        >
          <Phone size={18} />
          9843544844
        </a>

        <a
          href="https://wa.me/9843544844"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            min-h-[42px]
            items-center
            justify-center
            rounded-lg
            bg-white
            px-5
            py-2.5
            text-xs
            font-bold
            text-green-600
            transition
            hover:bg-green-50
            sm:px-6
            sm:text-sm
            md:px-7
          "
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}