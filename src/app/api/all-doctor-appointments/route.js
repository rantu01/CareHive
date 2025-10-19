// app/api/all-appointments/route.js
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("userAppointments");

    // sob appointments fetch
    const appointments = await collection
      .aggregate([
        { $unwind: "$appointmentDetails" },
        {
          $project: {
            _id: 0,
            bookedAt: "$appointmentDetails.bookedAt",
            bookedSlot: "$appointmentDetails.bookedSlot",
            docId: "$appointmentDetails.docId",
            doctorName: "$appointmentDetails.doctorName",
            fees: "$appointmentDetails.fees",
            hospitalName: "$appointmentDetails.hospitalName",
            meetingType: "$appointmentDetails.meetingType",
            patientEmail: "$appointmentDetails.patientEmail",
            patientName: "$appointmentDetails.patientName",
            serialNo: "$appointmentDetails.serialNo",
            status: "$appointmentDetails.status",
            userId: "$appointmentDetails.userId",
          },
        },
        { $sort: { bookedAt: -1 } },
      ])
      .toArray();

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
