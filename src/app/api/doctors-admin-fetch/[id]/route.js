// app/api/doctors/[id]/route.js
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// PATCH: Update doctor verification and role
export async function PATCH(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const { id } = params;

    // Get request body
    const body = await req.json(); // e.g. { status: { isVerified: true } }
    if (!body.status || typeof body.status.isVerified !== "boolean") {
      return new Response(
        JSON.stringify({ message: "Invalid request body" }),
        { status: 400 }
      );
    }

    // 1️⃣ Update doctor verification status
    const doctorResult = await db.collection("doctors").updateOne(
      { _id: new ObjectId(id) },
      { $set: { "status.isVerified": body.status.isVerified } }
    );

    if (doctorResult.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Doctor not found" }), {
        status: 404,
      });
    }

    // 2️⃣ Update role in users collection
    const doctor = await db.collection("doctors").findOne({ _id: new ObjectId(id) });
    if (!doctor || !doctor.personalInfo?.email) {
      return new Response(JSON.stringify({ message: "Doctor email not found" }), {
        status: 404,
      });
    }

    const role = body.status.isVerified ? "doctor" : "user";
    await db.collection("users").updateOne(
      { email: doctor.personalInfo.email },
      { $set: { role } }
    );

    return new Response(
      JSON.stringify({ message: "Doctor updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating doctor:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update doctor" }),
      { status: 500 }
    );
  }
}
