// src/app/api/dashboard-ai/route.js
import axios from "axios";
import { NextResponse } from "next/server";

function buildPrompt(userStats) {
  return `You are a concise, safe health assistant.

Input: A JSON array of the user's latest vitals.

Output: Return exactly a JSON array of 4 short health tips (each 1–2 sentences). 
The output must be valid JSON (an array of strings) and nothing else.

User data:
${JSON.stringify(userStats, null, 2)}

Requirements:
- Output exactly this format: ["tip1", "tip2", "tip3", "tip4"]
- Do NOT include \`\`\`json or any code fences in your answer.
- Do NOT add any explanations or extra text.
- Tips should be practical and specific where possible.
- If any measurement looks dangerously abnormal, include "consult a doctor".
- Keep language simple and neutral.`;
}


export async function POST(req) {
    try {
        console.log("I am hitted");

        const body = await req.json();
        const prompt = buildPrompt(body?.userStats);


        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt || 'Explain how AI works in a few words',
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': `${process.env.NEXT_PUBLIC_OPEN_AI}`,
                },
            }
        );

        const aiResponse = response?.data?.candidates[0]?.content?.parts[0]?.text;
        console.log(aiResponse)
        console.log(typeof aiResponse)

        return NextResponse.json(aiResponse);
    } catch (error) {
        console.error("AI error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
