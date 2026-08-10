import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

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

Do not invent real-time driver information, ride status, prices, availability,
or booking details.

If you do not know something, politely tell the customer to contact SBS Taxi support.
`,

      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        error: "Unable to get AI response",
      },
      { status: 500 }
    );
  }
}