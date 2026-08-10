import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY is missing");

      return NextResponse.json(
        {
          error: "OPENAI_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    const response = await openai.responses.create({
      model: "gpt-5-mini",

      instructions: `
You are the official AI customer support assistant for SBS Taxi.

Your job is to help customers with:

- Taxi booking
- Ride information
- Pickup and drop locations
- Fare-related general questions
- Vehicle information
- Driver-related questions
- Cancellation questions
- Payment questions
- General SBS Taxi support

Keep replies short, friendly and simple.

If the customer wants to book a taxi, tell them they can use the "Book a Ride" button.

Do not invent real-time driver information, ride status, prices,
availability, or booking details.

If you do not know something, politely tell the customer to contact SBS Taxi support.
`,

      input: message,
    });

    const reply = response.output_text?.trim();

    if (!reply) {
      console.error("OpenAI returned an empty response");

      return NextResponse.json(
        {
          error: "AI returned an empty response.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply,
    });
  } catch (error: unknown) {
    console.error("=================================");
    console.error("SBS TAXI CHAT API ERROR");
    console.error("=================================");

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error(error);
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown OpenAI error";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}