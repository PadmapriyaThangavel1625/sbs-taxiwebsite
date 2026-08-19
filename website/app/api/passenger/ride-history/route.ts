import { NextRequest, NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

export async function GET(request: NextRequest) {
  try {
    /* =========================================================
       GET USER ID
    ========================================================= */

    const userId =
      request.nextUrl.searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "user_id is required",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* =========================================================
       VALIDATE USER ID
    ========================================================= */

    const numericUserId = Number(userId);

    if (
      !Number.isInteger(numericUserId) ||
      numericUserId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user_id",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* =========================================================
       CALL PHP API
    ========================================================= */

    const apiUrl =
      `${url_path.ride_history}?user_id=${encodeURIComponent(
        String(numericUserId)
      )}`;

    const response = await fetch(apiUrl, {
      method: "GET",

      headers: {
        Accept: "application/json",
      },

      cache: "no-store",
    });

    /* =========================================================
       API RESPONSE
    ========================================================= */

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            result?.message ||
            "Unable to fetch ride history",
          data: null,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "Passenger ride history error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to ride history API",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}