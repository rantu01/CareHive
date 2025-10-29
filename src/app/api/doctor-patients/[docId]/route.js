// src/app/api/doctor-patients/[doctorId]/route.js
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // (Note: in your Next.js version you used `await params` earlier)
    const { docId } = await params; // keep pattern consistent with your environment

    if (!docId) {
      return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
    }

    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
    const perPage = Math.max(1, Number(url.searchParams.get("perPage") || "12"));
    const search = (url.searchParams.get("search") || "").trim();

    const client = await clientPromise;
    const db = client.db("carehive");
    const collection = db.collection("userAppointments");

    // Build match stage for doctor
    const baseMatch = { "appointmentDetails.doctorId": docId };

    // If search provided, we will filter appointmentDetails.patientName or patientEmail
    // We'll use case-insensitive regex
    let searchMatch = {};
    if (search) {
      const regex = { $regex: search, $options: "i" };
      // We must match at appointmentDetails level: at least one appointmentDetail matches search
      searchMatch = {
        $or: [
          { "appointmentDetails.patientName": regex },
          { "appointmentDetails.patientEmail": regex },
          { "appointmentDetails.userId": regex }
        ]
      };
    }

    // Aggregation pipeline with facet: one for paged results, one for total count
    const pipeline = [
      { $unwind: "$appointmentDetails" },
      { $match: { $and: [baseMatch, ...(search ? [searchMatch] : [])] } },

      // group by patient (userId) -- collect their matching appointmentDetails
      {
        $group: {
          _id: "$appointmentDetails.userId",
          patientName: { $first: "$appointmentDetails.patientName" },
          patientEmail: { $first: "$appointmentDetails.patientEmail" },
          userId: { $first: "$appointmentDetails.userId" },
          appointmentHistory: { $push: "$appointmentDetails" },
          // use createdAt field if present, otherwise use bookedAt
          lastBookedAt: {
            $max: {
              $ifNull: ["$appointmentDetails.createdAt", "$appointmentDetails.bookedAt"]
            }
          }
        }
      },

      // Project necessary fields and compute lastBookedSlot & totalAppointments
      {
        $project: {
          _id: 0,
          patientName: 1,
          patientEmail: 1,
          userId: 1,
          appointmentHistory: 1,
          lastBookedAt: 1,
          lastBookedSlot: {
            $arrayElemAt: [
              "$appointmentHistory.bookedSlot",
              { $subtract: [{ $size: "$appointmentHistory" }, 1] }
            ]
          },
          totalAppointments: { $size: "$appointmentHistory" }
        }
      },

      // Sort by lastBookedAt descending
      { $sort: { lastBookedAt: -1 } },

      // Facet for pagination + total
      {
        $facet: {
          data: [
            { $skip: (page - 1) * perPage },
            { $limit: perPage }
          ],
          meta: [
            { $count: "total" }
          ]
        }
      },

      // unwind meta to make it easier to read (may be empty)
      {
        $unwind: {
          path: "$meta",
          preserveNullAndEmptyArrays: true
        }
      },

      // Final reshape
      {
        $project: {
          patients: "$data",
          total: { $ifNull: ["$meta.total", 0] }
        }
      }
    ];

    const agg = await collection.aggregate(pipeline).toArray();

    // agg is an array with single element (or empty)
    const result = agg[0] || { patients: [], total: 0 };

    return NextResponse.json({
      patients: result.patients,
      total: result.total,
      page,
      perPage,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}
