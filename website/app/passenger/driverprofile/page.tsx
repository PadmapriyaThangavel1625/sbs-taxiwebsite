"use client";

import {
  ArrowLeft,
  CarFront,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import Link from "next/link";

import {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

/* ============================================================
   TYPES
============================================================ */

interface DriverProfile {
  id?: number | string | null;

  name?: string | null;
  mobile?: string | null;
  email?: string | null;

  profile_image?: string | null;
  rating?: number | string | null;

  availability_status?: string | null;

  vehicle_id?: number | string | null;
  vehicle_number?: string | null;

  manufacturer?: string | null;
  vehicle_model?: string | null;
  vehicle_color?: string | null;

  vehicle_type_id?: number | string | null;
  vehicle_type_name?: string | null;
  vehicle_capacity?: number | string | null;
}

interface VehicleType {
  id?: number | string | null;
  name?: string | null;
  capacity?: number | string | null;
}

interface VehicleData {
  id?: number | string | null;

  number?: string | null;

  manufacturer?: string | null;
  model?: string | null;
  color?: string | null;

  type?: VehicleType | null;
}

interface RideData {
  ride_id?: number | string | null;

  booking_id?: number | string | null;
  booking_number?: string | null;

  status?: string | null;
  ride_status?: string | null;

  pickup_address?: string | null;
  pickup_latitude?: number | string | null;
  pickup_longitude?: number | string | null;

  drop_address?: string | null;
  drop_latitude?: number | string | null;
  drop_longitude?: number | string | null;

  estimated_distance?: number | string | null;
  estimated_duration?: number | string | null;

  estimated_fare?: number | string | null;
  fare?: number | string | null;

  payment_method?: string | null;

  user_id?: number | string | null;

  user_name?: string | null;
  user_mobile?: string | null;
  user_email?: string | null;

  passenger_name?: string | null;
  passenger_phone?: string | null;
  passenger_email?: string | null;

  driver_id?: number | string | null;
  driver_name?: string | null;
  driver_mobile?: string | null;
  driver_email?: string | null;

  driver_profile_image?: string | null;
  driver_rating?: number | string | null;

  vehicle_id?: number | string | null;
  vehicle_type_id?: number | string | null;
  vehicle_type_name?: string | null;
  vehicle_capacity?: number | string | null;

  vehicle_number?: string | null;
  manufacturer?: string | null;
  vehicle_model?: string | null;
  vehicle_color?: string | null;

  ride_otp?: string | number | null;
  otp?: string | number | null;
  booking_otp?: string | number | null;

  pickup_date?: string | null;
  pickup_time?: string | null;

  passenger_count?: number | string | null;
  people?: number | string | null;
  babies?: number | string | null;
  elderly?: number | string | null;

  trip_type?: string | null;

  [key: string]: unknown;
}

interface DriverDetailsResponse {
  success?: boolean;
  message?: string;
  error?: string;

  data?: unknown;

  driver?: DriverProfile | null;
  profile?: DriverProfile | null;

  vehicle?: VehicleData | null;

  ride?: RideData | null;

  [key: string]: unknown;
}

/* ============================================================
   SAFE STRING
============================================================ */

function safeString(
  value: string | number | null | undefined,
  fallback = "Not available"
): string {
  if (
    value === undefined ||
    value === null
  ) {
    return fallback;
  }

  const result = String(value).trim();

  return result !== ""
    ? result
    : fallback;
}

/* ============================================================
   RATING
============================================================ */

function formatRating(
  value: string | number | null | undefined
): string {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return "New";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "New";
  }

  return number.toFixed(1);
}

/* ============================================================
   OBJECT HELPER
============================================================ */

function isObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

/* ============================================================
   FIND NESTED OBJECT
============================================================ */

function findObject(
  source: unknown,
  keys: string[]
): Record<string, unknown> | null {
  if (!isObject(source)) {
    return null;
  }

  for (const key of keys) {
    const value = source[key];

    if (isObject(value)) {
      return value;
    }
  }

  for (const value of Object.values(source)) {
    if (!isObject(value)) {
      continue;
    }

    for (const key of keys) {
      const nested = value[key];

      if (isObject(nested)) {
        return nested;
      }
    }
  }

  return null;
}

/* ============================================================
   NORMALIZE DRIVER
============================================================ */

function normalizeDriver(
  value: unknown
): DriverProfile | null {
  if (!isObject(value)) {
    return null;
  }

  const id =
    value.id ??
    value.driver_id ??
    value.driverId ??
    null;

  const name =
    value.name ??
    value.driver_name ??
    value.driverName ??
    value.full_name ??
    null;

  const mobile =
    value.mobile ??
    value.phone ??
    value.phone_number ??
    value.driver_mobile ??
    value.driver_phone ??
    null;

  const email =
    value.email ??
    value.driver_email ??
    null;

  const profileImage =
    value.profile_image ??
    value.profileImage ??
    value.driver_profile_image ??
    value.photo ??
    null;

  const rating =
    value.rating ??
    value.driver_rating ??
    null;

  const availabilityStatus =
    value.availability_status ??
    value.status ??
    null;

  const vehicleId =
    value.vehicle_id ??
    value.vehicleId ??
    null;

  const vehicleNumber =
    value.vehicle_number ??
    value.vehicleNumber ??
    value.registration_number ??
    value.registration_no ??
    null;

  const manufacturer =
    value.manufacturer ??
    value.vehicle_manufacturer ??
    null;

  const vehicleModel =
    value.vehicle_model ??
    value.model ??
    value.vehicleModel ??
    null;

  const vehicleColor =
    value.vehicle_color ??
    value.color ??
    value.vehicleColor ??
    null;

  const vehicleTypeId =
    value.vehicle_type_id ??
    value.vehicleTypeId ??
    null;

  const vehicleTypeName =
    value.vehicle_type_name ??
    value.vehicle_type ??
    value.vehicleTypeName ??
    null;

  const vehicleCapacity =
    value.vehicle_capacity ??
    value.capacity ??
    null;

  const hasDriverInformation =
    id !== null ||
    name !== null ||
    mobile !== null ||
    email !== null ||
    profileImage !== null ||
    rating !== null;

  if (!hasDriverInformation) {
    return null;
  }

  return {
    id:
      typeof id === "string" ||
      typeof id === "number"
        ? id
        : null,

    name:
      typeof name === "string"
        ? name
        : typeof name === "number"
          ? String(name)
          : null,

    mobile:
      typeof mobile === "string"
        ? mobile
        : typeof mobile === "number"
          ? String(mobile)
          : null,

    email:
      typeof email === "string"
        ? email
        : null,

    profile_image:
      typeof profileImage === "string"
        ? profileImage
        : null,

    rating:
      typeof rating === "string" ||
      typeof rating === "number"
        ? rating
        : null,

    availability_status:
      typeof availabilityStatus === "string"
        ? availabilityStatus
        : null,

    vehicle_id:
      typeof vehicleId === "string" ||
      typeof vehicleId === "number"
        ? vehicleId
        : null,

    vehicle_number:
      typeof vehicleNumber === "string"
        ? vehicleNumber
        : typeof vehicleNumber === "number"
          ? String(vehicleNumber)
          : null,

    manufacturer:
      typeof manufacturer === "string"
        ? manufacturer
        : null,

    vehicle_model:
      typeof vehicleModel === "string"
        ? vehicleModel
        : null,

    vehicle_color:
      typeof vehicleColor === "string"
        ? vehicleColor
        : null,

    vehicle_type_id:
      typeof vehicleTypeId === "string" ||
      typeof vehicleTypeId === "number"
        ? vehicleTypeId
        : null,

    vehicle_type_name:
      typeof vehicleTypeName === "string"
        ? vehicleTypeName
        : typeof vehicleTypeName === "number"
          ? String(vehicleTypeName)
          : null,

    vehicle_capacity:
      typeof vehicleCapacity === "string" ||
      typeof vehicleCapacity === "number"
        ? vehicleCapacity
        : null,
  };
}

/* ============================================================
   NORMALIZE VEHICLE
============================================================ */

function normalizeVehicle(
  value: unknown
): VehicleData | null {
  if (!isObject(value)) {
    return null;
  }

  const id =
    value.id ??
    value.vehicle_id ??
    value.vehicleId ??
    null;

  const number =
    value.number ??
    value.vehicle_number ??
    value.vehicleNumber ??
    value.registration_number ??
    value.registration_no ??
    null;

  const manufacturer =
    value.manufacturer ??
    value.vehicle_manufacturer ??
    null;

  const model =
    value.model ??
    value.vehicle_model ??
    value.vehicleModel ??
    null;

  const color =
    value.color ??
    value.vehicle_color ??
    value.vehicleColor ??
    null;

  const rawType =
    value.type ??
    value.vehicle_type ??
    null;

  let type: VehicleType | null = null;

  if (isObject(rawType)) {
    const rawTypeId =
      rawType.id ??
      rawType.vehicle_type_id ??
      null;

    const rawTypeName =
      rawType.name ??
      rawType.vehicle_type_name ??
      null;

    const rawTypeCapacity =
      rawType.capacity ??
      rawType.vehicle_capacity ??
      null;

    type = {
      id:
        typeof rawTypeId === "string" ||
        typeof rawTypeId === "number"
          ? rawTypeId
          : null,

      name:
        typeof rawTypeName === "string"
          ? rawTypeName
          : typeof rawTypeName === "number"
            ? String(rawTypeName)
            : null,

      capacity:
        typeof rawTypeCapacity === "string" ||
        typeof rawTypeCapacity === "number"
          ? rawTypeCapacity
          : null,
    };
  } else if (
    rawType !== null &&
    rawType !== undefined
  ) {
    type = {
      name:
        typeof rawType === "string"
          ? rawType
          : typeof rawType === "number"
            ? String(rawType)
            : null,
    };
  }

  if (!type) {
    const directTypeName =
      value.vehicle_type_name ??
      value.vehicle_type ??
      null;

    const directCapacity =
      value.vehicle_capacity ??
      value.capacity ??
      null;

    if (
      directTypeName !== null ||
      directCapacity !== null
    ) {
      type = {
        name:
          typeof directTypeName === "string"
            ? directTypeName
            : typeof directTypeName === "number"
              ? String(directTypeName)
              : null,

        capacity:
          typeof directCapacity === "string" ||
          typeof directCapacity === "number"
            ? directCapacity
            : null,
      };
    }
  }

  const hasVehicleInformation =
    id !== null ||
    number !== null ||
    manufacturer !== null ||
    model !== null ||
    color !== null ||
    type !== null;

  if (!hasVehicleInformation) {
    return null;
  }

  return {
    id:
      typeof id === "string" ||
      typeof id === "number"
        ? id
        : null,

    number:
      typeof number === "string"
        ? number
        : typeof number === "number"
          ? String(number)
          : null,

    manufacturer:
      typeof manufacturer === "string"
        ? manufacturer
        : null,

    model:
      typeof model === "string"
        ? model
        : null,

    color:
      typeof color === "string"
        ? color
        : null,

    type,
  };
}

/* ============================================================
   DRIVER PROFILE CONTENT
============================================================ */

function DriverProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [driver, setDriver] =
    useState<DriverProfile | null>(null);

  const [vehicle, setVehicle] =
    useState<VehicleData | null>(null);

  const [ride, setRide] =
    useState<RideData | null>(null);

  const [rideId, setRideId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================================
     CANCEL STATE
  ========================================================== */

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  const [cancelReason, setCancelReason] =
    useState("");

  const [cancelling, setCancelling] =
    useState(false);

  const [cancelError, setCancelError] =
    useState<string | null>(null);

  /* ==========================================================
     GET RIDE ID
  ========================================================== */

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    const urlRideId =
      searchParams.get("ride_id");

    if (urlRideId) {
      setRideId(urlRideId);

      sessionStorage.setItem(
        "sbs_ride_id",
        urlRideId
      );

      return;
    }

    const sessionKeys = [
      "sbs_ride_id",
      "ride_id",
      "sbs_search_driver_ride_id",
    ];

    for (const key of sessionKeys) {
      const stored =
        sessionStorage.getItem(key);

      if (
        stored &&
        stored.trim() !== ""
      ) {
        setRideId(stored.trim());

        return;
      }
    }

    const bookingKeys = [
      "sbs_search_driver_booking",
      "sbs_booking_information",
    ];

    for (const key of bookingKeys) {
      const raw =
        sessionStorage.getItem(key);

      if (!raw) {
        continue;
      }

      try {
        const parsed: unknown =
          JSON.parse(raw);

        if (
          isObject(parsed) &&
          parsed.ride_id !== undefined &&
          parsed.ride_id !== null &&
          String(parsed.ride_id).trim() !== ""
        ) {
          const value =
            String(parsed.ride_id).trim();

          setRideId(value);

          sessionStorage.setItem(
            "sbs_ride_id",
            value
          );

          return;
        }
      } catch {
        // Ignore invalid JSON.
      }
    }

    setError(
      "Ride ID is missing from session storage."
    );

    setLoading(false);
  }, [searchParams]);

  /* ==========================================================
     LOAD DRIVER PROFILE
  ========================================================== */

  const loadDriverProfile =
    useCallback(async () => {
      if (!rideId) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(
          "========================================"
        );

        console.log(
          "DRIVER PROFILE PAGE"
        );

        console.log(
          "RIDE ID:",
          rideId
        );

        console.log(
          "========================================"
        );

        const response =
          await fetch(
            `/api/passenger/driver-details?ride_id=${encodeURIComponent(
              rideId
            )}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

        const result =
          (await response.json()) as DriverDetailsResponse;

        console.log(
          "DRIVER PROFILE RAW RESPONSE:",
          result
        );

        if (
          !response.ok ||
          result.success === false
        ) {
          throw new Error(
            result.message ||
              result.error ||
              `Unable to load driver profile (${response.status})`
          );
        }

        const rootData =
          isObject(result.data)
            ? result.data
            : null;

        /* ======================================================
           DRIVER
        ====================================================== */

        let apiDriver =
          normalizeDriver(
            rootData?.driver
          );

        if (!apiDriver) {
          apiDriver =
            normalizeDriver(
              rootData?.profile
            );
        }

        if (!apiDriver) {
          apiDriver =
            normalizeDriver(
              result.driver
            );
        }

        if (!apiDriver) {
          apiDriver =
            normalizeDriver(
              result.profile
            );
        }

        if (!apiDriver) {
          const foundDriver =
            findObject(
              rootData ?? result,
              [
                "driver",
                "profile",
                "driver_details",
                "driverDetails",
                "assigned_driver",
                "assignedDriver",
              ]
            );

          apiDriver =
            normalizeDriver(
              foundDriver
            );
        }

        /* ======================================================
           RIDE
        ====================================================== */

        let apiRide: RideData | null =
          isObject(rootData?.ride)
            ? (rootData.ride as RideData)
            : null;

        if (!apiRide) {
          apiRide =
            isObject(result.ride)
              ? result.ride
              : null;
        }

        if (!apiRide) {
          const foundRide =
            findObject(
              rootData ?? result,
              [
                "ride",
                "ride_details",
                "rideDetails",
              ]
            );

          if (foundRide) {
            apiRide =
              foundRide as RideData;
          }
        }

        /* ======================================================
           VEHICLE
        ====================================================== */

        let apiVehicle =
          normalizeVehicle(
            rootData?.vehicle
          );

        if (!apiVehicle) {
          apiVehicle =
            normalizeVehicle(
              result.vehicle
            );
        }

        if (!apiVehicle) {
          const foundVehicle =
            findObject(
              rootData ?? result,
              [
                "vehicle",
                "vehicle_details",
                "vehicleDetails",
                "assigned_vehicle",
                "assignedVehicle",
              ]
            );

          apiVehicle =
            normalizeVehicle(
              foundVehicle
            );
        }

        /* ======================================================
           RIDE DRIVER FALLBACK
        ====================================================== */

        if (!apiDriver && apiRide) {
          const rideDriver =
            normalizeDriver({
              id:
                apiRide.driver_id,

              name:
                apiRide.driver_name,

              mobile:
                apiRide.driver_mobile ??
                apiRide.mobile,

              email:
                apiRide.driver_email ??
                apiRide.email,

              profile_image:
                apiRide.driver_profile_image ??
                apiRide.profile_image,

              rating:
                apiRide.driver_rating ??
                apiRide.rating,

              availability_status:
                apiRide.driver_availability_status ??
                apiRide.availability_status,

              vehicle_id:
                apiRide.vehicle_id,

              vehicle_number:
                apiRide.vehicle_number,

              manufacturer:
                apiRide.manufacturer,

              vehicle_model:
                apiRide.vehicle_model,

              vehicle_color:
                apiRide.vehicle_color,

              vehicle_type_id:
                apiRide.vehicle_type_id,

              vehicle_type_name:
                apiRide.vehicle_type_name,

              vehicle_capacity:
                apiRide.vehicle_capacity,
            });

          if (rideDriver) {
            apiDriver =
              rideDriver;
          }
        }

        /* ======================================================
           DIRECT DRIVER FIELDS
        ====================================================== */

        if (
          !apiDriver &&
          rootData
        ) {
          apiDriver =
            normalizeDriver({
              id:
                rootData.driver_id,

              name:
                rootData.driver_name,

              mobile:
                rootData.driver_mobile ??
                rootData.driver_phone,

              email:
                rootData.driver_email,

              profile_image:
                rootData.driver_profile_image,

              rating:
                rootData.driver_rating,

              availability_status:
                rootData.driver_availability_status,

              vehicle_id:
                rootData.vehicle_id,

              vehicle_number:
                rootData.vehicle_number,

              manufacturer:
                rootData.manufacturer ??
                rootData.vehicle_manufacturer,

              vehicle_model:
                rootData.vehicle_model,

              vehicle_color:
                rootData.vehicle_color,

              vehicle_type_id:
                rootData.vehicle_type_id,

              vehicle_type_name:
                rootData.vehicle_type_name,

              vehicle_capacity:
                rootData.vehicle_capacity,
            });
        }

        /* ======================================================
           BUILD VEHICLE FROM DRIVER
        ====================================================== */

        if (
          !apiVehicle &&
          apiDriver
        ) {
          apiVehicle =
            normalizeVehicle({
              id:
                apiDriver.vehicle_id,

              number:
                apiDriver.vehicle_number,

              manufacturer:
                apiDriver.manufacturer,

              model:
                apiDriver.vehicle_model,

              color:
                apiDriver.vehicle_color,

              vehicle_type_id:
                apiDriver.vehicle_type_id,

              vehicle_type_name:
                apiDriver.vehicle_type_name,

              vehicle_capacity:
                apiDriver.vehicle_capacity,
            });
        }

        console.log(
          "========================================"
        );

        console.log(
          "NORMALIZED DRIVER:",
          apiDriver
        );

        console.log(
          "NORMALIZED VEHICLE:",
          apiVehicle
        );

        console.log(
          "NORMALIZED RIDE:",
          apiRide
        );

        console.log(
          "========================================"
        );

        if (!apiDriver) {
          throw new Error(
            "Driver information is not available for this ride."
          );
        }

        setDriver(apiDriver);
        setVehicle(apiVehicle);
        setRide(apiRide);

        sessionStorage.setItem(
          "sbs_ride_id",
          rideId
        );

        /* ------------------------------------------------------
           Preserve complete ride information
        ------------------------------------------------------ */

        if (apiRide) {
          sessionStorage.setItem(
            "sbs_trip_start_ride",
            JSON.stringify(apiRide)
          );
        }
      } catch (loadError) {
        console.error(
          "Driver profile load error:",
          loadError
        );

        setDriver(null);
        setVehicle(null);
        setRide(null);

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load driver profile."
        );
      } finally {
        setLoading(false);
      }
    }, [rideId]);

  /* ==========================================================
     LOAD WHEN RIDE ID READY
  ========================================================== */

  useEffect(() => {
    if (rideId) {
      loadDriverProfile();
    }
  }, [
    rideId,
    loadDriverProfile,
  ]);

  /* ==========================================================
     START TRIP
     
     Direct navigation only.
     No OTP on Driver Profile page.
  ========================================================== */

  const handleStartTrip =
    useCallback(() => {
      if (!rideId) {
        setError(
          "Ride ID is missing."
        );

        return;
      }

      /* ------------------------------------------------------
         Preserve complete ride information before navigation
      ------------------------------------------------------ */

      if (ride) {
        sessionStorage.setItem(
          "sbs_trip_start_ride",
          JSON.stringify(ride)
        );
      }

      sessionStorage.setItem(
        "sbs_ride_id",
        rideId
      );

      /* ------------------------------------------------------
         Go directly to Trip Start page
      ------------------------------------------------------ */

      router.push(
        `/passenger/trip-start?ride_id=${encodeURIComponent(
          rideId
        )}`
      );
    }, [
      rideId,
      ride,
      router,
    ]);

  /* ==========================================================
     CANCEL RIDE
  ========================================================== */

  const handleCancelRide =
    useCallback(async () => {
      if (!rideId) {
        setCancelError(
          "Ride ID is missing."
        );

        return;
      }

      try {
        setCancelling(true);
        setCancelError(null);

        console.log(
          "CANCELLING RIDE:",
          rideId
        );

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

              body: JSON.stringify({
                ride_id:
                  Number(rideId),

                reason:
                  cancelReason.trim() ||
                  "Cancelled by passenger",
              }),

              cache: "no-store",
            }
          );

        const result: unknown =
          await response.json();

        console.log(
          "CANCEL RESPONSE:",
          result
        );

        if (!response.ok) {
          const message =
            isObject(result)
              ? String(
                  result.message ??
                    result.error ??
                    "Unable to cancel ride."
                )
              : "Unable to cancel ride.";

          throw new Error(
            message
          );
        }

        if (
          isObject(result) &&
          result.success === false
        ) {
          throw new Error(
            String(
              result.message ??
                result.error ??
                "Unable to cancel ride."
            )
          );
        }

        /* ------------------------------------------------------
           Clear ride-specific session data
        ------------------------------------------------------ */

        sessionStorage.removeItem(
          "sbs_ride_id"
        );

        sessionStorage.removeItem(
          "ride_id"
        );

        sessionStorage.removeItem(
          "sbs_search_driver_ride_id"
        );

        sessionStorage.removeItem(
          "sbs_trip_start_ride"
        );

        sessionStorage.removeItem(
          "sbs_trip_start_response"
        );

        setShowCancelModal(false);

        /* ------------------------------------------------------
           Return to search driver
        ------------------------------------------------------ */

        router.replace(
          "/passenger/search-driver"
        );
      } catch (cancelException) {
        console.error(
          "Cancel ride error:",
          cancelException
        );

        setCancelError(
          cancelException instanceof Error
            ? cancelException.message
            : "Unable to cancel ride."
        );
      } finally {
        setCancelling(false);
      }
    }, [
      rideId,
      cancelReason,
      router,
    ]);

  /* ==========================================================
     DRIVER VALUES
  ========================================================== */

  const driverName =
    safeString(
      driver?.name,
      "Driver"
    );

  const driverMobile =
    safeString(
      driver?.mobile,
      ""
    );

  const driverEmail =
    safeString(
      driver?.email,
      ""
    );

  const driverRating =
    formatRating(
      driver?.rating
    );

  /* ==========================================================
     VEHICLE VALUES
  ========================================================== */

  const vehicleType =
    safeString(
      vehicle?.type?.name ??
        driver?.vehicle_type_name
    );

  const vehicleNumber =
    safeString(
      vehicle?.number ??
        driver?.vehicle_number
    );

  const vehicleManufacturer =
    safeString(
      vehicle?.manufacturer ??
        driver?.manufacturer
    );

  const vehicleModel =
    safeString(
      vehicle?.model ??
        driver?.vehicle_model
    );

  const vehicleColor =
    safeString(
      vehicle?.color ??
        driver?.vehicle_color
    );

  const vehicleCapacity =
    safeString(
      vehicle?.type?.capacity ??
        driver?.vehicle_capacity
    );

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Loading driver profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please wait while we load the
            driver information.
          </p>

        </div>
      </main>
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <UserRound className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load driver
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() =>
                loadDriverProfile()
              }
              className="flex-1 rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Try Again
            </button>

          </div>

        </div>

      </main>
    );
  }

  /* ==========================================================
     MAIN PAGE
  ========================================================== */

  return (
    <>
      <main className="min-h-screen bg-slate-50">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="flex items-center gap-2 rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />

              <span className="hidden font-medium sm:inline">
                Back
              </span>
            </button>

            <div className="text-center">

              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                Driver Profile
              </h1>

              {rideId && (
                <p className="mt-0.5 text-xs text-slate-500">
                  Ride #{rideId}
                </p>
              )}

            </div>

            <div className="h-10 w-10" />

          </div>

        </header>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">

            {/* ==================================================
                DRIVER PROFILE CARD
            ================================================== */}

            <section className="h-fit overflow-hidden rounded-3xl bg-white shadow-sm">

              <div className="bg-[var(--primary)] px-6 py-10 text-center">

                <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white shadow-lg">

                  {driver?.profile_image ? (
                    <img
                      src={driver.profile_image}
                      alt={driverName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound className="h-16 w-16 text-slate-400" />
                  )}

                </div>

                <h2 className="mt-5 text-2xl font-extrabold text-white">
                  {driverName}
                </h2>

                <div className="mt-3 flex items-center justify-center gap-2 text-white">

                  <Star className="h-5 w-5 fill-current" />

                  <span className="text-base font-semibold">
                    {driverRating}
                  </span>

                  <span className="text-sm text-white/70">
                    Rating
                  </span>

                </div>

                <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white">

                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                  Driver Assigned

                </div>

              </div>

              {/* ==================================================
                  CONTACT
              ================================================== */}

              <div className="space-y-4 p-6">

                {driverMobile && (
                  <a
                    href={`tel:${driverMobile}`}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-slate-100"
                  >

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Phone className="h-5 w-5 text-[var(--primary)]" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-slate-500">
                        Phone
                      </p>

                      <p className="mt-1 truncate font-semibold text-slate-900">
                        {driverMobile}
                      </p>

                    </div>

                  </a>
                )}

                {driverEmail && (
                  <a
                    href={`mailto:${driverEmail}`}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-slate-100"
                  >

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Mail className="h-5 w-5 text-[var(--primary)]" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-slate-500">
                        Email
                      </p>

                      <p className="mt-1 truncate font-semibold text-slate-900">
                        {driverEmail}
                      </p>

                    </div>

                  </a>
                )}

                <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Status
                    </p>

                    <p className="mt-1 font-semibold text-green-700">
                      Verified Driver
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* ==================================================
                RIGHT SIDE
            ================================================== */}

            <div className="space-y-6">

              {/* ==================================================
                  DRIVER INFORMATION
              ================================================== */}

              <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                    <UserRound className="h-5 w-5 text-[var(--primary)]" />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      Driver Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Driver assigned to your ride
                    </p>

                  </div>

                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <InfoCard
                    icon={
                      <UserRound className="h-5 w-5" />
                    }
                    label="Driver Name"
                    value={driverName}
                  />

                  <InfoCard
                    icon={
                      <Star className="h-5 w-5" />
                    }
                    label="Rating"
                    value={`${driverRating} / 5`}
                  />

                  <InfoCard
                    icon={
                      <Phone className="h-5 w-5" />
                    }
                    label="Mobile"
                    value={
                      driverMobile ||
                      "Not available"
                    }
                  />

                  <InfoCard
                    icon={
                      <Mail className="h-5 w-5" />
                    }
                    label="Email"
                    value={
                      driverEmail ||
                      "Not available"
                    }
                  />

                </div>

              </section>

              {/* ==================================================
                  VEHICLE INFORMATION
              ================================================== */}

              <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                    <CarFront className="h-5 w-5 text-[var(--primary)]" />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      Vehicle Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Vehicle assigned to the driver
                    </p>

                  </div>

                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <InfoCard
                    icon={
                      <CarFront className="h-5 w-5" />
                    }
                    label="Vehicle"
                    value={vehicleType}
                  />

                  <InfoCard
                    icon={
                      <CarFront className="h-5 w-5" />
                    }
                    label="Vehicle Number"
                    value={vehicleNumber}
                  />

                  <InfoCard
                    icon={
                      <CarFront className="h-5 w-5" />
                    }
                    label="Manufacturer"
                    value={vehicleManufacturer}
                  />

                  <InfoCard
                    icon={
                      <CarFront className="h-5 w-5" />
                    }
                    label="Model"
                    value={vehicleModel}
                  />

                  <InfoCard
                    icon={
                      <CarFront className="h-5 w-5" />
                    }
                    label="Color"
                    value={vehicleColor}
                  />

                  <InfoCard
                    icon={
                      <UserRound className="h-5 w-5" />
                    }
                    label="Vehicle Capacity"
                    value={
                      vehicleCapacity ===
                      "Not available"
                        ? vehicleCapacity
                        : `${vehicleCapacity} Seats`
                    }
                  />

                </div>

              </section>

              {/* ==================================================
                  START TRIP
              ================================================== */}

              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-slate-900">
                      Start Your Trip
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Driver information is available.
                      Continue to the trip start page
                      to begin your trip.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={
                    handleStartTrip
                  }
                  disabled={!rideId}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-6 py-4 font-bold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <CheckCircle2 className="h-5 w-5" />

                  Start Trip

                </button>

              </section>

              {/* ==================================================
                  CALL DRIVER
              ================================================== */}

              {driverMobile && (
                <a
                  href={`tel:${driverMobile}`}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[var(--primary)] px-6 py-4 text-base font-bold text-white shadow-lg transition hover:opacity-90"
                >

                  <Phone className="h-5 w-5" />

                  Call Driver

                </a>
              )}

              {/* ==================================================
                  CANCEL RIDE
              ================================================== */}

              <button
                type="button"
                onClick={() => {
                  setCancelReason("");
                  setCancelError(null);
                  setShowCancelModal(true);
                }}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-200 bg-white px-6 py-4 font-bold text-red-600 shadow-sm transition hover:bg-red-50"
              >

                <XCircle className="h-5 w-5" />

                Cancel Ride

              </button>

              {/* ==================================================
                  BACK
              ================================================== */}

              <Link
                href="/passenger/search-driver"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >

                <ArrowLeft className="h-5 w-5" />

                Back to Search Driver

              </Link>

            </div>

          </div>

        </div>

      </main>

      {/* ========================================================
          CANCEL MODAL
      ======================================================== */}

      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Cancel Ride
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Are you sure you want to cancel this ride?
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  if (!cancelling) {
                    setShowCancelModal(false);
                  }
                }}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
              >

                <X className="h-5 w-5" />

              </button>

            </div>

            {/* BODY */}

            <div className="space-y-5 p-6">

              <div className="rounded-2xl bg-red-50 p-4">

                <div className="flex gap-3">

                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                  <div>

                    <p className="font-semibold text-red-800">
                      Ride #{rideId}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-red-700">
                      Cancelling this ride will remove
                      the current driver assignment.
                    </p>

                  </div>

                </div>

              </div>

              <div>

                <label
                  htmlFor="cancel-reason"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Cancellation reason

                  <span className="font-normal text-slate-400">
                    {" "}
                    (optional)
                  </span>

                </label>

                <textarea
                  id="cancel-reason"
                  value={cancelReason}
                  onChange={(event) =>
                    setCancelReason(
                      event.target.value
                    )
                  }
                  rows={3}
                  disabled={cancelling}
                  placeholder="Enter cancellation reason..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
                />

              </div>

              {cancelError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  {cancelError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  disabled={cancelling}
                  onClick={() =>
                    setShowCancelModal(false)
                  }
                  className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Keep Ride
                </button>

                <button
                  type="button"
                  disabled={cancelling}
                  onClick={
                    handleCancelRide
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {cancelling ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      Yes, Cancel
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

/* ============================================================
   INFO CARD
============================================================ */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--primary)]">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-1 break-words font-bold text-slate-900">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function DriverProfilePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">

          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />

        </main>
      }
    >
      <DriverProfileContent />
    </Suspense>
  );
}