
// import clientPromise from "@/app/lib/mongodb";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const client = await clientPromise;
//     const db = client.db("fitness"); // 🔹 Replace with your actual database name
//     const collection = db.collection("yogaTechniques");

//     if (!body.techniqueName || !body.sanskritName || !body.category) {
//       return Response.json(
//         { success: false, message: "Please fill all required fields." },
//         { status: 400 }
//       );
//     }

//     const result = await collection.insertOne({
//       ...body,
//       createdAt: new Date(),
//     });

//     return Response.json({
//       success: true,
//       message: "Yoga technique added successfully!",
//       id: result.insertedId,
//     });
//   } catch (error) {
//     console.error("Error adding yoga technique:", error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("yourDatabaseName");
//     const collection = db.collection("yogaTechniques");
//     const techniques = await collection.find().sort({ createdAt: -1 }).toArray();

//     return Response.json({ success: true, techniques });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


// import clientPromise from "@/lib/mongodb";
// import clientPromise from "@/app/lib/mongodb";
// import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db();
//     const data = await db.collection("yogaTechniques").find().toArray();
//     return Response.json({ success: true, data });
//   } catch (error) {
//     return Response.json({ success: false, message: error.message });
//   }
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const client = await clientPromise;
//     const db = client.db();
//     await db.collection("yogaTechniques").insertOne(body);
//     return Response.json({ success: true });
//   } catch (error) {
//     return Response.json({ success: false, message: error.message });
//   }
// }

// export async function PUT(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     const body = await req.json();

//     const client = await clientPromise;
//     const db = client.db();
//     await db
//       .collection("yogaTechniques")
//       .updateOne({ _id: new ObjectId(id) }, { $set: body });

//     return Response.json({ success: true });
//   } catch (error) {
//     return Response.json({ success: false, message: error.message });
//   }
// }

// export async function DELETE(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     const client = await clientPromise;
//     const db = client.db();
//     await db.collection("yogaTechniques").deleteOne({ _id: new ObjectId(id) });

//     return Response.json({ success: true });
//   } catch (error) {
//     return Response.json({ success: false, message: error.message });
//   }
// }


import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = "fitness"; // <-- database name
const COLLECTION_NAME = "yogaTechniques"; // <-- collection name

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME); // use fitness database
    const data = await db.collection(COLLECTION_NAME).find().toArray();
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION_NAME).insertOne(body);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID is required for update");

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, { $set: body });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID is required for deletion");

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
