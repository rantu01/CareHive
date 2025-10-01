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
