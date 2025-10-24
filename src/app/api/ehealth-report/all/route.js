import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("reports");

    const reports = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify({ reports }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error fetching all reports" }),
      { status: 500 }
    );
  }
}
