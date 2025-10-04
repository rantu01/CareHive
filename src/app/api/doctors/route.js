// app/api/doctors/route.js
// import clientPromise from "@/lib/mongodb";

import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const doctors = await db.collection("doctors").find({}).toArray();

    return Response.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch doctors" }), {
      status: 500,
    });
  }
}
