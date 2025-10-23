import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";


// 📍 Helper: Haversine distance calculator
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function POST(req) {
  try {
    const { lat, lon } = await req.json();
    const client = await clientPromise;
    const db = client.db("carehive");
    const hospitals = await db.collection("hospitalData").find({}).toArray();

    // Auto radius adjust
    const radius = lat > 23.7 && lat < 24.1 ? 25 : 300; // Dhaka-like city vs rural

    const nearbyHospitals = hospitals
      .map((h) => {
        const distance = getDistance(
          lat,
          lon,
          parseFloat(h.latitude),
          parseFloat(h.longitude)
        );
        return { ...h, distance };
      })
      .filter((h) => h.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);

    return NextResponse.json({
      message: "SOS Saved & Nearby Hospitals Found!",
      hospitals: nearbyHospitals,
    });
  } catch (error) {
    console.error("Error in SOS route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
