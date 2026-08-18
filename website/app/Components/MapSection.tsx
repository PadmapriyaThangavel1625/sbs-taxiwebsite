"use client";

import React from "react";
import { ExternalLink, MapPin } from "lucide-react";

export default function MapSection() {
  /* ============================================================
     GOOGLE MAPS
  ============================================================ */

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=SBS+TECHNOLOGIES,+1%2F166+Vallalar+Street,+Municipal+Colony+Road,+Erode,+Tamil+Nadu+638004";

  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7823.696348157736!2d77.7118981!3d11.345798100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f30096ba631%3A0x3bbc4afcb415c5e0!2sSBS%20TECHNOLOGIES!5e0!3m2!1sen!2sin!4v1786340963957!5m2!1sen!2sin";

  return (
    <section className="w-full">
      {/* ======================================================
          SECTION HEADER
      ======================================================= */}

     
       
      {/* ======================================================
          GOOGLE MAP STYLE CONTAINER
      ======================================================= */}

      <div
        className="
          w-full
          overflow-hidden
          rounded-[22px]
          border
          border-gray-200
          bg-white
          shadow-[0_8px_30px_rgba(15,23,42,0.12)]
        "
      >
        {/* ====================================================
            MAP
        ===================================================== */}

        <div
          className="
            relative
            h-[350px]
            w-full
            overflow-hidden
            sm:h-[420px]
            lg:h-[480px]
            xl:h-[520px]
          "
        >
          <iframe
            title="SBS Technologies Location Map"
            src={embedUrl}
            width="100%"
            height="100%"
            style={{
              border: 0,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="
              absolute
              inset-0
              h-full
              w-full
            "
          />
        </div>

        {/* ====================================================
            GOOGLE MAPS STYLE LOCATION CARD
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-gray-100
            bg-white
            px-5
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
            sm:py-5
            lg:px-7
          "
        >
          {/* ==================================================
              LOCATION
          =================================================== */}

          <div
            className="
              flex
              min-w-0
              items-start
              gap-3
            "
          >
            {/* LOCATION ICON */}

            <div
              className="
                mt-0.5
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]/8
                text-[var(--primary)]
              "
            >
              <MapPin className="h-5 w-5" />
            </div>

            {/* LOCATION TEXT */}

            <div className="min-w-0">
              <h3
                className="
                  text-base
                  font-bold
                  leading-6
                  text-gray-900
                  sm:text-lg
                "
              >
                SBS Technologies
              </h3>

              <p
                className="
                  mt-0.5
                  text-xs
                  leading-5
                  text-gray-500
                  sm:text-sm
                "
              >
                1/166 Vallalar Street, Municipal Colony
                Main Road, Erode, Tamil Nadu 638004
              </p>
            </div>
          </div>

          {/* ==================================================
              OPEN MAP BUTTON
          =================================================== */}

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open SBS Technologies in Google Maps"
            className="
              group
              inline-flex
              w-full
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[var(--primary)]
              px-6
              py-3
              text-sm
              font-bold
              !text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[var(--primary-dark)]
              hover:shadow-md
              sm:w-auto
              sm:px-5
            "
          >
            Open Map

            <ExternalLink
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}