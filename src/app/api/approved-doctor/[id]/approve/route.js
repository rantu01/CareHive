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

    const approvalColl = db.collection("approval-req");
    const usersColl = db.collection("users");
    const doctorsColl = db.collection("doctors");

    // 1️⃣ Find approval request
    const request = await approvalColl.findOne({ _id: objectId });
    if (!request) {
      return NextResponse.json({ ok: false, error: "Request not found" }, { status: 404 });
    }

    const userIdToUpdate = request.userId || request._id;

    // 2️⃣ Prevent duplicate approval
    const existingDoctor = await doctorsColl.findOne({ userId: userIdToUpdate });
    if (existingDoctor) {
      return NextResponse.json({
        ok: false,
        message: "Doctor already approved",
      });
    }

    // 3️⃣ Insert doctor with status included
    await doctorsColl.insertOne({
      userId: userIdToUpdate,
      personalInfo: request.personalInfo,
      educationAndCredentials: request.educationAndCredentials,
      licenseAndVerification: request.licenseAndVerification,
      practiceInfo: request.practiceInfo,
      status: {
        isVerified: true,
        adminRemarks: "Approved",
        submittedAt: request.status?.submittedAt || new Date(),
        approvedAt: new Date(),
      },
      createdAt: new Date(),
    });

    // 4️⃣ Update user role
    await usersColl.updateOne(
      { _id: new ObjectId(userIdToUpdate) },
      { $set: { role: "doctor", updatedAt: new Date() } }
    );

    // 5️⃣ Update approval request status
    await approvalColl.updateOne(
      { _id: objectId },
      {
        $set: {
          "status.isVerified": true,
          "status.adminRemarks": "Approved",
          "status.approvedAt": new Date(),
        },
      }
    );

    return NextResponse.json({
      ok: true,
      message: "Doctor approved successfully",
    });
  } catch (err) {
    console.error("Approve error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
