"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question: "How often should I exercise for optimal health?",
    answer:
      "Experts recommend at least 150 minutes of moderate-intensity exercise per week, including both cardio and strength training.",
  },
  {
    question: "What foods are best for a balanced diet?",
    answer:
      "A balanced diet includes vegetables, fruits, whole grains, lean proteins, and healthy fats while limiting processed foods and added sugars.",
  },
  {
    question: "How much water should I drink daily?",
    answer:
      "It's recommended to drink about 8 glasses (2 liters) of water daily, but it may vary depending on activity level and climate.",
  },
  {
    question: "How can I manage stress effectively?",
    answer:
      "Regular exercise, meditation, deep breathing, and maintaining social connections can help reduce stress levels.",
  },
];

const QuestionSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Section Title */}
       <div className="relative z-10 text-center mb-12">
    <div className="inline-flex items-center gap-3 mb-4 justify-center">
      <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
      <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
        FAQ
      </span>
      <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
    </div>

    <h2 className="text-4xl font-bold mb-4 text-[var(--color-primary)] flex items-center justify-center gap-3">
      <span className="text-4xl">❓</span>
      Frequently Asked Questions
      <span className="text-4xl">💡</span>
    </h2>

    <p className="text-lg text-[var(--fourground-color)] opacity-80 max-w-2xl mx-auto">
      Find answers to the most common questions about maintaining your health and wellness.
    </p>
  </div>
      <div className="space-y-6">
        {questions.map((item, index) => (
          <div key={index} className="relative group">
            {/* Blurry Filter Border */}
            <div
              className="absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              style={{ backgroundColor: "var(--color-primary)" }}
            ></div>

            <div
              className="relative p-6 rounded-2xl transition-all duration-500 shadow-md hover:shadow-lg"
              style={{
                backgroundColor: "var(--dashboard-bg)",
                border: "1px solid var(--dashboard-border)",
                fontFamily: "var(--font-primary)",
                color: "var(--fourground-color)",
              }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left flex justify-between items-center focus:outline-none"
                style={{
                  color: "var(--fourground-color)",
                  fontFamily: "var(--font-primary)",
                  backgroundColor: "transparent",
                }}
              >
                <span className="font-medium">{item.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestionSection;
