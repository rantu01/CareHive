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

    // BMI-based advice
    if (bmiVal < 18.5) {
      advices.push("Your BMI indicates underweight. Try to add more nutritious calories to your meals.");
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      advices.push("Your BMI is normal. Maintain a balanced diet and regular exercise.");
    } else if (bmiVal >= 25 && bmiVal < 30) {
      advices.push("Your BMI indicates overweight. Focus on portion control and more physical activity.");
    } else if (bmiVal >= 30) {
      advices.push("Your BMI indicates obesity. Consider consulting a healthcare provider for a tailored plan.");
    }

    // Calorie intake advice
    if (today > target) {
      advices.push("You consumed more than your target calories today. Try reducing snacks and sugary foods.");
    } else if (today < target - 200) {
      advices.push("You consumed less than your target calories. Ensure you are eating enough to stay energized.");
    } else {
      advices.push("Great job! Your calorie intake is very close to your target.");
    }

    // General health tips (always add to make total 5)
    advices.push("Stay hydrated by drinking at least 7–8 glasses of water daily.");
    advices.push("Make sure to get at least 7 hours of quality sleep.");
    advices.push("Include fruits and vegetables in your daily meals.");

    setAdvice(advices.slice(0, 5)); // only show 5
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
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Advice</h3>
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
