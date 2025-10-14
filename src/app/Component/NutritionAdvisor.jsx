"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { Apple, Target, TrendingUp, Sparkles, Zap, Scale, Brain, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
=======

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
>>>>>>> 65ef8342c4bca230232c6d1c91c60d3bb97208c3

const NutritionAdvisor = () => {
  const [mealLog, setMealLog] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [macroData, setMacroData] = useState({});
  const [errors, setErrors] = useState(false);
<<<<<<< HEAD

  // --- AI Fetch Function ---
  const fetchAiSuggestions = async (mealLog) => {
    const res = await axios.post("/api/dashboard-ai", { userStats: mealLog });
    let data = res.data;
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.error("JSON parse failed:", e);
        data = [];
      }
    }
    return data || [];
  };

  // --- useQuery for AI ---
  const {
    data: aiSuggestions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["aiNutrition", mealLog],
    queryFn: () => fetchAiSuggestions(mealLog),
    enabled: false, // only run when form submitted
  });
=======
>>>>>>> 65ef8342c4bca230232c6d1c91c60d3bb97208c3

  const handleChange = (e) => {
    setMealLog({ ...mealLog, [e.target.name]: e.target.value });
    setErrors(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const anyFilled = Object.values(mealLog).some((val) => val.trim() !== "");
    if (!anyFilled) {
      setErrors(true);
      setSubmitted(false);
      return;
    }

    setErrors(false);
<<<<<<< HEAD
    setSubmitted(true);
=======
    setUserSuggestions(getRandomSuggestions(language));
>>>>>>> 65ef8342c4bca230232c6d1c91c60d3bb97208c3
    setMacroData({
      protein: Math.floor(Math.random() * 50) + 30,
      carbs: Math.floor(Math.random() * 150) + 50,
      fat: Math.floor(Math.random() * 40) + 10,
      fiber: Math.floor(Math.random() * 25) + 5,
    });
<<<<<<< HEAD

    await refetch();
  };

  const resetForm = () => {
    setMealLog({
      breakfast: "",
      lunch: "",
      dinner: "",
      snacks: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="container mx-auto p-8 bg-[var(--dashboard-bg)] rounded-3xl shadow-xl border border-[var(--dashboard-border)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--color-primary)]/5 to-transparent rounded-full blur-2xl translate-y-16 -translate-x-16"></div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            AI Nutrition Analysis
          </span>
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)] flex items-center justify-center gap-3">
          <Apple className="w-8 h-8" />
          Nutrition Advisor
          <Sparkles className="w-8 h-8" />
        </h1>

        <p className="text-lg text-[var(--fourground-color)] opacity-80">
          Log your meals and receive AI-powered nutritional insights and personalized recommendations
        </p>
      </div>

      {/* Meal Logging Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
            <div key={meal} className="space-y-2">
              <label className="block font-semibold text-[var(--fourground-color)] capitalize flex items-center gap-2">
                <Target className="w-4 h-4 text-[var(--color-primary)]" />
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </label>
              <input
                type="text"
                name={meal}
                value={mealLog[meal]}
                onChange={handleChange}
                placeholder={`What did you have for ${meal}?`}
                className={`w-full border-2 rounded-xl p-4 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors && mealLog[meal].trim() === ""
                    ? "border-red-300 focus:ring-red-200"
                    : "border-[var(--dashboard-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-opacity-20"
                } bg-[var(--gray-color)]`}
              />
            </div>
          ))}
        </div>

        {errors && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl border border-red-200"
          >
            ⚠️ Please fill at least one meal to get personalized recommendations.
          </motion.p>
        )}

        <div className="flex gap-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="flex-1 bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--color-calm-blue)] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {isLoading ? "Analyzing..." : "Analyze My Nutrition"}
          </motion.button>

          {submitted && (
            <motion.button
              type="button"
              onClick={resetForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:bg-opacity-10 transition-all duration-300"
            >
              Start Over
            </motion.button>
          )}
        </div>
      </motion.form>

      {/* Results Section */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8 relative z-10"
          >
            {/* AI Suggestions */}
            <motion.div
              className="p-6 bg-[var(--gray-color)] rounded-2xl border border-[var(--dashboard-border)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)] flex items-center gap-3">
                <Brain className="w-6 h-6" />
                AI Nutrition Insights
              </h2>

              {/* Loading */}
              {isLoading && (
                <div className="text-center py-8">
                  <p className="text-[var(--color-primary)] font-medium">Analyzing your meal data...</p>
                </div>
              )}

              {/* Error */}
              {isError && (
                <div className="text-red-500 text-center py-8">
                  ⚠️ Failed to fetch AI suggestions. Try again later.
                </div>
              )}

              {/* AI Results */}
              {!isLoading && !isError && aiSuggestions.length > 0 && (
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[var(--dashboard-border)]"
                    >
                      <div className="w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-[var(--fourground-color)] leading-relaxed">
                        {suggestion}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Macro Breakdown */}
            <motion.div
              className="p-6 bg-[var(--gray-color)] rounded-2xl border border-[var(--dashboard-border)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)] flex items-center gap-3">
                <Scale className="w-6 h-6" />
                Nutritional Breakdown
              </h2>
              <div className="space-y-6">
                {Object.entries(macroData).map(([macro, value]) => (
                  <div key={macro} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[var(--fourground-color)] capitalize flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                        {macro}
                      </span>
                      <span className="font-bold text-[var(--color-primary)]">{value}g</span>
                    </div>
                    <div className="w-full bg-[var(--dashboard-border)] h-3 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-3 rounded-full ${
                          macro === "protein"
                            ? "bg-blue-500"
                            : macro === "carbs"
                            ? "bg-[var(--color-primary)]"
                            : macro === "fat"
                            ? "bg-amber-500"
                            : "bg-green-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(value /
                            (macro === "protein"
                              ? 100
                              : macro === "carbs"
                              ? 200
                              : macro === "fat"
                              ? 60
                              : 30)) * 100}%`,
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
=======
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
>>>>>>> 65ef8342c4bca230232c6d1c91c60d3bb97208c3
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutritionAdvisor;
