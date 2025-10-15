"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Target, TrendingUp, Sparkles, Zap, Scale, Brain, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

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
    setSubmitted(true);
    setMacroData({
      protein: Math.floor(Math.random() * 50) + 30,
      carbs: Math.floor(Math.random() * 150) + 50,
      fat: Math.floor(Math.random() * 40) + 10,
      fiber: Math.floor(Math.random() * 25) + 5,
    });

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
              <label className="font-semibold text-[var(--fourground-color)] capitalize flex items-center gap-2">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutritionAdvisor;