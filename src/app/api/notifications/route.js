import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET → fetch all notifications for a user
export async function GET(req) {
  try {
    // 1. Extract the 'email' query parameter from the URL
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: "Email query parameter is missing." },
        { status: 400 }
      );
    }

    // 2. Database connection and query
    const client = await clientPromise;
    const db = client.db("carehive");
    const notificationsColl = db.collection("notifications");

    // Fetch notifications for the specific user, sorted by newest first
    const notifications = await notificationsColl
      .find({ userEmail })
      .sort({ createdAt: -1 }) // Sort newest (most recent date) first
      .toArray();

    // 3. Return a successful JSON response
    return NextResponse.json({ 
      success: true, 
      notifications 
    });

  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}

// POST → save new notification (Used for real-time foreground messages)
export async function POST(req) {
  try {
    const { userEmail, title, body, read } = await req.json();
    const client = await clientPromise;
    const db = client.db("carehive");

    const notification = {
      userEmail,
      title,
      body,
      read: read || false,
      createdAt: new Date(),
    };

    const result = await db.collection("notifications").insertOne(notification);

    // Return the full notification object including the MongoDB ID for the client state
    return NextResponse.json({ 
      success: true, 
      notification: { ...notification, _id: result.insertedId } 
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// PUT → mark notification as read
export async function PUT(req) {
  try {
    // Note: The client passes the MongoDB document ID as 'id'
    const { id, read } = await req.json(); 
    
    if (!id) {
        return NextResponse.json({ success: false, message: "Notification ID is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("carehive");

    const result = await db.collection("notifications").updateOne(
      { _id: new ObjectId(id) }, // Convert string ID to MongoDB ObjectId
      { $set: { read } }
    );

    return NextResponse.json({ 
      success: result.modifiedCount > 0 
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}