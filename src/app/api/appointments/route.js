import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();



    const client = await clientPromise;
    const db = client.db("carehive");



    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
    });


  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to book appointment" },
      { status: 500 }
    );
  }
}




export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const sessionId = searchParams.get("sessionId");
    
    console.log("Fetching appointment for userId:", userId, "sessionId:", sessionId);

    // Validate required parameters
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("carehive");
    const userAppointmentsCollection = db.collection("userAppointments");

    // Query to find the specific appointment
    const result = await userAppointmentsCollection.findOne(
      {
        userId: userId,
        "appointmentDetails.sessionId": sessionId
      },
      {
        projection: {
          "appointmentDetails.$": 1,
          userId: 1
        }
      }
    );

    // Check if appointment was found
    if (!result || !result.appointmentDetails || result.appointmentDetails.length === 0) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Return the specific appointment
    return NextResponse.json({
      success: true,
      appointment: result.appointmentDetails[0]
    });

  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment", details: error.message },
      { status: 500 }
    );
  }
}