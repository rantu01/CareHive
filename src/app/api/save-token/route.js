import clientPromise from "@/app/lib/mongodb"; // তোমার MongoDB connection utility
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Request body থেকে email আর fcmToken নিচ্ছি
    const { email, fcmToken } = await req.json();

    if (!email || !fcmToken) {
      return NextResponse.json(
        { success: false, message: "Email and FCM token required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const usersColl = db.collection("users");

    // যদি user না থাকে, তাহলে insert করবে, আর থাকলে token update করবে
    const result = await usersColl.updateOne(
      { email },
      {
        $set: {
          fcmToken,
          updatedAt: new Date(),
        },
      },
      { upsert: false }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save token" },
      { status: 500 }
    );
  }
}
