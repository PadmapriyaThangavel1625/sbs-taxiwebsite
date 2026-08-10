
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function BottomCTA() {
  return (
    <section className="bg-[#0d1b2a] py-5 text-white">
      <div
        className="
          container-custom
          flex
          flex-col
          items-center
          justify-between
          gap-4
          md:flex-row
        "
      >
        {/* Content */}
        <div className="text-center md:text-left">
          <h3
            className="
              mb-1
              text-base
              font-semibold
              sm:text-lg
            "
          >
            Ready to Save More?
          </h3>

          <p className="text-xs text-gray-400 sm:text-sm">
            Book your ride now and enjoy the best offers!
          </p>
        </div>

        {/* Buttons */}
        <div
          className="
            flex
            w-full
            flex-col
            gap-3
            sm:w-auto
            sm:flex-row
            sm:flex-wrap
            sm:justify-center
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
              gap-2.5
              rounded-full
              bg-white
              px-5
              py-2.5
              text-xs
              font-semibold
              text-[#0d1b2a]
              transition
              hover:bg-gray-100
              sm:w-auto
              sm:text-sm
            "
          >
            <Phone size={16} />
            81440 65688
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918144065688"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-full
              bg-[#25d366]
              px-5
              py-2.5
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-[#20ba5a]
              sm:w-auto
              sm:text-sm
            "
          >
            <FaWhatsapp size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
