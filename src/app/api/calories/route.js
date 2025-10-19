// // app/api/calories/route.js
// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";

// // 📌 GET: Fetch all meals for today (or by query)
// export async function GET(req) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("carehive");
//     const collection = db.collection("calories");

//     // Optional: filter by userId or date
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId") || null;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const query = {
//       ...(userId ? { userId } : {}),
//       date: { $gte: today },
//     };

//     const meals = await collection.find(query).toArray();

//     return NextResponse.json(meals);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "❌ Failed to fetch calorie data" },
//       { status: 500 }
//     );
//   }
// }

// // 📌 POST: Add new meal entry
// export async function POST(req) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("carehive");
//     const collection = db.collection("calories");

//     const body = await req.json();
//     const { userId, meals, dailyGoal, totalCalories } = body;

//     const doc = {
//       userId: userId || "guest", // later replace with real user auth
//       date: new Date(),
//       meals,
//       dailyGoal,
//       totalCalories,
//     };

//     const result = await collection.insertOne(doc);

//     return NextResponse.json({ success: true, insertedId: result.insertedId });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "❌ Failed to add meal" },
//       { status: 500 }
//     );
//   }
// }


// app/api/calories/route.js
// import clientPromise from "@/lib/mongodb";
// import clientPromise from "@/lib/mongodb";

import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

// 📌 GET: Fetch all meals for today (or by userId)
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("calories");

    const { searchParams } = new URL(req.params);

    console.log("key of",searchParams)
    const userId = searchParams.get("userId") || "guest";

    console.log("this is",userId)

    // Today’s start time (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all meals for this user for today
    const meals = await collection
      .find({
        userId,
        date: { $gte: today },
      })
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(meals);
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { error: "❌ Failed to fetch calorie data" },
      { status: 500 }
    );
  }
}

// 📌 POST: Add a single meal entry
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("calories");

    const body = await req.json();
    const { userId, food, calories, carbs, protein, fat, portionSize, type, dailyGoal } = body;

    if (!food || !calories) {
      return NextResponse.json(
        { error: "⚠️ Food name and calories are required" },
        { status: 400 }
      );
    }

    const doc = {
      userId: userId || "guest", // later replace with auth user
      food,
      calories: Number(calories),
      carbs: Number(carbs) || 0,
      protein: Number(protein) || 0,
      fat: Number(fat) || 0,
      portionSize: portionSize || "",
      type,
      dailyGoal: Number(dailyGoal) || 2000,
      date: new Date(),
    };

    const result = await collection.insertOne(doc);

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("❌ POST Error:", error);
    return NextResponse.json(
      { error: "❌ Failed to add meal" },
      { status: 500 }
    );
  }
}
