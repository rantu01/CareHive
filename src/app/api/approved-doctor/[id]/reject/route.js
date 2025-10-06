import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req, context) {
  try {
    
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing ID" }, { status: 400 });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid ID" }, { status: 400 });
    }

    const { remarks } = await req.json();

    const client = await clientPromise;
    const db = client.db("carehive");
    const approvalColl = db.collection("approval-req");

    // 1️⃣ Check if request exists
    const request = await approvalColl.findOne({ _id: objectId });
    if (!request) {
      return NextResponse.json({ ok: false, error: "Request not found" }, { status: 404 });
    }

    // 2️⃣ Update approval request status as rejected
    await approvalColl.updateOne(
      { _id: objectId },
      {
        $set: {
          "status.isVerified": "Rejected",
          "status.adminRemarks": remarks || "Rejected",
          "status.approvedAt": null,
        },
      }
    );

    return NextResponse.json({ ok: true, message: "Request rejected successfully" });
  } catch (err) {
    console.error("Reject error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
