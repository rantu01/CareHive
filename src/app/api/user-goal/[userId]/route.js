import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";



export async function GET(req, { params }) {
    try {
        const { userId } = await params;

        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("userGoal");


        const userGoal = await collection.find({ userId }).toArray()

        console.log(userGoal)
        return NextResponse.json(userGoal);

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {

    try {
        const { userId, id } = await params
        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("userGoal");

        const userGoal = await collection.find({ userId, "goalData.id": id })

        console.log(userGoal)

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}



export async function POST(req, { params }) {
    try {

        const body = await req.json()
        const client = await clientPromise;
        const db = client.db("carehive")
        const collection = db.collection("userGoal")
        const newGoal = await collection.insertOne(body)
        console.log(newGoal)

        
        return NextResponse.json(
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
