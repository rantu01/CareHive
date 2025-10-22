import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");

    // Fetch only verified doctors
    const challenges = await db
      .collection("chellanges")
      .find({}) 
      .toArray();

    return Response.json(challenges);

  } catch (error) {
    console.error("Error fetching chellanges:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch chellanges" }), {
      status: 500,
    });
  }
}
