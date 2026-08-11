
"use client";

import { FormEvent, useState } from "react";
import {
  Send,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    setStatus({
      type: "",
      message: "",
    });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      pickup: formData.get("pickup"),
      drop: formData.get("drop"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to send your message."
        );
      }

      setStatus({
        type: "success",
        message:
          "Your enquiry has been sent successfully. We will contact you shortly.",
      });

      form.reset();
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        font-[family-name:var(--font-jakarta)]
        rounded-3xl
        border
        border-[var(--border)]
        bg-white
        p-5
        shadow-sm
        sm:p-7
        lg:p-8
      "
    >
      {/* Header */}
      <div className="mb-6">
        <span
          className="
            inline-flex
            rounded-full
            bg-[var(--primary-light)]
            px-3
            py-1
            text-[11px]
            font-bold
            uppercase
            tracking-wider
            text-[var(--primary)]
          "
        >
          Contact Us
        </span>

        <h2
          className="
            mt-3
            font-[family-name:var(--font-instrument)]
            text-2xl
            font-normal
            tracking-tight
            text-[var(--text)]
            sm:text-3xl
          "
        >
          Send Us a Message
        </h2>

        <p
          className="
            mt-2
            max-w-xl
            text-sm
            leading-6
            text-[var(--muted)]
          "
        >
          Have a question, booking request, or feedback? Fill out the
          form below and our team will get back to you.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name + Phone */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="
                mb-2
                flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-[var(--text)]
              "
            >
              <User className="h-3.5 w-3.5 text-[var(--primary)]" />
              Your Name
              <span className="text-[var(--primary)]">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              autoComplete="name"
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-4
                py-3
                text-sm
                text-[var(--text)]
                outline-none
                placeholder:text-[var(--muted)]
                transition-all
                focus:border-[var(--primary)]
                focus:bg-white
                focus:ring-4
                focus:ring-[var(--primary)]/10
              "
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="
                mb-2
                flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-[var(--text)]
              "
            >
              <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
              Phone Number
              <span className="text-[var(--primary)]">*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              required
              inputMode="tel"
              autoComplete="tel"
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-4
                py-3
                text-sm
                text-[var(--text)]
                outline-none
                placeholder:text-[var(--muted)]
                transition-all
                focus:border-[var(--primary)]
                focus:bg-white
                focus:ring-4
                focus:ring-[var(--primary)]/10
              "
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="
              mb-2
              flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-[var(--text)]
            "
          >
            <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
            Email Address
            <span className="text-[var(--primary)]">*</span>
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            autoComplete="email"
            className="
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              px-4
              py-3
              text-sm
              text-[var(--text)]
              outline-none
              placeholder:text-[var(--muted)]
              transition-all
              focus:border-[var(--primary)]
              focus:bg-white
              focus:ring-4
              focus:ring-[var(--primary)]/10
            "
          />
        </div>

        {/* Pickup + Drop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Pickup */}
          <div>
            <label
              htmlFor="pickup"
              className="
                mb-2
                flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-[var(--text)]
              "
            >
              <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" />
              Pickup Location
              <span className="text-[var(--primary)]">*</span>
            </label>

            <input
              id="pickup"
              name="pickup"
              type="text"
              placeholder="Enter pickup location"
              required
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-4
                py-3
                text-sm
                text-[var(--text)]
                outline-none
                placeholder:text-[var(--muted)]
                transition-all
                focus:border-[var(--primary)]
                focus:bg-white
                focus:ring-4
                focus:ring-[var(--primary)]/10
              "
            />
          </div>

          {/* Drop */}
          <div>
            <label
              htmlFor="drop"
              className="
                mb-2
                flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-[var(--text)]
              "
            >
              <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" />
              Drop Location
              <span className="text-[var(--primary)]">*</span>
            </label>

            <input
              id="drop"
              name="drop"
              type="text"
              placeholder="Enter drop location"
              required
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-4
                py-3
                text-sm
                text-[var(--text)]
                outline-none
                placeholder:text-[var(--muted)]
                transition-all
                focus:border-[var(--primary)]
                focus:bg-white
                focus:ring-4
                focus:ring-[var(--primary)]/10
              "
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="subject"
            className="
              mb-2
              flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-[var(--text)]
            "
          >
            <MessageSquare className="h-3.5 w-3.5 text-[var(--primary)]" />
            Service Required
            <span className="text-[var(--primary)]">*</span>
          </label>

          <div className="relative">
            <select
              id="subject"
              name="subject"
              required
              defaultValue=""
              className="
                w-full
                appearance-none
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-4
                py-3
                pr-11
                text-sm
                text-[var(--text)]
                outline-none
                transition-all
                focus:border-[var(--primary)]
                focus:bg-white
                focus:ring-4
                focus:ring-[var(--primary)]/10
              "
            >
              <option value="" disabled>
                Select a service
              </option>

              <option value="Local City Rides">
                Local City Rides
              </option>

              <option value="Outstation Trips">
                Outstation Trips
              </option>

              <option value="Airport Transfers">
                Airport Transfers
              </option>

              <option value="One Way Trips">
                One Way Trips
              </option>

              <option value="Round Trips">
                Round Trips
              </option>

              <option value="Corporate Trips">
                Corporate Trips
              </option>
            </select>

            <ChevronDown
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-[var(--muted)]
              "
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="
              mb-2
              flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-[var(--text)]
            "
          >
            <MessageSquare className="h-3.5 w-3.5 text-[var(--primary)]" />
            Message
            <span className="text-[var(--primary)]">*</span>
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your travel requirements..."
            required
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              px-4
              py-3
              text-sm
              leading-6
              text-[var(--text)]
              outline-none
              placeholder:text-[var(--muted)]
              transition-all
              focus:border-[var(--primary)]
              focus:bg-white
              focus:ring-4
              focus:ring-[var(--primary)]/10
            "
          />
        </div>

        {/* Status */}
        {status.message && (
          <div
            className={`
              flex
              items-start
              gap-3
              rounded-xl
              border
              p-4
              text-sm
              ${
                status.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }
            `}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}

            <p>{status.message}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-xl
            bg-[var(--primary)]
            px-5
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-md
            shadow-[var(--primary)]/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[var(--primary-dark)]
            hover:shadow-lg
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Send
            className={`
              h-4
              w-4
              transition-transform
              duration-300
              ${
                loading
                  ? "animate-pulse"
                  : "group-hover:translate-x-0.5"
              }
            `}
          />

          <span>
            {loading ? "Sending..." : "Send Message"}
          </span>
        </button>

        {/* Privacy */}
        <p
          className="
            text-center
            text-[11px]
            leading-5
            text-[var(--muted)]
          "
        >
          We respect your privacy and will only use your information
          to respond to your enquiry.
        </p>
      </form>
    </section>
  );
}
