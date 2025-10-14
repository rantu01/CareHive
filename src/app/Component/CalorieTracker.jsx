"use client";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function CalorieTracker() {
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({
    food: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    portionSize: "",
    type: "breakfast",
  });

  const { user, role, loading } = useUser();

  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);
  const remainingCalories = dailyGoal - totalCalories;

  // ✅ useEffect সবসময় চলবে, শুধু ভেতরে guard condition
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        if (!user?.uid) return;

        const res = await fetch(`/api/calories?userId=${user.uid}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setMeals(data);
          if (data.length > 0) setDailyGoal(data[0].dailyGoal || 2000);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [user]);

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!form.food || !form.calories) return;

    const newMeal = { ...form };
    setMeals([...meals, newMeal]);

    try {
      await fetch("/api/calories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid || "guest", ...form, dailyGoal }),
      });
    } catch (error) {
      console.error("Error saving meal:", error);
    }

    setForm({
      food: "",
      calories: "",
      carbs: "",
      protein: "",
      fat: "",
      portionSize: "",
      type: "breakfast",
    });
  };

  // ✅ এখন loading state safe ভাবে দেখানো যাবে
  if (loading) {
    return <p className="text-center p-6">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center p-6">No user logged in.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <h1
        className="text-xl font-medium text-center mb-2 transition-all duration-1000"
        style={{ color: "var(--fourground-color)" }}
      >
        Calorie Tracker – Track Your Daily Meals & Macros
      </h1>
      <p style={{ color: "var(--fourground-color)" }}>
        Easily log your meals, track calories, carbs, protein, and fats, and stay
        on top of your daily nutrition goals. Visualize your progress with an
        intuitive summary and progress bar.
      </p>

      {/* Daily Goal */}
      <div
        className="p-6 rounded-2xl shadow"
        style={{
          background: "var(--dashboard-bg)",
          color: "var(--fourground-color)",
        }}
      >
        <h2 className="text-xl font-bold mb-3">Set Daily Calorie Goal</h2>
        <input
          type="number"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(Number(e.target.value))}
          className="p-3 rounded w-40 focus:outline-none focus:ring-2 transition"
          style={{
            border: "1px solid var(--dashboard-border)",
            color: "var(--fourground-color)",
          }}
          placeholder="2000"
        />
      </div>

      {/* Food Entry Form */}
      <div
        className="p-6 rounded-2xl shadow"
        style={{
          background: "var(--dashboard-bg)",
          color: "var(--fourground-color)",
        }}
      >
        <h2 className="text-xl font-bold mb-3">Add Food</h2>
        <form onSubmit={handleAddMeal} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Food name"
            value={form.food}
            onChange={(e) => setForm({ ...form, food: e.target.value })}
            className="p-3 rounded col-span-2 focus:outline-none focus:ring-2 transition"
            style={{
              border: "1px solid var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
          <input
            type="number"
            placeholder="Calories"
            value={form.calories}
            onChange={(e) => setForm({ ...form, calories: e.target.value })}
            className="p-3 rounded focus:outline-none focus:ring-2 transition"
            style={{
              border: "1px solid var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            value={form.carbs}
            onChange={(e) => setForm({ ...form, carbs: e.target.value })}
            className="p-3 rounded focus:outline-none focus:ring-2 transition"
            style={{
              border: "1px solid var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
          <input
            type="number"
            placeholder="Protein (g)"
            value={form.protein}
            onChange={(e) => setForm({ ...form, protein: e.target.value })}
            className="p-3 rounded focus:outline-none focus:ring-2 transition"
            style={{
              border: "1px solid var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
          <input
            type="number"
            placeholder="Fat (g)"
            value={form.fat}
            onChange={(e) => setForm({ ...form, fat: e.target.value })}
            className="p-3 rounded focus:outline-none focus:ring-2 transition"
            style={{
              border: "1px solid var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
          <input
            type="text"
            placeholder="Portion Size"
            value={form.portionSize}
            onChange={(e) => setForm({ ...form, portionSize: e.target.value })}
            className="p-3 rounded focus:outline-none focus:ring-2 transition"
            style={{
              border: "1px solid var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-3 rounded focus:outline-none focus:ring-2 transition"
            style={{
              border: "1px solid var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snack">Snack</option>
            <option value="dinner">Dinner</option>
          </select>
          <button
            type="submit"
            className="col-span-2 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition transform mb-8"
            style={{
              background:
                "linear-gradient(90deg, var(--color-calm-blue), var(--fourground-color))",
            }}
          >
            Add Meal
          </button>
        </form>
      </div>

      {/* Summary Section */}
      <div
        className="p-6 rounded-2xl shadow space-y-4"
        style={{
          background: "var(--dashboard-bg)",
          color: "var(--fourground-color)",
        }}
      >
        <h2 className="text-xl font-bold">Daily Summary</h2>

        {/* Progress bar */}
        <div
          className="w-full rounded-full h-5 overflow-hidden"
          style={{
            background: "var(--gray-color)",
            border: "1px solid var(--dashboard-border)",
          }}
        >
          <div
            className="h-5 rounded-full transition-all"
            style={{
              width: `${Math.min((totalCalories / dailyGoal) * 100, 100)}%`,
              background:
                totalCalories > dailyGoal ? "tomato" : "var(--color-primary)",
            }}
          ></div>
        </div>

        <p>
          {totalCalories} / {dailyGoal} kcal consumed
        </p>
        <p
          className="font-semibold"
          style={{
            color:
              remainingCalories < 0 ? "tomato" : "var(--color-primary)",
          }}
        >
          Remaining: {remainingCalories} kcal
        </p>

        {/* Meal breakdown */}
        <div>
          <h3 className="font-semibold mb-2">Meals</h3>
          {meals.length === 0 ? (
            <p style={{ color: "var(--fourground-color)" }}>
              No meals added yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {meals.map((meal, index) => (
                <li
                  key={index}
                  className="p-3 rounded flex justify-between items-center transition"
                  style={{
                    border: "1px solid var(--dashboard-border)",
                    background: "var(--gray-color)",
                  }}
                >
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: "var(--fourground-color)" }}
                    >
                      {meal.food}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--fourground-color)" }}
                    >
                      {meal.type} • {meal.calories} kcal • {meal.carbs}g C |{" "}
                      {meal.protein}g P | {meal.fat}g F
                    </p>
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    {meal.portionSize}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
