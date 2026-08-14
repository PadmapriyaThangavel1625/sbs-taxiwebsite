import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function AppDownload() {
  return (
    <section className="w-full py-5 sm:py-7 lg:py-9">
      {/* =====================================================
          SAME WIDTH STRUCTURE
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          items-center
          justify-between
          gap-5
          rounded-xl
          bg-white
          px-4
          py-4
          shadow-sm

          sm:px-6
          sm:py-5
          sm:gap-6

          md:flex-row
          md:py-7

          lg:px-8
          lg:py-8
        "
      >
        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            w-full
            text-center

            md:w-auto
            md:text-left
          "
        >
          <h3
            className="
              mb-1.5
              text-[18px]
              font-bold
              leading-6
              text-heading

              sm:text-xl

              lg:text-2xl
            "
          >
            More Offers in Our App!
          </h3>

          <p
            className="
              max-w-xl
              text-[11px]
              leading-5
              text-muted

              sm:text-xs
              sm:leading-5

              lg:text-sm
              lg:leading-6
            "
          >
            Download the SBS Taxi app and unlock app-exclusive
            deals and a seamless booking experience.
          </p>
        </div>

        {/* ===================================================
            APP BUTTONS
        ==================================================== */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-2.5

            sm:w-auto
            sm:flex-row
            sm:flex-wrap
            sm:justify-center
            sm:gap-3
          "
        >
          {/* =================================================
              GOOGLE PLAY
          ================================================== */}

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-lg
              bg-black
              px-4
              py-2
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:opacity-90

              sm:w-auto
              sm:px-4
              sm:py-2.5
            "
          >
            <FaGooglePlay
              size={21}
              className="
                shrink-0

                sm:h-[23px]
                sm:w-[23px]
              "
            />

            <div
              className="
                text-left
                text-[9px]
                leading-[13px]
              "
            >
              GET IT ON
              <br />

              <span
                className="
                  text-[13px]
                  font-bold
                  leading-4
                "
              >
                Google Play
              </span>
            </div>
          </button>

          {/* =================================================
              APP STORE
          ================================================== */}

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-lg
              bg-black
              px-4
              py-2
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:opacity-90

              sm:w-auto
              sm:px-4
              sm:py-2.5
            "
          >
            <FaApple
              size={22}
              className="
                shrink-0

                sm:h-[24px]
                sm:w-[24px]
              "
            />

            <div
              className="
                text-left
                text-[9px]
                leading-[13px]
              "
            >
              Download on the
              <br />

              <span
                className="
                  text-[13px]
                  font-bold
                  leading-4
                "
              >
                App Store
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}