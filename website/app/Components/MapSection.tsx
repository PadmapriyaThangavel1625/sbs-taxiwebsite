"use client";

export default function MapSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <iframe
          src="https://www.google.com/maps?q=SBS%20Taxi%2C%201%2F166%20Vallalar%20Street%2C%20Erode%2C%20Tamil%20Nadu%20638004&output=embed"
          className="block h-[300px] w-full sm:h-[380px] md:h-[450px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="SBS Taxi"
        />
      </div>
    </section>
  );
}