import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;

    try {

        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("chellanges"); 

        const challenge = await collection.findOne({ _id: new ObjectId(id) });

        if (!challenge) {
            return NextResponse.json({ message: "Challenge not found" }, { status: 404 });
        }


        return NextResponse.json(challenge, { status: 200 });

    } catch (error) {
        console.error("Error fetching challenge:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    } 
}