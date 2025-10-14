"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdFormatColorReset } from "react-icons/md";
import { IoIosSwitch } from "react-icons/io";

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
    bgColor: "var(--light-green)",
    borderColor: "var(--color-primary)",
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
    bgColor: "var(--dashboard-bg)",
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
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-screen bg-gradient-to-b from-[var(--gray-color)] via-[var(--dashboard-bg)] to-[var(--gray-color)] font-[var(--font-primary)]">
      {/* Header */}
      <h2
        className="text-3xl sm:text-4xl font-extrabold mb-6 flex items-center justify-center"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <span style={{ color: "var(--color-black)", marginRight: "8px" }}>
          Daily
        </span>
        <span style={{ color: "var(--color-primary)" }}>Wellness Check-In 🌿</span>
      </h2>

      <p className="text-[var(--fourground-color)] mb-10 text-lg max-w-xl leading-relaxed">
        {lang === "bn"
          ? "তোমার বর্তমান মুড সিলেক্ট করো — আমরা তোমার জন্য ব্যক্তিগত হেলথ টিপস দেব 💫"
          : "Select your current mood — we’ll share personalized health tips 💫"}
      </p>

      {/* Mood Buttons */}
      <div className="flex gap-6 mb-10 flex-wrap justify-center">
        {Object.keys(moodData).map((emoji) => (
          <motion.button
            key={emoji}
            whileTap={{ scale: 0.9, rotate: -5 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`text-5xl p-4 rounded-2xl shadow-md border transition-all duration-300 ${
              selectedMood === emoji
                ? "bg-[var(--light-green)] border-[var(--color-primary)] shadow-lg"
                : "bg-[var(--dashboard-bg)] border-[var(--dashboard-border)] hover:bg-[var(--gray-color)]"
            }`}
            onClick={() => setSelectedMood(emoji)}
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Mood Card */}
      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key={selectedMood}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", duration: 0.6 }}
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
            <div className="italic text-sm border-t pt-3 mb-5 opacity-90">
              💡 <span>{moodData[selectedMood].quote[lang]}</span>
            </div>

            {/* Language & Reset Buttons with Icons */}
            <div className="flex justify-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "var(--light-green)",
                  color: "#000",
                }}
                onClick={() => setLang(lang === "bn" ? "en" : "bn")}
                className="px-5 py-2 rounded-full shadow-md font-medium flex items-center gap-2 transition"
                style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
              >
                <IoIosSwitch className="w-5 h-5" />
                {lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedMood(null)}
                className="px-4 py-2 bg-[var(--gray-color)] text-[var(--fourground-color)] rounded-full font-medium flex items-center gap-2 hover:bg-[var(--dashboard-border)] transition"
              >
                <MdFormatColorReset className="w-5 h-5" />
                Reset
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodBasedHealth;
