

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
