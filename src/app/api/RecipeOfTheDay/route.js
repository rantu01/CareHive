import clientPromise from "@/app/lib/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive"); // Replace with your DB name
    const collection = db.collection("recipes"); // Replace with your collection name

    // Fetch all recipes, you can add sorting or filtering if needed
    const recipes = await collection.find({}).toArray();

    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
