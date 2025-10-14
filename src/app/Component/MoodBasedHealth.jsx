"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Brain, Zap, Cloud } from "lucide-react";

const moodData = {
  "😊": {
    title: "Happy & Content",
    tips: [
      "Share your positive energy with others — kindness is contagious 💚",
      "Take a mindful walk in nature and appreciate the little things 🍃",
      "Document this moment in a gratitude journal 📔",
      "Listen to uplifting music that matches your vibrant energy 🎶"
    ],
    quote: "Happiness is not something ready-made. It comes from your own actions 🌼",
    icon: <Sparkles className="w-8 h-8" />,
    bgColor: "var(--gray-color)",
    borderColor: "var(--color-primary)",
    textColor: "var(--fourground-color)",
  },
  "😞": {
    title: "Feeling Down",
    tips: [
      "Practice deep breathing — inhale for 4 counts, exhale for 6 🌬️",
      "Reach out to a trusted friend or family member 💭",
      "Watch something lighthearted or listen to comforting music 🎵",
      "Write down three things you're grateful for today ✨"
    ],
    quote: "This feeling is temporary. Every storm runs out of rain ☀️",
    icon: <Heart className="w-8 h-8" />,
    bgColor: "var(--dashboard-bg)",
    borderColor: "var(--color-primary)",
    textColor: "var(--fourground-color)",
  },
  "😣": {
    title: "Stressed & Anxious",
    tips: [
      "Try the 5-4-3-2-1 grounding technique: name things you can see, touch, hear, smell, taste 🌿",
      "Step away from screens and practice 5 minutes of box breathing 📵",
      "Sip warm herbal tea while focusing on your breath ☕",
      "Do gentle neck and shoulder stretches to release tension 💆‍♀️"
    ],
    quote: "You don't have to control your thoughts. You just have to stop letting them control you 🌸",
    icon: <Brain className="w-8 h-8" />,
    bgColor: "var(--sidebar-bg)",
    borderColor: "var(--color-primary)",
    textColor: "var(--fourground-color)",
  },
  "😴": {
    title: "Tired & Drained",
    tips: [
      "Hydrate with water and try 5 minutes of gentle stretching 💧",
      "Take a power nap (20-30 minutes maximum) 💤",
      "Step outside for fresh air and natural light 🌞",
      "Prepare for quality sleep with a consistent bedtime routine tonight 🛌"
    ],
    quote: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit ⚡",
    icon: <Zap className="w-8 h-8" />,
    bgColor: "var(--dashboard-bg)",
    borderColor: "var(--color-primary)",
    textColor: "var(--fourground-color)",
  },
  "😐": {
    title: "Neutral & Balanced",
    tips: [
      "Maintain this peaceful state with mindful breathing exercises 🧘‍♀️",
      "Plan something enjoyable to look forward to this week 📅",
      "Practice mindfulness by fully engaging in your current activity 🌟",
      "Check in with your body and mind — what do they need right now? 💫"
    ],
    quote: "Peace is the result of retraining your mind to process life as it is, not as you think it should be 🌊",
    icon: <Cloud className="w-8 h-8" />,
    bgColor: "var(--gray-color)",
    borderColor: "var(--color-primary)",
    textColor: "var(--fourground-color)",
  }
};

const MoodBasedHealth = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-[var(--dashboard-bg)]">
      {/* Header Section */}
      <div className="text-center mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            Mental Wellness
          </span>
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)] font-heading">
          Mood-Based Wellness Guide
        </h2>
        
        <p className="text-xl text-[var(--fourground-color)] leading-relaxed">
          Select your current mood and receive personalized wellness recommendations 
          to support your mental and emotional health journey.
        </p>
      </div>

      {/* Mood Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 max-w-4xl mx-auto">
        {Object.entries(moodData).map(([emoji, data]) => (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
              selectedMood === emoji
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 shadow-lg"
                : "border-[var(--dashboard-border)] bg-[var(--gray-color)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:bg-opacity-5"
            }`}
            onClick={() => {
              setSelectedMood(emoji);
              setIsExpanded(true);
            }}
          >
            <span className="text-4xl mb-2">{emoji}</span>
            <span className="text-sm font-medium text-[var(--fourground-color)] text-center leading-tight">
              {data.title.split(" ")[0]}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Expanded Mood Card */}
      {selectedMood && isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="max-w-4xl w-full mx-auto"
        >
          <div 
            className="bg-white rounded-3xl border-2 shadow-2xl overflow-hidden"
            style={{ borderColor: moodData[selectedMood].borderColor }}
          >
            {/* Card Header */}
            <div 
              className="p-6 text-center border-b"
              style={{ borderColor: moodData[selectedMood].borderColor, backgroundColor: moodData[selectedMood].bgColor }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-5xl">{selectedMood}</span>
                <div className="text-[var(--color-primary)]">
                  {moodData[selectedMood].icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
                {moodData[selectedMood].title}
              </h3>
              <p className="text-lg italic text-[var(--fourground-color)] opacity-80">
                {moodData[selectedMood].quote}
              </p>
            </div>

            {/* Tips Section */}
            <div className="p-8">
              <h4 className="text-xl font-semibold text-[var(--color-primary)] mb-6 text-center">
                Wellness Recommendations
              </h4>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {moodData[selectedMood].tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[var(--gray-color)] border border-[var(--dashboard-border)]"
                  >
                    <div className="w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-[var(--fourground-color)] leading-relaxed text-left">
                      {tip}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsExpanded(false)}
                  className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-calm-blue)] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Save These Tips
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMood(null)}
                  className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:bg-opacity-10 transition-all duration-300"
                >
                  Choose Different Mood
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer Note */}
      {!isExpanded && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[var(--fourground-color)] opacity-70 mt-8 max-w-2xl"
        >
          Your emotional well-being matters. Take a moment to check in with yourself regularly.
        </motion.p>
      )}
    </div>
  );
};

export default MoodBasedHealth;