import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "donorDB";

export async function GET() {
  await client.connect();
  const db = client.db(dbName);
  const data = await db.collection("donors").find({ type: "blood" }).toArray();
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  await client.connect();
  const db = client.db(dbName);
  const result = await db.collection("donors").insertOne({
    ...body,
    type: "blood",
    createdAt: new Date()
  });
  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await client.connect();
  const db = client.db(dbName);
  const result = await db.collection("donors").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: result.deletedCount > 0 });
}
