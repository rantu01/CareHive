"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  // count users by role
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(roleCounts).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  const COLORS = [
    "var(--color-calm-blue)",
    "var(--color-light-green)",
    "var(--dashboard-blue)",
    "var(--color-black)",
  ];

  return (
    <div className="p-4 sm:p-6 bg-[var(--dashboard-bg)] min-h-screen text-[var(--fourground-color)]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Layout wrapper → stack on mobile, grid on md+ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl p-4 sm:p-6 shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Users by Role</h2>
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl p-4 sm:p-6 shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse text-sm sm:text-base">
              <thead className="bg-[var(--sidebar-bg)]">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Name</th>
                  <th className="p-2 sm:p-3 text-left">Email</th>
                  <th className="p-2 sm:p-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--sidebar-bg)]">
                    <td className="p-2 sm:p-3">{user.name || "—"}</td>
                    <td className="p-2 sm:p-3">{user.email}</td>
                    <td className="p-2 sm:p-3 capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
