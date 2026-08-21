import { NextRequest, NextResponse } from "next/server";

import { url_path } from "@/config/project_path";

/* ============================================================
   TYPES
============================================================ */

interface DriverData {
  id?: number | string | null;
  driver_id?: number | string | null;

  name?: string | null;
  mobile?: string | null;
  phone?: string | null;
  email?: string | null;

  profile_image?: string | null;
  image?: string | null;

  rating?: number | string | null;

  availability_status?: string | null;
  status?: string | null;

  address?: string | null;
  city?: string | null;
  state?: string | null;
}

interface VehicleTypeData {
  id?: number | string | null;
  vehicle_type_id?: number | string | null;

  name?: string | null;
  vehicle_type_name?: string | null;

  capacity?: number | string | null;
}

interface VehicleData {
  id?: number | string | null;
  vehicle_id?: number | string | null;

  number?: string | null;
  vehicle_number?: string | null;

  manufacturer?: string | null;

  model?: string | null;
  vehicle_model?: string | null;

  color?: string | null;
  vehicle_color?: string | null;

  type?: VehicleTypeData | null;
  vehicle_type?: VehicleTypeData | null;
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

interface RideDetailsApiData {
  driver?: DriverData | null;
  profile?: DriverData | null;
  ride?: RideData | null;
  vehicle?: VehicleData | null;

  [key: string]: unknown;
}

interface PhpApiResponse {
  success?: boolean;
  message?: string;
  data?: RideDetailsApiData | null;
  error?: string;

  [key: string]: unknown;
}

interface DriverProfile {
  id: number;

  name: string;
  mobile: string;
  email: string;

  profile_image?: string | null;
  rating?: number | null;
  availability_status?: string | null;

  vehicle_id?: number | null;
  vehicle_number?: string | null;
  manufacturer?: string | null;
  vehicle_model?: string | null;
  vehicle_color?: string | null;

  vehicle_type_id?: number | null;
  vehicle_type_name?: string | null;
  vehicle_capacity?: number | null;

  address?: string | null;
  city?: string | null;
  state?: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;

  data?: {
    profile: DriverProfile;
    ride?: RideData | null;
    vehicle?: VehicleData | null;
  } | null;

  error?: string;
  http_status?: number;

  [key: string]: unknown;
}

/* ============================================================
   HELPERS
============================================================ */

function firstValue<T>(
  ...values: Array<T | null | undefined>
): T | null {
  for (const value of values) {
    if (
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return null;
}

function toNumber(value: unknown): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

function getValidRideId(
  value: string | null
): number | null {
  if (!value) {
    return null;
  }

  const number = Number(
    String(value).trim()
  );

  if (
    !Number.isInteger(number) ||
    number <= 0
  ) {
    return null;
  }

  return number;
}

function buildRideDetailsUrl(
  rideId: number
): string | null {
  const configuredUrl =
    url_path?.ride_details;

  if (
    typeof configuredUrl !== "string" ||
    !configuredUrl.trim()
  ) {
    return null;
  }

  const cleanUrl =
    configuredUrl.trim();

  const separator =
    cleanUrl.includes("?")
      ? "&"
      : "?";

  return `${cleanUrl}${separator}ride_id=${encodeURIComponent(
    String(rideId)
  )}`;
}

function parsePhpJson(
  text: string
): PhpApiResponse | null {
  if (!text.trim()) {
    return null;
  }

  const cleaned =
    text
      .replace(/^\uFEFF/, "")
      .trim();

  try {
    return JSON.parse(
      cleaned
    ) as PhpApiResponse;
  } catch {
    const firstBrace =
      cleaned.indexOf("{");

    const lastBrace =
      cleaned.lastIndexOf("}");

    if (
      firstBrace >= 0 &&
      lastBrace > firstBrace
    ) {
      try {
        return JSON.parse(
          cleaned.slice(
            firstBrace,
            lastBrace + 1
          )
        ) as PhpApiResponse;
      } catch {
        return null;
      }
    }

    return null;
  }
}

/* ============================================================
   GET
============================================================ */

export async function GET(
  request: NextRequest
) {
  try {
    const rideIdParam =
      request.nextUrl.searchParams.get(
        "ride_id"
      );

    console.log(
      "DRIVER DETAILS ride_id:",
      rideIdParam
    );

    const rideId =
      getValidRideId(
        rideIdParam
      );

    if (!rideId) {
      return NextResponse.json(
        {
          success: false,
          message: rideIdParam
            ? `Invalid ride_id: ${rideIdParam}`
            : "ride_id is required",
        } satisfies ApiResponse,
        {
          status: 422,
        }
      );
    }

    const phpUrl =
      buildRideDetailsUrl(
        rideId
      );

    if (!phpUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Ride details API URL is not configured correctly.",
          error:
            "url_path.ride_details is missing or invalid.",
        } satisfies ApiResponse,
        {
          status: 500,
        }
      );
    }

    console.log(
      "Calling PHP ride details:",
      phpUrl
    );

    let phpResponse: Response;

    try {
      phpResponse =
        await fetch(
          phpUrl,
          {
            method: "GET",
            headers: {
              Accept:
                "application/json",
            },
            cache: "no-store",
            signal:
              AbortSignal.timeout(
                15000
              ),
          }
        );
    } catch (error) {
      console.error(
        "PHP fetch error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to connect to ride details server.",
          error:
            error instanceof Error
              ? error.message
              : String(error),
        } satisfies ApiResponse,
        {
          status: 502,
        }
      );
    }

    const rawText =
      await phpResponse.text();

    console.log(
      "PHP status:",
      phpResponse.status
    );

    console.log(
      "PHP response:",
      rawText
    );

    const phpData =
      parsePhpJson(
        rawText
      );

    if (!phpData) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Ride details server returned invalid JSON.",
          error:
            "Invalid PHP JSON response.",
          http_status:
            phpResponse.status,
        } satisfies ApiResponse,
        {
          status: 502,
        }
      );
    }

    if (!phpResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            phpData.message ||
            `Ride details server returned HTTP ${phpResponse.status}.`,
          error:
            phpData.error,
          http_status:
            phpResponse.status,
        } satisfies ApiResponse,
        {
          status:
            phpResponse.status >= 400 &&
            phpResponse.status <= 599
              ? phpResponse.status
              : 502,
        }
      );
    }

    if (
      phpData.success === false
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            phpData.message ||
            "Ride details API failed.",
          error:
            phpData.error,
        } satisfies ApiResponse,
        {
          status: 502,
        }
      );
    }

    const apiData =
      phpData.data ?? {};

    let driver =
      apiData.driver ??
      apiData.profile ??
      null;

    const ride =
      apiData.ride ??
      null;

    const vehicle =
      apiData.vehicle ??
      null;

    /* ========================================================
       DRIVER MAY BE INSIDE RIDE
    ======================================================== */

    if (!driver && ride) {
      if (
        ride.driver_id ||
        ride.driver_name ||
        ride.driver_mobile
      ) {
        driver = {
          id:
            ride.driver_id,

          name:
            ride.driver_name,

          mobile:
            ride.driver_mobile,

          email:
            ride.driver_email,

          profile_image:
            ride.driver_profile_image,

          rating:
            ride.driver_rating,
        };
      }
    }

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No driver assigned to this ride.",
        } satisfies ApiResponse,
        {
          status: 404,
        }
      );
    }

    /* ========================================================
       DRIVER
    ======================================================== */

    const driverId =
      toNumber(
        firstValue(
          driver.id,
          driver.driver_id,
          ride?.driver_id
        )
      );

    if (!driverId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Driver ID was not found for this ride.",
        } satisfies ApiResponse,
        {
          status: 404,
        }
      );
    }

    const driverName =
      firstValue(
        driver.name,
        ride?.driver_name
      );

    const driverMobile =
      firstValue(
        driver.mobile,
        driver.phone,
        ride?.driver_mobile
      );

    const driverEmail =
      firstValue(
        driver.email,
        ride?.driver_email
      );

    const driverImage =
      firstValue(
        driver.profile_image,
        driver.image,
        ride?.driver_profile_image
      );

    const driverRating =
      toNumber(
        firstValue(
          driver.rating,
          ride?.driver_rating
        )
      );

    const availabilityStatus =
      firstValue(
        driver.availability_status,
        driver.status
      );

    /* ========================================================
       VEHICLE
    ======================================================== */

    const vehicleId =
      toNumber(
        firstValue(
          vehicle?.id,
          vehicle?.vehicle_id,
          ride?.vehicle_id
        )
      );

    const vehicleNumber =
      firstValue(
        vehicle?.number,
        vehicle?.vehicle_number,
        ride?.vehicle_number
      );

    const manufacturer =
      firstValue(
        vehicle?.manufacturer,
        ride?.manufacturer
      );

    const vehicleModel =
      firstValue(
        vehicle?.model,
        vehicle?.vehicle_model,
        ride?.vehicle_model
      );

    const vehicleColor =
      firstValue(
        vehicle?.color,
        vehicle?.vehicle_color,
        ride?.vehicle_color
      );

    const vehicleType =
      vehicle?.type ??
      vehicle?.vehicle_type ??
      null;

    const vehicleTypeId =
      toNumber(
        firstValue(
          vehicleType?.id,
          vehicleType?.vehicle_type_id,
          ride?.vehicle_type_id
        )
      );

    const vehicleTypeName =
      firstValue(
        vehicleType?.name,
        vehicleType?.vehicle_type_name,
        ride?.vehicle_type_name
      );

    const vehicleCapacity =
      toNumber(
        firstValue(
          vehicleType?.capacity,
          ride?.vehicle_capacity
        )
      );

    /* ========================================================
       PROFILE
    ======================================================== */

    const profile: DriverProfile = {
      id: driverId,

      name:
        driverName
          ? String(driverName)
          : "Driver",

      mobile:
        driverMobile
          ? String(driverMobile)
          : "",

      email:
        driverEmail
          ? String(driverEmail)
          : "",

      profile_image:
        driverImage
          ? String(driverImage)
          : null,

      rating:
        driverRating,

      availability_status:
        availabilityStatus
          ? String(
              availabilityStatus
            )
          : null,

      vehicle_id:
        vehicleId,

      vehicle_number:
        vehicleNumber
          ? String(vehicleNumber)
          : null,

      manufacturer:
        manufacturer
          ? String(manufacturer)
          : null,

      vehicle_model:
        vehicleModel
          ? String(vehicleModel)
          : null,

      vehicle_color:
        vehicleColor
          ? String(vehicleColor)
          : null,

      vehicle_type_id:
        vehicleTypeId,

      vehicle_type_name:
        vehicleTypeName
          ? String(vehicleTypeName)
          : null,

      vehicle_capacity:
        vehicleCapacity,

      address:
        driver.address
          ? String(driver.address)
          : null,

      city:
        driver.city
          ? String(driver.city)
          : null,

      state:
        driver.state
          ? String(driver.state)
          : null,
    };

    /* ========================================================
       COMPLETE RIDE
       
       DO NOT REMOVE THESE VALUES.
       Trip Start uses them.
    ======================================================== */

    const completeRide: RideData =
      ride
        ? {
            ...ride,

            ride_id:
              ride.ride_id ??
              rideId,

            driver_id:
              ride.driver_id ??
              driverId,

            driver_name:
              ride.driver_name ??
              driverName,

            driver_mobile:
              ride.driver_mobile ??
              driverMobile,

            driver_email:
              ride.driver_email ??
              driverEmail,

            vehicle_id:
              ride.vehicle_id ??
              vehicleId,

            vehicle_number:
              ride.vehicle_number ??
              vehicleNumber,

            vehicle_type_id:
              ride.vehicle_type_id ??
              vehicleTypeId,

            vehicle_type_name:
              ride.vehicle_type_name ??
              vehicleTypeName,

            vehicle_capacity:
              ride.vehicle_capacity ??
              vehicleCapacity,

            vehicle_model:
              ride.vehicle_model ??
              vehicleModel,

            vehicle_color:
              ride.vehicle_color ??
              vehicleColor,
          }
        : {
            ride_id:
              rideId,

            driver_id:
              driverId,

            driver_name:
              driverName,

            driver_mobile:
              driverMobile,

            driver_email:
              driverEmail,

            vehicle_id:
              vehicleId,

            vehicle_number:
              vehicleNumber,

            vehicle_type_id:
              vehicleTypeId,

            vehicle_type_name:
              vehicleTypeName,

            vehicle_capacity:
              vehicleCapacity,

            vehicle_model:
              vehicleModel,

            vehicle_color:
              vehicleColor,
          };

    console.log(
      "FINAL DRIVER:",
      profile
    );

    console.log(
      "FINAL RIDE:",
      completeRide
    );

    return NextResponse.json(
      {
        success: true,

        message:
          "Driver and ride details fetched successfully.",

        data: {
          profile,

          ride:
            completeRide,

          vehicle:
            vehicle ?? null,
        },
      } satisfies ApiResponse,
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "Driver details route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch driver details.",

        error:
          error instanceof Error
            ? error.name
            : "UnknownError",
      } satisfies ApiResponse,
      {
        status: 500,
      }
    );
  }
}