import { NextRequest, NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

/* ============================================================
   TYPES
============================================================ */

interface ProfileResponse {
  success?: boolean;
  message?: string;
  data?: PassengerUser | null;
}

interface PassengerUser {
  id?: string | number;
  name?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  profile_image?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

/* ============================================================
   GET PROFILE
   GET /api/passenger/profile?user_id=2
============================================================ */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("user_id");

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

    const numericUserId = Number(userId);

    if (
      !Number.isInteger(numericUserId) ||
      numericUserId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid user_id is required",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* ========================================================
       CALL PHP PROFILE API
    ======================================================== */

    const apiUrl =
      `${url_path.profile}?user_id=${encodeURIComponent(
        String(numericUserId)
      )}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    let result: ProfileResponse;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "SBS PROFILE API INVALID JSON:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from profile server.",
          data: null,
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "SBS PASSENGER PROFILE GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to connect to profile server.",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   UPDATE PROFILE
   PUT /api/passenger/profile
============================================================ */

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    const userId = Number(body.user_id);

    if (
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid user_id is required",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
          data: null,
        },
        {
          status: 422,
        }
      );
    }

    /* ========================================================
       BUILD PHP REQUEST
    ======================================================== */

    const phpBody: Record<string, unknown> = {
      user_id: userId,
      name,
      email,
    };

    /*
     * Only send profile_image when a new cropped image
     * has actually been selected.
     */
    if (
      typeof body.profile_image === "string" &&
      body.profile_image.trim() !== ""
    ) {
      phpBody.profile_image =
        body.profile_image;
    }

    /* ========================================================
       CALL PHP UPDATE API
    ======================================================== */

    const response = await fetch(
      url_path.update_profile,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(phpBody),
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result: ProfileResponse;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "SBS UPDATE PROFILE INVALID JSON:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from profile server.",
          data: null,
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "SBS PASSENGER PROFILE UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update profile. Please try again.",
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
   Some hosting environments handle PUT differently.
   Support POST as well without changing the frontend.
============================================================ */

export async function POST(request: NextRequest) {
  return PUT(request);
}