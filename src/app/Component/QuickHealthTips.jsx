"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickHealthTips() {
  const tipsList = [
    "💧 Drink at least 8 glasses of water daily.",
    "🚶 Take a 10-minute walk after meals to improve digestion.",
    "😴 Aim for 7-8 hours of quality sleep every night.",
    "🥦 Eat more vegetables and fruits for vitamins and minerals.",
    "🧘 Practice deep breathing for 5 minutes to reduce stress.",
    "⏱️ Take short breaks from the screen every 30 minutes.",
    "🏋️ Add strength training exercises at least twice a week.",
    "🍵 Avoid too much caffeine in the evening for better sleep.",
    "📏 Maintain a good posture while sitting to protect your back.",
    "😊 Keep a gratitude journal to boost your mental health.",
    "🥤 Replace sugary drinks with water or herbal tea.",
    "🌞 Get 10–15 minutes of sunlight daily for Vitamin D.",
    "🍎 Start your day with a healthy breakfast for energy.",
    "🚰 Drink water before meals to help control appetite.",
    "🚴 Engage in at least 150 minutes of physical activity weekly.",
    "🥗 Include protein in every meal for muscle health.",
    "🍊 Eat citrus fruits for Vitamin C and stronger immunity.",
    "🛌 Maintain a consistent sleep schedule even on weekends.",
    "📱 Limit screen time before bedtime for better sleep.",
    "🧴 Use sunscreen daily to protect your skin.",
    "😃 Smile more often – it reduces stress naturally.",
    "🧂 Reduce salt intake to keep your blood pressure balanced.",
    "🥜 Add nuts and seeds to your snacks for healthy fats.",
    "🥩 Avoid processed meats – go for lean protein instead.",
    "🦷 Brush and floss daily to maintain oral health.",
    "🎵 Listen to music to boost mood and reduce anxiety.",
    "🚭 Avoid smoking and limit alcohol consumption.",
    "🌿 Add green tea to your diet for antioxidants.",
    "🥑 Eat avocados – they’re packed with healthy fats.",
    "📚 Read for 20 minutes daily to relax your mind.",
    "🏞️ Spend time outdoors to reduce stress and refresh your mind.",
    "🤸 Stretch your body every morning to improve flexibility.",
    "📖 Plan your meals ahead to avoid unhealthy eating.",
  ];

  const [dailyTips, setDailyTips] = useState([]);

  useEffect(() => {
    const shuffled = [...tipsList].sort(() => 0.5 - Math.random());
    setDailyTips(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="relative mx-auto mt-12 mb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Left Column: Tips */}
        <div
          className="flex-1 z-10 p-6 sm:p-8 md:p-10 flex flex-col gap-6 rounded-2xl"
          style={{ background: "var(--color-calm-blue)", color: "var(--color-white)" }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Quick Health Tips Feed
          </motion.h2>

          <motion.p
            className="text-center md:text-left text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Stay motivated with small, actionable health reminders.
          </motion.p>

          <ul className="space-y-4">
            <AnimatePresence>
              {dailyTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="border rounded-xl p-4 sm:p-5 shadow-lg backdrop-blur-sm"
                  style={{
                    background: "var(--dashboard-bg)",
                    borderColor: "var(--dashboard-border)",
                    color: "var(--fourground-color)",
                  }}
                >
                  <span className="font-medium text-sm sm:text-base">{tip}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <motion.p
            className="mt-4 text-center md:text-left text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{ color: "var(--gray-color)" }}
          >
            💡 Refresh the page to get new health tips!
          </motion.p>
        </div>

        {/* Right Column: Video */}
        <div className="flex-1 relative min-h-[220px] sm:min-h-[280px] md:min-h-[320px] rounded-2xl overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1119895598?autoplay=1&loop=1&muted=1&background=1#t=0s"
            title="Health Video"
            className="w-full h-full object-cover rounded-2xl"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "var(--dashboard-blue)/20" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
