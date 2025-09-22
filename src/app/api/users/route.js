import clientPromise from "../../lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive"); // replace with your DB name

    const users = await db.collection("users").find({}).toArray();

    // Optional: sanitize data (remove passwords etc)
    const sanitizedUsers = users.map(({ _id, email, role }) => ({
      id: _id.toString(),
      email,
      role,
    }));

    return new Response(JSON.stringify(sanitizedUsers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
