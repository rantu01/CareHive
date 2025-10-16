"use client";
import React from "react";
import Link from "next/link";
import { Leaf, Utensils, Star } from "lucide-react";
import { motion } from "framer-motion";

const RecipeHighlightSection = () => {
  return (
    <section className="py-20 bg-[var(--dashboard-bg)] text-center">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            Wellness & Nutrition
          </span>
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)] font-heading">
          Discover the <span className="text-[var(--fourground-color)]">Recipe of the Day</span>
        </h2>

        <p className="text-lg text-[var(--fourground-color)] opacity-80 mb-10 max-w-3xl mx-auto leading-relaxed">
          Explore healthy, delicious recipes crafted by our experts to support your daily wellness goals.
        </p>

        {/* Preview Card */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto bg-[var(--gray-color)] rounded-3xl shadow-lg border border-[var(--dashboard-border)] overflow-hidden"
        >
          <div className="relative">
            <img
              src="https://i.ibb.co.com/wFhLsMqZ/f3.png"
              alt="Recipe of the Day"
              className="w-full h-72 object-cover"
            />
            <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
              <Utensils className="w-4 h-4" />
              <span className="text-sm font-semibold">Healthy Meal</span>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium text-[var(--fourground-color)] text-sm">4.8</span>
            </div>
          </div>

          <div className="p-6 text-left">
            <h3 className="text-xl font-bold text-[var(--fourground-color)] mb-2">
              Avocado Quinoa Salad
            </h3>
            <p className="text-[var(--fourground-color)] opacity-80 mb-4">
              A refreshing mix of quinoa, avocado, and greens for your daily energy boost.
            </p>

            <Link href="/RecipeOfTheDay">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Recipe of the Day <Leaf className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeHighlightSection;
