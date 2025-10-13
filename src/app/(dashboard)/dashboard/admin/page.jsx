"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const usersPerPage = 5;

  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    users: 0,
    others: 0,
    active: 0,
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
          active: Math.floor(data.length * 0.85), // Simulating active users
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

  const activityData = [
    { name: "Mon", users: 40 },
    { name: "Tue", users: 65 },
    { name: "Wed", users: 52 },
    { name: "Thu", users: 78 },
    { name: "Fri", users: 90 },
    { name: "Sat", users: 55 },
    { name: "Sun", users: 45 },
  ];

  const COLORS = [
    "var(--dashboard-blue)",
    "var(--color-light-green)",
    "var(--color-calm-blue)",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
  ];

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[var(--dashboard-bg)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[var(--color-light-green)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-[var(--fourground-color)] font-semibold">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gray-color)] p-4 sm:p-6 lg:p-8">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--color-light-green)] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-[var(--fourground-color)] mt-2 opacity-80 text-lg">
              Welcome back! Manage and monitor your user base efficiently
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 group"
              style={{
                backgroundColor: "var(--color-light-green)",
                background: "linear-gradient(135deg, var(--color-light-green), var(--color-calm-blue))",
              }}
            >
              <span>Generate Report</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 p-2 bg-[var(--dashboard-bg)] rounded-2xl border border-[var(--dashboard-border)] w-fit">
        {["overview", "users", "analytics", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
              activeTab === tab 
                ? "text-white shadow-lg" 
                : "text-[var(--fourground-color)] hover:bg-[var(--gray-color)]"
            }`}
            style={{
              backgroundColor: activeTab === tab ? "var(--color-light-green)" : "transparent",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Users", value: stats.total, icon: "👥", color: "var(--dashboard-blue)" },
          { title: "Admin Users", value: stats.admins, icon: "⚡", color: "#ef4444" },
          { title: "Regular Users", value: stats.users, icon: "😊", color: "var(--color-light-green)" },
          { title: "Active Users", value: stats.active, icon: "📈", color: "#8b5cf6" },
        ].map((stat, index) => (
          <div 
            key={stat.title}
            className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group"
          >
            {/* Background Effect */}
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            ></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--fourground-color)] opacity-70">{stat.title}</p>
                  <p className="text-3xl font-bold text-[var(--fourground-color)] mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs text-green-500 font-medium">↑ 12%</span>
                    <span className="text-xs text-[var(--fourground-color)] opacity-70">from last week</span>
                  </div>
                </div>
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Enhanced Pie Chart Card */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5"
               style={{
                 backgroundImage: `radial-gradient(circle at 25px 25px, var(--color-light-green) 2%, transparent 0%)`,
                 backgroundSize: '50px 50px'
               }}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[var(--fourground-color)]">User Distribution</h2>
                <p className="text-sm text-[var(--fourground-color)] opacity-70 mt-1">Role-based user breakdown</p>
              </div>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-light-green)" }}
              >
                Export Data
              </button>
            </div>
            <div className="w-full h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
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
                        strokeWidth={3}
                        className="hover:opacity-80 transition-opacity duration-300"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} users`, "Count"]}
                    contentStyle={{
                      backgroundColor: "var(--dashboard-bg)",
                      border: "1px solid var(--dashboard-border)",
                      borderRadius: "12px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      color: "var(--fourground-color)",
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
        </div>

        {/* Enhanced Users Table Card */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl shadow-2xl border border-[var(--dashboard-border)] overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-20"
               style={{ backgroundColor: "var(--color-light-green)" }}></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-20"
               style={{ backgroundColor: "var(--color-calm-blue)" }}></div>
          
          <div className="relative z-10">
            <div className="p-6 border-b border-[var(--dashboard-border)] bg-gradient-to-r from-[var(--dashboard-bg)] to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--fourground-color)]">User Management</h2>
                  <p className="text-sm text-[var(--fourground-color)] opacity-70 mt-1">Manage all user accounts</p>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <span className="bg-[var(--color-light-green)] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {users.length} total users
                  </span>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    style={{ backgroundColor: "var(--color-light-green)" }}
                  >
                    <span>Add User</span>
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Table */}
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--fourground-color)] uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--dashboard-border)]">
                  {currentUsers.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-[var(--gray-color)] transition-all duration-300 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-medium mr-3 shadow-lg transition-transform duration-300 group-hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]}, var(--color-light-green))`
                            }}
                          >
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[var(--fourground-color)]">
                              {user.name || "Unknown User"}
                            </div>
                            <div className="text-xs text-[var(--fourground-color)] opacity-70">
                              Joined {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--fourground-color)] opacity-80">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium capitalize shadow-sm transition-all duration-300 hover:scale-105
                            ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : user.role === "user"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-purple-100 text-purple-800 border border-purple-200"
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            style={{ backgroundColor: "var(--color-light-green)" }}
                            title="Edit User"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-red-500"
                            title="Delete User"
                          >
                            <svg className="w-4 h-4 text-gray-600 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Pagination */}
            <div className="px-6 py-4 border-t border-[var(--dashboard-border)] bg-[var(--gray-color)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-[var(--fourground-color)]">
                <span className="mb-2 sm:mb-0">
                  Showing <strong>{startIndex + 1}-{Math.min(startIndex + usersPerPage, users.length)}</strong> of <strong>{users.length}</strong> users
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{
                      backgroundColor: currentPage === 1 ? "var(--gray-color)" : "var(--color-light-green)",
                      color: currentPage === 1 ? "var(--fourground-color)" : "white",
                      border: currentPage === 1 ? "1px solid var(--dashboard-border)" : "none",
                    }}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === page 
                              ? "text-white shadow-lg scale-110" 
                              : "text-[var(--fourground-color)] hover:bg-[var(--dashboard-border)]"
                          }`}
                          style={{
                            backgroundColor: currentPage === page ? "var(--color-light-green)" : "transparent",
                          }}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{
                      backgroundColor: currentPage === totalPages ? "var(--gray-color)" : "var(--color-light-green)",
                      color: currentPage === totalPages ? "var(--fourground-color)" : "white",
                      border: currentPage === totalPages ? "1px solid var(--dashboard-border)" : "none",
                    }}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Section */}
      <div className="mt-8 bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--fourground-color)]">Weekly User Activity</h2>
            <p className="text-sm text-[var(--fourground-color)] opacity-70 mt-1">User engagement over the past week</p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--color-light-green)" }}
          >
            View Details
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--dashboard-border)" />
              <XAxis dataKey="name" stroke="var(--fourground-color)" />
              <YAxis stroke="var(--fourground-color)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--dashboard-bg)",
                  border: "1px solid var(--dashboard-border)",
                  borderRadius: "12px",
                  color: "var(--fourground-color)",
                }}
              />
              <Bar 
                dataKey="users" 
                radius={[4, 4, 0, 0]}
                style={{ fill: "var(--color-light-green)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}