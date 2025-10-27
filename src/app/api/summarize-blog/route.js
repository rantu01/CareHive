import { summarizePrompt } from "@/app/utils/blog-summarizer-prompt";
import { NextResponse } from "next/server"
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY)


export const POST = async (req) => {
    const { blogDetails } = await req.json()
    try {

        return NextResponse.json({ summarizeText: "aiResponseText" })
    } catch (error) {
        console.error("Error generating Gemini response:", error.message);
        return NextResponse.json({ error: "something happen wrong please try again" })
    }
}

