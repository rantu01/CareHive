import admin from "../../firebase/firebaseAdmin"; // default export
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { targetEmail, title, body, targetRole } = await req.json();

    const client = await clientPromise;
    const db = client.db("carehive");
    const usersColl = db.collection("users");

    let targetUser;

    if (targetEmail) {
      targetUser = await usersColl.findOne({ email: targetEmail });
    } else if (targetRole) {
      targetUser = await usersColl.findOne({ role: targetRole });
    }

    if (!targetUser?.fcmToken) {
      return NextResponse.json({
        success: false,
        message: "Target user not found or no FCM token",
      });
    }

    const message = {
      notification: { title, body },
      token: targetUser.fcmToken,
    };

    // ❌ remove extra .messaging()
    const response = await admin.messaging().send(message);

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
