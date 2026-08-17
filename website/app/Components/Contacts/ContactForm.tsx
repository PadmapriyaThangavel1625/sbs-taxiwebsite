"use client";

import { FormEvent, useEffect, useState } from "react";
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
  Users,
} from "lucide-react";

/* ============================================================
   CONSTANTS
============================================================ */

const MAX_MESSAGE_LENGTH = 1000;
const REQUEST_TIMEOUT = 30000;

/* ============================================================
   INPUT STYLE
============================================================ */

const inputClassName = `
  w-full
  rounded-xl
  border
  border-[var(--border)]
  bg-white
  px-4
  py-3
  text-sm
  text-[var(--text-secondary)]
  outline-none
  placeholder:text-[var(--text-secondary)]
  transition-all
  duration-200
  focus:border-[var(--primary)]
  focus:ring-4
  focus:ring-[var(--primary)]/10
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

/* ============================================================
   LABEL STYLE
============================================================ */

const labelClassName = `
  mb-2
  flex
  items-center
  gap-1.5
  font-[family-name:var(--font-jakarta)]
  text-xs
  font-semibold
  tracking-wide
  text-[var(--text-secondary)]
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
     ERROR
  ========================================================== */

  function showError(message: string) {
    setStatus({
      type: "error",
      message,
    });

    setLoading(false);
  }

  /* ==========================================================
     SUCCESS
  ========================================================== */

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

    /* ========================================================
       FORM DATA
    ======================================================== */

    const formData = new FormData(form);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const pickup = String(
      formData.get("pickup") || ""
    ).trim();

    const drop = String(
      formData.get("drop") || ""
    ).trim();

    const passengers = String(
      formData.get("passengers") || ""
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

    /* ========================================================
       VALIDATION
    ======================================================== */

    if (name.length < 2) {
      showError("Please enter a valid name.");
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

    /* PASSENGERS */

    const passengerCount =
      Number(passengers);

    if (
      !passengers ||
      !Number.isInteger(passengerCount) ||
      passengerCount < 1 ||
      passengerCount > 50
    ) {
      showError(
        "Please select a valid number of passengers."
      );
      return;
    }

    /* VEHICLE */

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

    if (
      message.length > MAX_MESSAGE_LENGTH
    ) {
      showError(
        `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`
      );
      return;
    }

    /* ========================================================
       REQUEST DATA
    ======================================================== */

    const data = {
      bookingType: "contact-enquiry",

      name,
      email,
      phone,

      pickup,
      drop,

      passengers: passengerCount,

      vehicleType,
      subject,
      message,
    };

    /* ========================================================
       ABORT CONTROLLER
    ======================================================== */

    const controller =
      new AbortController();

    const timeout =
      window.setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);

    /* ========================================================
       SEND
    ======================================================== */

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

      let result: ApiResponse = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      /* ======================================================
         SERVER ERROR
      ====================================================== */

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to send your message. Please try again."
        );
      }

      /* ======================================================
         API SUCCESS
      ====================================================== */

      if (result.success === false) {
        throw new Error(
          result.error ||
            "Unable to send your message. Please try again."
        );
      }

      /* ======================================================
         SUCCESS
      ====================================================== */

      showSuccess(
        result.message ||
          "Your enquiry has been sent successfully. Our SBS Taxi team will contact you shortly."
      );

      /* ======================================================
         RESET
      ====================================================== */

      form.reset();

      setMessageLength(0);

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

      /* TIMEOUT */

      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        showError(
          "The request took too long. Please check your connection and try again."
        );

        return;
      }

      /* NORMAL ERROR */

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
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-white
        shadow-sm
      "
    >

      {/* =====================================================
          TOP LINE
      ====================================================== */}

      <div className="flex h-[3px] w-full">
  <div className="w-1/2 bg-[var(--primary)]" />
  <div className="w-1/2 bg-[var(--secondary)]" />
</div>

      <div className="p-5 sm:p-7 lg:p-8">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-7">

          <h2
            id="contact-form-title"
            className="
              font-[family-name:var(--font-instrument)]
              text-2xl
              font-normal
              tracking-tight
              text-[var(--text-secondary)]
              sm:text-3xl
            "
          >
            Send Us a Message
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              font-[family-name:var(--font-jakarta)]
              text-sm
              leading-6
              text-[var(--text-secondary)]
            "
          >
            Questions about bookings, pricing, or
            our taxi services? We're here to help.
          </p>

        </div>

        {/* ===================================================
            FORM
        ==================================================== */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >

          {/* =================================================
              NAME + EMAIL
          ================================================= */}

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
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Name

                <span className="text-[var(--primary)]">
                  *
                </span>

              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                disabled={loading}
                className={inputClassName}
              />

            </div>

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className={labelClassName}
              >

                <Mail
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Email Address

                <span className="text-[var(--primary)]">
                  *
                </span>

              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email Address"
                required
                maxLength={120}
                autoComplete="email"
                disabled={loading}
                className={inputClassName}
              />

            </div>

          </div>

          {/* =================================================
              PHONE + PICKUP
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
            "
          >

            {/* PHONE */}

            <div>

              <label
                htmlFor="phone"
                className={labelClassName}
              >

                <Phone
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Phone Number

                <span className="text-[var(--primary)]">
                  *
                </span>

              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                required
                maxLength={20}
                inputMode="tel"
                autoComplete="tel"
                disabled={loading}
                className={inputClassName}
              />

            </div>

            {/* PICKUP */}

            <div>

              <label
                htmlFor="pickup"
                className={labelClassName}
              >

                <MapPin
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Pickup Location

                <span className="text-[var(--primary)]">
                  *
                </span>

              </label>

              <input
                id="pickup"
                name="pickup"
                type="text"
                placeholder="Pickup Location"
                required
                minLength={2}
                maxLength={200}
                disabled={loading}
                className={inputClassName}
              />

            </div>

          </div>

          {/* =================================================
              DROP + PASSENGERS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
            "
          >

            {/* DROP */}

            <div>

              <label
                htmlFor="drop"
                className={labelClassName}
              >

                <MapPin
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Drop Location

                <span className="text-[var(--primary)]">
                  *
                </span>

              </label>

              <input
                id="drop"
                name="drop"
                type="text"
                placeholder="Drop Location"
                required
                minLength={2}
                maxLength={200}
                disabled={loading}
                className={inputClassName}
              />

            </div>

            {/* PASSENGERS */}

            <div>

              <label
                htmlFor="passengers"
                className={labelClassName}
              >

                <Users
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Number of Passengers

                <span className="text-[var(--primary)]">
                  *
                </span>

              </label>

              <div className="relative">

                <select
                  id="passengers"
                  name="passengers"
                  required
                  defaultValue=""
                  disabled={loading}
                  className={`
                    ${inputClassName}
                    appearance-none
                    pr-11
                  `}
                >

                  <option
                    value=""
                    disabled
                  >
                    Select Passengers
                  </option>

                  <option value="1">
                    1 Passenger
                  </option>

                  <option value="2">
                    2 Passengers
                  </option>

                  <option value="3">
                    3 Passengers
                  </option>

                  <option value="4">
                    4 Passengers
                  </option>

                  <option value="5">
                    5 Passengers
                  </option>

                  <option value="6">
                    6 Passengers
                  </option>

                  <option value="7">
                    7 Passengers
                  </option>

                  <option value="8">
                    8 Passengers
                  </option>

                  <option value="9">
                    9 Passengers
                  </option>

                  <option value="10">
                    10 Passengers
                  </option>

                  <option value="11">
                    11 Passengers
                  </option>

                  <option value="12">
                    12 Passengers
                  </option>

                  <option value="13">
                    13 Passengers
                  </option>

                  <option value="14">
                    14 Passengers
                  </option>

                  <option value="15">
                    15 Passengers
                  </option>

                  <option value="16">
                    16 Passengers
                  </option>

                  <option value="17">
                    17 Passengers
                  </option>

                  <option value="18">
                    18 Passengers
                  </option>

                  <option value="19">
                    19 Passengers
                  </option>

                  <option value="20">
                    20 Passengers
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
                    text-[var(--text-secondary)]
                  "
                />

              </div>

            </div>

          </div>

          {/* =================================================
              VEHICLE + SERVICE
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
            "
          >

            {/* VEHICLE */}

            <div>

              <label
                htmlFor="vehicleType"
                className={labelClassName}
              >

                <CarFront
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Vehicle Type

                <span className="text-[var(--primary)]">
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

                  <option
                    value=""
                    disabled
                  >
                    Select Vehicle
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

                  <option value="SBS MUV">
                    SBS MUV
                  </option>

                  <option value="SBS MUV+">
                    SBS MUV+
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
                    text-[var(--text-secondary)]
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
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Service Required

                <span className="text-[var(--primary)]">
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

                  <option
                    value=""
                    disabled
                  >
                    Select Service
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
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[var(--text-secondary)]
                  "
                />

              </div>

            </div>

          </div>

          {/* =================================================
              MESSAGE
          ================================================= */}

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
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--primary)]
                  "
                />

                Message

                <span
                  className="
                    ml-1
                    font-normal
                    normal-case
                    text-[var(--text-secondary)]
                  "
                >
                  (Optional)
                </span>

              </label>

              <span
                className="
                  text-[10px]
                  text-[var(--text-secondary)]
                "
              >
                {messageLength}/{MAX_MESSAGE_LENGTH}
              </span>

            </div>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your travel requirements..."
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

          {/* =================================================
              STATUS
          ================================================= */}

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
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                  "
                />
              ) : (
                <AlertCircle
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

          {/* =================================================
              SUBMIT
          ================================================= */}

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
              font-[family-name:var(--font-jakarta)]
              text-sm
              font-bold
              text-white
              shadow-md
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
                  className="
                    h-4
                    w-4
                    animate-spin
                  "
                />

                Sending...
              </>
            ) : (
              <>
                <Send
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />

                Send Message
              </>
            )}

          </button>

          {/* =================================================
              PRIVACY
          ================================================= */}

          <p
            className="
              text-center
              font-[family-name:var(--font-jakarta)]
              text-[11px]
              leading-5
              text-[var(--text-secondary)]
            "
          >
            We respect your privacy and will only
            use your information to respond to your
            enquiry.
          </p>

        </form>
      </div>
    </section>
  );
}