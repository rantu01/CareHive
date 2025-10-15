"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function AddGymPlans() {
  const [formData, setFormData] = useState({
    planName: "",
    category: "",
    duration: "",
    intensity: "",
    description: "",
    exercises: "",
    equipment: "",
    image: "",
  });

  const [plans, setPlans] = useState([]);
  const [editing, setEditing] = useState(null);

  // Fetch gym plans
  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/gym-plans");
      const data = await res.json();
      setPlans(data.success ? data.data : []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/gym-plans?id=${editing._id}` : "/api/gym-plans";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: "✅ Success!",
          text: editing ? "Gym plan updated!" : "New gym plan added!",
          icon: "success",
          confirmButtonColor: "var(--color-primary)",
        });
        setFormData({
          planName: "",
          category: "",
          duration: "",
          intensity: "",
          description: "",
          exercises: "",
          equipment: "",
          image: "",
        });
        setEditing(null);
        fetchPlans();
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (error) {
      Swal.fire({
        title: "❌ Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "var(--color-calm-blue)",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this plan?",
      text: "This will permanently remove it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "var(--color-primary)",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/gym-plans?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Deleted!", "Plan removed successfully.", "success");
        fetchPlans();
      } else throw new Error(data.message);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleEdit = (plan) => {
    setEditing(plan);
    setFormData(plan);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen py-24 px-6 md:px-16 bg-[var(--gray-color)]"
    >
      {/* Background blobs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl bg-[var(--color-primary)] animate-pulse-slow"></div>
      <div className="absolute -bottom-40 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl bg-[var(--color-calm-blue)] animate-pulse-slow"></div>

      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--fourground-color)]"
        >
          {editing ? "Update Gym Plan" : "Add New Gym Plan"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-[var(--fourground-color)] opacity-80 mt-3"
        >
          {editing
            ? "Modify your existing gym plan."
            : "Create unique, eye-catching gym plans for your clients."}
        </motion.p>
      </div>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/20 backdrop-blur-lg border border-[var(--dashboard-border)] rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto mb-20"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          {["planName", "category", "duration"].map((key) => (
            <div key={key}>
              <label className="block mb-2 font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--dashboard-border)] text-[var(--fourground-color)] outline-none"
              />
            </div>
          ))}

          {/* Intensity */}
          <div>
            <label className="block mb-2 font-medium">Intensity</label>
            <select
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--dashboard-border)] text-[var(--fourground-color)] outline-none"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Textareas */}
        {[
          ["description", "Description"],
          ["exercises", "Exercises / Steps"],
          ["equipment", "Equipment Needed"],
        ].map(([key, label]) => (
          <div key={key} className="mt-4">
            <label className="block mb-2 font-medium">{label}</label>
            <textarea
              name={key}
              value={formData[key]}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--dashboard-border)] text-[var(--fourground-color)] outline-none"
            />
          </div>
        ))}

        {/* Image */}
        <div className="mt-4">
          <label className="block mb-2 font-medium">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--dashboard-border)] text-[var(--fourground-color)] outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full py-3 font-semibold rounded-2xl text-lg bg-[var(--color-primary)] text-white hover:scale-105 transition-transform shadow-lg"
        >
          {editing ? "Update Plan" : "Add Gym Plan"}
        </button>
      </motion.form>

      {/* Manage Plans Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-center text-[var(--fourground-color)] mb-10">
          Manage <span className="text-[var(--color-primary)]">Gym Plans</span>
        </h2>

        {plans.length === 0 ? (
          <p className="text-center text-lg opacity-70 text-[var(--fourground-color)]">
            No plans added yet. Start by adding a new plan!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-[var(--dashboard-border)] flex flex-col"
              >
                {plan.image && (
                  <img
                    src={plan.image}
                    alt={plan.planName}
                    className="h-48 w-full object-cover transition-transform duration-300"
                  />
                )}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 truncate text-[var(--fourground-color)]">
                      {plan.planName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-primary)] text-white font-medium">
                        {plan.category}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-calm-blue)] text-white font-medium">
                        {plan.intensity}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 mb-2">
                      <strong>Duration:</strong> {plan.duration}
                    </p>
                    <p className="text-sm opacity-70 line-clamp-3 mb-4">
                      {plan.description || "No description."}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="flex-1 py-2 rounded-xl font-semibold text-sm bg-[var(--color-calm-blue)] text-white hover:scale-105 transition-transform"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="flex-1 py-2 rounded-xl font-semibold text-sm bg-[var(--color-primary)] text-white hover:scale-105 transition-transform"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
