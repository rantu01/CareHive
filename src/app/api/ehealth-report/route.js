// // import clientPromise from "@/app/lib/mongodb";

// import clientPromise from "@/app/lib/mongodb";

// export async function POST(req, res) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const collection = db.collection("reports");

//     // Parse JSON body
//     const { patientName, imageLink, userEmail } = await req.json();

//     if (!patientName) {
//       return new Response(
//         JSON.stringify({ message: "Patient name is required" }),
//         { status: 400 }
//       );
//     }

//     // Prepare report data
//     const reportData = {
//       patientName,
//       imageLink: imageLink || null,
//       userEmail: userEmail || null, // save logged-in user's email
//       createdAt: new Date(),
//     };

//     // Insert into MongoDB
//     await collection.insertOne(reportData);

//     return new Response(
//       JSON.stringify({ message: "Report saved successfully" }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ message: "Error saving report" }),
//       { status: 500 }
//     );
//   }
// }



import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("reports");

    const { patientName, imageLink, userEmail } = await req.json();

    if (!patientName) {
      return new Response(
        JSON.stringify({ message: "Patient name is required" }),
        { status: 400 }
      );
    }

    const reportData = {
      patientName,
      imageLink: imageLink || null,
      userEmail: userEmail || null,
      createdAt: new Date(),
    };

    await collection.insertOne(reportData);

    return new Response(
      JSON.stringify({ message: "Report saved successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error saving report" }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("reports");

    const reports = await collection
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify({ reports }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error fetching reports" }),
      { status: 500 }
    );
  }
}
