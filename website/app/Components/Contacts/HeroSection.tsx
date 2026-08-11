
export default function HeroSection() {
  return (
    <section
      className="
        w-full
        bg-white
        font-[family-name:var(--font-jakarta)]
      "
    >
      {/* Full Banner Image */}
      <div className="w-full">
        <img
          src="/home_banner.webp"
          alt="Contact Us Banner"
          className="
            block
            w-full
            h-auto
            object-contain
          "
        />
      </div>

      {/* Contact Content Below Banner */}
      <div className="px-4 py-8 text-center sm:py-10 md:py-12">
        {/* Small Heading */}
        <p
          className="
            text-sm
            sm:text-base
            font-semibold
            uppercase
            tracking-wide
            text-[var(--primary)]
          "
        >
          Contact Us
        </p>

        {/* Main Heading */}
        <h2
          className="
            mt-2
            font-[family-name:var(--font-instrument)]
            text-3xl
            md:text-4xl
            font-normal
            text-[var(--primary-dark)]
          "
        >
          We're Here to Help You!
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-base
            leading-relaxed
            text-[var(--muted)]
          "
        >
          Have questions, feedback, or need support? Get in touch with us.
          Our team is available 24/7 to assist you.
        </p>
      </div>
    </section>
  );
}
