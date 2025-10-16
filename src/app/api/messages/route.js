import clientPromise from "@/app/lib/mongodb";

// ✅ GET → Fetch messages
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");
    const doctorEmail = searchParams.get("doctorEmail");

    const client = await clientPromise;
    const db = client.db("carehive");

    let query = {};

    if (doctorEmail && userEmail) {
      // Conversation between a specific doctor and user
      query = {
        $or: [
          { senderEmail: doctorEmail, receiverEmail: userEmail },
          { senderEmail: userEmail, receiverEmail: doctorEmail },
        ],
      };
    } else if (doctorEmail) {
      // All messages where the doctor is sender or receiver
      query = {
        $or: [
          { senderEmail: doctorEmail },
          { receiverEmail: doctorEmail },
        ],
      };
    }

    const messages = await db
      .collection("messages")
      .find(query)
      .sort({ timestamp: -1 })
      .toArray();

    return Response.json(messages);
  } catch (error) {
    console.error("GET messages error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch messages" }),
      { status: 500 }
    );
  }
}

// ✅ POST → Send a new message
export async function POST(req) {
  try {
    const { senderEmail, receiverEmail, message } = await req.json();

    if (!senderEmail || !receiverEmail || !message) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");

    const newMessage = {
      senderEmail,
      receiverEmail,
      message,
      timestamp: new Date(),
      seen: false,
    };

    const result = await db.collection("messages").insertOne(newMessage);

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST messages error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500 }
    );
  }
}
