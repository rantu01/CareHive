import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { healthGoal } = body;

    console.log("User health input:", healthGoal);

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
                  text: `You are a professional nutritionist and health assistant for CareHive. 
User goal or condition: ${healthGoal.trim()}

Your task:
1. Suggest 3 food types or dishes that are ideal for this user’s condition or goal.
2. Explain briefly why each one is beneficial (max 2 sentences each).
3. Keep the tone friendly, informative, and medically appropriate.
4. Respond in this format:
- 🥗 **Food Name**: short benefit reason.`,
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
      return NextResponse.json({ error: "AI request failed" }, { status: 500 });
    }

    const data = await geminiResponse.json();
    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't suggest any foods right now.";

    return NextResponse.json({ message: aiText });
  } catch (error) {
    console.error("Error in /api/health-recipe-ai:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
