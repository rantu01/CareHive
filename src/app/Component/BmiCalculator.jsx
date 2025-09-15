"use client";
import { useState } from "react";

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

  const calculateBMI = () => {
    let heightInMeters = 0;
    let weightInKg = 0;

    // Convert height
    if (heightUnit === "cm") {
      if (!heightCm) return;
      heightInMeters = heightCm / 100;
    } else {
      if (!heightFt) return;
      const totalInches = Number(heightFt) * 12 + Number(heightIn || 0);
      heightInMeters = totalInches * 0.0254; // inches to meters
    }

    // Convert weight
    if (weightUnit === "kg") {
      if (!weight) return;
      weightInKg = Number(weight);
    } else {
      if (!weight) return;
      weightInKg = Number(weight) * 0.453592; // lbs to kg
    }

    // BMI Calculation
    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory("Underweight");
      setAdvice("You are under the normal BMI range. Consider a balanced diet with more calories and consult a nutritionist.");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal weight");
      setAdvice("Great! You are in a healthy range. Maintain your lifestyle with balanced food and regular exercise.");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
      setAdvice("You are above the normal BMI range. Focus on a balanced diet, increase physical activity, and monitor your weight regularly.");
    } else {
      setCategory("Obese");
      setAdvice("Your BMI is in the obese range. It's important to consult a healthcare professional and follow a weight management plan.");
    }
  };

  // Helper for result color
  const getCategoryColor = () => {
    if (category === "Underweight") return "bg-blue-100 text-blue-700";
    if (category === "Normal weight") return "bg-green-100 text-green-700";
    if (category === "Overweight") return "bg-yellow-100 text-yellow-700";
    if (category === "Obese") return "bg-red-100 text-red-700";
    return "";
  };

  // Progress bar position (0–40 BMI range shown)
  const getProgressPosition = () => {
    if (!bmi) return "0%";
    const value = Math.min(Number(bmi), 40); // cap at 40
    return `${(value / 40) * 100}%`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        BMI Calculator
      </h2>

      {/* Height Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Height</label>
        <div className="flex items-center gap-2">
          <select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          >
            <option value="cm">cm</option>
            <option value="ft">ft/in</option>
          </select>

          {heightUnit === "cm" ? (
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter height in cm"
            />
          ) : (
            <div className="flex gap-2 flex-1">
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                placeholder="ft"
              />
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                placeholder="in"
              />
            </div>
          )}
        </div>
      </div>

      {/* Weight Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Weight</label>
        <div className="flex items-center gap-2">
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>

          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            placeholder={`Enter weight in ${weightUnit}`}
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateBMI}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Calculate BMI
      </button>

      {/* Result */}
      {bmi && (
        <div className="mt-6">
          <div className="text-center">
            <p className="text-lg font-semibold">
              Your BMI: <span className="text-blue-600">{bmi}</span>
            </p>
            <p
              className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${getCategoryColor()}`}
            >
              {category}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="relative w-full h-4 bg-gray-200 rounded-full">
              <div className="absolute left-0 top-0 h-4 w-1/4 bg-blue-300 rounded-l-full"></div>
              <div className="absolute left-1/4 top-0 h-4 w-1/4 bg-green-300"></div>
              <div className="absolute left-1/2 top-0 h-4 w-1/4 bg-yellow-300"></div>
              <div className="absolute left-3/4 top-0 h-4 w-1/4 bg-red-300 rounded-r-full"></div>

              {/* Marker */}
              <div
                className="absolute top-1/2 w-2 h-6 bg-black rounded-full -translate-y-1/2"
                style={{ left: getProgressPosition() }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          {/* Advice */}
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-sm text-gray-700">
            <p className="font-medium">Advice:</p>
            <p>{advice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
