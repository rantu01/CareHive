"use client";

import { use  } from "react";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";

const HealthStatsBarChart = () => {
  const { userHealthStats } = use(DashBoardDataContext);

  if (!userHealthStats || userHealthStats.length === 0) {
    return <p>No health data available</p>;
  }

  // Format data for chart (optional: include target if exists)
  const chartData = userHealthStats.map((stat) => ({
    title: stat.title,
    value: stat.value,
    target: stat.target || 0,
  }));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" name="Value" />
          {chartData.some((d) => d.target) && <Bar dataKey="target" fill="#82ca9d" name="Target" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthStatsBarChart;
