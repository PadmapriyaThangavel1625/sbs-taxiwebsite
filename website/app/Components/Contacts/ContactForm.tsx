"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CarFront,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Send,
  User,
  Users,
  X,
} from "lucide-react";

/* ============================================================
   CONSTANTS
============================================================ */

const MAX_MESSAGE_LENGTH = 1000;
const REQUEST_TIMEOUT = 30000;

/* ============================================================
   VEHICLES
============================================================ */

const VEHICLES = {
  "SBS MINI": {
    rate: 12,
    capacity: 4,
  },
  "SBS SEDAN": {
    rate: 12.5,
    capacity: 4,
  },
  "SBS VAN": {
    rate: 14,
    capacity: 7,
  },
  "SBS SUV": {
    rate: 17,
    capacity: 6,
  },
  "SBS MUV": {
    rate: 18,
    capacity: 7,
  },
  "SBS MUV+": {
    rate: 19,
    capacity: 7,
  },
} as const;

type VehicleName = keyof typeof VEHICLES;

/* ============================================================
   LOCATIONS
============================================================ */

const LOCATIONS = [
  {
    name: "SBS Technologies, Erode",
    latitude: 11.341,
    longitude: 77.7172,
  },
  {
    name: "Erode Bus Stand",
    latitude: 11.341,
    longitude: 77.7172,
  },
  {
    name: "Erode Railway Station",
    latitude: 11.339,
    longitude: 77.7175,
  },
  {
    name: "Erode Junction",
    latitude: 11.341,
    longitude: 77.717,
  },
  {
    name: "Perundurai",
    latitude: 11.275,
    longitude: 77.583,
  },
  {
    name: "Bhavani",
    latitude: 11.448,
    longitude: 77.683,
  },
  {
    name: "Chithode",
    latitude: 11.384,
    longitude: 77.706,
  },
  {
    name: "Gobichettipalayam",
    latitude: 11.454,
    longitude: 77.442,
  },
  {
    name: "Tiruchengode",
    latitude: 11.379,
    longitude: 77.894,
  },
  {
    name: "Salem",
    latitude: 11.6643,
    longitude: 78.146,
  },
  {
    name: "Coimbatore",
    latitude: 11.0168,
    longitude: 76.9558,
  },
  {
    name: "Tiruppur",
    latitude: 11.1085,
    longitude: 77.3411,
  },
  {
    name: "Namakkal",
    latitude: 11.2194,
    longitude: 78.1677,
  },
  {
    name: "Karur",
    latitude: 10.9601,
    longitude: 78.0766,
  },
  {
    name: "Bengaluru",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  {
    name: "Chennai",
    latitude: 13.0827,
    longitude: 80.2707,
  },
  {
    name: "Coimbatore Airport",
    latitude: 11.0304,
    longitude: 77.0438,
  },
  {
    name: "Salem Airport",
    latitude: 11.7833,
    longitude: 78.0656,
  },
] as const;

type LocationName = (typeof LOCATIONS)[number]["name"];

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

interface ToastState {
  type: "success" | "error";
  message: string;
}

/* ============================================================
   INPUT STYLES
============================================================ */

const inputClassName = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-3
  text-sm
  font-medium
  text-slate-700
  outline-none
  placeholder:text-slate-400
  transition-all
  duration-200
  focus:border-[var(--primary)]
  focus:ring-4
  focus:ring-[var(--primary)]/10
  disabled:cursor-not-allowed
  disabled:bg-slate-50
  disabled:opacity-60
`;

const labelClassName = `
  mb-2
  flex
  items-center
  gap-1.5
  font-[family-name:var(--font-jakarta)]
  text-xs
  font-bold
  tracking-wide
  text-[var(--text-secondary)]
`;

/* ============================================================
   CUSTOM LOCATION DROPDOWN
============================================================ */

interface LocationDropdownProps {
  label: string;
  value: LocationName | "";
  placeholder: string;
  locations: readonly {
    name: string;
  }[];
  icon: React.ReactNode;
  disabled?: boolean;
  onChange: (value: LocationName) => void;
}

function LocationDropdown({
  label,
  value,
  placeholder,
  locations,
  icon,
  disabled,
  onChange,
}: LocationDropdownProps) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <label className={labelClassName}>
        {icon}

        {label}

        <span className="text-[var(--primary)]">
          *
        </span>
      </label>

      {/* BUTTON */}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex
          w-full
          items-center
          justify-between
          gap-3
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-left
          text-sm
          font-medium
          outline-none
          transition-all
          duration-200
          ${
            open
              ? "border-[var(--primary)] ring-4 ring-[var(--primary)]/10"
              : "hover:border-slate-300"
          }
          disabled:cursor-not-allowed
          disabled:bg-slate-50
          disabled:opacity-60
        `}
      >
        <span
          className={`
            min-w-0
            truncate
            ${
              value
                ? "text-slate-700"
                : "text-slate-400"
            }
          `}
        >
          {value || placeholder}
        </span>

        <ChevronDown
          className={`
            h-4
            w-4
            shrink-0
            text-slate-400
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+8px)]
            z-[100]
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-1.5
            shadow-[0_18px_45px_rgba(15,23,42,0.14)]
            animate-in
            fade-in
            slide-in-from-top-1
            duration-150
          "
        >
          <div className="max-h-64 overflow-y-auto">
            {locations.map((location) => {
              const selected =
                location.name === value;

              return (
                <button
                  key={location.name}
                  type="button"
                  onClick={() => {
                    onChange(
                      location.name as LocationName
                    );
                    setOpen(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-sm
                    transition-all
                    duration-150
                    ${
                      selected
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${
                        selected
                          ? "bg-[var(--primary)] text-white"
                          : "bg-slate-100 text-slate-400"
                      }
                    `}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 flex-1 truncate font-medium">
                    {location.name}
                  </span>

                  {selected && (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   COMPONENT
============================================================ */

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] =
    useState<FormStatus>({
      type: "",
      message: "",
    });

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const [messageLength, setMessageLength] =
    useState(0);

  const [vehicle, setVehicle] =
    useState<VehicleName | "">("");

  const [passengers, setPassengers] =
    useState("");

  const [pickup, setPickup] =
    useState<LocationName | "">("");

  const [drop, setDrop] =
    useState<LocationName | "">("");

  const [tripType, setTripType] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [distanceKm, setDistanceKm] =
    useState<number | null>(null);

  const [estimatedFare, setEstimatedFare] =
    useState<number | null>(null);

  const [calculatingFare, setCalculatingFare] =
    useState(false);

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
     AUTO CLEAR TOAST
  ========================================================== */

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [toast]);

  /* ==========================================================
     PASSENGER OPTIONS
  ========================================================== */

  const passengerOptions = useMemo(() => {
    if (!vehicle) {
      return [1, 2, 3, 4, 5, 6];
    }

    return Array.from(
      {
        length: Math.min(
          VEHICLES[vehicle].capacity,
          6
        ),
      },
      (_, index) => index + 1
    );
  }, [vehicle]);

  /* ==========================================================
     TOAST
  ========================================================== */

  function showToast(
    type: "success" | "error",
    message: string
  ) {
    setToast({
      type,
      message,
    });
  }

  /* ==========================================================
     HAVERSINE
  ========================================================== */

  function calculateDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number
  ) {
    const earthRadius = 6371;

    const lat1 =
      (latitude1 * Math.PI) / 180;

    const lat2 =
      (latitude2 * Math.PI) / 180;

    const deltaLat =
      ((latitude2 - latitude1) * Math.PI) /
      180;

    const deltaLon =
      ((longitude2 - longitude1) * Math.PI) /
      180;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return earthRadius * c;
  }

  /* ==========================================================
     FIND LOCATION
  ========================================================== */

  function getLocation(
    locationName: string
  ) {
    return LOCATIONS.find(
      (location) =>
        location.name === locationName
    );
  }

  /* ==========================================================
     RESET FARE
  ========================================================== */

  useEffect(() => {
    setEstimatedFare(null);
    setDistanceKm(null);
  }, [
    pickup,
    drop,
    vehicle,
    tripType,
  ]);

  /* ==========================================================
     VEHICLE CHANGE
  ========================================================== */

  useEffect(() => {
    if (!vehicle) {
      setPassengers("");
      return;
    }

    const capacity =
      VEHICLES[vehicle].capacity;

    if (
      passengers &&
      Number(passengers) > capacity
    ) {
      setPassengers("");
    }
  }, [vehicle, passengers]);

  /* ==========================================================
     CALCULATE FARE
  ========================================================== */

  function calculateFare() {
    setStatus({
      type: "",
      message: "",
    });

    setToast(null);

    if (!pickup) {
      const message =
        "Please select a pickup location.";

      setStatus({
        type: "error",
        message,
      });

      showToast("error", message);
      return;
    }

    if (!drop) {
      const message =
        "Please select a drop location.";

      setStatus({
        type: "error",
        message,
      });

      showToast("error", message);
      return;
    }

    if (pickup === drop) {
      const message =
        "Pickup and drop locations cannot be the same.";

      setStatus({
        type: "error",
        message,
      });

      setEstimatedFare(null);
      setDistanceKm(null);

      showToast("error", message);
      return;
    }

    if (!vehicle) {
      const message =
        "Please select a vehicle.";

      setStatus({
        type: "error",
        message,
      });

      showToast("error", message);
      return;
    }

    if (!passengers) {
      const message =
        "Please select the number of passengers.";

      setStatus({
        type: "error",
        message,
      });

      showToast("error", message);
      return;
    }

    const pickupLocation =
      getLocation(pickup);

    const dropLocation =
      getLocation(drop);

    if (
      !pickupLocation ||
      !dropLocation
    ) {
      const message =
        "Unable to find the selected locations.";

      setStatus({
        type: "error",
        message,
      });

      showToast("error", message);
      return;
    }

    setCalculatingFare(true);

    window.setTimeout(() => {
      try {
        const straightDistance =
          calculateDistance(
            pickupLocation.latitude,
            pickupLocation.longitude,
            dropLocation.latitude,
            dropLocation.longitude
          );

        const roadDistance =
          straightDistance * 1.2;

        const calculatedDistance =
          Number(
            roadDistance.toFixed(1)
          );

        const rate =
          VEHICLES[vehicle].rate;

        let fare =
          calculatedDistance * rate;

        if (
          tripType === "Round Trip"
        ) {
          fare *= 2;
        }

        const finalFare =
          Math.round(fare);

        setDistanceKm(
          calculatedDistance
        );

        setEstimatedFare(
          finalFare
        );

        const successMessage =
          "Estimated fare calculated successfully.";

        setStatus({
          type: "success",
          message: successMessage,
        });

        showToast(
          "success",
          successMessage
        );
      } catch (error) {
        console.error(
          "Fare calculation error:",
          error
        );

        setDistanceKm(null);
        setEstimatedFare(null);

        const errorMessage =
          "Unable to calculate the fare. Please try again.";

        setStatus({
          type: "error",
          message: errorMessage,
        });

        showToast(
          "error",
          errorMessage
        );
      } finally {
        setCalculatingFare(false);
      }
    }, 300);
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  function showError(
    message: string
  ) {
    setStatus({
      type: "error",
      message,
    });

    showToast(
      "error",
      message
    );

    setLoading(false);
  }

  /* ==========================================================
     SUCCESS
  ========================================================== */

  function showSuccess(
    message: string
  ) {
    setStatus({
      type: "success",
      message,
    });

    showToast(
      "success",
      message
    );
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

    setToast(null);

    const formData =
      new FormData(form);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const message = String(
      formData.get("message") || ""
    ).trim();

    if (name.length < 2) {
      showError(
        "Please enter a valid name."
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showError(
        "Please enter a valid email address."
      );
      return;
    }

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

    if (!pickup) {
      showError(
        "Please select a pickup location."
      );
      return;
    }

    if (!drop) {
      showError(
        "Please select a drop location."
      );
      return;
    }

    if (pickup === drop) {
      showError(
        "Pickup and drop locations cannot be the same."
      );
      return;
    }

    if (!tripType) {
      showError(
        "Please select a trip type."
      );
      return;
    }

    if (!vehicle) {
      showError(
        "Please select a vehicle."
      );
      return;
    }

    const passengerCount =
      Number(passengers);

    if (
      !passengers ||
      !Number.isInteger(
        passengerCount
      ) ||
      passengerCount < 1 ||
      passengerCount > 6
    ) {
      showError(
        "Please select between 1 and 6 passengers."
      );
      return;
    }

    if (!paymentMethod) {
      showError(
        "Please select a payment method."
      );
      return;
    }

    if (
      distanceKm === null ||
      estimatedFare === null
    ) {
      showError(
        "Please calculate the estimated fare before submitting."
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

    const data = {
      bookingType: "contact-enquiry",
      name,
      email,
      phone,
      pickup,
      drop,
      tripType,
      passengers: passengerCount,
      vehicleType: vehicle,
      distanceKm,
      estimatedFare,
      paymentMethod,
      subject: tripType,
      message,
    };

    setLoading(true);

    const controller =
      new AbortController();

    const timeout =
      window.setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);

    try {
      const response =
        await fetch("/api/email", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Accept:
              "application/json",
          },
          body:
            JSON.stringify(data),
          signal:
            controller.signal,
        });

      let result: ApiResponse = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to send your booking."
        );
      }

      if (
        result.success === false
      ) {
        throw new Error(
          result.error ||
            "Unable to send your booking."
        );
      }

      showSuccess(
        result.message ||
          "Your booking request has been sent successfully."
      );

      form.reset();

      setVehicle("");
      setPassengers("");
      setPickup("");
      setDrop("");
      setTripType("");
      setPaymentMethod("");
      setDistanceKm(null);
      setEstimatedFare(null);
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

      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        showError(
          "The request took too long. Please try again."
        );
        return;
      }

      showError(
        error instanceof Error
          ? error.message
          : "Unable to send your booking. Please try again."
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
        relative
        w-full
        overflow-visible
        rounded-[28px]
        border
        border-slate-200
        bg-white
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
      "
    >
      {/* ======================================================
          TOAST
      ======================================================= */}

      {toast && (
        <div
          className="
            fixed
            right-4
            top-5
            z-[9999]
            w-[calc(100%-2rem)]
            max-w-sm
            sm:right-6
            sm:top-6
          "
          role="alert"
          aria-live="assertive"
        >
          <div
            className={`
              flex
              items-start
              gap-3
              rounded-2xl
              border
              bg-white
              px-4
              py-4
              shadow-[0_15px_40px_rgba(15,23,42,0.16)]
              ${
                toast.type === "success"
                  ? "border-green-200"
                  : "border-red-200"
              }
            `}
          >
            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${
                  toast.type === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }
              `}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`
                  text-sm
                  font-bold
                  ${
                    toast.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }
                `}
              >
                {toast.type === "success"
                  ? "Success"
                  : "Attention"}
              </p>

              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setToast(null)
              }
              aria-label="Close notification"
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition-colors
                hover:bg-slate-100
                hover:text-slate-700
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================
          TOP BRAND LINE
      ======================================================= */}

      <div
        className="
          h-1.5
          w-full
          rounded-t-[28px]
          bg-gradient-to-r
          from-[var(--primary)]
          via-[#2563a6]
          to-[var(--secondary)]
        "
      />

      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="
          border-b
          border-slate-100
          bg-gradient-to-br
          from-white
          via-white
          to-slate-50
          px-5
          py-7
          sm:px-8
          lg:px-10
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                mb-2
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[var(--primary)]/10
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[var(--primary)]
              "
            >
              <Navigation className="h-3.5 w-3.5" />

              SBS Taxi Booking
            </div>

            <h2
              id="contact-form-title"
              className="
                font-[family-name:var(--font-instrument)]
                text-3xl
                font-normal
                tracking-tight
                text-[var(--text-primary)]
                sm:text-4xl
              "
            >
              Book Your Ride
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
              Select your trip details and get
              your fare estimate instantly.
            </p>
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]/10
              "
            >
              <Clock3 className="h-5 w-5 text-[var(--primary)]" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Support
              </p>

              <p className="text-sm font-bold text-[var(--text-secondary)]">
                24/7 Available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          FORM
      ======================================================= */}

      <div className="p-5 sm:p-8 lg:p-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-7"
        >
          {/* ==================================================
              CUSTOMER DETAILS
          =================================================== */}

          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[var(--text-secondary)]">
                Customer Details
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Tell us who will be travelling.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* NAME */}

              <div>
                <label
                  htmlFor="name"
                  className={labelClassName}
                >
                  <User className="h-3.5 w-3.5 text-[var(--primary)]" />

                  Full Name

                  <span className="text-[var(--primary)]">
                    *
                  </span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
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
                  <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />

                  Email Address

                  <span className="text-[var(--primary)]">
                    *
                  </span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  maxLength={120}
                  autoComplete="email"
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
                  <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />

                  Phone Number

                  <span className="text-[var(--primary)]">
                    *
                  </span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  required
                  maxLength={20}
                  inputMode="tel"
                  autoComplete="tel"
                  disabled={loading}
                  className={inputClassName}
                />
              </div>

              {/* TRIP TYPE — OPPOSITE PHONE */}

              <div>
                <label
                  htmlFor="tripType"
                  className={labelClassName}
                >
                  <Navigation className="h-3.5 w-3.5 text-[var(--primary)]" />

                  Trip Type

                  <span className="text-[var(--primary)]">
                    *
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="tripType"
                    name="tripType"
                    value={tripType}
                    onChange={(e) =>
                      setTripType(
                        e.target.value
                      )
                    }
                    required
                    disabled={loading}
                    className={`
                      ${inputClassName}
                      appearance-none
                      pr-11
                    `}
                  >
                    <option value="">
                      Select trip type
                    </option>

                    <option value="One Way Trip">
                      One Way Trip
                    </option>

                    <option value="Round Trip">
                      Round Trip
                    </option>

                    <option value="Local City Ride">
                      Local City Ride
                    </option>

                    <option value="Airport Transfer">
                      Airport Transfer
                    </option>

                    <option value="Outstation Trip">
                      Outstation Trip
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
                      text-slate-400
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              TRIP DETAILS
          =================================================== */}

          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[var(--text-secondary)]">
                Trip Details
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Choose your pickup and destination.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* PICKUP */}

              <LocationDropdown
                label="Pickup Location"
                value={pickup}
                placeholder="Choose pickup location"
                locations={LOCATIONS}
                disabled={loading}
                onChange={setPickup}
                icon={
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                }
              />

              {/* DROP */}

              <LocationDropdown
                label="Drop Location"
                value={drop}
                placeholder="Choose drop location"
                locations={LOCATIONS}
                disabled={loading}
                onChange={setDrop}
                icon={
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                }
              />
            </div>
          </div>

          {/* ==================================================
              VEHICLE
          =================================================== */}

          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[var(--text-secondary)]">
                Choose Your Vehicle
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Select a vehicle according to your passenger count.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* VEHICLE */}

              <div>
                <label
                  htmlFor="vehicleType"
                  className={labelClassName}
                >
                  <CarFront className="h-3.5 w-3.5 text-[var(--primary)]" />

                  Vehicle

                  <span className="text-[var(--primary)]">
                    *
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={vehicle}
                    onChange={(e) =>
                      setVehicle(
                        e.target.value as VehicleName
                      )
                    }
                    required
                    disabled={loading}
                    className={`
                      ${inputClassName}
                      appearance-none
                      pr-11
                    `}
                  >
                    <option value="">
                      Select vehicle
                    </option>

                    {Object.entries(
                      VEHICLES
                    ).map(
                      ([name, data]) => (
                        <option
                          key={name}
                          value={name}
                        >
                          {name} — ₹
                          {data.rate}/km
                        </option>
                      )
                    )}
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
                      text-slate-400
                    "
                  />
                </div>
              </div>

              {/* PASSENGERS */}

              <div>
                <label
                  htmlFor="passengers"
                  className={labelClassName}
                >
                  <Users className="h-3.5 w-3.5 text-[var(--primary)]" />

                  Passengers

                  <span className="text-[var(--primary)]">
                    *
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="passengers"
                    name="passengers"
                    value={passengers}
                    onChange={(e) =>
                      setPassengers(
                        e.target.value
                      )
                    }
                    required
                    disabled={loading}
                    className={`
                      ${inputClassName}
                      appearance-none
                      pr-11
                    `}
                  >
                    <option value="">
                      Select passengers
                    </option>

                    {passengerOptions.map(
                      (count) => (
                        <option
                          key={count}
                          value={count}
                        >
                          {count}{" "}
                          {count === 1
                            ? "Passenger"
                            : "Passengers"}
                        </option>
                      )
                    )}
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
                      text-slate-400
                    "
                  />
                </div>

                {vehicle && (
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Maximum{" "}
                    {Math.min(
                      VEHICLES[vehicle]
                        .capacity,
                      6
                    )}{" "}
                    passengers
                  </p>
                )}
              </div>

              {/* PAYMENT */}

              <div>
                <label
                  htmlFor="paymentMethod"
                  className={labelClassName}
                >
                  <CreditCard className="h-3.5 w-3.5 text-[var(--primary)]" />

                  Payment Method

                  <span className="text-[var(--primary)]">
                    *
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    required
                    disabled={loading}
                    className={`
                      ${inputClassName}
                      appearance-none
                      pr-11
                    `}
                  >
                    <option value="">
                      Select payment method
                    </option>

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Card">
                      Card
                    </option>

                    <option value="Online Payment">
                      Online Payment
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
                      text-slate-400
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              FARE CALCULATOR
          =================================================== */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                p-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--primary)]
                    text-white
                  "
                >
                  <CircleDollarSign className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Fare Estimate
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-[var(--text-secondary)]">
                    {vehicle
                      ? `₹${VEHICLES[vehicle].rate}/km · ${vehicle}`
                      : "Select a vehicle to continue"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={calculateFare}
                disabled={
                  loading ||
                  calculatingFare
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {calculatingFare ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <CircleDollarSign className="h-4 w-4" />
                    Calculate Estimate
                  </>
                )}
              </button>
            </div>

            {estimatedFare !== null && (
              <div
                className="
                  border-t
                  border-slate-200
                  bg-white
                  px-5
                  py-5
                "
              >
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Estimated Fare
                    </p>

                    <p className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--primary)]">
                      ₹
                      {estimatedFare.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Distance: {distanceKm} km
                    </p>

                    {tripType ===
                      "Round Trip" && (
                      <p className="mt-1 text-[10px] font-medium text-slate-400">
                        Round trip fare included
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      Selected Vehicle
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {vehicle}
                    </p>

                    <p className="mt-1 max-w-[180px] text-[10px] text-slate-400">
                      Final fare may vary based on actual route & tolls.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ==================================================
              MESSAGE
          =================================================== */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="message"
                className={`
                  ${labelClassName}
                  mb-0
                `}
              >
                <MessageSquare className="h-3.5 w-3.5 text-[var(--primary)]" />

                Additional Message

                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <span className="text-[10px] text-slate-400">
                {messageLength}/
                {MAX_MESSAGE_LENGTH}
              </span>
            </div>

            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Any special travel requirements?"
              maxLength={
                MAX_MESSAGE_LENGTH
              }
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

          {/* ==================================================
              STATUS
          =================================================== */}

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

              <p className="leading-5">
                {status.message}
              </p>
            </div>
          )}

          {/* ==================================================
              SUBMIT
          =================================================== */}

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
              py-4
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
              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Booking...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                Confirm Booking Request
              </>
            )}
          </button>

          {/* ==================================================
              PRIVACY
          =================================================== */}

          <p
            className="
              text-center
              font-[family-name:var(--font-jakarta)]
              text-[11px]
              leading-5
              text-slate-400
            "
          >
            Your information is secure and will only be used to
            process your SBS Taxi booking.
          </p>
        </form>
      </div>
    </section>
  );
}