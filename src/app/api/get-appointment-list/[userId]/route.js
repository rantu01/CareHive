import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request,{params}) {

  try {

    const {userId}=params

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const userAppointmentsCollection = db.collection("userAppointments")
    const doctorList = await userAppointmentsCollection.find({ userId: userId }).toArray();


    return NextResponse.json(doctorList);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch health stats data" },
      { status: 500 }
    );
  }

}
