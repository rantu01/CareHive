"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Trash2, Edit3, Users, UserCog, User2, ShieldCheck } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, admins: 0, doctors: 0, users: 0 });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);

      const admins = data.filter((user) => user.role === "admin").length;
      const doctors = data.filter((user) => user.role === "doctor").length;
      const regularUsers = data.filter((user) => user.role === "user").length;

      setStats({
        total: data.length,
        admins,
        doctors,
        users: regularUsers,
      });
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
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "User information has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
      Swal.fire("Error", "Failed to update user!", "error");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      Swal.fire("Error", "Failed to delete user!", "error");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-[var(--color-primary)] text-white";
      case "doctor":
        return "bg-[var(--color-secondary)] text-white";
      case "user":
        return "bg-[var(--gray-color)] text-[var(--fourground-color)] border border-[var(--dashboard-border)]";
      default:
        return "bg-[var(--sidebar-bg)] text-[var(--fourground-color)] border border-[var(--dashboard-border)]";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <ShieldCheck size={18} />;
      case "doctor":
        return <UserCog size={18} />;
      case "user":
        return <User2 size={18} />;
      default:
        return <Users size={18} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-[var(--fourground-color)] font-semibold">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--sidebar-bg)] p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] mb-3">
          User Management
        </h1>
        <p className="text-[var(--fourground-color)] text-lg opacity-80">
          Manage user accounts and permissions with ease
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: stats.total, icon: <Users />, color: "var(--color-primary)" },
          { label: "Admins", value: stats.admins, icon: <ShieldCheck />, color: "var(--color-primary)" },
          { label: "Doctors", value: stats.doctors, icon: <UserCog />, color: "var(--color-secondary)" },
          { label: "Patients", value: stats.users, icon: <User2 />, color: "var(--gray-color)" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 shadow-md border border-[var(--dashboard-border)] bg-[var(--gray-color)] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[var(--fourground-color)] opacity-70">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-[var(--fourground-color)]">
                  {stat.value}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-[var(--gray-color)] rounded-2xl p-6 shadow-md border border-[var(--dashboard-border)] mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[var(--dashboard-border)] rounded-xl bg-transparent text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/60 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-all"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[var(--dashboard-border)] rounded-xl bg-transparent text-[var(--fourground-color)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-all"
          >
            <option value="all">All Roles</option>
            <option value="user">user</option>
            <option value="doctor">Doctors</option>
            <option value="admin">Admins</option>
          </select>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl shadow-md">
              {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-[var(--gray-color)] rounded-2xl p-6 shadow-md border border-[var(--dashboard-border)] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--fourground-color)]">
                    {user.name || "Unnamed User"}
                  </h3>
                  <p className="text-[var(--fourground-color)] opacity-70">
                    {user.email}
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getRoleBadgeColor(user.role)}`}
                  >
                    {getRoleIcon(user.role)} {user.role}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No users found */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-[var(--fourground-color)] mb-2">
            No users found
          </h3>
          <p className="text-[var(--fourground-color)] opacity-70 max-w-md mx-auto">
            {searchTerm || roleFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No users yet. Start by adding your first user!"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--gray-color)] rounded-2xl shadow-2xl max-w-md w-full border border-[var(--dashboard-border)]">
            <div className="px-6 py-4 bg-[var(--color-primary)] text-white flex justify-between items-center rounded-t-2xl">
              <h3 className="text-lg font-bold">Edit User</h3>
              <button onClick={() => setEditingUser(null)} className="text-2xl">
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-[var(--fourground-color)]">
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-[var(--dashboard-border)] rounded-xl bg-transparent focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-[var(--fourground-color)]">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-[var(--dashboard-border)] rounded-xl bg-transparent focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-[var(--fourground-color)]">
                  Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-[var(--dashboard-border)] rounded-xl bg-transparent focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                >
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:opacity-90"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-3 rounded-xl border border-[var(--dashboard-border)] text-[var(--fourground-color)] hover:bg-[var(--gray-color)] transition"
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
