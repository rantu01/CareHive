import clientPromise from "../../lib/mongodb"; // তোমার MongoDB connection utility

export async function POST(req) {
  try {
    const { email, fcmToken } = await req.json();
    const client = await clientPromise;
    const db = client.db("CareHive");

    await db.collection("users").updateOne(
      { email },
      { $set: { fcmToken } }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return new Response(JSON.stringify({ error: "Failed to save token" }), { status: 500 });
  }
}
