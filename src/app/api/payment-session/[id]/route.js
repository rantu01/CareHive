import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function GET(req, { params }) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.id, {
      expand: ["payment_intent"],
    });
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
