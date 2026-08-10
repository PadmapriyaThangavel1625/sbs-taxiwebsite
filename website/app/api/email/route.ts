
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

    /*
    ============================================================
    SMTP
    ============================================================
    */

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(
      process.env.SMTP_PORT || 587
    );
    const smtpSecure =
      process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
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

    /*
    ============================================================
    TEMPLE TOUR BOOKING
    ============================================================
    */

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

      /*
      ----------------------------------------------------------
      MULTIPLE TEMPLES
      ----------------------------------------------------------
      */

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
              <td>${index + 1}</td>

              <td>
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
                    ? " (Custom Destination)"
                    : ""
                }
              </td>

              <td>
                ₹${Number(
                  temple.fare || 0
                ).toLocaleString("en-IN")}
              </td>
            </tr>
          `
        )
        .join("");

      /*
      ----------------------------------------------------------
      EMAIL
      ----------------------------------------------------------
      */

      await transporter.sendMail({
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        subject:
          "New Temple Tour Booking",

        html: `
          <h2>New Temple Tour Booking</h2>

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
            ${escapeHtml(
              passengers || 1
            )}
          </p>

          <p>
            <strong>Vehicle:</strong>
            ${escapeHtml(vehicle)}
          </p>

          <p>
            <strong>Seater:</strong>
            ${escapeHtml(
              seats || "-"
            )}
          </p>

          <p>
            <strong>Trip Package:</strong>
            ${escapeHtml(
              tripPackage || "-"
            )}
          </p>

          <h3>
            Selected Temples / Destinations
          </h3>

          <table border="1" cellpadding="8">
            <thead>
              <tr>
                <th>#</th>
                <th>Temple / Destination</th>
                <th>Fare</th>
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
        `,
      });

      return NextResponse.json({
        success: true,
        message:
          "Temple tour booking sent successfully.",
      });
    }

    /*
    ============================================================
    NORMAL TAXI BOOKING
    ============================================================
    */

    if (
      body?.pickup &&
      body?.drop &&
      body?.date &&
      body?.time &&
      body?.vehicle
    ) {
      const {
        pickup,
        drop,
        date,
        time,
        vehicle,
      } = body;

      await transporter.sendMail({
        from:
          `"SBS Taxi Website" <${smtpUser}>`,

        to: contactEmail,

        subject:
          "New SBS Taxi Booking",

        html: `
          <h2>New SBS Taxi Booking</h2>

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
        `,
      });

      return NextResponse.json({
        success: true,
        message:
          "Booking request sent successfully.",
      });
    }

    /*
    ============================================================
    CONTACT FORM
    ============================================================
    */

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
        `New Contact Enquiry - ${subject}`,

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
