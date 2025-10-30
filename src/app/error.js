"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--dashboard-bg)] text-[var(--text-color-all)] text-center p-6 relative overflow-hidden">
      {/* Background gradient blob */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.9 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] blur-3xl"
      />

      {/* ⚠️ Icon */}
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="z-10"
      >
        <AlertTriangle className="w-20 h-20 text-yellow-500" />
      </motion.div>

      {/* Message */}
      <h1 className="text-3xl sm:text-4xl font-bold mt-4 z-10">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md z-10">
        We’re working to fix the issue. Please try refreshing or go back to
        safety.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 z-10">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] shadow-md hover:shadow-lg hover:opacity-90 transition-all"
        >
          <RefreshCcw className="w-5 h-5" />
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
