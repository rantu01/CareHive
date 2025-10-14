"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const moods = [
  { 
    emoji: "😊", 
    label: { bn: "সুখী", en: "Happy" }, 
    tips: { 
      bn: ["সুখ ছড়াও 💚", "হালকা ব্যায়াম করো 🍃", "সঙ্গীত শুনে বিশ্রাম নাও 🎶"],
      en: ["Spread happiness 💚", "Do light exercise 🍃", "Listen to music and relax 🎶"]
    } 
  },
  { 
    emoji: "😞", 
    label: { bn: "দুঃখিত", en: "Sad" }, 
    tips: {
      bn: ["গভীর শ্বাস নাও 🌬️", "অনুভূতি লিখো 💭", "হালকা কমেডি দেখো 🎵"],
      en: ["Take a deep breath 🌬️", "Write down your feelings 💭", "Watch light comedy 🎵"]
    }
  },
  { 
    emoji: "😣", 
    label: { bn: "চাপে", en: "Stressed" }, 
    tips: {
      bn: ["৫ মিনিট deep breathing 🌿", "স্ক্রিন থেকে দূরে থাকো 📵", "গরম পানি দিয়ে মুখ ধুয়ে নাও ☕"],
      en: ["5 min deep breathing 🌿", "Stay away from screens 📵", "Wash face with warm water ☕"]
    }
  },
  { 
    emoji: "😴", 
    label: { bn: "ক্লান্ত", en: "Tired" }, 
    tips: {
      bn: ["বিশ্রাম নাও 💤", "পানি পান করো 💧", "৮ ঘণ্টা ঘুমের চেষ্টা করো 🛌"],
      en: ["Take rest 💤", "Drink water 💧", "Try to sleep 8 hrs 🛌"]
    }
  },
];

const DailyWellnessCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(2);
  const [exercise, setExercise] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lang, setLang] = useState("bn"); // Language toggle

  const generateTips = () => {
    const tips = [];
    if (!selectedMood) return tips;
    const moodObj = moods.find((m) => m.emoji === selectedMood);
    if (!moodObj) return tips;

    // Mood tips
    tips.push(...moodObj.tips[lang]);

    // Sleep, water, exercise tips
    if (sleep < 7) tips.push(lang === "bn" ? "৭-৮ ঘণ্টা ঘুমের চেষ্টা করো 🛌" : "Try to get 7-8 hrs sleep 🛌");
    if (water < 2) tips.push(lang === "bn" ? "আরও পানি পান করো 💧" : "Drink more water 💧");
    if (!exercise) tips.push(lang === "bn" ? "আজ হালকা ব্যায়াম করো 🏃‍♂️" : "Try light exercise today 🏃‍♂️");

    return tips;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return alert(lang === "bn" ? "মুড সিলেক্ট করো!" : "Please select your mood!");
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--fourground-color)] mb-4 text-center">
        🌿 {lang === "bn" ? "দৈনিক ওয়েলনেস চেক-ইন" : "Daily Wellness Check-In"}
      </h2>

      <form  className="flex flex-col gap-4 p-4 rounded-2xl shadow-md border"
  style={{
    borderColor: "var(--dashboard-border)",
    backgroundColor: "var(--dashboard-bg)",
  }} onSubmit={handleSubmit}>
        {/* Mood + Language Row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          {/* Mood Buttons */}
          <div className="flex gap-3 flex-wrap">
            {moods.map((m) => (
              <motion.button
                key={m.emoji}
                type="button"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundColor:
                    selectedMood === m.emoji ? "var(--color-light-green)" : "var(--color-white)",
                  color: "var(--color-black)",
                }}
                className="text-3xl p-2 rounded-md border transition"
                onClick={() => setSelectedMood(m.emoji)}
              >
                {m.emoji}
              </motion.button>
            ))}
          </div>

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="px-4 py-2 rounded-md shadow font-medium transition"
            style={{
              backgroundColor: "var(--color-calm-blue)",
              color: "var(--color-white)",
            }}
          >
            {lang === "bn" ? "English" : "বাংলা"}
          </button>
        </div>

        {/* Sleep */}
        <div className="flex flex-col">
          <label className="mb-2 text-[var(--fourground-color)]">
            {lang === "bn" ? "গত রাতে ঘুমের সময়:" : "Sleep hours last night:"}
          </label>
          <input
            type="number"
            min="0"
            max="12"
            value={sleep}
            onChange={(e) => setSleep(Number(e.target.value))}
            className="p-2 border rounded-md text-center"
          />
        </div>

        {/* Water */}
        <div className="flex flex-col">
          <label className="mb-2 text-[var(--fourground-color)]">
            {lang === "bn" ? "আজকের পানি গ্রহণ (লিটার):" : "Water intake (liters):"}
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
            className="p-2 border rounded-md text-center"
          />
        </div>

        {/* Exercise */}
        <div className="flex flex-col">
          <label className="mb-2 text-[var(--fourground-color)]">
            {lang === "bn" ? "আজ ব্যায়াম করেছ?" : "Exercise today?"}
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              style={{
                backgroundColor: exercise ? "var(--color-light-green)" : "var(--color-white)",
                color: "var(--color-black)",
              }}
              className="px-3 py-1 rounded-md border transition"
              onClick={() => setExercise(true)}
            >
              {lang === "bn" ? "হ্যাঁ" : "Yes"}
            </button>
            <button
              type="button"
              style={{
                backgroundColor: !exercise ? "var(--color-light-green)" : "var(--color-white)",
                color: "var(--color-black)",
              }}
              className="px-3 py-1 rounded-md border transition"
              onClick={() => setExercise(false)}
            >
              {lang === "bn" ? "না" : "No"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 rounded-md shadow font-medium transition"
          style={{
            backgroundColor: "var(--dashboard-blue)",
            color: "var(--color-white)",
          }}
        >
          {lang === "bn" ? "সাবমিট" : "Submit"}
        </button>
      </form>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <motion.div
              className="bg-[var(--dashboard-bg)] p-6 rounded-2xl max-w-sm w-full shadow-lg pointer-events-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-[var(--fourground-color)]">
                  💡 {lang === "bn" ? "আজকের পরামর্শ" : "Your Daily Tips"}
                </h3>
              </div>

              <ul className="list-disc list-inside space-y-1 text-[var(--fourground-color)]">
                {generateTips().map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>

              <button
                className="mt-4 px-4 py-2 rounded-md shadow font-medium w-full transition"
                style={{
                  backgroundColor: "var(--color-light-green)",
                  color: "var(--color-white)",
                }}
                onClick={() => setShowModal(false)}
              >
                {lang === "bn" ? "বন্ধ করো" : "Close"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyWellnessCheckIn;
