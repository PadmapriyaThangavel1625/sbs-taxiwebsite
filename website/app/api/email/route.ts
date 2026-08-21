import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

/* ============================================================
   TYPES
============================================================ */

interface Destination {
  name?: string;
  location?: string;
  fare?: number | string;
  custom?: boolean;
}

interface PassengerDetails {
  name?: string;
  passengerName?: string;
  passenger_name?: string;

  email?: string;
  phone?: string;

  people?: number | string;
  passengers?: number | string;
  passengerCount?: number | string;
  passenger_count?: number | string;

  babies?: number | string;
  baby?: number | string;
  babyCount?: number | string;
  baby_count?: number | string;

  elderly?: number | string;
  elders?: number | string;
  elder?: number | string;
  elderCount?: number | string;
  elder_count?: number | string;
}

interface ApiRideData {
  rideId?: number | string;
  ride_id?: number | string;

  bookingId?: number | string;
  booking_id?: number | string;

  bookingNumber?: string;
  booking_number?: string;

  otp?: string | number;
  bookingOtp?: string | number;
  booking_otp?: string | number;
  rideOtp?: string | number;
  ride_otp?: string | number;

  status?: string;
  rideStatus?: string;
  ride_status?: string;

  estimatedFare?: number | string;
  estimated_fare?: number | string;

  paymentMethod?: string;
  payment_method?: string;

  paymentStatus?: string;
  payment_status?: string;

  passengerName?: string;
  passenger_name?: string;
  name?: string;
  email?: string;
  phone?: string;

  people?: number | string;
  passengers?: number | string;
  passengerCount?: number | string;
  passenger_count?: number | string;

  babies?: number | string;
  baby?: number | string;
  babyCount?: number | string;
  baby_count?: number | string;

  elderly?: number | string;
  elders?: number | string;
  elder?: number | string;
  elderCount?: number | string;
  elder_count?: number | string;

  passenger?: PassengerDetails;
  passenger_details?: PassengerDetails;
  passengerDetails?: PassengerDetails;

  pickup?: string;
  pickup_address?: string;
  drop?: string;
  drop_address?: string;

  pickupDate?: string;
  pickup_date?: string;
  date?: string;

  pickupTime?: string;
  pickup_time?: string;
  time?: string;

  tripType?: string;
  trip_type?: string;

  isRoundTrip?: boolean;
  is_round_trip?: boolean;

  vehicleType?: string;
  vehicle_type?: string;
  vehicle?: string;
  vehicleModel?: string;
  vehicle_model?: string;
  model?: string;

  vehicleTypeId?: number | string;
  vehicle_type_id?: number | string;

  seats?: string | number;

  price?: number | string;
  distanceKm?: number | string;
  distance_km?: number | string;
  durationMinutes?: number | string;
  duration_minutes?: number | string;

  preferences?: string[];

  data?: ApiRideData;
}

interface TaxiBookingBody extends ApiRideData {
  bookingType?: string;
  booking_type?: string;

  user_id?: number | string;
}

/* ============================================================
   CONSTANTS
============================================================ */

const BRAND_BLUE = "#123f80";
const BRAND_YELLOW = "#f2b900";

const TEXT_DARK = "#1e293b";
const TEXT_MUTED = "#64748b";
const BORDER = "#e2e8f0";

const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 30;
const MAX_EMAIL_LENGTH = 150;
const MAX_LOCATION_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 3000;

/* ============================================================
   STRING HELPER
============================================================ */

function stringValue(
  value: unknown,
  fallback = ""
): string {
  if (
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return fallback;
  }

  return String(value).trim();
}

/* ============================================================
   NUMBER HELPER
============================================================ */

function numberValue(
  value: unknown,
  fallback = 0
): number {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  const result = Number(value);

  return Number.isFinite(result)
    ? result
    : fallback;
}

/* ============================================================
   FIRST STRING
============================================================ */

function firstString(
  ...values: unknown[]
): string {
  for (const value of values) {
    const result = stringValue(value);

    if (result) {
      return result;
    }
  }

  return "";
}

/* ============================================================
   FIRST NUMBER
============================================================ */

function firstNumber(
  fallback: number,
  ...values: unknown[]
): number {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      const result = Number(value);

      if (Number.isFinite(result)) {
        return result;
      }
    }
  }

  return fallback;
}

/* ============================================================
   HTML ESCAPE
============================================================ */

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ============================================================
   CURRENCY
============================================================ */

function formatCurrency(
  value: unknown
): string {
  const amount = Number(value);

  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return "₹0";
  }

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

/* ============================================================
   EMAIL VALIDATION
============================================================ */

function isValidEmail(
  email: string
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

/* ============================================================
   EMAIL LIST
============================================================ */

function parseEmailList(
  value?: string
): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((email) => email.trim())
    .filter(
      (email) =>
        email.length > 0 &&
        isValidEmail(email)
    );
}

/* ============================================================
   SUBJECT CLEAN
============================================================ */

function cleanEmailSubject(
  value: unknown
): string {
  return String(value ?? "")
    .replace(/[\r\n]/g, " ")
    .trim()
    .slice(0, 100);
}

/* ============================================================
   LENGTH
============================================================ */

function validateLength(
  value: string,
  max: number
): boolean {
  return value.length <= max;
}

/* ============================================================
   FALLBACK BOOKING ID
============================================================ */

function generateBookingId(): string {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  const hours = String(
    now.getHours()
  ).padStart(2, "0");

  const minutes = String(
    now.getMinutes()
  ).padStart(2, "0");

  const seconds = String(
    now.getSeconds()
  ).padStart(2, "0");

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `SBS-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
}

/* ============================================================
   BOOKING DATE
============================================================ */

function formatBookingDate(): string {
  return new Date().toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* ============================================================
   PAYMENT LABEL
============================================================ */

function paymentLabel(
  value: unknown
): string {
  const payment = stringValue(value);

  return payment || "Not selected";
}

/* ============================================================
   DETAIL ROW
============================================================ */

function detailRow(
  label: string,
  value: unknown,
  options?: {
    highlight?: boolean;
    currency?: boolean;
  }
): string {
  const displayValue =
    options?.currency
      ? formatCurrency(value)
      : escapeHtml(
          value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
            ? value
            : "-"
        );

  return `
<tr>
  <td
    style="
      padding:12px 16px;
      border-bottom:1px solid ${BORDER};
      font-size:14px;
      font-weight:600;
      color:#475569;
      width:38%;
      vertical-align:top;
    "
  >
    ${escapeHtml(label)}
  </td>

  <td
    style="
      padding:12px 16px;
      border-bottom:1px solid ${BORDER};
      font-size:14px;
      font-weight:${
        options?.highlight ? "700" : "500"
      };
      color:${
        options?.highlight
          ? BRAND_BLUE
          : TEXT_DARK
      };
      vertical-align:top;
      word-break:break-word;
    "
  >
    ${displayValue}
  </td>
</tr>
`;
}

/* ============================================================
   EMAIL HEADER
============================================================ */

function emailHeader(
  title: string,
  bookingId: string
): string {
  return `
<tr>
  <td
    class="email-header"
    style="
      background:${BRAND_BLUE};
      padding:30px 25px;
      text-align:center;
    "
  >
    <div
      class="email-header-logo"
      style="
        font-family:Arial,Helvetica,sans-serif;
        font-size:32px;
        line-height:1;
        font-weight:800;
        color:#ffffff;
      "
    >
      SBS
      <span style="color:${BRAND_YELLOW};">
        TAXI
      </span>
    </div>

    <div
      style="
        margin-top:10px;
        font-size:14px;
        line-height:1.5;
        color:#dbeafe;
        font-weight:500;
      "
    >
      One Brand. One Fare. One Trusted Service.
    </div>

    <div
      style="
        display:inline-block;
        margin-top:18px;
        padding:9px 18px;
        border-radius:30px;
        background:#ffffff;
        color:${BRAND_BLUE};
        font-size:13px;
        font-weight:700;
      "
    >
      ${escapeHtml(title)}
    </div>

    <div
      style="
        margin-top:10px;
        font-size:12px;
        color:#dbeafe;
      "
    >
      Booking ID:
      ${escapeHtml(bookingId)}
    </div>
  </td>
</tr>
`;
}

/* ============================================================
   EMAIL FOOTER
============================================================ */

function emailFooter(): string {
  return `
<tr>
  <td
    class="email-footer"
    style="
      padding:28px 25px;
      background:#f8fafc;
      border-top:1px solid ${BORDER};
      text-align:center;
    "
  >
    <div
      style="
        font-size:18px;
        font-weight:800;
        color:${BRAND_BLUE};
      "
    >
      SBS
      <span style="color:${BRAND_YELLOW};">
        TAXI
      </span>
    </div>

    <div
      style="
        margin-top:6px;
        font-size:12px;
        color:${TEXT_MUTED};
      "
    >
      One Brand. One Fare. One Trusted Service.
    </div>

    <table
      align="center"
      cellpadding="0"
      cellspacing="0"
      style="margin:16px auto 0;"
    >
      <tr>
        <td
          style="
            vertical-align:middle;
            padding-right:8px;
          "
        >
          <img
            src="cid:india-flag@sbstaxi"
            width="24"
            height="16"
            alt="India"
            style="
              display:block;
              width:24px;
              height:16px;
              border:0;
            "
          />
        </td>

        <td
          style="
            vertical-align:middle;
            font-size:13px;
            font-weight:600;
            color:#0f172a;
          "
        >
          Made in India
        </td>
      </tr>
    </table>

    <div
      style="
        margin-top:12px;
        font-size:12px;
        color:#475569;
      "
    >
      Powered by
      <a
        href="https://sbstechnologies.in"
        target="_blank"
        rel="noopener noreferrer"
        style="
          color:${BRAND_BLUE};
          font-weight:700;
          text-decoration:none;
        "
      >
        SBS Technologies
      </a>
    </div>

    <div
      style="
        margin-top:12px;
        font-size:11px;
        line-height:1.5;
        color:#94a3b8;
      "
    >
      This is an automated email from the SBS Taxi website.
    </div>
  </td>
</tr>
`;
}

/* ============================================================
   WRAP EMAIL
============================================================ */

function wrapEmail(
  content: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>SBS Taxi</title>

<style>
@media only screen and (max-width:600px) {

  .email-outer {
    padding:10px 6px !important;
  }

  .email-container {
    width:100% !important;
    max-width:100% !important;
    border-radius:12px !important;
  }

  .email-content {
    padding:18px !important;
  }

  .email-header {
    padding:22px 15px !important;
  }

  .email-header-logo {
    font-size:27px !important;
  }

  .email-section-title {
    font-size:17px !important;
  }
}

@media only screen and (max-width:400px) {

  .email-outer {
    padding:6px 3px !important;
  }

  .email-content {
    padding:14px !important;
  }
}
</style>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#eef4f9;
    font-family:Arial,Helvetica,sans-serif;
    color:${TEXT_DARK};
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  class="email-outer"
  style="
    width:100%;
    background:#eef4f9;
    padding:30px 10px;
  "
>
<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  class="email-container"
  style="
    width:100%;
    max-width:760px;
    background:#ffffff;
    border:1px solid #dbe5ef;
    border-radius:18px;
    overflow:hidden;
  "
>

${content}

${emailFooter()}

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

/* ============================================================
   CANCEL BOOKING
============================================================ */

function cancelBookingSection(
  bookingId: string,
  rideId: string
): string {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");

  const cancelBookingUrl =
    `${siteUrl}/booking/cancel?booking_id=${encodeURIComponent(
      bookingId
    )}${
      rideId
        ? `&ride_id=${encodeURIComponent(
            rideId
          )}`
        : ""
    }`;

  return `
<div
  style="
    margin-top:24px;
    padding:22px;
    background:#fff7ed;
    border:1px solid #fed7aa;
    border-radius:14px;
    text-align:center;
  "
>

  <div
    style="
      font-size:18px;
      font-weight:800;
      color:#9a3412;
    "
  >
    Need to cancel your booking?
  </div>

  <div
    style="
      margin-top:8px;
      font-size:13px;
      line-height:1.6;
      color:#7c2d12;
    "
  >
    If you no longer need this ride,
    you can request cancellation below.
  </div>

  <div style="margin-top:18px;">

    <a
      href="${escapeHtml(cancelBookingUrl)}"
      target="_blank"
      style="
        display:inline-block;
        padding:14px 28px;
        background:#dc2626;
        color:#ffffff;
        text-decoration:none;
        border-radius:10px;
        font-size:14px;
        font-weight:800;
      "
    >
      Cancel Booking
    </a>

  </div>

  <div
    style="
      margin-top:12px;
      font-size:11px;
      color:#9a3412;
    "
  >
    Booking ID:
    ${escapeHtml(bookingId)}
  </div>

  ${
    rideId
      ? `
  <div
    style="
      margin-top:4px;
      font-size:11px;
      color:#9a3412;
    "
  >
    Ride ID:
    ${escapeHtml(rideId)}
  </div>
  `
      : ""
  }

</div>
`;
}

/* ============================================================
   RIDE OTP
============================================================ */

function rideOtpSection(
  rideOtp: string
): string {
  if (!rideOtp) {
    return `
<div
  style="
    margin-top:28px;
    padding:20px;
    background:#fff7ed;
    border:1px solid #fed7aa;
    border-radius:14px;
    text-align:center;
  "
>
  <div
    style="
      font-size:13px;
      color:#9a3412;
      font-weight:700;
    "
  >
    Ride OTP
  </div>

  <div
    style="
      margin-top:6px;
      font-size:14px;
      color:#c2410c;
    "
  >
    OTP not available
  </div>
</div>
`;
  }

  return `
<div
  style="
    margin-top:28px;
    padding:24px;
    background:#fff9e8;
    border:2px solid ${BRAND_YELLOW};
    border-radius:16px;
    text-align:center;
  "
>

  <div
    style="
      font-size:12px;
      font-weight:800;
      text-transform:uppercase;
      letter-spacing:1px;
      color:#7c5b08;
    "
  >
    Ride OTP
  </div>

  <div
    style="
      margin-top:8px;
      font-size:36px;
      letter-spacing:8px;
      font-weight:900;
      color:${BRAND_BLUE};
    "
  >
    ${escapeHtml(rideOtp)}
  </div>

  <div
    style="
      margin-top:8px;
      font-size:12px;
      line-height:1.6;
      color:#7c5b08;
    "
  >
    Please share this OTP with your driver
    when your ride starts.
  </div>

</div>
`;
}

/* ============================================================
   POST
============================================================ */

export async function POST(
  request: Request
) {
  try {
    /* ========================================================
       READ BODY
    ======================================================== */

    let body: TaxiBookingBody;

    try {
      body =
        (await request.json()) as TaxiBookingBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request.",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "================================================"
    );

    console.log(
      "SBS TAXI EMAIL REQUEST"
    );

    console.log(
      JSON.stringify(body, null, 2)
    );

    console.log(
      "================================================"
    );

    /* ========================================================
       SMTP
    ======================================================== */

    const smtpHost =
      process.env.SMTP_HOST;

    const smtpPort = Number(
      process.env.SMTP_PORT || 587
    );

    const smtpSecure =
      process.env.SMTP_SECURE === "true";

    const smtpUser =
      process.env.SMTP_USER;

    const smtpPassword =
      process.env.SMTP_PASSWORD;

    const contactEmail =
      process.env.CONTACT_EMAIL;

    const contactCC =
      process.env.CONTACT_CC;

    const toEmails =
      parseEmailList(contactEmail);

    const ccEmails =
      parseEmailList(contactCC);

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword
    ) {
      console.error(
        "SMTP configuration missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "SMTP server is not configured correctly.",
        },
        {
          status: 500,
        }
      );
    }

    if (toEmails.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "CONTACT_EMAIL is not configured correctly.",
        },
        {
          status: 500,
        }
      );
    }

    /* ========================================================
       TRANSPORTER
    ======================================================== */

    const transporter =
      nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });

    await transporter.verify();

    /* ========================================================
       FLAG
    ======================================================== */

    const indiaFlagPath =
      path.join(
        process.cwd(),
        "public",
        "flag.jpg"
      );

    /* ========================================================
       COMMON MAIL
    ======================================================== */

    const commonMailOptions = {
      from: `"SBS Taxi Website" <${smtpUser}>`,
      to: toEmails,
      cc:
        ccEmails.length > 0
          ? ccEmails
          : undefined,
    };

    /* ========================================================
       BOOKING TYPE
    ======================================================== */

    const bookingType =
      firstString(
        body.bookingType,
        body.booking_type,
        "passenger-ride"
      );

    /* ========================================================
       NESTED DATA
    ======================================================== */

    const apiData =
      body.data;

    const deepData =
      apiData?.data;

    const passengerData =
      body.passenger ||
      body.passenger_details ||
      body.passengerDetails ||
      apiData?.passenger ||
      apiData?.passenger_details ||
      apiData?.passengerDetails ||
      deepData?.passenger ||
      deepData?.passenger_details ||
      deepData?.passengerDetails;

    /* ========================================================
       RIDE ID
    ======================================================== */

    const rideId =
      firstString(
        body.ride_id,
        body.rideId,

        apiData?.ride_id,
        apiData?.rideId,

        deepData?.ride_id,
        deepData?.rideId
      );

    /* ========================================================
       BOOKING ID
    ======================================================== */

    const apiBookingId =
      firstString(
        body.booking_id,
        body.bookingId,
        body.booking_number,
        body.bookingNumber,

        apiData?.booking_id,
        apiData?.bookingId,
        apiData?.booking_number,
        apiData?.bookingNumber,

        deepData?.booking_id,
        deepData?.bookingId,
        deepData?.booking_number,
        deepData?.bookingNumber
      );

    const bookingId =
      apiBookingId ||
      generateBookingId();

    /* ========================================================
       ⭐ RIDE OTP
    ======================================================== */

    const rideOtp =
      firstString(
        /* Direct body */
        body.ride_otp,
        body.rideOtp,
        body.booking_otp,
        body.bookingOtp,
        body.otp,

        /* Nested API */
        apiData?.ride_otp,
        apiData?.rideOtp,
        apiData?.booking_otp,
        apiData?.bookingOtp,
        apiData?.otp,

        /* Deep nested */
        deepData?.ride_otp,
        deepData?.rideOtp,
        deepData?.booking_otp,
        deepData?.bookingOtp,
        deepData?.otp
      );

    console.log(
      "================================================"
    );

    console.log(
      "SBS RIDE OTP:",
      rideOtp || "NOT AVAILABLE"
    );

    /* ========================================================
       ⭐ PASSENGER DETAILS
    ======================================================== */

    const passengerName =
      firstString(
        body.passengerName,
        body.passenger_name,
        body.name,

        passengerData?.passengerName,
        passengerData?.passenger_name,
        passengerData?.name,

        apiData?.passengerName,
        apiData?.passenger_name,
        apiData?.name,

        deepData?.passengerName,
        deepData?.passenger_name,
        deepData?.name
      );

    const email =
      firstString(
        body.email,
        passengerData?.email,
        apiData?.email,
        deepData?.email
      );

    const phone =
      firstString(
        body.phone,
        passengerData?.phone,
        apiData?.phone,
        deepData?.phone
      );

    /* ========================================================
       PASSENGER COUNT
    ======================================================== */

    const people =
      firstNumber(
        1,

        body.people,
        body.passengers,
        body.passengerCount,
        body.passenger_count,

        passengerData?.people,
        passengerData?.passengers,
        passengerData?.passengerCount,
        passengerData?.passenger_count,

        apiData?.people,
        apiData?.passengers,
        apiData?.passengerCount,
        apiData?.passenger_count,

        deepData?.people,
        deepData?.passengers,
        deepData?.passengerCount,
        deepData?.passenger_count
      );

    /* ========================================================
       BABIES
    ======================================================== */

    const babies =
      firstNumber(
        0,

        body.babies,
        body.baby,
        body.babyCount,
        body.baby_count,

        passengerData?.babies,
        passengerData?.baby,
        passengerData?.babyCount,
        passengerData?.baby_count,

        apiData?.babies,
        apiData?.baby,
        apiData?.babyCount,
        apiData?.baby_count,

        deepData?.babies,
        deepData?.baby,
        deepData?.babyCount,
        deepData?.baby_count
      );

    /* ========================================================
       ELDERLY
    ======================================================== */

    const elderly =
      firstNumber(
        0,

        body.elderly,
        body.elders,
        body.elder,
        body.elderCount,
        body.elder_count,

        passengerData?.elderly,
        passengerData?.elders,
        passengerData?.elder,
        passengerData?.elderCount,
        passengerData?.elder_count,

        apiData?.elderly,
        apiData?.elders,
        apiData?.elder,
        apiData?.elderCount,
        apiData?.elder_count,

        deepData?.elderly,
        deepData?.elders,
        deepData?.elder,
        deepData?.elderCount,
        deepData?.elder_count
      );

    console.log(
      "SBS PASSENGER DETAILS:",
      {
        passengerName,
        email,
        phone,
        people,
        babies,
        elderly,
      }
    );

    /* ========================================================
       LOCATIONS
    ======================================================== */

    const pickup =
      firstString(
        body.pickup,
        body.pickup_address,

        apiData?.pickup,
        apiData?.pickup_address,

        deepData?.pickup,
        deepData?.pickup_address
      );

    const drop =
      firstString(
        body.drop,
        body.drop_address,

        apiData?.drop,
        apiData?.drop_address,

        deepData?.drop,
        deepData?.drop_address
      );

    /* ========================================================
       DATE
    ======================================================== */

    const pickupDate =
      firstString(
        body.pickupDate,
        body.pickup_date,
        body.date,

        apiData?.pickupDate,
        apiData?.pickup_date,
        apiData?.date,

        deepData?.pickupDate,
        deepData?.pickup_date,
        deepData?.date,

        "-"
      );

    /* ========================================================
       TIME
    ======================================================== */

    const pickupTime =
      firstString(
        body.pickupTime,
        body.pickup_time,
        body.time,

        apiData?.pickupTime,
        apiData?.pickup_time,
        apiData?.time,

        deepData?.pickupTime,
        deepData?.pickup_time,
        deepData?.time,

        "-"
      );

    /* ========================================================
       ⭐ TRIP TYPE
    ======================================================== */

    const tripType =
      firstString(
        body.tripType,
        body.trip_type,

        apiData?.tripType,
        apiData?.trip_type,

        deepData?.tripType,
        deepData?.trip_type,

        body.isRoundTrip === true
          ? "Round Trip"
          : "",

        body.isRoundTrip === false
          ? "One Way"
          : "",

        "One Way"
      );

    /* ========================================================
       ROUND TRIP
    ======================================================== */

    const isRoundTrip =
      body.isRoundTrip ??
      body.is_round_trip ??
      apiData?.isRoundTrip ??
      apiData?.is_round_trip ??
      deepData?.isRoundTrip ??
      deepData?.is_round_trip ??
      tripType
        .toLowerCase()
        .includes("round");

    /* ========================================================
       VEHICLE
    ======================================================== */

    const vehicleType =
      firstString(
        body.vehicleType,
        body.vehicle_type,

        apiData?.vehicleType,
        apiData?.vehicle_type,

        deepData?.vehicleType,
        deepData?.vehicle_type,

        "-"
      );

    const vehicle =
      firstString(
        body.vehicle,
        body.vehicleModel,
        body.vehicle_model,
        body.model,

        apiData?.vehicle,
        apiData?.vehicleModel,
        apiData?.vehicle_model,
        apiData?.model,

        deepData?.vehicle,
        deepData?.vehicleModel,
        deepData?.vehicle_model,
        deepData?.model
      );

    const vehicleTypeId =
      firstNumber(
        0,

        body.vehicleTypeId,
        body.vehicle_type_id,

        apiData?.vehicleTypeId,
        apiData?.vehicle_type_id,

        deepData?.vehicleTypeId,
        deepData?.vehicle_type_id
      );

    const seats =
      firstString(
        body.seats,
        apiData?.seats,
        deepData?.seats,
        "-"
      );

    /* ========================================================
       FARE
    ======================================================== */

    const estimatedFare =
      firstNumber(
        0,

        body.estimatedFare,
        body.estimated_fare,
        body.price,

        apiData?.estimatedFare,
        apiData?.estimated_fare,
        apiData?.price,

        deepData?.estimatedFare,
        deepData?.estimated_fare,
        deepData?.price
      );

    const distanceKm =
      firstNumber(
        0,

        body.distanceKm,
        body.distance_km,

        apiData?.distanceKm,
        apiData?.distance_km,

        deepData?.distanceKm,
        deepData?.distance_km
      );

    const durationMinutes =
      firstNumber(
        0,

        body.durationMinutes,
        body.duration_minutes,

        apiData?.durationMinutes,
        apiData?.duration_minutes,

        deepData?.durationMinutes,
        deepData?.duration_minutes
      );

    /* ========================================================
       PAYMENT
    ======================================================== */

    const paymentMethod =
      paymentLabel(
        firstString(
          body.paymentMethod,
          body.payment_method,

          apiData?.paymentMethod,
          apiData?.payment_method,

          deepData?.paymentMethod,
          deepData?.payment_method
        )
      );

    const paymentStatus =
      firstString(
        body.paymentStatus,
        body.payment_status,

        apiData?.paymentStatus,
        apiData?.payment_status,

        deepData?.paymentStatus,
        deepData?.payment_status,

        "pending"
      );

    /* ========================================================
       RIDE STATUS
    ======================================================== */

    const rideStatus =
      firstString(
        body.rideStatus,
        body.ride_status,
        body.status,

        apiData?.rideStatus,
        apiData?.ride_status,
        apiData?.status,

        deepData?.rideStatus,
        deepData?.ride_status,
        deepData?.status,

        "requested"
      );

    /* ========================================================
       PREFERENCES
    ======================================================== */

    const preferences =
      Array.isArray(body.preferences)
        ? body.preferences
            .map((item) =>
              stringValue(item)
            )
            .filter(Boolean)
        : Array.isArray(
            apiData?.preferences
          )
        ? apiData.preferences
            .map((item) =>
              stringValue(item)
            )
            .filter(Boolean)
        : [];

    const preferenceText =
      preferences
        .map((item) =>
          escapeHtml(item)
        )
        .join(", ");

    const hasPreferences =
      preferenceText.length > 0;

    /* ========================================================
       DEBUG SUMMARY
    ======================================================== */

    console.log(
      "================================================"
    );

    console.log(
      "SBS FINAL BOOKING DATA"
    );

    console.log({
      bookingType,
      bookingId,
      rideId,
      rideOtp,

      passengerName,
      email,
      phone,

      passengers: people,
      babies,
      elderly,

      pickup,
      drop,
      pickupDate,
      pickupTime,

      tripType,
      isRoundTrip,

      vehicleType,
      vehicle,
      vehicleTypeId,
      seats,

      estimatedFare,
      distanceKm,
      durationMinutes,

      paymentMethod,
      paymentStatus,
      rideStatus,
    });

    console.log(
      "================================================"
    );

    /* ========================================================
       SITE URL
    ======================================================== */

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
    ).replace(/\/$/, "");

    /* ========================================================
       CANCEL URL
    ======================================================== */

    const cancelBookingUrl =
      `${siteUrl}/booking/cancel?booking_id=${encodeURIComponent(
        bookingId
      )}${
        rideId
          ? `&ride_id=${encodeURIComponent(
              rideId
            )}`
          : ""
      }`;

    /* ========================================================
       BOOKING DATE
    ======================================================== */

    const bookingDate =
      formatBookingDate();

    /* ========================================================
       VALIDATION
    ======================================================== */

    if (!pickup || !drop) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Pickup and drop locations are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      passengerName &&
      !validateLength(
        passengerName,
        MAX_NAME_LENGTH
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Passenger name is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      phone &&
      !validateLength(
        phone,
        MAX_PHONE_LENGTH
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Phone number is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      email &&
      !isValidEmail(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid passenger email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      email &&
      !validateLength(
        email,
        MAX_EMAIL_LENGTH
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email address is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !validateLength(
        pickup,
        MAX_LOCATION_LENGTH
      ) ||
      !validateLength(
        drop,
        MAX_LOCATION_LENGTH
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Location information is too long.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       SEND RIDE EMAIL
    ======================================================== */

    await transporter.sendMail({
      ...commonMailOptions,

      attachments: [
        {
          filename: "flag.jpg",
          path: indiaFlagPath,
          cid: "india-flag@sbstaxi",
        },
      ],

      ...(email
        ? {
            replyTo: email,
          }
        : {}),

      subject:
        `SBS Taxi Ride Booking - ${cleanEmailSubject(
          bookingId
        )}`,

      html: wrapEmail(`
${emailHeader(
  "RIDE BOOKING CONFIRMED",
  bookingId
)}

<tr>
<td
  class="email-content"
  style="padding:30px;"
>

<!-- STATUS -->

<div
  style="
    padding:20px;
    background:#f0fdf4;
    border:1px solid #bbf7d0;
    border-radius:14px;
    margin-bottom:24px;
  "
>

<div
  style="
    font-size:12px;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:1px;
    color:#166534;
  "
>
  Ride Status
</div>

<div
  style="
    margin-top:6px;
    font-size:22px;
    font-weight:800;
    color:#166534;
    text-transform:capitalize;
  "
>
  ${escapeHtml(rideStatus)}
</div>

</div>

<!-- BOOKING REFERENCE -->

<h2
  class="email-section-title"
  style="
    margin:0 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Booking Reference
</h2>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border:1px solid #e2e8f0;
    border-radius:14px;
    border-collapse:separate;
    overflow:hidden;
  "
>

${detailRow(
  "Booking Number",
  bookingId,
  {
    highlight: true,
  }
)}

${
  rideId
    ? detailRow(
        "Ride ID",
        rideId,
        {
          highlight: true,
        }
      )
    : ""
}

${
  rideOtp
    ? detailRow(
        "Ride OTP",
        rideOtp,
        {
          highlight: true,
        }
      )
    : ""
}

${detailRow(
  "Booking Date",
  bookingDate
)}

${detailRow(
  "Ride Status",
  rideStatus
)}

</table>

<!-- TRIP -->

<h2
  class="email-section-title"
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Trip Details
</h2>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border:1px solid #e2e8f0;
    border-radius:14px;
    border-collapse:separate;
    overflow:hidden;
  "
>

${detailRow(
  "Pickup Location",
  pickup,
  {
    highlight: true,
  }
)}

${detailRow(
  "Drop Location",
  drop,
  {
    highlight: true,
  }
)}

${detailRow(
  "Pickup Date",
  pickupDate
)}

${detailRow(
  "Pickup Time",
  pickupTime
)}

${detailRow(
  "Trip Type",
  tripType,
  {
    highlight: true,
  }
)}

${detailRow(
  "Round Trip",
  isRoundTrip
    ? "Yes"
    : "No"
)}

</table>

<!-- PASSENGER -->

<h2
  class="email-section-title"
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Passenger Details
</h2>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border:1px solid #e2e8f0;
    border-radius:14px;
    border-collapse:separate;
    overflow:hidden;
  "
>

${detailRow(
  "Passenger Name",
  passengerName || "-"
)}

${detailRow(
  "Email",
  email || "-"
)}

${detailRow(
  "Phone",
  phone || "-"
)}

${detailRow(
  "Passengers",
  people
)}

${detailRow(
  "Babies",
  babies
)}

${detailRow(
  "Elderly",
  elderly
)}

</table>

<!-- VEHICLE -->

<h2
  class="email-section-title"
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Vehicle Details
</h2>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border:1px solid #e2e8f0;
    border-radius:14px;
    border-collapse:separate;
    overflow:hidden;
  "
>

${detailRow(
  "Vehicle Type",
  vehicleType,
  {
    highlight: true,
  }
)}

${
  vehicle
    ? detailRow(
        "Vehicle",
        vehicle
      )
    : ""
}

${detailRow(
  "Seats",
  seats
)}

${
  vehicleTypeId > 0
    ? detailRow(
        "Vehicle Type ID",
        vehicleTypeId
      )
    : ""
}

</table>

<!-- JOURNEY -->

<h2
  class="email-section-title"
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Journey Estimate
</h2>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border:1px solid #e2e8f0;
    border-radius:14px;
    border-collapse:separate;
    overflow:hidden;
  "
>

${detailRow(
  "Distance",
  distanceKm > 0
    ? `${distanceKm.toFixed(2)} km`
    : "-"
)}

${detailRow(
  "Duration",
  durationMinutes > 0
    ? `${durationMinutes} minutes`
    : "-"
)}

</table>

<!-- FARE -->

<h2
  class="email-section-title"
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Fare Estimate
</h2>

<div
  style="
    padding:22px;
    background:#f8fbff;
    border:1px solid #cbdff4;
    border-radius:15px;
  "
>

<div
  style="
    font-size:13px;
    color:#64748b;
    font-weight:600;
  "
>
  Estimated Fare
</div>

<div
  style="
    margin-top:5px;
    font-size:30px;
    font-weight:800;
    color:${BRAND_BLUE};
  "
>
${
  estimatedFare > 0
    ? formatCurrency(
        estimatedFare
      )
    : "To be confirmed"
}
</div>

</div>

<!-- PAYMENT -->

<h2
  class="email-section-title"
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Payment Details
</h2>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border:1px solid #e2e8f0;
    border-radius:14px;
    border-collapse:separate;
    overflow:hidden;
  "
>

${detailRow(
  "Payment Method",
  paymentMethod,
  {
    highlight: true,
  }
)}

${detailRow(
  "Payment Status",
  paymentStatus
)}

</table>

<!-- RIDE OTP -->

${rideOtpSection(rideOtp)}

<!-- PREFERENCES -->

${
  hasPreferences
    ? `
<h2
  class="email-section-title"
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
  Additional Preferences
</h2>

<div
  style="
    padding:16px 18px;
    background:#f8fafc;
    border:1px solid #e2e8f0;
    border-radius:13px;
    font-size:14px;
    line-height:1.6;
    color:#475569;
  "
>
  ${preferenceText}
</div>
`
    : ""
}

<!-- SUCCESS -->

<div
  style="
    margin-top:28px;
    padding:20px;
    background:#f0fdf4;
    border:1px solid #bbf7d0;
    border-radius:13px;
  "
>

<div
  style="
    font-size:17px;
    font-weight:800;
    color:#166534;
  "
>
  ✓ Ride Request Successfully Created
</div>

<div
  style="
    margin-top:7px;
    font-size:13px;
    line-height:1.7;
    color:#166534;
  "
>
  Your ride has been successfully created in the
  SBS Taxi booking system.
</div>

</div>

<!-- CANCEL -->

${cancelBookingSection(
  bookingId,
  rideId
)}

</td>
</tr>
`),
    });

    /* ========================================================
       RESPONSE DATA
    ======================================================== */

    const responseData = {
      ride_id:
        rideId || null,

      booking_id:
        bookingId,

      booking_number:
        bookingId,

      ride_otp:
        rideOtp || null,

      otp:
        rideOtp || null,

      status:
        rideStatus,

      passenger_name:
        passengerName || null,

      passenger_email:
        email || null,

      passenger_phone:
        phone || null,

      passengers:
        people,

      babies:
        babies,

      elderly:
        elderly,

      pickup:
        pickup,

      drop:
        drop,

      pickup_date:
        pickupDate,

      pickup_time:
        pickupTime,

      trip_type:
        tripType,

      is_round_trip:
        isRoundTrip,

      vehicle_type:
        vehicleType,

      vehicle:
        vehicle || null,

      estimated_fare:
        estimatedFare,

      payment_method:
        paymentMethod,

      payment_status:
        paymentStatus,

      cancel_url:
        cancelBookingUrl,

      email_sent:
        true,
    };

    console.log(
      "================================================"
    );

    console.log(
      "SBS BOOKING EMAIL RESPONSE"
    );

    console.log(
      JSON.stringify(
        responseData,
        null,
        2
      )
    );

    console.log(
      "================================================"
    );

    return NextResponse.json(
      {
        success: true,

        message:
          "Ride booking email sent successfully.",

        data:
          responseData,
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
      "SBS TAXI EMAIL API ERROR:",
      error
    );

    console.error(
      "================================================"
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to send email. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}