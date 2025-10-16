import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { docId } = await params;

    if (!docId) {
      return NextResponse.json(
        { error: "Doctor ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("userAppointments");

    // Unwind appointmentDetails and match by docId
    const pipeline = [
      { $unwind: "$appointmentDetails" },
      { $match: { "appointmentDetails.docId": docId } },
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
          userId: "$appointmentDetails.userId",
        },
      },
      { $sort: { bookedAt: -1 } },
    ];

    const appointments = await collection.aggregate(pipeline).toArray();

    // Summary info
    const total = appointments.length;
    const byMeetingType = appointments.reduce((acc, curr) => {
      acc[curr.meetingType] = (acc[curr.meetingType] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      total,
      byMeetingType,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctor appointments" },
      { status: 500 }
    );
  }
}
