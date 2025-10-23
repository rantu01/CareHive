"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LogoLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const letters = "CareHive".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
      style={{
        background: "linear-gradient(135deg, #19b4b4 0%, #13a1a1 100%)",
      }}
    >
      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Orbital Rings */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-32 h-32 border-2 border-white/30 rounded-full"
        />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="absolute w-24 h-24 border border-white/50 rounded-full"
        />

        {/* Central Logo Symbol */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1,
          }}
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          }}
        >
          {/* Healthcare Cross Symbol */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="relative w-10 h-10"
          >
            <motion.div
              className="absolute bg-white rounded-sm"
              initial={{ width: 0 }}
              animate={{ width: "10px" }}
              transition={{ delay: 0.5, duration: 0.3 }}
              style={{
                height: "4px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <motion.div
              className="absolute bg-white rounded-sm"
              initial={{ height: 0 }}
              animate={{ height: "10px" }}
              transition={{ delay: 0.7, duration: 0.3 }}
              style={{
                width: "4px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* Pulsing Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Connecting Dots */}
        <motion.div
          className="absolute top-0 right-0 w-3 h-3 rounded-full"
          style={{ backgroundColor: "white" }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-2 h-2 rounded-full"
          style={{ backgroundColor: "white" }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Brand Text */}
      <div className="mt-12 text-center">
        {/* CareHive Text */}
        <div
          className="flex justify-center text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.8 + i * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="block text-white drop-shadow-md"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-lg font-light tracking-wider uppercase text-white/80"
          style={{ letterSpacing: "0.2em" }}
        >
          Healthcare Excellence
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
          className="h-1 bg-white/80 rounded-full mt-6 mx-auto shadow-sm"
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full bg-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
