"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  User2,
} from "lucide-react";

// Map specialties to icons
const specialtyIcons = {
  Cardiologist: HeartPulse,
  Dermatologist: User2,
  Neurologist: Brain,
  Pediatrician: Baby,
  "Orthopedic Surgeon": Bone,
  Gynecologist: Stethoscope,
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Fetch users (only doctors)
  const fetchDoctors = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setDoctors(data.filter((user) => user.role === "doctor"));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Update doctor
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingDoctor),
    });
    setEditingDoctor(null);
    fetchDoctors();
  };

  // Delete doctor
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchDoctors();
  };

  return (
    <div className="p-8 bg-[var(--dashboard-bg)] min-h-screen">
      {/* Title Center */}
      <h1 className="text-3xl font-bold mb-10 text-center text-[var(--fourground-color)]">
        Available Doctors
      </h1>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc) => {
          const Icon = specialtyIcons[doc.specialty] || User2;

          return (
            <motion.div
              key={doc.id}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0px 0px 25px rgba(70,130,180,0.45), 0px 0px 50px rgba(70,130,180,0.25)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative cursor-pointer rounded-2xl p-6 shadow-md bg-[var(--sidebar-bg)]"
            >
              {/* Card Content */}
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <Icon className="w-12 h-12 text-[var(--color-calm-blue)] mb-4" />

                {/* Info */}
                <h2 className="text-xl font-semibold text-[var(--color-calm-blue)] mb-1">
                  {doc.name || "Unknown Doctor"}
                </h2>
                <p className="text-[var(--fourground-color)] font-medium">
                  {doc.specialty || "Specialty not set"}
                </p>
                <p className="text-sm text-[var(--color-black)] dark:text-[var(--color-white)] mt-1">
                  {doc.hospital || "Hospital not set"}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2 w-full">
                  <button className="flex-1 py-2 rounded-xl font-semibold text-[var(--color-white)] bg-gradient-to-r from-[var(--color-calm-blue)] to-[var(--color-light-green)] hover:opacity-90 transition">
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setEditingDoctor(doc)}
                    className="flex-1 py-2 rounded-xl font-semibold text-[var(--color-white)] bg-[var(--dashboard-blue)] hover:opacity-90 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="flex-1 py-2 rounded-xl font-semibold text-[var(--color-white)] bg-red-500 hover:opacity-90 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-[var(--dashboard-bg)] p-6 rounded-xl shadow-lg w-full max-w-md"
            style={{ borderColor: "var(--dashboard-border)" }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[var(--fourground-color)]">
              Edit Doctor
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editingDoctor.name}
                onChange={(e) =>
                  setEditingDoctor({ ...editingDoctor, name: e.target.value })
                }
                className="border p-2 w-full rounded"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
              />
              <input
                type="text"
                value={editingDoctor.specialty || ""}
                onChange={(e) =>
                  setEditingDoctor({
                    ...editingDoctor,
                    specialty: e.target.value,
                  })
                }
                className="border p-2 w-full rounded"
                placeholder="Specialty"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
              />
              <input
                type="text"
                value={editingDoctor.hospital || ""}
                onChange={(e) =>
                  setEditingDoctor({
                    ...editingDoctor,
                    hospital: e.target.value,
                  })
                }
                className="border p-2 w-full rounded"
                placeholder="Hospital"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingDoctor(null)}
                  className="px-4 py-2 rounded bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded"
                  style={{
                    backgroundColor: "var(--color-light-green)",
                    color: "var(--color-black)",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
