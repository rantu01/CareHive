import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET → fetch all notifications for a user
export async function GET(req) {
    try {
        // 1. Extract the 'email' query parameter from the URL
        const { searchParams } = new URL(req.url);

        console.log("the seach params is", searchParams)
        const userId = searchParams.get('userId');


        const client = await clientPromise;
        const db = client.db("carehive");
        const premiumUserCollection = db.collection("premiumUser");


        const premiumUser = await premiumUserCollection
            .find({ userId: userId }).sort({ createdAt: -1 }).toArray();


        return NextResponse.json({
            success: true,
            premiumUserStatus: premiumUser[0]?.isPremium
        });

    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error: " + error.message },
            { status: 500 }
        );
    }
}