"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

/* ============================================================
   CONSTANTS
============================================================ */

const MAX_MESSAGE_LENGTH = 1000;
const REQUEST_TIMEOUT = 15000;

const inputClassName = `
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
  duration-200
  focus:border-[var(--primary)]
  focus:bg-white
  focus:ring-4
  focus:ring-[var(--primary)]/10
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const labelClassName = `
  mb-2
  flex
  items-center
  gap-1.5
  text-xs
  font-semibold
  text-[var(--text)]
`;

/* ============================================================
   TYPES
============================================================ */

type StatusType = "success" | "error" | "";

interface FormStatus {
  type: StatusType;
  message: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

/* ============================================================
   COMPONENT
============================================================ */

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<FormStatus>({
    type: "",
    message: "",
  });

  const [messageLength, setMessageLength] = useState(0);

  /* ==========================================================
     AUTO CLEAR STATUS
  ========================================================== */

  useEffect(() => {
    if (!status.message) return;

    const timer = window.setTimeout(() => {
      setStatus({
        type: "",
        message: "",
      });
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [status.message]);

  /* ==========================================================
     STATUS HELPER
  ========================================================== */

  function showError(message: string) {
    setStatus({
      type: "error",
      message,
    });

    setLoading(false);
  }

  function showSuccess(message: string) {
    setStatus({
      type: "success",
      message,
    });
  }

  /* ==========================================================
     SUBMIT
  ========================================================== */

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;

    setStatus({
      type: "",
      message: "",
    });

    setLoading(true);

    /* ==========================================================
       FORM DATA
    ========================================================== */

    const formData = new FormData(form);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const pickup = String(
      formData.get("pickup") || ""
    ).trim();

    const drop = String(
      formData.get("drop") || ""
    ).trim();

    const vehicleType = String(
      formData.get("vehicleType") || ""
    ).trim();

    const subject = String(
      formData.get("subject") || ""
    ).trim();

    const message = String(
      formData.get("message") || ""
    ).trim();

    /* ==========================================================
       VALIDATION
    ========================================================== */

    /* NAME */

    if (name.length < 2) {
      showError(
        "Please enter a valid name."
      );
      return;
    }

    /* PHONE */

    const normalizedPhone =
      phone.replace(/\D/g, "");

    if (
      normalizedPhone.length < 8 ||
      normalizedPhone.length > 15
    ) {
      showError(
        "Please enter a valid phone number."
      );
      return;
    }

    /* EMAIL */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showError(
        "Please enter a valid email address."
      );
      return;
    }

    /* PICKUP */

    if (pickup.length < 2) {
      showError(
        "Please enter a valid pickup location."
      );
      return;
    }

    /* DROP */

    if (drop.length < 2) {
      showError(
        "Please enter a valid drop location."
      );
      return;
    }

    /* VEHICLE TYPE */

    if (!vehicleType) {
      showError(
        "Please select a vehicle type."
      );
      return;
    }

    /* SERVICE */

    if (!subject) {
      showError(
        "Please select a service."
      );
      return;
    }

    /* MESSAGE */

    if (message.length < 10) {
      showError(
        "Please provide at least 10 characters in your message."
      );
      return;
    }

    if (
      message.length >
      MAX_MESSAGE_LENGTH
    ) {
      showError(
        `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`
      );
      return;
    }

    /* ==========================================================
       REQUEST DATA
    ========================================================== */

    const data = {
      name,
      phone,
      email,
      pickup,
      drop,
      vehicleType,
      subject,
      message,
    };

    /* ==========================================================
       ABORT CONTROLLER
    ========================================================== */

    const controller =
      new AbortController();

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    /* ==========================================================
       SEND REQUEST
    ========================================================== */

    try {
      const response = await fetch(
        "/api/email",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),

          signal: controller.signal,
        }
      );

      /* ========================================================
         PARSE RESPONSE
      ======================================================== */

      let result: ApiResponse = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      /* ========================================================
         SERVER ERROR
      ======================================================== */

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to send your message. Please try again."
        );
      }

      /* ========================================================
         API SUCCESS CHECK
      ======================================================== */

      if (result.success === false) {
        throw new Error(
          result.error ||
            "Unable to send your message. Please try again."
        );
      }

      /* ========================================================
         SUCCESS
      ======================================================== */

      showSuccess(
        result.message ||
          "Your enquiry has been sent successfully. Our SBS Taxi team will contact you shortly."
      );

      /* ========================================================
         RESET FORM
      ======================================================== */

      form.reset();

      setMessageLength(0);

      /* ========================================================
         SCROLL STATUS INTO VIEW
      ======================================================== */

      window.setTimeout(() => {
        document
          .getElementById(
            "contact-form-status"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
      }, 100);
    } catch (error) {
      console.error(
        "SBS Taxi Contact Form Error:",
        error
      );

      /* ========================================================
         TIMEOUT ERROR
      ======================================================== */

      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        showError(
          "The request took too long. Please check your connection and try again."
        );

        return;
      }

      /* ========================================================
         NORMAL ERROR
      ======================================================== */

      showError(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <section
      aria-labelledby="contact-form-title"
      className="
        w-full
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
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-7">
        

        <h2
          id="contact-form-title"
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
          Have a question, booking request, or
          feedback? Fill out the form below and
          our SBS Taxi team will get back to you
          shortly.
        </p>
      </div>

      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* ===================================================
            NAME + PHONE
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          {/* NAME */}

          <div>
            <label
              htmlFor="name"
              className={labelClassName}
            >
              <User
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[var(--primary)]
                "
              />

              Your Name

              <span
                aria-hidden="true"
                className="text-[var(--primary)]"
              >
                *
              </span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              disabled={loading}
              className={inputClassName}
            />
          </div>

          {/* PHONE */}

          <div>
            <label
              htmlFor="phone"
              className={labelClassName}
            >
              <Phone
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[var(--primary)]
                "
              />

              Phone Number

              <span
                aria-hidden="true"
                className="text-[var(--primary)]"
              >
                *
              </span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98435 44844"
              required
              maxLength={20}
              inputMode="tel"
              autoComplete="tel"
              disabled={loading}
              className={inputClassName}
            />
          </div>
        </div>

        {/* ===================================================
            EMAIL
        ==================================================== */}

        <div>
          <label
            htmlFor="email"
            className={labelClassName}
          >
            <Mail
              aria-hidden="true"
              className="
                h-3.5
                w-3.5
                text-[var(--primary)]
              "
            />

            Email Address

            <span
              aria-hidden="true"
              className="text-[var(--primary)]"
            >
              *
            </span>
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            maxLength={120}
            autoComplete="email"
            disabled={loading}
            className={inputClassName}
          />
        </div>

        {/* ===================================================
            PICKUP + DROP
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          {/* PICKUP */}

          <div>
            <label
              htmlFor="pickup"
              className={labelClassName}
            >
              <MapPin
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[var(--primary)]
                "
              />

              Pickup Location

              <span
                aria-hidden="true"
                className="text-[var(--primary)]"
              >
                *
              </span>
            </label>

            <input
              id="pickup"
              name="pickup"
              type="text"
              placeholder="Enter pickup location"
              required
              minLength={2}
              maxLength={200}
              disabled={loading}
              className={inputClassName}
            />
          </div>

          {/* DROP */}

          <div>
            <label
              htmlFor="drop"
              className={labelClassName}
            >
              <MapPin
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[var(--primary)]
                "
              />

              Drop Location

              <span
                aria-hidden="true"
                className="text-[var(--primary)]"
              >
                *
              </span>
            </label>

            <input
              id="drop"
              name="drop"
              type="text"
              placeholder="Enter drop location"
              required
              minLength={2}
              maxLength={200}
              disabled={loading}
              className={inputClassName}
            />
          </div>
        </div>

        {/* ===================================================
            VEHICLE TYPE + SERVICE
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          {/* VEHICLE TYPE */}

          <div>
            <label
              htmlFor="vehicleType"
              className={labelClassName}
            >
              <CarFront
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[var(--primary)]
                "
              />

              Vehicle Type

              <span
                aria-hidden="true"
                className="text-[var(--primary)]"
              >
                *
              </span>
            </label>

            <div className="relative">
              <select
                id="vehicleType"
                name="vehicleType"
                required
                defaultValue=""
                disabled={loading}
                className={`
                  ${inputClassName}
                  appearance-none
                  pr-11
                `}
              >
                <option value="" disabled>
                  Select vehicle type
                </option>

                <option value="SBS MINI">
                  SBS MINI
                </option>

                <option value="SBS SEDAN">
                  SBS SEDAN
                </option>

                <option value="SBS VAN">
                  SBS VAN
                </option>

                <option value="SBS SUV">
                  SBS SUV
                </option>
              </select>

              <ChevronDown
                aria-hidden="true"
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

          {/* SERVICE */}

          <div>
            <label
              htmlFor="subject"
              className={labelClassName}
            >
              <MessageSquare
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[var(--primary)]
                "
              />

              Service Required

              <span
                aria-hidden="true"
                className="text-[var(--primary)]"
              >
                *
              </span>
            </label>

            <div className="relative">
              <select
                id="subject"
                name="subject"
                required
                defaultValue=""
                disabled={loading}
                className={`
                  ${inputClassName}
                  appearance-none
                  pr-11
                `}
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

                <option value="Temple Tours">
                  Temple Tours
                </option>

                <option value="General Enquiry">
                  General Enquiry
                </option>

                <option value="Customer Support">
                  Customer Support
                </option>
              </select>

              <ChevronDown
                aria-hidden="true"
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
        </div>

        {/* ===================================================
            MESSAGE
        ==================================================== */}

        <div>
          <div
            className="
              mb-2
              flex
              items-center
              justify-between
            "
          >
            <label
              htmlFor="message"
              className={`
                ${labelClassName}
                mb-0
              `}
            >
              <MessageSquare
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[var(--primary)]
                "
              />

              Message

              <span
                aria-hidden="true"
                className="text-[var(--primary)]"
              >
                *
              </span>
            </label>

            <span
              className={`
                text-[10px]
                ${
                  messageLength >
                  MAX_MESSAGE_LENGTH * 0.9
                    ? "font-semibold text-orange-500"
                    : "text-[var(--muted)]"
                }
              `}
            >
              {messageLength}/
              {MAX_MESSAGE_LENGTH}
            </span>
          </div>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your travel requirements..."
            required
            minLength={10}
            maxLength={MAX_MESSAGE_LENGTH}
            disabled={loading}
            onChange={(e) =>
              setMessageLength(
                e.target.value.length
              )
            }
            className={`
              ${inputClassName}
              resize-none
              leading-6
            `}
          />
        </div>

        {/* ===================================================
            STATUS
        ==================================================== */}

        {status.message && (
          <div
            id="contact-form-status"
            role="alert"
            aria-live="polite"
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
                  ? `
                    border-green-200
                    bg-green-50
                    text-green-700
                  `
                  : `
                    border-red-200
                    bg-red-50
                    text-red-700
                  `
              }
            `}
          >
            {status.type === "success" ? (
              <CheckCircle2
                aria-hidden="true"
                className="
                  mt-0.5
                  h-5
                  w-5
                  shrink-0
                "
              />
            ) : (
              <AlertCircle
                aria-hidden="true"
                className="
                  mt-0.5
                  h-5
                  w-5
                  shrink-0
                "
              />
            )}

            <p className="leading-5">
              {status.message}
            </p>
          </div>
        )}

        {/* ===================================================
            SUBMIT BUTTON
        ==================================================== */}

        <button
          type="submit"
          disabled={loading}
          aria-disabled={loading}
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
            focus:outline-none
            focus:ring-4
            focus:ring-[var(--primary)]/20
            disabled:cursor-not-allowed
            disabled:translate-y-0
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  animate-spin
                "
              />

              <span>
                Sending...
              </span>
            </>
          ) : (
            <>
              <Send
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />

              <span>
                Send Message
              </span>
            </>
          )}
        </button>

        {/* ===================================================
            PRIVACY NOTE
        ==================================================== */}

        <p
          className="
            text-center
            text-[11px]
            leading-5
            text-[var(--muted)]
          "
        >
          We respect your privacy and will only
          use your information to respond to your
          enquiry.
        </p>
      </form>
    </section>
  );
}