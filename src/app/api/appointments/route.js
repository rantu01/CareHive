import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const {bookedAt,bookedSlot,docId,doctorName,fees,hospitalName,meetingType,patientEmail,patientName,userId} = body;


    if (!docId || !doctorName || !hospitalName || !patientEmail || !patientName || !bookedSlot || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    const client = await clientPromise;
    const db = client.db("carehive");
    const userAppointmentsCollection = db.collection("userAppointments");
    const doctorCollection = db.collection("doctors");


    const [day] = bookedSlot.split("-");


    const doctor = await doctorCollection.findOne({ _id: new ObjectId(docId) });

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    // 5️⃣ Get current patient limit and total capacity
    const currentRemaining = parseInt(doctor.practiceInfo?.patientLimit?.[day]) || 0;
    const totalCapacity = parseInt(doctor.practiceInfo?.totalCapacity?.[day]) || currentRemaining;

    if (currentRemaining <= 0) {
      return NextResponse.json(
        { error: `No more slots available for ${day}` },
        { status: 400 }
      );
    }

    // 6️⃣ Calculate serial number and new remaining
    const serialNo = totalCapacity - currentRemaining + 1; // First booking = 1
    const newRemaining = currentRemaining - 1;

    // 7️⃣ Update doctor's patient limit atomically
    const updateResult = await doctorCollection.updateOne(
      { _id: new ObjectId(docId) },
      { $set: { [`practiceInfo.patientLimit.${day}`]: newRemaining.toString() } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Slot was just taken by another user, please try again" },
        { status: 409 }
      );
    }

    // 8️⃣ Create appointment data
    const appointmentData = {
      bookedAt: bookedAt || new Date().toISOString(),
      bookedSlot,
      docId,
      doctorName,
      fees,
      hospitalName,
      meetingType,
      patientEmail,
      patientName,
      serialNo: serialNo,
      userId
    };

    // 9️⃣ Save appointment
    const existing = await userAppointmentsCollection.findOne({ userId });
    if (existing) {
      await userAppointmentsCollection.updateOne(
        { userId },
        { $push: { appointmentDetails: appointmentData } }
      );
    } else {
      await userAppointmentsCollection.insertOne({
        userId,
        appointmentDetails: [appointmentData],
      });
    }

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
      serialNo: serialNo,
      remainingLimit: newRemaining,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}




export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log(userId)
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const userAppointmentsCollection = db.collection("userAppointments");

    const existing = await userAppointmentsCollection.findOne({ userId });

    if (!existing || !existing.appointmentDetails) {
      return NextResponse.json([]);
    }

    return NextResponse.json(existing.appointmentDetails);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
