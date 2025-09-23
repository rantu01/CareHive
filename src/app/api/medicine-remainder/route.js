import { nanoid } from "nanoid";
import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {

  try {


    const data = await request.json()

    const userId = data?.userId

    const client = await clientPromise;
    const db = client.db("carehive");
    const medicineCollection = db.collection("medicineRemainder")

    const insertedMedicineData = await medicineCollection.updateOne({ userId: userId }, {
      $push: {
        medicineData: {
          medicineName: data.medicineData?.medicineName,
          douseType: data.medicineData?.douseType,
          douseQty: data.medicineData?.douseQty,
          status: "pending",
          id: nanoid(7)
        }
      }
    }, { upsert: true })


    return NextResponse.json(
      { status: 200 }
    );


  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch health stats data" },
      { status: 500 }
    );
  }

}

export async function GET(req, { params }) {
  try {

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("medicineRemainder");


    const userMedicine = await collection.find({ userId }).toArray()

    return NextResponse.json(userMedicine);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}




export async function DELETE(req, { params }) {
  try {


    // const { searchParams } = new URL(req.url);
    // const userId = searchParams.get("userId");


    const body = await req.json()
    console.log(body)

    const userId=body?.userId

    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("medicineRemainder");


    const deleteMedicine = await collection.updateOne({ userId },

      { $pull: { medicineData: { id: body.id } } })


    return NextResponse.json(deleteMedicine);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}