import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";

const dbName = "carehive";

// ✅ GET — Fetch all blood donors
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const data = await db.collection("donors").find({ type: "blood" }).toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /blood-donation error:", error);
    return NextResponse.json({ error: "Failed to fetch blood donors" }, { status: 500 });
  }
}

// ✅ POST — Add a new blood donor
export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(dbName);

    const result = await db.collection("donors").insertOne({
      ...body,
      type: "blood",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("POST /blood-donation error:", error);
    return NextResponse.json({ error: "Failed to add donor" }, { status: 500 });
  }
}

// ✅ PATCH — Update an existing blood donor
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing _id for update" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    const result = await db.collection("donors").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    console.error("PATCH /blood-donation error:", error);
    return NextResponse.json({ error: "Failed to update donor" }, { status: 500 });
  }
}

// ✅ DELETE — Remove a blood donor by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db(dbName);

    const result = await db.collection("donors").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: result.deletedCount > 0 });
  } catch (error) {
    console.error("DELETE /blood-donation error:", error);
    return NextResponse.json({ error: "Failed to delete donor" }, { status: 500 });
  }
}
