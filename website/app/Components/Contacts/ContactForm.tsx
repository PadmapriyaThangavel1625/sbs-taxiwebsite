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


{/*
  "use client";

import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  Mail,
  Phone,
  Navigation,
} from "lucide-react";

type LocationSuggestion = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

type SelectedLocation = {
  address: string;
  latitude: number;
  longitude: number;
};

type ContactFormProps = {
  pickupDate?: string;
  pickupTime?: string;
  vehicleType?: string;
  paymentMethod?: string;
  passengers?: number;
};

export default function ContactForm({
  pickupDate = "",
  pickupTime = "",
  vehicleType = "",
  paymentMethod = "",
  passengers = 1,
}: ContactFormProps) {
  /* ============================================================
     CUSTOMER DETAILS
  ============================================================ 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* ============================================================
     PICKUP / DROP INPUT
  ============================================================ 

  const [pickupInput, setPickupInput] = useState("");
  const [dropInput, setDropInput] = useState("");

  const [pickupLocation, setPickupLocation] =
    useState<SelectedLocation | null>(null);

  const [dropLocation, setDropLocation] =
    useState<SelectedLocation | null>(null);

  /* ============================================================
     SUGGESTIONS
  ============================================================ 

  const [pickupSuggestions, setPickupSuggestions] = useState<
    LocationSuggestion[]
  >([]);

  const [dropSuggestions, setDropSuggestions] = useState<
    LocationSuggestion[]
  >([]);

  const [pickupSearching, setPickupSearching] = useState(false);
  const [dropSearching, setDropSearching] = useState(false);

  /* ============================================================
     DISTANCE / FARE
  ============================================================ 

  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  const [estimatedFare, setEstimatedFare] =
    useState<number | null>(null);

  const [calculatingRoute, setCalculatingRoute] = useState(false);

  /* ============================================================
     MESSAGE
  ============================================================ 

  const [message, setMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const [loading, setLoading] = useState(false);

  const MAX_MESSAGE_LENGTH = 1000;
  const REQUEST_TIMEOUT = 15000;

  /* ============================================================
     SEARCH LOCATION
  ============================================================ 

  async function searchLocation(
    value: string,
    type: "pickup" | "drop"
  ) {
    if (type === "pickup") {
      setPickupInput(value);
      setPickupLocation(null);
    } else {
      setDropInput(value);
      setDropLocation(null);
    }

    if (value.trim().length < 3) {
      if (type === "pickup") {
        setPickupSuggestions([]);
      } else {
        setDropSuggestions([]);
      }

      return;
    }

    try {
      if (type === "pickup") {
        setPickupSearching(true);
      } else {
        setDropSearching(true);
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=in&q=${encodeURIComponent(
          value
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to search location.");
      }

      const data: LocationSuggestion[] =
        await response.json();

      if (type === "pickup") {
        setPickupSuggestions(data);
      } else {
        setDropSuggestions(data);
      }
    } catch (error) {
      console.error("Location search error:", error);
    } finally {
      if (type === "pickup") {
        setPickupSearching(false);
      } else {
        setDropSearching(false);
      }
    }
  }

  /* ============================================================
     SELECT LOCATION
  ============================================================ 

  function selectLocation(
    location: LocationSuggestion,
    type: "pickup" | "drop"
  ) {
    const selected: SelectedLocation = {
      address: location.display_name,
      latitude: Number(location.lat),
      longitude: Number(location.lon),
    };

    if (type === "pickup") {
      setPickupLocation(selected);
      setPickupInput(location.display_name);
      setPickupSuggestions([]);
    } else {
      setDropLocation(selected);
      setDropInput(location.display_name);
      setDropSuggestions([]);
    }
  }

  /* ============================================================
     CALCULATE ROAD DISTANCE
     OSRM ROUTING
  ============================================================ 

  async function calculateRouteDistance(
    pickup: SelectedLocation,
    drop: SelectedLocation
  ) {
    try {
      setCalculatingRoute(true);

      const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${pickup.longitude},${pickup.latitude};` +
        `${drop.longitude},${drop.latitude}` +
        `?overview=false`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to calculate route.");
      }

      const data = await response.json();

      if (
        !data.routes ||
        !data.routes.length ||
        typeof data.routes[0].distance !== "number"
      ) {
        throw new Error("Route distance was not found.");
      }

      const distance = data.routes[0].distance / 1000;

      const roundedDistance = Number(
        distance.toFixed(2)
      );

      setDistanceKm(roundedDistance);

      /* ======================================================
         FARE CALCULATION

         Base fare = ₹40
         Base distance = 2 km
         Extra per km = ₹15

         Example:
         4.2 km

         ₹40 + ((4.2 - 2) × ₹15)
         = ₹73

         Change these values according to your actual
         SBS Taxi fare rules.
      ====================================================== 

      const baseFare = 40;
      const baseDistance = 2;
      const perKm = 15;

      let fare = baseFare;

      if (roundedDistance > baseDistance) {
        fare =
          baseFare +
          (roundedDistance - baseDistance) * perKm;
      }

      const finalFare = Math.round(fare);

      setEstimatedFare(finalFare);
    } catch (error) {
      console.error("Route calculation error:", error);

      setDistanceKm(null);
      setEstimatedFare(null);

      toast.error(
        "Unable to calculate the route distance."
      );
    } finally {
      setCalculatingRoute(false);
    }
  }

  /* ============================================================
     CALCULATE WHEN BOTH LOCATIONS ARE SELECTED
  ============================================================ 

  useEffect(() => {
    if (!pickupLocation || !dropLocation) {
      setDistanceKm(null);
      setEstimatedFare(null);
      return;
    }

    calculateRouteDistance(
      pickupLocation,
      dropLocation
    );
  }, [pickupLocation, dropLocation]);

  /* ============================================================
     SUBMIT
  ============================================================ 

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!pickupLocation) {
      toast.error(
        "Please select a pickup location from the suggestions."
      );
      return;
    }

    if (!dropLocation) {
      toast.error(
        "Please select a drop location from the suggestions."
      );
      return;
    }

    if (distanceKm === null) {
      toast.error(
        "Please wait while the distance is calculated."
      );
      return;
    }

    if (estimatedFare === null) {
      toast.error(
        "Please wait while the fare is calculated."
      );
      return;
    }

    if (!vehicleType) {
      toast.error("Please select a vehicle type.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    setLoading(true);

    const controller = new AbortController();

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      const response = await fetch("/api/email", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        signal: controller.signal,

        body: JSON.stringify({
          type: "taxi-booking",

          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),

          pickupDate,
          pickupTime,

          pickupAddress: pickupLocation.address,
          pickupLatitude: pickupLocation.latitude,
          pickupLongitude: pickupLocation.longitude,

          dropAddress: dropLocation.address,
          dropLatitude: dropLocation.latitude,
          dropLongitude: dropLocation.longitude,

          distanceKm,

          vehicleType,

          passengers,

          estimatedFare,

          paymentMethod,

          message: message.trim(),
        }),
      });

      let result: {
        success?: boolean;
        message?: string;
        error?: string;
        bookingId?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to send your booking."
        );
      }

      toast.success(
        result.message ||
          "Your booking request has been sent successfully."
      );

      /* RESET 

      setName("");
      setEmail("");
      setPhone("");

      setPickupInput("");
      setDropInput("");

      setPickupLocation(null);
      setDropLocation(null);

      setPickupSuggestions([]);
      setDropSuggestions([]);

      setDistanceKm(null);
      setEstimatedFare(null);

      setMessage("");
      setMessageLength(0);
    } catch (error) {
      console.error(
        "SBS Taxi Contact Form Error:",
        error
      );

      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        toast.error(
          "The request took too long. Please check your connection."
        );

        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send your booking."
      );
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  /* ============================================================
     RENDER
  ============================================================ 

  return (
    <section
      aria-labelledby="contact-form-title"
      className="w-full overflow-hidden rounded-3xl bg-white"
    >
      <div className="p-6 sm:p-8">
        {/* HEADER 

        <div className="mb-7">
          <h2
            id="contact-form-title"
            className="text-2xl font-bold text-gray-900"
          >
            Book Your Ride
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Enter your pickup and drop locations to
            calculate your fare.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* ==================================================
              NAME
          ================================================== 

          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                autoComplete="name"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* ==================================================
              EMAIL
          ================================================== *

          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* ==================================================
              PHONE
          ================================================== *

          <div>
            <label
              htmlFor="contact-phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Enter your phone number"
                autoComplete="tel"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* ==================================================
              PICKUP LOCATION
          ================================================== *

          <div className="relative">
            <label
              htmlFor="pickup-location"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Pickup Location
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-600"
              />

              <input
                id="pickup-location"
                type="text"
                value={pickupInput}
                onChange={(event) =>
                  searchLocation(
                    event.target.value,
                    "pickup"
                  )
                }
                placeholder="Enter pickup location"
                autoComplete="off"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {pickupSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                </div>
              )}
            </div>

            {/* PICKUP SUGGESTIONS *

            {pickupSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                {pickupSuggestions.map(
                  (suggestion) => (
                    <button
                      key={suggestion.place_id}
                      type="button"
                      onClick={() =>
                        selectLocation(
                          suggestion,
                          "pickup"
                        )
                      }
                      className="flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                    >
                      <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <span className="text-sm text-gray-700">
                        {suggestion.display_name}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}

            {pickupLocation && (
              <p className="mt-2 text-xs font-medium text-green-600">
                ✓ Pickup location selected
              </p>
            )}
          </div>

          {/* ==================================================
              DROP LOCATION
          ================================================== *

          <div className="relative">
            <label
              htmlFor="drop-location"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Drop Location
            </label>

            <div className="relative">
              <Navigation
                size={18}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-red-500"
              />

              <input
                id="drop-location"
                type="text"
                value={dropInput}
                onChange={(event) =>
                  searchLocation(
                    event.target.value,
                    "drop"
                  )
                }
                placeholder="Enter drop location"
                autoComplete="off"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {dropSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                </div>
              )}
            </div>

            {/* DROP SUGGESTIONS *

            {dropSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                {dropSuggestions.map(
                  (suggestion) => (
                    <button
                      key={suggestion.place_id}
                      type="button"
                      onClick={() =>
                        selectLocation(
                          suggestion,
                          "drop"
                        )
                      }
                      className="flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                    >
                      <Navigation
                        size={18}
                        className="mt-0.5 shrink-0 text-red-500"
                      />

                      <span className="text-sm text-gray-700">
                        {suggestion.display_name}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}

            {dropLocation && (
              <p className="mt-2 text-xs font-medium text-green-600">
                ✓ Drop location selected
              </p>
            )}
          </div>

          {/* ==================================================
              DATE
          ================================================== *

          <div>
            <label
              htmlFor="pickup-date"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Pickup Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="pickup-date"
                type="text"
                value={pickupDate}
                readOnly
                placeholder="Pickup date"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none"
              />
            </div>
          </div>

          {/* ==================================================
              TIME
          ================================================== *

          <div>
            <label
              htmlFor="pickup-time"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Pickup Time
            </label>

            <div className="relative">
              <Clock3
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="pickup-time"
                type="text"
                value={pickupTime}
                readOnly
                placeholder="Pickup time"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none"
              />
            </div>
          </div>

          {/* ==================================================
              BOOKING SUMMARY
          ================================================== *

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Fare Details
            </h3>

            <div className="space-y-3 text-sm">
              {/* VEHICLE TYPE *

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Vehicle Type
                </span>

                <span className="font-semibold text-gray-900">
                  {vehicleType || "Not selected"}
                </span>
              </div>

              {/* PASSENGERS *

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Passengers
                </span>

                <span className="font-semibold text-gray-900">
                  {passengers}
                </span>
              </div>

              {/* DISTANCE *

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Distance
                </span>

                <span className="font-semibold text-gray-900">
                  {calculatingRoute
                    ? "Calculating..."
                    : distanceKm !== null
                    ? `${distanceKm.toFixed(2)} km`
                    : "Select locations"}
                </span>
              </div>

              {/* FARE *

              <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-3">
                <span className="font-semibold text-gray-700">
                  Estimated Fare
                </span>

                <span className="text-lg font-bold text-blue-600">
                  {calculatingRoute
                    ? "Calculating..."
                    : estimatedFare !== null
                    ? `₹${estimatedFare}`
                    : "—"}
                </span>
              </div>

              {/* PAYMENT *

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Payment Method
                </span>

                <span className="font-semibold text-gray-900">
                  {paymentMethod || "Not selected"}
                </span>
              </div>
            </div>
          </div>

          {/* ==================================================
              MESSAGE
          ================================================== *

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-gray-700"
              >
                Additional Message
              </label>

              <span className="text-xs text-gray-500">
                {messageLength}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>

            <textarea
              id="contact-message"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              rows={4}
              onChange={(event) => {
                setMessage(event.target.value);
                setMessageLength(
                  event.target.value.length
                );
              }}
              placeholder="Enter any additional message..."
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* ==================================================
              SUBMIT
          ================================================== *

          <button
            type="submit"
            disabled={loading || calculatingRoute}
            className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Sending Booking..."
              : calculatingRoute
              ? "Calculating Fare..."
              : "Submit Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}
  */}