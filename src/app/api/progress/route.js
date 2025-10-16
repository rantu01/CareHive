

import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("fitnessDB");
    const collection = db.collection("userTracking");

    const body = await req.json();
    const { email, age, weight, gymTime, yogaTime, mentalState } = body;

    if (!email) {
      return Response.json({ success: false, message: "Missing email" }, { status: 400 });
    }

    await collection.updateOne(
      { email },
      { $set: { email, age, weight, gymTime, yogaTime, mentalState } },
      { upsert: true }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  return POST(req); // Same logic for update
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) return Response.json({ success: false, message: "Missing email" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("fitnessDB");
    const collection = db.collection("userTracking");

    const data = await collection.findOne({ email });
    return Response.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
