


"use client";

import { motion } from "framer-motion";
import YogaTechnique from "../yoga-technique/page";
import ProgressPage from "../progress/page";
import AllGymPlansPage from "../gym-plans/page";
import Wellness from "@/app/Component/Wellness";
import { MdFitnessCenter } from "react-icons/md";

export default function Fitness() {
  return (
    <section
      className="relative overflow-hidden min-h-screen py-10"
      style={{
        background: "var(--bg-color-all)",
        color: "var(--text-color-all)",
      }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/25 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/25 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/2 w-[400px] h-[400px] bg-[var(--color-primary)]/10 blur-[220px] rounded-full animate-pulse-slow"></div>

      {/* Header Section */}
      <div className="relative container mx-auto px-6 pt-28 text-center z-10">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--dashboard-border)] backdrop-blur-md bg-white/10 mb-6"
        >
          <MdFitnessCenter
            className="text-2xl"
            style={{ color: "var(--color-primary)" }}
          />
          <span
            className="text-sm font-medium"
            style={{
              color: "var(--color-primary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Your Personalized Fitness Hub
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md"
          style={{
            fontFamily: "'Playfair Display', serif",
            backgroundImage:
              "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Elevate Your Fitness Journey
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed opacity-90 mb-16"
          style={{
            color: "var(--text-color-all)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Unlock your full potential with personalized{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Gym Plans
          </span>{" "}
          and mindful{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--color-secondary)" }}
          >
            Yoga Techniques
          </span>
          . Track progress, strengthen your body, and find balance — all in one
          elegant space.
        </motion.p>

        {/* Scrolling Image Section */}
        <div className="overflow-hidden relative mb-24">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-6 w-[200%]"
          >
            {[
              "https://i.postimg.cc/zvX3t33Z/pexels-vlada-karpovich-8940506.jpg",
              "https://i.postimg.cc/wvNnCkyc/pexels-cesar-galeao-1673528-3253501.jpg",
              "https://i.postimg.cc/cH3PpcgY/pexels-jonathanborba-3076516.jpg",
              "https://i.postimg.cc/SxK3S4Yk/pexels-leonmart-1552242.jpg",
              "https://i.postimg.cc/W4hBnVsY/pexels-mikhail-nilov-7500321.jpg",
              "https://i.postimg.cc/dQmxG3GX/pexels-pixabay-209969.jpg",
              "https://i.postimg.cc/qM1DZFbW/pexels-victorfreitas-841130.jpg",
              "https://i.postimg.cc/MTBgCYMQ/pexels-vlada-karpovich-8939945.jpg",
              // Duplicate for infinite loop effect
              "https://i.postimg.cc/zvX3t33Z/pexels-vlada-karpovich-8940506.jpg",
              "https://i.postimg.cc/wvNnCkyc/pexels-cesar-galeao-1673528-3253501.jpg",
              "https://i.postimg.cc/cH3PpcgY/pexels-jonathanborba-3076516.jpg",
              "https://i.postimg.cc/SxK3S4Yk/pexels-leonmart-1552242.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg"
                style={{ minWidth: "320px", height: "220px" }}
              >
                <img
                  src={src}
                  alt={`fitness-${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </motion.div>

          {/* Gradient Fade on Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-color-all)] to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-color-all)] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Inner Sections */}
      <div className="relative z-10">
        <AllGymPlansPage />
        <YogaTechnique />
        <Wellness />
        <ProgressPage />
      </div>
    </section>
  );
}

