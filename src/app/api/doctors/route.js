// app/api/doctors/route.js
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");

    // Fetch only verified doctors
    const doctors = await db
      .collection("doctors")
      .find({ "status.isVerified": true }) // ✅ filter by verified status
      .toArray();

    return Response.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch doctors" }), {
      status: 500,
    });
  }
}
