"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const moods = [
  {
    emoji: "😊",
    label: { bn: "সুখী", en: "Happy" },
    tips: {
      bn: ["সুখ ছড়াও 💚", "হালকা ব্যায়াম করো 🍃", "সঙ্গীত শুনে বিশ্রাম নাও 🎶"],
      en: ["Spread happiness 💚", "Do light exercise 🍃", "Listen to music and relax 🎶"],
    },
  },
  {
    emoji: "😞",
    label: { bn: "দুঃখিত", en: "Sad" },
    tips: {
      bn: ["গভীর শ্বাস নাও 🌬️", "অনুভূতি লিখো 💭", "হালকা কমেডি দেখো 🎵"],
      en: ["Take a deep breath 🌬️", "Write down your feelings 💭", "Watch light comedy 🎵"],
    },
  },
  {
    emoji: "😣",
    label: { bn: "চাপে", en: "Stressed" },
    tips: {
      bn: ["৫ মিনিট deep breathing 🌿", "স্ক্রিন থেকে দূরে থাকো 📵", "গরম পানি দিয়ে মুখ ধুয়ে নাও ☕"],
      en: ["5 min deep breathing 🌿", "Stay away from screens 📵", "Wash face with warm water ☕"],
    },
  },
  {
    emoji: "😴",
    label: { bn: "ক্লান্ত", en: "Tired" },
    tips: {
      bn: ["বিশ্রাম নাও 💤", "পানি পান করো 💧", "৮ ঘণ্টা ঘুমের চেষ্টা করো 🛌"],
      en: ["Take rest 💤", "Drink water 💧", "Try to sleep 8 hrs 🛌"],
    },
  },
];

const DailyWellnessCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(2);
  const [exercise, setExercise] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lang, setLang] = useState("bn");

  // Detect browser language
  useEffect(() => {
    const browserLang = navigator.language.startsWith("bn") ? "bn" : "en";
    setLang(browserLang);
  }, []);

  const tips = useMemo(() => {
    if (!selectedMood) return [];
    const moodObj = moods.find((m) => m.emoji === selectedMood);
    const baseTips = moodObj ? moodObj.tips[lang] : [];
    return [
      ...baseTips,
      ...(sleep < 7 ? [lang === "bn" ? "৭-৮ ঘণ্টা ঘুমের চেষ্টা করো 🛌" : "Try to get 7-8 hrs sleep 🛌"] : []),
      ...(water < 2 ? [lang === "bn" ? "আরও পানি পান করো 💧" : "Drink more water 💧"] : []),
      ...(!exercise ? [lang === "bn" ? "আজ হালকা ব্যায়াম করো 🏃‍♂️" : "Try light exercise today 🏃‍♂️"] : []),
    ];
  }, [selectedMood, sleep, water, exercise, lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return alert(lang === "bn" ? "মুড সিলেক্ট করো!" : "Please select your mood!");
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 font-sans">
      {/* Title */}
      <h2
        className="text-3xl sm:text-4xl font-extrabold mb-6 flex items-center justify-center relative whitespace-nowrap"
        style={{ fontFamily: "var(--font-heading)", gap: "6px" }}
      >
        <span
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-10 w-1 rounded-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <span style={{ marginRight: "4px" }}>🌿</span>
        <span>
          <span style={{ color: "var(--color-black)" }}>Daily Wellness </span>
          <span style={{ color: "var(--color-primary)" }}> Check-In</span>
        </span>
      </h2>

      {/* Form Card */}
      <form
        className="form-card flex flex-col gap-4 p-5 rounded-2xl shadow-md border transition-all duration-300"
        style={{
          borderColor: "var(--dashboard-border)",
          backgroundColor: "var(--dashboard-bg)",
        }}
        onSubmit={handleSubmit}
      >
        <style>{`
          .form-card:hover, .form-card:focus-within {
            filter: brightness(1.00);
            border-color: var(--color-primary);
            box-shadow: 0 0 18px 6px var(--color-primary);
          }
          input:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 8px var(--color-primary);
          }
        `}</style>

        {/* Mood & Language */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-3 flex-wrap">
            {moods.map((m) => (
              <motion.button
                key={m.emoji}
                type="button"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundColor: selectedMood === m.emoji ? "var(--color-primary)" : "var(--color-white)",
                  color: selectedMood === m.emoji ? "var(--color-white)" : "var(--color-black)",
                }}
                className="text-3xl p-3 rounded-md border transition-colors duration-300"
                onClick={() => setSelectedMood(m.emoji)}
              >
                {m.emoji}
              </motion.button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="px-4 py-2 rounded-md shadow font-medium transition"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
          >
            {lang === "bn" ? "English" : "বাংলা"}
          </button>
        </div>

        {selectedMood && (
          <p className="text-center mt-2 text-xl font-semibold" style={{ color: "var(--fourground-color)" }}>
            {moods.find((m) => m.emoji === selectedMood).emoji}{" "}
            {moods.find((m) => m.emoji === selectedMood).label[lang]}
          </p>
        )}

        {/* Sleep */}
        <div className="flex flex-col">
          <label className="mb-2" style={{ color: "var(--fourground-color)" }}>
            {lang === "bn" ? "গত রাতে ঘুমের সময়:" : "Sleep hours last night:"}
          </label>
          <input
            type="number"
            min="0"
            max="12"
            value={sleep}
            onChange={(e) => setSleep(Math.min(Math.max(Number(e.target.value), 0), 12))}
            className="p-2 border rounded-md text-center"
            style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
          />
        </div>

        {/* Water */}
        <div className="flex flex-col">
          <label className="mb-2" style={{ color: "var(--fourground-color)" }}>
            {lang === "bn" ? "আজকের পানি গ্রহণ (লিটার):" : "Water intake (liters):"}
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={water}
            onChange={(e) => setWater(Math.min(Math.max(Number(e.target.value), 0), 10))}
            className="p-2 border rounded-md text-center"
            style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
          />
        </div>

        {/* Exercise */}
        <div className="flex flex-col">
          <label className="mb-2" style={{ color: "var(--fourground-color)" }}>
            {lang === "bn" ? "আজ ব্যায়াম করেছ?" : "Exercise today?"}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={exercise} onChange={() => setExercise(!exercise)} className="hidden" />
            <div
              className={`w-12 h-6 rounded-full transition-colors duration-300`}
              style={{ backgroundColor: exercise ? "var(--color-primary)" : "var(--gray-color)" }}
            />
            <span style={{ color: "var(--fourground-color)" }}>
              {exercise ? (lang === "bn" ? "হ্যাঁ" : "Yes") : lang === "bn" ? "না" : "No"}
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded-md shadow font-medium transition"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
        >
          {lang === "bn" ? "সাবমিট" : "Submit"}
        </button>
      </form>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => setShowModal(false)} // click outside closes modal
          >
            <motion.div
              className="bg-[var(--dashboard-bg)] p-6 rounded-2xl max-w-sm w-full shadow-lg pointer-events-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--fourground-color)" }}>
                💡 {lang === "bn" ? "আজকের পরামর্শ" : "Your Daily Tips"}
              </h3>

              <ul className="list-disc list-inside space-y-1" style={{ color: "var(--fourground-color)" }}>
                {tips.map((tip, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {tip}
                  </motion.li>
                ))}
              </ul>

              <button
                className="mt-4 px-4 py-2 rounded-md shadow font-medium w-full transition"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
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
