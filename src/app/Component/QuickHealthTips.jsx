"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Play, Zap } from "lucide-react";

export default function QuickHealthTips() {
  const tipsList = [
    "💧 Drink at least 8 glasses of water daily for optimal hydration.",
    "🚶 Take a 10-minute walk after meals to improve digestion and metabolism.",
    "😴 Aim for 7-8 hours of quality sleep every night for better recovery.",
    "🥦 Eat more vegetables and fruits for essential vitamins and minerals.",
    "🧘 Practice deep breathing for 5 minutes daily to reduce stress levels.",
    "⏱️ Take short breaks from screens every 30 minutes to protect your eyes.",
    "🏋️ Add strength training exercises at least twice a week for muscle health.",
    "🍵 Avoid too much caffeine in the evening for better sleep quality.",
    "📏 Maintain good posture while sitting to protect your spine and back.",
    "😊 Keep a gratitude journal to boost mental health and positivity.",
    "🥤 Replace sugary drinks with water or herbal tea for better health.",
    "🌞 Get 10–15 minutes of sunlight daily for Vitamin D synthesis.",
    "🍎 Start your day with a healthy breakfast for sustained energy.",
    "🚰 Drink water before meals to help control appetite and portions.",
    "🚴 Engage in at least 150 minutes of physical activity weekly.",
    "🥗 Include protein in every meal for muscle maintenance and satiety.",
    "🍊 Eat citrus fruits for Vitamin C and stronger immune system.",
    "🛌 Maintain a consistent sleep schedule even on weekends.",
    "📱 Limit screen time before bedtime for better sleep quality.",
    "🧴 Use sunscreen daily to protect your skin from UV damage.",
    "😃 Smile more often – it naturally reduces stress and boosts mood.",
    "🧂 Reduce salt intake to maintain healthy blood pressure levels.",
    "🥜 Add nuts and seeds to snacks for healthy fats and nutrients.",
    "🥩 Choose lean protein over processed meats for better health.",
    "🦷 Brush and floss daily to maintain optimal oral health.",
    "🎵 Listen to music regularly to boost mood and reduce anxiety.",
    "🚭 Avoid smoking and limit alcohol consumption for longevity.",
    "🌿 Add green tea to your diet for antioxidants and metabolism.",
    "🥑 Eat avocados regularly for healthy fats and nutrients.",
    "📚 Read for 20 minutes daily to relax and stimulate your mind.",
    "🏞️ Spend time outdoors to reduce stress and refresh your mind.",
    "🤸 Stretch every morning to improve flexibility and circulation.",
    "📖 Plan meals ahead to avoid unhealthy eating choices.",
  ];

  const [dailyTips, setDailyTips] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshTips = () => {
    setIsRefreshing(true);
    const shuffled = [...tipsList].sort(() => 0.5 - Math.random());
    setDailyTips(shuffled.slice(0, 3));
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    refreshTips();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            Daily Wellness
          </span>
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
        </div>
        
        <h2 className="text-4xl font-bold mb-6 text-[var(--color-primary)] font-heading flex items-center justify-center gap-4">
          <Sparkles className="w-8 h-8" />
          Quick Health Tips
          <Zap className="w-8 h-8" />
        </h2>
        
        <p className="text-xl text-[var(--fourground-color)] max-w-2xl mx-auto leading-relaxed opacity-80">
          Stay motivated with small, actionable health reminders updated daily to keep you on track.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-[var(--dashboard-border)] p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                  Today's Tips
                </h3>
                <p className="text-[var(--fourground-color)] opacity-70">
                  Fresh health advice daily
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={refreshTips}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRefreshing}
              className="p-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-calm-blue)] transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {dailyTips.map((tip, index) => (
                <motion.div
                  key={`${tip}-${index}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 rounded-xl border-2 border-[var(--dashboard-border)] bg-[var(--gray-color)] hover:border-[var(--color-primary)] transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <p className="text-[var(--fourground-color)] leading-relaxed font-medium">
                      {tip}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 p-4 bg-[var(--color-primary)] bg-opacity-10 rounded-xl border border-[var(--color-primary)] border-opacity-30">
            <p className="text-sm  font-medium text-center">
              🔄 Click the refresh button for new health tips!
            </p>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-[var(--dashboard-border)] overflow-hidden"
        >
          <div className="p-6 border-b border-[var(--dashboard-border)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                  Wellness Video
                </h3>
                <p className="text-[var(--fourground-color)] opacity-70">
                  Quick health inspiration
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1119895598?autoplay=1&loop=1&muted=1&background=1#t=0s"
              title="Health and Wellness Inspiration"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 pointer-events-none border-4 border-transparent rounded-3xl" />
          </div>
          
          <div className="p-4 bg-[var(--gray-color)] border-t border-[var(--dashboard-border)]">
            <p className="text-sm text-[var(--fourground-color)] text-center opacity-70">
              Watch for daily health motivation and wellness tips
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}