
import { Headphones, Phone } from "lucide-react";

export default function HelpBanner() {
  return (
    <div
      className="
        container-custom
        mt-5
        flex
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
      "
    >
      {/* Left Content */}
      <div className="flex w-full items-center gap-4 md:w-auto">
        <Headphones
          size={42}
          className="shrink-0"
        />

        <div>
          <h3 className="text-lg font-bold sm:text-xl">
            Need Help Choosing the Right Service?
          </h3>

          <p className="mt-1 text-sm text-white/90 sm:text-base">
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
          gap-3
          sm:flex-row
          md:w-auto
          md:shrink-0
        "
      >
        {/* Phone */}
        <a
          href="tel:8144065688"
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-white
            px-6
            py-3
            font-bold
            text-primary
            transition
            hover:bg-primary-light
            sm:w-auto
            sm:px-8
          "
        >
          <Phone size={19} />
          81440 65688
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918144065688"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full
            rounded-lg
            bg-white
            px-6
            py-3
            text-center
            font-bold
            text-green-600
            transition
            hover:bg-gray-100
            sm:w-auto
            sm:px-8
          "
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
