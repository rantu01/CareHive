import admin from "../../firebase/firebaseAdmin"; // default export
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { targetEmail, title, body, targetRole } = await req.json();

    if (!title || !body) {
      return NextResponse.json({
        success: false,
        message: "Title and body are required",
      });
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const usersColl = db.collection("users");
    const notificationsColl = db.collection("notifications");

    let targetUser;

    if (targetEmail) {
      targetUser = await usersColl.findOne({ email: targetEmail });
    } else if (targetRole) {
      targetUser = await usersColl.findOne({ role: targetRole });
    }

    if (!targetUser) {
      return NextResponse.json({
        success: false,
        message: "Target user not found",
      });
    }

    // ✅ Save notification **only for the target user**
    const inserted = await notificationsColl.insertOne({
      userEmail: targetUser.email,
      title,
      body,
      read: false,
      createdAt: new Date(),
    });

    // ✅ Send FCM push notification if token exists
    let fcmResponse = null;
    if (targetUser.fcmToken) {
      const message = {
        notification: { title, body },
        token: targetUser.fcmToken,
      };
      fcmResponse = await admin.messaging().send(message);
    }

    return NextResponse.json({
      success: true,
      notification: inserted,
      fcmResponse,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
