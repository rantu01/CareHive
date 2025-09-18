"use client";
import { useState } from "react";

export default function HealthLog() {
  const [bmi, setBmi] = useState("");
  const [targetCal, setTargetCal] = useState("");
  const [todayCal, setTodayCal] = useState("");
  const [advice, setAdvice] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmiVal = parseFloat(bmi);
    const target = parseInt(targetCal);
    const today = parseInt(todayCal);

    let advices = [];

    // 🎯 BMI-based advice pool
    const bmiAdvice = {
      underweight: [
        "Your BMI is low. Add calorie-dense foods like nuts, milk, and rice.",
        "Try to eat 300–500 extra calories daily to reach a healthy weight.",
        "Increase protein intake to support muscle growth.",
      ],
      normal: [
        "Your BMI is normal. Maintain balance between calories and exercise.",
        "Keep a consistent meal schedule to stay healthy.",
        "Continue regular physical activity to keep your BMI stable.",
      ],
      overweight: [
        "Your BMI is high. Try portion control and reduce oily foods.",
        "Aim for at least 30 minutes of walking or exercise daily.",
        "Focus on high-fiber meals to feel full with fewer calories.",
      ],
      obese: [
        "Your BMI indicates obesity. Consider a professional health plan.",
        "Gradually reduce 500 calories per day for steady fat loss.",
        "Avoid sugary drinks and junk foods completely.",
      ],
    };

    // 🥗 Calorie intake advice pool
    const calorieAdvice = [];
    const diff = today - target;
    if (diff > 0) {
      calorieAdvice.push(
        `You consumed ${diff} calories more than your target. Reduce portions tomorrow.`,
        `Try burning an extra ${diff} calories with exercise.`,
        "Cut down late-night snacks to balance extra calories."
      );
    } else if (diff < 0) {
      calorieAdvice.push(
        `You consumed ${Math.abs(diff)} calories less than your target. Eat a bit more tomorrow.`,
        "Consider adding healthy snacks like fruits or yogurt.",
        "Increase portion sizes slightly to meet your energy needs."
      );
    } else {
      calorieAdvice.push(
        "Perfect! You matched your target calories today.",
        "Keep up this consistency for long-term results.",
        "This balance will help you reach your fitness goals."
      );
    }

    // 🌍 General advice pool
    const generalAdvice = [
      "Stay hydrated with 7–8 glasses of water daily.",
      "Aim for at least 7 hours of sleep.",
      "Avoid skipping breakfast for stable energy levels.",
      "Eat more fruits and vegetables for vitamins.",
      "Do light stretching to improve flexibility.",
      "Reduce screen time before sleep for better rest.",
      "Track your meals to stay consistent.",
    ];

    // 🔀 Random advice selection
    if (bmiVal < 18.5) {
      advices.push(bmiAdvice.underweight[Math.floor(Math.random() * bmiAdvice.underweight.length)]);
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      advices.push(bmiAdvice.normal[Math.floor(Math.random() * bmiAdvice.normal.length)]);
    } else if (bmiVal >= 25 && bmiVal < 30) {
      advices.push(bmiAdvice.overweight[Math.floor(Math.random() * bmiAdvice.overweight.length)]);
    } else if (bmiVal >= 30) {
      advices.push(bmiAdvice.obese[Math.floor(Math.random() * bmiAdvice.obese.length)]);
    }

    advices.push(calorieAdvice[Math.floor(Math.random() * calorieAdvice.length)]);

    // pick 3 random general tips without repeating
    const shuffled = generalAdvice.sort(() => 0.5 - Math.random());
    advices.push(...shuffled.slice(0, 3));

    setAdvice(advices.slice(0, 5)); // ensure max 5
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Health Log</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your BMI</label>
          <input
            type="number"
            step="0.1"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target Calorie Intake</label>
          <input
            type="number"
            value={targetCal}
            onChange={(e) => setTargetCal(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Today's Calorie Intake</label>
          <input
            type="number"
            value={todayCal}
            onChange={(e) => setTodayCal(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Advice
        </button>
      </form>

      {advice.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Health Log</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            {advice.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
