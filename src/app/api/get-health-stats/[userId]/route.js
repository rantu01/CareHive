import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request,{params}) {

  try {

    const {userId}=params

    console.log(userId)

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const healthStatsCollection = db.collection("healthMetrics")
    const userHealthStats = await healthStatsCollection.find({ userId: userId }).toArray();

    console.log(userHealthStats)

    return NextResponse.json(userHealthStats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch health stats data" },
      { status: 500 }
    );
  }

}
