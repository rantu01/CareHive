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

    // Aggregate all appointments for this doctor only
    const pipeline = [
      { $unwind: "$appointmentDetails" },
      { $match: { "appointmentDetails.doctorId": docId } }, 
      {
        $project: {
          _id: 0,
          doctorId: "$appointmentDetails.doctorId",
          doctorName: "$appointmentDetails.doctorName",
          specialist: "$appointmentDetails.specialist",
          appointmentDate: "$appointmentDetails.appointmentDate",
          userId: "$userId",
        },
      },
      { $sort: { appointmentDate: -1 } },
    ];

    const appointments = await collection.aggregate(pipeline).toArray();

    // Create summary data
    const total = appointments.length;

    return NextResponse.json({
      total,
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
