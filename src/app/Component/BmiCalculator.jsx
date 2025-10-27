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
    setTitleVisible(true);
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
    if (category === "Underweight")
      return "bg-[color:var(--color-secondary)]/20 text-[color:var(--color-secondary)]";
    if (category === "Normal weight")
      return "bg-[color:var(--color-secondary)]/30 text-[color:var(--color-secondary)]";
    if (category === "Overweight")
      return "bg-yellow-200 text-[color:var(--color-secondary)]";
    if (category === "Obese")
      return "bg-red-200 text-[color:var(--color-secondary)]";
    return "";
  };

  const getProgressPosition = () => {
    if (!bmi) return "0%";
    const value = Math.min(Number(bmi), 40);
    return `${(value / 40) * 100}%`;
  };

  const mainBoxShadow = { boxShadow: "0 10px 25px -5px #9CA3AF" };

  return (
    <div
      className="max-w-2xl w-full mx-auto mt-12 p-8 rounded-3xl mb-12"
      style={{
        ...mainBoxShadow,
        background: "var(--dashboard-bg)",
        color: "var(--text-color-all)",
      }}
    >
      {/* Title */}
      <h2
        className={`text-xl font-medium text-center mb-10 transition-all duration-1000 ${
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
        style={{ color: "var(--text-color-all)" }}
      >
        BMI Measurement & Guidance
      </h2>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Height */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color-all)" }}>
            Height
          </label>
          <div className="flex items-center gap-3">
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="px-4 py-2 border rounded-lg outline-none transition w-28"
              style={{ borderColor: "var(--dashboard-border)" }}
            >
              <option value="cm">cm</option>
              <option value="ft">ft/in</option>
            </select>
            {heightUnit === "cm" ? (
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="flex-1 px-2 py-2 border w-1 rounded-lg outline-none transition"
                placeholder="Enter height in cm"
                style={{ borderColor: "var(--dashboard-border)" }}
              />
            ) : (
              <div className="flex gap-2 flex-1">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-lg outline-none transition"
                  placeholder="ft"
                  style={{ borderColor: "var(--dashboard-border)" }}
                />
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-lg outline-none transition"
                  placeholder="in"
                  style={{ borderColor: "var(--dashboard-border)" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color-all)" }}>
            Weight
          </label>
          <div className="flex items-center gap-0.5">
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="px-4 py-2 border rounded-lg outline-none transition w-28"
              style={{ borderColor: "var(--dashboard-border)" }}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-2 py-2 border w-3 rounded-lg outline-none transition"
              placeholder={`Enter weight in ${weightUnit}`}
              style={{ borderColor: "var(--dashboard-border)" }}
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={calculateBMI}
        className="w-full py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition transform mb-8"
        style={{
          background: "linear-gradient(90deg, var(--color-secondary), var(--text-color-all))",
        }}
      >
        Calculate BMI
      </button>

      {/* Result */}
      {bmi && (
        <div className="space-y-6">
          {/* BMI & Category */}
          <div className="text-center">
            <p className="text-xl font-semibold" style={{ color: "var(--text-color-all)" }}>
              Your BMI: <span style={{ color: "var(--color-secondary)" }}>{bmi}</span>
            </p>
            <p
              className={`inline-block mt-3 px-6 py-2 rounded-full text-sm font-medium shadow-lg ${getCategoryColor()}`}
            >
              {category}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-5 rounded-full overflow-hidden shadow-inner"
               style={{ background: "var(--bg-color-all)" }}>
            <div
              className="absolute top-0 left-0 h-5 rounded-full"
              style={{
                width: getProgressPosition(),
                background: "linear-gradient(90deg, var(--color-secondary), var(--text-color-all))",
                transition: "width 0.6s ease-in-out",
              }}
            ></div>
            <div className="flex justify-between text-xs mt-1 px-1" style={{ color: "var(--text-color-all)" }}>
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          {/* Advice */}
          <div
            className="p-6 rounded-2xl border shadow-md text-sm font-medium"
            style={{
              background: "var(--bg-color-all)",
              borderColor: "var(--dashboard-border)",
              color: "var(--text-color-all)",
            }}
          >
            {advice}
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
