"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";

export default function Profile() {
  const { user, loading } = useUser();
  const [formData, setFormData] = useState({ id: "", name: "", email: "", role: "" });
  const [saving, setSaving] = useState(false);

  // Fetch user info from MongoDB once user is available
  useEffect(() => {
    const fetchUserFromDB = async () => {
      if (user?.email) {
        try {
          const res = await fetch(`/api/users?email=${encodeURIComponent(user.email)}`);
          if (!res.ok) throw new Error("User not found in DB");

          const dbUser = await res.json();
          setFormData({
            id: dbUser.id,
            name: dbUser.name || "",
            email: dbUser.email || "",
            role: dbUser.role || "User",
          });
        } catch (err) {
          console.error("Error fetching user from DB:", err);
        }
      }
    };

    fetchUserFromDB();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "var(--color-secondary)" }}
        ></div>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Please log in to view your profile</p>
      </div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData((prev) => ({ ...prev, name: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.id, // MongoDB user ID
          name: formData.name,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className=" py-8 px-4"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      <div className="max-w-4xl mx-auto mt-30">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--fourground-color)" }}
          >
            Profile Settings
          </h1>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-white)",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="md:col-span-1">
            <div
              className="rounded-2xl p-6 text-center shadow-lg border"
              style={{
                backgroundColor: "var(--sidebar-bg)",
                borderColor: "var(--dashboard-border)",
              }}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={formData.name || "User"}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border"
                  style={{ borderColor: "var(--dashboard-border)" }}
                />
              ) : (
                <div
                  className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold mb-4"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-white)",
                  }}
                >
                  {formData.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--fourground-color)" }}
              >
                {formData.name || "User"}
              </h3>

              <span
                className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-black)",
                }}
              >
                {formData.role}
              </span>
            </div>
          </div>

          {/* Profile Form Section */}
          <div className="md:col-span-2">
            <div
              className="rounded-2xl p-8 shadow-lg border"
              style={{
                backgroundColor: "var(--sidebar-bg)",
                borderColor: "var(--dashboard-border)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--fourground-color)" }}
              >
                Personal Information
              </h2>

              <form onSubmit={handleSave} className="space-y-6">
                {/* Name Field (always editable) */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg ring-2 ring-blue-200"
                    style={{
                      backgroundColor: "var(--dashboard-bg)",
                      border: "1px solid var(--dashboard-border)",
                      color: "var(--fourground-color)",
                    }}
                  />
                </div>

                {/* Email Field (read-only) */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full p-3 rounded-lg opacity-70 cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--dashboard-bg)",
                      border: "1px solid var(--dashboard-border)",
                      color: "var(--fourground-color)",
                    }}
                  />
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--fourground-color)", opacity: 0.7 }}
                  >
                    Email cannot be changed
                  </p>
                </div>

                {/* Role Field (read-only) */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    Account Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    readOnly
                    className="w-full p-3 rounded-lg opacity-70 cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--dashboard-bg)",
                      border: "1px solid var(--dashboard-border)",
                      color: "var(--fourground-color)",
                    }}
                  />
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--fourground-color)", opacity: 0.7 }}
                  >
                    Role is assigned by admin
                  </p>
                </div>

                {/* Save Button */}
                <div className="flex pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-black)",
                    }}
                  >
                    {saving ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
