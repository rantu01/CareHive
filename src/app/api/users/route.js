import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET all users
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");

    const users = await db.collection("users").find({}).toArray();

    const sanitizedUsers = users.map(({ _id, email, role, name }) => ({
      id: _id.toString(),
      name,
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

// POST → create new user
export async function POST(req) {
  try {
    const { name, email, role } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");

    // Check if user exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists", inserted: false }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert new user
    const newUser = {
      name: name || null,
      email,
      role: role || "user",
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    return new Response(
      JSON.stringify({ message: "User created", inserted: true, id: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("User insert error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add user" }),
      { status: 500 }
    );
  }
}



// PUT → update user
export async function PUT(req) {
  try {
    const { id, name, email, role } = await req.json();

    const client = await clientPromise;
    const db = client.db("carehive");

    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, email, role } });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
    });
  }
}

// DELETE → remove user
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db("carehive");

    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(id),
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
    });
  }
}
