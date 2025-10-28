"use client";
import { useState } from "react";
import { SiGoogleassistant } from "react-icons/si";


export default function HealthLog() {
  const [bmi, setBmi] = useState("");
  const [targetCal, setTargetCal] = useState("");
  const [todayCal, setTodayCal] = useState("");
  const [advice, setAdvice] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const bmiVal = parseFloat(bmi);
  //   const target = parseInt(targetCal);
  //   const today = parseInt(todayCal);

  //   let advices = [];

  //   const bmiAdvice = {
  //     underweight: [
  //       "Your BMI is low. Add calorie-dense foods like nuts, milk, and rice.",
  //       "Try to eat 300–500 extra calories daily to reach a healthy weight.",
  //       "Increase protein intake to support muscle growth.",
  //     ],
  //     normal: [
  //       "Your BMI is within a healthy range. Maintain balanced meals and regular exercise.",
  //       "Keep a consistent meal schedule to sustain energy.",
  //       "Continue regular physical activity to maintain your BMI.",
  //     ],
  //     overweight: [
  //       "Your BMI is above normal. Focus on portion control and healthy meals.",
  //       "Aim for at least 30 minutes of moderate exercise daily.",
  //       "Include high-fiber foods to feel full with fewer calories.",
  //     ],
  //     obese: [
  //       "Your BMI indicates obesity. Consider consulting a health professional.",
  //       "Gradually reduce 500 calories per day for safe fat loss.",
  //       "Avoid sugary drinks and processed foods completely.",
  //     ],
  //   };

  //   const calorieAdvice = [];
  //   const diff = today - target;
  //   if (diff > 0) {
  //     calorieAdvice.push(
  //       `You consumed ${diff} calories more than your target. Adjust portions tomorrow.`,
  //       `Burn an extra ${diff} calories through activity.`,
  //       "Limit late-night snacks to balance your intake."
  //     );
  //   } else if (diff < 0) {
  //     calorieAdvice.push(
  //       `You consumed ${Math.abs(diff)} calories less than your target. Eat slightly more tomorrow.`,
  //       "Include healthy snacks like fruits or yogurt.",
  //       "Increase portion sizes moderately to meet energy needs."
  //     );
  //   } else {
  //     calorieAdvice.push(
  //       "Excellent! You met your daily calorie target.",
  //       "Maintain this balance for long-term health.",
  //       "Consistency like this supports your fitness goals."
  //     );
  //   }

  //   const generalAdvice = [
  //     "Stay hydrated with 7–8 glasses of water daily.",
  //     "Aim for 7–8 hours of sleep every night.",
  //     "Avoid skipping breakfast for stable energy levels.",
  //     "Eat a variety of fruits and vegetables for essential nutrients.",
  //     "Do light stretching or yoga to improve flexibility.",
  //     "Reduce screen time before bed for better rest.",
  //     "Track meals to maintain consistency and awareness.",
  //   ];

  //   if (bmiVal < 18.5) {
  //     advices.push(
  //       bmiAdvice.underweight[Math.floor(Math.random() * bmiAdvice.underweight.length)]
  //     );
  //   } else if (bmiVal >= 18.5 && bmiVal < 25) {
  //     advices.push(
  //       bmiAdvice.normal[Math.floor(Math.random() * bmiAdvice.normal.length)]
  //     );
  //   } else if (bmiVal >= 25 && bmiVal < 30) {
  //     advices.push(
  //       bmiAdvice.overweight[Math.floor(Math.random() * bmiAdvice.overweight.length)]
  //     );
  //   } else if (bmiVal >= 30) {
  //     advices.push(
  //       bmiAdvice.obese[Math.floor(Math.random() * bmiAdvice.obese.length)]
  //     );
  //   }

  //   advices.push(calorieAdvice[Math.floor(Math.random() * calorieAdvice.length)]);
  //   const shuffled = generalAdvice.sort(() => 0.5 - Math.random());
  //   advices.push(...shuffled.slice(0, 3));

  //   setAdvice(advices.slice(0, 5));
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/healthlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bmi, targetCal, todayCal }),
      });

      const data = await res.json();

      if (res.ok) {
        // Split into sentences or keep as one paragraph
        const aiTips = data.message.split(/(?<=\.)\s+/).slice(0, 5);
        setAdvice(aiTips);
      } else {
        setAdvice(["Sorry, something went wrong while fetching AI advice."]);
      }
    } catch (err) {
      console.error(err);
      setAdvice(["Error connecting to the AI service. Please try again."]);
    }
  };





  const mainBoxShadow = { boxShadow: "0 12px 30px -5px rgba(156,163,175,0.3)" };

  return (
    <div className="max-w-4xl w-full mx-auto mt-16 px-4">
      {/* Title & Description */}
      <h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-4 animate-fadeIn"
        style={{ color: "var(--color-secondary)" }}
      >
        Daily AI Health Tracker
      </h2>
      <p
        className="text-center text-base md:text-lg mb-10 animate-fadeIn delay-200 max-w-4xl mx-auto"
        style={{ color: "var(--text-color-all)" }}
      >
        Monitor your BMI and daily calorie intake with ease. Receive professional, personalized
        advice from AI to maintain a healthy lifestyle and reach your fitness goals efficiently.
      </p>

      {/* Form + Advice Container */}
      <div
        className="p-10 rounded-3xl mb-12 animate-fadeInUp shadow-lg"
        style={{ background: "var(--dashboard-bg)", ...mainBoxShadow }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input fields */}
          <div className="group relative">
            <label
              className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-[var(--color-secondary)]"
              style={{ color: "var(--text-color-all)" }}
            >
              Your BMI
            </label>
            <input
              type="number"
              step="0.1"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              placeholder="Enter your BMI"
              required
              className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
              style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
            />
          </div>

          <div className="group relative">
            <label
              className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-[var(--color-secondary)]"
              style={{ color: "var(--text-color-all)" }}
            >
              Target Calorie Intake
            </label>
            <input
              type="number"
              value={targetCal}
              onChange={(e) => setTargetCal(e.target.value)}
              placeholder="Enter your target calories"
              required
              className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
              style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
            />
          </div>

          <div className="group relative">
            <label
              className="block text-sm font-medium mb-2 transition-colors group-focus-within:text-[var(--color-secondary)]"
              style={{ color: "var(--text-color-all)" }}
            >
              Today's Calorie Intake
            </label>
            <input
              type="number"
              value={todayCal}
              onChange={(e) => setTodayCal(e.target.value)}
              placeholder="Enter today's calories"
              required
              className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
              style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
            />
          </div>

          {/* <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300"
            style={{ background: "var(--color-secondary)" }}
          >
            Get Personalized Advice from AI
          </button> */}


          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 flex items-center justify-center gap-2"
            style={{ background: "var(--color-secondary)" }}
          >
            <SiGoogleassistant className="text-white text-xl animate-pulse" />
            Get Personalized Advice from AI
          </button>

        </form>

        {/* Advice Cards */}
        {advice.length > 0 && (
          <div className="mt-10 space-y-5">
            {advice.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl border shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                style={{
                  borderColor: "var(--dashboard-border)",
                  background: "var(--dashboard-bg)",
                  color: "var(--text-color-all)",
                }}
              >
                <span
                  className="w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center font-bold animate-pulse"
                  style={{ background: "var(--color-secondary)", color: "var(--color-white)" }}
                >
                  ✓
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
