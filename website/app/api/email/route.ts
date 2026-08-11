
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
       SIMPLE BOOKING FORM
       Name + Email + Pickup + Drop + Date + Time + Vehicle
    ============================================================ */

    if (body?.bookingType === "simple-booking") {
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
         SEND BOOKING EMAIL
      ========================================================== */

      await transporter.sendMail({
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        replyTo: email,

        subject:
          `New SBS Taxi Booking - ${escapeHtml(name)}`,

        html: `
          <div
            style="
              font-family:Arial,sans-serif;
              max-width:700px;
              margin:auto;
              color:#1e293b;
            "
          >

            <!-- HEADER -->

            <div
              style="
                background:#1A365D;
                color:white;
                padding:22px;
                border-radius:10px 10px 0 0;
                text-align:center;
              "
            >
              <h1 style="margin:0;">
                SBS TAXI
              </h1>

              <p style="margin:6px 0 0;">
                New Ride Booking Request
              </p>
            </div>

            <!-- CONTENT -->

            <div
              style="
                border:1px solid #e2e8f0;
                border-top:0;
                padding:24px;
                border-radius:0 0 10px 10px;
              "
            >

              <!-- CUSTOMER DETAILS -->

              <h3 style="color:#1A365D;">
                Customer Details
              </h3>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                "
              >

                <tr>
                  <td
                    style="
                      padding:8px;
                      color:#64748b;
                    "
                  >
                    Name
                  </td>

                  <td
                    style="
                      padding:8px;
                      font-weight:bold;
                    "
                  >
                    ${escapeHtml(name)}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:8px;
                      color:#64748b;
                    "
                  >
                    Email
                  </td>

                  <td
                    style="
                      padding:8px;
                      font-weight:bold;
                    "
                  >
                    ${escapeHtml(email)}
                  </td>
                </tr>

              </table>

              <!-- TRIP DETAILS -->

              <h3 style="color:#1A365D;">
                Trip Details
              </h3>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                "
              >

                <tr>
                  <td
                    style="
                      padding:8px;
                      color:#64748b;
                    "
                  >
                    Pickup Location
                  </td>

                  <td
                    style="
                      padding:8px;
                      font-weight:bold;
                    "
                  >
                    ${escapeHtml(pickup)}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:8px;
                      color:#64748b;
                    "
                  >
                    Drop Location
                  </td>

                  <td
                    style="
                      padding:8px;
                      font-weight:bold;
                    "
                  >
                    ${escapeHtml(drop)}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:8px;
                      color:#64748b;
                    "
                  >
                    Date
                  </td>

                  <td
                    style="
                      padding:8px;
                      font-weight:bold;
                    "
                  >
                    ${escapeHtml(date)}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:8px;
                      color:#64748b;
                    "
                  >
                    Time
                  </td>

                  <td
                    style="
                      padding:8px;
                      font-weight:bold;
                    "
                  >
                    ${escapeHtml(time)}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:8px;
                      color:#64748b;
                    "
                  >
                    Vehicle
                  </td>

                  <td
                    style="
                      padding:8px;
                      font-weight:bold;
                    "
                  >
                    ${escapeHtml(vehicle)}
                  </td>
                </tr>

              </table>

              <!-- BOOKING STATUS -->

              <div
                style="
                  margin-top:20px;
                  background:#eff6ff;
                  border:1px solid #bfdbfe;
                  padding:14px;
                  border-radius:8px;
                  color:#1A365D;
                  font-weight:bold;
                "
              >
                New booking request received from
                the SBS Taxi website.
              </div>

              <hr
                style="
                  margin:24px 0;
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
                Please contact the customer to
                confirm the booking.
              </p>

            </div>
          </div>
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

    if (body?.bookingType === "temple-tour") {
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

      const templeRows = destinations
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
              <td style="padding:8px;border:1px solid #ddd;">
                ${index + 1}
              </td>

              <td style="padding:8px;border:1px solid #ddd;">
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
                    ? " (Custom Destination)"
                    : ""
                }
              </td>

              <td style="padding:8px;border:1px solid #ddd;">
                ₹${Number(
                  temple.fare || 0
                ).toLocaleString("en-IN")}
              </td>
            </tr>
          `
        )
        .join("");

      await transporter.sendMail({
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        subject:
          "New Temple Tour Booking",

        html: `
          <div
            style="
              font-family:Arial,sans-serif;
              max-width:700px;
              margin:auto;
            "
          >

            <h2
              style="
                background:#1A365D;
                color:white;
                padding:18px;
                border-radius:8px;
              "
            >
              New Temple Tour Booking
            </h2>

            <h3>Trip Details</h3>

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

            <h3>
              Selected Temples / Destinations
            </h3>

            <table
              style="
                width:100%;
                border-collapse:collapse;
              "
            >
              <thead>
                <tr>
                  <th style="padding:8px;border:1px solid #ddd;">
                    #
                  </th>

                  <th style="padding:8px;border:1px solid #ddd;">
                    Temple / Destination
                  </th>

                  <th style="padding:8px;border:1px solid #ddd;">
                    Fare
                  </th>
                </tr>
              </thead>

              <tbody>
                ${templeRows}
              </tbody>
            </table>

            <h3>Fare Details</h3>

            <p>
              <strong>Base Fare:</strong>
              ₹${Number(
                baseFare || 0
              ).toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Total Fare:</strong>
              ₹${Number(
                totalFare || 0
              ).toLocaleString("en-IN")}
            </p>

            <hr />

            <p>
              SBS Taxi Temple Tour Booking
            </p>

          </div>
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

    if (body?.bookingType === "taxi-booking") {
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
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        subject:
          `New SBS Taxi Booking - ${escapeHtml(
            passengerName
          )}`,

        html: `
          <div
            style="
              font-family:Arial,sans-serif;
              max-width:700px;
              margin:auto;
              color:#1e293b;
            "
          >

            <div
              style="
                background:#1A365D;
                color:white;
                padding:22px;
                border-radius:10px 10px 0 0;
                text-align:center;
              "
            >
              <h1 style="margin:0;">
                SBS TAXI
              </h1>

              <p style="margin:6px 0 0;">
                New Booking Confirmation
              </p>
            </div>

            <div
              style="
                border:1px solid #e2e8f0;
                border-top:0;
                padding:24px;
                border-radius:0 0 10px 10px;
              "
            >

              <h3 style="color:#1A365D;">
                Passenger Details
              </h3>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                "
              >

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Passenger Name
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(passengerName)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Total People
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(people || 1)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Babies
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(babies || 0)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Elderly People
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(elderly || 0)}
                  </td>
                </tr>

              </table>

              <h3 style="color:#1A365D;">
                Trip Details
              </h3>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                "
              >

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Pickup
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(pickup)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Drop
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(drop)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Trip Type
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(tripType || "-")}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Date
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(date)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Time
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(time)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Round Trip
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${isRoundTrip ? "Yes" : "No"}
                  </td>
                </tr>

              </table>

              <h3 style="color:#1A365D;">
                Vehicle Details
              </h3>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                "
              >

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Vehicle
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(vehicle)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Model
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(model || "-")}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Seats
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(seats || "-")}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px;color:#64748b;">
                    Price
                  </td>

                  <td style="padding:8px;font-weight:bold;">
                    ${escapeHtml(price || "-")}
                  </td>
                </tr>

              </table>

              <h3 style="color:#1A365D;">
                Payment Method
              </h3>

              <div
                style="
                  background:#eff6ff;
                  border:1px solid #bfdbfe;
                  padding:14px;
                  border-radius:8px;
                  font-weight:bold;
                "
              >
                ${escapeHtml(paymentMethod)}
              </div>

              <h3 style="color:#1A365D;">
                Additional Preferences
              </h3>

              <p>
                ${preferenceText}
              </p>

              <hr />

              <p
                style="
                  color:#64748b;
                  font-size:13px;
                "
              >
                This booking was submitted from
                the SBS Taxi website.
              </p>

            </div>
          </div>
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
      subject,
      message,
    } = body;

    if (
      !name ||
      !phone ||
      !email ||
      !pickup ||
      !drop ||
      !subject ||
      !message
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

    await transporter.sendMail({
      from:
        `"SBS Taxi Website" <${smtpUser}>`,

      to: contactEmail,

      replyTo: email,

      subject:
        `New Contact Enquiry - ${escapeHtml(subject)}`,

      html: `
        <h2>New SBS Taxi Enquiry</h2>

        <h3>Customer Details</h3>

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

        <h3>Trip Details</h3>

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

        <h3>Message</h3>

        <p>
          ${escapeHtml(message)}
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
      message:
        "Your enquiry has been sent successfully.",
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