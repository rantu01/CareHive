import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req, context) {
  try {
    // ✅ await params
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing ID" }, { status: 400 });
    }

    const { remarks } = await req.json();

    const client = await clientPromise;
    const db = client.db("carehive");
    const approvalColl = db.collection("approval-req");

    // Detect if ID is ObjectId or string
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id }; // fallback if stored as string
    }

    const request = await approvalColl.findOne(query);
    if (!request) {
      return NextResponse.json({ ok: false, error: "Request not found" }, { status: 404 });
    }

    // Update request as rejected
    await approvalColl.updateOne(query, {
      $set: {
        "status.isVerified": "Rejected",
        "status.adminRemarks": remarks || "Rejected",
        "status.approvedAt": null,
        "status.rejectedAt": new Date(),
      },
    });

    return NextResponse.json({ ok: true, message: "Request rejected successfully" });
  } catch (err) {
    console.error("Reject error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
