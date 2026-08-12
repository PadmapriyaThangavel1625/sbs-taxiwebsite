"use client";

import { motion, Variants } from "framer-motion";
import ServiceCard from "./ServiceCard";
import type { ReactNode } from "react";

import {
  Building2,
  Plane,
  MapPin,
  ArrowRightLeft,
  CircleDot,
  Clock,
  Car,
  Users,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  details: string;
  image: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: "Local City Rides",
    description:
      "Quick and affordable rides within the city. Perfect for daily commutes, shopping, meetings and more.",
    details:
      "Book a comfortable city ride for your daily travel, shopping, office meetings, hospital visits and other local journeys. SBS Taxi provides reliable drivers and comfortable vehicles to help you travel around the city safely and conveniently.",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=700&q=80",
    icon: <MapPin size={28} />,
  },

  {
    title: "Airport Pickup & Drop",
    description:
      "Timely airport transfers with flight tracking. We make sure you reach on time.",
    details:
      "Travel to and from the airport without stress. Our airport taxi service provides convenient pickup and drop facilities with professional drivers. Book your airport ride in advance and enjoy a smooth journey.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80",
    icon: <Plane size={28} />,
  },

  {
    title: "Outstation Trips",
    description:
      "Comfortable outstation cabs for one day or multi-day trips.",
    details:
      "Plan your next outstation journey with SBS Taxi. Whether it is a one-day trip or a multi-day journey, choose a comfortable vehicle and enjoy a safe and convenient ride to your destination.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
    icon: <Car size={28} />,
  },

  {
    title: "One-Way Trips",
    description:
      "Travel one-way to any destination. Pay only for one side.",
    details:
      "One-way taxi service is perfect when you need to travel from one city to another without returning in the same vehicle. Choose your pickup and destination and book a convenient one-way cab.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80",
    icon: <ArrowRightLeft size={28} />,
  },

  {
    title: "Round Trips",
    description:
      "Round trip packages for family visits, business trips and weekend getaways.",
    details:
      "Enjoy a convenient round trip with SBS Taxi. Our round-trip service is suitable for family visits, business travel, temple trips, weekend getaways and other return journeys.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=700&q=80",
    icon: <CircleDot size={28} />,
  },

  {
    title: "Hourly Rental Packages",
    description:
      "Choose hourly rental packages for local travel and events.",
    details:
      "Need a car for multiple stops? Choose an hourly rental package and use the vehicle for your local travel, meetings, shopping, events and other requirements during the selected rental period.",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=700&q=80",
    icon: <Clock size={28} />,
  },

  {
    title: "Corporate Travel",
    description:
      "Reliable corporate travel solutions for businesses.",
    details:
      "SBS Taxi offers reliable transportation solutions for companies and business professionals. Use our service for employee travel, client transportation, meetings, airport transfers and corporate events.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80",
    icon: <Building2 size={28} />,
  },

  {
    title: "Self Drive Cars",
    description:
      "Drive on your own terms with our self drive cars.",
    details:
      "Choose a self-drive vehicle when you prefer to travel independently. Select your preferred car and rental duration and enjoy the flexibility of driving yourself.",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=700&q=80",
    icon: <Car size={28} />,
  },

  {
    title: "Group & Event Travel",
    description:
      "Vehicles for all group sizes with dedicated support.",
    details:
      "Travel comfortably with your friends, family or team. We provide suitable vehicles for group trips, weddings, corporate events, functions, tours and other special occasions.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80",
    icon: <Users size={28} />,
  },
];

/* =====================================================
   CONTAINER ANIMATION
===================================================== */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =====================================================
   CARD ANIMATION
===================================================== */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* =====================================================
   SERVICES GRID
===================================================== */

export default function ServicesGrid() {
  return (
    <section
      className="
        w-full
        bg-[var(--background)]
        py-10
        sm:py-12
        md:py-16
        lg:py-20
      "
    >
      {/* =================================================
          SAME CONTAINER AS NAVBAR + HERO

          LEFT EDGE:
          Navbar Logo
          Hero Content
          Trust Badges
          Services Content

          RIGHT EDGE:
          Navbar Book a Ride
          Hero Booking Form
          Trust Badges
          Services Content
      ================================================== */}

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            items-stretch
            gap-5
            font-[var(--font-jakarta)]

            sm:grid-cols-2

            lg:grid-cols-3
            lg:gap-8
          "
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-white
                bg-white
                shadow-sm
                transition-shadow
                duration-300
                hover:shadow-lg
              "
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.25,
                },
              }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}