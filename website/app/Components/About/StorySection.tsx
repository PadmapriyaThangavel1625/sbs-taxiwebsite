
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              Our Story
            </h2>

            <div className="space-y-4 text-[var(--text-light)] text-base leading-relaxed">
              <p>
                Founded with a vision to transform urban mobility, SBS Taxi has
                grown to become one of the most reliable taxi services trusted
                by thousands of customers.
              </p>

              <p>
                We believe in providing quality rides at fair prices with a
                strong focus on safety, punctuality, and customer satisfaction.
              </p>

              <p>
                From daily commutes to weekend getaways, we're here to take you
                wherever you need to go—comfortably and confidently.
              </p>
            </div>

            <Link
              href="/booking"
              className="
                inline-flex
                items-center
                bg-[var(--primary)]
                hover:bg-[var(--primary-dark)]
                text-white
                px-6
                py-3
                rounded-xl
                transition-colors
                group
              "
            >
              Book a Ride

              <ArrowRight
                className="
                  ml-2
                  h-4 w-4
                  group-hover:translate-x-1
                  transition-transform
                "
              />
            </Link>
          </div>

          {/* Right Image */}
          <div
            className="
              relative
              h-80 lg:h-[450px]
              rounded-2xl
              overflow-hidden
              shadow-lg
            "
          >
            <Image
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
              alt="SBS Taxi Drivers Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}