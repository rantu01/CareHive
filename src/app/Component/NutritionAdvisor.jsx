"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

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
  const [errors, setErrors] = useState(false); // validation state

  const handleChange = (e) => {
    setMealLog({ ...mealLog, [e.target.name]: e.target.value });
    setErrors(false); // clear errors on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check at least one input filled
    const anyFilled = Object.values(mealLog).some((val) => val.trim() !== "");
    if (!anyFilled) {
      setErrors(true);
      setSubmitted(false);
      return;
    }
    setErrors(false);
    setUserSuggestions(getRandomSuggestions(language));
    setSubmitted(true);
    setMacroData({
      protein: Math.floor(Math.random() * 50) + 30,
      carbs: Math.floor(Math.random() * 150) + 50,
      fat: Math.floor(Math.random() * 40) + 10,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 relative">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-green-600">
        AI-Powered Nutrition Advisor 🍎
      </h1>

      {/* Language Toggle */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setLanguage("bn")}
          className={`px-5 py-2 rounded-xl border shadow font-medium ${
            language === "bn" ? "bg-green-600 text-white" : "bg-white text-green-600"
          }`}
        >
          বাংলা
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-5 py-2 rounded-xl border shadow font-medium ${
            language === "en" ? "bg-green-600 text-white" : "bg-white text-green-600"
          }`}
        >
          English
        </button>
      </div>

      {/* Meal Logging Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
          <div key={meal}>
            <label className="block font-medium capitalize">
              {language === "bn"
                ? meal === "snacks"
                  ? "স্ন্যাকস"
                  : meal.charAt(0).toUpperCase() + meal.slice(1)
                : meal.charAt(0).toUpperCase() + meal.slice(1)}
              :
            </label>
            <input
              type="text"
              name={meal}
              value={mealLog[meal]}
              onChange={handleChange}
              placeholder={
                language === "bn"
                  ? `আপনার ${meal} খাবারের নাম লিখুন`
                  : `Enter your ${meal} items`
              }
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors && mealLog[meal].trim() === "" ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        ))}
        {errors && (
          <p className="text-red-500 text-sm">
            {language === "bn" ? "কমপক্ষে একটি meal input দিন।" : "Please fill at least one meal."}
          </p>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          {language === "bn" ? "সাবমিট" : "Submit"}
        </button>
      </form>

      {/* AI Suggestions */}
      {submitted && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">
            {language === "bn" ? "AI পরামর্শ:" : "AI Suggestions:"}
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            {userSuggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Macro Breakdown with motion */}
      {submitted && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">
            {language === "bn" ? "ম্যাক্রো বিশ্লেষণ:" : "Macro Breakdown:"}
          </h2>
          <div className="space-y-4">
            {Object.entries(macroData).map(([macro, value]) => (
              <div key={macro} className="flex items-center space-x-2">
                <span className="capitalize w-20">
                  {language === "bn"
                    ? macro === "protein"
                      ? "প্রোটিন"
                      : macro === "carbs"
                      ? "কার্ব"
                      : "চর্বি"
                    : macro.charAt(0).toUpperCase() + macro.slice(1)}
                  :
                </span>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-4 rounded-full ${
                      macro === "protein"
                        ? "bg-blue-500"
                        : macro === "carbs"
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 150) * 100}%` }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
                <span className="w-10 text-right">{value}g</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionAdvisor;
