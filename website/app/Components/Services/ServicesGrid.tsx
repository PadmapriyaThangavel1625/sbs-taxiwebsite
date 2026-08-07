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
  image: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: "Local City Rides",
    description:
      "Quick and affordable rides within the city. Perfect for daily commutes, shopping, meetings and more.",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=700&q=80",
    icon: <MapPin />,
  },
  {
    title: "Airport Pickup & Drop",
    description:
      "Timely airport transfers with flight tracking. We make sure you reach on time.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80",
    icon: <Plane />,
  },
  {
    title: "Outstation Trips",
    description:
      "Comfortable outstation cabs for one day or multi-day trips.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
    icon: <CircleDot />,
  },
  {
    title: "One-Way Trips",
    description:
      "Travel one-way to any destination. Pay only for one side.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80",
    icon: <ArrowRightLeft />,
  },
  {
    title: "Round Trips",
    description:
      "Round trip packages for family visits, business trips and weekend getaways.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=700&q=80",
    icon: <Car />,
  },
  {
    title: "Corporate Travel",
    description:
      "Reliable corporate travel solutions for businesses.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80",
    icon: <Building2 />,
  },
  {
    title: "Hourly Rental Packages",
    description:
      "Choose hourly rental packages for local travel and events.",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=700&q=80",
    icon: <Clock />,
  },
  {
    title: "Self Drive Cars",
    description:
      "Drive on your own terms with our self drive cars.",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=700&q=80",
    icon: <Car />,
  },
  {
    title: "Group & Event Travel",
    description:
      "Vehicles for all group sizes with dedicated support.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80",
    icon: <Users />,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

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

export default function ServicesGrid() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
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