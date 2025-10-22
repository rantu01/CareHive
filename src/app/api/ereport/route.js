// import { NextResponse } from "next/server";
// import { getAuth } from "firebase-admin/auth";
// import admin from "firebase-admin";
// import clientPromise from "@/app/lib/mongodb";

// // ------------------ FIREBASE ADMIN INIT ------------------
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }

// // ------------------ POST: Upload a new health report ------------------
// export async function POST(req) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     const decodedToken = await getAuth().verifyIdToken(idToken);
//     const userEmail = decodedToken.email;

//     const formData = await req.formData();
//     const pdfFile = formData.get("file");
//     const category = formData.get("category"); // e.g., report, prescription, test

//     if (!pdfFile) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Convert file to base64 to store in MongoDB (simple approach)
//     const arrayBuffer = await pdfFile.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const reportsCollection = db.collection("healthReports");

//     const newReport = {
//       email: userEmail,
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
//     return NextResponse.json({ error: "Failed to upload report" }, { status: 500 });
//   }
// }

// // ------------------ GET: Fetch reports for logged-in user ------------------
// export async function GET(req) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     const decodedToken = await getAuth().verifyIdToken(idToken);
//     const userEmail = decodedToken.email;

//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const reportsCollection = db.collection("healthReports");

//     const reports = await reportsCollection
//       .find({ email: userEmail })
//       .project({ fileData: 0 }) // exclude actual file content for listing
//       .toArray();

//     return NextResponse.json({ reports }, { status: 200 });
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
//   }
// }



import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// ------------------ POST: Upload a new health report ------------------
export async function POST(req) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get("file");
    const category = formData.get("category");
    const email = formData.get("email"); // directly passed from frontend

    if (!pdfFile || !email) {
      return NextResponse.json(
        { error: "Missing file or user email" },
        { status: 400 }
      );
    }

    // Convert file to base64 before saving
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const client = await clientPromise;
    const db = client.db("healthDB");
    const reportsCollection = db.collection("healthReports");

    const newReport = {
      email,
      category,
      filename: pdfFile.name,
      contentType: pdfFile.type,
      fileData: buffer.toString("base64"),
      uploadedAt: new Date(),
    };

    const result = await reportsCollection.insertOne(newReport);

    return NextResponse.json(
      { message: "Report uploaded successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload report" },
      { status: 500 }
    );
  }
}

// ------------------ GET: Fetch all reports for a user ------------------
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
      .project({ fileData: 0 })
      .toArray();

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

