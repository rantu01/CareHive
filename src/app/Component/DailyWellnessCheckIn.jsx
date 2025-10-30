"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Activity, Droplets, Heart, Sparkles } from "lucide-react";

const moods = [
  {
    emoji: "😊",
    label: "Happy & Content",
    tips: [
      "Share your positive energy with someone today 💚",
      "Take a mindful walk and appreciate your surroundings 🍃",
      "Listen to uplifting music that matches your vibe 🎶",
      "Write down three things you're grateful for today 📝"
    ],
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    emoji: "😞",
    label: "Feeling Down",
    tips: [
      "Practice deep breathing — inhale for 4, exhale for 6 🌬️",
      "Reach out to a trusted friend or family member 💭",
      "Watch something lighthearted or comforting 🎵",
      "Be gentle with yourself — it's okay to not be okay 🌸"
    ],
    icon: <Heart className="w-5 h-5" />
  },
  {
    emoji: "😣",
    label: "Stressed",
    tips: [
      "Try the 5-4-3-2-1 grounding technique 🌿",
      "Step away from screens for 15 minutes 📵",
      "Sip warm herbal tea while focusing on your breath ☕",
      "Do gentle neck and shoulder stretches 💆‍♀️"
    ],
    icon: <Activity className="w-5 h-5" />
  },
  {
    emoji: "😴",
    label: "Tired",
    tips: [
      "Hydrate with water and do light stretching 💧",
      "Consider a 20-minute power nap if possible 💤",
      "Get some fresh air and natural light 🌞",
      "Plan for 7-8 hours of quality sleep tonight 🛌"
    ],
    icon: <Moon className="w-5 h-5" />
  },
  {
    emoji: "😐",
    label: "Neutral",
    tips: [
      "Practice mindful breathing to maintain balance 🧘‍♀️",
      "Plan something enjoyable for later this week 📅",
      "Check in with your body's needs right now 💫",
      "Engage fully in your current activity 🌟"
    ],
    icon: <Sun className="w-5 h-5" />
  }
];

const DailyWellnessCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(2);
  const [exercise, setExercise] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const tips = useMemo(() => {
    if (!selectedMood) return [];
    const moodObj = moods.find((m) => m.emoji === selectedMood);
    if (!moodObj) return [];

    const allTips = [...moodObj.tips];

    if (sleep < 7) allTips.push("Aim for 7-8 hours of quality sleep tonight 🛌 (Sleep goal)");
    if (water < 2) allTips.push("Increase your water intake throughout the day 💧 (Hydration goal)");
    if (!exercise) allTips.push("Try to include some light movement today 🏃‍♂️ (Movement goal)");

    return Array.from(new Set(allTips)).slice(0, 5); // unique & limit to 5
  }, [selectedMood, sleep, water, exercise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) {
      setShowErrorModal(true);
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            Daily Check-In
          </span>
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
        </div>
        
        <h2 className="text-4xl font-bold mb-4 text-[var(--color-primary)] font-heading">
          🌿 Wellness Check-In
        </h2>
        
        <p className="text-lg text-[var(--text-color-all)] opacity-80">
          Take a moment to reflect on your day and receive personalized wellness tips
        </p>
      </div>

      {/* Main Form */}
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--bg-color-all)] rounded-3xl shadow-xl border border-[var(--dashboard-border)] p-8 space-y-8"
        onSubmit={handleSubmit}
      >
        {/* Mood Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[var(--color-primary)] flex items-center gap-2">
            <Heart className="w-5 h-5" />
            How are you feeling today?
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-5  gap-3">
            {moods.map((mood) => (
              <motion.button
                key={mood.emoji}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 ${
                  selectedMood === mood.emoji 
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 shadow-md" 
                    : "border-[var(--dashboard-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:bg-opacity-5"
                }`}
                onClick={() => setSelectedMood(mood.emoji)}
              >
                <span className="text-3xl mb-1">{mood.emoji}</span>
                <span className="text-xs font-medium text-[var(--text-color-all)] text-center leading-tight">
                  {mood.label.split(" ")[0]}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Wellness Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sleep */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[var(--text-color-all)] font-medium">
              <Moon className="w-4 h-4 text-[var(--color-primary)]" />
              Sleep Hours
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="12"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
                className="flex-1 accent-[var(--color-primary)]"
              />
              <span className="w-12 text-center font-semibold text-[var(--color-primary)]">
                {sleep}h
              </span>
            </div>
          </div>

          {/* Water */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[var(--text-color-all)] font-medium">
              <Droplets className="w-4 h-4 text-[var(--color-primary)]" />
              Water Intake
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
                className="flex-1 accent-[var(--color-primary)]"
              />
              <span className="w-12 text-center font-semibold text-[var(--color-primary)]">
                {water}L
              </span>
            </div>
          </div>

          {/* Exercise */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[var(--text-color-all)] font-medium">
              <Activity className="w-4 h-4 text-[var(--color-primary)]" />
              Exercise Today?
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setExercise(true)}
                className={`flex-1 py-2 rounded-xl border-2 font-medium transition-all ${
                  exercise 
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" 
                    : "border-[var(--dashboard-border)] text-[var(--text-color-all)] hover:border-[var(--color-primary)]"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setExercise(false)}
                className={`flex-1 py-2 rounded-xl border-2 font-medium transition-all ${
                  !exercise 
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" 
                    : "border-[var(--dashboard-border)] text-[var(--text-color-all)] hover:border-[var(--color-primary)]"
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold text-lg hover:bg-[var(--color-secondary)] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Personalized Wellness Tips
        </motion.button>
      </motion.form>

      {/* Tips Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl border border-[var(--dashboard-border)] max-w-md w-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[var(--color-primary)] p-6 text-center">
                <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Your Wellness Tips
                </h3>
                <p className="text-white opacity-90 mt-1">Personalized recommendations for your day</p>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-color-all)] border border-[var(--dashboard-border)]"
                    >
                      <div className="w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[var(--text-color-all)] leading-relaxed text-sm">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-[var(--dashboard-border)]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300"
                >
                  Got It - Thanks!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(255, 99, 71, 0.3)" }}
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl border border-red-500 max-w-sm w-full overflow-hidden text-center"
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-red-500 p-6">
                <p className="text-4xl">⚠️</p>
                <h3 className="text-xl font-bold text-white mt-2">Oops! Missing Mood</h3>
              </div>
              <div className="p-6">
                <p className="text-[var(--text-color-all)] mb-4">
                  Please select your <strong>current mood</strong> before getting personalized tips.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowErrorModal(false)}
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300"
                >
                  Okay, I'll Choose!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyWellnessCheckIn;
