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

/* ============================================================
   POST
============================================================ */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    /* ============================================================
       SMTP CONFIGURATION
    ============================================================ */

    const smtpHost = process.env.SMTP_HOST;

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

    /* ============================================================
       CHECK SMTP CONFIGURATION
    ============================================================ */

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !contactEmail
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email server is not configured correctly.",
        },
        { status: 500 }
      );
    }

    /* ============================================================
       CREATE SMTP TRANSPORTER
    ============================================================ */

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

      /* ==========================================================
         VALIDATION
      ========================================================== */

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

      /* ==========================================================
         SEND EMAIL
      ========================================================== */

      await transporter.sendMail({
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        replyTo: email,

        subject:
          `New SBS Taxi Booking - ${cleanEmailSubject(
            name
          )}`,

        html: `
          <!DOCTYPE html>

          <html>
            <head>
              <meta charset="UTF-8" />
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
                      letter-spacing:1px;
                    "
                  >
                    SBS <span style="color:#facc15;">TAXI</span>
                  </h1>

                  <p
                    style="
                      margin:8px 0 0;
                      font-size:14px;
                      opacity:.9;
                    "
                  >
                    New Ride Booking Request
                  </p>

                </div>

                <div style="padding:28px;">

                  <h2
                    style="
                      margin:0 0 15px;
                      color:#1A365D;
                      font-size:19px;
                    "
                  >
                    Customer Details
                  </h2>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="border-collapse:collapse;"
                  >

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#64748b;
                          width:40%;
                        "
                      >
                        Name
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          font-weight:bold;
                          color:#0f172a;
                        "
                      >
                        ${escapeHtml(name)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#64748b;
                        "
                      >
                        Email
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          font-weight:bold;
                          color:#0f172a;
                        "
                      >
                        ${escapeHtml(email)}
                      </td>
                    </tr>

                  </table>

                  <h2
                    style="
                      margin:25px 0 15px;
                      color:#1A365D;
                      font-size:19px;
                    "
                  >
                    Trip Details
                  </h2>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="border-collapse:collapse;"
                  >

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#64748b;
                          width:40%;
                        "
                      >
                        Pickup Location
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          font-weight:bold;
                          color:#0f172a;
                        "
                      >
                        ${escapeHtml(pickup)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#64748b;
                        "
                      >
                        Drop Location
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          font-weight:bold;
                          color:#0f172a;
                        "
                      >
                        ${escapeHtml(drop)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#64748b;
                        "
                      >
                        Date
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          font-weight:bold;
                          color:#0f172a;
                        "
                      >
                        ${escapeHtml(date)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#64748b;
                        "
                      >
                        Time
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          font-weight:bold;
                          color:#0f172a;
                        "
                      >
                        ${escapeHtml(time)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#64748b;
                        "
                      >
                        Vehicle
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          font-weight:bold;
                          color:#0f172a;
                        "
                      >
                        ${escapeHtml(vehicle)}
                      </td>
                    </tr>

                  </table>

                  <div
                    style="
                      margin-top:25px;
                      padding:16px;
                      border-radius:10px;
                      background:#eff6ff;
                      border:1px solid #bfdbfe;
                      color:#1A365D;
                      font-weight:bold;
                    "
                  >
                    New booking request received from the
                    SBS Taxi website.
                  </div>

                  <hr
                    style="
                      margin:25px 0;
                      border:0;
                      border-top:1px solid #e2e8f0;
                    "
                  />

                  <p
                    style="
                      margin:0;
                      color:#64748b;
                      font-size:13px;
                      line-height:1.6;
                    "
                  >
                    Please contact the customer to confirm
                    the booking.
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
       TEMPLE TOUR BOOKING
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

      /* ==========================================================
         VALIDATION
      ========================================================== */

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

      /* ==========================================================
         DESTINATION ROWS
      ========================================================== */

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

      /* ==========================================================
         SEND EMAIL
      ========================================================== */

      await transporter.sendMail({
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        subject:
          "New SBS Taxi Temple Tour Booking",

        html: `
          <!DOCTYPE html>

          <html>
            <head>
              <meta charset="UTF-8" />

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
                    SBS <span style="color:#facc15;">TAXI</span>
                  </h1>

                  <p style="margin:8px 0 0;">
                    New Temple Tour Booking
                  </p>

                </div>

                <div style="padding:28px;">

                  <h2
                    style="
                      color:#1A365D;
                      font-size:19px;
                    "
                  >
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
                    ${escapeHtml(tripPackage || "-")}
                  </p>

                  <h2
                    style="
                      color:#1A365D;
                      font-size:19px;
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
                      width:100%;
                      border-collapse:collapse;
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

                  <h2
                    style="
                      color:#1A365D;
                      font-size:19px;
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

                  <hr
                    style="
                      margin:25px 0;
                      border:0;
                      border-top:1px solid #e2e8f0;
                    "
                  />

                  <p
                    style="
                      color:#64748b;
                      font-size:13px;
                    "
                  >
                    SBS Taxi Temple Tour Booking
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

      /* ==========================================================
         VALIDATION
      ========================================================== */

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

      /* ==========================================================
         PREFERENCES
      ========================================================== */

      const preferenceText =
        Array.isArray(preferences) &&
        preferences.length > 0
          ? preferences
              .map((item: unknown) =>
                escapeHtml(item)
              )
              .join(", ")
          : "None";

      /* ==========================================================
         SEND TAXI BOOKING EMAIL
      ========================================================== */

      await transporter.sendMail({
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        subject:
          `New SBS Taxi Booking - ${cleanEmailSubject(
            passengerName
          )}`,

        html: `
          <!DOCTYPE html>

          <html>

            <head>

              <meta charset="UTF-8" />

              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />

              <title>
                SBS Taxi Booking
              </title>

            </head>

            <body
              style="
                margin:0;
                padding:0;
                background:#f1f5f9;
                font-family:
                  Arial,
                  Helvetica,
                  sans-serif;
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
                  box-shadow:
                    0 4px 15px
                    rgba(15,23,42,.08);
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
                      letter-spacing:1px;
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
                      color:#dbeafe;
                    "
                  >
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
                      font-size:14px;
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

                    <p
                      style="
                        margin:7px 0 0;
                        color:#475569;
                        font-size:13px;
                        line-height:1.5;
                      "
                    >
                      A new taxi booking has been
                      submitted from the SBS Taxi website.
                    </p>

                  </div>

                  <h2
                    style="
                      margin:0 0 15px;
                      color:#1A365D;
                      font-size:20px;
                    "
                  >
                    Passenger Details
                  </h2>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse:collapse;
                      margin-bottom:25px;
                    "
                  >

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          width:42%;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Passenger Name
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          color:#0f172a;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(passengerName)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Total People
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(people || 1)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Babies
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(babies || 0)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                        "
                      >
                        Elderly People
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                        "
                      >
                        ${escapeHtml(elderly || 0)}
                      </td>
                    </tr>

                  </table>

                  <h2
                    style="
                      margin:0 0 15px;
                      color:#1A365D;
                      font-size:20px;
                    "
                  >
                    Trip Details
                  </h2>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse:collapse;
                      margin-bottom:25px;
                    "
                  >

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          width:42%;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Pickup Location
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(pickup)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Drop Location
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(drop)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Trip Type
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(tripType || "-")}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Pickup Date
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(date)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        Pickup Time
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                          border-bottom:1px solid #f1f5f9;
                        "
                      >
                        ${escapeHtml(time)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:11px 0;
                          color:#64748b;
                        "
                      >
                        Round Trip
                      </td>

                      <td
                        style="
                          padding:11px 0;
                          font-weight:bold;
                        "
                      >
                        ${isRoundTrip ? "Yes" : "No"}
                      </td>
                    </tr>

                  </table>

                  <h2
                    style="
                      margin:0 0 15px;
                      color:#1A365D;
                      font-size:20px;
                    "
                  >
                    Vehicle Details
                  </h2>

                  <div
                    style="
                      background:#f8fafc;
                      border:1px solid #e2e8f0;
                      border-radius:12px;
                      padding:5px 18px;
                      margin-bottom:25px;
                    "
                  >

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="border-collapse:collapse;"
                    >

                      <tr>
                        <td
                          style="
                            padding:12px 0;
                            color:#64748b;
                            width:42%;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          Vehicle Type
                        </td>

                        <td
                          style="
                            padding:12px 0;
                            font-weight:bold;
                            color:#1A365D;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          ${escapeHtml(vehicleType)}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:12px 0;
                            color:#64748b;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          Vehicle
                        </td>

                        <td
                          style="
                            padding:12px 0;
                            font-weight:bold;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          ${escapeHtml(vehicle)}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:12px 0;
                            color:#64748b;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          Model
                        </td>

                        <td
                          style="
                            padding:12px 0;
                            font-weight:bold;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          ${escapeHtml(model || "-")}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:12px 0;
                            color:#64748b;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          Seats
                        </td>

                        <td
                          style="
                            padding:12px 0;
                            font-weight:bold;
                            border-bottom:1px solid #e2e8f0;
                          "
                        >
                          ${escapeHtml(seats || "-")}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:12px 0;
                            color:#64748b;
                          "
                        >
                          Price
                        </td>

                        <td
                          style="
                            padding:12px 0;
                            font-weight:bold;
                            color:#166534;
                          "
                        >
                          ${escapeHtml(price || "-")}
                        </td>
                      </tr>

                    </table>

                  </div>

                  <h2
                    style="
                      margin:0 0 15px;
                      color:#1A365D;
                      font-size:20px;
                    "
                  >
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
                      margin-bottom:25px;
                    "
                  >
                    ${escapeHtml(paymentMethod)}
                  </div>

                  <h2
                    style="
                      margin:0 0 15px;
                      color:#1A365D;
                      font-size:20px;
                    "
                  >
                    Additional Preferences
                  </h2>

                  <div
                    style="
                      padding:15px 18px;
                      background:#f8fafc;
                      border:1px solid #e2e8f0;
                      border-radius:10px;
                      margin-bottom:25px;
                      line-height:1.6;
                    "
                  >
                    ${preferenceText}
                  </div>

                  <div
                    style="
                      padding:18px;
                      background:#fff7ed;
                      border:1px solid #fed7aa;
                      border-radius:10px;
                    "
                  >

                    <strong style="color:#9a3412;">
                      Action Required
                    </strong>

                    <p
                      style="
                        margin:7px 0 0;
                        color:#7c2d12;
                        font-size:13px;
                        line-height:1.6;
                      "
                    >
                      Please review the booking details
                      and contact the customer to confirm
                      the ride.
                    </p>

                  </div>

                </div>

                <div
                  style="
                    background:#f8fafc;
                    border-top:1px solid #e2e8f0;
                    padding:22px;
                    text-align:center;
                  "
                >

                  <div
                    style="
                      font-size:20px;
                      font-weight:bold;
                      color:#1A365D;
                    "
                  >
                    SBS
                    <span style="color:#facc15;">
                      TAXI
                    </span>
                  </div>

                  <p
                    style="
                      margin:7px 0;
                      color:#64748b;
                      font-size:13px;
                    "
                  >
                    One Brand. One Fare.
                    One Trusted Service.
                  </p>

                  <p
                    style="
                      margin:12px 0 0;
                      color:#94a3b8;
                      font-size:11px;
                    "
                  >
                    This email was generated automatically
                    from the SBS Taxi website.
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
       CONTACT FORM
       MESSAGE IS OPTIONAL
    ============================================================ */

    const {
      name,
      phone,
      email,
      pickup,
      drop,
      subject,
      message,
    } = body;

    /* ==========================================================
       VALIDATION

       REQUIRED:
       - Name
       - Phone
       - Email
       - Pickup
       - Drop
       - Subject

       OPTIONAL:
       - Message
    ========================================================== */

    if (
      !name ||
      !phone ||
      !email ||
      !pickup ||
      !drop ||
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

    /* ==========================================================
       OPTIONAL MESSAGE
    ========================================================== */

    const contactMessage =
      message &&
      String(message).trim()
        ? escapeHtml(message)
        : "No message provided.";

    /* ==========================================================
       SEND CONTACT EMAIL
    ========================================================== */

    await transporter.sendMail({
      from:
        `"SBS Taxi Website" <${smtpUser}>`,

      to: contactEmail,

      replyTo: email,

      subject:
        `New Contact Enquiry - ${cleanEmailSubject(
          subject
        )}`,

      html: `
        <!DOCTYPE html>

        <html>

          <head>

            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>
              SBS Taxi Enquiry
            </title>

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

              <!-- HEADER -->

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
                  New Customer Enquiry
                </p>

              </div>

              <!-- CONTENT -->

              <div
                style="
                  padding:28px;
                "
              >

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
                  <strong>Phone:</strong>
                  ${escapeHtml(phone)}
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
                  <strong>Service:</strong>
                  ${escapeHtml(subject)}
                </p>

                <p>
                  <strong>Pickup:</strong>
                  ${escapeHtml(pickup)}
                </p>

                <p>
                  <strong>Drop:</strong>
                  ${escapeHtml(drop)}
                </p>

                <h2
                  style="
                    color:#1A365D;
                    font-size:19px;
                    margin-top:25px;
                  "
                >
                  Message
                </h2>

                <div
                  style="
                    padding:16px;
                    background:#f8fafc;
                    border:1px solid #e2e8f0;
                    border-radius:10px;
                    line-height:1.6;
                  "
                >
                  ${contactMessage}
                </div>

              </div>

              <!-- FOOTER -->

              <div
                style="
                  padding:20px;
                  background:#f8fafc;
                  border-top:1px solid #e2e8f0;
                  text-align:center;
                "
              >

                <strong
                  style="
                    color:#1A365D;
                  "
                >
                  SBS
                  <span style="color:#facc15;">
                    TAXI
                  </span>
                </strong>

                <p
                  style="
                    margin:7px 0 0;
                    color:#64748b;
                    font-size:12px;
                  "
                >
                  One Brand. One Fare.
                  One Trusted Service.
                </p>

              </div>

            </div>

          </body>

        </html>
      `,
    });

    /* ============================================================
       CONTACT SUCCESS
    ============================================================ */

    return NextResponse.json({
      success: true,
      message:
        "Your enquiry has been sent successfully.",
    });

  } catch (error) {

    /* ============================================================
       ERROR
    ============================================================ */

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