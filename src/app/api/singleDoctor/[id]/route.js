// /app/api/singleDoctor/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email"); // query param ?email=user@example.com

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const doctorsCollection = db.collection("doctors");

    const doctor = await doctorsCollection.findOne({ "personalInfo.email": email });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
