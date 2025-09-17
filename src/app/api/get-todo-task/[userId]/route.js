import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request,{params}) {

  try {

    const {userId}=await params

    console.log(userId)

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const toDoCollection = db.collection("userToDo")
    const userToDoList = await toDoCollection.find({ userId: userId }).toArray();


    return NextResponse.json(userToDoList);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch health stats data" },
      { status: 500 }
    );
  }

}





export async function POST(request, { params }) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { taskId, title, completed } = body;

    if (!taskId || !title) {
      return NextResponse.json({ error: "taskId and title are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const toDoCollection = db.collection("userToDo");

    // Push new todo into array
    const result = await toDoCollection.updateOne(
      { userId: userId },
      {
        $push: {
          todo: {
            taskId,
            title,
            completed
          },
        },
      },
      { upsert: true } // creates doc if userId doesn't exist
    );

    return NextResponse.json({ message: "Todo added successfully", result }, { status: 201 });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}