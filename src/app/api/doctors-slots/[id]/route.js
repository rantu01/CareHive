
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
      {
        projection: {
          "practiceInfo.workingHours": 1,
          "practiceInfo.patientLimit": 1,
          "practiceInfo.totalCapacity": 1,
          "practiceInfo.meetLink": 1,
          _id: 0,
        },
      }
    );

    if (!doctor) {
      return new Response(JSON.stringify({ message: "Doctor not found" }), {
        status: 404,
      });
    }

    const info = doctor.practiceInfo || {};
    return new Response(JSON.stringify(info), { status: 200 });
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
    const body = await req.json(); // { workingHours, patientLimit, meetLink }

    const { workingHours, patientLimit, meetLink } = body;

    // totalCapacity auto update same as patientLimit
    const totalCapacity = patientLimit;

    const result = await db.collection("doctors").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          "practiceInfo.workingHours": workingHours,
          "practiceInfo.patientLimit": patientLimit,
          "practiceInfo.totalCapacity": totalCapacity,
          "practiceInfo.meetLink": meetLink,
        },
      }
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

    // Copy existing fields safely
    const updatedWorkingHours = { ...doctor.practiceInfo?.workingHours };
    const updatedPatientLimit = { ...doctor.practiceInfo?.patientLimit };
    const updatedTotalCapacity = { ...doctor.practiceInfo?.totalCapacity };
    const updatedMeetLink = { ...doctor.practiceInfo?.meetLink };

    // Remove the selected day from all
    delete updatedWorkingHours[day];
    delete updatedPatientLimit[day];
    delete updatedTotalCapacity[day];
    delete updatedMeetLink[day];

    // Update all fields back in DB
    await db.collection("doctors").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          "practiceInfo.workingHours": updatedWorkingHours,
          "practiceInfo.patientLimit": updatedPatientLimit,
          "practiceInfo.totalCapacity": updatedTotalCapacity,
          "practiceInfo.meetLink": updatedMeetLink,
        },
      }
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

