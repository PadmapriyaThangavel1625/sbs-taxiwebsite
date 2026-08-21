// app/api/passenger/booking/route.ts

import { NextResponse } from "next/server";

import { url_path } from "@/config/project_path";

/* ============================================================
   TYPES
============================================================ */

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
  passenger_name?: string;

  email?: string;
  passenger_email?: string;

  phone?: string;
  passenger_phone?: string;

  vehicleType?: string;
  vehicle_type?: string;

  passengers?: number;
  number_of_passengers?: number;

  babies?: number;
  elderly?: number;

  seats?: number;

  distanceKm?: number;
  estimated_distance?: number;

  durationMinutes?: number;
  estimated_duration?: number;

  pickupDate?: string;
  pickup_date?: string;

  pickupTime?: string;
  pickup_time?: string;

  tripType?: string;
  trip_type?: string;

  additionalPreferences?: string;

  paymentMethod?: string;
  payment_method?: string;
}

interface ApiResponse {
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

    ride_otp?: number | string;
    booking_otp?: number | string;
    otp?: number | string;

    status?: string;

    estimated_distance?: number | string;
    estimated_duration?: number | string;
    estimated_fare?: number | string;

    payment_method?: string;
    payment_status?: string;

    passengerName?: string;
    passenger_name?: string;
    passenger_email?: string;
    passenger_phone?: string;

    email?: string;
    phone?: string;

    passengers?: number | string;
    number_of_passengers?: number | string;

    babies?: number | string;
    elderly?: number | string;

    trip_type?: string;
    tripType?: string;

    pickupDate?: string;
    pickup_date?: string;

    pickupTime?: string;
    pickup_time?: string;

    vehicleType?: string;
    vehicle_type?: string;

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

  ride_otp?: number | string;
  booking_otp?: number | string;
  otp?: number | string;

  status?: string;

  estimated_distance?: number | string;
  estimated_duration?: number | string;
  estimated_fare?: number | string;

  payment_method?: string;
  payment_status?: string;

  passengerName?: string;
  passenger_name?: string;

  passenger_email?: string;
  passenger_phone?: string;

  email?: string;
  phone?: string;

  passengers?: number | string;
  number_of_passengers?: number | string;

  babies?: number | string;
  elderly?: number | string;

  trip_type?: string;
  tripType?: string;

  pickupDate?: string;
  pickup_date?: string;

  pickupTime?: string;
  pickup_time?: string;

  vehicleType?: string;
  vehicle_type?: string;

  [key: string]: unknown;
}

/* ============================================================
   HELPERS
============================================================ */

function numberValue(
  value: unknown,
  fallback = 0
): number {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function stringValue(
  value: unknown,
  fallback = ""
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  return String(value);
}

/* ============================================================
   POST
============================================================ */

export async function POST(
  request: Request
) {
  try {
    /* ========================================================
       READ REQUEST
    ======================================================== */

    const body =
      (await request.json()) as BookingRequest;

    console.log(
      "================================================"
    );

    console.log(
      "PASSENGER BOOKING API REQUEST"
    );

    console.log(
      JSON.stringify(
        body,
        null,
        2
      )
    );

    console.log(
      "================================================"
    );

    /* ========================================================
       VALIDATION
    ======================================================== */

    const userId =
      numberValue(
        body.user_id
      );

    if (
      !userId ||
      userId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid user_id is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.pickup_address ||
      body.pickup_latitude === undefined ||
      body.pickup_longitude === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pickup location is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.drop_address ||
      body.drop_latitude === undefined ||
      body.drop_longitude === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Drop location is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       PASSENGER INFORMATION
    ======================================================== */

    const passengerName =
      stringValue(
        body.passengerName ??
          body.passenger_name
      ).trim();

    const passengerEmail =
      stringValue(
        body.email ??
          body.passenger_email
      ).trim();

    const passengerPhone =
      stringValue(
        body.phone ??
          body.passenger_phone
      ).trim();

    const passengers =
      numberValue(
        body.number_of_passengers ??
          body.passengers,
        1
      );

    const babies =
      numberValue(
        body.babies,
        0
      );

    const elderly =
      numberValue(
        body.elderly,
        0
      );

    /* ========================================================
       TRIP TYPE
    ======================================================== */

    const tripType =
      stringValue(
        body.tripType ??
          body.trip_type,
        "One Way"
      ).trim();

    /* ========================================================
       PAYMENT
    ======================================================== */

    const paymentMethod =
      stringValue(
        body.paymentMethod ??
          body.payment_method,
        "cash"
      ).toLowerCase();

    /* ========================================================
       CREATE RIDE REQUEST
    ======================================================== */

    const phpRequestBody = {
      user_id:
        userId,

      vehicle_type_id:
        body.vehicle_type_id
          ? numberValue(
              body.vehicle_type_id
            )
          : undefined,

      pickup_address:
        body.pickup_address,

      pickup_latitude:
        numberValue(
          body.pickup_latitude
        ),

      pickup_longitude:
        numberValue(
          body.pickup_longitude
        ),

      drop_address:
        body.drop_address,

      drop_latitude:
        numberValue(
          body.drop_latitude
        ),

      drop_longitude:
        numberValue(
          body.drop_longitude
        ),

      estimated_fare:
        numberValue(
          body.estimated_fare
        ),

      /* ====================================================
         PASSENGER
      ==================================================== */

      passengerName:
        passengerName,

      passenger_name:
        passengerName,

      email:
        passengerEmail,

      passenger_email:
        passengerEmail,

      phone:
        passengerPhone,

      passenger_phone:
        passengerPhone,

      /* ====================================================
         VEHICLE
      ==================================================== */

      vehicleType:
        stringValue(
          body.vehicleType ??
            body.vehicle_type
        ),

      vehicle_type:
        stringValue(
          body.vehicleType ??
            body.vehicle_type
        ),

      /* ====================================================
         PASSENGERS
      ==================================================== */

      passengers,

      number_of_passengers:
        passengers,

      babies,

      elderly,

      seats:
        numberValue(
          body.seats
        ),

      /* ====================================================
         RIDE
      ==================================================== */

      distanceKm:
        numberValue(
          body.distanceKm ??
            body.estimated_distance
        ),

      estimated_distance:
        numberValue(
          body.distanceKm ??
            body.estimated_distance
        ),

      durationMinutes:
        numberValue(
          body.durationMinutes ??
            body.estimated_duration
        ),

      estimated_duration:
        numberValue(
          body.durationMinutes ??
            body.estimated_duration
        ),

      /* ====================================================
         DATE / TIME
      ==================================================== */

      pickupDate:
        stringValue(
          body.pickupDate ??
            body.pickup_date
        ),

      pickup_date:
        stringValue(
          body.pickupDate ??
            body.pickup_date
        ),

      pickupTime:
        stringValue(
          body.pickupTime ??
            body.pickup_time
        ),

      pickup_time:
        stringValue(
          body.pickupTime ??
            body.pickup_time
        ),

      /* ====================================================
         TRIP TYPE
      ==================================================== */

      tripType,

      trip_type:
        tripType,

      /* ====================================================
         OTHER
      ==================================================== */

      additionalPreferences:
        stringValue(
          body.additionalPreferences
        ),

      /* ====================================================
         PAYMENT
      ==================================================== */

      paymentMethod,

      payment_method:
        paymentMethod,
    };

    console.log(
      "CREATE RIDE PHP REQUEST:"
    );

    console.log(
      JSON.stringify(
        phpRequestBody,
        null,
        2
      )
    );

    /* ========================================================
       CALL PHP CREATE RIDE API
    ======================================================== */

    const phpResponse =
      await fetch(
        url_path.create_ride,
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
              phpRequestBody
            ),

          cache: "no-store",
        }
      );

    /* ========================================================
       READ PHP RESPONSE
    ======================================================== */

    let phpData: ApiResponse;

    try {
      phpData =
        (await phpResponse.json()) as ApiResponse;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from ride server.",
        },
        {
          status: 502,
        }
      );
    }

    console.log(
      "================================================"
    );

    console.log(
      "PHP CREATE RIDE RESPONSE:"
    );

    console.log(
      JSON.stringify(
        phpData,
        null,
        2
      )
    );

    console.log(
      "================================================"
    );

    /* ========================================================
       PHP ERROR
    ======================================================== */

    if (
      !phpResponse.ok ||
      phpData.success !== true
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            phpData.message ||
            "Unable to create ride.",

          data:
            phpData.data ?? null,
        },
        {
          status:
            phpResponse.status >= 400
              ? phpResponse.status
              : 500,
        }
      );
    }

    /* ========================================================
       EXTRACT RIDE ID
    ======================================================== */

    const rideId =
      phpData.data?.ride_id ??
      phpData.data?.rideId ??
      phpData.ride_id ??
      phpData.rideId ??
      "";

    /* ========================================================
       EXTRACT BOOKING ID
    ======================================================== */

    const bookingId =
      phpData.data?.booking_id ??
      phpData.data?.bookingId ??
      phpData.booking_id ??
      phpData.bookingId ??
      rideId;

    /* ========================================================
       EXTRACT BOOKING NUMBER
    ======================================================== */

    const bookingNumber =
      phpData.data?.booking_number ??
      phpData.data?.bookingNumber ??
      phpData.data?.booking_reference ??
      phpData.data?.booking_reference_number ??
      phpData.booking_number ??
      phpData.bookingNumber ??
      phpData.booking_reference ??
      phpData.booking_reference_number ??
      "";

    /* ========================================================
       EXTRACT OTP
    ======================================================== */

    const rideOtp =
      phpData.data?.ride_otp ??
      phpData.data?.booking_otp ??
      phpData.data?.otp ??
      phpData.ride_otp ??
      phpData.booking_otp ??
      phpData.otp ??
      "";

    /* ========================================================
       EXTRACT STATUS
    ======================================================== */

    const status =
      phpData.data?.status ??
      phpData.status ??
      "searching";

    /* ========================================================
       EXTRACT SERVER FARE
    ======================================================== */

    const estimatedFare =
      numberValue(
        phpData.data?.estimated_fare ??
          phpData.estimated_fare ??
          body.estimated_fare
      );

    /* ========================================================
       EXTRACT SERVER DISTANCE
    ======================================================== */

    const estimatedDistance =
      numberValue(
        phpData.data?.estimated_distance ??
          phpData.estimated_distance ??
          body.distanceKm
      );

    /* ========================================================
       EXTRACT SERVER DURATION
    ======================================================== */

    const estimatedDuration =
      numberValue(
        phpData.data?.estimated_duration ??
          phpData.estimated_duration ??
          body.durationMinutes
      );

    /* ========================================================
       PAYMENT
    ======================================================== */

    const returnedPaymentMethod =
      stringValue(
        phpData.data?.payment_method ??
          phpData.payment_method ??
          paymentMethod
      );

    const paymentStatus =
      stringValue(
        phpData.data?.payment_status ??
          phpData.payment_status,
        "pending"
      );

    /* ========================================================
       PASSENGER INFORMATION FROM SERVER
       
       FALLBACK TO ORIGINAL BOOKING REQUEST.
       This is important.
    ======================================================== */

    const returnedPassengerName =
      stringValue(
        phpData.data?.passengerName ??
          phpData.data?.passenger_name ??
          phpData.passengerName ??
          phpData.passenger_name ??
          passengerName,
        passengerName
      );

    const returnedPassengerEmail =
      stringValue(
        phpData.data?.passenger_email ??
          phpData.data?.email ??
          phpData.passenger_email ??
          phpData.email ??
          passengerEmail,
        passengerEmail
      );

    const returnedPassengerPhone =
      stringValue(
        phpData.data?.passenger_phone ??
          phpData.data?.phone ??
          phpData.passenger_phone ??
          phpData.phone ??
          passengerPhone,
        passengerPhone
      );

    const returnedPassengers =
      numberValue(
        phpData.data?.passengers ??
          phpData.data?.number_of_passengers ??
          phpData.passengers ??
          phpData.number_of_passengers ??
          passengers,
        passengers
      );

    const returnedBabies =
      numberValue(
        phpData.data?.babies ??
          phpData.babies ??
          babies,
        babies
      );

    const returnedElderly =
      numberValue(
        phpData.data?.elderly ??
          phpData.elderly ??
          elderly,
        elderly
      );

    /* ========================================================
       RETURNED TRIP TYPE
    ======================================================== */

    const returnedTripType =
      stringValue(
        phpData.data?.trip_type ??
          phpData.data?.tripType ??
          phpData.trip_type ??
          phpData.tripType ??
          tripType,
        tripType
      );

    /* ========================================================
       FINAL RIDE ID CHECK
    ======================================================== */

    if (!rideId) {
      console.error(
        "PHP API did not return ride_id:",
        phpData
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Booking was created, but ride_id was not returned by the server.",

          data: {
            ...phpData.data,

            booking_id:
              bookingId,

            booking_number:
              bookingNumber,

            ride_otp:
              rideOtp,

            passengerName:
              returnedPassengerName,

            passenger_name:
              returnedPassengerName,

            email:
              returnedPassengerEmail,

            passenger_email:
              returnedPassengerEmail,

            phone:
              returnedPassengerPhone,

            passenger_phone:
              returnedPassengerPhone,

            passengers:
              returnedPassengers,

            number_of_passengers:
              returnedPassengers,

            babies:
              returnedBabies,

            elderly:
              returnedElderly,

            trip_type:
              returnedTripType,

            tripType:
              returnedTripType,
          },
        },
        {
          status: 502,
        }
      );
    }

    /* ========================================================
       FINAL BOOKING DATA

       IMPORTANT:
       Passenger information is explicitly preserved here.
    ======================================================== */

    const finalData = {
      ...phpData.data,

      /* ====================================================
         BOOKING
      ==================================================== */

      booking_id:
        bookingId,

      ride_id:
        rideId,

      booking_number:
        bookingNumber,

      ride_otp:
        rideOtp,

      status,

      /* ====================================================
         PASSENGER NAME
      ==================================================== */

      passengerName:
        returnedPassengerName,

      passenger_name:
        returnedPassengerName,

      /* ====================================================
         PASSENGER EMAIL
      ==================================================== */

      email:
        returnedPassengerEmail,

      passenger_email:
        returnedPassengerEmail,

      /* ====================================================
         PASSENGER PHONE
      ==================================================== */

      phone:
        returnedPassengerPhone,

      passenger_phone:
        returnedPassengerPhone,

      /* ====================================================
         PASSENGER COUNTS
      ==================================================== */

      passengers:
        returnedPassengers,

      number_of_passengers:
        returnedPassengers,

      babies:
        returnedBabies,

      elderly:
        returnedElderly,

      /* ====================================================
         RIDE
      ==================================================== */

      estimated_distance:
        estimatedDistance,

      estimated_duration:
        estimatedDuration,

      estimated_fare:
        estimatedFare,

      /* ====================================================
         PAYMENT
      ==================================================== */

      payment_method:
        returnedPaymentMethod,

      payment_status:
        paymentStatus,

      /* ====================================================
         TRIP TYPE
      ==================================================== */

      trip_type:
        returnedTripType,

      tripType:
        returnedTripType,

      /* ====================================================
         DATE / TIME
      ==================================================== */

      pickupDate:
        stringValue(
          phpData.data?.pickupDate ??
            phpData.data?.pickup_date ??
            body.pickupDate ??
            body.pickup_date
        ),

      pickup_date:
        stringValue(
          phpData.data?.pickup_date ??
            phpData.data?.pickupDate ??
            body.pickup_date ??
            body.pickupDate
        ),

      pickupTime:
        stringValue(
          phpData.data?.pickupTime ??
            phpData.data?.pickup_time ??
            body.pickupTime ??
            body.pickup_time
        ),

      pickup_time:
        stringValue(
          phpData.data?.pickup_time ??
            phpData.data?.pickupTime ??
            body.pickup_time ??
            body.pickupTime
        ),

      /* ====================================================
         VEHICLE
      ==================================================== */

      vehicleType:
        stringValue(
          phpData.data?.vehicleType ??
            phpData.data?.vehicle_type ??
            body.vehicleType ??
            body.vehicle_type
        ),

      vehicle_type:
        stringValue(
          phpData.data?.vehicle_type ??
            phpData.data?.vehicleType ??
            body.vehicle_type ??
            body.vehicleType
        ),
    };

    /* ========================================================
       EMAIL PAYLOAD
    ======================================================== */

    const emailPayload = {
      user_id:
        userId,

      booking_id:
        bookingId,

      ride_id:
        rideId,

      booking_number:
        bookingNumber,

      booking_reference:
        bookingNumber,

      ride_otp:
        rideOtp,

      booking_otp:
        rideOtp,

      otp:
        rideOtp,

      status,

      /* ====================================================
         TRIP
      ==================================================== */

      pickup_address:
        body.pickup_address,

      pickup_latitude:
        body.pickup_latitude,

      pickup_longitude:
        body.pickup_longitude,

      drop_address:
        body.drop_address,

      drop_latitude:
        body.drop_latitude,

      drop_longitude:
        body.drop_longitude,

      pickupDate:
        body.pickupDate ??
        body.pickup_date ??
        "",

      pickupTime:
        body.pickupTime ??
        body.pickup_time ??
        "",

      tripType:
        returnedTripType,

      trip_type:
        returnedTripType,

      /* ====================================================
         VEHICLE
      ==================================================== */

      vehicleType:
        body.vehicleType ??
        body.vehicle_type ??
        "",

      vehicle_type:
        body.vehicleType ??
        body.vehicle_type ??
        "",

      vehicle_type_id:
        body.vehicle_type_id,

      /* ====================================================
         PASSENGER
      ==================================================== */

      passengerName:
        returnedPassengerName,

      passenger_name:
        returnedPassengerName,

      email:
        returnedPassengerEmail,

      passenger_email:
        returnedPassengerEmail,

      phone:
        returnedPassengerPhone,

      passenger_phone:
        returnedPassengerPhone,

      passengers:
        returnedPassengers,

      number_of_passengers:
        returnedPassengers,

      babies:
        returnedBabies,

      elderly:
        returnedElderly,

      seats:
        body.seats || 0,

      /* ====================================================
         RIDE
      ==================================================== */

      distanceKm:
        estimatedDistance,

      estimated_distance:
        estimatedDistance,

      durationMinutes:
        estimatedDuration,

      estimated_duration:
        estimatedDuration,

      estimatedFare:
        estimatedFare,

      estimated_fare:
        estimatedFare,

      /* ====================================================
         PAYMENT
      ==================================================== */

      paymentMethod:
        returnedPaymentMethod,

      payment_method:
        returnedPaymentMethod,

      paymentStatus:
        paymentStatus,

      payment_status:
        paymentStatus,

      /* ====================================================
         OTHER
      ==================================================== */

      additionalPreferences:
        body.additionalPreferences || "",

      createdAt:
        new Date().toISOString(),
    };

    console.log(
      "================================================"
    );

    console.log(
      "FINAL PASSENGER INFORMATION:"
    );

    console.log(
      JSON.stringify(
        {
          passengerName:
            returnedPassengerName,

          passenger_name:
            returnedPassengerName,

          email:
            returnedPassengerEmail,

          passenger_email:
            returnedPassengerEmail,

          phone:
            returnedPassengerPhone,

          passenger_phone:
            returnedPassengerPhone,

          passengers:
            returnedPassengers,

          number_of_passengers:
            returnedPassengers,

          babies:
            returnedBabies,

          elderly:
            returnedElderly,
        },
        null,
        2
      )
    );

    console.log(
      "================================================"
    );

    console.log(
      "EMAIL PAYLOAD:"
    );

    console.log(
      JSON.stringify(
        emailPayload,
        null,
        2
      )
    );

    console.log(
      "================================================"
    );

    /* ========================================================
       SEND EMAIL

       Email failure does NOT fail booking.
    ======================================================== */

    let emailSent = false;
    let emailError = "";

    try {
      const emailResponse =
        await fetch(
          new URL(
            "/api/email",
            request.url
          ),
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
                emailPayload
              ),

            cache: "no-store",
          }
        );

      let emailResult: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        emailResult =
          await emailResponse.json();
      } catch {
        emailResult = {};
      }

      console.log(
        "EMAIL API RESPONSE:",
        emailResult
      );

      if (
        emailResponse.ok &&
        emailResult.success === true
      ) {
        emailSent = true;
      } else {
        emailError =
          emailResult.message ||
          "Email sending failed.";
      }
    } catch (err) {
      console.error(
        "EMAIL SEND ERROR:",
        err
      );

      emailError =
        err instanceof Error
          ? err.message
          : "Email sending failed.";
    }

    /* ========================================================
       FINAL RESPONSE
    ======================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          phpData.message ||
          "Ride created successfully. Searching for driver...",

        data:
          finalData,

        email_sent:
          emailSent,

        email_error:
          emailSent
            ? undefined
            : emailError,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "================================================"
    );

    console.error(
      "PASSENGER BOOKING ROUTE ERROR:"
    );

    console.error(
      error
    );

    console.error(
      "================================================"
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to create booking.",
      },
      {
        status: 500,
      }
    );
  }
}