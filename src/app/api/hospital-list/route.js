import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

// 📌 GET: Fetch all meals for today (or by userId)
export async function POST(req) {
    try {
        const type = await req.json()
        const city = type.areaType


        const client = await clientPromise;

        const db = client.db("carehive");
        const collection = db.collection("hospitalData")
        const hospitalData = await collection.find({ city: { $regex: new RegExp(`^${city}$`, "i") } }).toArray()
        return NextResponse.json({ hospitals: hospitalData })

    } catch (error) {
        return NextResponse.json({ message: error })
    }
}


export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("hospitalData");

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const city = searchParams.get("city") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const filter = {};
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { address: regex },
        { care_type: regex },
        { city: regex },
      ];
    }
    if (city) filter.city = city;

    const total = await collection.countDocuments(filter);
    const hospitals = await collection.find(filter).skip(skip).limit(limit).toArray();

    return NextResponse.json({ hospitals, total });
  } catch (err) {
    console.error("Error fetching hospitals:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


