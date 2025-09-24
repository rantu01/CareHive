// app/api/blogs/route.js
// import clientPromise from "@/lib/mongodb";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, category, content, author } = body;

    if (!title || !category || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("healthDB"); // your database name
    const collection = db.collection("blogs");

    const newBlog = {
      title,
      category,
      content,
      author, // user info (email, name, uid)
      status: "draft", // default
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBlog);

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Error posting blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
