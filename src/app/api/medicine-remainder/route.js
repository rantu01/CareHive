export async function POST(request,{params}) {

  try {

    
    const {userId}=await params

    console.log(userId)

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carehive");
    const toDoCollection = db.collection("medicineRemainder")
    const userToDoList = await toDoCollection.insertOne({ userId: userId }).toArray();


    return NextResponse.json(userToDoList);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch health stats data" },
      { status: 500 }
    );
  }

}

