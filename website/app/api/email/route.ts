import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

function formatCurrency(value: unknown): string {
  const number = Number(value || 0);

  return `₹${number.toLocaleString("en-IN")}`;
}

function cleanEmailSubject(value: unknown): string {
  return String(value ?? "")
    .replace(/[\r\n]/g, " ")
    .trim();
}

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
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email
        )
    );
}

/* ============================================================
   POST
============================================================ */

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
       VALIDATE SMTP
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
       VALIDATE RECIPIENT
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
       VERIFY
    ======================================================== */

    await transporter.verify();

    /* ========================================================
       COMMON OPTIONS
    ======================================================== */

    const commonMailOptions = {
      from: `"SBS Taxi Website" <${smtpUser}>`,

      to: toEmails,

      cc:
        ccEmails.length > 0
          ? ccEmails
          : undefined,
    };

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
      } = body;

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

        html: `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>SBS Taxi Booking</title>

</head>

<body
style="
margin:0;
padding:0;
background:#f1f5f9;
font-family:Arial,Helvetica,sans-serif;
"
>

<div
style="
max-width:700px;
margin:30px auto;
background:#ffffff;
border-radius:14px;
overflow:hidden;
border:1px solid #e2e8f0;
"
>

<div
style="
background:#1A365D;
color:#ffffff;
padding:25px;
text-align:center;
"
>

<h1
style="
margin:0;
font-size:28px;
"
>
SBS
<span style="color:#facc15;">
TAXI
</span>
</h1>

<p
style="
margin:8px 0 0;
font-size:14px;
"
>
New Ride Booking Request
</p>

</div>

<div style="padding:28px;">

<h2
style="
color:#1A365D;
font-size:19px;
"
>
Customer Details
</h2>

<p>
<strong>Name:</strong>
${escapeHtml(name)}
</p>

<p>
<strong>Email:</strong>
${escapeHtml(email)}
</p>

<h2
style="
color:#1A365D;
font-size:19px;
margin-top:25px;
"
>
Trip Details
</h2>

<p>
<strong>Pickup:</strong>
${escapeHtml(pickup)}
</p>

<p>
<strong>Drop:</strong>
${escapeHtml(drop)}
</p>

<p>
<strong>Date:</strong>
${escapeHtml(date)}
</p>

<p>
<strong>Time:</strong>
${escapeHtml(time)}
</p>

<p>
<strong>Vehicle:</strong>
${escapeHtml(vehicle)}
</p>

</div>

</div>

</body>

</html>
        `,
      });

      return NextResponse.json({
        success: true,
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
      } = body;

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
              temple: {
                name?: string;
                location?: string;
                fare?: number;
                custom?: boolean;
              },
              index: number
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
${escapeHtml(temple.name || "")}

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
${formatCurrency(temple.fare)}
</td>

</tr>
`
          )
          .join("");

      await transporter.sendMail({
        ...commonMailOptions,

        subject:
          "New SBS Taxi Temple Tour Booking",

        html: `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>SBS Taxi Temple Tour</title>

</head>

<body
style="
margin:0;
padding:0;
background:#f1f5f9;
font-family:Arial,Helvetica,sans-serif;
"
>

<div
style="
max-width:750px;
margin:30px auto;
background:#ffffff;
border-radius:14px;
overflow:hidden;
border:1px solid #e2e8f0;
"
>

<div
style="
background:#1A365D;
color:#ffffff;
padding:25px;
text-align:center;
"
>

<h1
style="
margin:0;
font-size:28px;
"
>
SBS
<span style="color:#facc15;">
TAXI
</span>
</h1>

<p>
New Temple Tour Booking
</p>

</div>

<div style="padding:28px;">

<h2 style="color:#1A365D;">
Trip Details
</h2>

<p>
<strong>Pickup:</strong>
${escapeHtml(pickup)}
</p>

<p>
<strong>Travel Date:</strong>
${escapeHtml(date)}
</p>

<p>
<strong>Number of Days:</strong>
${escapeHtml(days)}
</p>

<p>
<strong>Passengers:</strong>
${escapeHtml(passengers || 1)}
</p>

<p>
<strong>Vehicle:</strong>
${escapeHtml(vehicle)}
</p>

<p>
<strong>Seater:</strong>
${escapeHtml(seats || "-")}
</p>

<p>
<strong>Trip Package:</strong>
${escapeHtml(
  tripPackage || "-"
)}
</p>

<h2
style="
color:#1A365D;
margin-top:28px;
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
"
>

<thead>

<tr
style="background:#eff6ff;"
>

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

<h2
style="
color:#1A365D;
margin-top:28px;
"
>
Fare Details
</h2>

<p>
<strong>Base Fare:</strong>
${formatCurrency(baseFare)}
</p>

<div
style="
margin-top:15px;
padding:16px;
border-radius:10px;
background:#fefce8;
border:1px solid #fde68a;
font-size:18px;
"
>

<strong>Total Fare:</strong>

${formatCurrency(totalFare)}

</div>

</div>

</div>

</body>

</html>
        `,
      });

      return NextResponse.json({
        success: true,
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
      const {
        passengerName,
        people,
        babies,
        elderly,
        pickup,
        drop,
        tripType,
        date,
        time,
        isRoundTrip,
        vehicleType,
        vehicle,
        model,
        seats,
        price,
        paymentMethod,
        preferences,
      } = body;

      if (
        !passengerName ||
        !pickup ||
        !drop ||
        !date ||
        !time ||
        !vehicleType ||
        !vehicle ||
        !paymentMethod
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

      const preferenceText =
        Array.isArray(preferences) &&
        preferences.length > 0
          ? preferences
              .map((item: unknown) =>
                escapeHtml(item)
              )
              .join(", ")
          : "None";

      await transporter.sendMail({
        ...commonMailOptions,

        subject:
          `New SBS Taxi Booking - ${cleanEmailSubject(
            passengerName
          )}`,

        html: `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>SBS Taxi Booking</title>

</head>

<body
style="
margin:0;
padding:0;
background:#f1f5f9;
font-family:Arial,Helvetica,sans-serif;
color:#1e293b;
"
>

<div
style="
max-width:720px;
margin:30px auto;
background:#ffffff;
border-radius:16px;
overflow:hidden;
border:1px solid #dbeafe;
"
>

<div
style="
background:#1A365D;
padding:28px 20px;
text-align:center;
color:#ffffff;
"
>

<h1
style="
margin:0;
font-size:32px;
"
>

SBS
<span style="color:#facc15;">
TAXI
</span>

</h1>

<p>
One Brand. One Fare.
One Trusted Service.
</p>

<div
style="
margin-top:18px;
display:inline-block;
padding:9px 18px;
border-radius:30px;
background:#ffffff;
color:#1A365D;
font-weight:bold;
"
>
NEW RIDE BOOKING
</div>

</div>

<div style="padding:28px;">

<div
style="
padding:18px;
background:#f0fdf4;
border:1px solid #bbf7d0;
border-radius:12px;
margin-bottom:25px;
"
>

<div
style="
font-size:17px;
font-weight:bold;
color:#166534;
"
>
✓ New Booking Received
</div>

<p>
A new taxi booking has been submitted
from the SBS Taxi website.
</p>

</div>

<h2 style="color:#1A365D;">
Passenger Details
</h2>

<p>
<strong>Passenger Name:</strong>
${escapeHtml(passengerName)}
</p>

<p>
<strong>Total People:</strong>
${escapeHtml(people || 1)}
</p>

<p>
<strong>Babies:</strong>
${escapeHtml(babies || 0)}
</p>

<p>
<strong>Elderly People:</strong>
${escapeHtml(elderly || 0)}
</p>

<h2 style="color:#1A365D;">
Trip Details
</h2>

<p>
<strong>Pickup:</strong>
${escapeHtml(pickup)}
</p>

<p>
<strong>Drop:</strong>
${escapeHtml(drop)}
</p>

<p>
<strong>Trip Type:</strong>
${escapeHtml(tripType || "-")}
</p>

<p>
<strong>Date:</strong>
${escapeHtml(date)}
</p>

<p>
<strong>Time:</strong>
${escapeHtml(time)}
</p>

<p>
<strong>Round Trip:</strong>
${isRoundTrip ? "Yes" : "No"}
</p>

<h2 style="color:#1A365D;">
Vehicle Details
</h2>

<p>
<strong>Vehicle Type:</strong>
${escapeHtml(vehicleType)}
</p>

<p>
<strong>Vehicle:</strong>
${escapeHtml(vehicle)}
</p>

<p>
<strong>Model:</strong>
${escapeHtml(model || "-")}
</p>

<p>
<strong>Seats:</strong>
${escapeHtml(seats || "-")}
</p>

<p>
<strong>Price:</strong>
${escapeHtml(price || "-")}
</p>

<h2 style="color:#1A365D;">
Payment Method
</h2>

<div
style="
padding:15px 18px;
background:#eff6ff;
border:1px solid #bfdbfe;
border-radius:10px;
font-weight:bold;
color:#1A365D;
"
>

${escapeHtml(paymentMethod)}

</div>

<h2 style="color:#1A365D;">
Additional Preferences
</h2>

<div
style="
padding:15px 18px;
background:#f8fafc;
border:1px solid #e2e8f0;
border-radius:10px;
"
>

${preferenceText}

</div>

</div>

</div>

</body>

</html>
        `,
      });

      return NextResponse.json({
        success: true,
        message:
          "Booking request sent successfully.",
      });
    }

    /* ============================================================
       CONTACT FORM
    ============================================================ */

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
    } = body;

    /* ========================================================
       VALIDATION
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
    ======================================================== */

    const contactMessage =
      message &&
      String(message).trim()
        ? escapeHtml(message)
        : "No message provided.";

    /* ========================================================
       SEND CONTACT EMAIL
    ======================================================== */

    await transporter.sendMail({
      ...commonMailOptions,

      replyTo: email,

      subject:
        `New SBS Taxi Enquiry - ${cleanEmailSubject(
          name
        )}`,

      html: `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>SBS Taxi Booking Confirmation</title>

</head>

<body
style="
margin:0;
padding:0;
background:#eaf4fb;
font-family:Arial,Helvetica,sans-serif;
color:#111827;
"
>

<!-- ========================================================
     MAIN CONTAINER
======================================================== -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#eaf4fb;
padding:25px 10px;
"
>

<tr>

<td align="center">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
max-width:1000px;
background:#ffffff;
border:3px solid #174a91;
border-radius:25px;
overflow:hidden;
"
>

<!-- ======================================================
     HEADER
====================================================== -->

<tr>

<td
style="
padding:35px 35px 25px;
background:#eaf7ff;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td
width="48%"
style="
vertical-align:top;
"
>

<div
style="
font-size:52px;
font-weight:800;
line-height:1;
color:#123f80;
"
>
SBS
<span
style="
color:#f2b900;
"
>
TAXI
</span>
</div>

<div
style="
font-size:17px;
font-weight:bold;
margin-top:10px;
color:#111827;
"
>
One Brand. One Fare. One Trusted Service.
</div>

</td>

<td
width="52%"
align="right"
style="
vertical-align:top;
"
>

<div
style="
font-size:28px;
font-weight:bold;
color:#123f80;
"
>
Thank You for
</div>

<div
style="
font-size:28px;
font-weight:bold;
color:#174a91;
margin-top:5px;
"
>
Contacting SBS Taxi!
</div>

</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     GREETING
====================================================== -->

<tr>

<td
style="
padding:0 35px 20px;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td
style="
background:#174a91;
padding:13px 20px;
color:#ffffff;
font-size:18px;
font-weight:bold;
"
>

✉ &nbsp;
Hello
<span
style="
color:#ffd426;
"
>
${escapeHtml(name)}
</span>,

</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     INTRO
====================================================== -->

<tr>

<td
style="
padding:5px 45px 20px;
"
>

<p
style="
font-size:17px;
line-height:1.6;
margin:0;
"
>

Thank you for contacting SBS Taxi.
We are happy to assist you and provide a
safe, comfortable and reliable journey.

</p>

</td>

</tr>

<!-- ======================================================
     BENEFITS BAR
====================================================== -->

<tr>

<td
style="
padding:0 35px 25px;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border:1px solid #c7d8eb;
border-radius:15px;
"
>

<tr>

<td
width="25%"
align="center"
style="
padding:15px 5px;
font-weight:bold;
color:#123f80;
border-right:1px solid #dbe5ef;
"
>

🛡️

<br>

Safe &amp; Secure

</td>

<td
width="25%"
align="center"
style="
padding:15px 5px;
font-weight:bold;
color:#123f80;
border-right:1px solid #dbe5ef;
"
>

◷

<br>

24/7 Availability

</td>

<td
width="25%"
align="center"
style="
padding:15px 5px;
font-weight:bold;
color:#123f80;
border-right:1px solid #dbe5ef;
"
>

₹

<br>

Transparent Pricing

</td>

<td
width="25%"
align="center"
style="
padding:15px 5px;
font-weight:bold;
color:#123f80;
"
>

♙

<br>

Verified Drivers

</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     BOOKING DETAILS
====================================================== -->

<tr>

<td
style="
padding:0 35px 20px;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border:2px solid #b9d1ea;
border-radius:15px;
"
>

<tr>

<td
colspan="2"
style="
background:#1261b8;
color:#ffffff;
padding:14px 20px;
font-size:20px;
font-weight:bold;
"
>

📅 &nbsp; BOOKING DETAILS

</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
width:35%;
"
>
Booking ID
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
CONTACT-${Date.now()}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Customer Name
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
${escapeHtml(name)}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Email
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
${escapeHtml(email)}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Phone
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
${escapeHtml(phone)}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Pickup Location
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
${escapeHtml(pickup)}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Drop Location
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
${escapeHtml(drop)}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Passengers
</td>

<td
style="
padding:12px 20px;
color:#174a91;
font-weight:bold;
"
>
${escapeHtml(passengerCount)}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Vehicle Type
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
${escapeHtml(vehicleType)}
</td>

</tr>

<tr>

<td
style="
padding:12px 20px;
font-weight:bold;
"
>
Service Required
</td>

<td
style="
padding:12px 20px;
color:#174a91;
"
>
${escapeHtml(subject)}
</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     CONFIRMED + BENEFITS
====================================================== -->

<tr>

<td
style="
padding:0 35px 20px;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td
width="50%"
style="
padding-right:8px;
vertical-align:top;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#f0f9eb;
border:1px solid #75a95e;
border-radius:15px;
"
>

<tr>

<td
style="
padding:18px;
"
>

<div
style="
font-size:19px;
font-weight:bold;
color:#39862d;
"
>
✓ YOUR ENQUIRY IS RECEIVED!
</div>

<p
style="
font-size:14px;
line-height:1.5;
margin-bottom:0;
"
>
Our SBS Taxi team will review your
requirements and contact you shortly.
</p>

</td>

</tr>

</table>

</td>

<td
width="50%"
style="
padding-left:8px;
vertical-align:top;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#fff9e8;
border:1px solid #e5c65c;
border-radius:15px;
"
>

<tr>

<td
style="
padding:18px;
"
>

<div
style="
font-size:19px;
font-weight:bold;
color:#9a6511;
"
>
🎁 CUSTOMER BENEFITS
</div>

<p
style="
margin:8px 0 0;
font-size:14px;
line-height:1.7;
"
>
✓ No hidden charges<br>
✓ Transparent pricing<br>
✓ Verified drivers<br>
✓ 24/7 support
</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     HELP
====================================================== -->

<tr>

<td
style="
padding:0 35px 20px;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#eef8ff;
border:1px solid #82c1e8;
border-radius:15px;
"
>

<tr>

<td
style="
padding:20px;
"
>

<div
style="
font-size:20px;
font-weight:bold;
color:#174a91;
"
>
🎧 NEED HELP?
</div>

<p
style="
margin:7px 0 0;
font-size:15px;
line-height:1.5;
"
>
Our support team is available 24/7
to assist you with your booking and travel needs.
</p>

</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     MESSAGE
====================================================== -->

<tr>

<td
style="
padding:0 35px 20px;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border:1px solid #dbe5ef;
border-radius:15px;
"
>

<tr>

<td
style="
padding:20px;
"
>

<div
style="
font-size:19px;
font-weight:bold;
color:#174a91;
margin-bottom:10px;
"
>
Additional Message
</div>

<div
style="
padding:15px;
background:#f8fafc;
border:1px solid #e2e8f0;
border-radius:10px;
line-height:1.6;
font-size:14px;
"
>

${contactMessage}

</div>

</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     IMPORTANT NOTE
====================================================== -->

<tr>

<td
style="
padding:0 35px 20px;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#fff9e8;
border:1px solid #e7d59a;
border-radius:15px;
"
>

<tr>

<td
style="
padding:20px;
"
>

<div
style="
font-size:19px;
font-weight:bold;
color:#99651a;
margin-bottom:10px;
"
>
🔔 IMPORTANT NOTE
</div>

<ul
style="
margin:0;
padding-left:20px;
font-size:14px;
line-height:1.8;
"
>

<li>
Please be ready at the pickup location on time.
</li>

<li>
Keep your phone handy for driver communication.
</li>

<li>
You can contact our support team for assistance.
</li>

</ul>

</td>

</tr>

</table>

</td>

</tr>

<!-- ======================================================
     THANK YOU
====================================================== -->

<tr>

<td
align="center"
style="
padding:15px 35px 30px;
"
>

<div
style="
font-size:32px;
font-weight:bold;
font-style:italic;
color:#123f80;
"
>
Thank you! ♡
</div>

<p
style="
font-size:15px;
margin:8px 0;
"
>
We look forward to serving you.
</p>

<div
style="
font-size:16px;
font-weight:bold;
color:#174a91;
"
>
– Team SBS Taxi
</div>

</td>

</tr>


<!-- ======================================================
     FOOTER MESSAGE
====================================================== -->

<tr>

<td
align="center"
style="
padding:12px 35px;
"
>

<div
style="
background:#dceeff;
padding:10px;
border-radius:20px;
color:#123f80;
font-weight:bold;
font-size:13px;
"
>
Thank you for choosing SBS Taxi.
Your safety is our priority. ❤️
</div>

</td>

</tr>

<!-- ======================================================
     BOTTOM
====================================================== -->

<tr>

<td
style="
padding:15px 35px 25px;
border-top:1px solid #dbe5ef;
font-size:11px;
color:#475569;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td>
You are receiving this email because
you contacted SBS Taxi.
</td>

<td
align="right"
>
Regards,<br>
Team SBS Taxi
</td>

</tr>
<tr>


</table>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
      `,
    });

    /* ========================================================
       SUCCESS
    ======================================================== */

    return NextResponse.json({
      success: true,
      message:
        "Your enquiry has been sent successfully. Our SBS Taxi team will contact you shortly.",
    });

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