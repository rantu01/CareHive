"use client";

import { use } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
  Cell,
} from "recharts";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";

// Custom tooltip for modern look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white p-3 shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-blue-500">
          {payload[0].value} {payload[0].unit || ""}
        </p>
      </div>
    );
  }
  return null;
};

const HealthStatsBarChart = () => {
  const { userHealthStats } = use(DashBoardDataContext);

  if (!userHealthStats || userHealthStats.length === 0) {
    return <p>No health data available</p>;
  }

  const chartData = userHealthStats.map((stat) => ({
    title: stat.title,
    value: stat.value,
  }));

  // Define some modern gradient colors
  const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="w-full h-[300px] rounded-2xl shadow-sm ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          barSize={40}
        >
          <defs>
            {colors.map((color, index) => (
              <linearGradient
                key={index}
                id={`color${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                <stop offset="95%" stopColor={color} stopOpacity={0.4} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="title" tick={{ fill: "#6b7280" }} />
          <YAxis tick={{ fill: "#6b7280" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
          <Legend />
          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]} // Rounded top
            animationDuration={800}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#color${index % colors.length})`}
                stroke="none"
                style={{
                  filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthStatsBarChart;
