import { NextRequest, NextResponse } from "next/server";

/* ============================================================
   CONFIG
============================================================ */

const API_BASE =
  "https://sbstechnologies.in/travels/api/users";

/* ============================================================
   TYPES
============================================================ */

interface SavedPlace {
  id?: number | string;
  address_id?: number | string;
  user_id?: number | string;
  address_type?: "home" | "work" | "other" | string;
  address?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
}

/* ============================================================
   GET
   Fetch saved places
============================================================ */

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const userId =
      searchParams.get("user_id");

    /* --------------------------------------------------------
       VALIDATE USER ID
    -------------------------------------------------------- */

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    if (!/^\d+$/.test(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* --------------------------------------------------------
       CALL PHP API
    -------------------------------------------------------- */

    const response = await fetch(
      `${API_BASE}/addresses.php?user_id=${encodeURIComponent(
        userId
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },

        /*
         * Do not cache passenger-specific data.
         */
        cache: "no-store",
      }
    );

    /* --------------------------------------------------------
       READ RESPONSE
    -------------------------------------------------------- */

    const text =
      await response.text();

    let result: ApiResponse<
      SavedPlace[] | SavedPlace | null
    >;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "INVALID PHP API RESPONSE:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from saved places API.",
          data: null,
        },
        {
          status: 502,
        }
      );
    }

    /* --------------------------------------------------------
       RETURN PHP RESPONSE
    -------------------------------------------------------- */

    return NextResponse.json(
      result,
      {
        status:
          response.status || 200,
      }
    );
  } catch (error) {
    console.error(
      "SAVED PLACES GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load saved places.",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   POST
   Add saved place
============================================================ */

export async function POST(
  request: NextRequest
) {
  try {
    /* --------------------------------------------------------
       READ JSON
    -------------------------------------------------------- */

    const body =
      await request.json();

    const userId =
      Number(body?.user_id || 0);

    const addressType =
      String(
        body?.address_type || "other"
      ).trim();

    const address =
      String(
        body?.address || ""
      ).trim();

    const latitude =
      body?.latitude;

    const longitude =
      body?.longitude;

    /* --------------------------------------------------------
       VALIDATION
    -------------------------------------------------------- */

    if (!userId || userId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid user_id is required.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    if (
      ![
        "home",
        "work",
        "other",
      ].includes(addressType)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid address type.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Address is required.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    if (
      latitude === undefined ||
      latitude === null ||
      longitude === undefined ||
      longitude === null
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Latitude and longitude are required.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    if (
      !Number.isFinite(
        Number(latitude)
      ) ||
      !Number.isFinite(
        Number(longitude)
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid latitude or longitude.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* --------------------------------------------------------
       RANGE VALIDATION
    -------------------------------------------------------- */

    const lat =
      Number(latitude);

    const lng =
      Number(longitude);

    if (
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Latitude or longitude is out of range.",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* --------------------------------------------------------
       CALL PHP API
    -------------------------------------------------------- */

    const response = await fetch(
      `${API_BASE}/add-address.php`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          user_id: userId,
          address_type:
            addressType,
          address,
          latitude: lat,
          longitude: lng,
        }),

        cache: "no-store",
      }
    );

    /* --------------------------------------------------------
       READ RESPONSE
    -------------------------------------------------------- */

    const text =
      await response.text();

    let result: ApiResponse;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "INVALID PHP ADD ADDRESS RESPONSE:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from add-address API.",
          data: null,
        },
        {
          status: 502,
        }
      );
    }

    /* --------------------------------------------------------
       RETURN RESPONSE
    -------------------------------------------------------- */

    return NextResponse.json(
      result,
      {
        status:
          response.status || 200,
      }
    );
  } catch (error) {
    console.error(
      "SAVED PLACES POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to add saved place.",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}