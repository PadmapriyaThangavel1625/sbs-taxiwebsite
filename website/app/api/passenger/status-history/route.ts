import { NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

/* ============================================================
   TYPES
============================================================ */

interface RideStatusHistoryRequest {
  ride_id: number;
}

interface RideStatusHistoryItem {
  id?: number | string;
  ride_id?: number | string;
  status?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  notes?: string | null;
  created_at?: string | null;

  /*
   * Optional driver information.
   * Your current PHP API does not return this,
   * but keeping these fields makes the Next.js route
   * compatible if you add driver data later.
   */
  driver?: {
    id?: number | string;
    name?: string;
    phone?: string;
    vehicle_number?: string;
    rating?: number | string;
  };
}

interface PHPStatusHistoryResponse {
  success?: boolean;
  message?: string;
  data?: {
    ride_id?: number | string;
    history?: RideStatusHistoryItem[];
  } | null;
}

/* ============================================================
   HELPERS
============================================================ */

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
   GET
============================================================ */

export async function GET(
  request: Request
) {
  try {
    /* ========================================================
       READ URL
    ======================================================== */

    const { searchParams } =
      new URL(request.url);

    const rideId = numberValue(
      searchParams.get("ride_id")
    );

    /* ========================================================
       VALIDATION
    ======================================================== */

    if (rideId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid ride_id is required.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* ========================================================
       PHP API URL
    ======================================================== */

    /*
     * Make sure project_path.ts contains:
     *
     * ride_status_history:
     *   "https://sbstechnologies.in/travels/api/rides/status-history.php"
     */

    const apiUrl =
      `${url_path.ride_status}?ride_id=${encodeURIComponent(
        String(rideId)
      )}`;

    console.log(
      "================================="
    );

    console.log(
      "SBS RIDE STATUS HISTORY REQUEST"
    );

    console.log(
      "Ride ID:",
      rideId
    );

    console.log(
      "PHP URL:",
      apiUrl
    );

    console.log(
      "================================="
    );

    /* ========================================================
       CALL PHP API
    ======================================================== */

    const phpResponse =
      await fetch(apiUrl, {
        method: "GET",

        headers: {
          Accept:
            "application/json",
        },

        cache: "no-store",
      });

    /* ========================================================
       READ PHP RESPONSE
    ======================================================== */

    let phpResult:
      | PHPStatusHistoryResponse
      | null = null;

    try {
      phpResult =
        (await phpResponse.json()) as PHPStatusHistoryResponse;
    } catch {
      phpResult = null;
    }

    console.log(
      "SBS RIDE STATUS HISTORY RESPONSE:",
      phpResult
    );

    /* ========================================================
       PHP API ERROR
    ======================================================== */

    if (
      !phpResponse.ok ||
      phpResult?.success !== true
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            phpResult?.message ||
            "Unable to fetch ride status history.",

          data:
            phpResult?.data ?? null,
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
       HISTORY
    ======================================================== */

    const history =
      phpResult?.data?.history ?? [];

    /* ========================================================
       NORMALIZE HISTORY
    ======================================================== */

    const normalizedHistory =
      history.map(
        (item) => ({
          id:
            item.id ?? null,

          ride_id:
            item.ride_id ??
            rideId,

          status:
            item.status ?? null,

          latitude:
            item.latitude ?? null,

          longitude:
            item.longitude ?? null,

          notes:
            item.notes ?? null,

          created_at:
            item.created_at ?? null,

          /*
           * Keep driver if PHP sends it.
           */
          ...(item.driver
            ? {
                driver: {
                  id:
                    item.driver.id ??
                    null,

                  name:
                    item.driver.name ??
                    "",

                  phone:
                    item.driver.phone ??
                    "",

                  vehicle_number:
                    item.driver
                      .vehicle_number ??
                    "",

                  rating:
                    item.driver.rating ??
                    null,
                },
              }
            : {}),
        })
      );

    /* ========================================================
       LATEST STATUS
    ======================================================== */

    const latest =
      normalizedHistory.length > 0
        ? normalizedHistory[
            normalizedHistory.length - 1
          ]
        : null;

    const latestStatus =
      String(
        latest?.status ?? ""
      )
        .trim()
        .toLowerCase();

    /* ========================================================
       FINAL DATA
    ======================================================== */

    const responseData = {
      ride_id: rideId,

      history:
        normalizedHistory,

      latest_status:
        latestStatus || null,

      latest:
        latest,
    };

    console.log(
      "SBS NORMALIZED STATUS:",
      responseData
    );

    /* ========================================================
       SUCCESS
    ======================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          phpResult?.message ||
          "Ride status history fetched successfully.",

        data: responseData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    /* ========================================================
       SERVER ERROR
    ======================================================== */

    console.error(
      "SBS RIDE STATUS HISTORY API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to fetch ride status history.",

        data: null,
      },
      {
        status: 500,
      }
    );
  }
}