import { NextResponse } from "next/server"
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY)


export const POST = async (req) => {

    try {
        const data = await req.params
        console.log(data)

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ "error": error })
    }
}

