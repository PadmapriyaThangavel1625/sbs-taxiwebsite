"use client";

import Image from "next/image";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Clock3,
  IndianRupee,
  MapPin,
  Navigation,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* ============================================================
   ANIMATIONS
============================================================ */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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

const cardAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

/* ============================================================
   VEHICLES
============================================================ */

const VEHICLES = [
  {
    id: "mini",
    name: "SBS MINI",
    subtitle: "Compact & economical",
    rate: 12,
  },
  {
    id: "sedan",
    name: "SBS SEDAN",
    subtitle: "Comfortable everyday ride",
    rate: 12.5,
  },
  {
    id: "suv",
    name: "SBS SUV",
    subtitle: "Premium family travel",
    rate: 17,
  },
  {
    id: "muv",
    name: "SBS MUV",
    subtitle: "Spacious group travel",
    rate: 18,
  },
  {
    id: "muv-plus",
    name: "SBS MUV+",
    subtitle: "Extra space & comfort",
    rate: 19,
  },
];

/* ============================================================
   LOCATIONS
============================================================ */

const LOCATIONS: Record<
  string,
  {
    name: string;
    lat: number;
    lng: number;
  }
> = {
  erode: {
    name: "Erode",
    lat: 11.341,
    lng: 77.7172,
  },

  bhavani: {
    name: "Bhavani",
    lat: 11.4455,
    lng: 77.6821,
  },

  perundurai: {
    name: "Perundurai",
    lat: 11.275,
    lng: 77.5875,
  },

  chithode: {
    name: "Chithode",
    lat: 11.369,
    lng: 77.6905,
  },

  gobichettipalayam: {
    name: "Gobichettipalayam",
    lat: 11.454,
    lng: 77.442,
  },

  gobi: {
    name: "Gobi",
    lat: 11.454,
    lng: 77.442,
  },

  sathyamangalam: {
    name: "Sathyamangalam",
    lat: 11.505,
    lng: 77.238,
  },

  anthiyur: {
    name: "Anthiyur",
    lat: 11.575,
    lng: 77.59,
  },

  kodumudi: {
    name: "Kodumudi",
    lat: 11.076,
    lng: 77.883,
  },

  modakurichi: {
    name: "Modakurichi",
    lat: 11.11,
    lng: 77.88,
  },

  sivagiri: {
    name: "Sivagiri",
    lat: 11.483,
    lng: 77.565,
  },

  salem: {
    name: "Salem",
    lat: 11.6643,
    lng: 78.146,
  },

  sankari: {
    name: "Sankari",
    lat: 11.477,
    lng: 77.869,
  },

  namakkal: {
    name: "Namakkal",
    lat: 11.2194,
    lng: 78.1677,
  },

  tiruchengode: {
    name: "Tiruchengode",
    lat: 11.38,
    lng: 77.894,
  },

  rasipuram: {
    name: "Rasipuram",
    lat: 11.46,
    lng: 78.19,
  },

  mettur: {
    name: "Mettur",
    lat: 11.786,
    lng: 77.8,
  },

  karur: {
    name: "Karur",
    lat: 10.9601,
    lng: 78.0766,
  },

  aravakurichi: {
    name: "Aravakurichi",
    lat: 10.77,
    lng: 78.0,
  },

  tiruppur: {
    name: "Tiruppur",
    lat: 11.1085,
    lng: 77.3411,
  },

  kangeyam: {
    name: "Kangeyam",
    lat: 11.005,
    lng: 77.56,
  },

  palladam: {
    name: "Palladam",
    lat: 10.99,
    lng: 77.29,
  },

  avinashi: {
    name: "Avinashi",
    lat: 11.192,
    lng: 77.268,
  },

  dharapuram: {
    name: "Dharapuram",
    lat: 10.738,
    lng: 77.532,
  },

  vellakoil: {
    name: "Vellakoil",
    lat: 10.938,
    lng: 77.717,
  },

  coimbatore: {
    name: "Coimbatore",
    lat: 11.0168,
    lng: 76.9558,
  },

  pollachi: {
    name: "Pollachi",
    lat: 10.662,
    lng: 77.006,
  },

  valparai: {
    name: "Valparai",
    lat: 10.326,
    lng: 76.951,
  },

  ooty: {
    name: "Ooty",
    lat: 11.4064,
    lng: 76.6932,
  },

  coonoor: {
    name: "Coonoor",
    lat: 11.353,
    lng: 76.795,
  },

  kotagiri: {
    name: "Kotagiri",
    lat: 11.42,
    lng: 76.86,
  },

  palani: {
    name: "Palani",
    lat: 10.4503,
    lng: 77.5209,
  },

  oddanchatram: {
    name: "Oddanchatram",
    lat: 10.489,
    lng: 77.76,
  },

  dindigul: {
    name: "Dindigul",
    lat: 10.3673,
    lng: 77.9803,
  },

  madurai: {
    name: "Madurai",
    lat: 9.9252,
    lng: 78.1198,
  },

  krishnagiri: {
    name: "Krishnagiri",
    lat: 12.5186,
    lng: 78.2137,
  },

  hosur: {
    name: "Hosur",
    lat: 12.7409,
    lng: 77.8253,
  },

  bangalore: {
    name: "Bangalore",
    lat: 12.9716,
    lng: 77.5946,
  },

  trichy: {
    name: "Trichy",
    lat: 10.7905,
    lng: 78.7047,
  },

  thanjavur: {
    name: "Thanjavur",
    lat: 10.787,
    lng: 79.1378,
  },

  kumbakonam: {
    name: "Kumbakonam",
    lat: 10.9602,
    lng: 79.3845,
  },

  vellore: {
    name: "Vellore",
    lat: 12.9165,
    lng: 79.1325,
  },

  chennai: {
    name: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
  },

  kanchipuram: {
    name: "Kanchipuram",
    lat: 12.8342,
    lng: 79.7036,
  },
};

/* ============================================================
   NORMALIZE LOCATION
============================================================ */

function normalizeLocation(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/* ============================================================
   HAVERSINE DISTANCE
============================================================ */

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}

/* ============================================================
   ROUTE DISTANCE
============================================================ */

function getRouteDistance(
  pickup: string,
  drop: string
) {
  const pickupKey =
    normalizeLocation(pickup);

  const dropKey =
    normalizeLocation(drop);

  const pickupLocation =
    LOCATIONS[pickupKey];

  const dropLocation =
    LOCATIONS[dropKey];

  if (
    !pickupLocation ||
    !dropLocation
  ) {
    return null;
  }

  if (pickupKey === dropKey) {
    return 0;
  }

  const straightDistance =
    haversineDistance(
      pickupLocation.lat,
      pickupLocation.lng,
      dropLocation.lat,
      dropLocation.lng
    );

  /*
    Approximate road distance.

    This is an estimated route distance.
    For exact driving distance, connect
    Google Maps / Mapbox / OSRM later.
  */

  const roadDistance =
    straightDistance * 1.25;

  return Math.max(
    1,
    Math.round(roadDistance)
  );
}

/* ============================================================
   FORMAT DATE
============================================================ */

function formatDisplayDate(value: string) {
  if (!value) {
    return "Select travel date";
  }

  const [year, month, day] =
    value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
}

/* ============================================================
   FORMAT TIME
============================================================ */

function formatDisplayTime(value: string) {
  if (!value) {
    return "Select travel time";
  }

  const [hours, minutes] =
    value.split(":");

  if (!hours || !minutes) {
    return value;
  }

  const hour = Number(hours);

  const period =
    hour >= 12 ? "PM" : "AM";

  const displayHour =
    hour % 12 || 12;

  return `${displayHour}:${minutes} ${period}`;
}

/* ============================================================
   DESTINATION HERO
============================================================ */

export default function DestinationHero() {
  /* ==========================================================
     FORM STATE
  ========================================================== */

  const [pickup, setPickup] =
    useState("");

  const [drop, setDrop] =
    useState("");

  const [vehicle, setVehicle] =
    useState("mini");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  /* ==========================================================
     DROPDOWN STATE
  ========================================================== */

  const [pickupOpen, setPickupOpen] =
    useState(false);

  const [dropOpen, setDropOpen] =
    useState(false);

  const [vehicleOpen, setVehicleOpen] =
    useState(false);

  /* ==========================================================
     RESULT STATE
  ========================================================== */

  const [distance, setDistance] =
    useState<number | null>(null);

  const [fare, setFare] =
    useState<number | null>(null);

  const [error, setError] =
    useState("");

  const [searched, setSearched] =
    useState(false);

  /* ==========================================================
     REFS
  ========================================================== */

  const pickupRef =
    useRef<HTMLDivElement>(null);

  const dropRef =
    useRef<HTMLDivElement>(null);

  const vehicleRef =
    useRef<HTMLDivElement>(null);

  /* ==========================================================
     TODAY

     Local date instead of UTC.
  ========================================================== */

  const today = useMemo(() => {
    const now = new Date();

    const year =
      now.getFullYear();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      now.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  /* ==========================================================
     SELECTED VEHICLE
  ========================================================== */

  const selectedVehicle =
    useMemo(
      () =>
        VEHICLES.find(
          (item) =>
            item.id === vehicle
        ),
      [vehicle]
    );

  /* ==========================================================
     LOCATION LIST
  ========================================================== */

  const locationList =
    useMemo(
      () =>
        Object.values(LOCATIONS).filter(
          (location, index, array) =>
            array.findIndex(
              (item) =>
                item.name ===
                location.name
            ) === index
        ),
      []
    );

  /* ==========================================================
     FILTER PICKUP
  ========================================================== */

  const filteredPickupLocations =
    useMemo(() => {
      const query =
        pickup.trim().toLowerCase();

      if (!query) {
        return locationList;
      }

      return locationList.filter(
        (location) =>
          location.name
            .toLowerCase()
            .includes(query)
      );
    }, [pickup, locationList]);

  /* ==========================================================
     FILTER DROP
  ========================================================== */

  const filteredDropLocations =
    useMemo(() => {
      const query =
        drop.trim().toLowerCase();

      if (!query) {
        return locationList;
      }

      return locationList.filter(
        (location) =>
          location.name
            .toLowerCase()
            .includes(query)
      );
    }, [drop, locationList]);

  /* ==========================================================
     CLOSE DROPDOWNS
  ========================================================== */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      if (
        pickupRef.current &&
        !pickupRef.current.contains(
          target
        )
      ) {
        setPickupOpen(false);
      }

      if (
        dropRef.current &&
        !dropRef.current.contains(
          target
        )
      ) {
        setDropOpen(false);
      }

      if (
        vehicleRef.current &&
        !vehicleRef.current.contains(
          target
        )
      ) {
        setVehicleOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ==========================================================
     EXPLORE FARES
  ========================================================== */

  const handleExploreFares = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSearched(true);
    setDistance(null);
    setFare(null);

    /* PICKUP */

    if (!pickup.trim()) {
      setError(
        "Please select your pickup location."
      );

      setPickupOpen(true);

      return;
    }

    /* DROP */

    if (!drop.trim()) {
      setError(
        "Please select your drop location."
      );

      setDropOpen(true);

      return;
    }

    /* DATE */

    if (!date) {
      setError(
        "Please select your travel date."
      );

      return;
    }

    /* TIME */

    if (!time) {
      setError(
        "Please select your travel time."
      );

      return;
    }

    /* SAME LOCATION */

    if (
      normalizeLocation(pickup) ===
      normalizeLocation(drop)
    ) {
      setError(
        "Pickup and drop locations cannot be the same."
      );

      return;
    }

    /* VEHICLE */

    if (!selectedVehicle) {
      setError(
        "Please select a vehicle."
      );

      return;
    }

    /* DISTANCE */

    const calculatedDistance =
      getRouteDistance(
        pickup,
        drop
      );

    if (
      calculatedDistance === null
    ) {
      setError(
        "Please select a location from the suggestions."
      );

      return;
    }

    /* FARE */

    const calculatedFare =
      Math.round(
        calculatedDistance *
          selectedVehicle.rate
      );

    setDistance(
      calculatedDistance
    );

    setFare(
      calculatedFare
    );

    setPickupOpen(false);
    setDropOpen(false);
    setVehicleOpen(false);
  };

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        lg:min-h-[680px]
        xl:min-h-[720px]
      "
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        <motion.div
          className="
            absolute
            inset-0
          "
          animate={{
            scale: [
              1,
              1.045,
              1,
            ],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/car5.png"
            alt="SBS Taxi destinations"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-[68%_center]

              sm:object-[62%_center]

              md:object-center
            "
          />
        </motion.div>

        <div
          className="
            absolute
            inset-0
            bg-black/15
          "
        />

        <div
          className="
            absolute
            inset-y-0
            left-0

            w-full

            bg-gradient-to-r
            from-[#041e43]
            via-[#041e43]/90
            via-55%
            to-transparent

            sm:w-[90%]
            md:w-[82%]
            lg:w-[75%]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0

            h-48

            bg-gradient-to-t
            from-black/45
            to-transparent
          "
        />
      </div>

      {/* ======================================================
          MAIN CONTENT
      ======================================================= */}

      <div
        className="
          relative
          z-10

          mx-auto
          flex
          w-full
          max-w-7xl

          px-4
          py-10

          sm:px-6
          sm:py-14

          lg:min-h-[680px]
          lg:items-center
          lg:px-8

          xl:min-h-[720px]
        "
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            w-full
            max-w-[1000px]
          "
        >
          {/* ==================================================
              LABEL
          =================================================== */}

          <motion.div
            variants={fadeLeft}
            className="
              mb-4

              inline-flex
              items-center
              gap-2

              font-[var(--font-jakarta)]

              text-xs
              font-bold

              uppercase

              tracking-[0.18em]

              text-[var(--secondary)]

              sm:text-sm
            "
          >
            <span
              className="
                h-[2px]
                w-8
                rounded-full
                bg-[var(--secondary)]
              "
            />

            Explore Destinations
          </motion.div>

          {/* ==================================================
              TITLE
          =================================================== */}

          <motion.h1
            variants={fadeLeft}
            className="
              max-w-[720px]

              font-[family-name:var(--font-instrument)]

              text-[42px]
              font-normal

              leading-[0.98]

              tracking-tight

              !text-white

              sm:text-5xl
              md:text-[58px]
              lg:text-[64px]
              xl:text-[70px]
            "
          >
            Every Journey Starts
            <br />

            <span
              className="
                text-[var(--secondary)]
              "
            >
              With a Destination.
            </span>
          </motion.h1>

          {/* ==================================================
              DESCRIPTION
          =================================================== */}

          <motion.p
            variants={fadeUp}
            className="
              mt-5

              max-w-[650px]

              font-[var(--font-jakarta)]

              text-sm
              leading-6

              text-white/80

              sm:text-base
              sm:leading-7
            "
          >
            Choose any pickup and drop
            location, select your vehicle,
            and discover your estimated SBS
            Taxi fare in seconds.
          </motion.p>

          {/* ==================================================
              FARE CARD
          =================================================== */}

          <motion.div
            variants={cardAnimation}
            className="
              mt-8

              w-full
              max-w-[1000px]

              overflow-visible

              rounded-2xl

              border
              border-white/15

              bg-white

              shadow-[0_25px_70px_rgba(0,0,0,0.25)]
            "
          >
            <form
              onSubmit={
                handleExploreFares
              }
            >
              {/* ==================================================
                  HEADER
              =================================================== */}

              <div
                className="
                  flex
                  flex-col

                  gap-2

                  border-b
                  border-gray-100

                  px-5
                  py-4

                  sm:flex-row
                  sm:items-center
                  sm:justify-between

                  sm:px-6
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      font-[var(--font-jakarta)]

                      text-sm
                      font-bold

                      text-[#041e43]
                    "
                  >
                    <Navigation
                      size={17}
                    />

                    Calculate Your Fare
                  </div>

                  <p
                    className="
                      mt-1

                      font-[var(--font-jakarta)]

                      text-xs

                      text-gray-500
                    "
                  >
                    Select any pickup and
                    drop location.
                  </p>
                </div>

                <div
                  className="
                    hidden
                    items-center
                    gap-2
                    sm:flex
                  "
                >
                  <ShieldCheck
                    size={15}
                    className="
                      text-emerald-600
                    "
                  />

                  <span
                    className="
                      font-[var(--font-jakarta)]

                      text-xs

                      font-medium

                      text-gray-500
                    "
                  >
                    Transparent pricing
                  </span>
                </div>
              </div>

              {/* ==================================================
                  FORM FIELDS
              =================================================== */}

              <div
                className="
                  grid
                  grid-cols-1

                  md:grid-cols-2

                  lg:grid-cols-5
                "
              >
                {/* ==================================================
                    PICKUP
                =================================================== */}

                <div
                  ref={pickupRef}
                  className="
                    relative

                    border-b
                    border-gray-100

                    lg:border-r
                    lg:border-b-0
                  "
                >
                  <label
                    className="
                      pointer-events-none
                      block

                      px-5
                      pt-4

                      font-[var(--font-jakarta)]

                      text-[10px]
                      font-bold

                      uppercase
                      tracking-[0.12em]

                      text-gray-400
                    "
                  >
                    Pickup
                  </label>

                  <div
                    className="
                      flex
                      items-center
                    "
                  >
                    <MapPin
                      size={18}
                      className="
                        ml-5
                        shrink-0

                        text-[#041e43]
                      "
                    />

                    <input
                      type="text"
                      value={pickup}
                      placeholder="Where from?"
                      autoComplete="off"
                      onFocus={() => {
                        setPickupOpen(true);
                        setDropOpen(false);
                        setVehicleOpen(false);
                      }}
                      onChange={(e) => {
                        setPickup(
                          e.target.value
                        );

                        setPickupOpen(true);

                        setError("");
                        setSearched(false);
                      }}
                      className="
                        h-12
                        w-full

                        border-0
                        bg-transparent

                        px-3

                        font-[var(--font-jakarta)]

                        text-sm
                        font-medium

                        text-gray-800

                        outline-none

                        !border-transparent
                        !outline-none
                        !ring-0

                        focus:!border-transparent
                        focus:!outline-none
                        focus:!ring-0

                        active:!border-transparent
                        active:!outline-none

                        placeholder:text-gray-400
                      "
                    />
                  </div>

                  {pickupOpen && (
                    <div
                      className="
                        absolute

                        left-2
                        right-2

                        top-full

                        z-[100]

                        mt-2

                        max-h-64

                        overflow-y-auto

                        rounded-xl

                        border
                        border-gray-100

                        bg-white

                        p-2

                        shadow-[0_15px_40px_rgba(0,0,0,0.14)]
                      "
                    >
                      {filteredPickupLocations.length >
                      0 ? (
                        filteredPickupLocations.map(
                          (location) => (
                            <button
                              key={
                                location.name
                              }
                              type="button"
                              onClick={() => {
                                setPickup(
                                  location.name
                                );

                                setPickupOpen(
                                  false
                                );

                                setError("");
                                setSearched(
                                  false
                                );
                              }}
                              className="
                                flex
                                w-full

                                items-center
                                gap-3

                                rounded-lg

                                px-3
                                py-3

                                text-left

                                transition-colors

                                hover:bg-gray-50

                                active:bg-gray-100

                                focus:outline-none
                                focus:ring-0
                              "
                            >
                              <span
                                className="
                                  flex
                                  h-8
                                  w-8

                                  shrink-0

                                  items-center
                                  justify-center

                                  rounded-full

                                  bg-[#041e43]/5
                                "
                              >
                                <MapPin
                                  size={15}
                                  className="
                                    text-[#041e43]
                                  "
                                />
                              </span>

                              <span
                                className="
                                  font-[var(--font-jakarta)]

                                  text-sm

                                  font-medium

                                  text-gray-800
                                "
                              >
                                {
                                  location.name
                                }
                              </span>
                            </button>
                          )
                        )
                      ) : (
                        <div
                          className="
                            px-3
                            py-4

                            font-[var(--font-jakarta)]

                            text-xs

                            text-gray-400
                          "
                        >
                          No location found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ==================================================
                    DROP
                =================================================== */}

                <div
                  ref={dropRef}
                  className="
                    relative

                    border-b
                    border-gray-100

                    lg:border-r
                    lg:border-b-0
                  "
                >
                  <label
                    className="
                      pointer-events-none
                      block

                      px-5
                      pt-4

                      font-[var(--font-jakarta)]

                      text-[10px]
                      font-bold

                      uppercase
                      tracking-[0.12em]

                      text-gray-400
                    "
                  >
                    Drop
                  </label>

                  <div
                    className="
                      flex
                      items-center
                    "
                  >
                    <MapPin
                      size={18}
                      className="
                        ml-5
                        shrink-0

                        text-[#d79d00]
                      "
                    />

                    <input
                      type="text"
                      value={drop}
                      placeholder="Where to?"
                      autoComplete="off"
                      onFocus={() => {
                        setDropOpen(true);
                        setPickupOpen(false);
                        setVehicleOpen(false);
                      }}
                      onChange={(e) => {
                        setDrop(
                          e.target.value
                        );

                        setDropOpen(true);

                        setError("");
                        setSearched(false);
                      }}
                      className="
                        h-12
                        w-full

                        border-0
                        bg-transparent

                        px-3

                        font-[var(--font-jakarta)]

                        text-sm
                        font-medium

                        text-gray-800

                        outline-none

                        !border-transparent
                        !outline-none
                        !ring-0

                        focus:!border-transparent
                        focus:!outline-none
                        focus:!ring-0

                        active:!border-transparent
                        active:!outline-none

                        placeholder:text-gray-400
                      "
                    />
                  </div>

                  {dropOpen && (
                    <div
                      className="
                        absolute

                        left-2
                        right-2

                        top-full

                        z-[100]

                        mt-2

                        max-h-64

                        overflow-y-auto

                        rounded-xl

                        border
                        border-gray-100

                        bg-white

                        p-2

                        shadow-[0_15px_40px_rgba(0,0,0,0.14)]
                      "
                    >
                      {filteredDropLocations.length >
                      0 ? (
                        filteredDropLocations.map(
                          (location) => (
                            <button
                              key={
                                location.name
                              }
                              type="button"
                              onClick={() => {
                                setDrop(
                                  location.name
                                );

                                setDropOpen(
                                  false
                                );

                                setError("");
                                setSearched(
                                  false
                                );
                              }}
                              className="
                                flex
                                w-full

                                items-center
                                gap-3

                                rounded-lg

                                px-3
                                py-3

                                text-left

                                transition-colors

                                hover:bg-gray-50

                                active:bg-gray-100

                                focus:outline-none
                                focus:ring-0
                              "
                            >
                              <span
                                className="
                                  flex
                                  h-8
                                  w-8

                                  shrink-0

                                  items-center
                                  justify-center

                                  rounded-full

                                  bg-[#FFD23F]/20
                                "
                              >
                                <MapPin
                                  size={15}
                                  className="
                                    text-[#041e43]
                                  "
                                />
                              </span>

                              <span
                                className="
                                  font-[var(--font-jakarta)]

                                  text-sm

                                  font-medium

                                  text-gray-800
                                "
                              >
                                {
                                  location.name
                                }
                              </span>
                            </button>
                          )
                        )
                      ) : (
                        <div
                          className="
                            px-3
                            py-4

                            font-[var(--font-jakarta)]

                            text-xs

                            text-gray-400
                          "
                        >
                          No location found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ==================================================
                    VEHICLE
                =================================================== */}

                <div
                  ref={vehicleRef}
                  className="
                    relative

                    border-b
                    border-gray-100

                    lg:border-r
                    lg:border-b-0
                  "
                >
                  <label
                    className="
                      pointer-events-none
                      block

                      px-5
                      pt-4

                      font-[var(--font-jakarta)]

                      text-[10px]
                      font-bold

                      uppercase
                      tracking-[0.12em]

                      text-gray-400
                    "
                  >
                    Vehicle
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setVehicleOpen(
                        !vehicleOpen
                      );

                      setPickupOpen(false);
                      setDropOpen(false);
                    }}
                    className="
                      flex

                      h-12
                      w-full

                      items-center
                      justify-between

                      border-0

                      bg-transparent

                      px-5

                      text-left

                      outline-none

                      focus:!border-transparent
                      focus:!outline-none
                      focus:!ring-0
                    "
                  >
                    <span
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <CarFront
                        size={18}
                        className="
                          shrink-0
                          text-[#041e43]
                        "
                      />

                      <span>
                        <span
                          className="
                            block

                            font-[var(--font-jakarta)]

                            text-sm
                            font-semibold

                            text-gray-800
                          "
                        >
                          {
                            selectedVehicle?.name
                          }
                        </span>

                        <span
                          className="
                            block

                            font-[var(--font-jakarta)]

                            text-[10px]

                            text-gray-400
                          "
                        >
                          ₹
                          {
                            selectedVehicle?.rate
                          }
                          /km
                        </span>
                      </span>
                    </span>

                    <ChevronDown
                      size={16}
                      className={`
                        text-gray-400

                        transition-transform

                        ${
                          vehicleOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {vehicleOpen && (
                    <div
                      className="
                        absolute

                        left-2
                        right-2

                        top-full

                        z-[100]

                        mt-2

                        rounded-xl

                        border
                        border-gray-100

                        bg-white

                        p-2

                        shadow-[0_15px_40px_rgba(0,0,0,0.14)]
                      "
                    >
                      {VEHICLES.map(
                        (item) => {
                          const active =
                            vehicle ===
                            item.id;

                          return (
                            <button
                              key={
                                item.id
                              }
                              type="button"
                              onClick={() => {
                                setVehicle(
                                  item.id
                                );

                                setVehicleOpen(
                                  false
                                );

                                setError("");
                                setSearched(
                                  false
                                );
                              }}
                              className={`
                                flex
                                w-full

                                items-center
                                justify-between

                                rounded-lg

                                px-3
                                py-3

                                text-left

                                transition-colors

                                focus:outline-none
                                focus:ring-0

                                ${
                                  active
                                    ? "bg-[#041e43]/5"
                                    : "hover:bg-gray-50"
                                }
                              `}
                            >
                              <span
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >
                                <span
                                  className="
                                    flex
                                    h-9
                                    w-9

                                    items-center
                                    justify-center

                                    rounded-full

                                    bg-[#041e43]/5
                                  "
                                >
                                  <CarFront
                                    size={16}
                                    className="
                                      text-[#041e43]
                                    "
                                  />
                                </span>

                                <span>
                                  <span
                                    className="
                                      block

                                      font-[var(--font-jakarta)]

                                      text-sm

                                      font-semibold

                                      text-gray-800
                                    "
                                  >
                                    {
                                      item.name
                                    }
                                  </span>

                                  <span
                                    className="
                                      mt-0.5
                                      block

                                      font-[var(--font-jakarta)]

                                      text-[10px]

                                      text-gray-400
                                    "
                                  >
                                    {
                                      item.subtitle
                                    }
                                  </span>
                                </span>
                              </span>

                              <span
                                className="
                                  font-[var(--font-jakarta)]

                                  text-xs

                                  font-bold

                                  text-[#041e43]
                                "
                              >
                                ₹
                                {
                                  item.rate
                                }
                                /km
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

                {/* ==================================================
                    DATE
                =================================================== */}

                <div
                  className="
                    relative
                    min-h-[88px]

                    border-b
                    border-gray-100

                    lg:border-r
                    lg:border-b-0
                  "
                >
                  <label
                    className="
                      pointer-events-none
                      block

                      px-5
                      pt-4

                      font-[var(--font-jakarta)]

                      text-[10px]
                      font-bold

                      uppercase
                      tracking-[0.12em]

                      text-gray-400
                    "
                  >
                    Date
                  </label>

                  <div
                    className="
                      relative

                      flex
                      h-12

                      items-center
                    "
                  >
                    <CalendarDays
                      size={18}
                      className="
                        pointer-events-none

                        ml-5

                        shrink-0

                        text-[#041e43]
                      "
                    />

                    <span
                      className={`
                        pointer-events-none

                        ml-3

                        truncate

                        font-[var(--font-jakarta)]

                        text-sm
                        font-medium

                        ${
                          date
                            ? "text-gray-800"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {formatDisplayDate(
                        date
                      )}
                    </span>

                    <input
                      type="date"
                      value={date}
                      min={today}
                      aria-label="Travel date"
                      onChange={(e) => {
                        setDate(
                          e.target.value
                        );

                        setError("");
                        setSearched(false);
                      }}
                      className="
                        absolute
                        inset-0

                        z-20

                        h-full
                        w-full

                        cursor-pointer

                        border-0
                        bg-transparent

                        opacity-0

                        outline-none

                        focus:border-0
                        focus:outline-none
                        focus:ring-0

                        appearance-none
                      "
                    />
                  </div>
                </div>

                {/* ==================================================
                    TIME
                =================================================== */}

                <div
                  className="
                    relative
                    min-h-[88px]

                    border-b
                    border-gray-100

                    lg:border-b-0
                  "
                >
                  <label
                    className="
                      pointer-events-none
                      block

                      px-5
                      pt-4

                      font-[var(--font-jakarta)]

                      text-[10px]
                      font-bold

                      uppercase
                      tracking-[0.12em]

                      text-gray-400
                    "
                  >
                    Time
                  </label>

                  <div
                    className="
                      relative

                      flex
                      h-12

                      items-center
                    "
                  >
                    <Clock3
                      size={18}
                      className="
                        pointer-events-none

                        ml-5

                        shrink-0

                        text-[#041e43]
                      "
                    />

                    <span
                      className={`
                        pointer-events-none

                        ml-3

                        truncate

                        font-[var(--font-jakarta)]

                        text-sm
                        font-medium

                        ${
                          time
                            ? "text-gray-800"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {formatDisplayTime(
                        time
                      )}
                    </span>

                    <input
                      type="time"
                      value={time}
                      aria-label="Travel time"
                      onChange={(e) => {
                        setTime(
                          e.target.value
                        );

                        setError("");
                        setSearched(false);
                      }}
                      className="
                        absolute
                        inset-0

                        z-20

                        h-full
                        w-full

                        cursor-pointer

                        border-0
                        bg-transparent

                        opacity-0

                        outline-none

                        focus:border-0
                        focus:outline-none
                        focus:ring-0

                        appearance-none
                      "
                    />
                  </div>
                </div>
              </div>

              {/* ==================================================
                  BUTTON
              =================================================== */}

              <div
                className="
                  border-t
                  border-gray-100

                  bg-gray-50/70

                  p-4

                  sm:p-5
                "
              >
                <button
                  type="submit"
                  className="
                    group

                    flex

                    min-h-[52px]

                    w-full

                    items-center
                    justify-center

                    gap-2

                    rounded-xl

                    bg-[#041e43]

                    px-6

                    font-[var(--font-jakarta)]

                    text-sm
                    font-bold

                    text-white

                    shadow-lg

                    transition-all
                    duration-200

                    hover:-translate-y-0.5

                    hover:bg-[#062958]

                    hover:shadow-xl

                    active:translate-y-0

                    focus:outline-none
                    focus:ring-0
                  "
                >
                  Explore Estimated Fare

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-200

                      group-hover:translate-x-1
                    "
                  />
                </button>
              </div>

              {/* ==================================================
                  ERROR
              =================================================== */}

              {error && (
                <div
                  className="
                    border-t
                    border-red-100

                    bg-red-50

                    px-5
                    py-3

                    font-[var(--font-jakarta)]

                    text-xs

                    font-medium

                    text-red-600
                  "
                >
                  {error}
                </div>
              )}

              {/* ==================================================
                  FARE RESULT
              =================================================== */}

              {searched &&
                !error &&
                fare !== null &&
                distance !== null &&
                selectedVehicle && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    className="
                      border-t
                      border-gray-100
                    "
                  >
                    <div
                      className="
                        p-5

                        sm:p-6
                      "
                    >
                      {/* RESULT HEADER */}

                      <div
                        className="
                          flex
                          flex-col

                          gap-3

                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        <div>
                          <div
                            className="
                              flex
                              items-center
                              gap-2

                              font-[var(--font-jakarta)]

                              text-xs

                              font-bold

                              uppercase

                              tracking-[0.12em]

                              text-emerald-600
                            "
                          >
                            <CheckCircle2
                              size={15}
                            />

                            Fare Estimated
                          </div>

                          <h3
                            className="
                              mt-1

                              font-[var(--font-jakarta)]

                              text-base

                              font-bold

                              text-[#041e43]
                            "
                          >
                            Your journey
                            estimate
                          </h3>
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2

                            rounded-full

                            bg-[#041e43]/5

                            px-3
                            py-1.5

                            font-[var(--font-jakarta)]

                            text-xs

                            font-semibold

                            text-[#041e43]
                          "
                        >
                          <CarFront
                            size={14}
                          />

                          {
                            selectedVehicle.name
                          }
                        </div>
                      </div>

                      {/* JOURNEY */}

                      <div
                        className="
                          mt-5

                          grid
                          grid-cols-1

                          gap-3

                          sm:grid-cols-[1fr_auto_1fr]

                          sm:items-center
                        "
                      >
                        <div
                          className="
                            rounded-xl

                            border
                            border-gray-100

                            bg-gray-50

                            p-4
                          "
                        >
                          <div
                            className="
                              font-[var(--font-jakarta)]

                              text-[10px]

                              font-bold

                              uppercase

                              tracking-[0.12em]

                              text-gray-400
                            "
                          >
                            Pickup
                          </div>

                          <div
                            className="
                              mt-1

                              font-[var(--font-jakarta)]

                              text-sm

                              font-bold

                              text-gray-800
                            "
                          >
                            {pickup}
                          </div>
                        </div>

                        <div
                          className="
                            flex

                            items-center
                            justify-center

                            gap-2

                            text-gray-300
                          "
                        >
                          <span
                            className="
                              hidden

                              h-px
                              w-10

                              bg-gray-200

                              sm:block
                            "
                          />

                          <Route
                            size={20}
                            className="
                              text-[#041e43]
                            "
                          />

                          <span
                            className="
                              hidden

                              h-px
                              w-10

                              bg-gray-200

                              sm:block
                            "
                          />
                        </div>

                        <div
                          className="
                            rounded-xl

                            border
                            border-gray-100

                            bg-gray-50

                            p-4
                          "
                        >
                          <div
                            className="
                              font-[var(--font-jakarta)]

                              text-[10px]

                              font-bold

                              uppercase

                              tracking-[0.12em]

                              text-gray-400
                            "
                          >
                            Drop
                          </div>

                          <div
                            className="
                              mt-1

                              font-[var(--font-jakarta)]

                              text-sm

                              font-bold

                              text-gray-800
                            "
                          >
                            {drop}
                          </div>
                        </div>
                      </div>

                      {/* STATS */}

                      <div
                        className="
                          mt-4

                          grid

                          grid-cols-2

                          gap-3

                          sm:grid-cols-4
                        "
                      >
                        {/* DISTANCE */}

                        <div
                          className="
                            rounded-xl

                            bg-[#041e43]

                            p-4

                            text-white
                          "
                        >
                          <div
                            className="
                              font-[var(--font-jakarta)]

                              text-[10px]

                              uppercase

                              tracking-wide

                              text-white/60
                            "
                          >
                            Distance
                          </div>

                          <div
                            className="
                              mt-1

                              font-[var(--font-jakarta)]

                              text-lg

                              font-bold
                            "
                          >
                            {distance} km
                          </div>
                        </div>

                        {/* RATE */}

                        <div
                          className="
                            rounded-xl

                            bg-gray-50

                            p-4
                          "
                        >
                          <div
                            className="
                              font-[var(--font-jakarta)]

                              text-[10px]

                              uppercase

                              tracking-wide

                              text-gray-400
                            "
                          >
                            Rate
                          </div>

                          <div
                            className="
                              mt-1

                              font-[var(--font-jakarta)]

                              text-lg

                              font-bold

                              text-[#041e43]
                            "
                          >
                            ₹
                            {
                              selectedVehicle.rate
                            }
                            /km
                          </div>
                        </div>

                        {/* VEHICLE */}

                        <div
                          className="
                            rounded-xl

                            bg-gray-50

                            p-4
                          "
                        >
                          <div
                            className="
                              font-[var(--font-jakarta)]

                              text-[10px]

                              uppercase

                              tracking-wide

                              text-gray-400
                            "
                          >
                            Vehicle
                          </div>

                          <div
                            className="
                              mt-1

                              truncate

                              font-[var(--font-jakarta)]

                              text-sm

                              font-bold

                              text-[#041e43]
                            "
                          >
                            {
                              selectedVehicle.name
                            }
                          </div>
                        </div>

                        {/* FARE */}

                        <div
                          className="
                            rounded-xl

                            bg-[#FFD23F]

                            p-4
                          "
                        >
                          <div
                            className="
                              font-[var(--font-jakarta)]

                              text-[10px]

                              uppercase

                              tracking-wide

                              text-[#041e43]/60
                            "
                          >
                            Estimated Fare
                          </div>

                          <div
                            className="
                              mt-1

                              flex
                              items-center

                              font-[var(--font-jakarta)]

                              text-xl

                              font-extrabold

                              text-[#041e43]
                            "
                          >
                            <IndianRupee
                              size={17}
                            />

                            {fare.toLocaleString(
                              "en-IN"
                            )}
                          </div>
                        </div>
                      </div>

                      {/* CALCULATION */}

                      <div
                        className="
                          mt-4

                          flex

                          flex-wrap

                          items-center

                          justify-between

                          gap-3

                          rounded-xl

                          border
                          border-gray-100

                          px-4
                          py-3
                        "
                      >
                        <div
                          className="
                            font-[var(--font-jakarta)]

                            text-xs

                            text-gray-500
                          "
                        >
                          {distance} km × ₹
                          {
                            selectedVehicle.rate
                          }
                          /km
                        </div>

                        <div
                          className="
                            flex

                            items-center

                            gap-1.5

                            font-[var(--font-jakarta)]

                            text-xs

                            font-semibold

                            text-gray-700
                          "
                        >
                          <Sparkles
                            size={14}
                            className="
                              text-[#d79d00]
                            "
                          />

                          Transparent estimate
                        </div>
                      </div>

                      {/* DATE / TIME */}

                      <div
                        className="
                          mt-3

                          flex

                          flex-wrap

                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2

                            rounded-lg

                            bg-gray-50

                            px-3
                            py-2

                            font-[var(--font-jakarta)]

                            text-xs

                            text-gray-600
                          "
                        >
                          <CalendarDays
                            size={14}
                            className="
                              text-[#041e43]
                            "
                          />

                          {formatDisplayDate(
                            date
                          )}
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2

                            rounded-lg

                            bg-gray-50

                            px-3
                            py-2

                            font-[var(--font-jakarta)]

                            text-xs

                            text-gray-600
                          "
                        >
                          <Clock3
                            size={14}
                            className="
                              text-[#041e43]
                            "
                          />

                          {formatDisplayTime(
                            time
                          )}
                        </div>
                      </div>

                      {/* DISCLAIMER */}

                      <p
                        className="
                          mt-3

                          font-[var(--font-jakarta)]

                          text-[10px]

                          leading-4

                          text-gray-400
                        "
                      >
                        * Fare shown is an
                        estimated fare based on
                        the selected distance and
                        vehicle rate. Final fare
                        may vary based on actual
                        route, tolls, parking,
                        waiting time and applicable
                        trip charges.
                      </p>
                    </div>
                  </motion.div>
                )}
            </form>
          </motion.div>

          {/* ==================================================
              TRUST POINTS
          =================================================== */}

          <motion.div
            variants={fadeUp}
            className="
              mt-5

              flex

              flex-wrap

              items-center

              gap-x-5
              gap-y-2

              font-[var(--font-jakarta)]

              text-xs

              text-white/70
            "
          >
            <span
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <ShieldCheck
                size={14}
                className="
                  text-[var(--secondary)]
                "
              />

              Trusted service
            </span>

            <span
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <CheckCircle2
                size={14}
                className="
                  text-[var(--secondary)]
                "
              />

              Transparent fares
            </span>

            <span
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <CarFront
                size={14}
                className="
                  text-[var(--secondary)]
                "
              />

              Multiple vehicle options
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}