import { NextRequest, NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

export async function GET(request: NextRequest) {
  try {
    // ============================================================
    // GET RIDE ID
    // ============================================================

    const { searchParams } = new URL(request.url);

    const rideId = searchParams.get("ride_id");

    console.log(
      "Driver profile ride_id:",
      rideId
    );

    if (!rideId) {
      return NextResponse.json(
        {
          success: false,
          message: "ride_id is required",
        },
        {
          status: 422,
        }
      );
    }

    // ============================================================
    // USE EXISTING WORKING RIDE DETAILS API
    // ============================================================

    const phpUrl =
      `${url_path.ride_details}?ride_id=${encodeURIComponent(
        rideId
      )}`;

    console.log(
      "Ride details PHP URL:",
      phpUrl
    );

    // ============================================================
    // FETCH PHP API
    // ============================================================

    const response = await fetch(
      phpUrl,
      {
        method: "GET",

        headers: {
          Accept: "application/json",
        },

        cache: "no-store",
      }
    );

    // ============================================================
    // READ RESPONSE
    // ============================================================

    const text = await response.text();

    console.log(
      "Ride details status:",
      response.status
    );

    console.log(
      "Ride details response:",
      text
    );

    // ============================================================
    // PARSE JSON
    // ============================================================

    let data: any;

    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error(
        "Invalid ride details response:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response from ride details server",
          raw_response: text,
        },
        {
          status: 502,
        }
      );
    }

    // ============================================================
    // API ERROR
    // ============================================================

    if (
      !response.ok ||
      !data.success
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            data.message ||
            "Unable to fetch ride details",
        },
        {
          status:
            response.status >= 400
              ? response.status
              : 500,
        }
      );
    }

    // ============================================================
    // GET DRIVER
    // ============================================================

    const driver =
      data.data?.driver;

    const ride =
      data.data?.ride;

    const vehicle =
      data.data?.vehicle;

    // ============================================================
    // CHECK DRIVER
    // ============================================================

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No driver assigned to this ride",
        },
        {
          status: 404,
        }
      );
    }

    // ============================================================
    // BUILD DRIVER PROFILE
    // ============================================================

    const profile = {
      id:
        Number(
          driver.id ??
          ride?.driver_id ??
          0
        ),

      name:
        driver.name ??
        ride?.driver_name ??
        "",

      mobile:
        driver.mobile ??
        ride?.driver_mobile ??
        "",

      email:
        driver.email ??
        ride?.driver_email ??
        "",

      profile_image:
        driver.profile_image ??
        ride?.driver_profile_image ??
        null,

      rating:
        driver.rating ??
        ride?.driver_rating ??
        null,

      availability_status:
        driver.availability_status ??
        null,

      // ----------------------------------------------------------
      // VEHICLE
      // ----------------------------------------------------------

      vehicle_id:
        vehicle?.id ??
        ride?.vehicle_id ??
        null,

      vehicle_number:
        vehicle?.number ??
        ride?.vehicle_number ??
        null,

      manufacturer:
        vehicle?.manufacturer ??
        ride?.manufacturer ??
        null,

      vehicle_model:
        vehicle?.model ??
        ride?.vehicle_model ??
        null,

      vehicle_color:
        vehicle?.color ??
        ride?.vehicle_color ??
        null,

      // ----------------------------------------------------------
      // VEHICLE TYPE
      // ----------------------------------------------------------

      vehicle_type_id:
        vehicle?.type?.id ??
        ride?.vehicle_type_id ??
        null,

      vehicle_type_name:
        vehicle?.type?.name ??
        ride?.vehicle_type_name ??
        null,

      vehicle_capacity:
        vehicle?.type?.capacity ??
        ride?.vehicle_capacity ??
        null,

      // ----------------------------------------------------------
      // LOCATION
      // ----------------------------------------------------------

      address:
        driver.address ??
        null,

      city:
        driver.city ??
        null,

      state:
        driver.state ??
        null,
    };

    // ============================================================
    // RETURN DRIVER PROFILE
    // ============================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Driver profile fetched successfully",

        data: profile,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Driver profile API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch driver profile",
      },
      {
        status: 500,
      }
    );
  }
}