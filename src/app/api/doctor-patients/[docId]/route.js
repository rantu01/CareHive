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

    const pipeline = [
      { $unwind: "$appointmentDetails" },
      { $match: { "appointmentDetails.docId": docId } },
      {
        $group: {
          _id: "$appointmentDetails.userId",
          patientName: { $first: "$appointmentDetails.patientName" },
          patientEmail: { $first: "$appointmentDetails.patientEmail" },
          userId: { $first: "$appointmentDetails.userId" },
          appointmentHistory: { $push: "$appointmentDetails" },
          lastBookedAt: { $max: "$appointmentDetails.bookedAt" },
        },
      },
      {
        $project: {
          _id: 0,
          patientName: 1,
          patientEmail: 1,
          userId: 1,
          appointmentHistory: 1,
          lastBookedAt: 1,
          lastBookedSlot: {
            $arrayElemAt: [
              "$appointmentHistory.bookedSlot",
              { $subtract: [{ $size: "$appointmentHistory" }, 1] },
            ],
          },
          totalAppointments: { $size: "$appointmentHistory" },
        },
      },
      { $sort: { lastBookedAt: -1 } },
    ];

    const patients = await collection.aggregate(pipeline).toArray();

    // always return array (even if empty)
    return NextResponse.json(patients || []);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}


