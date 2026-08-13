export default function HeroSection() {
  return (
    <section
      className="
        w-full
        bg-[var(--primary)]
        px-4
        py-16
        text-white
        font-[family-name:var(--font-jakarta)]
        sm:py-20
        md:py-24
      "
    >
      <div className="mx-auto max-w-6xl text-left">
        {/* Small Heading */}
        <p
          className="
            !text-4xl
            sm:text-base
            font-semibold
            uppercase
            tracking-wider
            text-[var(--secondary)]
          "
        >
          Contact Us
        </p>

        {/* Main Heading */}
        <h1
          className="
            !mt-4
            font-[family-name:var(--font-instrument)]
            text-4xl
            !text-white
            font-normal
            sm:text-5xl
            md:text-6xl
          "
        >
          We&apos;re Here to Help You!
        </h1>

        {/* Description */}
        <p
          className="
            mt-5
            max-w-2xl
            text-base
            leading-relaxed
            text-slate-200
            sm:text-lg
          "
        >
          Have questions, feedback, or need support with your rides? Get in touch with us. 
          Our support team is available 24/7 to assist you with inquiries, corporate bookings, and general assistance.
        </p>


      </div>
    </section>
  );
}