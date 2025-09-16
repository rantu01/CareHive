"use client";
import { useState, useEffect } from "react";

const BmiCalculator = () => {
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true); // Animate title on mount
  }, []);

  const calculateBMI = () => {
    let heightInMeters = 0;
    let weightInKg = 0;

    if (heightUnit === "cm") {
      if (!heightCm) return;
      heightInMeters = heightCm / 100;
    } else {
      if (!heightFt) return;
      const totalInches = Number(heightFt) * 12 + Number(heightIn || 0);
      heightInMeters = totalInches * 0.0254;
    }

    if (weightUnit === "kg") {
      if (!weight) return;
      weightInKg = Number(weight);
    } else {
      if (!weight) return;
      weightInKg = Number(weight) * 0.453592;
    }

    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory("Underweight");
      setAdvice(
        "You are under the normal BMI range. Consider a balanced diet with more calories and consult a nutritionist."
      );
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal weight");
      setAdvice(
        "Great! You are in a healthy range. Maintain your lifestyle with balanced food and regular exercise."
      );
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
      setAdvice(
        "You are above the normal BMI range. Focus on a balanced diet, increase physical activity, and monitor your weight regularly."
      );
    } else {
      setCategory("Obese");
      setAdvice(
        "Your BMI is in the obese range. It's important to consult a healthcare professional and follow a weight management plan."
      );
    }
  };

  const getCategoryColor = () => {
    if (category === "Underweight") return "bg-[#4682B4]/20 text-[#4682B4]";
    if (category === "Normal weight") return "bg-[#4682B4]/30 text-[#4682B4]";
    if (category === "Overweight") return "bg-yellow-200 text-[#4682B4]";
    if (category === "Obese") return "bg-red-200 text-[#4682B4]";
    return "";
  };

  const getProgressPosition = () => {
    if (!bmi) return "0%";
    const value = Math.min(Number(bmi), 40);
    return `${(value / 40) * 100}%`;
  };

  // Shadow only for main container
  const mainBoxShadow = { boxShadow: "0 10px 25px -5px #9CA3AF" };

  return (
    <div
      className="max-w-2xl w-full mx-auto mt-12 p-8 bg-white rounded-3xl mb-12"
      style={mainBoxShadow}
    >
      {/* Animated Title */}
      <h2
        className={`text-xl font-medium text-center mb-10 transition-all duration-1000 text-gray-400 ${
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        BMI Measurement & Guidance
      </h2>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Height */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-600">Height</label>
          <div className="flex items-center gap-3">
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="px-4 py-2 border rounded-lg outline-none transition w-28"
            >
              <option value="cm">cm</option>
              <option value="ft">ft/in</option>
            </select>
            {heightUnit === "cm" ? (
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="flex-1 px-2 py-2 border rounded-lg outline-none transition"
                placeholder="Enter height in cm"
              />
            ) : (
              <div className="flex gap-2 flex-1">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-lg outline-none transition"
                  placeholder="ft"
                />
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-lg outline-none transition"
                  placeholder="in"
                />
              </div>
            )}
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-600">Weight</label>
          <div className="flex items-center gap-3">
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="px-4 py-2 border rounded-lg outline-none transition w-28"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-2 py-2 border rounded-lg outline-none transition"
              placeholder={`Enter weight in ${weightUnit}`}
            />
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateBMI}
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#4682B4] to-gray-600 shadow-lg hover:shadow-xl hover:scale-105 transition transform mb-8"
      >
        Calculate BMI
      </button>

      {/* Result Section */}
      {bmi && (
        <div className="space-y-6">
          {/* BMI & Category */}
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-600">
              Your BMI: <span style={{ color: "var(--color-calm-blue)" }}>{bmi}</span>
            </p>
            <p
              className={`inline-block mt-3 px-6 py-2 rounded-full text-sm font-medium shadow-lg ${getCategoryColor()}`}
            >
              {category}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-5 rounded-full"
              style={{
                width: getProgressPosition(),
                background: "linear-gradient(90deg, #4682B4, #4B5563)",
                transition: "width 0.6s ease-in-out",
              }}
            ></div>
            <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          {/* Advice */}
          <div
            className="p-6 rounded-2xl border bg-gray-50 shadow-md text-sm font-medium"
            style={{ color: "var(--color-black)" }}
          >
            {advice}
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
