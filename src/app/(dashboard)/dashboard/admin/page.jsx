"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    users: 0,
    others: 0,
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);

        // Calculate stats
        const roleCounts = data.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        setStats({
          total: data.length,
          admins: roleCounts.admin || 0,
          users: roleCounts.user || 0,
          others: Object.keys(roleCounts)
            .filter((role) => !["admin", "user"].includes(role))
            .reduce((sum, role) => sum + roleCounts[role], 0),
        });
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(roleCounts).map(([role, count]) => ({
    name: role.charAt(0).toUpperCase() + role.slice(1),
    value: count,
  }));

  const COLORS = [
    "var(--dashboard-blue)",
    "var(--color-light-green)",
    "var(--color-calm-blue)",
    "var(--color-black)",
    "var(--gray-color)",
    "var(--fourground-color)",
  ];

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[var(--dashboard-bg)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[var(--dashboard-blue)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-[var(--fourground-color)]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gray-color)] p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--color-light-green)] bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-[var(--fourground-color)] mt-2">Manage and monitor your user base</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--fourground-color)] opacity-70">Total Users</p>
              <p className="text-3xl font-bold text-[var(--fourground-color)] mt-2">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-[var(--dashboard-blue)]/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--fourground-color)] opacity-70">Admins</p>
              <p className="text-3xl font-bold text-[var(--fourground-color)] mt-2">{stats.admins}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--fourground-color)] opacity-70">Regular Users</p>
              <p className="text-3xl font-bold text-[var(--fourground-color)] mt-2">{stats.users}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">😊</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--fourground-color)] opacity-70">Other Roles</p>
              <p className="text-3xl font-bold text-[var(--fourground-color)] mt-2">{stats.others}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔧</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Pie Chart Card */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[var(--fourground-color)]">User Distribution</h2>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="var(--dashboard-bg)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} users`, "Count"]}
                  contentStyle={{
                    backgroundColor: "var(--dashboard-bg)",
                    border: "1px solid var(--dashboard-border)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-sm text-[var(--fourground-color)]">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Table Card */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl shadow-lg border border-[var(--dashboard-border)] overflow-hidden">
          <div className="p-6 border-b border-[var(--dashboard-border)]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--fourground-color)]">User Management</h2>
              <span className="bg-[var(--dashboard-blue)] text-white px-3 py-1 rounded-full text-sm font-medium">
                {users.length} users
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--gray-color)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--fourground-color)] uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--fourground-color)] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--fourground-color)] uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--dashboard-border)]">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--gray-color)] transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--color-light-green)] rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="text-sm font-medium text-[var(--fourground-color)]">{user.name || "—"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[var(--fourground-color)] opacity-80">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize
                          ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : user.role === "user"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-[var(--dashboard-border)] bg-[var(--gray-color)]">
            <div className="flex items-center justify-between text-sm text-[var(--fourground-color)]">
              <span>
                Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, users.length)} of {users.length} users
              </span>
              <div className="flex items-center space-x-4">
                <button
                  className="px-3 py-1 rounded-md border border-[var(--dashboard-border)] hover:bg-[var(--dashboard-blue)] hover:text-white transition"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 rounded-md border border-[var(--dashboard-border)] hover:bg-[var(--dashboard-blue)] hover:text-white transition"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
