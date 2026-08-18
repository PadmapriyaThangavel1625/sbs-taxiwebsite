import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 3) {
      return NextResponse.json([]);
    }

    const url = new URL(
      "https://nominatim.openstreetmap.org/search"
    );

    url.searchParams.set("format", "json");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "5");
    url.searchParams.set("countrycodes", "in");
    url.searchParams.set("q", query);

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "SBS-Taxi/1.0 (https://sbstechnologies.in)",
      },

      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Nominatim error:",
        response.status,
        response.statusText
      );

      return NextResponse.json(
        {
          error: "Unable to search location.",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Location Search API Error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to search location.",
      },
      {
        status: 500,
      }
    );
  }
}