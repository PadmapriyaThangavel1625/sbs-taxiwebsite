import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ============================================================
   TYPES
============================================================ */

interface Destination {
  name?: string;
  location?: string;
  fare?: number;
  custom?: boolean;
}

interface TaxiBookingBody {
  bookingType?: string;

  passengerName?: string;
  name?: string;
  email?: string;
  phone?: string;

  people?: number | string;
  passengers?: number | string;
  babies?: number | string;
  elderly?: number | string;

  pickup?: string;
  drop?: string;

  tripType?: string;
  date?: string;
  pickupDate?: string;
  time?: string;
  pickupTime?: string;

  isRoundTrip?: boolean;

  vehicleType?: string;
  vehicle?: string;
  model?: string;
  seats?: string | number;

  price?: string | number;
  estimatedFare?: string | number;

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
   HELPERS
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

function formatCurrency(value: unknown): string {
  const number = Number(value || 0);

  if (!Number.isFinite(number) || number <= 0) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
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
   SUBJECT CLEANING
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
   EMAIL LIST
============================================================ */

function parseEmailList(
  value: string | undefined
): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((email) => email.trim())
    .filter(
      (email) =>
        email.length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
}

/* ============================================================
   BOOKING ID
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
   DATE FORMAT
============================================================ */

function formatBookingDate(): string {
  const now = new Date();

  return now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ============================================================
   PAYMENT LABEL
============================================================ */

function paymentLabel(
  value: unknown
): string {
  const payment = String(
    value ?? ""
  ).trim();

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
      : escapeHtml(value || "-");

  return `
<tr>

<td
  style="
    padding:12px 16px;
    border-bottom:1px solid #e5e7eb;
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
    border-bottom:1px solid #e5e7eb;
    font-size:14px;
    font-weight:${options?.highlight ? "700" : "500"};
    color:${options?.highlight ? "#123f80" : "#1e293b"};
    vertical-align:top;
  "
>
  ${displayValue}
</td>

</tr>
`;
}

/* ============================================================
   COMMON EMAIL HEADER
============================================================ */

function emailHeader(
  title: string,
  bookingId: string
): string {
  return `
<tr>

<td
  style="
    background:#123f80;
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
  <span style="color:#f2b900;">
    TAXI
  </span>
</div>

<div
  style="
    margin-top:10px;
    font-size:14px;
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
    color:#123f80;
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
    border-top:1px solid #e2e8f0;
    text-align:center;
  "
>

<!-- SBS TAXI -->

<div
  style="
    font-size:18px;
    font-weight:800;
    color:#123f80;
  "
>
  SBS
  <span style="color:#f2b900;">
    TAXI
  </span>
</div>

<div
  style="
    margin-top:6px;
    font-size:12px;
    color:#64748b;
  "
>
  One Brand. One Fare. One Trusted Service.
</div>

<!-- MADE IN INDIA -->

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
    border:0;
  "
>
  <!-- Saffron -->
  <div
    style="
      width:24px;
      height:5.33px;
      background:#FF9933;
    "
  ></div>

  <!-- White -->
  <div
    style="
      position:relative;
      width:24px;
      height:5.33px;
      !background:#FFFFFF;
    "
  >
    <!-- Ashoka Chakra -->
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

  <!-- Green -->
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

<!-- POWERED BY -->

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
    style="
      color:#123f80;
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
   BASE EMAIL
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
    color:#1e293b;
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
    const body: TaxiBookingBody =
      await request.json();

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

    /* ========================================================
       EMAIL
    ======================================================== */

    const contactEmail =
      process.env.CONTACT_EMAIL;

    const contactCC =
      process.env.CONTACT_CC;

    const toEmails =
      parseEmailList(contactEmail);

    const ccEmails =
      parseEmailList(contactCC);

    /* ========================================================
       SMTP VALIDATION
    ======================================================== */

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "SMTP server is not configured correctly.",
        },
        { status: 500 }
      );
    }

    /* ========================================================
       RECIPIENT VALIDATION
    ======================================================== */

    if (toEmails.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "CONTACT_EMAIL is not configured correctly.",
        },
        { status: 500 }
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

    /* ========================================================
       VERIFY SMTP
    ======================================================== */

    await transporter.verify();

    /* ========================================================
       COMMON MAIL OPTIONS
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
       BOOKING ID
    ======================================================== */

    const bookingId =
      generateBookingId();

    const bookingDate =
      formatBookingDate();

    /* ============================================================
       SIMPLE BOOKING
    ============================================================ */

    if (
      body?.bookingType ===
      "simple-booking"
    ) {
      const {
        name,
        email,
        pickup,
        drop,
        date,
        time,
        vehicle,
        paymentMethod,
        estimatedFare,
        price,
      } = body;

      const selectedPayment =
        paymentLabel(paymentMethod);

      const finalFare =
        numberValue(
          estimatedFare ?? price,
          0
        );

      if (
        !name ||
        !email ||
        !pickup ||
        !drop ||
        !date ||
        !time ||
        !vehicle
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Please fill all required booking fields.",
          },
          { status: 400 }
        );
      }

      await transporter.sendMail({
        ...commonMailOptions,

        replyTo: email,

        subject:
          `New SBS Taxi Booking - ${cleanEmailSubject(
            name
          )}`,

        html: wrapEmail(`

${emailHeader(
  "NEW RIDE BOOKING",
  bookingId
)}

<tr>

<td style="padding:30px;">

<div
  style="
    padding:18px;
    background:#eff6ff;
    border:1px solid #bfdbfe;
    border-radius:14px;
    margin-bottom:24px;
  "
>

<div
  style="
    !font-size:9px;
    font-weight:600;
    text-transform:uppercase;
    color:#64748b;
  "
>
Booking ID
</div>

<div
  style="
    margin-top:5px;
    font-size:22px;
    font-weight:800;
    color:#123f80;
  "
>
${escapeHtml(bookingId)}
</div>

</div>

<h2
  style="
    margin:0 0 12px;
    color:#123f80;
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
  { highlight: true }
)}

${detailRow(
  "Booking Date",
  bookingDate
)}

${detailRow(
  "Customer Name",
  name
)}

${detailRow(
  "Email",
  email
)}

${detailRow(
  "Pickup Location",
  pickup,
  { highlight: true }
)}

${detailRow(
  "Drop Location",
  drop,
  { highlight: true }
)}

${detailRow(
  "Pickup Date",
  date
)}

${detailRow(
  "Pickup Time",
  time
)}

${detailRow(
  "Vehicle",
  vehicle,
  { highlight: true }
)}

</table>

<h2
  style="
    margin:28px 0 12px;
    color:#123f80;
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
    color:#123f80;
  "
>
${
  finalFare > 0
    ? formatCurrency(finalFare)
    : "To be confirmed"
}
</div>

</div>

<h2
  style="
    margin:28px 0 12px;
    color:#123f80;
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
${escapeHtml(selectedPayment)}
</div>

</td>

</tr>

`),
      });

      return NextResponse.json({
        success: true,
        bookingId,
        estimatedFare:
          finalFare > 0
            ? finalFare
            : null,
        message:
          "Booking request sent successfully.",
      });
    }

    /* ============================================================
       TEMPLE TOUR
    ============================================================ */

    if (
      body?.bookingType ===
      "temple-tour"
    ) {
      const {
        pickup,
        destinations,
        date,
        days,
        passengers,
        vehicle,
        seats,
        tripPackage,
        baseFare,
        totalFare,
        paymentMethod,
      } = body;

      const selectedPayment =
        paymentLabel(paymentMethod);

      if (
        !pickup ||
        !Array.isArray(destinations) ||
        destinations.length === 0 ||
        !date ||
        !days ||
        !vehicle
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Please fill all required temple booking fields.",
          },
          { status: 400 }
        );
      }

      const templeRows =
        destinations
          .map(
            (
              temple,
              index
            ) => `
<tr>

<td
  style="
    padding:10px;
    border:1px solid #dbeafe;
    text-align:center;
  "
>
${index + 1}
</td>

<td
  style="
    padding:10px;
    border:1px solid #dbeafe;
  "
>

${escapeHtml(
  temple.name || ""
)}

${
  temple.location
    ? ` - ${escapeHtml(
        temple.location
      )}`
    : ""
}

${
  temple.custom
    ? `
<span
  style="
    color:#b45309;
    font-weight:bold;
  "
>
(Custom Destination)
</span>
`
    : ""
}

</td>

<td
  style="
    padding:10px;
    border:1px solid #dbeafe;
    text-align:right;
    font-weight:bold;
  "
>
${formatCurrency(
  temple.fare
)}

</td>

</tr>
`
          )
          .join("");

      await transporter.sendMail({
        ...commonMailOptions,

        subject:
          `New SBS Temple Tour Booking - ${bookingId}`,

        html: wrapEmail(`

${emailHeader(
  "TEMPLE TOUR BOOKING",
  bookingId
)}

<tr>

<td style="padding:30px;">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border:1px solid #e2e8f0;
    border-radius:12px;
    border-collapse:separate;
  "
>

${detailRow(
  "Booking ID",
  bookingId,
  { highlight: true }
)}

${detailRow(
  "Booking Date",
  bookingDate
)}

${detailRow(
  "Pickup Location",
  pickup
)}

${detailRow(
  "Travel Date",
  date
)}

${detailRow(
  "Number of Days",
  days
)}

${detailRow(
  "Passengers",
  passengers || 1
)}

${detailRow(
  "Vehicle",
  vehicle,
  { highlight: true }
)}

${detailRow(
  "Seater",
  seats || "-"
)}

${detailRow(
  "Trip Package",
  tripPackage || "-"
)}

</table>

<h2
  style="
    margin:28px 0 12px;
    color:#123f80;
    font-size:19px;
  "
>
Selected Temples / Destinations
</h2>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    border-collapse:collapse;
    font-size:14px;
  "
>

<thead>

<tr style="background:#eff6ff;">

<th
  style="
    padding:10px;
    border:1px solid #dbeafe;
  "
>
#
</th>

<th
  style="
    padding:10px;
    border:1px solid #dbeafe;
    text-align:left;
  "
>
Temple / Destination
</th>

<th
  style="
    padding:10px;
    border:1px solid #dbeafe;
    text-align:right;
  "
>
Fare
</th>

</tr>

</thead>

<tbody>

${templeRows}

</tbody>

</table>

<div
  style="
    margin-top:22px;
    padding:18px;
    background:#fff9e8;
    border:1px solid #f3d36a;
    border-radius:12px;
  "
>

<div
  style="
    font-size:13px;
    color:#92701a;
  "
>
Base Fare
</div>

<div
  style="
    margin-top:4px;
    font-size:18px;
    font-weight:bold;
    color:#7c5b08;
  "
>
${formatCurrency(baseFare)}
</div>

<div
  style="
    margin-top:15px;
    padding-top:15px;
    border-top:1px solid #ead68d;
  "
>

<div
  style="
    font-size:13px;
    color:#92701a;
  "
>
Estimated Total Fare
</div>

<div
  style="
    margin-top:4px;
    font-size:25px;
    font-weight:800;
    color:#123f80;
  "
>
${formatCurrency(totalFare)}
</div>

</div>

</div>

<h2
  style="
    margin:28px 0 12px;
    color:#123f80;
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
${escapeHtml(selectedPayment)}
</div>

</td>

</tr>

`),
      });

      return NextResponse.json({
        success: true,
        bookingId,
        message:
          "Temple tour booking sent successfully.",
      });
    }

    /* ============================================================
       NORMAL TAXI BOOKING
    ============================================================ */

    if (
      body?.bookingType ===
      "taxi-booking"
    ) {
      const passengerName =
        body.passengerName ||
        body.name;

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

      const pickup =
        String(
          body.pickup || ""
        ).trim();

      const drop =
        String(
          body.drop || ""
        ).trim();

      const tripType =
        body.tripType || "-";

      const pickupDate =
        body.pickupDate ||
        body.date ||
        "-";

      const pickupTime =
        body.pickupTime ||
        body.time ||
        "-";

      const vehicleType =
        String(
          body.vehicleType || ""
        ).trim();

      const vehicle =
        String(
          body.vehicle || ""
        ).trim();

      const model =
        String(
          body.model || ""
        ).trim();

      const seats =
        body.seats || "-";

      const paymentMethod =
        paymentLabel(
          body.paymentMethod
        );

      /* ========================================================
         FARE
      ======================================================== */

      const estimatedFare =
        numberValue(
          body.estimatedFare ??
            body.price,
          0
        );

      /* ========================================================
         VALIDATION
      ======================================================== */

      if (
        !passengerName ||
        !pickup ||
        !drop ||
        !pickupDate ||
        !pickupTime ||
        !vehicleType ||
        !vehicle ||
        paymentMethod ===
          "Not selected"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Please fill all required booking fields.",
          },
          { status: 400 }
        );
      }

      /* ========================================================
         PASSENGER VALIDATION
      ======================================================== */

      if (
        !Number.isInteger(
          people
        ) ||
        people < 1 ||
        people > 50
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Passengers must be between 1 and 50.",
          },
          { status: 400 }
        );
      }

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
         SEND TAXI BOOKING EMAIL
      ======================================================== */

      await transporter.sendMail({
        ...commonMailOptions,

        subject:
          `New SBS Taxi Booking - ${bookingId}`,

        html: wrapEmail(`

${emailHeader(
  "NEW RIDE BOOKING",
  bookingId
)}

<tr>

<td
  style="
    padding:30px;
  "
>

<div
  style="
    padding:18px;
    background:#f0f7ff;
    border:1px solid #bfdbfe;
    border-radius:14px;
    margin-bottom:24px;
  "
>

<div
  style="
    !font-size:9px;
    font-weight:600;
    text-transform:uppercase;
    letter-spacing:1px;
    color:#64748b;
  "
>
Booking ID
</div>

<div
  style="
    margin-top:5px;
    font-size:22px;
    font-weight:800;
    color:#123f80;
    letter-spacing:.5px;
  "
>
${escapeHtml(bookingId)}
</div>

</div>

<h2
  style="
    margin:0 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
📅 Booking Details
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
  { highlight: true }
)}

${detailRow(
  "Booking Date",
  bookingDate
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

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
📍 Journey Details
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
  { highlight: true }
)}

${detailRow(
  "Drop Location",
  drop,
  { highlight: true }
)}

</table>

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
👥 Passenger Details
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
  passengerName,
  { highlight: true }
)}

${detailRow(
  "Total Passengers",
  people
)}

${detailRow(
  "Babies",
  babies
)}

${detailRow(
  "Elderly People",
  elderly
)}

</table>

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
🚕 Vehicle Details
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
  { highlight: true }
)}

${detailRow(
  "Vehicle",
  vehicle,
  { highlight: true }
)}

${detailRow(
  "Model",
  model || "-"
)}

${detailRow(
  "Seats",
  seats
)}

</table>

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
₹ Fare Estimate
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
    color:#123f80;
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

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
💳 Payment Method
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
${escapeHtml(paymentMethod)}
</div>

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
⚙ Additional Preferences
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

<div
  style="
    margin-top:28px;
    padding:18px 20px;
    background:#f0fdf4;
    border:1px solid #bbf7d0;
    border-radius:13px;
  "
>

<div
  style="
    font-size:16px;
    font-weight:800;
    color:#166534;
  "
>
✓ Booking Request Received
</div>

<div
  style="
    margin-top:6px;
    font-size:13px;
    line-height:1.6;
    color:#166534;
  "
>
Your booking request has been successfully
received by SBS Taxi. Our team will review
the details and contact you shortly.
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
          "Booking request sent successfully.",
      });
    }

    /* ============================================================
       CONTACT ENQUIRY
    ============================================================ */

    if (
      body?.bookingType ===
      "contact-enquiry"
    ) {
      const {
        name,
        phone,
        email,
        pickup,
        drop,
        passengers,
        vehicleType,
        subject,
        message,
        paymentMethod,
        estimatedFare,
      } = body;

      /* ========================================================
         REQUIRED FIELD VALIDATION
      ======================================================== */

      if (
        !name ||
        !phone ||
        !email ||
        !pickup ||
        !drop ||
        !passengers ||
        !vehicleType ||
        !subject
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Please fill all required contact fields.",
          },
          { status: 400 }
        );
      }

      /* ========================================================
         PASSENGER VALIDATION
      ======================================================== */

      const passengerCount =
        Number(passengers);

      if (
        !Number.isInteger(
          passengerCount
        ) ||
        passengerCount < 1 ||
        passengerCount > 50
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid number of passengers.",
          },
          { status: 400 }
        );
      }

      /* ========================================================
         MESSAGE
         
         Empty message:
         → Do NOT show Additional Message section.

         Message with content:
         → Show Additional Message section.
      ======================================================== */

      const hasContactMessage =
        typeof message === "string" &&
        message.trim().length > 0;

      const contactMessage =
        hasContactMessage
          ? escapeHtml(
              message.trim()
            )
          : "";

      /* ========================================================
         PAYMENT
      ======================================================== */

      const selectedPayment =
        paymentLabel(
          paymentMethod
        );

      /* ========================================================
         FARE
      ======================================================== */

      const finalFare =
        numberValue(
          estimatedFare,
          0
        );

      /* ========================================================
         SEND CONTACT ENQUIRY EMAIL
      ======================================================== */

      await transporter.sendMail({
        ...commonMailOptions,

        replyTo: email,

        subject:
          `New SBS Taxi Enquiry - ${cleanEmailSubject(
            name
          )}`,

        html: wrapEmail(`

${emailHeader(
  "NEW CUSTOMER ENQUIRY",
  bookingId
)}

<tr>

<td
  style="
    padding:30px;
  "
>

<!-- ======================================================
     BOOKING ID
====================================================== -->

<div
  style="
    padding:18px;
    background:#f0f7ff;
    border:1px solid #bfdbfe;
    border-radius:14px;
    margin-bottom:24px;
  "
>

<div
  style="
    !font-size:9px;
    font-weight:600;
    text-transform:uppercase;
    color:#64748b;
  "
>
Booking ID
</div>

<div
  style="
    margin-top:5px;
    font-size:21px;
    font-weight:800;
    color:#123f80;
  "
>
${escapeHtml(bookingId)}
</div>

</div>

<!-- ======================================================
     CUSTOMER DETAILS
====================================================== -->

<h2
  style="
    margin:0 0 12px;
    font-size:19px;
    color:#123f80;
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
  "Booking ID",
  bookingId,
  { highlight: true }
)}

${detailRow(
  "Booking Date",
  bookingDate
)}

${detailRow(
  "Name",
  name,
  { highlight: true }
)}

${detailRow(
  "Email",
  email
)}

${detailRow(
  "Phone",
  phone
)}

</table>

<!-- ======================================================
     JOURNEY DETAILS
====================================================== -->

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
Journey Details
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
  { highlight: true }
)}

${detailRow(
  "Drop Location",
  drop,
  { highlight: true }
)}

${detailRow(
  "Passengers",
  passengerCount
)}

${detailRow(
  "Vehicle Type",
  vehicleType
)}

${detailRow(
  "Service Required",
  subject,
  { highlight: true }
)}

</table>

<!-- ======================================================
     FARE ESTIMATE
====================================================== -->

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
₹ Fare Estimate
</h2>

<div
  style="
    padding:20px;
    background:#f8fbff;
    border:1px solid #cbdff4;
    border-radius:14px;
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
    font-size:28px;
    font-weight:800;
    color:#123f80;
  "
>
${
  finalFare > 0
    ? formatCurrency(finalFare)
    : "To be confirmed"
}
</div>

</div>

<!-- ======================================================
     PAYMENT METHOD
====================================================== -->

<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
💳 Payment Method
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
${escapeHtml(selectedPayment)}
</div>

<!-- ======================================================
     ADDITIONAL MESSAGE

     ONLY SHOW WHEN MESSAGE HAS CONTENT
====================================================== -->

${
  hasContactMessage
    ? `
<h2
  style="
    margin:28px 0 12px;
    font-size:19px;
    color:#123f80;
  "
>
Additional Message
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
${contactMessage}
</div>
`
    : ""
}

<!-- ======================================================
     STATUS
====================================================== -->

<div
  style="
    margin-top:25px;
    padding:18px;
    background:#f0fdf4;
    border:1px solid #bbf7d0;
    border-radius:13px;
  "
>

<div
  style="
    font-size:16px;
    font-weight:800;
    color:#166534;
  "
>
✓ Enquiry Received
</div>

<div
  style="
    margin-top:6px;
    font-size:13px;
    line-height:1.6;
    color:#166534;
  "
>
The SBS Taxi team will review this enquiry
and contact the customer shortly.
</div>

</div>

</td>

</tr>

`),
      });

      return NextResponse.json({
        success: true,
        bookingId,
        message:
          "Your enquiry has been sent successfully. Our SBS Taxi team will contact you shortly.",
      });
    }

    /* ============================================================
       UNKNOWN BOOKING TYPE
    ============================================================ */

    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid booking type.",
      },
      { status: 400 }
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
      { status: 500 }
    );
  }
}