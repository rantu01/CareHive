import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // ✅ Correct destructuring
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

    // ✅ Unwind appointmentDetails and match by doctorId (not docId)
    const pipeline = [
      { $unwind: "$appointmentDetails" },
      { $match: { "appointmentDetails.doctorId": docId } },
      {
        $project: {
          _id: 0,
          bookedAt: "$appointmentDetails.createdAt",
          bookedSlot: "$appointmentDetails.bookedSlot",
          doctorId: "$appointmentDetails.doctorId",
          doctorName: "$appointmentDetails.doctorName",
          fees: "$appointmentDetails.doctorFee",
          hospitalName: "$appointmentDetails.hospitalName",
          meetingType: "$appointmentDetails.meetingType",
          patientEmail: "$appointmentDetails.patientEmail",
          patientName: "$appointmentDetails.patientName",
          serialNo: "$appointmentDetails.serialNo",
          userId: "$appointmentDetails.userId",
          paymentStatus: "$appointmentDetails.paymentStatus",
          status: "$appointmentDetails.status",
        },
      },
      { $sort: { bookedAt: -1 } },
    ];

    const appointments = await collection.aggregate(pipeline).toArray();

    const total = appointments.length;
    const byMeetingType = appointments.reduce((acc, curr) => {
      acc[curr.meetingType || "unknown"] =
        (acc[curr.meetingType || "unknown"] || 0) + 1;
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
