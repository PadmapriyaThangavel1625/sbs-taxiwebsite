
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function AppDownload() {
  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <div
        className="
          container-custom
          flex
          flex-col
          items-center
          justify-between
          gap-6
          rounded-xl
          bg-white
          p-5
          shadow-sm
          sm:p-6
          md:flex-row
          md:p-8
        "
      >
        {/* Content */}
        <div className="text-center md:text-left">
          <h3
            className="
              mb-2
              text-xl
              font-bold
              text-heading
              sm:text-2xl
            "
          >
            More Offers in Our App!
          </h3>

          <p
            className="
              max-w-xl
              text-xs
              leading-5
              text-muted
              sm:text-sm
              sm:leading-6
            "
          >
            Download the SBS Taxi app and unlock app-exclusive
            deals and a seamless booking experience.
          </p>
        </div>

        {/* App Buttons */}
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
          {/* Google Play */}
          <button
            type="button"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-lg
              bg-black
              px-5
              py-2.5
              text-white
              transition-opacity
              hover:opacity-90
              sm:w-auto
            "
          >
            <FaGooglePlay size={24} />

            <div className="text-left text-[10px] leading-tight">
              GET IT ON
              <br />
              <span className="text-sm font-bold">
                Google Play
              </span>
            </div>
          </button>

          {/* App Store */}
          <button
            type="button"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-lg
              bg-black
              px-5
              py-2.5
              text-white
              transition-opacity
              hover:opacity-90
              sm:w-auto
            "
          >
            <FaApple size={24} />

            <div className="text-left text-[10px] leading-tight">
              Download on the
              <br />
              <span className="text-sm font-bold">
                App Store
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
