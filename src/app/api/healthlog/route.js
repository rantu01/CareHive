import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { bmi, targetCal, todayCal } = body;

    if (!bmi || !targetCal || !todayCal) {
      return NextResponse.json({ error: "Missing input values" }, { status: 400 });
    }

    const prompt = `
You are a professional AI health assistant of CareHive.
Analyze the user's BMI and calorie data and just provide *clear, concise, and personalized health recommendations including diet , workout sleep no need to give me anything more in answer , just give me wanted tips*.
Keep a friendly and supportive tone, not robotic.

User Data:
- BMI: ${bmi}
- Target Calories: ${targetCal}
- Today's Calories: ${todayCal}

Please include:
1. What type of food should user eat and which type of foods should user avoid and how much workout user need.
2. Which type of workout should user do and how much sleep user need.
3. A motivational note in the end.

Your reply should be in plain text (no markdown or bullet symbols).
    `;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_AI}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
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
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a personalized recommendation.";

    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error("Server error in /api/healthlog:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
