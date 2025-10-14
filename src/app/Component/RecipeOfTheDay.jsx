"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosSwitch } from "react-icons/io";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

// Recipes data
const recipes = [
  {
    image: "https://i.ibb.co/DfBZgYRc/salad.jpg",
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
    image: "https://i.ibb.co/JFtB0BLz/fresh-jush.jpg",
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
    image: "https://i.ibb.co/pjNs5Ym9/light-soup.jpg",
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
    image: "https://i.ibb.co/mCsXD2QP/oatmeal.jpg",
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
    image: "https://i.ibb.co/fzm7gb7G/fresh-natural-jusce.jpg",
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
    image: "https://i.ibb.co/B522p96p/yogurt.jpg",
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
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [langs, setLangs] = useState(Array(recipes.length).fill("en"));

  const toggleLang = (index) => {
    setLangs((prev) =>
      prev.map((l, i) => (i === index ? (l === "bn" ? "en" : "bn") : l))
    );
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      <h2
        className="text-4xl font-extrabold text-center mb-10"
        style={{ color: "var(--fourground-color)", fontFamily: "var(--font-heading)" }}
      >
        Recipe of the Day 🍽️
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto">
        {recipes.map((recipe, index) => {
          const lang = langs[index];
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{
                backgroundColor: "var(--color-white)",
                border: `1px solid var(--dashboard-border)`,
              }}
            >
              {/* Image */}
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={recipe.image}
                  alt={recipe.title[lang]}
                  className="w-full h-56 object-cover"
                  animate={{ scale: isExpanded ? 1.08 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              <div className="p-6">
                {/* Title + Language toggle */}
                <div className="flex justify-between items-center mb-3">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "var(--fourground-color)", fontFamily: "var(--font-primary)" }}
                  >
                    {recipe.title[lang]}
                  </h3>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLang(index);
                    }}
                    className="text-sm font-semibold flex items-center space-x-1"
                    style={{ color: "var(--dashboard-blue)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IoIosSwitch />
                    <span>{lang === "bn" ? "EN" : "BN"}</span>
                  </motion.button>
                </div>

                <p style={{ color: "var(--fourground-color)" }}>{recipe.description[lang]}</p>

                <motion.button
                  onClick={() => toggleExpand(index)}
                  className="mt-2 font-semibold flex items-center space-x-1"
                  style={{ color: "var(--dashboard-blue)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{isExpanded ? "Show Less" : "Read More"}</span>
                  {isExpanded ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                </motion.button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4"
                    >
                      <p
                        className="font-semibold mb-2"
                        style={{ color: "var(--fourground-color)" }}
                      >
                        {recipe.nutrition[lang]}
                      </p>
                      <ul
                        className="list-disc ml-5"
                        style={{ color: "var(--fourground-color)" }}
                      >
                        {recipe.benefits[lang].map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeOfTheDay;
