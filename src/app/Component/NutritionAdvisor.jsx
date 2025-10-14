"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const suggestionsPool = {
  bn: [
    "আপনি প্রোটিন কম খাচ্ছেন, দুপুরে ডাল/চিকেন বাড়াতে পারেন।",
    "আজকার Carb বেশি হয়েছে, রাতের খাবারে veggies বেশি রাখুন।",
    "আপনি দুপুর পর্যন্ত পানি কম খেয়েছেন, এখন ১ গ্লাস পানি পান করুন।",
    "আজকের খাবারে ফ্যাট একটু বেশি হয়েছে, হালকা dinner রাখুন।",
    "আজকের খাবারে ভিটামিন কম, সবজি/ফল খান।",
  ],
  en: [
    "You are eating less protein, consider adding lentils/chicken for lunch.",
    "Carbs are high today, include more veggies in dinner.",
    "You have consumed less water by noon, drink 1 glass now.",
    "Fat intake is a bit high today, have a light dinner.",
    "Vitamin intake is low today, eat more vegetables/fruits.",
  ],
};

const getRandomSuggestions = (lang) => {
  const pool = [...suggestionsPool[lang]];
  const selected = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * pool.length);
    selected.push(pool[index]);
    pool.splice(index, 1);
  }
  return selected;
};

const NutritionAdvisor = () => {
  const [mealLog, setMealLog] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState("bn");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [macroData, setMacroData] = useState({});
  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    setMealLog({ ...mealLog, [e.target.name]: e.target.value });
    setErrors(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const anyFilled = Object.values(mealLog).some((val) => val.trim() !== "");
    if (!anyFilled) {
      setErrors(true);
      setSubmitted(false);
      return;
    }

    setErrors(false);
    setUserSuggestions(getRandomSuggestions(language));
    setMacroData({
      protein: Math.floor(Math.random() * 50) + 30,
      carbs: Math.floor(Math.random() * 150) + 50,
      fat: Math.floor(Math.random() * 40) + 10,
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
  };

  const mealLabels = {
    breakfast: { bn: "সকাল", en: "Breakfast" },
    lunch: { bn: "দুপুর", en: "Lunch" },
    dinner: { bn: "রাত", en: "Dinner" },
    snacks: { bn: "স্ন্যাকস", en: "Snacks" },
  };

  const macroLabels = {
    protein: { bn: "প্রোটিন", en: "Protein" },
    carbs: { bn: "কার্ব", en: "Carbs" },
    fat: { bn: "চর্বি", en: "Fat" },
  };

  const macroColors = {
    protein: "var(--color-calm-blue)",
    carbs: "var(--color-primary)",
    fat: "var(--color-black)",
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 rounded-3xl mt-10 font-[var(--font-primary)] shadow-lg"
      style={{ backgroundColor: "var(--dashboard-bg)", color: "var(--fourground-color)" }}
    >
      <h1
        className="text-3xl sm:text-4xl font-[var(--font-heading)] font-bold mb-6 text-center"
        style={{ color: "var(--color-primary)" }}
      >
        AI-Powered Nutrition Advisor 🍎
      </h1>

      {/* Language Toggle */}
      <div className="flex justify-center mb-6 space-x-4">
        {["bn", "en"].map((langOption) => (
          <button
            key={langOption}
            onClick={() => setLanguage(langOption)}
            className={`px-5 py-2 rounded-xl border shadow font-medium transition`}
            style={{
              backgroundColor:
                language === langOption ? "var(--color-primary)" : "var(--dashboard-bg)",
              color: language === langOption ? "var(--color-white)" : "var(--color-primary)",
              borderColor: "var(--dashboard-border)",
            }}
          >
            {langOption === "bn" ? "বাংলা" : "English"}
          </button>
        ))}
      </div>

      {/* Meal Logging Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(mealLog).map((meal) => (
          <div key={meal}>
            <label
              className="block font-medium capitalize mb-1"
              style={{ color: "var(--fourground-color)" }}
            >
              {mealLabels[meal][language]}:
            </label>
            <input
              type="text"
              name={meal}
              value={mealLog[meal]}
              onChange={handleChange}
              placeholder={
                language === "bn"
                  ? `আপনার ${mealLabels[meal][language]} লিখুন`
                  : `Enter your ${mealLabels[meal][language]}`
              }
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 transition"
              style={{
                borderColor: errors && mealLog[meal].trim() === "" ? "red" : "var(--dashboard-border)",
                color: "var(--fourground-color)",
              }}
            />
          </div>
        ))}

        {errors && (
          <p className="text-sm mt-1" style={{ color: "red" }}>
            {language === "bn" ? "কমপক্ষে একটি meal input দিন।" : "Please fill at least one meal."}
          </p>
        )}

        <button
          type="submit"
          className="px-6 py-2 rounded-xl font-semibold transition hover:scale-105"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
        >
          {language === "bn" ? "সাবমিট" : "Submit"}
        </button>
      </form>

      {/* Dismissible Suggestions & Macro */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="suggestions"
            className="mt-6 p-4 rounded-xl relative"
            style={{ backgroundColor: "var(--gray-color)", color: "var(--fourground-color)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-3xl font-bold text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            {/* AI Suggestions */}
            <h2 className="text-xl font-semibold mb-2">
              {language === "bn" ? "AI পরামর্শ:" : "AI Suggestions:"}
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              {userSuggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>

            {/* Macro Breakdown */}
            <h2 className="text-xl font-semibold mt-4 mb-2">
              {language === "bn" ? "ম্যাক্রো বিশ্লেষণ:" : "Macro Breakdown:"}
            </h2>
            <div className="space-y-4">
              {Object.entries(macroData).map(([macro, value]) => (
                <div key={macro} className="flex items-center space-x-2">
                  <span className="capitalize w-20">{macroLabels[macro][language]}:</span>
                  <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: "var(--dashboard-border)" }}>
                    <motion.div
                      className="h-4 rounded-full"
                      style={{ backgroundColor: macroColors[macro] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(value / 150) * 100}%` }}
                      transition={{ duration: 1.2 }}
                    />
                  </div>
                  <span className="w-10 text-right">{value}g</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutritionAdvisor;
