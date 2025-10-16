"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Star, Leaf, Heart, Zap, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const RecipeOfTheDay = () => {
  const [recipes, setRecipes] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/api/RecipeOfTheDay");
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading recipes...</p>;

  return (
    <div className="min-h-screen mt-24 py-16 px-4 bg-[var(--dashboard-bg)] container mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            Healthy Recipes
          </span>
          <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)] font-heading">
          Recipe of the Day
        </h2>
        <p className="text-xl text-[var(--fourground-color)] leading-relaxed opacity-80">
          Discover delicious and nutritious recipes to support your wellness journey. Each dish is
          carefully selected for health benefits and ease of preparation.
        </p>
      </div>

      {/* Recipes Grid */}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto">
        {recipes.map((recipe, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[var(--gray-color)] rounded-3xl shadow-lg border border-[var(--dashboard-border)] overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    {renderStars(recipe.rating)}
                    <span className="text-sm font-semibold text-[var(--fourground-color)] ml-1">
                      {recipe.rating}
                    </span>
                  </div>
                  {/* Prep Time Badge */}
                  <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">{recipe.prepTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[var(--fourground-color)] pr-2">{recipe.title}</h3>
                    <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 px-2 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <p className="text-[var(--fourground-color)] opacity-80 mb-4 leading-relaxed">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4 p-3 bg-[var(--gray-color)] rounded-xl">
                    <Leaf className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-[var(--fourground-color)]">
                      {recipe.nutrition}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => toggleExpand(index)}
                    className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-calm-blue)] transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isExpanded ? "Show Less" : "View Benefits"}
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className="border-t border-[var(--dashboard-border)] pt-4">
                          <h4 className="font-semibold text-[var(--color-primary)] mb-3 flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Health Benefits
                          </h4>
                          <ul className="space-y-2">
                            {recipe.benefits.map((benefit, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3 text-[var(--fourground-color)]"
                              >
                                <Zap className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      
    </div>
  );
};

export default RecipeOfTheDay;
