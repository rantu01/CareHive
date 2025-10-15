import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const testimonials = await db.collection("testimonials").find({}).toArray();

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const body = await request.json();

    const { name, designation, photo, quote, rating, email } = body;

    if (!email || !quote) {
      return NextResponse.json(
        { success: false, message: "Email and quote are required" },
        { status: 400 }
      );
    }

    const newTestimonial = {
      name: name || "Anonymous",
      designation: designation || "",
      photo:
        photo ||
        "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      quote,
      rating: rating || 5,
      email,
      createdAt: new Date(),
    };

    await db.collection("testimonials").insertOne(newTestimonial);

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save testimonial" },
      { status: 500 }
    );
  }
}
