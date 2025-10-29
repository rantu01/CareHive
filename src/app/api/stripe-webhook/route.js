
// File: src/app/api/stripe-webhook/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(req) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.NEXT_STRIPE_WEBHOOK_SECRET
        );

        // Only handle successful payments
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const metadata = session.metadata;

            console.log("I am inside the weebhook", metadata?.paymentType)
            console.log("I am inside the weebhook", metadata?.userId)
            const client = await clientPromise;
            const db = client.db("carehive");

            // ✅ Check payment type from metadata
            const paymentType = metadata.paymentType; // "appointment" or "premium"

            if (paymentType === "premium") {
                // Handle premium subscription
                await handlePremiumSubscription(db, metadata, session);
            } else if (paymentType === "appointment") {
                // Handle doctor appointment booking
                await handleAppointmentBooking(db, metadata, session);
            } else {
                console.warn("Unknown payment type:", paymentType);
            }
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("Webhook Error:", err);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
}

// Handle premium subscription
async function handlePremiumSubscription(db, metadata, session) {
    const usersCollection = db.collection("premiumUser");

    const updateResult = await usersCollection.updateOne(
        { _id: metadata.userId },
        {
            $set: {
                userId: metadata.userId,
                isPremium: true,
                premiumActivatedAt: new Date(),
                sessionId: session.id,
                paymentIntent: session.payment_intent,
            },
        },
        { upsert: true }
    );

    if (updateResult.modifiedCount > 0) {
        console.log("✅ User upgraded to premium:", metadata.userId);
    } else {
        console.error("❌ Failed to upgrade user to premium");
    }
}

// Handle appointment booking
async function handleAppointmentBooking(db, metadata, session) {
    const userAppointmentsCollection = db.collection("userAppointments");
    const doctorCollection = db.collection("doctors");

    const doctor = await doctorCollection.findOne({
        _id: new ObjectId(metadata.docId),
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    // Get current patient limit and total capacity
    const [day] = metadata.bookedSlot.split("-");
    const currentRemaining =
        parseInt(doctor.practiceInfo?.patientLimit?.[day]) || 0;
    const totalCapacity =
        parseInt(doctor.practiceInfo?.totalCapacity?.[day]) || currentRemaining;

    if (currentRemaining <= 0) {
        throw new Error(`No more slots available for ${day}`);
    }

    // Calculate serial number and new remaining
    const serialNo = totalCapacity - currentRemaining + 1;
    const newRemaining = currentRemaining - 1;

    // Update doctor's patient limit atomically
    const updateResult = await doctorCollection.updateOne(
        { _id: new ObjectId(metadata.docId) },
        {
            $set: {
                [`practiceInfo.patientLimit.${day}`]: newRemaining.toString(),
            },
        }
    );

    if (updateResult.modifiedCount === 0) {
        throw new Error("Slot was just taken by another user");
    }

    console.log("Webhook serial:", serialNo);

    const appointmentData = {
        userId: metadata.userId,
        doctorId: metadata.docId,
        doctorName: metadata.doctorName,
        bookedSlot: metadata.bookedSlot,
        hospitalName: metadata.hospitalName,
        hospitalId: metadata.hospitalId,
        specialization: metadata.specialization,
        doctorFee: metadata.fees,
        patientEmail: metadata.patientEmail,
        patientName: metadata.patientName,
        paymentStatus: "Paid",
        status: "upcoming",
        sessionId: session.id,
        meetLink: metadata.meetLink,
        paymentIntent: session.payment_intent,
        createdAt: new Date(),
        serialNo: serialNo,
    };

    console.log("Webhook appointment data:", appointmentData);

    // Save appointment
    const existing = await userAppointmentsCollection.findOne({
        userId: metadata.userId,
    });

    if (existing) {
        await userAppointmentsCollection.updateOne(
            { userId: metadata.userId },
            { $push: { appointmentDetails: appointmentData } }
        );
        console.log("✅ Appointment added to existing user");
    } else {
        await userAppointmentsCollection.insertOne({
            userId: metadata.userId,
            appointmentDetails: [appointmentData],
        });
        console.log("✅ New appointment record created");
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};