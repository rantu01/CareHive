

// import clientPromise from "@/app/lib/mongodb";
// import { NextResponse } from "next/server";

// // Create a new blog
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { title, category, content, author } = body;

//     if (!title || !category || !content || !author) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const collection = db.collection("blogs");

//     const newBlog = {
//       title,
//       category,
//       content,
//       author, // {email, name, uid}
//       status: "draft",
//       likes: [], // store user emails who liked
//       comments: [], // store { user, text, createdAt }
//       createdAt: new Date(),
//     };

//     const result = await collection.insertOne(newBlog);

//     return NextResponse.json({ success: true, blog: newBlog });
//   } catch (error) {
//     console.error("Error posting blog:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// // Fetch all blogs
// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const collection = db.collection("blogs");

//     const blogs = await collection.find({}).sort({ createdAt: -1 }).toArray();

//     return NextResponse.json({ success: true, blogs });
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// // Update blog interactions (like, comment)
// export async function PATCH(req) {
//   try {
//     const body = await req.json();
//     const { blogId, type, user, text } = body;
//     // type: "like" | "comment"
//     // user: { email, name }
//     // text: comment text (for comments only)

//     if (!blogId || !type || !user) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("healthDB");
//     const collection = db.collection("blogs");
//     const { ObjectId } = require("mongodb");

//     let update;

//     if (type === "like") {
//       // toggle like
//       const blog = await collection.findOne({ _id: new ObjectId(blogId) });
//       const alreadyLiked = blog.likes.includes(user.email);

//       if (alreadyLiked) {
//         update = { $pull: { likes: user.email } };
//       } else {
//         update = { $addToSet: { likes: user.email } };
//       }
//     } else if (type === "comment") {
//       if (!text) {
//         return NextResponse.json(
//           { error: "Comment text is required" },
//           { status: 400 }
//         );
//       }
//       const newComment = {
//         user,
//         text,
//         createdAt: new Date(),
//       };
//       update = { $push: { comments: newComment } };
//     }

//     const result = await collection.updateOne(
//       { _id: new ObjectId(blogId) },
//       update
//     );

//     return NextResponse.json({ success: true, result });
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Create a new blog
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, category, content, author } = body;

    if (!title || !category || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("blogs");

    const newBlog = {
      title,
      category,
      content,
      author,
      status: "draft",
      likes: [],
      comments: [],
      createdAt: new Date(),
    };

    await collection.insertOne(newBlog);

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Error posting blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Fetch all blogs
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("blogs");

    const blogs = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update blog interactions (like, comment)
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { blogId, type, user, text } = body;

    if (!blogId || !type || !user) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("blogs");

    let update;

    if (type === "like") {
      const blog = await collection.findOne({ _id: new ObjectId(blogId) });
      const alreadyLiked = blog.likes.includes(user.email);

      if (alreadyLiked) {
        update = { $pull: { likes: user.email } };
      } else {
        update = { $addToSet: { likes: user.email } };
      }
    } else if (type === "comment") {
      if (!text) {
        return NextResponse.json(
          { error: "Comment text is required" },
          { status: 400 }
        );
      }
      const newComment = {
        user,
        text,
        createdAt: new Date(),
      };
      update = { $push: { comments: newComment } };
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(blogId) },
      update
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update blog content
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();
    const { title, category, content } = body;

    if (!id || !title || !category || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("blogs");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, category, content } }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete blog
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("healthDB");
    const collection = db.collection("blogs");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

