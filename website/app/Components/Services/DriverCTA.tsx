"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Car, FileText } from "lucide-react";

export default function DriverCTA() {
  return (
    <section className="w-full bg-[var(--background)] py-10 sm:py-12 md:py-16 lg:py-20">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            SECTION TITLE
        ================================================== */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p
            className="
              mb-2
              !text-2xl
              !font-bold
              uppercase
              tracking-[0.18em]
              text-[var(--secondary-dark)]
              sm:text-sm
            "
          >
            Join SBS Taxi
          </p>

          <h2
            className="
              text-2xl
              font-extrabold
              leading-tight
              text-[var(--primary)]
              sm:text-3xl
              lg:text-4xl
            "
          >
            Want to Become a Driver?
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-gray-600
              sm:text-base
              sm:leading-7
            "
          >
            Join SBS Taxi and start your driving journey with flexible
            opportunities and reliable support.
          </p>
        </div>

        {/* =================================================
            TWO DRIVER CARDS
        ================================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">

          {/* =================================================
              WANT DRIVER
          ================================================== */}
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            {/* FULL IMAGE */}
            <div className="group w-full overflow-hidden bg-gray-100">
              <Image
                src="/images/wantdriver.jpeg"
                alt="Become an SBS Taxi driver"
                width={1055}
                height={1491}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                  transition-transform
                  duration-700
                  group-hover:scale-[1.02]
                "
              />
            </div>

            {/* INFORMATION BELOW IMAGE */}
            <div className="p-5 sm:p-6 lg:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--secondary-light)]
                    text-[var(--primary)]
                  "
                >
                  <Car className="h-5 w-5" />
                </div>

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-[var(--secondary-dark)]
                    sm:text-sm
                  "
                >
                  Drive With SBS Taxi
                </p>
              </div>

              <h3
                className="
                  text-xl
                  font-extrabold
                  leading-tight
                  text-[var(--primary)]
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                Become an SBS Taxi Driver
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-gray-600
                  sm:text-base
                  sm:leading-7
                "
              >
                Join SBS Taxi and turn your driving skills into an earning
                opportunity with flexible working options and reliable
                support.
              </p>

              <Link
                href="/driver"
                className="
                  mt-5
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-xl
                  bg-[var(--secondary)]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-[var(--primary)]
                  transition
                  hover:bg-[var(--secondary-dark)]
                "
              >
                Join as a Driver
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* =================================================
              DRIVER DOCUMENTS
          ================================================== */}
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            {/* FULL IMAGE */}
            <div className="group w-full overflow-hidden bg-gray-100">
              <Image
                src="/images/driverdocuments.jpeg"
                alt="Documents required for SBS Taxi drivers"
                width={1055}
                height={1491}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                  transition-transform
                  duration-700
                  group-hover:scale-[1.02]
                "
              />
            </div>

            {/* INFORMATION BELOW IMAGE */}
            <div className="p-5 sm:p-6 lg:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-[var(--primary)]
                  "
                >
                  <FileText className="h-5 w-5" />
                </div>

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-[var(--secondary-dark)]
                    sm:text-sm
                  "
                >
                  Driver Requirements
                </p>
              </div>

              <h3
                className="
                  text-xl
                  font-extrabold
                  leading-tight
                  text-[var(--primary)]
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                Documents Required for Drivers
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-gray-600
                  sm:text-base
                  sm:leading-7
                "
              >
                Keep your required documents ready and complete your SBS Taxi
                driver registration quickly and easily.
              </p>

              <Link
                href="/driver/documents"
                className="
                  mt-5
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  !text-white
                  transition
                  hover:bg-[var(--primary-dark)]
                "
              >
                View Documents
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}