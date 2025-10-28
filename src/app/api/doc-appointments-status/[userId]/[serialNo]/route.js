import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

const allowed = ["upcoming", "in-progress", "completed", "cancelled"];

export async function PUT(request, { params }) {
  const { userId, serialNo } = params;
  const { status, doctorId } = await request.json();

  if (!allowed.includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("userAppointments");

    // update appointmentDetails array element
    const result = await collection.updateOne(
      { userId, "appointmentDetails.serialNo": Number(serialNo) },
      {
        $set: {
          "appointmentDetails.$.status": status,
          "appointmentDetails.$.statusUpdatedAt": new Date(),
          "appointmentDetails.$.statusUpdatedBy": doctorId
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}