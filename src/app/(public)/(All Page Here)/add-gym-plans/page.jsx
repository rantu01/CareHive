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
          confirmButtonColor: "var(--color-calm-blue)",
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
      confirmButtonColor: "var(--color-calm-blue)",
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
          --color-calm-blue: #3b7f81; /* Calm Blue */
        }
        body {
          background-color: aliceblue;
          color: black;
          font-family: var(--font-primary);
          margin: 0;
          padding: 0;
        }
      `}</style>

      <section className="min-h-screen mt-10" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "2rem",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
              padding: "3rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "3rem",
              alignItems: "stretch",
            }}
          >
            {/* Hero Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "600px",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "4rem",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                  color: "var(--color-calm-blue)",
                }}
              >
                Add & Manage Gym Plans
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "gray",
                  marginBottom: "2rem",
                  lineHeight: 1.8,
                }}
              >
               This platform is designed to empower fitness professionals and enthusiasts to create highly organized, comprehensive gym plans for clients of all levels. Each plan can include detailed workout routines, clearly defined durations, levels of intensity, step-by-step exercises, and required equipment, allowing for seamless implementation and consistency. Trainers can now easily manage multiple client plans, track progress, and customize routines to fit specific goals such as weight loss, muscle building, endurance improvement, or overall wellness. Our live preview feature ensures that every plan is visually structured, making it easy to monitor updates, spot inconsistencies, and enhance user engagement. Beyond just creating routines, this system encourages proper planning, accountability, and professional presentation, allowing trainers to deliver structured programs that maximize results. By using this platform, users can save time on manual planning, maintain a clear overview of ongoing programs, and ensure that all workouts are safe, effective, and goal-oriented. Whether designing individual sessions or managing an entire training curriculum, this tool provides a comprehensive, flexible, and professional approach to fitness planning. Enhance the overall fitness journey with organized, personalized, and visually appealing gym plans that motivate clients, improve adherence, and deliver measurable improvements in performance and health.
              </p>
              <button
                style={{
                  background: "var(--color-calm-blue)",
                  color: "white",
                  padding: "1rem 2.5rem",
                  borderRadius: "2rem",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  boxShadow: "0 8px 20px rgba(59,127,129,0.4)",
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                  transition: "all 0.4s ease",
                  animation: "bounceArrow 1s infinite",
                }}
                onClick={() => {
                  const formElement = document.getElementById("gymForm");
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(59,127,129,0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(59,127,129,0.4)";
                }}
              >
                Create Your Plan ↓
                <style>{`
                  @keyframes bounceArrow {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(5px); }
                    60% { transform: translateY(3px); }
                  }
                `}</style>
              </button>
            </div>

            {/* Hero Image */}
            <div
              style={{
                overflow: "hidden",
                borderRadius: "2rem",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src="https://i.ibb.co/C5GbNpN4/pexels-ivan-samkov-4164761.jpg"
                alt="Gym Workout"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "2rem",
                  minHeight: "600px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Form + Live Preview Section */}
<div
  className="container mx-auto px-6 py-20"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "start",
  }}
>
  {/* Form */}
  <form
    id="gymForm"
    onSubmit={handleSubmit}
    style={{
      background: "linear-gradient(145deg, #ffffff, #f0f4f8)",
      padding: "2.5rem",
      borderRadius: "2rem",
      boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
      border: "1px solid #e0e6ed",
    }}
  >
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
        fontSize: "2rem",
        marginBottom: "2rem",
        color: "var(--color-calm-blue)",
        textAlign: "center",
      }}
    >
      {editing ? "Update Plan" : "Add New Gym Plan"}
    </h2>

    {["planName", "category", "duration"].map((name) => (
      <div key={name} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "1.25rem",
            border: "1px solid #cfd8e3",
            fontSize: "1rem",
            color: "#333",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 10px rgba(59,127,129,0.25)")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        />
      </div>
    ))}

    <div style={{ marginBottom: "1.5rem" }}>
      <select
        name="intensity"
        value={formData.intensity}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "1.25rem",
          border: "1px solid #cfd8e3",
          fontSize: "1rem",
          color: "#333",
          backgroundColor: "#fff",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 10px rgba(59,127,129,0.25)")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <option value="" disabled>
          Select Intensity
        </option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
    </div>

    {["description", "exercises", "equipment", "image"].map((name) => (
      <div key={name} style={{ marginBottom: "1.5rem" }}>
        {name === "image" ? (
          <input
            type="url"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder="Image URL"
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "1.25rem",
              border: "1px solid #cfd8e3",
              fontSize: "1rem",
              color: "#333",
              backgroundColor: "#fff",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 10px rgba(59,127,129,0.25)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        ) : (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            rows="3"
            placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "1.25rem",
              border: "1px solid #cfd8e3",
              fontSize: "1rem",
              color: "#333",
              backgroundColor: "#fff",
              resize: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 10px rgba(59,127,129,0.25)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        )}
      </div>
    ))}

    <button
      type="submit"
      style={{
        width: "100%",
        padding: "1rem",
        borderRadius: "2rem",
        fontWeight: "600",
        fontSize: "1.1rem",
        background: "linear-gradient(90deg, #3b7f81, #5ca2a5)",
        color: "white",
        cursor: "pointer",
        border: "none",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.transform = "translateY(-2px) scale(1.02)")
      }
      onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
    >
      {editing ? "Update Plan" : "Add Gym Plan"}
    </button>
  </form>
{/* Live Preview */}
<div
  style={{
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(16px)",
    borderRadius: "2rem",
    boxShadow: "0 30px 70px rgba(0,0,0,0.18), inset 0 0 20px rgba(255,255,255,0.35)",
    border: "1px solid rgba(255,255,255,0.45)",
    padding: "2rem",
    transition: "all 0.3s ease",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow =
      "0 35px 80px rgba(0,0,0,0.25), inset 0 0 25px rgba(255,255,255,0.4)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow =
      "0 30px 70px rgba(0,0,0,0.18), inset 0 0 20px rgba(255,255,255,0.35)";
  }}
>
  {/* Image + Intensity Badge */}
  <div style={{ position: "relative", width: "100%" }}>
    {formData.image ? (
      <img
        src={formData.image}
        alt={formData.planName}
        style={{
          width: "100%",
          borderRadius: "1.75rem",
          marginBottom: "1.5rem",
          maxHeight: "16rem",
          objectFit: "cover",
          boxShadow: "0 15px 35px rgba(0,0,0,0.22)",
          transition: "all 0.3s ease",
        }}
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: "16rem",
          backgroundColor: "rgba(200,200,200,0.25)",
          borderRadius: "1.75rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontWeight: "600",
          fontSize: "1.1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          boxShadow: "inset 0 0 12px rgba(255,255,255,0.5)",
        }}
      >
        Image Preview
      </div>
    )}

    {/* Floating Intensity Badge */}
    {formData.intensity && (
      <span
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "linear-gradient(90deg, #3b7f81, #5ca2a5)",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "2rem",
          fontSize: "0.85rem",
          fontWeight: "600",
          boxShadow: "0 5px 15px rgba(0,0,0,0.18)",
          textTransform: "uppercase",
        }}
      >
        {formData.intensity}
      </span>
    )}
  </div>

  {/* Plan Title */}
  <h3
    style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "0.5rem",
      color: "var(--color-calm-blue)",
      textShadow: "0 3px 8px rgba(0,0,0,0.12)",
    }}
  >
    {formData.planName || "Plan Name"}
  </h3>

  {/* Basic Info */}
  <div
    style={{
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: "1rem",
    }}
  >
    <p style={{ fontSize: "0.95rem", color: "#555", margin: "0.25rem 0" }}>
      <strong>Category:</strong> {formData.category || "-"}
    </p>
    <p style={{ fontSize: "0.95rem", color: "#555", margin: "0.25rem 0" }}>
      <strong>Duration:</strong> {formData.duration || "-"}
    </p>
  </div>

  {/* Floating Info Panel */}
  <div
    style={{
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)",
      borderRadius: "1.5rem",
      padding: "1rem 1.5rem",
      marginTop: "0.5rem",
      marginBottom: "1rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
      border: "1px solid rgba(255,255,255,0.35)",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "1rem",
      width: "100%",
      flexWrap: "wrap",
    }}
  >
    <div style={{ flex: "1 1 45%" }}>
      <p
        style={{
          fontWeight: "600",
          fontSize: "0.9rem",
          color: "#444",
          marginBottom: "0.25rem",
        }}
      >
        🏋️ Exercises
      </p>
      <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.4 }}>
        {formData.exercises || "-"}
      </p>
    </div>
    <div style={{ flex: "1 1 45%" }}>
      <p
        style={{
          fontWeight: "600",
          fontSize: "0.9rem",
          color: "#444",
          marginBottom: "0.25rem",
        }}
      >
        🛠️ Equipment
      </p>
      <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.4 }}>
        {formData.equipment || "-"}
      </p>
    </div>
  </div>

  {/* Description */}
  <p
    style={{
      fontSize: "1rem",
      color: "#444",
      textAlign: "center",
      lineHeight: 1.6,
      fontStyle: "italic",
      padding: "0 1rem",
    }}
  >
    {formData.description || "Description..."}
  </p>
</div>


</div>

{/* Manage Plans Section */}
<div className="container mx-auto px-6 py-20">
  <h2
    style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: "3rem",
      marginBottom: "3rem",
      textAlign: "center",
      color: "var(--color-calm-blue)",
    }}
  >
    Manage <span className="text-black">Gym Plans</span>{" "}
    
  </h2>

  {plans.length === 0 ? (
    <p
      style={{
        textAlign: "center",
        fontSize: "1.125rem",
        color: "var(--color-calm-blue)",
      }}
    >
      No gym plans found.
    </p>
  ) : (
    <div
      style={{
        display: "grid",
        gap: "2.5rem",
        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      }}
    >
      {plans.map((plan) => (
        <div
          key={plan._id}
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(14px)",
            borderRadius: "2rem",
            padding: "2rem 1.5rem",
            boxShadow:
              "0 20px 45px rgba(0,0,0,0.18), inset 0 0 20px rgba(255,255,255,0.35)",
            border: "1px solid rgba(255,255,255,0.25)",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            cursor: "default",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 30px 60px rgba(0,0,0,0.25), inset 0 0 25px rgba(255,255,255,0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 20px 45px rgba(0,0,0,0.18), inset 0 0 20px rgba(255,255,255,0.35)";
          }}
        >
          {/* Plan Image */}
          {plan.image ? (
            <img
              src={plan.image}
              alt={plan.planName}
              style={{
                width: "100%",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "1.75rem",
                marginBottom: "1.25rem",
                boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "12rem",
                backgroundColor: "#e0e6ed",
                borderRadius: "1.75rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                color: "#888",
                fontWeight: 600,
              }}
            >
              No Image
            </div>
          )}

          {/* Plan Title */}
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1.7rem",
              marginBottom: "0.75rem",
              color: "var(--color-calm-blue)",
              textShadow: "0 3px 6px rgba(0,0,0,0.1)",
            }}
          >
            {plan.planName}
          </h3>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #3b7f81, #5ca2a5)",
                color: "white",
                padding: "0.35rem 0.85rem",
                borderRadius: "1rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
              }}
            >
              {plan.category}
            </span>
            <span
              style={{
                background: "linear-gradient(90deg, #5ca2a5, #78c0b5)",
                color: "white",
                padding: "0.35rem 0.85rem",
                borderRadius: "1rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
              }}
            >
              {plan.intensity}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "0.95rem",
              color: "#555",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              marginBottom: "1.25rem",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            {plan.description || "-"}
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => handleEdit(plan)}
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: "1rem",
                background: "linear-gradient(90deg, #3b7f81, #5ca2a5)",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                border: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-2px) scale(1.03)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
            >
              Edit
            </button>
            <button
            className="bg-gray-600"
              onClick={() => handleDelete(plan._id)}
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: "1rem",
                // background: "firebrick",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                border: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-2px) scale(1.03)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
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
