"use client";

import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { Utensils, Flame } from "lucide-react";
import { use } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";

const NutritionCard = () => {

  const { mealData } = use(DashBoardDataContext)

  const foodLog = mealData




  // Mock values for eaten & burned calories (you can adjust when API is ready)
  const eatenCalories = foodLog?.calories;
  const burnedCalories = 0; // no burned info in JSON
  const remainingCalories = foodLog?.dailyGoal - eatenCalories;

  // Macro breakdown
  const macros = [
    { name: "Carbohydrates", value: foodLog?.carbs, goal: 325, color: "bg-blue-400" },
    { name: "Proteins", value: foodLog?.protein, goal: 75, color: "bg-green-500" },
    { name: "Fats", value: foodLog?.fat, goal: 44, color: "bg-orange-400" },
  ];

  // Radial chart data
  const radialData = [
    { name: "Remaining", value: remainingCalories, fill: "#f97316" },
    { name: "Used", value: eatenCalories, fill: "#e5e7eb" }, // background
  ];

  return (
    <div className="p-6 rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-[var(--text-color-all)]">
        Calories Intake – {foodLog?.food}
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Circular Calories Left */}
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="100%"
              barSize={10}
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar minAngle={15} background clockWise dataKey="value" />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[var(--text-color-all)]">
              {remainingCalories} kcal
            </span>
            <p className="text-sm text-[var(--text-color-all)]">Calories left</p>
          </div>
        </div>

        {/* Right side info */}
        <div className="flex-1 space-y-4">
          {/* Calories summary */}
          <div className="flex items-center justify-between text-[var(--text-color-all)] ">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-green-500" />
              <span className="text-[var(--text-color-all)]" >{eatenCalories} kcal</span>
            </div>
            <span className="text-[var(--text-color-all)]">Eaten calories</span>
          </div>

          <div className="flex items-center justify-between text-[var(--text-color-all)] dark:text-gray-100">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <span className="text-[var(--text-color-all)]" >{burnedCalories} kcal</span>
            </div>
            <span className="text-[var(--text-color-all)]">Burned calories</span>
          </div>

          {/* Macro breakdown */}
          <div className="mt-4 space-y-3">
            {macros.map((macro, i) => {
              const percent = Math.round((macro.value / macro.goal) * 100);
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm text-[var(--text-color-all)] dark:text-gray-300">
                    <span className="text-[var(--text-color-all)]">
                      {macro.value}g / {macro.goal}g {macro.name}
                    </span>
                    <span className="text-[var(--text-color-all)]">{percent}%</span>
                  </div>
                  <div className="w-full text-[var(--text-color-all)] rounded-full h-3 overflow-hidden">
                    <div
                      className={`${macro.color} h-3 transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
