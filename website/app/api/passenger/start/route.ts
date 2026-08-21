import { NextRequest, NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

/* ============================================================
   TYPES
============================================================ */

interface StartTripRequest {
  ride_id?: number | string;
  driver_id?: number | string;
  otp?: string | number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

/* ============================================================
   POST /api/passenger/start
============================================================ */

export async function POST(
  request: NextRequest
) {
  try {
    console.log(
      "================================================"
    );

    console.log(
      "PASSENGER START TRIP API"
    );

    console.log(
      "================================================"
    );

    /* ========================================================
       READ REQUEST BODY
    ======================================================== */

    let body: StartTripRequest;

    try {
      body =
        (await request.json()) as StartTripRequest;
    } catch (error) {
      console.error(
        "Invalid JSON request body:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid JSON request body.",
        } satisfies ApiResponse,
        {
          status: 400,
        }
      );
    }

    console.log(
      "START TRIP REQUEST BODY:",
      body
    );

    /* ========================================================
       RIDE ID
    ======================================================== */

    const rideId =
      Number(body.ride_id);

    if (
      !Number.isInteger(rideId) ||
      rideId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid ride_id is required.",
        } satisfies ApiResponse,
        {
          status: 422,
        }
      );
    }

    /* ========================================================
       DRIVER ID
    ======================================================== */

    const driverId =
      Number(body.driver_id);

    if (
      !Number.isInteger(driverId) ||
      driverId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid driver_id is required.",
        } satisfies ApiResponse,
        {
          status: 422,
        }
      );
    }

    /* ========================================================
       OTP
    ======================================================== */

    const otp =
      body.otp !== undefined &&
      body.otp !== null
        ? String(body.otp).trim()
        : "";

    if (!otp) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Ride OTP is required.",
        } satisfies ApiResponse,
        {
          status: 422,
        }
      );
    }

    /* ========================================================
       PHP API URL
       
       project_path.ts already contains:
       
       url_path.start_ride
       
       = https://sbstechnologies.in/travels/api/rides/start.php
    ======================================================== */

    const phpUrl =
      url_path.start_ride;

    if (
      !phpUrl ||
      typeof phpUrl !== "string"
    ) {
      console.error(
        "START RIDE URL IS INVALID:",
        phpUrl
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Start ride API URL is not configured.",
        } satisfies ApiResponse,
        {
          status: 500,
        }
      );
    }

    console.log(
      "START RIDE PHP URL:",
      phpUrl
    );

    /* ========================================================
       PHP REQUEST
    ======================================================== */

    const phpRequestBody = {
      ride_id: rideId,
      driver_id: driverId,
      otp: otp,
    };

    console.log(
      "START RIDE PHP REQUEST:",
      {
        ride_id: rideId,
        driver_id: driverId,
        otp: "***",
      }
    );

    /* ========================================================
       CALL PHP API
    ======================================================== */

    let phpResponse: Response;

    try {
      phpResponse =
        await fetch(
          phpUrl,
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

            cache:
              "no-store",
          }
        );
    } catch (fetchError) {
      console.error(
        "START RIDE FETCH ERROR:",
        fetchError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to connect to the start ride server.",
        } satisfies ApiResponse,
        {
          status: 502,
        }
      );
    }

    /* ========================================================
       READ PHP RESPONSE AS TEXT
    ======================================================== */

    const responseText =
      await phpResponse.text();

    console.log(
      "START RIDE PHP STATUS:",
      phpResponse.status
    );

    console.log(
      "START RIDE PHP RESPONSE:",
      responseText
    );

    /* ========================================================
       EMPTY RESPONSE
    ======================================================== */

    if (
      !responseText.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Start ride API returned an empty response. HTTP ${phpResponse.status}.`,
        } satisfies ApiResponse,
        {
          status:
            phpResponse.status >= 400
              ? phpResponse.status
              : 502,
        }
      );
    }

    /* ========================================================
       PARSE JSON
    ======================================================== */

    let data: ApiResponse;

    try {
      data =
        JSON.parse(
          responseText
        ) as ApiResponse;
    } catch (parseError) {
      console.error(
        "START RIDE JSON PARSE ERROR:",
        parseError
      );

      console.error(
        "RAW PHP RESPONSE:",
        responseText
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Start ride server returned invalid JSON.",

          data:
            process.env.NODE_ENV ===
            "development"
              ? {
                  http_status:
                    phpResponse.status,

                  raw_response:
                    responseText.slice(
                      0,
                      3000
                    ),
                }
              : undefined,
        } satisfies ApiResponse,
        {
          status: 502,
        }
      );
    }

    /* ========================================================
       PHP API FAILURE
    ======================================================== */

    if (
      !phpResponse.ok ||
      data.success === false
    ) {
      console.error(
        "START RIDE PHP API FAILED:",
        {
          status:
            phpResponse.status,

          message:
            data.message,

          data:
            data.data,
        }
      );

      return NextResponse.json(
        {
          success: false,

          message:
            data.message ||
            "Unable to start trip.",

          data:
            data.data,
        } satisfies ApiResponse,
        {
          status:
            phpResponse.status >= 400
              ? phpResponse.status
              : 400,
        }
      );
    }

    /* ========================================================
       SUCCESS
    ======================================================== */

    console.log(
      "================================================"
    );

    console.log(
      "TRIP STARTED SUCCESSFULLY"
    );

    console.log(
      {
        rideId,
        driverId,
      }
    );

    console.log(
      "================================================"
    );

    return NextResponse.json(
      {
        success: true,

        message:
          data.message ||
          "Trip started successfully.",

        data:
          data.data,
      } satisfies ApiResponse,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PASSENGER START API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to start trip.",
      } satisfies ApiResponse,
      {
        status: 500,
      }
    );
  }
}