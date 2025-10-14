
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * ======================
 * ✅ GET → Fetch doctor slots
 * ======================
 */

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const { id } = await params;

    const doctor = await db.collection("doctors").findOne(
      { _id: new ObjectId(id) },
      { projection: { "practiceInfo.workingHours": 1, _id: 0 } }
    );

    if (!doctor) {
      return new Response(JSON.stringify({ message: "Doctor not found" }), {
        status: 404,
      });
    }

    const slots = doctor.practiceInfo?.workingHours || {};

    return new Response(JSON.stringify(slots), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor slots:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch doctor slots" }),
      { status: 500 }
    );
  }
}


/**
 * ======================
 * ✏️ PATCH → Add or Update doctor slot
 * ======================
 * Body: { workingHours: { monday: "09:00-14:00", tuesday: "10:00-16:00" } }
 */
export async function PATCH(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const { id } = await params;
    const body = await req.json(); // { workingHours: {...} }

    const result = await db.collection("doctors").updateOne(
      { _id: new ObjectId(id) },
      { $set: { "practiceInfo.workingHours": body.workingHours } }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Doctor not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Doctor slots updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating doctor slots:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update doctor slots" }),
      { status: 500 }
    );
  }
}

/**
 * ======================
 * 🗑️ DELETE → Remove specific day slot
 * ======================
 * Body: { day: "monday" }
 */
export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const { id } = await params;
    const { day } = await req.json();

    if (!day) {
      return new Response(
        JSON.stringify({ message: "Day is required to delete slot" }),
        { status: 400 }
      );
    }

    const doctor = await db.collection("doctors").findOne({
      _id: new ObjectId(id),
    });

    if (!doctor) {
      return new Response(JSON.stringify({ message: "Doctor not found" }), {
        status: 404,
      });
    }

    const updatedHours = { ...doctor.practiceInfo?.workingHours };
    delete updatedHours[day];

    await db.collection("doctors").updateOne(
      { _id: new ObjectId(id) },
      { $set: { "practiceInfo.workingHours": updatedHours } }
    );

    return new Response(
      JSON.stringify({ message: `Slot for ${day} deleted successfully` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting slot:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete slot" }),
      { status: 500 }
    );
  }
}
