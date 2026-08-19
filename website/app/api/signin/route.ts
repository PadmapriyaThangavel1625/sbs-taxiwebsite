import { NextResponse } from "next/server";

const LOGIN_API =
  "https://sbstechnologies.in/travels/api/users/login.php";

export async function POST(request: Request) {
  try {
    // ============================================================
    // GET REQUEST DATA
    // ============================================================

    const body = await request.json();

    const mobile = String(body?.mobile || "").trim();
    const password = String(body?.password || "");

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required.",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // CALL PHP LOGIN API
    // ============================================================

    const apiResponse = await fetch(LOGIN_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        mobile,
        password,
      }),

      cache: "no-store",
    });

    // ============================================================
    // READ RESPONSE
    // ============================================================

    const responseText = await apiResponse.text();

    let result: any;

    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from login server.",
        },
        { status: 502 }
      );
    }

    // ============================================================
    // LOGIN FAILED
    // ============================================================

    if (!apiResponse.ok || result?.success !== true) {
      return NextResponse.json(
        {
          success: false,
          message:
            result?.message ||
            "Invalid mobile number or password.",
        },
        {
          status:
            apiResponse.status >= 400
              ? apiResponse.status
              : 401,
        }
      );
    }

    // ============================================================
    // CHECK USER DATA
    // ============================================================

    if (!result?.data) {
      return NextResponse.json(
        {
          success: false,
          message: "User data was not returned.",
        },
        { status: 502 }
      );
    }

    // ============================================================
    // USER DATA
    // ============================================================

    const user = {
      id: result.data.id,
      name: result.data.name,
      mobile: result.data.mobile,
      email: result.data.email,
      status: result.data.status,
    };

    // ============================================================
    // SUCCESS RESPONSE
    // ============================================================

    return NextResponse.json(
      {
        success: true,
        message:
          result.message || "Login successful.",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SIGN IN API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to connect to the login server.",
      },
      { status: 500 }
    );
  }
}