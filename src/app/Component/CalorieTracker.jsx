


// "use client";
// import { useState } from "react";

// export default function CalorieTracker() {
//   const [dailyGoal, setDailyGoal] = useState(2000);
//   const [meals, setMeals] = useState([]);
//   const [form, setForm] = useState({
//     food: "",
//     calories: "",
//     carbs: "",
//     protein: "",
//     fat: "",
//     portionSize: "",
//     type: "breakfast",
//   });

//   // Calculate total calories
//   const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);
//   const remainingCalories = dailyGoal - totalCalories;

//   // Add meal to list + send to backend
//   const handleAddMeal = async (e) => {
//     e.preventDefault();
//     if (!form.food || !form.calories) return;

//     // Update UI first
//     setMeals([...meals, form]);

//     try {
//       const res = await fetch("/api/calories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: "guest", // replace with real user later
//           ...form,
//           dailyGoal,
//         }),
//       });

//       const data = await res.json();
//       console.log("Saved to DB:", data);
//     } catch (error) {
//       console.error("Error saving meal:", error);
//     }

//     // Reset form
//     setForm({
//       food: "",
//       calories: "",
//       carbs: "",
//       protein: "",
//       fat: "",
//       portionSize: "",
//       type: "breakfast",
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       {/* Daily Goal */}
//       <div className="bg-white p-4 rounded-2xl shadow">
//         <h2 className="text-xl font-bold mb-3">Set Daily Calorie Goal</h2>
//         <input
//           type="number"
//           value={dailyGoal}
//           onChange={(e) => setDailyGoal(Number(e.target.value))}
//           className="border p-2 rounded w-40"
//           placeholder="2000"
//         />
//       </div>

//       {/* Food Entry Form */}
//       <div className="bg-white p-4 rounded-2xl shadow">
//         <h2 className="text-xl font-bold mb-3">Add Food</h2>
//         <form onSubmit={handleAddMeal} className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Food name"
//             value={form.food}
//             onChange={(e) => setForm({ ...form, food: e.target.value })}
//             className="border p-2 rounded col-span-2"
//           />
//           <input
//             type="number"
//             placeholder="Calories"
//             value={form.calories}
//             onChange={(e) => setForm({ ...form, calories: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Carbs (g)"
//             value={form.carbs}
//             onChange={(e) => setForm({ ...form, carbs: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Protein (g)"
//             value={form.protein}
//             onChange={(e) => setForm({ ...form, protein: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Fat (g)"
//             value={form.fat}
//             onChange={(e) => setForm({ ...form, fat: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Portion Size"
//             value={form.portionSize}
//             onChange={(e) => setForm({ ...form, portionSize: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <select
//             value={form.type}
//             onChange={(e) => setForm({ ...form, type: e.target.value })}
//             className="border p-2 rounded"
//           >
//             <option value="breakfast">Breakfast</option>
//             <option value="lunch">Lunch</option>
//             <option value="snack">Snack</option>
//             <option value="dinner">Dinner</option>
//           </select>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 hover:bg-blue-700"
//           >
//             Add Meal
//           </button>
//         </form>
//       </div>

//       {/* Summary Section */}
//       <div className="bg-white p-4 rounded-2xl shadow space-y-4">
//         <h2 className="text-xl font-bold">Daily Summary</h2>

//         {/* Progress bar */}
//         <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//           <div
//             className={`h-4 rounded-full ${
//               totalCalories > dailyGoal ? "bg-red-500" : "bg-green-500"
//             }`}
//             style={{ width: `${Math.min((totalCalories / dailyGoal) * 100, 100)}%` }}
//           ></div>
//         </div>
//         <p className="text-gray-700">
//           {totalCalories} / {dailyGoal} kcal consumed
//         </p>
//         <p
//           className={`font-semibold ${
//             remainingCalories < 0 ? "text-red-600" : "text-green-600"
//           }`}
//         >
//           Remaining: {remainingCalories} kcal
//         </p>

//         {/* Meal breakdown */}
//         <div>
//           <h3 className="font-semibold mb-2">Meals</h3>
//           {meals.length === 0 ? (
//             <p className="text-gray-500">No meals added yet.</p>
//           ) : (
//             <ul className="space-y-2">
//               {meals.map((meal, index) => (
//                 <li
//                   key={index}
//                   className="border p-2 rounded flex justify-between items-center"
//                 >
//                   <div>
//                     <p className="font-medium">{meal.food}</p>
//                     <p className="text-sm text-gray-600">
//                       {meal.type} • {meal.calories} kcal • {meal.carbs}g C |{" "}
//                       {meal.protein}g P | {meal.fat}g F
//                     </p>
//                   </div>
//                   <span className="text-gray-500 text-sm">{meal.portionSize}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";

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

  // Calculate total calories
  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);
  const remainingCalories = dailyGoal - totalCalories;

  // Fetch today's meals from backend on load
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("/api/calories?userId=guest"); // replace guest with real user
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setMeals(data);
          // If there are meals, update dailyGoal from latest meal
          if (data.length > 0) setDailyGoal(data[0].dailyGoal || 2000);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  // Add meal to list + send to backend
  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!form.food || !form.calories) return;

    const newMeal = { ...form };

    // Update UI immediately
    setMeals([...meals, newMeal]);

    try {
      const res = await fetch("/api/calories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "guest", // replace with logged-in user later
          ...form,
          dailyGoal,
        }),
      });

      const data = await res.json();
      console.log("Saved to DB:", data);
    } catch (error) {
      console.error("Error saving meal:", error);
    }

    // Reset form
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Daily Goal */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-3">Set Daily Calorie Goal</h2>
        <input
          type="number"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(Number(e.target.value))}
          className="border p-2 rounded w-40"
          placeholder="2000"
        />
      </div>

      {/* Food Entry Form */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-3">Add Food</h2>
        <form onSubmit={handleAddMeal} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Food name"
            value={form.food}
            onChange={(e) => setForm({ ...form, food: e.target.value })}
            className="border p-2 rounded col-span-2"
          />
          <input
            type="number"
            placeholder="Calories"
            value={form.calories}
            onChange={(e) => setForm({ ...form, calories: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            value={form.carbs}
            onChange={(e) => setForm({ ...form, carbs: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Protein (g)"
            value={form.protein}
            onChange={(e) => setForm({ ...form, protein: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Fat (g)"
            value={form.fat}
            onChange={(e) => setForm({ ...form, fat: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Portion Size"
            value={form.portionSize}
            onChange={(e) => setForm({ ...form, portionSize: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snack">Snack</option>
            <option value="dinner">Dinner</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 hover:bg-blue-700"
          >
            Add Meal
          </button>
        </form>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-bold">Daily Summary</h2>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-4 rounded-full ${
              totalCalories > dailyGoal ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${Math.min((totalCalories / dailyGoal) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-gray-700">
          {totalCalories} / {dailyGoal} kcal consumed
        </p>
        <p
          className={`font-semibold ${
            remainingCalories < 0 ? "text-red-600" : "text-green-600"
          }`}
        >
          Remaining: {remainingCalories} kcal
        </p>

        {/* Meal breakdown */}
        <div>
          <h3 className="font-semibold mb-2">Meals</h3>
          {meals.length === 0 ? (
            <p className="text-gray-500">No meals added yet.</p>
          ) : (
            <ul className="space-y-2">
              {meals.map((meal, index) => (
                <li
                  key={index}
                  className="border p-2 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{meal.food}</p>
                    <p className="text-sm text-gray-600">
                      {meal.type} • {meal.calories} kcal • {meal.carbs}g C |{" "}
                      {meal.protein}g P | {meal.fat}g F
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">{meal.portionSize}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
