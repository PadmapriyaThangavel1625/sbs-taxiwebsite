
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  MessageCircle,
  Mail,
  Phone,
  Car,
  IndianRupee,
  ChevronDown,
  X,
  Plus,
  Route,
} from "lucide-react";

/* =====================================================
TYPES
===================================================== */

type TempleType = "Nearby" | "Outstation";

type Temple = {
  id: string;
  name: string;
  location: string;
  fare: number;
  distance: string;
  type: TempleType;
};

type SelectedDestination = {
  id: string;
  name: string;
  location: string;
  fare: number;
  distance: string;
  type: TempleType;
  custom: boolean;
};

type Vehicle = {
  name: string;
  seats: string;
  multiplier: number;
};

type TripPackage = {
  name: string;
  description: string;
  multiplier: number;
};

/* =====================================================
TEMPLE DATA
===================================================== */

const TEMPLES: Temple[] = [
  {
    id: "bhavani",
    name: "Bhavani Sangameswarar Temple",
    location: "Bhavani",
    fare: 1200,
    distance: "20 km approx.",
    type: "Nearby",
  },
  {
    id: "kodumudi",
    name: "Kodumudi Magudeswarar Temple",
    location: "Kodumudi",
    fare: 1400,
    distance: "40 km approx.",
    type: "Nearby",
  },
  {
    id: "bannari",
    name: "Bannari Amman Temple",
    location: "Bannari",
    fare: 2200,
    distance: "75 km approx.",
    type: "Nearby",
  },
  {
    id: "eachanari",
    name: "Eachanari Vinayagar Temple",
    location: "Coimbatore",
    fare: 2400,
    distance: "90 km approx.",
    type: "Nearby",
  },
  {
    id: "perur",
    name: "Perur Pateeswarar Temple",
    location: "Coimbatore",
    fare: 2500,
    distance: "95 km approx.",
    type: "Nearby",
  },
  {
    id: "marudamalai",
    name: "Marudamalai Murugan Temple",
    location: "Coimbatore",
    fare: 2600,
    distance: "100 km approx.",
    type: "Nearby",
  },
  {
    id: "palani",
    name: "Palani Murugan Temple",
    location: "Palani",
    fare: 3200,
    distance: "120 km approx.",
    type: "Outstation",
  },
  {
    id: "madurai",
    name: "Meenakshi Amman Temple",
    location: "Madurai",
    fare: 5500,
    distance: "170 km approx.",
    type: "Outstation",
  },
  {
    id: "srirangam",
    name: "Sri Ranganathaswamy Temple",
    location: "Srirangam",
    fare: 5000,
    distance: "180 km approx.",
    type: "Outstation",
  },
  {
    id: "thanjavur",
    name: "Brihadeeswarar Temple",
    location: "Thanjavur",
    fare: 6500,
    distance: "250 km approx.",
    type: "Outstation",
  },
  {
    id: "kumbakonam",
    name: "Kumbakonam Temple Tour",
    location: "Kumbakonam",
    fare: 7000,
    distance: "270 km approx.",
    type: "Outstation",
  },
  {
    id: "guruvayur",
    name: "Guruvayur Sri Krishna Temple",
    location: "Guruvayur",
    fare: 7500,
    distance: "280 km approx.",
    type: "Outstation",
  },
  {
    id: "rameswaram",
    name: "Ramanathaswamy Temple",
    location: "Rameswaram",
    fare: 8500,
    distance: "330 km approx.",
    type: "Outstation",
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji Temple",
    location: "Tirupati",
    fare: 12000,
    distance: "430 km approx.",
    type: "Outstation",
  },
];

/* =====================================================
VEHICLES
===================================================== */
const VEHICLES: Vehicle[] = [
  {
    name: "MINI",
    seats: "4+1 Seater",
    multiplier: 0.9,
  },
  {
    name: "SEDAN",
    seats: "4+1 Seater",
    multiplier: 1,
  },
  {
    name: "MUV",
    seats: "8+1 Seater",
    multiplier: 1.15,
  },
  {
    name: "SUV",
    seats: "5+1 Seater",
    multiplier: 1.25,
  },
  {
    name: "MUV_PLUS",
    seats: "9+1 Seater",
    multiplier: 1.4,
  },
  {
    name: "VAN",
    seats: "7+1 Seater",
    multiplier: 1.75,
  },
];

/* =====================================================
PACKAGES
===================================================== */

const PACKAGES: TripPackage[] = [
  {
    name: "One Way",
    description: "One-way temple drop",
    multiplier: 0.65,
  },
  {
    name: "Round Trip",
    description: "Pickup + temples + return",
    multiplier: 1,
  },
  {
    name: "Multi Day",
    description: "Multiple temple tour",
    multiplier: 1.8,
  },
];

/* =====================================================
COMPONENT
===================================================== */

export default function TempleTripBooking() {
  const [category, setCategory] =
    useState<TempleType>("Nearby");

  const [selectedDestinations, setSelectedDestinations] =
    useState<SelectedDestination[]>([]);

  const [customDestination, setCustomDestination] =
    useState("");

  const [pickup, setPickup] = useState("Erode");

  const [date, setDate] = useState("");

  const [passengers, setPassengers] = useState("1");

  const [tripPackage, setTripPackage] =
    useState("Round Trip");

  const [days, setDays] = useState("1");

  const [vehicle, setVehicle] = useState("Sedan");

  const [isSending, setIsSending] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  /* =====================================================
  FILTERED TEMPLES
  ===================================================== */

  const filteredTemples = useMemo(() => {
    return TEMPLES.filter(
      (temple) => temple.type === category
    );
  }, [category]);

  /* =====================================================
  SELECTED VEHICLE
  ===================================================== */

  const selectedVehicle = VEHICLES.find(
    (item) => item.name === vehicle
  );

  /* =====================================================
  SELECTED PACKAGE
  ===================================================== */

  const selectedPackage = PACKAGES.find(
    (item) => item.name === tripPackage
  );

  /* =====================================================
  SELECTED IDS
  ===================================================== */

  const selectedIds = useMemo(() => {
    return new Set(
      selectedDestinations.map(
        (item) => item.id
      )
    );
  }, [selectedDestinations]);

  /* =====================================================
  BASE FARE
  ===================================================== */

  const baseTempleFare = useMemo(() => {
    return selectedDestinations.reduce(
      (total, destination) =>
        total + destination.fare,
      0
    );
  }, [selectedDestinations]);

  /* =====================================================
  DAYS
  ===================================================== */

  const numberOfDays = Math.max(
    1,
    Number(days) || 1
  );

  const dayMultiplier =
    1 + (numberOfDays - 1) * 0.65;

  /* =====================================================
  FINAL FARE
  ===================================================== */

  const calculatedFare = useMemo(() => {
    if (selectedDestinations.length === 0) {
      return 0;
    }

    const vehicleMultiplier =
      selectedVehicle?.multiplier ?? 1;

    const packageMultiplier =
      selectedPackage?.multiplier ?? 1;

    return Math.round(
      baseTempleFare *
        vehicleMultiplier *
        packageMultiplier *
        dayMultiplier
    );
  }, [
    selectedDestinations.length,
    baseTempleFare,
    selectedVehicle,
    selectedPackage,
    dayMultiplier,
  ]);

  /* =====================================================
  ADD LISTED TEMPLE
  ===================================================== */

  const addTemple = (temple: Temple) => {
    if (selectedIds.has(temple.id)) {
      return;
    }

    const newDestination: SelectedDestination = {
      id: temple.id,
      name: temple.name,
      location: temple.location,
      fare: temple.fare,
      distance: temple.distance,
      type: temple.type,
      custom: false,
    };

    setSelectedDestinations(
      (previous) => [
        ...previous,
        newDestination,
      ]
    );

    setMessage("");
    setMessageType("");
  };

  /* =====================================================
  REMOVE TEMPLE
  ===================================================== */

  const removeTemple = (id: string) => {
    setSelectedDestinations(
      (previous) =>
        previous.filter(
          (item) => item.id !== id
        )
    );
  };

  /* =====================================================
  ADD CUSTOM TEMPLE
  ===================================================== */

  const addCustomTemple = () => {
    const name = customDestination.trim();

    if (!name) {
      return;
    }

    const alreadyExists =
      selectedDestinations.some(
        (item) =>
          item.name.toLowerCase() ===
          name.toLowerCase()
      );

    if (alreadyExists) {
      setMessage(
        "This temple is already selected."
      );
      setMessageType("error");
      return;
    }

    const newDestination: SelectedDestination = {
      id: `custom-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`,
      name,
      location: "Custom Destination",
      fare: 2500,
      distance: "Route to confirm",
      type: "Outstation",
      custom: true,
    };

    setSelectedDestinations(
      (previous) => [
        ...previous,
        newDestination,
      ]
    );

    setCustomDestination("");
    setMessage("");
    setMessageType("");
  };

  /* =====================================================
  ENTER KEY
  ===================================================== */

  const handleCustomKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomTemple();
    }
  };

  /* =====================================================
  CATEGORY
  ===================================================== */

  const changeCategory = (
    value: TempleType
  ) => {
    setCategory(value);
  };

  /* =====================================================
  PACKAGE
  ===================================================== */

  const changePackage = (
    value: string
  ) => {
    setTripPackage(value);

    if (
      value === "Multi Day" &&
      Number(days) < 2
    ) {
      setDays("2");
    }
  };

  /* =====================================================
  CANCEL
  ===================================================== */

  const cancelBooking = () => {
    setCategory("Nearby");
    setSelectedDestinations([]);
    setCustomDestination("");
    setPickup("Erode");
    setDate("");
    setPassengers("1");
    setTripPackage("Round Trip");
    setDays("1");
    setVehicle("Sedan");
    setMessage("");
    setMessageType("");
    setIsSending(false);
  };

  /* =====================================================
  VALIDATION
  ===================================================== */

  const validate = () => {
    if (!pickup.trim()) {
      setMessage(
        "Please enter pickup location."
      );
      setMessageType("error");
      return false;
    }

    if (
      selectedDestinations.length === 0
    ) {
      setMessage(
        "Please select at least one temple or destination."
      );
      setMessageType("error");
      return false;
    }

    if (!date) {
      setMessage(
        "Please select travel date."
      );
      setMessageType("error");
      return false;
    }

    if (!days) {
      setMessage(
        "Please select number of days."
      );
      setMessageType("error");
      return false;
    }

    if (!vehicle) {
      setMessage(
        "Please select a vehicle."
      );
      setMessageType("error");
      return false;
    }

    return true;
  };

  /* =====================================================
  BOOKING DATA
  ===================================================== */

  const getBookingData = () => {
    return {
      bookingType: "temple-tour",

      pickup,

      destinations:
        selectedDestinations.map(
          (destination) => ({
            id: destination.id,
            name: destination.name,
            location:
              destination.location,
            fare: destination.fare,
            distance:
              destination.distance,
            type: destination.type,
            custom:
              destination.custom,
          })
        ),

      date,

      days: numberOfDays,

      passengers: Number(passengers),

      vehicle:
        selectedVehicle?.name ||
        vehicle,

      seats:
        selectedVehicle?.seats || "",

      tripPackage,

      baseFare: baseTempleFare,

      totalFare: calculatedFare,

      category,

      totalTemples:
        selectedDestinations.length,
    };
  };

  /* =====================================================
  BOOKING MESSAGE
  ===================================================== */

  const bookingMessage = () => {
    const templeList =
      selectedDestinations
        .map(
          (destination, index) =>
            `${index + 1}. ${
              destination.name
            } - ${
              destination.location
            } - Base Fare ₹${destination.fare.toLocaleString(
              "en-IN"
            )}${
              destination.custom
                ? " (Custom Destination)"
                : ""
            }`
        )
        .join("\n");

    return `SBS TAXI - TEMPLE TOUR BOOKING

Pickup Location:
${pickup}

Selected Temple / Destinations:
${templeList}

Total Temples:
${selectedDestinations.length}

Travel Date:
${date}

Trip Package:
${tripPackage}

Number of Days:
${days}

Passengers:
${passengers}

Vehicle:
${selectedVehicle?.name}

Seating:
${selectedVehicle?.seats}

Base Temple Fare:
₹${baseTempleFare.toLocaleString(
      "en-IN"
    )}

Estimated Total Fare:
₹${calculatedFare.toLocaleString(
      "en-IN"
    )}

Please confirm route, availability and final fare.

Thank you,
SBS Taxi`;
  };

  /* =====================================================
  BOOKING NOW - API EMAIL
  ===================================================== */

  const bookingNow = async () => {
    if (!validate()) {
      return;
    }

    setIsSending(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(
        "/api/email",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            getBookingData()
          ),
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Unable to send booking."
        );
      }

      setMessage(
        "Booking request sent successfully! We will contact you to confirm the route and final fare."
      );

      setMessageType("success");
    } catch (error) {
      console.error(
        "Temple booking error:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send booking. Please try again."
      );

      setMessageType("error");
    } finally {
      setIsSending(false);
    }
  };

  /* =====================================================
  WHATSAPP
  ===================================================== */

  const sendWhatsApp = () => {
    if (!validate()) {
      return;
    }

    const number =
      "919843544844";

    const messageText =
      encodeURIComponent(
        bookingMessage()
      );

    window.open(
      `https://wa.me/${number}?text=${messageText}`,
      "_blank"
    );
  };

  /* =====================================================
  SMS
  ===================================================== */

  const sendSMS = () => {
    if (!validate()) {
      return;
    }

    const number =
      "+919843544844";

    const body =
      encodeURIComponent(
        bookingMessage()
      );

    window.location.href =
      `sms:${number}?body=${body}`;
  };

  /* =====================================================
  TODAY
  ===================================================== */

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  /* =====================================================
  UI
  ===================================================== */

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl">
            🛕
          </div>

          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Temple Tour Booking
            </h2>

            <p className="mt-1 text-xs text-orange-50 sm:text-sm">
              Select multiple temples and create
              your complete temple tour
            </p>
          </div>

        </div>
      </div>

      <div className="p-5 sm:p-6">

        {/* MESSAGE */}

        {message && (
          <div
            className={`mb-5 rounded-xl border p-4 text-sm font-medium ${
              messageType === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* SELECTED DESTINATIONS */}

        {selectedDestinations.length > 0 && (
          <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:p-5">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <Route
                    size={18}
                    className="text-orange-600"
                  />
                  Your Temple Tour
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedDestinations.length}{" "}
                  temple
                  {selectedDestinations.length >
                  1
                    ? "s"
                    : ""}{" "}
                  selected
                </p>
              </div>

              <div className="rounded-xl bg-white px-4 py-2 text-right shadow-sm">

                <p className="text-[10px] text-slate-400">
                  Estimated Total
                </p>

                <p className="flex items-center text-lg font-extrabold text-orange-600">

                  <IndianRupee
                    size={17}
                  />

                  {calculatedFare.toLocaleString(
                    "en-IN"
                  )}

                </p>

              </div>

            </div>

            <div className="mt-4 space-y-2">

              {selectedDestinations.map(
                (
                  destination,
                  index
                ) => (

                  <div
                    key={
                      destination.id
                    }
                    className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="break-words text-sm font-bold text-slate-900">
                        {
                          destination.name
                        }
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {
                          destination.location
                        }
                        {" • "}
                        {
                          destination.custom
                            ? "Custom destination"
                            : destination.distance
                        }
                      </p>

                    </div>

                    <div className="shrink-0 text-right">

                      <p className="text-xs font-bold text-orange-600">
                        {destination.custom
                          ? `₹${destination.fare.toLocaleString(
                              "en-IN"
                            )} est.`
                          : `₹${destination.fare.toLocaleString(
                              "en-IN"
                            )}`}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeTemple(
                          destination.id
                        )
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50"
                      aria-label={`Remove ${destination.name}`}
                    >
                      <X size={16} />
                    </button>

                  </div>

                )
              )}

            </div>

          </div>
        )}

        {/* CATEGORY */}

        <div>
          <label className="mb-3 block text-sm font-bold text-slate-900">
            Choose Temple Tour
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() =>
                changeCategory(
                  "Nearby"
                )
              }
              className={`rounded-xl border p-4 text-left transition ${
                category === "Nearby"
                  ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                  : "border-slate-200 bg-white hover:border-orange-300"
              }`}
            >

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                  🙏
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Nearby Temples
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Erode & nearby destinations
                  </p>
                </div>

              </div>

            </button>

            <button
              type="button"
              onClick={() =>
                changeCategory(
                  "Outstation"
                )
              }
              className={`rounded-xl border p-4 text-left transition ${
                category ===
                "Outstation"
                  ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                  : "border-slate-200 bg-white hover:border-orange-300"
              }`}
            >

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                  🚕
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Outstation Tours
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Long-distance temple trips
                  </p>
                </div>

              </div>

            </button>

          </div>
        </div>

        {/* TEMPLE LIST */}

        <div className="mt-6">

          <div className="mb-3 flex items-center justify-between">

            <label className="text-sm font-bold text-slate-900">
              Add Temples
            </label>

            <span className="text-xs text-slate-400">
              Click to add
            </span>

          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {filteredTemples.map(
              (temple) => {

                const isSelected =
                  selectedIds.has(
                    temple.id
                  );

                return (
                  <button
                    key={temple.id}
                    type="button"
                    onClick={() =>
                      isSelected
                        ? removeTemple(
                            temple.id
                          )
                        : addTemple(
                            temple
                          )
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-slate-200 bg-white hover:border-orange-400 hover:bg-orange-50/50"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isSelected
                            ? "bg-green-500 text-white"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {isSelected ? (
                          <span className="text-sm font-bold">
                            ✓
                          </span>
                        ) : (
                          <MapPin
                            size={18}
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-bold text-slate-900">
                          {temple.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {temple.location}
                          {" • "}
                          {temple.distance}
                        </p>

                      </div>

                      <div className="shrink-0 text-right">

                        <p className="text-[10px] text-slate-400">
                          Fare
                        </p>

                        <p className="flex items-center text-sm font-extrabold text-orange-600">

                          <IndianRupee
                            size={13}
                          />

                          {temple.fare.toLocaleString(
                            "en-IN"
                          )}

                        </p>

                        <p
                          className={`mt-1 text-[10px] font-bold ${
                            isSelected
                              ? "text-green-600"
                              : "text-orange-500"
                          }`}
                        >
                          {isSelected
                            ? "Added"
                            : "Add"}
                        </p>

                      </div>

                    </div>

                  </button>
                );
              }
            )}

          </div>
        </div>

        {/* CUSTOM DESTINATION */}

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

          <label className="mb-2 block text-sm font-bold text-slate-800">
            Add Another Temple / Destination
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">

            <div className="relative flex-1">

              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                type="text"
                value={
                  customDestination
                }
                onChange={(event) =>
                  setCustomDestination(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleCustomKeyDown
                }
                placeholder="Example: Tiruchendur Murugan Temple"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <button
              type="button"
              onClick={
                addCustomTemple
              }
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
            >

              <Plus size={18} />

              Add Temple

            </button>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Add multiple custom temples one by one.
          </p>

        </div>

        {/* PICKUP + DATE */}

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-800">
              Pickup Location
            </label>

            <div className="relative">

              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500"
              />

              <input
                type="text"
                value={pickup}
                onChange={(event) =>
                  setPickup(
                    event.target.value
                  )
                }
                placeholder="Enter pickup location"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-800">
              Travel Date
            </label>

            <div className="relative">

              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500"
              />

              <input
                type="date"
                min={today}
                value={date}
                onChange={(event) =>
                  setDate(
                    event.target.value
                  )
                }
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

            </div>

          </div>

        </div>

        {/* PACKAGE */}

        <div className="mt-6">

          <label className="mb-3 block text-sm font-bold text-slate-800">
            Trip Package
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {PACKAGES.map(
              (item) => (

                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    changePackage(
                      item.name
                    )
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    tripPackage ===
                    item.name
                      ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                      : "border-slate-200 bg-white hover:border-orange-300"
                  }`}
                >

                  <p className="text-sm font-bold text-slate-900">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>

                </button>

              )
            )}

          </div>

        </div>

        {/* DAYS */}

        <div className="mt-6">

          <label className="mb-2 block text-sm font-bold text-slate-800">
            How Many Days?
          </label>

          <div className="relative">

            <select
              value={days}
              onChange={(event) =>
                setDays(
                  event.target.value
                )
              }
              className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm font-medium outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >

              {Array.from(
                { length: 15 },
                (_, index) => {
                  const day =
                    index + 1;

                  return (
                    <option
                      key={day}
                      value={day}
                    >
                      {day}{" "}
                      {day === 1
                        ? "Day"
                        : "Days"}
                    </option>
                  );
                }
              )}

            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

        </div>

        {/* VEHICLE */}

        <div className="mt-6">

          <label className="mb-2 block text-sm font-bold text-slate-800">
            Vehicle Type / Seater
          </label>

          <div className="relative">

            <Car
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-orange-500"
            />

            <select
              value={vehicle}
              onChange={(event) =>
                setVehicle(
                  event.target.value
                )
              }
              className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm font-medium outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >

              {VEHICLES.map(
                (item) => (
                  <option
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                    {" — "}
                    {item.seats}
                  </option>
                )
              )}

            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

        </div>

        {/* PASSENGERS */}

        <div className="mt-6">

          <label className="mb-2 block text-sm font-bold text-slate-800">
            Number of Passengers
          </label>

          <div className="relative">

            <Users
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-orange-500"
            />

            <select
              value={passengers}
              onChange={(event) =>
                setPassengers(
                  event.target.value
                )
              }
              className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >

              {Array.from(
                { length: 13 },
                (_, index) => {
                  const count =
                    index + 1;

                  return (
                    <option
                      key={count}
                      value={count}
                    >
                      {count}{" "}
                      {count === 1
                        ? "Passenger"
                        : "Passengers"}
                    </option>
                  );
                }
              )}

            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

        </div>

        {/* FARE BREAKDOWN */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <p className="text-sm font-extrabold text-slate-900">
            Fare Calculation
          </p>

          <div className="mt-4 space-y-3">

            <div className="flex justify-between gap-4 text-sm">

              <span className="text-slate-500">
                {selectedDestinations.length}{" "}
                temple
                {selectedDestinations.length >
                1
                  ? "s"
                  : ""}{" "}
                base fare
              </span>

              <span className="font-semibold text-slate-800">
                ₹
                {baseTempleFare.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            <div className="flex justify-between gap-4 text-sm">

              <span className="text-slate-500">
                Vehicle
              </span>

              <span className="font-semibold text-slate-800">
                {selectedVehicle?.name}
                {" / "}
                {selectedVehicle?.seats}
              </span>

            </div>

            <div className="flex justify-between gap-4 text-sm">

              <span className="text-slate-500">
                Trip package
              </span>

              <span className="font-semibold text-slate-800">
                {tripPackage}
              </span>

            </div>

            <div className="flex justify-between gap-4 text-sm">

              <span className="text-slate-500">
                Duration
              </span>

              <span className="font-semibold text-slate-800">
                {days}{" "}
                {Number(days) === 1
                  ? "Day"
                  : "Days"}
              </span>

            </div>

            <div className="border-t border-slate-200 pt-3">

              <div className="flex items-center justify-between">

                <span className="font-bold text-slate-900">
                  Estimated Total Fare
                </span>

                <span className="flex items-center text-2xl font-extrabold text-orange-600">

                  <IndianRupee
                    size={21}
                  />

                  {calculatedFare.toLocaleString(
                    "en-IN"
                  )}

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* CANCEL */}

        <button
          type="button"
          onClick={
            cancelBooking
          }
          disabled={isSending}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <X size={18} />

          Cancel Booking

        </button>

        {/* BOOKING NOW */}

        <button
          type="button"
          onClick={bookingNow}
          disabled={isSending}
          className="mt-3 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-extrabold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >

          <Mail size={19} />

          {isSending
            ? "Sending Booking..."
            : "Booking Now"}

        </button>

        {/* WHATSAPP + SMS */}

        <div className="mt-5">

          <p className="mb-3 text-center text-xs text-slate-500">
            Or send your booking through
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={
                sendWhatsApp
              }
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-bold text-white hover:bg-green-700"
            >

              <MessageCircle
                size={19}
              />

              WhatsApp

            </button>

            <button
              type="button"
              onClick={
                sendSMS
              }
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white hover:bg-black"
            >

              <Phone size={19} />

              SMS

            </button>

          </div>

        </div>

        {/* NOTE */}

        <div className="mt-5 rounded-xl bg-slate-50 p-4">

          <p className="text-center text-xs leading-5 text-slate-500">

            Temple fares shown above are estimated
            package fares. Custom destinations use
            an estimated starting fare. Final fare
            will be confirmed after checking the
            complete route, tolls, parking and
            vehicle availability.

          </p>

        </div>

      </div>
    </section>
  );
}
