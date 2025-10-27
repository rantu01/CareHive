"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Star,
  Leaf,
  Heart,
  Zap,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const RecipeOfTheDay = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  // 🔹 Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  // 🔹 AI Suggestion
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // 🔹 Modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch recipes
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

  // Ask AI
  const handleAskAI = async () => {
    if (!query.trim()) return;
    setAiLoading(true);
    setAiResponse("");
    try {
      const res = await axios.post("/api/health-recipe-ai", { healthGoal: query });
      setAiResponse(res.data.message || "No suggestion found.");
    } catch (err) {
      console.error(err);
      setAiResponse("Error: Unable to get response from AI.");
    } finally {
      setAiLoading(false);
    }
  };

  // Render stars
  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));

  // 🔹 Filtered Recipes (useMemo must be above return)
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "All" || recipe.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [recipes, searchTerm, difficultyFilter]);

  // 🔹 Pagination Logic
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) return <p className="text-center text-lg mt-10">Loading recipes...</p>;

  return (
    <div className="min-h-screen mt-24 py-16 px-4 bg-[var(--dashboard-bg)] container mx-auto">
      {/* Header */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
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

        <p className="text-xl text-[var(--text-color-all)] leading-relaxed opacity-80 mb-6">
          Tell our AI about your health goals — it’ll suggest what food or recipe suits you best.
        </p>

        {/* AI Section */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. I want low-carb recipes for weight loss"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--dashboard-border)] bg-[var(--bg-color-all)] text-[var(--text-color-all)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />
            <motion.button
              onClick={handleAskAI}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={aiLoading}
              className="px-5 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold flex items-center gap-2 hover:bg-[var(--color-secondary)] transition"
            >
              {aiLoading ? "Thinking..." : (<><Send className="w-4 h-4" /> Ask AI</>)}
            </motion.button>
          </div>

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] text-[var(--text-color-all)] text-sm leading-relaxed whitespace-pre-line"
            >
              {aiResponse}
            </motion.div>
          )}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 justify-center mb-10">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--dashboard-border)] bg-[var(--bg-color-all)] text-[var(--text-color-all)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          />
          <select
            value={difficultyFilter}
            onChange={(e) => { setDifficultyFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-3 rounded-xl border border-[var(--dashboard-border)] bg-[var(--bg-color-all)] text-[var(--text-color-all)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Recipes Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto"
        >
          {currentRecipes.map((recipe, index) => (
            <motion.div
              key={index}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[var(--bg-color-all)] rounded-3xl shadow-lg border border-[var(--dashboard-border)] overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    {renderStars(recipe.rating)}
                    <span className="text-sm font-semibold ml-1">{recipe.rating}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">{recipe.prepTime}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold pr-2">{recipe.title}</h3>
                    <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 px-2 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <p className="opacity-80 mb-4 leading-relaxed">{recipe.description}</p>
                  <div className="flex items-center gap-2 mb-4 p-3 bg-[var(--bg-color-all)] rounded-xl">
                    <Leaf className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-sm font-medium">{recipe.nutrition}</span>
                  </div>
                  <motion.button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Benefits
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[var(--color-primary)] hover:text-white border-[var(--dashboard-border)]"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </motion.button>

          <span className="text-sm font-semibold text-[var(--text-color-all)]">
            Page {currentPage} of {totalPages}
          </span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[var(--color-primary)] hover:text-white border-[var(--dashboard-border)]"
            }`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[var(--bg-color-all)] text-[var(--text-color-all)] rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-[var(--dashboard-border)]"
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 text-[var(--text-color-all)] hover:text-[var(--color-primary)] transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold mb-2 text-[var(--color-primary)]">{selectedRecipe.title}</h3>
              <p className="opacity-80 mb-4">{selectedRecipe.description}</p>

              <div className="mb-4 flex items-center gap-3">
                <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm">{selectedRecipe.prepTime}</span>
              </div>

              <h4 className="font-semibold text-[var(--color-primary)] mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4" /> Health Benefits
              </h4>

              <ul className="space-y-2">
                {selectedRecipe.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Zap className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeOfTheDay;
