import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

// 📌 GET: Fetch all meals for today (or by userId)
export async function POST(req) {
    try {
        const type = await req.json()
        const city = type.areaType

        console.log("rjakjf")
        const client = await clientPromise;

        const db = client.db("carehive");
        const collection = db.collection("hospitalData")
        const hospitalData = await collection.find({ city: { $regex: new RegExp(`^${city}$`, "i") } }).toArray()
        console.log("the hospital data", hospitalData)
        return NextResponse.json({ hospitals: hospitalData })

    } catch (error) {
        return NextResponse.json({ message: error })
    }
}