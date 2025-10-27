import { summarizePrompt } from "@/app/utils/blog-summarizer-prompt";
import { NextResponse } from "next/server"
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY)


export const POST = async (req) => {
    const { blogDetails } = await req.json()
    try {
        const GEMINI_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI; // safer naming — no NEXT_PUBLIC_ prefix

        if (!GEMINI_API_KEY) {
            throw new Error("Gemini API key is missing. Please check your environment variables.");
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `${summarizePrompt} ${blogDetails.trim()}.`,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini API error:", errorData);
            throw new Error("Failed to get response from Gemini API");
        }

        const data = await response.json();

        const aiResponseText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn’t generate a response.";

        console.log("Gemini send response", aiResponseText)
        return NextResponse.json({ summarizeText: "aiResponseText" })
    } catch (error) {
        console.error("Error generating Gemini response:", error.message);
        return NextResponse.json({ error: "something happen wrong please try again" })
    }
}

