import { NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

interface BookingRequest {
  user_id: number;

  vehicle_type_id?: number;

  pickup_address: string;
  pickup_latitude: number;
  pickup_longitude: number;

  drop_address: string;
  drop_latitude: number;
  drop_longitude: number;

  estimated_fare?: number;

  passengerName?: string;
  email?: string;
  phone?: string;

  vehicleType?: string;
  vehicleModel?: string;
  seats?: number | string;

  distanceKm?: number;
  durationMinutes?: number;

  pickupDate?: string;
  pickupTime?: string;

  paymentMethod?: string;
}

/* ============================================================
   HELPERS
============================================================ */

function cleanString(value: unknown): string {
  return String(value ?? "").trim();
}

function numberValue(
  value: unknown,
  fallback = 0
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

/* ============================================================
   POST
============================================================ */

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as BookingRequest;

    /* ========================================================
       USER
    ======================================================== */

    const userId = numberValue(body.user_id);

    if (userId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please sign in before booking a ride.",
          data: null,
        },
        { status: 401 }
      );
    }

    /* ========================================================
       PICKUP
    ======================================================== */

    const pickupAddress =
      cleanString(body.pickup_address);

    const pickupLatitude =
      numberValue(body.pickup_latitude);

    const pickupLongitude =
      numberValue(body.pickup_longitude);

    /* ========================================================
       DROP
    ======================================================== */

    const dropAddress =
      cleanString(body.drop_address);

    const dropLatitude =
      numberValue(body.drop_latitude);

    const dropLongitude =
      numberValue(body.drop_longitude);

    /* ========================================================
       FARE
    ======================================================== */

    const estimatedFare =
      numberValue(body.estimated_fare);

    /* ========================================================
       VEHICLE
    ======================================================== */

    const vehicleTypeId =
      numberValue(body.vehicle_type_id);

    /* ========================================================
       VALIDATION
    ======================================================== */

    if (!pickupAddress || !dropAddress) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pickup and drop locations are required.",
          data: null,
        },
        { status: 422 }
      );
    }

    if (
      !Number.isFinite(pickupLatitude) ||
      !Number.isFinite(pickupLongitude) ||
      !Number.isFinite(dropLatitude) ||
      !Number.isFinite(dropLongitude)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid pickup or drop coordinates.",
          data: null,
        },
        { status: 422 }
      );
    }

    /* ========================================================
       CREATE.PHP PAYLOAD
    ======================================================== */

    const ridePayload: Record<string, unknown> = {
      user_id: userId,

      pickup_address: pickupAddress,
      pickup_latitude: pickupLatitude,
      pickup_longitude: pickupLongitude,

      drop_address: dropAddress,
      drop_latitude: dropLatitude,
      drop_longitude: dropLongitude,

      estimated_fare: estimatedFare,
    };

    if (vehicleTypeId > 0) {
      ridePayload.vehicle_type_id =
        vehicleTypeId;
    }

    console.log(
      "================================="
    );

    console.log(
      "SBS CREATE.PHP REQUEST"
    );

    console.log(
      ridePayload
    );

    console.log(
      "================================="
    );

    /* ========================================================
       CALL PHP create.php
    ======================================================== */

    const rideResponse = await fetch(
      url_path.create_ride,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body: JSON.stringify(
          ridePayload
        ),

        cache: "no-store",
      }
    );

    let rideResult: any = null;

    try {
      rideResult =
        await rideResponse.json();
    } catch {
      rideResult = null;
    }

    console.log(
      "SBS CREATE.PHP RESPONSE:",
      rideResult
    );

    /* ========================================================
       CREATE.PHP FAILURE
    ======================================================== */

    if (
      !rideResponse.ok ||
      rideResult?.success !== true
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            rideResult?.message ||
            "Ride could not be created.",

          data:
            rideResult?.data ??
            null,
        },
        {
          status:
            rideResponse.status >= 400
              ? rideResponse.status
              : 500,
        }
      );
    }

    /* ========================================================
       RIDE CREATED
    ======================================================== */

    const rideData =
      rideResult?.data || {};

    const rideId =
      rideData.ride_id ??
      rideData.id ??
      null;

    const bookingNumber =
      rideData.booking_number ??
      rideData.booking_no ??
      null;

    const rideStatus =
      rideData.status ??
      "requested";

    console.log(
      "RIDE ID:",
      rideId
    );

    console.log(
      "BOOKING NUMBER:",
      bookingNumber
    );

    /* ========================================================
       SEND CONFIRMATION EMAIL
       
       EMAIL IS SENT ONLY AFTER CREATE.PHP SUCCESS.
       
       rideId + bookingNumber are passed to /api/email
       so the email route can create the Cancel Ride button.
    ======================================================== */

    let emailSent = false;

    try {
      const origin =
        new URL(request.url).origin;

      const emailPayload = {
        /* ----------------------------------------------------
           EMAIL TYPE
        ---------------------------------------------------- */

        bookingType:
          "passenger-ride",

        /* ----------------------------------------------------
           RIDE INFORMATION
        ---------------------------------------------------- */

        rideId,

        bookingNumber,

        rideStatus,

        user_id:
          userId,

        /* ----------------------------------------------------
           PASSENGER
        ---------------------------------------------------- */

        passengerName:
          cleanString(
            body.passengerName
          ),

        email:
          cleanString(
            body.email
          ),

        phone:
          cleanString(
            body.phone
          ),

        /* ----------------------------------------------------
           LOCATION
        ---------------------------------------------------- */

        pickup:
          pickupAddress,

        drop:
          dropAddress,

        pickupLatitude,
        pickupLongitude,

        dropLatitude,
        dropLongitude,

        /* ----------------------------------------------------
           VEHICLE
        ---------------------------------------------------- */

        vehicleType:
          cleanString(
            body.vehicleType
          ),

        vehicle:
          cleanString(
            body.vehicleModel
          ),

        vehicleTypeId,

        seats:
          body.seats ?? "-",

        /* ----------------------------------------------------
           TRIP
        ---------------------------------------------------- */

        distanceKm:
          numberValue(
            body.distanceKm
          ),

        durationMinutes:
          numberValue(
            body.durationMinutes
          ),

        pickupDate:
          cleanString(
            body.pickupDate
          ),

        pickupTime:
          cleanString(
            body.pickupTime
          ),

        /* ----------------------------------------------------
           PAYMENT
        ---------------------------------------------------- */

        estimatedFare,

        paymentMethod:
          cleanString(
            body.paymentMethod
          ) || "Cash",
      };

      console.log(
        "================================="
      );

      console.log(
        "SBS BOOKING EMAIL REQUEST"
      );

      console.log(
        emailPayload
      );

      console.log(
        "================================="
      );

      /* ======================================================
         CALL NEXT.JS EMAIL API
      ====================================================== */

      const emailResponse =
        await fetch(
          `${origin}/api/email`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body: JSON.stringify(
              emailPayload
            ),

            cache: "no-store",
          }
        );

      let emailResult: any = null;

      try {
        emailResult =
          await emailResponse.json();
      } catch {
        emailResult = null;
      }

      console.log(
        "SBS BOOKING EMAIL RESPONSE:",
        emailResult
      );

      emailSent =
        emailResponse.ok &&
        emailResult?.success === true;

    } catch (emailError) {
      console.error(
        "BOOKING EMAIL ERROR:",
        emailError
      );

      /*
       * Do not fail the booking just because
       * email sending failed.
       */
    }

    /* ========================================================
       FINAL RESPONSE
    ======================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Ride booked successfully.",

        data: {
          ride_id:
            rideId,

          booking_number:
            bookingNumber,

          status:
            rideStatus,

          estimated_fare:
            estimatedFare,

          email_sent:
            emailSent,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(
      "SBS BOOKING API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to create ride.",

        data: null,
      },
      { status: 500 }
    );
  }
}