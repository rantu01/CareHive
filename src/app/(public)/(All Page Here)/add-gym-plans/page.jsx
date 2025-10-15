"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdFitnessCenter } from "react-icons/md";

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

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/gym-plans");
      const data = await res.json();
      setPlans(data.success ? data.data : []);
    } catch {
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
      } else throw new Error(data.message || "Error");
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
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
    <section className="min-h-screen relative" style={{ background: "var(--sidebar-bg)" }}>
      {/* Hero header */}
      <div
        className="text-center py-16 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-calm-blue)] to-[var(--color-primary)/70] text-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)" }}
      >
        <MdFitnessCenter className="mx-auto text-6xl mb-4 animate-bounce" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">Gym Plans Manager</h1>
        <p className="text-lg sm:text-xl opacity-90">
          Add, update, and manage your gym plans seamlessly.
        </p>
      </div>

      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--sidebar-bg)] p-8 rounded-3xl shadow-2xl space-y-6 border border-[var(--dashboard-border)] backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-[var(--fourground-color)] mb-4">
            {editing ? "Update Plan" : "Add New Plan"}
          </h2>

          {[
            ["planName", "Plan Name"],
            ["category", "Category"],
            ["duration", "Duration"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="text-sm font-medium text-[var(--fourground-color)] mb-1 block">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-[var(--sidebar-bg)] border border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-calm-blue)] outline-none transition-all text-[var(--fourground-color)]"
                required
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium text-[var(--fourground-color)] mb-1 block">Intensity</label>
            <select
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--sidebar-bg)] border border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-calm-blue)] outline-none transition-all text-[var(--fourground-color)]"
              required
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {[
            ["description", "Description"],
            ["exercises", "Exercises / Steps"],
            ["equipment", "Equipment Needed"],
            ["image", "Image URL"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="text-sm font-medium text-[var(--fourground-color)] mb-1 block">{label}</label>
              {name === "image" ? (
                <input
                  type="url"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[var(--sidebar-bg)] border border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-calm-blue)] outline-none transition-all text-[var(--fourground-color)]"
                />
              ) : (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 rounded-xl bg-[var(--sidebar-bg)] border border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-calm-blue)] outline-none transition-all text-[var(--fourground-color)]"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-[var(--color-calm-blue)] text-[var(--color-white)] shadow-lg hover:scale-105 transition-all"
          >
            {editing ? "Update Plan" : "Add Gym Plan"}
          </button>
        </form>

        {/* Live Preview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--fourground-color)] mb-4">Live Preview</h2>
          <div className="bg-[var(--sidebar-bg)] rounded-3xl p-6 shadow-xl border border-[var(--color-primary)] backdrop-blur-sm transition-all hover:shadow-2xl">
            {formData.image && (
              <img
                src={formData.image}
                alt={formData.planName}
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
            )}
            <h3 className="text-xl font-bold text-[var(--fourground-color)] mb-2">{formData.planName || "Plan Name"}</h3>
            <p className="text-sm text-[var(--fourground-color)] mb-1">
              <strong>Category:</strong> {formData.category || "-"}
            </p>
            <p className="text-sm text-[var(--fourground-color)] mb-1">
              <strong>Duration:</strong> {formData.duration || "-"}
            </p>
            <p className="text-sm text-[var(--fourground-color)] mb-1">
              <strong>Intensity:</strong> {formData.intensity || "-"}
            </p>
            <p className="text-sm text-gray-400">{formData.description || "Description..."}</p>
          </div>
        </div>
      </div>

      {/* Manage Plans */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[var(--fourground-color)] mb-8 text-center">
          Manage <span style={{ color: "var(--color-primary)" }}>Gym Plans</span>
        </h2>

        {plans.length === 0 ? (
          <p className="text-center text-[var(--fourground-color)] text-lg">No gym plans found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-[var(--sidebar-bg)] rounded-3xl p-6 shadow-lg border border-[var(--dashboard-border)] transition-all hover:scale-105 hover:shadow-2xl"
              >
                {plan.image && (
                  <img
                    src={plan.image}
                    alt={plan.planName}
                    className="w-full h-40 object-cover rounded-2xl mb-4 transition-transform duration-500 hover:scale-110"
                  />
                )}
                <h3 className="text-xl font-bold text-[var(--fourground-color)] mb-2">{plan.planName}</h3>
                <p className="text-sm text-[var(--fourground-color)] mb-1">
                  <strong>Category:</strong> {plan.category}
                </p>
                <p className="text-sm text-[var(--fourground-color)] mb-1">
                  <strong>Intensity:</strong> {plan.intensity}
                </p>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4">{plan.description || "-"}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="flex-1 py-2 rounded-xl font-semibold bg-[var(--color-calm-blue)] text-[var(--color-white)] shadow-md hover:scale-105 transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="flex-1 py-2 rounded-xl font-semibold bg-[var(--color-primary)] text-[var(--color-white)] shadow-md hover:scale-105 transition-all"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
