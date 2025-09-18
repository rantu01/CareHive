"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // SSR safe
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = theme === "light";

  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="relative w-14 h-8 flex items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {/* Background icons */}
      <Sun className="absolute left-1 w-3 h-3 text-yellow-300" />
      <Moon className="absolute right-1 w-3 h-3 text-blue-400" />

      {/* Sliding circle */}
      <span
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isLight ? "translate-x-0" : "translate-x-6"
        } flex items-center justify-center`}
      >
        {/* Always render the correct icon */}
        <Sun className={`w-4 h-4 text-yellow-400 ${!isLight ? "hidden" : ""}`} />
        <Moon className={`w-4 h-4 text-blue-400 ${isLight ? "hidden" : ""}`} />
      </span>
    </button>
  );
}
