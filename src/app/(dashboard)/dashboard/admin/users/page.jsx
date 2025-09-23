"use client";
import { useEffect, useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create new user
  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    setNewUser({ name: "", email: "", role: "user" });
    fetchUsers();
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingUser),
    });
    setEditingUser(null);
    fetchUsers();
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  return (
    <div
      className="p-4 sm:p-6 space-y-6 rounded-lg border"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        borderColor: "var(--dashboard-border)",
        color: "var(--fourground-color)",
      }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
        Admin - User Management
      </h2>

      

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table
          className="w-full border rounded-lg min-w-[600px]"
          style={{
            borderColor: "var(--dashboard-border)",
            backgroundColor: "var(--dashboard-bg)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "var(--sidebar-bg)" }}>
              <th className="border px-4 py-2 text-sm sm:text-base">Name</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Email</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Role</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2 break-words">{u.email}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="px-2 py-1 rounded text-sm sm:text-base"
                    style={{
                      backgroundColor: "var(--dashboard-blue)",
                      color: "var(--color-white)",
                    }}
                    onClick={() => setEditingUser(u)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded text-sm sm:text-base"
                    style={{
                      backgroundColor: "var(--color-calm-blue)",
                      color: "var(--color-white)",
                    }}
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editingUser && (
        <div
          className="mt-6 border p-4 rounded"
          style={{
            backgroundColor: "var(--sidebar-bg)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <h3 className="font-semibold text-lg mb-2">Edit User</h3>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              className="border p-2 w-full rounded"
              style={{
                backgroundColor: "var(--dashboard-bg)",
                borderColor: "var(--dashboard-border)",
                color: "var(--fourground-color)",
              }}
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              className="border p-2 w-full rounded"
              style={{
                backgroundColor: "var(--dashboard-bg)",
                borderColor: "var(--dashboard-border)",
                color: "var(--fourground-color)",
              }}
            />
            <select
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
              className="border p-2 w-full rounded"
              style={{
                backgroundColor: "var(--dashboard-bg)",
                borderColor: "var(--dashboard-border)",
                color: "var(--fourground-color)",
              }}
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-light-green)",
                  color: "var(--color-black)",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: "var(--color-black)",
                  color: "var(--color-white)",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
