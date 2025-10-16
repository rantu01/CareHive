"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Lightbulb } from "lucide-react";

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
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 text-center w-full">
      {/* === Section Title === */}
      <div className="relative z-10 mb-12">
        <div className="inline-flex items-center gap-3 mb-4 justify-center">
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
        </div>

        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
          <HelpCircle className="w-10 h-10 text-[var(--color-primary)] opacity-80" />

          <span className="text-[var(--color-primary)]">
            Frequently Asked Questions
          </span>
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Subtle glow */}
            <div
              className="absolute inset-0 rounded-full bg-[var(--color-primary)] opacity-30"
              style={{ filter: "blur(15px)" }}
            ></div>

            {/* Icon Centered */}
            <Lightbulb className="relative w-10 h-10 text-[var(--color-primary)]" />
          </div>
        </h2>

        <p className="text-lg text-[var(--text-color-all)] opacity-80 max-w-4xl mx-auto">
          Find answers to the most common questions about maintaining your
          health and wellness. Get clear, concise guidance from our expert team.
        </p>
      </div>

      {/* === Question List (Full Width, Optimized Height) === */}
      <div className="space-y-6 w-full text-left">
        {questions.map((item, index) => (
          <div key={index} className="relative group w-full">
            {/* Soft Glow Border */}
            <div
              className="absolute -inset-0.5 rounded-2xl blur opacity-40 transition-opacity duration-300"
              style={{ backgroundColor: "var(--color-primary)" }}
            ></div>

            <div
              className="relative p-4 md:p-6 rounded-2xl transition-all duration-500 shadow-md hover:shadow-lg w-full"
              style={{
                backgroundColor: "var(--dashboard-bg)",
                border: "1px solid var(--dashboard-border)",
                fontFamily: "var(--font-primary)",
                color: "var(--text-color-all)",
              }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left flex justify-between items-center focus:outline-none"
                style={{ backgroundColor: "transparent" }}
              >
                <span className="font-medium text-lg md:text-xl">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl"
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
                    className="mt-4 text-sm md:text-base leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* === Flicker Animation for Lightbulb === */}

      <style jsx>{`
        @keyframes light-glow {
          0%,
          100% {
            opacity: 0.7;
            filter: drop-shadow(0 0 8px var(--color-primary))
              drop-shadow(0 0 16px var(--color-primary))
              drop-shadow(0 0 24px var(--color-primary));
          }
          25% {
            opacity: 1;
            filter: drop-shadow(0 0 16px var(--color-primary))
              drop-shadow(0 0 32px var(--color-primary))
              drop-shadow(0 0 48px var(--color-primary));
          }
          50% {
            opacity: 0.85;
            filter: drop-shadow(0 0 12px var(--color-primary))
              drop-shadow(0 0 24px var(--color-primary))
              drop-shadow(0 0 36px var(--color-primary));
          }
          75% {
            opacity: 1;
            filter: drop-shadow(0 0 16px var(--color-primary))
              drop-shadow(0 0 32px var(--color-primary))
              drop-shadow(0 0 48px var(--color-primary));
          }
        }

        .animate-light-glow {
          animation: light-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default QuestionSection;
