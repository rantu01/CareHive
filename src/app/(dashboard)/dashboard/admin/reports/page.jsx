"use client";

import { useEffect, useState } from "react";

// Note: If 'toast' is not globally available (e.g., from react-hot-toast),
// the exportToPDF function will cause an error. I've added a mock console.log
// to prevent a hard crash if 'toast' is undefined.
const mockToast = {
  success: (message) => console.log(`[TOAST]: ${message}`),
};

// 💅 NEW: A simple, reusable Card component for mobile-friendly table rows 
// is the ideal professional solution, but for an in-place refactor, 
// we will focus on maximizing table scroll and compact design.

export default function ReportPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalBlogs: 0,
    totalServices: 0,
    adminCount: 0,
    regularUserCount: 0,
  });

  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRes = await fetch("/api/users");
        const usersData = await usersRes.json();

        const blogsRes = await fetch("/api/blogs");
        // Assuming blogsData.blogs is an array, or an empty array if not successful
        const blogsData = await blogsRes.json();
        const blogsArray = blogsData.success ? blogsData.blogs : [];

        const servicesRes = await fetch("/api/services");
        const servicesData = await servicesRes.json();

        const doctorCount = usersData.filter((u) => u.role === "doctor").length;
        const adminCount = usersData.filter((u) => u.role === "admin").length;
        const regularUserCount = usersData.filter((u) => u.role === "user").length;

        setStats({
          totalUsers: usersData.length,
          totalDoctors: doctorCount,
          totalBlogs: blogsArray.length,
          totalServices: servicesData.length,
          adminCount,
          regularUserCount,
        });

        setUsers(usersData);
        setBlogs(blogsArray);
        setServices(servicesData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    // 💡 Improvement: Reduced overall padding for spinner container on mobile (p-4)
    return (
      <div
        className="flex justify-center items-center min-h-screen p-4"
        style={{ backgroundColor: "var(--bg-color-all)" }}
      >
        <div className="flex flex-col items-center space-y-6">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full animate-spin border-4 border-t-transparent" // 💡 Smaller spinner on mobile
            style={{
              borderColor: "var(--color-primary)",
              borderTopColor: "transparent",
            }}
          ></div>
          <div className="text-center">
            <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: "var(--text-color-all)" }}>
              Generating Report
            </p>
            <p className="text-xs sm:text-sm opacity-70" style={{ color: "var(--text-color-all)" }}>
              Please wait while we compile your data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const printReport = () => {
    window.print();
  };

  const exportToPDF = () => {
    // Using mockToast to avoid crashing if 'toast' is not imported/defined
    (typeof toast !== 'undefined' ? toast : mockToast).success("PDF export feature coming soon!");
  };

  // Helper function to get recent 5 items based on createdAt
  const getRecent = (array) => {
    return [...array]
      .sort((a, b) => {
        // Universal sorting logic for Mongoose/MongoDB timestamps
        const dateA = Number(
          a?.createdAt?.$date?.$numberLong || a?.createdAt || Date.now()
        );
        const dateB = Number(
          b?.createdAt?.$date?.$numberLong || b?.createdAt || Date.now()
        );
        return dateB - dateA;
      })
      .slice(0, 5);
  };

  const recentUsers = getRecent(users);
  const recentBlogs = getRecent(blogs);
  const recentServices = getRecent(services);

  // Role distribution
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-color-all)",
      }}
      // 💡 Improvement: More compact padding on mobile (p-4), scaling up
      className="print:p-4 p-4 sm:p-6 md:p-8" 
    >
      {/* Enhanced Header */}
      {/* 💡 Improvement: Reduced vertical gap (gap-4) and smaller header text on mobile (text-3xl) */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="text-center lg:text-left">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4" // 💡 Smaller h1 on mobile
            style={{ color: "var(--color-primary)" }}
          >
            Management Report
          </h1>
          <p
            className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto lg:mx-0" // 💡 Smaller p on mobile
            style={{ color: "var(--text-color-all)" }}
          >
            Comprehensive overview of platform statistics, user activities, and content management
          </p>
          <div className="flex items-center gap-2 mt-3 justify-center lg:justify-start">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></div>
            <span className="text-xs sm:text-sm opacity-70" style={{ color: "var(--text-color-all)" }}>
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* 💡 Improvement: Smaller gap and smaller buttons on mobile (px-4 py-2) */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center lg:justify-end">
          <button
            onClick={printReport}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 group justify-center text-sm sm:text-base"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            <span className="hidden sm:inline">Print Report</span>
            <span className="sm:hidden">Print</span>
          </button>
          <button
            onClick={exportToPDF}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 group justify-center text-sm sm:text-base"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      {/* 💡 Improvement: Tighter padding on mobile for tabs (p-1) and smaller text (text-xs) */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-8 p-1 sm:p-2 bg-[var(--dashboard-bg)] rounded-2xl border border-[var(--dashboard-border)] w-full sm:w-fit mx-auto lg:mx-0 justify-center lg:justify-start">
        {["overview", "users", "content", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 capitalize text-xs sm:text-base ${
              activeTab === tab 
                ? "text-white shadow-lg" 
                : "text-[var(--text-color-all)] hover:bg-[var(--bg-color-all)]"
            }`}
            style={{
              backgroundColor: activeTab === tab ? "var(--color-primary)" : "transparent",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Enhanced Stats Summary */}
      {/* Grid adapts from 1 to 2 to 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"> {/* 💡 Reduced gap on mobile */}
        {[
          { 
            title: "Total Users", 
            value: stats.totalUsers, 
            icon: "👥",
            description: "All platform users",
            trend: "+12%"
          },
          { 
            title: "Medical Doctors", 
            value: stats.totalDoctors, 
            icon: "👨‍⚕️",
            description: "Verified professionals",
            trend: "+5%"
          },
          { 
            title: "Blog Articles", 
            value: stats.totalBlogs, 
            icon: "📝",
            description: "Published content",
            trend: "+8%"
          },
          { 
            title: "Services", 
            value: stats.totalServices, 
            icon: "🛠️",
            description: "Available services",
            trend: "+3%"
          },
        ].map((stat, index) => (
          <div
            key={stat.title}
            // 💡 Improvement: Reduced padding on mobile (p-4)
            className="rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 relative overflow-hidden group"
            style={{
              backgroundColor: "var(--dashboard-bg)",
              borderColor: "var(--dashboard-border)",
            }}
          >
            {/* Background Effect */}
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-emerald-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            ></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm font-semibold opacity-70 mb-0.5 sm:mb-1" style={{ color: "var(--text-color-all)" }}>
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--color-primary)" }}> {/* 💡 Smaller text on mobile */}
                    {stat.value}
                  </p>
                </div>
                <div className="text-2xl sm:text-3xl transform group-hover:scale-110 transition-transform duration-300"> {/* 💡 Smaller icon on mobile */}
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-70" style={{ color: "var(--text-color-all)" }}>
                  {stat.description}
                </span>
                <span className="text-xs font-semibold text-green-500 bg-green-100 px-2 py-0.5 rounded-full">
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Distribution and Quick Stats */}
      {/* Grid adapts from 1 to 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8"> {/* 💡 Reduced gap on mobile */}
        <div
          // 💡 Improvement: Reduced padding on mobile (p-4)
          className="rounded-2xl p-4 sm:p-6 shadow-lg border"
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <h2
            className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-3"
            style={{ color: "var(--color-primary)" }}
          >
            <span>👥</span>
            User Role Distribution
          </h2>
          <div className="space-y-4">
            {Object.entries(roleDistribution).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between text-sm sm:text-base"> {/* 💡 Smaller text on mobile */}
                <span className="font-medium capitalize" style={{ color: "var(--text-color-all)" }}>
                  {role} Users
                </span>
                <div className="flex items-center gap-3">
                  {/* Progress bar width is now always relative to container */}
                  <div className="w-20 sm:w-32 bg-[var(--bg-color-all)] rounded-full h-2"> 
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: "var(--color-primary)",
                        width: `${(count / stats.totalUsers) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="font-bold w-6 text-right" style={{ color: "var(--color-primary)" }}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className="rounded-2xl p-4 sm:p-6 shadow-lg border"
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <h2
            className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-3"
            style={{ color: "var(--color-primary)" }}
          >
            <span>📊</span>
            Platform Overview
          </h2>
          {/* Grid adapts from 2 columns for quick stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4"> {/* 💡 Reduced gap on mobile */}
            <div className="text-center p-3 sm:p-4 rounded-xl bg-[var(--bg-color-all)]"> {/* 💡 Reduced padding on mobile */}
              <div className="text-xl sm:text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                {stats.adminCount}
              </div>
              <div className="text-xs sm:text-sm opacity-70" style={{ color: "var(--text-color-all)" }}>
                Administrators
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-xl bg-[var(--bg-color-all)]">
              <div className="text-xl sm:text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                {stats.regularUserCount}
              </div>
              <div className="text-xs sm:text-sm opacity-70" style={{ color: "var(--text-color-all)" }}>
                Regular Users
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-xl bg-[var(--bg-color-all)]">
              <div className="text-xl sm:text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                {recentUsers.length}
              </div>
              <div className="text-xs sm:text-sm opacity-70" style={{ color: "var(--text-color-all)" }}>
                New This Month
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-xl bg-[var(--bg-color-all)]">
              <div className="text-xl sm:text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                {stats.totalUsers > 0 ? `${Math.round((stats.totalDoctors / stats.totalUsers) * 100)}%` : '0%'}
              </div>
              <div className="text-xs sm:text-sm opacity-70" style={{ color: "var(--text-color-all)" }}>
                Doctor Ratio
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Users Section */}
      <div
        className="rounded-2xl shadow-lg border mb-8 overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{
          backgroundColor: "var(--dashboard-bg)",
          borderColor: "var(--dashboard-border)",
        }}
      >
        <div className="p-4 sm:p-6 border-b" style={{ borderColor: "var(--dashboard-border)", backgroundColor: "var(--bg-color-all)" }}> {/* 💡 Reduced padding on mobile */}
          <h2
            className="text-lg sm:text-xl font-semibold flex items-center gap-3"
            style={{ color: "var(--color-primary)" }}
          >
            <span>🆕</span>
            Recent User Registrations
          </h2>
          <p className="text-xs sm:text-sm opacity-70 mt-1" style={{ color: "var(--text-color-all)" }}>
            Latest {recentUsers.length} user accounts created
          </p>
        </div>
        
        {/* Tables use overflow-x-auto for responsiveness */}
        <div className="overflow-x-auto">
          {/* 💡 Improvement: The table width is now controlled by content, allowing the scroll to take effect immediately */}
          <table className="divide-y divide-[var(--dashboard-border)] min-w-[600px] sm:min-w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--bg-color-all)" }}>
                {/* 💡 Smaller padding and text on mobile */}
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                  User
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                  Contact
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                  Role
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr 
                  key={user._id?.$oid || user._id || `user-${index}`}
                  className="hover:bg-[var(--bg-color-all)] transition-colors duration-200"
                  style={{ borderBottom: `1px solid var(--dashboard-border)` }}
                >
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-semibold shadow-md text-sm" // 💡 Smaller avatar on mobile
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <div className="font-medium text-sm sm:text-base" style={{ color: "var(--text-color-all)" }}>
                          {user.name || "Unnamed User"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{ color: "var(--text-color-all)" }}>
                    {user.email}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    <span 
                      className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold capitalize"
                      style={{ 
                        backgroundColor: user.role === 'admin' ? 'var(--color-primary)' : 'var(--bg-color-all)',
                        color: user.role === 'admin' ? 'var(--color-white)' : 'var(--text-color-all)'
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout for Blogs and Services */}
      {/* Grid adapts from 1 to 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Recent Blogs */}
        <div
          className="rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <div className="p-4 sm:p-6 border-b" style={{ borderColor: "var(--dashboard-border)", backgroundColor: "var(--bg-color-all)" }}>
            <h2
              className="text-lg sm:text-xl font-semibold flex items-center gap-3"
              style={{ color: "var(--color-primary)" }}
            >
              <span>📝</span>
              Recent Blog Posts
            </h2 >
            <p className="text-xs sm:text-sm opacity-70 mt-1" style={{ color: "var(--text-color-all)" }}>
              Latest {recentBlogs.length} published articles
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="divide-y divide-[var(--dashboard-border)] min-w-[500px] sm:min-w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--bg-color-all)" }}>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                    Title
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                    Author
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBlogs.map((blog, index) => {
                  const createdAt = Number(
                    blog?.createdAt?.$date?.$numberLong || Date.now()
                  );
                  return (
                    <tr 
                      key={blog._id?.$oid || blog._id || `blog-${index}`}
                      className="hover:bg-[var(--bg-color-all)] transition-colors duration-200"
                      style={{ borderBottom: `1px solid var(--dashboard-border)` }}
                    >
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap max-w-[200px] truncate"> {/* 💡 Added a max-width for better truncation */}
                        <div className="font-medium text-sm" style={{ color: "var(--text-color-all)" }}>
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{ color: "var(--text-color-all)" }}>
                        {blog.author?.name || "Unknown"}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{ color: "var(--text-color-all)" }}>
                        {new Date(createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Services */}
        <div
          className="rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <div className="p-4 sm:p-6 border-b" style={{ borderColor: "var(--dashboard-border)", backgroundColor: "var(--bg-color-all)" }}>
            <h2
              className="text-lg sm:text-xl font-semibold flex items-center gap-3"
              style={{ color: "var(--color-primary)" }}
            >
              <span>🛠️</span>
              Recent Services
            </h2>
            <p className="text-xs sm:text-sm opacity-70 mt-1" style={{ color: "var(--text-color-all)" }}>
              Latest {recentServices.length} services added
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="divide-y divide-[var(--dashboard-border)] min-w-[500px] sm:min-w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--bg-color-all)" }}>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                    Service
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                    Description
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold" style={{ color: "var(--text-color-all)" }}>
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentServices.map((service) => (
                  <tr 
                    key={service._id?.$oid || service._id}
                    className="hover:bg-[var(--bg-color-all)] transition-colors duration-200"
                    style={{ borderBottom: `1px solid var(--dashboard-border)` }}
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="font-medium text-sm" style={{ color: "var(--text-color-all)" }}>
                        {service.service_name}
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm max-w-[150px] truncate" style={{ color: "var(--text-color-all)" }}> {/* 💡 Added a max-width for better truncation */}
                      {service.description?.length > 30 
                        ? `${service.description.substring(0, 30)}...` // 💡 Shorter truncation on mobile
                        : service.description}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                        style={{ 
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-white)"
                        }}
                      >
                        {service.service_type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-12 text-center py-4 sm:py-6 border-t" style={{ borderColor: "var(--dashboard-border)" }}> {/* 💡 Reduced margin and padding on mobile */}
        <p className="text-xs sm:text-sm opacity-70" style={{ color: "var(--text-color-all)" }}>
          Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </p>
        <p className="text-xs opacity-50 mt-1 sm:mt-2" style={{ color: "var(--text-color-all)" }}>
          CareHive Management System • Confidential Report
        </p>
      </div>
    </div>
  );
}