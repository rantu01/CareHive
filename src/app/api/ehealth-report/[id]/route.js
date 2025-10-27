import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const urlParts = req.url.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid report ID" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("reports");

    await collection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Report deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error deleting report" }), {
      status: 500,
    });
  }
}
