import { NextRequest, NextResponse } from "next/server";

/* =========================================================
   TYPES
========================================================= */

interface SignupRequest {
  name?: string;
  mobile?: string;
  email?: string;
  password?: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: {
    user_id?: number;
    name?: string;
    mobile?: string;
    email?: string;
  } | null;
}

/* =========================================================
   API CONFIG
========================================================= */

const REGISTER_API =
  "https://sbstechnologies.in/travels/api/users/register.php";

/* =========================================================
   POST
========================================================= */

export async function POST(request: NextRequest) {
  try {
    /* -------------------------------------------------------
       READ REQUEST BODY
    ------------------------------------------------------- */

    const body = (await request.json()) as SignupRequest;

    const name = body.name?.trim() || "";
    const mobile = body.mobile?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";

    /* -------------------------------------------------------
       BASIC VALIDATION
    ------------------------------------------------------- */

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your full name.",
          data: null,
        },
        { status: 400 }
      );
    }

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your mobile number.",
          data: null,
        },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 10-digit mobile number.",
          data: null,
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your email address.",
          data: null,
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
          data: null,
        },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please create a password.",
          data: null,
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least 6 characters.",
          data: null,
        },
        { status: 400 }
      );
    }

    /* -------------------------------------------------------
       SEND TO PHP API
    ------------------------------------------------------- */

    const apiResponse = await fetch(REGISTER_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        name,
        mobile,
        email,
        password,
      }),

      cache: "no-store",
    });

    /* -------------------------------------------------------
       READ API RESPONSE
    ------------------------------------------------------- */

    let result: ApiResponse;

    try {
      result = (await apiResponse.json()) as ApiResponse;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid response received from registration server.",
          data: null,
        },
        { status: 502 }
      );
    }

    /* -------------------------------------------------------
       SUCCESS
    ------------------------------------------------------- */

    if (result.success === true) {
      return NextResponse.json(
        {
          success: true,
          message: result.message || "Registration successful.",
          data: result.data || null,
        },
        { status: 200 }
      );
    }

    /* -------------------------------------------------------
       PHP API ERROR
    ------------------------------------------------------- */

    return NextResponse.json(
      {
        success: false,
        message: result.message || "Unable to register user.",
        data: result.data || null,
      },
      {
        status:
          apiResponse.status >= 400 && apiResponse.status < 600
            ? apiResponse.status
            : 400,
      }
    );
  } catch (error) {
    console.error("SIGNUP API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to connect to the registration server. Please try again.",
        data: null,
      },
      { status: 500 }
    );
  }
}