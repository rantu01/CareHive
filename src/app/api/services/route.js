import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive"); // change to your DB name
    const services = await db.collection("services").find({}).limit(8).toArray();

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
