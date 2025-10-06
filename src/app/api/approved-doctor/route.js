import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const coll = db.collection("approval-req");

    // শুধু pending requests (isVerified=false)
    const requests = await coll.find(
      { "status.isVerified": false }
    ).toArray();

    // ObjectId কে string করা (frontend এ কাজ সহজ করার জন্য)
    const data = requests.map(r => ({
      ...r,
      _id: r._id.toString()
    }));

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Error fetching requests:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
} 



export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const coll = db.collection("approval-req");

    // Parse incoming JSON body
    const body = await req.json();

    // Insert into collection
    const result = await coll.insertOne(body);

    return new Response(
      JSON.stringify({ success: true, insertedId: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("POST error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to insert" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
