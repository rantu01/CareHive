"use client";

import { useState, useEffect } from "react";
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
          title: "Success!",
          text: editing ? "Gym plan updated!" : "New gym plan added!",
          icon: "success",
          confirmButtonColor: "steelblue",
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
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "firebrick",
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
      confirmButtonColor: "steelblue",
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@500;700&display=swap');

        :root {
          --font-primary: 'Inter', sans-serif;
          --font-heading: 'Playfair Display', serif;
        }

        body {
          background-color: aliceblue;
          color: midnightblue;
          font-family: var(--font-primary);
          margin: 0;
          padding: 0;
        }
      `}</style>

      <section className="min-h-screen" style={{ backgroundColor: "aliceblue", color: "midnightblue", fontFamily: "'Inter', sans-serif" }}>
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "2rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              padding: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            {/* Hero Text */}
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "3.75rem",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                  color: "midnightblue",
                }}
              >
                The Form
                <br />
                Gym & Pilates
              </h1>
              <p style={{ fontSize: "1.125rem", color: "slategray", marginBottom: "1.5rem" }}>
                Studio for professional functional training, pilates, and fitness. Balance your mind
                and body.
              </p>
              <button
                style={{
                  backgroundColor: "steelblue",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "1rem",
                  fontWeight: "600",
                  boxShadow: "0 4px 12px rgba(70,130,180,0.4)",
                  cursor: "pointer",
                  border: "none",
                }}
                onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(110%)")}
                onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
              >
                Book a Class
              </button>
            </div>

            {/* Hero Image */}
            <div style={{ overflow: "hidden", borderRadius: "1.5rem" }}>
              <img
                src="https://i.ibb.co/C5GbNpN4/pexels-ivan-samkov-4164761.jpg"
                alt="Gym"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "1.5rem" }}
              />
            </div>
          </div>
        </div>

        {/* Form + Preview Section */}
        <div className="container mx-auto px-6 py-20" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              padding: "2.5rem",
              borderRadius: "2rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              border: "1px solid lightgray",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "2rem",
                marginBottom: "2rem",
                color: "midnightblue",
              }}
            >
              {editing ? "Update Plan" : "Add New Plan"}
            </h2>

            {[
              ["planName", "Plan Name"],
              ["category", "Category"],
              ["duration", "Duration"],
            ].map(([name, label]) => (
              <div key={name} style={{ marginBottom: "1.5rem", position: "relative" }}>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "1rem",
                    border: "1px solid lightgray",
                    outline: "none",
                    fontSize: "1rem",
                    color: "midnightblue",
                  }}
                />
                <label
                  htmlFor={name}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "0.8rem",
                    fontSize: "0.85rem",
                    color: "gray",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {label}
                </label>
              </div>
            ))}

            {/* Intensity Select */}
            <div style={{ marginBottom: "1.5rem", position: "relative" }}>
              <select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "1rem",
                  border: "1px solid lightgray",
                  outline: "none",
                  fontSize: "1rem",
                  color: "midnightblue",
                }}
              >
                <option value="" disabled>
                  Select Intensity
                </option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <label
                htmlFor="intensity"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "0.8rem",
                  fontSize: "0.85rem",
                  color: "gray",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Intensity
              </label>
            </div>

            {/* Textareas and Image URL */}
            {[
              ["description", "Description"],
              ["exercises", "Exercises / Steps"],
              ["equipment", "Equipment Needed"],
              ["image", "Image URL"],
            ].map(([name, label]) => (
              <div key={name} style={{ marginBottom: "1.5rem", position: "relative" }}>
                {name === "image" ? (
                  <input
                    type="url"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder=" "
                    style={{
                      width: "100%",
                      padding: "1rem",
                      borderRadius: "1rem",
                      border: "1px solid lightgray",
                      outline: "none",
                      fontSize: "1rem",
                      color: "midnightblue",
                    }}
                  />
                ) : (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    rows="3"
                    placeholder=" "
                    style={{
                      width: "100%",
                      padding: "1rem",
                      borderRadius: "1rem",
                      border: "1px solid lightgray",
                      outline: "none",
                      fontSize: "1rem",
                      color: "midnightblue",
                      resize: "none",
                    }}
                  />
                )}
                <label
                  htmlFor={name}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "0.8rem",
                    fontSize: "0.85rem",
                    color: "gray",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {label}
                </label>
              </div>
            ))}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "1rem",
                fontWeight: "600",
                backgroundColor: "steelblue",
                color: "white",
                cursor: "pointer",
                border: "none",
                boxShadow: "0 5px 15px rgba(70,130,180,0.4)",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {editing ? "Update Plan" : "Add Gym Plan"}
            </button>
          </form>

          {/* Live Preview */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "2rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              border: "1px solid lightgray",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "'Inter', sans-serif",
              color: "midnightblue",
            }}
          >
            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.planName}
                style={{
                  width: "100%",
                  borderRadius: "1.5rem",
                  marginBottom: "1.5rem",
                  maxHeight: "14rem",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "14rem",
                  backgroundColor: "lightgray",
                  borderRadius: "1.5rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "gray",
                  fontSize: "1rem",
                }}
              >
                Image Preview
              </div>
            )}

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "0.5rem",
                color: "midnightblue",
              }}
            >
              {formData.planName || "Plan Name"}
            </h3>

            <p style={{ fontSize: "0.85rem", color: "gray", marginBottom: "0.25rem" }}>
              <strong>Category:</strong> {formData.category || "-"}
            </p>
            <p style={{ fontSize: "0.85rem", color: "gray", marginBottom: "0.25rem" }}>
              <strong>Duration:</strong> {formData.duration || "-"}
            </p>
            <p style={{ fontSize: "0.85rem", color: "gray", marginBottom: "0.75rem" }}>
              <strong>Intensity:</strong> {formData.intensity || "-"}
            </p>
            <p style={{ fontSize: "1rem", textAlign: "center", color: "slategray" }}>
              {formData.description || "Description..."}
            </p>
          </div>
        </div>

        {/* Manage Plans Section */}
        <div className="container mx-auto px-6 py-20">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "2.5rem",
              marginBottom: "3rem",
              textAlign: "center",
              color: "navy",
            }}
          >
            Manage{" "}
            <span
              style={{
                backgroundColor: "steelblue",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                color: "white",
                boxShadow: "0 4px 12px rgba(70,130,180,0.5)",
              }}
            >
              Gym Plans
            </span>
          </h2>

          {plans.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "1.125rem", color: "navy" }}>
              No gym plans found.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              }}
            >
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "2rem",
                    padding: "1.5rem",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    border: "1px solid lightgray",
                    transition: "transform 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {plan.image && (
                    <img
                      src={plan.image}
                      alt={plan.planName}
                      style={{
                        width: "100%",
                        height: "11rem",
                        objectFit: "cover",
                        borderRadius: "1.5rem",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                      color: "midnightblue",
                    }}
                  >
                    {plan.planName}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "gray", marginBottom: "0.25rem" }}>
                    <strong>Category:</strong> {plan.category}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "gray", marginBottom: "0.5rem" }}>
                    <strong>Intensity:</strong> {plan.intensity}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "slategray",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      marginBottom: "1rem",
                    }}
                  >
                    {plan.description || "-"}
                  </p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => handleEdit(plan)}
                      style={{
                        flex: 1,
                        padding: "0.75rem",
                        borderRadius: "1rem",
                        backgroundColor: "steelblue",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(70,130,180,0.5)",
                        transition: "filter 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(110%)")}
                      onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      style={{
                        flex: 1,
                        padding: "0.75rem",
                        borderRadius: "1rem",
                        backgroundColor: "firebrick",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(178,34,34,0.5)",
                        transition: "filter 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(110%)")}
                      onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
