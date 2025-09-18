import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";



export async function GET(req, { params }) {
    try {
        const { userId } = await params;

        const body = await req.json();
        console.log(body)
        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("userGoal");


        const userGoal = await collection.find({ userId }).toArray()

        return NextResponse.json(userGoal);

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}


export async function POST(req, { params }) {
    try {
        const { userId } = await params;

        const body = await req.json();
        console.log(body)
        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("userGoal");

        // const result = await collection.insertOne()


        // return NextResponse.json(
        //   { success: true, modifiedCount: result.modifiedCount },
        //   { status: 200 }
        // );
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}