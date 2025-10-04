"use client";

import { useEffect, useState } from "react";

export default function ReportPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalBlogs: 0,
    totalServices: 0,
  });

  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRes = await fetch("/api/users");
        const usersData = await usersRes.json();

        const blogsRes = await fetch("/api/blogs");
        const blogsData = await blogsRes.json();

        const servicesRes = await fetch("/api/services");
        const servicesData = await servicesRes.json();

        const doctorCount = usersData.filter((u) => u.role === "doctor").length;

        setStats({
          totalUsers: usersData.length,
          totalDoctors: doctorCount,
          totalBlogs: blogsData.success ? blogsData.blogs.length : 0,
          totalServices: servicesData.length,
        });

        setUsers(usersData);
        setBlogs(blogsData.success ? blogsData.blogs : []);
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
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ backgroundColor: "var(--gray-color)" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className="w-16 h-16 rounded-full animate-spin border-4 border-t-transparent"
            style={{
              borderColor: "var(--dashboard-blue)",
              borderTopColor: "transparent",
            }}
          ></div>
          <p style={{ color: "var(--fourground-color)", fontWeight: 500 }}>
            Loading report...
          </p>
        </div>
      </div>
    );
  }

  const printReport = () => {
    window.print();
  };

  const cardStyle = "rounded-xl p-4 shadow border";

  // Helper function to get recent 5 items based on createdAt
  const getRecent = (array) => {
    return [...array]
      .sort((a, b) => {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--gray-color)",
        padding: "1.5rem",
      }}
    >
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1
            style={{
              color: "var(--fourground-color)",
              fontSize: "1.875rem",
              fontWeight: "bold",
            }}
          >
            Management Report
          </h1>
          <p
            style={{
              color: "var(--fourground-color)",
              opacity: 0.7,
              marginTop: "0.25rem",
            }}
          >
            Summary of users, blogs, and services
          </p>
        </div>
        <button
          onClick={printReport}
          className="rounded-lg px-4 py-2"
          style={{
            backgroundColor: "var(--dashboard-blue)",
            color: "var(--color-white)",
          }}
        >
          Print Report
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className={cardStyle}
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
            color: "var(--fourground-color)",
          }}
        >
          <p style={{ fontWeight: 500 }}>Total Users</p>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {stats.totalUsers}
          </p>
        </div>
        <div
          className={cardStyle}
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
            color: "var(--fourground-color)",
          }}
        >
          <p style={{ fontWeight: 500 }}>Total Doctors</p>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {stats.totalDoctors}
          </p>
        </div>
        <div
          className={cardStyle}
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
            color: "var(--fourground-color)",
          }}
        >
          <p style={{ fontWeight: 500 }}>Total Blogs</p>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {stats.totalBlogs}
          </p>
        </div>
        <div
          className={cardStyle}
          style={{
            backgroundColor: "var(--dashboard-bg)",
            borderColor: "var(--dashboard-border)",
            color: "var(--fourground-color)",
          }}
        >
          <p style={{ fontWeight: 500 }}>Total Services</p>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {stats.totalServices}
          </p>
        </div>
      </div>

      {/* Recent Users */}
      <div
        className="rounded-xl shadow border mb-6 overflow-x-auto"
        style={{
          backgroundColor: "var(--dashboard-bg)",
          borderColor: "var(--dashboard-border)",
        }}
      >
        <h2
          style={{
            padding: "1rem 1.5rem",
            fontWeight: "600",
            color: "var(--fourground-color)",
            backgroundColor: "var(--gray-color)",
            borderBottom: `1px solid var(--dashboard-border)`,
          }}
        >
          Recent Users
        </h2>
        <table
          className="min-w-full divide-y"
          style={{ borderColor: "var(--dashboard-border)" }}
        >
          <thead>
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Email
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user, index) => (
              <tr
                key={user._id?.$oid || user._id || `user-${index}`}
                style={{ borderBottom: `1px solid var(--dashboard-border)` }}
              >
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: "var(--fourground-color)" }}
                >
                  {user.name}
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: "var(--fourground-color)" }}
                >
                  {user.email}
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: "var(--fourground-color)" }}
                >
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Blogs */}
      <div
        className="rounded-xl shadow border mb-6 overflow-x-auto"
        style={{
          backgroundColor: "var(--dashboard-bg)",
          borderColor: "var(--dashboard-border)",
        }}
      >
        <h2
          style={{
            padding: "1rem 1.5rem",
            fontWeight: "600",
            color: "var(--fourground-color)",
            backgroundColor: "var(--gray-color)",
            borderBottom: `1px solid var(--dashboard-border)`,
          }}
        >
          Recent Blogs
        </h2>
        <table
          className="min-w-full divide-y"
          style={{ borderColor: "var(--dashboard-border)" }}
        >
          <thead>
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Title
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Author
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {recentBlogs.map((blog, index) => {
              // Safely parse the timestamp
              const createdAt = Number(
                blog?.createdAt?.$date?.$numberLong || Date.now()
              );

              return (
                <tr
                  key={blog._id?.$oid || blog._id || `blog-${index}`} // unique key
                  style={{ borderBottom: `1px solid var(--dashboard-border)` }}
                >
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    {blog.title}
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    {blog.author?.name || "Unknown"}
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    {new Date(createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Recent Services */}
      <div
        className="rounded-xl shadow border mb-6 overflow-x-auto"
        style={{
          backgroundColor: "var(--dashboard-bg)",
          borderColor: "var(--dashboard-border)",
        }}
      >
        <h2
          style={{
            padding: "1rem 1.5rem",
            fontWeight: "600",
            color: "var(--fourground-color)",
            backgroundColor: "var(--gray-color)",
            borderBottom: `1px solid var(--dashboard-border)`,
          }}
        >
          Recent Services
        </h2>
        <table
          className="min-w-full divide-y"
          style={{ borderColor: "var(--dashboard-border)" }}
        >
          <thead>
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Service Name
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Description
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {recentServices.map((service) => (
              <tr
                key={service._id?.$oid || service._id}
                style={{ borderBottom: `1px solid var(--dashboard-border)` }}
              >
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: "var(--fourground-color)" }}
                >
                  {service.service_name}
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: "var(--fourground-color)" }}
                >
                  {service.description}
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: "var(--fourground-color)" }}
                >
                  {service.service_type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
