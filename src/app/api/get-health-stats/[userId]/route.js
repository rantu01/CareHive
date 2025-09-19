import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {

  try {

    const { userId } = await params

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


export async function PUT(req, { params }) {
  try {
    const { userId } = await params;

    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("healthMetrics");

    const result = await collection.updateOne(
      { userId: userId },

      { $set: { userStats: body.userStats } }
    );

    console.log(userId)

    return NextResponse.json(
      { success: true, modifiedCount: result.modifiedCount },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}




export async function POST(req, { params }) {

  try {

    const body = await req.json();

    console.log(body)
    
    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("healthMetrics");

    const result = await collection.insertOne(body)

    console.log(result)

    return Response.json({ success: true, status: 200 })
  } catch {

  }

}