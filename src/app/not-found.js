"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartPulse, Home } from "lucide-react";

export default function NotFound() {
  // Animation sequence for 4 ➜ 0 ➜ 4
  const digitVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.8 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center bg-[var(--dashboard-bg)] text-[var(--text-color-all)] p-6">
      {/* 🌈 Floating gradient aura */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.9 }}
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="absolute w-[700px] h-[700px] rounded-full blur-3xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] opacity-40"
      />

      {/* 💚 Pulsing heart icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="z-10"
      >
        <HeartPulse className="w-20 h-20 text-[var(--color-primary)] drop-shadow-lg" />
      </motion.div>

      {/* 🔢 Animated 404 digits */}
      <div className="flex justify-center mt-6 space-x-4 z-10">
        {["4", "0", "4"].map((digit, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={digitVariants}
            initial="hidden"
            animate="visible"
            className="text-[5rem] sm:text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] drop-shadow-md"
          >
            {digit}
          </motion.span>
        ))}
      </div>

      {/* 🧘 Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-lg sm:text-xl mt-4 text-gray-500 dark:text-gray-400 max-w-md leading-relaxed"
      >
        The page you’re looking for took a little health break.  
        Let’s guide you back to wellness 🌿
      </motion.p>

      {/* 🏠 Back Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mt-8 z-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>

      {/* ✨ Subtle floating background icons */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-12 right-12 text-[var(--color-gradient)] opacity-30"
      >
        <HeartPulse className="w-12 h-12" />
      </motion.div>

      <motion.div
        animate={{ y: [-10, 10, -10], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-16 left-16 text-[var(--color-primary)] opacity-30"
      >
        <HeartPulse className="w-10 h-10" />
      </motion.div>
    </div>
  );
}
