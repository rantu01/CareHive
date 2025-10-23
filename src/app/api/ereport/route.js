// import clientPromise from "@/app/lib/mongodb";
// import { NextResponse } from "next/server";
// // import clientPromise from "@/lib/mongodb";

// // ------------------ POST: Upload a new health report ------------------
// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const pdfFile = formData.get("file");
//     const category = formData.get("category");
//     const email = formData.get("email"); // directly passed from frontend

//     if (!pdfFile || !email) {
//       return NextResponse.json(
//         { error: "Missing file or user email" },
//         { status: 400 }
//       );
//     }

//     // Convert file to base64 before saving
//     const arrayBuffer = await pdfFile.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const reportsCollection = db.collection("healthReports");

//     const newReport = {
//       email,
//       category,
//       filename: pdfFile.name,
//       contentType: pdfFile.type,
//       fileData: buffer.toString("base64"),
//       uploadedAt: new Date(),
//     };

//     const result = await reportsCollection.insertOne(newReport);

//     return NextResponse.json(
//       { message: "Report uploaded successfully", id: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { error: "Failed to upload report" },
//       { status: 500 }
//     );
//   }
// }

// // ------------------ GET: Fetch all reports for a user ------------------
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const reportsCollection = db.collection("healthReports");

//     const reports = await reportsCollection
//       .find({ email })
//       .project({ fileData: 0 })
//       .toArray();

//     return NextResponse.json({ reports }, { status: 200 });
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch reports" },
//       { status: 500 }
//     );
//   }
// }

import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import crypto from "crypto";

// ------------------ Encryption Setup ------------------
const SECRET_KEY = "12345678901234567890123456789012"; // exactly 32 chars
const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

function encryptData(base64Data) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(base64Data, "base64", "base64");
  encrypted += cipher.final("base64");
  return iv.toString("base64") + ":" + encrypted;
}

// ------------------ POST: Upload report ------------------
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const category = formData.get("category");
    const email = formData.get("email");
    const doctorName = formData.get("doctorName");
    const date = formData.get("date");

    if (!file || !email || !doctorName || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const encryptedFile = encryptData(buffer.toString("base64"));

    const client = await clientPromise;
    const db = client.db("healthDB");
    const reportsCollection = db.collection("healthReports");

    const newReport = {
      email,
      doctorName,
      date,
      category,
      filename: file.name,
      contentType: file.type,
      encryptedFile,
      uploadedAt: new Date(),
    };

    const result = await reportsCollection.insertOne(newReport);

    return NextResponse.json(
      { message: "Report uploaded successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Failed to upload report" }, { status: 500 });
  }
}

// ------------------ GET: Fetch reports for user ------------------
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("healthDB");
    const reportsCollection = db.collection("healthReports");

    const reports = await reportsCollection
      .find({ email })
      .project({ encryptedFile: 0 })
      .toArray();

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}
