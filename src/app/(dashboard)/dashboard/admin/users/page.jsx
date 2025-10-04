"use client";
import { useEffect, useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    )
      return;
    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-[var(--color-light-green)] text-[var(--fourground-color)] border-[var(--dashboard-border)]";
      case "doctor":
        return "bg-[var(--dashboard-blue)] text-[var(--color-white)] border-[var(--dashboard-border)]";
      case "user":
        return "bg-[var(--gray-color)] text-[var(--fourground-color)] border-[var(--dashboard-border)]";
      default:
        return "bg-[var(--sidebar-bg)] text-[var(--fourground-color)] border-[var(--dashboard-border)]";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[var(--dashboard-blue)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-[var(--fourground-color)]">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--color-light-green)] bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-[var(--fourground-color)] mt-2">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="mt-4 sm:mt-0 bg-[var(--dashboard-bg)] px-4 py-3 rounded-2xl shadow-sm border border-[var(--dashboard-border)]">
            <div className="flex items-center space-x-2 text-sm text-[var(--fourground-color)]">
              <span className="font-medium">Total Users:</span>
              <span className="bg-[var(--dashboard-blue)] text-[var(--color-white)] px-2 py-1 rounded-full font-bold">
                {users.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-[var(--fourground-color)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--sidebar-bg)] text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-[var(--fourground-color)] whitespace-nowrap">
              Filter by Role:
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="block w-full px-3 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--sidebar-bg)] text-[var(--fourground-color)] focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)] focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[var(--dashboard-bg)] rounded-2xl shadow-lg border border-[var(--dashboard-border)] overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-[var(--dashboard-border)] bg-[var(--gray-color)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--fourground-color)]">
              User Accounts
            </h2>
            <span className="text-sm text-[var(--fourground-color)]">
              Showing {filteredUsers.length} of {users.length} users
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--fourground-color)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dashboard-border)]">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[var(--gray-color)] transition-colors duration-150 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--color-light-green)] rounded-full flex items-center justify-center text-[var(--color-white)] font-semibold shadow-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[var(--fourground-color)]">
                          {user.name || "Unnamed User"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--fourground-color)]">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-[var(--color-white)] bg-[var(--dashboard-blue)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--dashboard-blue)] transition-all duration-200 shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-[var(--color-white)] bg-[var(--color-calm-blue)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-calm-blue)] transition-all duration-200 shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-[var(--fourground-color)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-[var(--fourground-color)]">
                No users found
              </h3>
              <p className="mt-1 text-sm text-[var(--fourground-color)]">
                {searchTerm || roleFilter !== "all"
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "No users have been created yet."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 transparent  bg-opacity-100 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--dashboard-bg)] rounded-2xl shadow-xl max-w-md w-full transform transition-all">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--dashboard-border)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--fourground-color)]">
                  Edit User
                </h3>
                <button
                  onClick={() => setEditingUser(null)}
                  className="text-[var(--fourground-color)] hover:opacity-70 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--fourground-color)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="w-full px-3 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--sidebar-bg)] text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)] focus:border-transparent transition-all duration-200"
                  placeholder="Enter user name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--fourground-color)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="w-full px-3 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--sidebar-bg)] text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)] focus:border-transparent transition-all duration-200"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--fourground-color)] mb-2">
                  Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                  className="w-full px-3 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--sidebar-bg)] text-[var(--fourground-color)] focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)] focus:border-transparent transition-all duration-200"
                >
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[var(--dashboard-blue)] text-[var(--color-white)] py-3 px-4 rounded-xl font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--dashboard-blue)] transition-all duration-200 shadow-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 bg-[var(--sidebar-bg)] text-[var(--fourground-color)] py-3 px-4 rounded-xl font-medium hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--dashboard-border)] transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
