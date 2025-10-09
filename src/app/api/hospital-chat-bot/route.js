import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = await clientPromise;

  try {
    const body = await req.json();
    const { userMessage } = body;

    console.log("next js body:", body);

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.NEXT_PUBLIC_OPEN_AI}`,
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
                  text: `You are a helpful hospital assistant of CareHive. Context: You work for a hospital and help patients with information about services, appointments, general health questions, and directions. Be professional, empathetic, and concise. User query: ${userMessage.trim()}.`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await geminiResponse.json();
    const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t generate a response.";

    return NextResponse.json({ message: aiResponseText });
  } catch (error) {
    console.error("Server error in /ai-message:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
