// app/api/doctors/[id]/route.js
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// PATCH: Update doctor by ID
export async function PATCH(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const { id } = params;
    const body = await req.json(); // e.g. { status: { isVerified: true } }

    const result = await db.collection("doctors").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Doctor not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Doctor updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return new Response(JSON.stringify({ message: "Failed to update doctor" }), {
      status: 500,
    });
  }
}
