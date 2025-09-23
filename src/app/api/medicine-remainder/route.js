import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {

  try {


    const data = await request.json()

    const userId = data?.userId


    console.log("I am the 3", userId)

    const client = await clientPromise;
    const db = client.db("carehive");
    const medicineCollection = db.collection("medicineRemainder")

    const insertedMedicineData = await medicineCollection.updateOne({ userId: userId }, {
      $push: {
        medicineData: {
          medicineName: data.medicineData?.medicineName,
          douseType: data.medicineData?.douseType,
          douseQty: data.medicineData?.douseQty,
          status: "pending"
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

    console.log("zxzxzxxz",userId)
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