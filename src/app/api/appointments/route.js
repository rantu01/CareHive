import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, doctorId, doctorName, specialist, appointmentDate } = body;

    if (!userId || !doctorId || !doctorName || !specialist) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const userAppointmentsCollection = db.collection("userAppointments");

    // Check if user already has an appointment document
    const existing = await userAppointmentsCollection.findOne({ userId });

    if (existing) {
      // Push new appointment to array
      await userAppointmentsCollection.updateOne(
        { userId },
        {
          $push: {
            appointmentDetails: {
              doctorId,
              doctorName,
              specialist,
              appointmentDate: appointmentDate || new Date().toISOString(),
            },
          },
        }
      );
    } else {
      // Create new user document
      await userAppointmentsCollection.insertOne({
        userId,
        appointmentDetails: [
          {
            doctorId,
            doctorName,
            specialist,
            appointmentDate: appointmentDate || new Date().toISOString(),
          },
        ],
      });
    }

    return NextResponse.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}
