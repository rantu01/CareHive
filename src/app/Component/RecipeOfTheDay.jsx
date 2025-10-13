"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const recipes = [
  {
    image: "https://i.ibb.co.com/DfBZgYRc/salad.jpg",
    title: { bn: "গ্রিলড সবজি সালাদ", en: "Grilled Veggie Salad" },
    description: {
      bn: "তাজা সবজি দিয়ে ৫ মিনিটে স্বাস্থ্যকর সালাদ বানান।",
      en: "Prepare a healthy salad in just 5 minutes with fresh veggies.",
    },
    nutrition: {
      bn: "🌱 120 kcal | 4g প্রোটিন | 3g ফাইবার",
      en: "🌱 120 kcal | 4g Protein | 3g Fiber",
    },
    benefits: {
      bn: [
        "উচ্চ ফাইবার → হজমে সাহায্য করে",
        "ভিটামিন সমৃদ্ধ → ইমিউনিটি বাড়ায়",
        "কম ক্যালোরি → ওজন নিয়ন্ত্রণে সাহায্য করে",
      ],
      en: [
        "High in fiber → aids digestion",
        "Rich in vitamins → boosts immunity",
        "Low calorie → supports weight management",
      ],
    },
  },
  {
    image: "https://source.unsplash.com/400x250/?smoothie",
    title: { bn: "ফ্রেশ ফ্রুট স্মুদি", en: "Fresh Fruit Smoothie" },
    description: {
      bn: "প্রাকৃতিক ফল দিয়ে পুষ্টিকর স্মুদি তৈরি করুন।",
      en: "Make a nutritious smoothie using fresh fruits.",
    },
    nutrition: {
      bn: "🍓 150 kcal | 3g প্রোটিন | 5g ফাইবার",
      en: "🍓 150 kcal | 3g Protein | 5g Fiber",
    },
    benefits: {
      bn: [
        "ফল থেকে প্রাকৃতিক শর্করা → শক্তি দেয়",
        "ভিটামিন ও অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ",
        "হজমে সহায়ক এবং হাইড্রেশন বাড়ায়",
      ],
      en: [
        "Natural sugars from fruit → provides energy",
        "Rich in vitamins & antioxidants",
        "Aids digestion and boosts hydration",
      ],
    },
  },
  {
    image: "https://source.unsplash.com/400x250/?soup",
    title: { bn: "হালকা সূপ", en: "Light Soup" },
    description: {
      bn: "শরীরকে হাইড্রেট রাখার জন্য হালকা সূপ বানান।",
      en: "Make a light soup to keep your body hydrated.",
    },
    nutrition: {
      bn: "🥣 80 kcal | 2g প্রোটিন | 1g ফাইবার",
      en: "🥣 80 kcal | 2g Protein | 1g Fiber",
    },
    benefits: {
      bn: [
        "হাইড্রেশন বজায় রাখে",
        "কম ক্যালোরি → হজম সহজ করে",
        "ভিটামিন ও মিনারেল সমৃদ্ধ",
      ],
      en: [
        "Keeps hydration up",
        "Low calorie → easy digestion",
        "Rich in vitamins & minerals",
      ],
    },
  },
  {
    image: "https://source.unsplash.com/400x250/?oatmeal",
    title: { bn: "হালকা ওটমিল", en: "Light Oatmeal" },
    description: {
      bn: "সকালবেলার জন্য পুষ্টিকর ওটমিল বানান।",
      en: "Prepare nutritious oatmeal for breakfast.",
    },
    nutrition: {
      bn: "🥣 110 kcal | 4g প্রোটিন | 6g ফাইবার",
      en: "🥣 110 kcal | 4g Protein | 6g Fiber",
    },
    benefits: {
      bn: [
        "দীর্ঘস্থায়ী শক্তি দেয়",
        "হজম সহজ করে",
        "কোলেস্টেরল কমাতে সাহায্য করে",
      ],
      en: [
        "Provides long-lasting energy",
        "Easy digestion",
        "Helps reduce cholesterol",
      ],
    },
  },
  {
    image: "https://source.unsplash.com/400x250/?juice",
    title: { bn: "ফ্রেশ জুস", en: "Fresh Juice" },
    description: {
      bn: "প্রাকৃতিক ফলের রস দিয়ে হাইড্রেটেড থাকুন।",
      en: "Stay hydrated with fresh fruit juice.",
    },
    nutrition: {
      bn: "🍹 90 kcal | 1g প্রোটিন | 2g ফাইবার",
      en: "🍹 90 kcal | 1g Protein | 2g Fiber",
    },
    benefits: {
      bn: [
        "ভিটামিন C সমৃদ্ধ → ইমিউনিটি বাড়ায়",
        "দেহ হাইড্রেটেড রাখে",
        "এন্টিঅক্সিডেন্ট সমৃদ্ধ",
      ],
      en: [
        "Rich in Vitamin C → boosts immunity",
        "Keeps body hydrated",
        "Rich in antioxidants",
      ],
    },
  },
  {
    image: "https://source.unsplash.com/400x250/?yogurt",
    title: { bn: "দই", en: "Yogurt" },
    description: {
      bn: "দই খেয়ে হজম ভালো রাখুন।",
      en: "Eat yogurt to support good digestion.",
    },
    nutrition: {
      bn: "🥛 100 kcal | 5g প্রোটিন | 2g ফাইবার",
      en: "🥛 100 kcal | 5g Protein | 2g Fiber",
    },
    benefits: {
      bn: [
        "প্রোবায়োটিক সমৃদ্ধ → হজমে সাহায্য করে",
        "ক্যালসিয়াম সমৃদ্ধ → হাড় শক্ত রাখে",
        "কম ক্যালোরি → ওজন নিয়ন্ত্রণে সহায়ক",
      ],
      en: [
        "Rich in probiotics → aids digestion",
        "High in calcium → strengthens bones",
        "Low calorie → supports weight management",
      ],
    },
  },
];

const RecipeOfTheDay = () => {
  const [lang, setLang] = useState("bn");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {lang === "bn" ? "আজকের রেসিপি" : "Recipes of the Day"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-md border p-4 flex flex-col gap-3"
            style={{
              borderColor: "var(--dashboard-border)",
              backgroundColor: "var(--dashboard-bg)",
            }}
          >
            {/* Image */}
            <img
              src={recipe.image}
              alt={recipe.title[lang]}
              className="rounded-xl w-full object-cover h-40"
            />

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800">
              🍎 {recipe.title[lang]}
            </h3>

            {/* Description */}
            <p className="text-gray-700">{recipe.description[lang]}</p>

            {/* Nutrition */}
            <p className="text-green-600 font-medium">{recipe.nutrition[lang]}</p>

            {/* Buttons Row */}
            <div className="flex justify-between items-center mt-2">
              {/* Read More / Collapse (Underline) */}
              <span
                onClick={() => toggleExpanded(index)}
                className="text-green-600 font-medium cursor-pointer underline hover:text-green-700 transition"
              >
                {expandedIndex === index
                  ? lang === "bn"
                    ? "কমাও ↑"
                    : "Collapse ↑"
                  : lang === "bn"
                  ? "বিস্তারিত পড়ুন →"
                  : "Read More →"}
              </span>

              {/* Language Toggle */}
              <span
                onClick={() => setLang(lang === "bn" ? "en" : "bn")}
                className="text-blue-600 font-medium cursor-pointer underline hover:text-blue-700 transition"
              >
                {lang === "bn" ? "English" : "বাংলা"}
              </span>
            </div>

            {/* Expanded Section */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="list-disc list-inside space-y-1 text-gray-700 mt-2"
                >
                  {recipe.benefits[lang].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};


export default RecipeOfTheDay;