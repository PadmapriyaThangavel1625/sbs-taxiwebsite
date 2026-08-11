
"use client";

export default function MapSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7823.696348157736!2d77.7118981!3d11.345798100000001!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f30096ba631%3A0x3bbc4afcb415c5e0!2sSBS%20TECHNOLOGIES!5e0!3m2!1sen!2sin!4v1786340963957!5m2!1sen!2sin"
          className="block h-[300px] w-full sm:h-[380px] md:h-[450px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="SBS Technologies Location"
        />
      </div>
    </section>
  );
}
