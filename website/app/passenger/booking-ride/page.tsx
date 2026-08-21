"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Baby,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  Navigation,
  Route,
  ShieldCheck,
  Timer,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";

import CurrentLocation from "@/app/Components/Passenger/Booking/CurrentLocation";

import PlaceSearch, {
  PlaceData,
} from "@/app/Components/Passenger/Booking/PlaceSearch";

/* ============================================================
   ROUTE MAP
============================================================ */

const RouteMap = dynamic(
  () => import("@/app/Components/Passenger/Booking/RouteMap"),
  {
    ssr: false,

    loading: () => (
      <div className="flex h-[420px] w-full items-center justify-center rounded-3xl bg-slate-100 sm:h-[500px]">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading map...</span>
        </div>
      </div>
    ),
  }
);

/* ============================================================
   VEHICLE DATA
============================================================ */

interface Vehicle {
  id: number;
  name: string;
  seats: number;
  rate: number;
  description: string;
}

const VEHICLES: Vehicle[] = [
  {
    id: 1,
    name: "SBS MINI",
    seats: 4,
    rate: 12,
    description: "Affordable ride",
  },
  {
    id: 2,
    name: "SBS SEDAN",
    seats: 4,
    rate: 12.5,
    description: "Comfortable ride",
  },
  {
    id: 3,
    name: "SBS MUV",
    seats: 6,
    rate: 18,
    description: "Family ride",
  },
  {
    id: 4,
    name: "SBS SUV",
    seats: 6,
    rate: 17,
    description: "Premium comfort",
  },
  {
    id: 5,
    name: "SBS MUV+",
    seats: 7,
    rate: 19,
    description: "Large group ride",
  },
  {
    id: 6,
    name: "SBS VAN",
    seats: 12,
    rate: 21,
    description: "Group travel",
  },
];

/* ============================================================
   HELPERS
============================================================ */

function money(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function calculateFare(
  distanceKm: number,
  rate: number
) {
  if (distanceKm <= 0) {
    return 0;
  }

  const baseFare =
    distanceKm * rate;

  const minimumFare = 150;

  return Math.max(
    Math.round(baseFare),
    minimumFare
  );
}

/* ============================================================
   BOOKING API RESPONSE
============================================================ */

interface BookingApiResult {
  success?: boolean;

  message?: string;

  data?: {
    booking_id?: number | string;
    bookingId?: number | string;

    ride_id?: number | string;
    rideId?: number | string;

    booking_number?: string;
    bookingNumber?: string;

    booking_reference?: string;
    booking_reference_number?: string;

    otp?: number | string;

    booking_otp?: number | string;

    ride_otp?: number | string;

    status?: string;

    estimated_distance?: number | string;

    estimated_duration?: number | string;

    estimated_fare?: number | string;

    payment_method?: string;

    payment_status?: string;

    passengers?: number | string;

    number_of_passengers?: number | string;

    babies?: number | string;

    elderly?: number | string;

    trip_type?: string;

    tripType?: string;

    pickup_address?: string;

    drop_address?: string;

    [key: string]: unknown;
  };

  booking_id?: number | string;

  bookingId?: number | string;

  ride_id?: number | string;

  rideId?: number | string;

  booking_number?: string;

  bookingNumber?: string;

  booking_reference?: string;

  booking_reference_number?: string;

  otp?: number | string;

  booking_otp?: number | string;

  ride_otp?: number | string;

  status?: string;

  estimated_distance?: number | string;

  estimated_duration?: number | string;

  estimated_fare?: number | string;

  payment_method?: string;

  payment_status?: string;

  passengers?: number | string;

  number_of_passengers?: number | string;

  babies?: number | string;

  elderly?: number | string;

  trip_type?: string;

  tripType?: string;

  [key: string]: unknown;
}

/* ============================================================
   CANCEL RESPONSE
============================================================ */

interface CancelApiResult {
  success?: boolean;
  message?: string;
  data?: unknown;
}

/* ============================================================
   PAGE
============================================================ */

export default function BookingRidePage() {
  const router = useRouter();

  /* ==========================================================
     LOCATION
  ========================================================== */

  const [currentLocation, setCurrentLocation] =
    useState<[number, number] | null>(null);

  const [pickup, setPickup] =
    useState<PlaceData | null>(null);

  const [drop, setDrop] =
    useState<PlaceData | null>(null);

  /* ==========================================================
     TRIP DETAILS
  ========================================================== */

  const [pickupDate, setPickupDate] =
    useState("");

  const [pickupTime, setPickupTime] =
    useState("");

  const [tripType, setTripType] =
    useState("One Way");

  /* ==========================================================
     ROUTE
  ========================================================== */

  const [distanceKm, setDistanceKm] =
    useState(0);

  const [durationMinutes, setDurationMinutes] =
    useState(0);

  /* ==========================================================
     SERVER VALUES
  ========================================================== */

  const [serverFare, setServerFare] =
    useState<number | null>(null);

  const [serverDistance, setServerDistance] =
    useState<number | null>(null);

  const [serverDuration, setServerDuration] =
    useState<number | null>(null);

  const [serverPaymentMethod, setServerPaymentMethod] =
    useState("");

  const [serverPaymentStatus, setServerPaymentStatus] =
    useState("");

  /* ==========================================================
     ESTIMATED DURATION
  ========================================================== */

  useEffect(() => {
    if (distanceKm > 0) {
      const estimated = Math.max(
        1,
        Math.round(
          (distanceKm / 45) * 60
        )
      );

      setDurationMinutes(estimated);
    } else {
      setDurationMinutes(0);
    }
  }, [distanceKm]);

  /* ==========================================================
     VEHICLE
  ========================================================== */

  const [selectedVehicleId, setSelectedVehicleId] =
    useState(1);

  const selectedVehicle =
    VEHICLES.find(
      (vehicle) =>
        vehicle.id === selectedVehicleId
    ) || VEHICLES[0];

  /* ==========================================================
     PASSENGER
  ========================================================== */

  const [passengerName, setPassengerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  /* ==========================================================
     PASSENGER COUNT
  ========================================================== */

  const [passengers, setPassengers] =
    useState("1");

  const passengerCount =
    Number(passengers) || 1;

  useEffect(() => {
    if (
      passengerCount >
      selectedVehicle.seats
    ) {
      setPassengers(
        String(
          selectedVehicle.seats
        )
      );
    }

    if (passengerCount < 1) {
      setPassengers("1");
    }
  }, [
    passengerCount,
    selectedVehicle.seats,
  ]);

  /* ==========================================================
     BABIES / ELDERLY
  ========================================================== */

  const [babies, setBabies] =
    useState("0");

  const [elderly, setElderly] =
    useState("0");

  const [
    additionalPreferences,
    setAdditionalPreferences,
  ] = useState("");

  /* ==========================================================
     PAYMENT
  ========================================================== */

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  /* ==========================================================
     BOOKING STATE
  ========================================================== */

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [bookingNumber, setBookingNumber] =
    useState("");

  const [bookingId, setBookingId] =
    useState("");

  const [rideId, setRideId] =
    useState("");

  const [bookingOtp, setBookingOtp] =
    useState("");

  /* ==========================================================
     CANCEL STATE
  ========================================================== */

  const [cancelling, setCancelling] =
    useState(false);

  const [cancelled, setCancelled] =
    useState(false);

  const [cancelMessage, setCancelMessage] =
    useState("");

  /* ==========================================================
     USER ID
  ========================================================== */

  const [userId, setUserId] =
    useState<number | null>(null);

  useEffect(() => {
    try {
      const possibleKeys = [
        "sbs_user",
        "user",
        "userData",
        "passenger",
      ];

      let foundId: number | null = null;

      for (
        const key of possibleKeys
      ) {
        const raw =
          localStorage.getItem(key);

        if (!raw) {
          continue;
        }

        try {
          const parsed =
            JSON.parse(raw);

          const id = Number(
            parsed?.id ??
              parsed?.user_id ??
              parsed?.userId ??
              parsed?.data?.id ??
              parsed?.data?.user_id
          );

          if (id > 0) {
            foundId = id;
            break;
          }
        } catch {
          const id =
            Number(raw);

          if (id > 0) {
            foundId = id;
            break;
          }
        }
      }

      if (foundId) {
        setUserId(foundId);

        console.log(
          "================================================="
        );

        console.log(
          "LOGGED IN USER ID:",
          foundId
        );

        console.log(
          "================================================="
        );
      } else {
        console.warn(
          "No user_id found in localStorage."
        );

        setUserId(1);
      }
    } catch (err) {
      console.error(
        "USER ID ERROR:",
        err
      );

      setUserId(1);
    }
  }, []);

  /* ==========================================================
     DEFAULT DATE
  ========================================================== */

  useEffect(() => {
    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    setPickupDate(
      `${year}-${month}-${day}`
    );
  }, []);

  /* ==========================================================
     FARE
  ========================================================== */

  const estimatedFare =
    useMemo(() => {
      return calculateFare(
        distanceKm,
        selectedVehicle.rate
      );
    }, [
      distanceKm,
      selectedVehicle.rate,
    ]);

  const displayFare =
    serverFare !== null
      ? serverFare
      : estimatedFare;

  /* ==========================================================
     SAVE COMPLETE BOOKING INFORMATION
  ========================================================== */

  const saveSearchDriverData = (
    finalRideId: string,
    finalBookingId: string,
    finalBookingNumber: string,
    finalBookingOtp: string,
    finalStatus: string,
    finalDistance: number,
    finalDuration: number,
    finalFare: number,
    finalPaymentMethod: string,
    finalPaymentStatus: string,
    finalPassengers: number,
    finalBabies: number,
    finalElderly: number,
    finalTripType: string,
    apiResponse: BookingApiResult
  ) => {
    /*
     * IMPORTANT
     *
     * This is the single complete booking object.
     *
     * Search Driver reads:
     *
     * localStorage.getItem(
     *   "sbs_booking_information"
     * )
     */

    const bookingInformation = {
      /* ======================================================
         COMPLETE API RESPONSE
      ====================================================== */

      api_response:
        apiResponse,

      response_data:
        apiResponse.data ?? null,

      /* ======================================================
         IDENTIFIERS
      ====================================================== */

      ride_id:
        finalRideId,

      rideId:
        finalRideId,

      booking_id:
        finalBookingId,

      bookingId:
        finalBookingId,

      booking_number:
        finalBookingNumber,

      bookingNumber:
        finalBookingNumber,

      /* ======================================================
         OTP
      ====================================================== */

      ride_otp:
        finalBookingOtp,

      rideOtp:
        finalBookingOtp,

      booking_otp:
        finalBookingOtp,

      bookingOtp:
        finalBookingOtp,

      otp:
        finalBookingOtp,

      /* ======================================================
         USER
      ====================================================== */

      user_id:
        userId,

      userId,

      /* ======================================================
         STATUS
      ====================================================== */

      status:
        finalStatus,

      /* ======================================================
         PICKUP
      ====================================================== */

      pickup: {
        name:
          pickup?.name || "",

        latitude:
          pickup?.latitude ?? null,

        longitude:
          pickup?.longitude ?? null,
      },

      pickup_address:
        pickup?.name || "",

      pickup_latitude:
        pickup?.latitude ?? null,

      pickup_longitude:
        pickup?.longitude ?? null,

      /* ======================================================
         DROP / DESTINATION
      ====================================================== */

      drop: {
        name:
          drop?.name || "",

        latitude:
          drop?.latitude ?? null,

        longitude:
          drop?.longitude ?? null,
      },

      drop_address:
        drop?.name || "",

      drop_latitude:
        drop?.latitude ?? null,

      drop_longitude:
        drop?.longitude ?? null,

      destination:
        drop?.name || "",

      destination_address:
        drop?.name || "",

      destination_latitude:
        drop?.latitude ?? null,

      destination_longitude:
        drop?.longitude ?? null,

      /* ======================================================
         VEHICLE
      ====================================================== */

      vehicle: {
        id:
          selectedVehicle.id,

        name:
          selectedVehicle.name,

        seats:
          selectedVehicle.seats,

        rate:
          selectedVehicle.rate,

        description:
          selectedVehicle.description,
      },

      vehicle_id:
        selectedVehicle.id,

      vehicle_type_id:
        selectedVehicle.id,

      vehicleType:
        selectedVehicle.name,

      vehicle_type:
        selectedVehicle.name,

      vehicle_name:
        selectedVehicle.name,

      vehicle_seats:
        selectedVehicle.seats,

      vehicle_rate:
        selectedVehicle.rate,

      /* ======================================================
         PASSENGER
      ====================================================== */

      passengerName:
        passengerName.trim(),

      passenger_name:
        passengerName.trim(),

      email:
        email.trim(),

      phone:
        phone.trim(),

      /* ======================================================
         PASSENGER COUNTS
      ====================================================== */

      passengers:
        finalPassengers,

      numberOfPassengers:
        finalPassengers,

      number_of_passengers:
        finalPassengers,

      babies:
        finalBabies,

      elderly:
        finalElderly,

      /* ======================================================
         TRIP
      ====================================================== */

      tripType:
        finalTripType,

      trip_type:
        finalTripType,

      pickupDate,

      pickup_date:
        pickupDate,

      pickupTime,

      pickup_time:
        pickupTime,

      /* ======================================================
         ROUTE
      ====================================================== */

      distanceKm:
        finalDistance,

      distance_km:
        finalDistance,

      estimated_distance:
        finalDistance,

      durationMinutes:
        finalDuration,

      duration_minutes:
        finalDuration,

      estimated_duration:
        finalDuration,

      /* ======================================================
         FARE
      ====================================================== */

      estimatedFare:
        finalFare,

      estimated_fare:
        finalFare,

      fare:
        finalFare,

      /* ======================================================
         PAYMENT
      ====================================================== */

      paymentMethod:
        finalPaymentMethod,

      payment_method:
        finalPaymentMethod,

      paymentStatus:
        finalPaymentStatus,

      payment_status:
        finalPaymentStatus,

      /* ======================================================
         PREFERENCES
      ====================================================== */

      additionalPreferences:
        additionalPreferences.trim(),

      additional_preferences:
        additionalPreferences.trim(),

      /* ======================================================
         SOURCE
      ====================================================== */

      booking_source:
        "website",

      project:
        "SBS TAXI",

      /* ======================================================
         TIMESTAMP
      ====================================================== */

      createdAt:
        new Date().toISOString(),

      created_at:
        new Date().toISOString(),
    };

    console.log(
      "================================================="
    );

    console.log(
      "SBS TAXI - COMPLETE BOOKING INFORMATION"
    );

    console.log(
      "================================================="
    );

    console.log(
      JSON.stringify(
        bookingInformation,
        null,
        2
      )
    );

    console.log(
      "================================================="
    );

    try {
      /* ======================================================
         PRIMARY STORAGE
      ====================================================== */

      localStorage.setItem(
        "sbs_booking_information",
        JSON.stringify(
          bookingInformation
        )
      );

      /* ======================================================
         EXISTING SESSION STORAGE
      ====================================================== */

      sessionStorage.setItem(
        "sbs_search_driver_booking",
        JSON.stringify(
          bookingInformation
        )
      );

      /* ======================================================
         LOCAL STORAGE IDENTIFIERS
      ====================================================== */

      localStorage.setItem(
        "sbs_ride_id",
        finalRideId
      );

      localStorage.setItem(
        "sbs_booking_id",
        finalBookingId
      );

      localStorage.setItem(
        "sbs_booking_number",
        finalBookingNumber
      );

      localStorage.setItem(
        "sbs_booking_otp",
        finalBookingOtp
      );

      localStorage.setItem(
        "sbs_ride_otp",
        finalBookingOtp
      );

      localStorage.setItem(
        "sbs_ride_status",
        finalStatus
      );

      /* ======================================================
         SESSION IDENTIFIERS
      ====================================================== */

      sessionStorage.setItem(
        "sbs_ride_id",
        finalRideId
      );

      sessionStorage.setItem(
        "sbs_booking_id",
        finalBookingId
      );

      sessionStorage.setItem(
        "sbs_booking_number",
        finalBookingNumber
      );

      sessionStorage.setItem(
        "sbs_booking_otp",
        finalBookingOtp
      );

      sessionStorage.setItem(
        "sbs_ride_otp",
        finalBookingOtp
      );

      sessionStorage.setItem(
        "sbs_ride_status",
        finalStatus
      );

      sessionStorage.setItem(
        "sbs_payment_status",
        finalPaymentStatus
      );

      sessionStorage.setItem(
        "sbs_passengers",
        String(
          finalPassengers
        )
      );

      sessionStorage.setItem(
        "sbs_number_of_passengers",
        String(
          finalPassengers
        )
      );

      sessionStorage.setItem(
        "sbs_babies",
        String(
          finalBabies
        )
      );

      sessionStorage.setItem(
        "sbs_elderly",
        String(
          finalElderly
        )
      );

      sessionStorage.setItem(
        "sbs_trip_type",
        finalTripType
      );

      /* ======================================================
         EVENT
      ====================================================== */

      window.dispatchEvent(
        new CustomEvent(
          "sbs-booking-confirmed",
          {
            detail:
              bookingInformation,
          }
        )
      );

      console.log(
        "BOOKING INFORMATION SAVED SUCCESSFULLY"
      );
    } catch (storageError) {
      console.error(
        "BOOKING STORAGE ERROR:",
        storageError
      );

      throw new Error(
        "Booking was created, but the booking information could not be saved."
      );
    }
  };

  /* ==========================================================
     CONFIRM BOOKING
  ========================================================== */

  const handleConfirmBooking =
    async () => {
      setMessage("");

      setError("");

      setBookingNumber("");

      setBookingId("");

      setRideId("");

      setBookingOtp("");

      setCancelled(false);

      setCancelMessage("");

      /* ========================================================
         VALIDATION
      ======================================================== */

      if (!pickup) {
        setError(
          "Please select your pickup location."
        );

        return;
      }

      if (!drop) {
        setError(
          "Please select your destination."
        );

        return;
      }

      if (
        pickup.latitude == null ||
        pickup.longitude == null ||
        drop.latitude == null ||
        drop.longitude == null
      ) {
        setError(
          "Valid pickup and destination locations are required."
        );

        return;
      }

      if (distanceKm <= 0) {
        setError(
          "Please wait for the route distance to be calculated."
        );

        return;
      }

      if (!pickupDate) {
        setError(
          "Please select pickup date."
        );

        return;
      }

      if (!pickupTime) {
        setError(
          "Please select pickup time."
        );

        return;
      }

      if (!passengerName.trim()) {
        setError(
          "Please enter passenger name."
        );

        return;
      }

      if (!phone.trim()) {
        setError(
          "Please enter passenger phone number."
        );

        return;
      }

      if (
        passengerCount < 1 ||
        passengerCount >
          selectedVehicle.seats
      ) {
        setError(
          `This vehicle can accommodate a maximum of ${selectedVehicle.seats} passengers.`
        );

        return;
      }

      if (!userId || userId <= 0) {
        setError(
          "Please sign in before booking."
        );

        return;
      }

      /* ========================================================
         CREATE BOOKING
      ======================================================== */

      try {
        setLoading(true);

        const finalPassengerCount =
          Number(passengers) || 1;

        const finalBabies =
          Number(babies) || 0;

        const finalElderly =
          Number(elderly) || 0;

        const finalDistance =
          Number(distanceKm) || 0;

        const finalDuration =
          Number(durationMinutes) || 0;

        const finalFare =
          Number(estimatedFare) || 0;

        const finalTripType =
          tripType.trim() ||
          "One Way";

        const finalPaymentMethod =
          paymentMethod.trim() ||
          "Cash";

        /* ======================================================
           COMPLETE BOOKING REQUEST
        ====================================================== */

        const requestBody = {
          /* USER */

          user_id:
            userId,

          /* VEHICLE */

          vehicle_type_id:
            selectedVehicle.id,

          vehicleType:
            selectedVehicle.name,

          vehicle_type:
            selectedVehicle.name,

          /* PICKUP */

          pickup_address:
            pickup.name,

          pickup_latitude:
            pickup.latitude,

          pickup_longitude:
            pickup.longitude,

          /* DROP */

          drop_address:
            drop.name,

          drop_latitude:
            drop.latitude,

          drop_longitude:
            drop.longitude,

          /* FARE */

          estimated_fare:
            finalFare,

          distanceKm:
            finalDistance,

          estimated_distance:
            finalDistance,

          durationMinutes:
            finalDuration,

          estimated_duration:
            finalDuration,

          /* PASSENGER */

          passengerName:
            passengerName.trim(),

          passenger_name:
            passengerName.trim(),

          email:
            email.trim(),

          phone:
            phone.trim(),

          /* PASSENGERS */

          passengers:
            finalPassengerCount,

          number_of_passengers:
            finalPassengerCount,

          numberOfPassengers:
            finalPassengerCount,

          babies:
            finalBabies,

          elderly:
            finalElderly,

          seats:
            selectedVehicle.seats,

          /* TRIP */

          tripType:
            finalTripType,

          trip_type:
            finalTripType,

          /* DATE */

          pickupDate:
            pickupDate,

          pickup_date:
            pickupDate,

          /* TIME */

          pickupTime:
            pickupTime,

          pickup_time:
            pickupTime,

          /* PREFERENCES */

          additionalPreferences:
            additionalPreferences.trim(),

          additional_preferences:
            additionalPreferences.trim(),

          /* PAYMENT */

          paymentMethod:
            finalPaymentMethod,

          payment_method:
            finalPaymentMethod,

          /* EXTRA */

          booking_source:
            "website",

          project:
            "SBS TAXI",
        };

        /* ======================================================
           REQUEST LOG
        ====================================================== */

        console.log(
          "================================================="
        );

        console.log(
          "SBS TAXI - CREATE BOOKING REQUEST"
        );

        console.log(
          "================================================="
        );

        console.log(
          JSON.stringify(
            requestBody,
            null,
            2
          )
        );

        console.log(
          "================================================="
        );

        /* ======================================================
           API
        ====================================================== */

        const response =
          await fetch(
            "/api/passenger/booking",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  requestBody
                ),
            }
          );

        let data: BookingApiResult;

        try {
          data =
            (await response.json()) as BookingApiResult;
        } catch {
          throw new Error(
            "Invalid response received from booking server."
          );
        }

        /* ======================================================
           API RESPONSE LOG
        ====================================================== */

        console.log(
          "================================================="
        );

        console.log(
          "SBS TAXI - BOOKING API RESPONSE"
        );

        console.log(
          "================================================="
        );

        console.log(
          JSON.stringify(
            data,
            null,
            2
          )
        );

        console.log(
          "================================================="
        );

        if (
          !response.ok ||
          data.success !== true
        ) {
          throw new Error(
            data.message ||
              "Unable to create booking."
          );
        }

        /* ======================================================
           GET RIDE ID
        ====================================================== */

        const returnedRideId =
          data.data?.ride_id ??
          data.data?.rideId ??
          data.ride_id ??
          data.rideId ??
          "";

        /* ======================================================
           GET BOOKING ID
        ====================================================== */

        const returnedBookingId =
          data.data?.booking_id ??
          data.data?.bookingId ??
          data.booking_id ??
          data.bookingId ??
          "";

        /* ======================================================
           GET BOOKING NUMBER
        ====================================================== */

        const returnedBookingNumber =
          data.data?.booking_number ??
          data.data?.bookingNumber ??
          data.data?.booking_reference ??
          data.data
            ?.booking_reference_number ??
          data.booking_number ??
          data.bookingNumber ??
          data.booking_reference ??
          data.booking_reference_number ??
          "";

        /* ======================================================
           GET OTP
        ====================================================== */

        const returnedOtp =
          data.data?.ride_otp ??
          data.data?.booking_otp ??
          data.data?.otp ??
          data.ride_otp ??
          data.booking_otp ??
          data.otp ??
          "";

        /* ======================================================
           GET STATUS
        ====================================================== */

        const returnedStatus =
          data.data?.status ??
          data.status ??
          "searching";

        /* ======================================================
           GET DISTANCE
        ====================================================== */

        const returnedDistance =
          Number(
            data.data
              ?.estimated_distance ??
              data.estimated_distance ??
              distanceKm
          );

        /* ======================================================
           GET DURATION
        ====================================================== */

        const returnedDuration =
          Number(
            data.data
              ?.estimated_duration ??
              data.estimated_duration ??
              durationMinutes
          );

        /* ======================================================
           GET FARE
        ====================================================== */

        const returnedFare =
          Number(
            data.data
              ?.estimated_fare ??
              data.estimated_fare ??
              estimatedFare
          );

        /* ======================================================
           GET PAYMENT METHOD
        ====================================================== */

        const returnedPaymentMethod =
          data.data
            ?.payment_method ??
          data.payment_method ??
          paymentMethod.toLowerCase();

        /* ======================================================
           GET PAYMENT STATUS
        ====================================================== */

        const returnedPaymentStatus =
          data.data
            ?.payment_status ??
          data.payment_status ??
          "pending";

        /* ======================================================
           GET PASSENGERS
        ====================================================== */

        const returnedPassengers =
          Number(
            data.data?.passengers ??
              data.data
                ?.number_of_passengers ??
              data.passengers ??
              data.number_of_passengers ??
              finalPassengerCount
          );

        /* ======================================================
           GET BABIES
        ====================================================== */

        const returnedBabies =
          Number(
            data.data?.babies ??
              data.babies ??
              finalBabies
          );

        /* ======================================================
           GET ELDERLY
        ====================================================== */

        const returnedElderly =
          Number(
            data.data?.elderly ??
              data.elderly ??
              finalElderly
          );

        /* ======================================================
           GET TRIP TYPE
        ====================================================== */

        const returnedTripType =
          String(
            data.data?.trip_type ??
              data.data?.tripType ??
              data.trip_type ??
              data.tripType ??
              finalTripType
          );

        /* ======================================================
           FINAL VALUES
        ====================================================== */

        const finalRideId =
          String(
            returnedRideId || ""
          );

        const finalBookingId =
          String(
            returnedBookingId || ""
          );

        const finalBookingNumber =
          String(
            returnedBookingNumber || ""
          );

        const finalBookingOtp =
          String(
            returnedOtp || ""
          );

        const finalStatus =
          String(
            returnedStatus ||
              "searching"
          );

        /* ======================================================
           FINAL BOOKING LOG
        ====================================================== */

        console.log(
          "================================================="
        );

        console.log(
          "SBS TAXI - FINAL BOOKING INFORMATION"
        );

        console.log(
          "================================================="
        );

        console.log(
          "ride_id:",
          finalRideId
        );

        console.log(
          "booking_id:",
          finalBookingId
        );

        console.log(
          "booking_number:",
          finalBookingNumber
        );

        console.log(
          "ride_otp:",
          finalBookingOtp
        );

        console.log(
          "status:",
          finalStatus
        );

        console.log(
          "passengers:",
          returnedPassengers
        );

        console.log(
          "babies:",
          returnedBabies
        );

        console.log(
          "elderly:",
          returnedElderly
        );

        console.log(
          "trip_type:",
          returnedTripType
        );

        console.log(
          "payment_method:",
          returnedPaymentMethod
        );

        console.log(
          "payment_status:",
          returnedPaymentStatus
        );

        console.log(
          "estimated_fare:",
          returnedFare
        );

        console.log(
          "estimated_distance:",
          returnedDistance
        );

        console.log(
          "estimated_duration:",
          returnedDuration
        );

        console.log(
          "================================================="
        );

        /* ======================================================
           RIDE ID REQUIRED
        ====================================================== */

        if (!finalRideId) {
          throw new Error(
            "Booking was created, but ride_id was not returned by the server."
          );
        }

        /* ======================================================
           BOOKING ID WARNING
        ====================================================== */

        if (!finalBookingId) {
          console.warn(
            "Booking created but booking_id was not returned by the server."
          );
        }

        /* ======================================================
           OTP WARNING
        ====================================================== */

        if (!finalBookingOtp) {
          console.warn(
            "Booking created but ride OTP was not returned by the server."
          );
        }

        /* ======================================================
           UPDATE STATE
        ====================================================== */

        setRideId(
          finalRideId
        );

        setBookingId(
          finalBookingId
        );

        setBookingNumber(
          finalBookingNumber
        );

        setBookingOtp(
          finalBookingOtp
        );

        setServerDistance(
          returnedDistance
        );

        setServerDuration(
          returnedDuration
        );

        setServerFare(
          returnedFare
        );

        setServerPaymentMethod(
          String(
            returnedPaymentMethod
          )
        );

        setServerPaymentStatus(
          String(
            returnedPaymentStatus
          )
        );

        setMessage(
          data.message ||
            "Ride created successfully. Searching for driver..."
        );

        /* ======================================================
           SAVE COMPLETE BOOKING INFORMATION
        ====================================================== */

        saveSearchDriverData(
          finalRideId,
          finalBookingId,
          finalBookingNumber,
          finalBookingOtp,
          finalStatus,
          returnedDistance,
          returnedDuration,
          returnedFare,
          String(
            returnedPaymentMethod
          ),
          String(
            returnedPaymentStatus
          ),
          returnedPassengers,
          returnedBabies,
          returnedElderly,
          returnedTripType,
          data
        );

        /* ======================================================
           SEARCH DRIVER QUERY
           
           IMPORTANT:
           Only IDs are sent through the URL.
           Complete booking information is in localStorage.
        ====================================================== */

        const query =
          new URLSearchParams();

        query.set(
          "ride_id",
          finalRideId
        );

        if (finalBookingId) {
          query.set(
            "booking_id",
            finalBookingId
          );
        }

        if (finalBookingNumber) {
          query.set(
            "booking_number",
            finalBookingNumber
          );
        }

        console.log(
          "================================================="
        );

        console.log(
          "SEARCH DRIVER REDIRECT"
        );

        console.log(
          "================================================="
        );

        console.log(
          Object.fromEntries(
            query.entries()
          )
        );

        console.log(
          "================================================="
        );

        /* ======================================================
           REDIRECT
        ====================================================== */

        router.push(
          `/passenger/search-driver?${query.toString()}`
        );
      } catch (err) {
        console.error(
          "================================================="
        );

        console.error(
          "CREATE BOOKING ERROR"
        );

        console.error(
          err
        );

        console.error(
          "================================================="
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to create booking."
        );
      } finally {
        setLoading(false);
      }
    };

  /* ==========================================================
     CANCEL BOOKING
  ========================================================== */

  const handleCancelBooking =
    async () => {
      setError("");

      setCancelMessage("");

      const finalRideId =
        Number(rideId);

      if (
        !finalRideId ||
        finalRideId <= 0
      ) {
        setError(
          "Valid ride ID is required to cancel this ride."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to cancel this ride?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setCancelling(true);

        const response =
          await fetch(
            "/api/passenger/cancel",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify({
                  ride_id:
                    finalRideId,
                }),
            }
          );

        let result: CancelApiResult;

        try {
          result =
            (await response.json()) as CancelApiResult;
        } catch {
          throw new Error(
            "Invalid response received from cancellation server."
          );
        }

        console.log(
          "CANCEL API RESPONSE:",
          result
        );

        if (
          !response.ok ||
          result.success !== true
        ) {
          throw new Error(
            result.message ||
              "Unable to cancel booking."
          );
        }

        setCancelled(true);

        setCancelMessage(
          result.message ||
            "Ride cancelled successfully."
        );

        setMessage("");

        /* ====================================================
           UPDATE LOCAL STORAGE
        ==================================================== */

        try {
          const raw =
            localStorage.getItem(
              "sbs_booking_information"
            );

          if (raw) {
            const existing =
              JSON.parse(raw);

            const updated = {
              ...existing,

              status:
                "cancelled",

              cancelledAt:
                new Date().toISOString(),

              cancelled_at:
                new Date().toISOString(),
            };

            localStorage.setItem(
              "sbs_booking_information",
              JSON.stringify(
                updated
              )
            );
          }
        } catch (storageError) {
          console.warn(
            "Unable to update local booking storage.",
            storageError
          );
        }

        /* ====================================================
           UPDATE SESSION
        ==================================================== */

        try {
          const raw =
            sessionStorage.getItem(
              "sbs_search_driver_booking"
            );

          if (raw) {
            const existing =
              JSON.parse(raw);

            sessionStorage.setItem(
              "sbs_search_driver_booking",
              JSON.stringify({
                ...existing,

                rideId:
                  String(
                    finalRideId
                  ),

                ride_id:
                  String(
                    finalRideId
                  ),

                bookingId:
                  bookingId,

                booking_id:
                  bookingId,

                status:
                  "cancelled",

                cancelledAt:
                  new Date().toISOString(),

                cancelled_at:
                  new Date().toISOString(),
              })
            );
          }

          sessionStorage.setItem(
            "sbs_ride_status",
            "cancelled"
          );

          sessionStorage.setItem(
            "sbs_ride_id",
            String(
              finalRideId
            )
          );
        } catch (storageError) {
          console.warn(
            "Unable to update session storage.",
            storageError
          );
        }
      } catch (err) {
        console.error(
          "CANCEL BOOKING ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to cancel booking."
        );
      } finally {
        setCancelling(false);
      }
    };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="relative z-0 isolate min-h-screen bg-slate-50 pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="relative z-0 mb-6">
          <p className="text-sm font-semibold text-[#123f80]">
            SBS TAXI
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Book Your Ride
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Choose pickup, destination and vehicle
            to get your fare estimate.
          </p>
        </div>

        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div className="relative z-0 grid items-start gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">

          {/* ==================================================
              LEFT
          ================================================== */}

          <section className="relative z-0 space-y-5 lg:sticky lg:top-24">

            {/* ==================================================
                RIDE DETAILS
            ================================================== */}

            <div className="relative z-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#123f80]">
                  <Route className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Ride Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    Select your pickup and destination
                  </p>
                </div>

              </div>

              <CurrentLocation
                setLocation={
                  setCurrentLocation
                }
                onLocation={
                  setPickup
                }
              />

              <PlaceSearch
                label="Pickup Location"
                placeholder="Search pickup location"
                value={pickup}
                onSelect={
                  setPickup
                }
              />

              <div className="mt-5">
                <PlaceSearch
                  label="Drop Location"
                  placeholder="Search destination"
                  value={drop}
                  onSelect={
                    setDrop
                  }
                />
              </div>

              {/* DATE / TIME */}

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Pickup Date
                  </label>

                  <div className="relative">

                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="date"
                      value={
                        pickupDate
                      }
                      min={
                        pickupDate
                      }
                      onChange={(e) =>
                        setPickupDate(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                    />

                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Pickup Time
                  </label>

                  <div className="relative">

                    <Timer className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="time"
                      value={
                        pickupTime
                      }
                      onChange={(e) =>
                        setPickupTime(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                    />

                  </div>
                </div>

              </div>

              {/* TRIP TYPE */}

              <div className="mt-5">

                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Trip Type
                </label>

                <select
                  value={
                    tripType
                  }
                  onChange={(e) =>
                    setTripType(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="One Way">
                    One Way
                  </option>

                  <option value="Round Trip">
                    Round Trip
                  </option>

                  <option value="Multi Day">
                    Multi Day
                  </option>
                </select>

                <p className="mt-2 text-[11px] font-semibold text-[#123f80]">
                  Selected Trip Type:{" "}
                  {tripType}
                </p>

              </div>

              {/* CURRENT LOCATION */}

              {currentLocation && (
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Navigation className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-blue-800">
                        Current Location
                      </p>

                      <p className="mt-1 text-xs text-blue-600">
                        GPS location detected
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {/* PICKUP PREVIEW */}

              {pickup && (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                  <div className="flex gap-3">

                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div className="min-w-0">

                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                        Pickup
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {pickup.name}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* DROP PREVIEW */}

              {drop && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">

                  <div className="flex gap-3">

                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                    <div className="min-w-0">

                      <p className="text-xs font-bold uppercase tracking-wide text-red-600">
                        Destination
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {drop.name}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* DISTANCE */}

              {distanceKm > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <p className="text-xs text-slate-500">
                      Trip Distance
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {distanceKm.toFixed(
                        2
                      )}{" "}
                      km
                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <p className="text-xs text-slate-500">
                      Estimated Time
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xl font-bold text-slate-900">

                      <Clock3 className="h-4 w-4" />

                      {durationMinutes ||
                        "-"}{" "}
                      mins

                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* ==================================================
                VEHICLES
            ================================================== */}

            <div className="relative z-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <h2 className="font-bold text-slate-900">
                    Choose Vehicle
                  </h2>

                  <p className="text-xs text-slate-500">
                    Vehicle determines passenger capacity
                  </p>
                </div>

                <CarFront className="h-5 w-5 text-[#123f80]" />

              </div>

              <div className="space-y-3">

                {VEHICLES.map(
                  (vehicle) => {
                    const fare =
                      calculateFare(
                        distanceKm,
                        vehicle.rate
                      );

                    const selected =
                      selectedVehicleId ===
                      vehicle.id;

                    return (
                      <button
                        key={
                          vehicle.id
                        }
                        type="button"
                        onClick={() => {
                          setSelectedVehicleId(
                            vehicle.id
                          );

                          if (
                            passengerCount >
                            vehicle.seats
                          ) {
                            setPassengers(
                              String(
                                vehicle.seats
                              )
                            );
                          }
                        }}
                        className={`w-full rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-[#123f80] bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">

                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              selected
                                ? "bg-[#123f80] text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <CarFront className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex items-center justify-between gap-3">

                              <p className="font-bold text-slate-900">
                                {
                                  vehicle.name
                                }
                              </p>

                              <p className="font-bold text-[#123f80]">
                                {distanceKm >
                                0
                                  ? money(
                                      fare
                                    )
                                  : `₹${vehicle.rate}/km`}
                              </p>

                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">

                              <span className="flex items-center gap-1">

                                <Users className="h-3 w-3" />

                                Up to{" "}
                                {
                                  vehicle.seats
                                }{" "}
                                passengers

                              </span>

                              <span>
                                {
                                  vehicle.description
                                }
                              </span>

                            </div>

                          </div>

                          {selected && (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#123f80]" />
                          )}

                        </div>
                      </button>
                    );
                  }
                )}

              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123f80] text-white">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>

                    <p className="text-xs font-semibold text-blue-600">
                      Selected Vehicle Capacity
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-900">
                      {
                        selectedVehicle.name
                      }{" "}
                      ·{" "}
                      {
                        selectedVehicle.seats
                      }{" "}
                      passengers maximum
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ==================================================
              RIGHT
          ================================================== */}

          <section className="relative z-0 min-w-0 space-y-5">

            {/* ==================================================
                MAP
            ================================================== */}

            <div className="relative z-0 isolate overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <RouteMap
                pickup={pickup}
                drop={drop}
                currentLocation={
                  currentLocation
                }
                setDistanceKm={
                  setDistanceKm
                }
              />

            </div>

            {/* ==================================================
                PASSENGER DETAILS
            ================================================== */}

            <div className="relative z-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#123f80]">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Passenger Details
                    </h2>

                    <p className="text-xs text-slate-500">
                      Enter passenger information
                    </p>

                  </div>

                </div>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* NAME */}

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Passenger Name
                  </label>

                  <input
                    value={
                      passengerName
                    }
                    onChange={(e) =>
                      setPassengerName(
                        e.target.value
                      )
                    }
                    placeholder="Enter passenger name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={
                      email
                    }
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="Email address"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* PHONE */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={
                      phone
                    }
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* PASSENGERS */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700">

                    <Users className="h-4 w-4 text-slate-500" />

                    Number of Passengers

                  </label>

                  <select
                    value={
                      passengers
                    }
                    onChange={(e) =>
                      setPassengers(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  >
                    {Array.from(
                      {
                        length:
                          selectedVehicle.seats,
                      },
                      (_, index) =>
                        index + 1
                    ).map(
                      (count) => (
                        <option
                          key={
                            count
                          }
                          value={
                            count
                          }
                        >
                          {count}{" "}
                          {count ===
                          1
                            ? "Passenger"
                            : "Passengers"}
                        </option>
                      )
                    )}
                  </select>

                </div>

                {/* BABIES */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700">

                    <Baby className="h-4 w-4 text-slate-500" />

                    Babies

                  </label>

                  <select
                    value={
                      babies
                    }
                    onChange={(e) =>
                      setBabies(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="0">
                      0
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4">
                      4
                    </option>
                  </select>

                </div>

                {/* ELDERLY */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700">

                    <Users className="h-4 w-4 text-slate-500" />

                    Elderly

                  </label>

                  <select
                    value={
                      elderly
                    }
                    onChange={(e) =>
                      setElderly(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="0">
                      0
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4">
                      4
                    </option>
                  </select>

                </div>

                {/* PAYMENT */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Payment Method
                  </label>

                  <select
                    value={
                      paymentMethod
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Card">
                      Card
                    </option>
                  </select>

                </div>

                {/* PREFERENCES */}

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-xs font-bold text-slate-700">

                    Additional Preferences

                    <span className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </span>

                  </label>

                  <textarea
                    value={
                      additionalPreferences
                    }
                    onChange={(e) =>
                      setAdditionalPreferences(
                        e.target.value
                      )
                    }
                    placeholder="Example: Need child seat, extra luggage space, wheelchair assistance..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123f80] focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#123f80]">
                      <Users className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="text-xs text-blue-600">
                        Passengers
                      </p>

                      <p className="font-bold text-blue-900">
                        {
                          passengerCount
                        }{" "}
                        {
                          passengerCount ===
                          1
                            ? "Passenger"
                            : "Passengers"
                        }
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-blue-600">
                      Vehicle
                    </p>

                    <p className="font-bold text-blue-900">
                      {
                        selectedVehicle.name
                      }
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================================
                FARE
            ================================================== */}

            <div className="relative z-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <ShieldCheck className="h-5 w-5 text-emerald-600" />

                    <p className="text-sm font-semibold text-slate-600">
                      Fare Estimate
                    </p>

                  </div>

                  <h2 className="mt-1 text-3xl font-black text-[#123f80]">
                    {displayFare >
                    0
                      ? money(
                          displayFare
                        )
                      : "₹0"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">

                    {
                      selectedVehicle.name
                    }

                    {" · "}

                    {
                      passengerCount
                    }{" "}
                    {
                      passengerCount ===
                      1
                        ? "passenger"
                        : "passengers"
                    }

                    {" · "}

                    {distanceKm >
                    0
                      ? `${distanceKm.toFixed(
                          2
                        )} km`
                      : "Distance pending"}

                  </p>

                </div>

                <div className="rounded-2xl bg-blue-50 px-5 py-4">

                  <p className="text-xs text-blue-600">
                    Rate
                  </p>

                  <p className="mt-1 font-bold text-blue-900">
                    ₹
                    {
                      selectedVehicle.rate
                    }
                    /km
                  </p>

                </div>

              </div>

              {/* SUMMARY */}

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Vehicle
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      selectedVehicle.name
                    }
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Passengers
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      passengerCount
                    }
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Distance
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {serverDistance !==
                    null
                      ? `${serverDistance.toFixed(
                          2
                        )} km`
                      : distanceKm >
                        0
                      ? `${distanceKm.toFixed(
                          2
                        )} km`
                      : "-"}
                  </p>

                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                  <p className="text-xs text-blue-600">
                    Trip Type
                  </p>

                  <p className="mt-1 font-bold text-blue-900">
                    {
                      tripType
                    }
                  </p>

                </div>

              </div>

              {/* PAYMENT */}

              <div className="mt-3 grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Payment
                  </p>

                  <p className="mt-1 font-bold capitalize text-slate-900">
                    {
                      serverPaymentMethod ||
                      paymentMethod
                    }
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Payment Status
                  </p>

                  <p className="mt-1 font-bold capitalize text-amber-600">
                    {
                      serverPaymentStatus ||
                      "pending"
                    }
                  </p>

                </div>

              </div>

              {/* SERVER DURATION */}

              {serverDuration !==
                null &&
                serverDuration > 0 && (
                  <div className="mt-3 rounded-2xl bg-slate-50 p-4">

                    <p className="text-xs text-slate-500">
                      Server Estimated Duration
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {
                        serverDuration
                      }{" "}
                      minutes
                    </p>

                  </div>
                )}

              {/* DATE TIME */}

              <div className="mt-3 grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Pickup Date
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      pickupDate ||
                      "-"
                    }
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Pickup Time
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      pickupTime ||
                      "-"
                    }
                  </p>

                </div>

              </div>

              {/* PASSENGERS */}

              <div className="mt-3 grid gap-3 sm:grid-cols-3">

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Passengers
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      passengerCount
                    }
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Babies
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      babies
                    }
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">
                    Elderly
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      elderly
                    }
                  </p>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">

                  <XCircle className="h-5 w-5 shrink-0" />

                  <span>
                    {error}
                  </span>

                </div>
              )}

              {/* SUCCESS */}

              {message &&
                !cancelled && (
                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                    <div className="flex gap-3">

                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />

                      <div className="min-w-0 flex-1">

                        <p className="font-bold text-emerald-800">
                          {
                            message
                          }
                        </p>

                        {/* RIDE ID */}

                        {rideId && (
                          <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-3">

                            <p className="text-xs font-semibold text-slate-500">
                              Ride ID
                            </p>

                            <p className="mt-1 text-lg font-black text-slate-900">
                              {
                                rideId
                              }
                            </p>

                          </div>
                        )}

                        {/* BOOKING ID */}

                        {bookingId && (
                          <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-3">

                            <p className="text-xs font-semibold text-slate-500">
                              Booking ID
                            </p>

                            <p className="mt-1 text-lg font-black text-slate-900">
                              {
                                bookingId
                              }
                            </p>

                          </div>
                        )}

                        {/* BOOKING NUMBER */}

                        {bookingNumber && (
                          <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-3">

                            <p className="text-xs font-semibold text-slate-500">
                              Booking Number
                            </p>

                            <p className="mt-1 break-all text-lg font-black text-slate-900">
                              {
                                bookingNumber
                              }
                            </p>

                          </div>
                        )}

                        {/* OTP */}

                        {bookingOtp && (
                          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4">

                            <div className="flex items-center justify-between gap-3">

                              <div>

                                <p className="text-xs font-semibold text-amber-700">
                                  Ride OTP
                                </p>

                                <p className="mt-1 text-2xl font-black tracking-[0.3em] text-amber-900">
                                  {
                                    bookingOtp
                                  }
                                </p>

                              </div>

                              <ShieldCheck className="h-7 w-7 text-amber-600" />

                            </div>

                          </div>
                        )}

                        {/* PASSENGERS */}

                        <div className="mt-3 grid gap-3 sm:grid-cols-4">

                          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">

                            <p className="text-xs font-semibold text-blue-600">
                              Passengers
                            </p>

                            <p className="mt-1 text-lg font-black text-blue-900">
                              {
                                passengerCount
                              }
                            </p>

                          </div>

                          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">

                            <p className="text-xs font-semibold text-blue-600">
                              Babies
                            </p>

                            <p className="mt-1 text-lg font-black text-blue-900">
                              {
                                babies
                              }
                            </p>

                          </div>

                          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">

                            <p className="text-xs font-semibold text-blue-600">
                              Elderly
                            </p>

                            <p className="mt-1 text-lg font-black text-blue-900">
                              {
                                elderly
                              }
                            </p>

                          </div>

                          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">

                            <p className="text-xs font-semibold text-blue-600">
                              Trip Type
                            </p>

                            <p className="mt-1 text-sm font-black text-blue-900">
                              {
                                tripType
                              }
                            </p>

                          </div>

                        </div>

                        {/* STATUS */}

                        <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3">

                          <p className="text-xs font-semibold text-blue-600">
                            Ride Status
                          </p>

                          <p className="mt-1 font-black uppercase text-blue-900">
                            {
                              finalStatusText(
                                "searching"
                              )
                            }
                          </p>

                        </div>

                        {/* CANCEL */}

                        <button
                          type="button"
                          onClick={
                            handleCancelBooking
                          }
                          disabled={
                            cancelling
                          }
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3.5 text-sm font-bold text-red-700 transition hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                          {cancelling ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />

                              Cancelling Ride...
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5" />

                              Cancel Booking
                            </>
                          )}

                        </button>

                        <p className="mt-2 text-center text-[11px] text-slate-400">
                          You can cancel this ride before it is started.
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              {/* CANCELLED */}

              {cancelled && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5">

                  <div className="flex gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">

                      <XCircle className="h-5 w-5 text-red-600" />

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="font-bold text-red-800">
                        Ride Cancelled
                      </p>

                      <p className="mt-1 text-sm text-red-700">
                        {
                          cancelMessage ||
                          "Your ride has been cancelled successfully."
                        }
                      </p>

                      {rideId && (
                        <div className="mt-3 rounded-xl border border-red-200 bg-white p-3">

                          <p className="text-xs font-semibold text-slate-500">
                            Ride ID
                          </p>

                          <p className="mt-1 font-black text-slate-900">
                            {
                              rideId
                            }
                          </p>

                        </div>
                      )}

                      {bookingId && (
                        <div className="mt-3 rounded-xl border border-red-200 bg-white p-3">

                          <p className="text-xs font-semibold text-slate-500">
                            Booking ID
                          </p>

                          <p className="mt-1 font-black text-slate-900">
                            {
                              bookingId
                            }
                          </p>

                        </div>
                      )}

                      {bookingNumber && (
                        <div className="mt-3 rounded-xl border border-red-200 bg-white p-3">

                          <p className="text-xs font-semibold text-slate-500">
                            Booking Number
                          </p>

                          <p className="mt-1 break-all font-black text-slate-900">
                            {
                              bookingNumber
                            }
                          </p>

                        </div>
                      )}

                      <div className="mt-4 rounded-xl border border-red-200 bg-white p-3">

                        <p className="text-xs text-slate-500">
                          Status
                        </p>

                        <p className="mt-1 font-bold text-red-700">
                          CANCELLED
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            "/passenger/dashboard"
                          )
                        }
                        className="mt-4 w-full rounded-xl bg-[#123f80] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d3268]"
                      >
                        Back to Dashboard
                      </button>

                    </div>

                  </div>

                </div>
              )}

              {/* CONFIRM BUTTON */}

              {!cancelled && (
                <button
                  type="button"
                  onClick={
                    handleConfirmBooking
                  }
                  disabled={
                    loading ||
                    !pickup ||
                    !drop ||
                    distanceKm <= 0 ||
                    passengerCount >
                      selectedVehicle.seats
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123f80] px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#0d3268] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >

                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />

                      Creating Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />

                      Confirm Booking ·{" "}

                      {displayFare >
                      0
                        ? money(
                            displayFare
                          )
                        : "₹0"}
                    </>
                  )}

                </button>
              )}

              <p className="mt-3 text-center text-xs text-slate-400">
                Your booking will be created only
                after the SBS Taxi server confirms it.
              </p>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}

/* ============================================================
   STATUS TEXT HELPER
============================================================ */

function finalStatusText(
  status: string
) {
  return String(
    status || "SEARCHING"
  ).toUpperCase();
}