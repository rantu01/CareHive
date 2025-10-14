"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const moodData = {
  "😊": {
    title: { bn: "Happy", en: "Happy" },
    tips: {
      bn: [
        "তোমার হাসিটা ছড়িয়ে দাও, অন্য কাউকে উৎসাহ দাও 💚",
        "আজ একটু হালকা ব্যায়াম করো বা প্রকৃতির মধ্যে হাঁটো 🍃",
        "নিজের প্রিয় গান শুনে রিল্যাক্স করো 🎶",
      ],
      en: [
        "Share your smile and spread positivity 💚",
        "Do some light exercise or walk in nature 🍃",
        "Listen to your favorite music and relax 🎶",
      ],
    },
    quote: {
      bn: "সুখ সংক্রামক — সেটি ছড়িয়ে দাও 🌼",
      en: "Happiness is contagious — spread it around 🌼",
    },
    bgColor: "var(--light-green)",      // global variable
    borderColor: "var(--color-light-green)",
    textColor: "var(--fourground-color)",
  },
  "😞": {
    title: { bn: "Sad", en: "Sad" },
    tips: {
      bn: [
        "একটা গভীর শ্বাস নাও এবং ধীরে ধীরে ছাড়ো 🌬️",
        "তোমার অনুভূতি লিখে ফেলো বা কাউকে বলো 💭",
        "একটু হালকা কমেডি বা গান শুনে মুড ফ্রেশ করো 🎵",
      ],
      en: [
        "Take a deep breath and exhale slowly 🌬️",
        "Write down or share your feelings 💭",
        "Watch a light comedy or listen to happy music 🎵",
      ],
    },
    quote: {
      bn: "অন্ধকার রাতও শেষ হবে, সূর্য আবার উঠবে ☀️",
      en: "Even the darkest night will end and the sun will rise ☀️",
    },
    bgColor: "var(--dashboard-bg)",  // global variable
    borderColor: "var(--dashboard-blue)",
    textColor: "var(--fourground-color)",
  },
  "😣": {
    title: { bn: "Stressed", en: "Stressed" },
    tips: {
      bn: [
        "৫ মিনিট deep breathing করো 🌿",
        "কিছুক্ষণের জন্য মোবাইল/স্ক্রিন থেকে দূরে থাকো 📵",
        "গরম পানি দিয়ে মুখ ধুয়ে নাও বা চা খাও ☕",
      ],
      en: [
        "Do 5 minutes of deep breathing 🌿",
        "Stay away from your screen for a while 📵",
        "Wash your face with warm water or have some tea ☕",
      ],
    },
    quote: {
      bn: "থামো, শ্বাস নাও — তুমি ভালো করছো 🌸",
      en: "Pause. Breathe. You are doing your best 🌸",
    },
    bgColor: "var(--gray-color)",
    borderColor: "var(--dashboard-border)",
    textColor: "var(--fourground-color)",
  },
  "😴": {
    title: { bn: "Tired", en: "Tired" },
    tips: {
      bn: [
        "একটু বিশ্রাম নাও — শরীরও যত্ন চায় 💤",
        "পানি পান করো ও হালকা স্ট্রেচিং করো 💧",
        "আজ রাতে অন্তত ৮ ঘণ্টা ঘুমের চেষ্টা করো 🛌",
      ],
      en: [
        "Take some rest — your body needs care too 💤",
        "Drink water and do some light stretching 💧",
        "Try to get at least 8 hours of sleep tonight 🛌",
      ],
    },
    quote: {
      bn: "বিশ্রাম সময়ের অপচয় নয় — এটি পুনরায় শক্তি পাওয়ার উপায় ⚡",
      en: "Rest is not a waste of time — it’s how you recharge ⚡",
    },
    bgColor: "var(--dashboard-bg)",
    borderColor: "var(--dashboard-border)",
    textColor: "var(--fourground-color)",
  },
};

const MoodBasedHealth = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [lang, setLang] = useState("bn");

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gradient-to-b from-white via-green-50 to-white">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
        🌿 Mood-Based Health Recommendations
      </h2>
      <p className="text-gray-600 mb-8 text-lg max-w-xl">
        {lang === "bn"
          ? "তোমার বর্তমান মুড সিলেক্ট করো — আমরা তোমার জন্য ব্যক্তিগত হেলথ টিপস দেব 💫"
          : "Select your current mood — we’ll share personalized health tips 💫"}
      </p>

      {/* Mood Buttons */}
      <div className="flex gap-5 mb-10 flex-wrap justify-center">
        {Object.keys(moodData).map((emoji) => (
          <motion.button
            key={emoji}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`text-5xl p-4 rounded-2xl shadow-lg border transition-all duration-300 ${
              selectedMood === emoji
                ? "bg-gray-200 border-gray-400"
                : "bg-white border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedMood(emoji)}
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Mood Card */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg p-8 rounded-3xl border-2 shadow-xl"
          style={{
            backgroundColor: moodData[selectedMood].bgColor,
            borderColor: moodData[selectedMood].borderColor,
            color: moodData[selectedMood].textColor,
          }}
        >
          <h3 className="text-3xl font-semibold mb-4">
            {moodData[selectedMood].title[lang]} Mood 💬
          </h3>
          <ul className="space-y-3 text-left list-disc list-inside mb-4">
            {moodData[selectedMood].tips[lang].map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
          <div className="italic text-sm border-t pt-3 mb-5">
            💡 <span>{moodData[selectedMood].quote[lang]}</span>
          </div>

          {/* Language Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="mt-3 px-5 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
          >
            {lang === "bn" ? "Switch to English 🇬🇧" : "বাংলায় দেখুন 🇧🇩"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default MoodBasedHealth;
