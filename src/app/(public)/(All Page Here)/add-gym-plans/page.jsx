"use client";

import { useState } from "react";
import Swal from "sweetalert2";

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.planName || !formData.category || !formData.duration) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }

    if (editing) {
      setPlans(
        plans.map((plan) =>
          plan.id === editing.id ? { ...formData, id: editing.id } : plan
        )
      );
      Swal.fire("Updated!", "Gym plan updated successfully.", "success");
      setEditing(null);
    } else {
      setPlans([...plans, { ...formData, id: Date.now() }]);
      Swal.fire("Added!", "New gym plan added successfully.", "success");
    }

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
  };

  const handleEdit = (plan) => {
    setEditing(plan);
    setFormData(plan);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This plan will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#e74c3c",
    }).then((result) => {
      if (result.isConfirmed) {
        setPlans(plans.filter((plan) => plan.id !== id));
        Swal.fire("Deleted!", "Gym plan removed successfully.", "success");
      }
    });
  };

  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-light-green)" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <h1
          className="text-4xl sm:text-5xl font-bold mb-6 text-center"
          style={{ color: "var(--fourground-color)" }}
        >
          {editing ? "Update Gym Plan" : (
            <>Add <span style={{ color: "var(--color-light-green)" }}>Gym Plan</span></>
          )}
        </h1>

        <p
          className="text-lg sm:text-xl text-center mb-10 opacity-90"
          style={{ color: "var(--fourground-color)" }}
        >
          {editing
            ? "Edit the selected gym training plan below."
            : "Create customized gym training plans for strength, endurance, or overall fitness."}
        </p>

        {/* ====== FORM ====== */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border rounded-2xl p-8 shadow-xl space-y-6"
          style={{ borderColor: "var(--dashboard-border)" }}
        >
          {/* Input Fields */}
          {Object.entries({
            planName: "Plan Name",
            category: "Category (e.g., Strength, Cardio, Weight Loss)",
            duration: "Duration (e.g., 4 Weeks)",
          }).map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-white text-black focus:ring-2 outline-none"
                style={{
                  borderColor: "var(--dashboard-border)",
                }}
                required
              />
            </div>
          ))}

          {/* Intensity */}
          <div>
            <label className="block text-sm font-medium mb-2">Intensity Level</label>
            <select
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-white text-black focus:ring-2 outline-none"
              style={{
                borderColor: "var(--dashboard-border)",
              }}
              required
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Textareas */}
          {[["description", "Description"], ["exercises", "Exercises / Workout Steps"], ["equipment", "Equipment Needed"]].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-white text-black focus:ring-2 outline-none"
                style={{
                  borderColor: "var(--dashboard-border)",
                }}
                rows="3"
              />
            </div>
          ))}

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-white text-black focus:ring-2 outline-none"
              style={{
                borderColor: "var(--dashboard-border)",
              }}
            />
          </div>

          {/* ✅ FIXED BUTTON (now visible) */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-md"
           style={{
              backgroundColor: "var(--color-calm-blue)",
              color: "var(--color-white)",
            }}
          >
            {editing ? "Update Gym Plan" : "Add Gym Plan"}
          </button>
        </form>

        {/* Manage Section */}
        <div className="mt-16">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "var(--fourground-color)" }}
          >
            Manage Gym Plans
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="p-6 bg-white/10 backdrop-blur-lg border rounded-2xl shadow-md flex flex-col justify-between"
                style={{ borderColor: "var(--dashboard-border)" }}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--fourground-color)" }}>
                    {plan.planName}
                  </h3>
                  <p className="text-sm opacity-80 mb-2">Category: {plan.category}</p>
                  <p className="text-sm opacity-80 mb-2">Duration: {plan.duration}</p>
                  <p className="text-sm opacity-80 mb-2">Intensity: {plan.intensity}</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="flex-1 py-2 rounded-lg font-medium hover:scale-105 transition-all"
                    style={{
              color: "var(--color-white)",
              backgroundColor: "var(--color-calm-blue)",
            }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="flex-1 py-2 rounded-lg font-medium hover:scale-105 transition-all"
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
