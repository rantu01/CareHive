import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId, challengeId, startDate } = await req.json();

        if (!userId || !challengeId || !startDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("participants");

        const today = new Date();
        const start = new Date(startDate);


        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());


        if (todayDateOnly >= startDateOnly) {
            return NextResponse.json(
                { error: "Challenge has already started. Cannot join." },
                { status: 400 }
            );
        }


        const existingUser = await collection.findOne({ userId });

        if (existingUser) {

            const alreadyJoined = existingUser.joinedChallenges?.some(
                (c) => c.challengeId === challengeId
            );

            if (alreadyJoined) {
                return NextResponse.json(
                    { error: "Already joined this challenge." },
                    { status: 400 }
                );
            }


            await collection.updateOne(
                { userId },
                {
                    $push: {
                        joinedChallenges: {
                            challengeId,
                            joinedAt: today.toISOString(),
                            startDate: start.toISOString(),
                            progress: 0,
                            status: "active",
                        }
                    }
                }
            );
        } else {

            await collection.insertOne({
                userId,
                joinedChallenges: [
                    {
                        challengeId,
                        joinedAt: today.toISOString(),
                        startDate: start.toISOString(),
                        progress: 0,
                        status: "active",
                    }
                ]
            });
        }

        return NextResponse.json({ message: "Joined successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error in joining challenge:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
