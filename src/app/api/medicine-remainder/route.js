import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {

  try {


    const data = await request.json()
    console.log("anurag kashyap", data)

    const userId = data?.userId

    console.log("the user id", userId)

    const client = await clientPromise;
    const db = client.db("carehive");
    const toDoCollection = db.collection("medicineRemainder")

    const userToDoList = await toDoCollection.insertOne(data)


    return NextResponse.json(userToDoList);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch health stats data" },
      { status: 500 }
    );
  }

}

export async function GET(req, { params }) {
  try {

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("medicineRemainder");


    const userMedicine = await collection.find({ userId }).toArray()
    return NextResponse.json(userMedicine);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}