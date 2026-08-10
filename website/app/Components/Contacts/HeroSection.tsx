export default function HeroSection() {
return ( <section className="w-full bg-white">
{/* Full Banner Image */} <div className="w-full"> <img
       src="/home_banner.webp"
       alt="Contact Us Banner"
       className="
         block
         w-full
         h-auto
         object-contain
       "
     /> </div>

  {/* Contact Content Below Banner */}
  <div className="px-4 py-8 text-center sm:py-10 md:py-12">
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

    <h2
      className="
        mt-2
        text-2xl
        md:text-3xl
        font-semibold
        text-[var(--primary-dark)]
      "
    >
      We're Here to Help You!
    </h2>

    <p
      className="
        mx-auto
        mt-4
        max-w-2xl
        text-base
        leading-relaxed
        text-[var(--text-light)]
      "
    >
      Have questions, feedback, or need support? Get in touch with us.
      Our team is available 24/7 to assist you.
    </p>
  </div>
</section>

);
}
