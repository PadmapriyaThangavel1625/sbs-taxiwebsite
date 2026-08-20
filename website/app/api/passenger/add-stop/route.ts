import { NextRequest, NextResponse } from "next/server";
import { url_path } from "@/config/project_path";

interface AddStopRequest {
  ride_id?: number;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: AddStopRequest = await request.json();

    const rideId = Number(body.ride_id);
    const address = body.address?.trim();
    const latitude = Number(body.latitude);
    const longitude = Number(body.longitude);

    if (
      !rideId ||
      !address ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ride_id, address, latitude and longitude are required",
        },
        { status: 422 }
      );
    }

    const response = await fetch(
      `${url_path}/api/passenger/add-stop.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ride_id: rideId,
          address,
          latitude,
          longitude,
        }),
        cache: "no-store",
      }
    );

    const text = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("Invalid PHP add-stop response:", text);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid response from PHP server",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Passenger add-stop API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to add stop",
      },
      { status: 500 }
    );
  }
}