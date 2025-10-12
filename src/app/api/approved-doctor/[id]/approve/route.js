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

    const client = await clientPromise;
    const db = client.db("carehive");
    const doctorsColl = db.collection("doctors");
    const usersColl = db.collection("users");

    // Find the doctor
    const doctor = await doctorsColl.findOne({ _id: objectId });
    if (!doctor) {
      return NextResponse.json({ ok: false, error: "Doctor not found" }, { status: 404 });
    }

    // Update doctor info after approval
    await doctorsColl.updateOne(
      { _id: objectId },
      {
        $set: {
          status: {
            ...doctor.status,
            isVerified: true,
            adminRemarks: "Approved",
            approvedAt: new Date(),
          },
          updatedAt: new Date(),
        },
      }
    );

    // Update user role to doctor
    await usersColl.updateOne(
      { _id: new ObjectId(doctor.userId) },
      { $set: { role: "doctor", updatedAt: new Date() } }
    );

    return NextResponse.json({ ok: true, message: "Doctor approved successfully" });
  } catch (err) {
    console.error("Approve error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
