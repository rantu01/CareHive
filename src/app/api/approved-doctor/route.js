import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

// ---------- GET ----------
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const coll = db.collection("doctors");

    // শুধু pending requests (isVerified=false)
    const requests = await coll.find({ "status.isVerified": false }).toArray();

    // ObjectId কে string করা (frontend এ কাজ সহজ করার জন্য)
    const data = requests.map(r => ({
      ...r,
      _id: r._id.toString(),
    }));

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Error fetching requests:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// ---------- POST ----------
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const coll = db.collection("doctors");
    
    // Parse incoming JSON body
    const body = await req.json();
    console.log("the body is ", body);
    
    // Remove any $oid or invalid _id field
    if (body._id && typeof body._id === "object") {
      delete body._id;
    }
    
    const userEmail = body.personalInfo?.email;
    const clinicAddress = body.practiceInfo?.clinicAddress;
    
    // Validate required fields
    if (!userEmail || !clinicAddress) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Email and clinic address are required" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Check if user already has a verified application
    const verifiedApplication = await coll.findOne({
      "personalInfo.email": userEmail,
      "status.isVerified": true
    });
    
    if (verifiedApplication) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "You already have a verified application. Multiple applications are not allowed." 
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Check if user already applied to this specific hospital
    const existingApplication = await coll.findOne({
      "personalInfo.email": userEmail,
      "practiceInfo.clinicAddress": clinicAddress
    });
    
    if (existingApplication) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `You have already applied to ${clinicAddress}. Multiple applications to the same hospital are not allowed.` 
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Insert into "doctors" collection
    const result = await coll.insertOne(body);
    
    return new Response(
      JSON.stringify({ success: true, insertedId: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("POST error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || "Failed to insert" 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}