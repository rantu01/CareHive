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
        const { userId } = await params
        const body = await req.json()
        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("userGoal");

        if (body?.actionType === "add-goal") {
            const userGoal = await collection.updateOne({ userId: userId }, {
                $push: {
                    goalData: {
                        id: body?.id,
                        title: body?.title,
                        goal: parseInt(body?.goal),
                        completed: parseInt(body?.completed),
                        percentage:0,
                    }

                }
            }, { upsert: true })
            console.log(userGoal)
        }

        if (body?.actionType === 'update-completed') {
            const result = await collection.updateOne(
                { userId },
                {
                    $set: {
                        "goalData.$[goal].completed": body?.completed,
                        "goalData.$[goal].percentage": parseInt(((body?.completed)/(body?.target))*100),
                    }
                },
                { arrayFilters: [{ "goal.id": body?.id }], upsert: false }
            );

            console.log(result)
        }




        return NextResponse.json(
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    try {
        const { userId } = await params;
        const body = await req.json()
        console.log(body)

        const client = await clientPromise;
        const db = client.db("carehive");
        const collection = db.collection("userGoal");

        console.log(body?.id)

        const deleteGoal = await collection.updateOne({ userId },

            { $pull: { goalData: { id: body.id } } })

        console.log(deleteGoal)
        return NextResponse.json(deleteGoal);

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}