import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ============================================================
   TYPES
============================================================ */

interface Destination {
  name?: string;
  location?: string;
  fare?: number | string;
  custom?: boolean;
}

interface TaxiBookingBody {
  bookingType?: string;

  /* Passenger */
  user_id?: number | string;
  passengerName?: string;
  name?: string;
  email?: string;
  phone?: string;

  people?: number | string;
  passengers?: number | string;
  babies?: number | string;
  elderly?: number | string;

  /* Ride */
  rideId?: number | string;
  ride_id?: number | string;

  bookingNumber?: string;
  booking_number?: string;

  rideStatus?: string;
  status?: string;

  /* Locations */
  pickup?: string;
  drop?: string;

  pickup_address?: string;
  drop_address?: string;

  pickupLatitude?: number | string;
  pickupLongitude?: number | string;

  dropLatitude?: number | string;
  dropLongitude?: number | string;

  /* Trip */
  tripType?: string;
  date?: string;
  pickupDate?: string;
  time?: string;
  pickupTime?: string;

  isRoundTrip?: boolean;

  /* Vehicle */
  vehicleType?: string;
  vehicle?: string;
  vehicleModel?: string;
  model?: string;
  vehicleTypeId?: number | string;
  vehicle_type_id?: number | string;

  seats?: string | number;

  /* Fare */
  price?: string | number;
  estimatedFare?: string | number;
  estimated_fare?: string | number;

  distanceKm?: number | string;
  durationMinutes?: number | string;

  /* Payment */
  paymentMethod?: string;

  preferences?: string[];

  /* Temple booking */
  destinations?: Destination[];
  days?: string | number;
  tripPackage?: string;
  baseFare?: string | number;
  totalFare?: string | number;

  /* Contact */
  subject?: string;
  message?: string;
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
   HELPERS
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
   NUMBER
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
   HTML ESCAPE
============================================================ */

function escapeHtml(
  value: unknown
): string {
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
  const number = Number(value);

  if (
    !Number.isFinite(number) ||
    number <= 0
  ) {
    return "₹0";
  }

  return `₹${number.toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  )}`;
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
  value: string | undefined
): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map(
      (email) =>
        email.trim()
    )
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
   BOOKING ID
============================================================ */

function generateBookingId(): string {
  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  const hours =
    String(
      now.getHours()
    ).padStart(2, "0");

  const minutes =
    String(
      now.getMinutes()
    ).padStart(2, "0");

  const seconds =
    String(
      now.getSeconds()
    ).padStart(2, "0");

  const random =
    Math.floor(
      1000 +
        Math.random() * 9000
    );

  return `SBS-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
}

/* ============================================================
   DATE
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
   PAYMENT
============================================================ */

function paymentLabel(
  value: unknown
): string {
  const payment =
    stringValue(value);

  if (!payment) {
    return "Not selected";
  }

  return payment;
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
      options?.highlight
        ? "700"
        : "500"
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
  style="
    background:${BRAND_BLUE};
    padding:30px 25px;
    text-align:center;
  "
>

<div
  style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:32px;
    line-height:1;
    font-weight:800;
    color:#ffffff;
  "
>
  SBS
  <span
    style="
      color:${BRAND_YELLOW};
    "
  >
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
  <span
    style="
      color:${BRAND_YELLOW};
    "
  >
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
  style="
    margin:16px auto 0;
  "
>

<tr>

<td
  style="
    vertical-align:middle;
    padding-right:8px;
  "
>

<div
  style="
    width:24px;
    height:16px;
    display:block;
    overflow:hidden;
  "
>

<div
  style="
    width:24px;
    height:5.33px;
    background:#FF9933;
  "
></div>

<div
  style="
    position:relative;
    width:24px;
    height:5.33px;
    background:#FFFFFF;
  "
>

<div
  style="
    position:absolute;
    left:50%;
    top:50%;
    width:4px;
    height:4px;
    margin-left:-2px;
    margin-top:-2px;
    border:0.7px solid #000080;
    border-radius:50%;
  "
></div>

</div>

<div
  style="
    width:24px;
    height:5.34px;
    background:#138808;
  "
></div>

</div>

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
          error:
            "Invalid JSON request.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       SMTP
    ======================================================== */

    const smtpHost =
      process.env.SMTP_HOST;

    const smtpPort =
      Number(
        process.env.SMTP_PORT || 587
      );

    const smtpSecure =
      process.env.SMTP_SECURE ===
      "true";

    const smtpUser =
      process.env.SMTP_USER;

    const smtpPassword =
      process.env.SMTP_PASSWORD;

    const contactEmail =
      process.env.CONTACT_EMAIL;

    const contactCC =
      process.env.CONTACT_CC;

    const toEmails =
      parseEmailList(
        contactEmail
      );

    const ccEmails =
      parseEmailList(
        contactCC
      );

    /* ========================================================
       SMTP VALIDATION
    ======================================================== */

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

    if (
      toEmails.length === 0
    ) {
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
       COMMON OPTIONS
    ======================================================== */

    const commonMailOptions = {
      from:
        `"SBS Taxi Website" <${smtpUser}>`,

      to: toEmails,

      cc:
        ccEmails.length > 0
          ? ccEmails
          : undefined,
    };

    /* ========================================================
       BOOKING DATA
    ======================================================== */

    const bookingType =
      stringValue(
        body.bookingType
      );

    /*
      When /api/booking receives a successful
      create.php response, it sends these values
      to this endpoint.
    */

    const rideId =
      body.rideId ??
      body.ride_id ??
      "-";

    const bookingNumber =
      stringValue(
        body.bookingNumber ??
          body.booking_number
      );

    const rideStatus =
      stringValue(
        body.rideStatus ??
          body.status,
        "requested"
      );

    /*
      If create.php gives booking_number,
      use it as the main booking reference.
      Otherwise generate a website email ID.
    */

    const bookingId =
      bookingNumber ||
      generateBookingId();

    const bookingDate =
      formatBookingDate();

    /* ========================================================
       PASSENGER
    ======================================================== */

    const passengerName =
      stringValue(
        body.passengerName ??
          body.name
      );

    const email =
      stringValue(
        body.email
      );

    const phone =
      stringValue(
        body.phone
      );

    const people =
      numberValue(
        body.people ??
          body.passengers,
        1
      );

    const babies =
      numberValue(
        body.babies,
        0
      );

    const elderly =
      numberValue(
        body.elderly,
        0
      );

    /* ========================================================
       LOCATIONS
    ======================================================== */

    const pickup =
      stringValue(
        body.pickup ??
          body.pickup_address
      );

    const drop =
      stringValue(
        body.drop ??
          body.drop_address
      );

    const pickupLatitude =
      numberValue(
        body.pickupLatitude
      );

    const pickupLongitude =
      numberValue(
        body.pickupLongitude
      );

    const dropLatitude =
      numberValue(
        body.dropLatitude
      );

    const dropLongitude =
      numberValue(
        body.dropLongitude
      );

    /* ========================================================
       DATE / TIME
    ======================================================== */

    const pickupDate =
      stringValue(
        body.pickupDate ??
          body.date,
        "-"
      );

    const pickupTime =
      stringValue(
        body.pickupTime ??
          body.time,
        "-"
      );

    const tripType =
      stringValue(
        body.tripType,
        "-"
      );

    /* ========================================================
       VEHICLE
    ======================================================== */

    const vehicleType =
      stringValue(
        body.vehicleType,
        "-"
      );

    const vehicle =
      stringValue(
        body.vehicle ??
          body.vehicleModel,
        "-"
      );

    const model =
      stringValue(
        body.model ??
          body.vehicleModel
      );

    const vehicleTypeId =
      numberValue(
        body.vehicleTypeId ??
          body.vehicle_type_id
      );

    const seats =
      body.seats ??
      "-";

    /* ========================================================
       FARE
    ======================================================== */

    const estimatedFare =
      numberValue(
        body.estimatedFare ??
          body.estimated_fare ??
          body.price,
        0
      );

    const distanceKm =
      numberValue(
        body.distanceKm
      );

    const durationMinutes =
      numberValue(
        body.durationMinutes
      );

    /* ========================================================
       PAYMENT
    ======================================================== */

    const paymentMethod =
      paymentLabel(
        body.paymentMethod
      );

    /* ========================================================
       PREFERENCES
    ======================================================== */

    const preferenceText =
      Array.isArray(
        body.preferences
      ) &&
      body.preferences.length > 0
        ? body.preferences
            .map(
              (item) =>
                escapeHtml(item)
            )
            .join(", ")
        : "None";

    /* ========================================================
       PASSENGER RIDE CREATED BY create.php
    ======================================================== */

    if (
      bookingType ===
        "passenger-ride" ||
      bookingType ===
        "create-ride" ||
      bookingType ===
        "taxi-booking"
    ) {
      /* ======================================================
         VALIDATION
      ====================================================== */

      if (
        !pickup ||
        !drop
      ) {
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

      /* ======================================================
         SEND EMAIL
      ====================================================== */

      await transporter.sendMail({
        ...commonMailOptions,

        ...(email
          ? {
              replyTo: email,
            }
          : {}),

        subject:
          `SBS Taxi Ride Confirmed - ${cleanEmailSubject(
            bookingId
          )}`,

        html: wrapEmail(`

${emailHeader(
  "RIDE BOOKING CONFIRMED",
  bookingId
)}

<tr>

<td style="padding:30px;">

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
  bookingNumber ||
    bookingId,
  {
    highlight: true,
  }
)}

${detailRow(
  "Ride ID",
  rideId,
  {
    highlight: true,
  }
)}

${detailRow(
  "Booking Date",
  bookingDate
)}

${detailRow(
  "Ride Status",
  rideStatus
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

<!-- TRIP -->

<h2
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
  tripType
)}

${detailRow(
  "Round Trip",
  body.isRoundTrip
    ? "Yes"
    : "No"
)}

</table>

<!-- COORDINATES -->

<h2
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
Location Coordinates
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
  "Pickup Latitude",
  pickupLatitude
)}

${detailRow(
  "Pickup Longitude",
  pickupLongitude
)}

${detailRow(
  "Drop Latitude",
  dropLatitude
)}

${detailRow(
  "Drop Longitude",
  dropLongitude
)}

</table>

<!-- PASSENGER -->

<h2
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
  passengerName ||
    "-"
)}

${
  email
    ? detailRow(
        "Email",
        email
      )
    : ""
}

${
  phone
    ? detailRow(
        "Phone",
        phone
      )
    : ""
}

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

${detailRow(
  "Vehicle",
  vehicle,
  {
    highlight: true,
  }
)}

${detailRow(
  "Vehicle Model",
  model || "-"
)}

${detailRow(
  "Seats",
  seats
)}

</table>

<!-- DISTANCE -->

<h2
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
    ? `${distanceKm} km`
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
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
Payment Method
</h2>

<div
  style="
    padding:17px 20px;
    background:#fff9e8;
    border:1px solid #f1d56b;
    border-radius:13px;
    color:#7c5b08;
    font-size:16px;
    font-weight:800;
  "
>
${escapeHtml(
  paymentMethod
)}
</div>

<!-- PREFERENCES -->

<h2
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

${
  bookingNumber
    ? `
<div
  style="
    margin-top:10px;
    font-size:14px;
    font-weight:700;
    color:#166534;
  "
>
Booking Number:
${escapeHtml(
  bookingNumber
)}
</div>
`
    : ""
}

</div>

</td>

</tr>

`),
      });

      return NextResponse.json(
        {
          success: true,

          message:
            "Ride booking email sent successfully.",

          data: {
            ride_id:
              rideId,

            booking_number:
              bookingNumber ||
              null,

            booking_id:
              bookingId,

            status:
              rideStatus,

            email_sent:
              true,
          },
        },
        {
          status: 200,
        }
      );
    }

    /* ========================================================
       SIMPLE BOOKING
    ======================================================== */

    if (
      bookingType ===
      "simple-booking"
    ) {
      if (
        !passengerName ||
        !pickup ||
        !drop
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Required booking fields are missing.",
          },
          {
            status: 400,
          }
        );
      }

      await transporter.sendMail({
        ...commonMailOptions,

        ...(email
          ? {
              replyTo: email,
            }
          : {}),

        subject:
          `New SBS Taxi Booking - ${cleanEmailSubject(
            passengerName
          )}`,

        html: wrapEmail(`

${emailHeader(
  "NEW RIDE BOOKING",
  bookingId
)}

<tr>

<td style="padding:30px;">

<h2
  style="
    margin:0 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
Booking Details
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
  "Booking ID",
  bookingId,
  {
    highlight: true,
  }
)}

${detailRow(
  "Customer Name",
  passengerName
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
  "Pickup",
  pickup,
  {
    highlight: true,
  }
)}

${detailRow(
  "Drop",
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
  "Vehicle",
  vehicle,
  {
    highlight: true,
  }
)}

</table>

<h2
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

</td>

</tr>

`),
      });

      return NextResponse.json({
        success: true,
        bookingId,
        estimatedFare:
          estimatedFare > 0
            ? estimatedFare
            : null,
        message:
          "Booking email sent successfully.",
      });
    }

    /* ========================================================
       CONTACT ENQUIRY
    ======================================================== */

    if (
      bookingType ===
      "contact-enquiry"
    ) {
      const name =
        stringValue(
          body.name
        );

      const subject =
        stringValue(
          body.subject
        );

      const message =
        stringValue(
          body.message
        );

      if (
        !name ||
        !email ||
        !subject
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Required enquiry fields are missing.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        !isValidEmail(email)
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid email address.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        !validateLength(
          message,
          MAX_MESSAGE_LENGTH
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Message is too long.",
          },
          {
            status: 400,
          }
        );
      }

      await transporter.sendMail({
        ...commonMailOptions,

        replyTo: email,

        subject:
          `New SBS Taxi Enquiry - ${cleanEmailSubject(
            subject
          )}`,

        html: wrapEmail(`

${emailHeader(
  "NEW CUSTOMER ENQUIRY",
  bookingId
)}

<tr>

<td style="padding:30px;">

<h2
  style="
    margin:0 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
Customer Details
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
  "Reference",
  bookingId,
  {
    highlight: true,
  }
)}

${detailRow(
  "Name",
  name
)}

${detailRow(
  "Email",
  email
)}

${detailRow(
  "Phone",
  phone || "-"
)}

</table>

<h2
  style="
    margin:28px 0 12px;
    color:${BRAND_BLUE};
    font-size:19px;
  "
>
Enquiry
</h2>

<div
  style="
    padding:18px;
    background:#f8fafc;
    border:1px solid #e2e8f0;
    border-radius:13px;
    font-size:14px;
    line-height:1.7;
    color:#475569;
  "
>
${escapeHtml(
  message || "-"
)}
</div>

</td>

</tr>

`),
      });

      return NextResponse.json({
        success: true,
        bookingId,
        message:
          "Enquiry sent successfully.",
      });
    }

    /* ========================================================
       UNKNOWN TYPE
    ======================================================== */

    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid booking type.",
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(
      "SBS TAXI EMAIL API ERROR:",
      error
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