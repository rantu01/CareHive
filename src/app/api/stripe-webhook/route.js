// File: src/app/api/stripe-webhook/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(req) {




    const body = await req.text()
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

            const client = await clientPromise;
            const db = client.db("carehive");
            const userAppointmentsCollection = db.collection("userAppointments");
            const doctorCollection = db.collection("doctors");

            const doctor = await doctorCollection.findOne({ _id: new ObjectId(metadata.docId) });

            if (!doctor) {
                return NextResponse.json(
                    { error: "Doctor not found" },
                    { status: 404 }
                );
            }


            // 5️⃣ Get current patient limit and total capacity
            const [day] = metadata.bookedSlot.split("-");
            const currentRemaining = parseInt(doctor.practiceInfo?.patientLimit?.[day]) || 0;
            const totalCapacity = parseInt(doctor.practiceInfo?.totalCapacity?.[day]) || currentRemaining;



            if (currentRemaining <= 0) {
                return NextResponse.json(
                    { error: `No more slots available for ${day}` },
                    { status: 400 }
                );
            }

            // 6️⃣ Calculate serial number and new remaining
            const serialNo = totalCapacity - currentRemaining + 1; // First booking = 1
            const newRemaining = currentRemaining - 1;

            // 7️⃣ Update doctor's patient limit atomically
            const updateResult = await doctorCollection.updateOne(
                { _id: new ObjectId(metadata.docId) },
                { $set: { [`practiceInfo.patientLimit.${day}`]: newRemaining.toString() } }
            );

            if (updateResult.modifiedCount === 0) {
                return NextResponse.json(
                    { error: "Slot was just taken by another user, please try again" },
                    { status: 409 }
                );
            }

            console.log("web hook serial", serialNo)

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
                paymentIntent: session.payment_intent,
                createdAt: new Date(),
                serialNo: serialNo,
            };

            console.log("web hook appoinment data", appointmentData)

            // 9️⃣ Save appointment
            const existing = await userAppointmentsCollection.findOne({ userId: metadata.userId });


            if (existing) {
                await userAppointmentsCollection.updateOne(
                    { userId: metadata.userId },
                    { $push: { appointmentDetails: appointmentData } }
                );

                console.log("inserted")
            } else {
                await userAppointmentsCollection.insertOne({
                    userId: metadata.userId,
                    appointmentDetails: [appointmentData],
                });

                console.log("inserted2222222")
            }
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("Webhook Error:", err);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
