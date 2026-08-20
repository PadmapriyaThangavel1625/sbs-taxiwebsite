import { NextRequest, NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

interface CancelRideRequest {
  ride_id?: number | string;
  reason?: string;
}

interface CancelRideResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    /* ============================================================
       READ REQUEST BODY
    ============================================================ */

    let body: CancelRideRequest;

    try {
      body = (await request.json()) as CancelRideRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request.",
        },
        { status: 400 }
      );
    }

    /* ============================================================
       VALIDATE RIDE ID
    ============================================================ */

    const rideId = Number(body?.ride_id);

    if (!Number.isInteger(rideId) || rideId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid ride ID required.",
        },
        { status: 422 }
      );
    }

    /* ============================================================
       CANCEL REASON
    ============================================================ */

    const reason =
      typeof body.reason === "string" &&
      body.reason.trim()
        ? body.reason.trim()
        : "Cancelled by passenger";

    /* ============================================================
       PHP API URL
       
       IMPORTANT:
       url_path is an OBJECT.

       WRONG:
       `${url_path}/rides/cancel.php`

       CORRECT:
       url_path.cancel_ride
    ============================================================ */

    const apiUrl = url_path.cancel_ride;

    console.log(
      "================================================"
    );

    console.log(
      "CANCEL RIDE"
    );

    console.log(
      "Ride ID:",
      rideId
    );

    console.log(
      "Cancel reason:",
      reason
    );

    console.log(
      "PHP API URL:",
      apiUrl
    );

    console.log(
      "================================================"
    );

    /* ============================================================
       CALL PHP API
    ============================================================ */

    const response = await fetch(apiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        ride_id: rideId,
        reason,
      }),

      cache: "no-store",
    });

    /* ============================================================
       READ PHP RESPONSE AS TEXT FIRST
       
       This helps us see the actual PHP response if it is
       invalid JSON.
    ============================================================ */

    const rawResponse = await response.text();

    console.log(
      "PHP HTTP STATUS:",
      response.status
    );

    console.log(
      "PHP RAW RESPONSE:",
      rawResponse
    );

    /* ============================================================
       EMPTY RESPONSE
    ============================================================ */

    if (!rawResponse.trim()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cancellation server returned an empty response.",
        },
        { status: 502 }
      );
    }

    /* ============================================================
       PARSE JSON
    ============================================================ */

    let result: CancelRideResponse;

    try {
      result =
        JSON.parse(
          rawResponse
        ) as CancelRideResponse;
    } catch (error) {
      console.error(
        "INVALID PHP CANCEL RESPONSE:",
        rawResponse
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from cancellation server.",

          ...(process.env.NODE_ENV === "development"
            ? {
                raw_response:
                  rawResponse,
              }
            : {}),
        },
        { status: 502 }
      );
    }

    /* ============================================================
       LOG RESULT
    ============================================================ */

    console.log(
      "CANCEL RIDE API RESULT:",
      result
    );

    /* ============================================================
       FORWARD PHP RESPONSE
    ============================================================ */

    return NextResponse.json(
      result,
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error(
      "CANCEL RIDE ROUTE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to cancel ride.",
      },
      { status: 500 }
    );
  }
}