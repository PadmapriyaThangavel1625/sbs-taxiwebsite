import React from "react";

export default function MapSection() {
  return (
    <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Find Us Here
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            SBS Technologies, Municipal Colony, Erode, Tamil Nadu
          </p>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        

        {/* Map Container */}
        <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
          <div className="relative w-full h-[450px]">
            <iframe
              title="SBS Technologies Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7823.696348157736!2d77.7118981!3d11.345798100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f30096ba631%3A0x3bbc4afcb415c5e0!2sSBS%20TECHNOLOGIES!5e0!3m2!1sen!2sin!4v1786340963957!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Optional Footer Details inside Card */}
          <div className="p-6 bg-white dark:bg-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                SBS Technologies
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                1/166, Vallalar St, Municipal Colony, Main Road, Erode, Tamil Nadu 638004
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/3bbc4afcb415c5e0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}