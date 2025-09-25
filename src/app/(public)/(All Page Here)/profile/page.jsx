"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext"; // adjust path
import Link from "next/link";

export default function Profile() {
  const { user, role, loading } = useUser();
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  console.log(formData)

  // Load user info
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: role || "user",
      });
    }
  }, [user, role]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in</p>;

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save updates
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user._id, // your API should expect this
          name: formData.name,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      setEditing(false); // exit editing mode
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="p-6 max-w-lg mx-auto rounded-lg shadow"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        color: "var(--fourground-color)",
        border: "1px solid var(--dashboard-border)",
      }}
    >
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <h2 className="text-2xl font-bold mb-6"><Link href="/">Home</Link></h2>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full p-2 border rounded ${
              !editing ? "opacity-70 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: "var(--sidebar-bg)",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full p-2 border rounded opacity-70 cursor-not-allowed"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
        </div>

        {/* Role (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            value={formData.role}
            readOnly
            className="w-full p-2 border rounded opacity-70 cursor-not-allowed"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
        </div>

        {/* Buttons */}
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="w-full py-2 rounded font-semibold"
            style={{
              backgroundColor: "var(--color-calm-blue)",
              color: "var(--color-white)",
            }}
          >
            Update Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 rounded font-semibold"
              style={{
                backgroundColor: "var(--color-light-green)",
                color: "var(--color-black)",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 py-2 rounded font-semibold"
              style={{
                backgroundColor: "var(--color-black)",
                color: "var(--color-white)",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
