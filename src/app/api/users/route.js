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

// POST → insert a new user
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, role } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("carehive");

    const result = await db.collection("users").insertOne({
      name: name || null,
      email,
      role: role || "user",
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ insertedId: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
