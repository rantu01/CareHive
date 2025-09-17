// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;


const options = {};

if (!uri) {
  throw new Error("⚠️ Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev mode, use global so connection is not recreated on every hot reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In prod mode, create new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
