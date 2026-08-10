

export default function HeroSection() {
  return (
    <div className="max-w-2xl">
      <h1
        className="
          text-4xl md:text-5xl
          font-bold
          text-[var(--text)]
          tracking-tight
        "
      >
        Contact Us
      </h1>

      <h2
        className="
          text-2xl md:text-3xl
          font-semibold
          text-[var(--primary-dark)]
          mt-2
        "
      >
        We're Here to Help You!
      </h2>

      <p
        className="
          text-[var(--text-light)]
          mt-4
          text-base
          leading-relaxed
        "
      >
        Have questions, feedback, or need support? Get in touch with us.
        Our team is available 24/7 to assist you.
      </p>
    </div>
  );
}
