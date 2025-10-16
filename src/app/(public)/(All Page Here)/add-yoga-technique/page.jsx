// "use client";

// import { useState } from "react";
// import Swal from "sweetalert2";

// export default function AddYogaTechnique() {
//   const [formData, setFormData] = useState({
//     techniqueName: "",
//     sanskritName: "",
//     category: "",
//     style: "",
//     level: "",
//     benefits: "",
//     instructions: "",
//     precautions: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/yoga-techniques", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (data.success) {
//       Swal.fire({
//         title: "✅ Success!",
//         text: "Yoga technique added successfully.",
//         icon: "success",
//         confirmButtonColor: "#4CAF50",
//       });
//       setFormData({
//         techniqueName: "",
//         sanskritName: "",
//         category: "",
//         style: "",
//         level: "",
//         benefits: "",
//         instructions: "",
//         precautions: "",
//         image: "",
//       });
//     } else {
//       Swal.fire({
//         title: "❌ Error!",
//         text: data.message || "Something went wrong.",
//         icon: "error",
//         confirmButtonColor: "#f87171",
//       });
//     }
//   };

//   return (
//     <section
//       className="py-24 sm:py-32 relative overflow-hidden"
//       style={{ backgroundColor: "var(--dashboard-bg)" }}
//     >
//       {/* background glow */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
//           style={{ backgroundColor: "var(--color-secondary)" }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10 max-w-3xl">
//         {/* Headline */}
//         <h1
//           className="text-4xl sm:text-5xl font-bold mb-6 text-center"
//           style={{ color: "var(--text-color-all)" }}
//         >
//           Add <span style={{ color: "var(--color-secondary)" }}>Yoga Technique</span>
//         </h1>
//         <p
//           className="text-lg sm:text-xl text-center mb-10 opacity-90"
//           style={{ color: "var(--text-color-all)" }}
//         >
//           Share your knowledge of ancient yoga practices by adding detailed techniques
//           with proper guidance and safety instructions.
//         </p>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white/10 backdrop-blur-lg border rounded-2xl p-8 shadow-xl space-y-6"
//           style={{ borderColor: "var(--dashboard-border)" }}
//         >
//           {/* Technique Name */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Technique Name (English)
//             </label>
//             <input
//               type="text"
//               name="techniqueName"
//               value={formData.techniqueName}
//               onChange={handleChange}
//               placeholder="e.g., Tree Pose"
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//               required
//             />
//           </div>

//           {/* Sanskrit Name */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Sanskrit Name</label>
//             <input
//               type="text"
//               name="sanskritName"
//               value={formData.sanskritName}
//               onChange={handleChange}
//               placeholder="e.g., Vrksasana"
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//               required
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="e.g., Standing Asana, Pranayama, Meditation"
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//               required
//             />
//           </div>

//           {/* Style */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Style</label>
//             <input
//               type="text"
//               name="style"
//               value={formData.style}
//               onChange={handleChange}
//               placeholder="e.g., Hatha, Vinyasa, Yin"
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//             />
//           </div>

//           {/* Difficulty Level */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Difficulty Level</label>
//             <select
//               name="level"
//               value={formData.level}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//               required
//             >
//               <option value="">Select level</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>

//           {/* Benefits */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Benefits</label>
//             <textarea
//               name="benefits"
//               value={formData.benefits}
//               onChange={handleChange}
//               placeholder="e.g., Improves balance, Strengthens legs, Calms the mind"
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//               rows="3"
//             ></textarea>
//           </div>

//           {/* Instructions */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Instructions (Step-by-step)
//             </label>
//             <textarea
//               name="instructions"
//               value={formData.instructions}
//               onChange={handleChange}
//               placeholder="Write the steps clearly..."
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//               rows="4"
//               required
//             ></textarea>
//           </div>

//           {/* Precautions */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Contraindications / Precautions
//             </label>
//             <textarea
//               name="precautions"
//               value={formData.precautions}
//               onChange={handleChange}
//               placeholder="e.g., Avoid if you have high blood pressure, etc."
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//               rows="3"
//             ></textarea>
//           </div>

//           {/* Image Link */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Visual Aid (Image URL)</label>
//             <input
//               type="url"
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               placeholder="https://example.com/yoga-pose.jpg"
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--text-color-all)" }}
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl font-semibold text-lg transition-all hover:scale-105"
//             style={{
//               backgroundColor: "var(--color-secondary)",
//               color: "var(--color-white)",
//             }}
//           >
//             Add Yoga Technique
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddYogaTechnique() {
  const [formData, setFormData] = useState({
    techniqueName: "",
    sanskritName: "",
    category: "",
    style: "",
    level: "",
    benefits: "",
    instructions: "",
    precautions: "",
    image: "",
  });

  const [techniques, setTechniques] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTechniques = async () => {
    try {
      const res = await fetch("/api/yoga-techniques");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTechniques(data.data);
      } else {
        setTechniques([]);
      }
    } catch (error) {
      setTechniques([]);
      console.error("Error fetching yoga techniques:", error);
    }
  };

  useEffect(() => {
    fetchTechniques();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/yoga-techniques?id=${editing._id}`
      : "/api/yoga-techniques";

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
          text: editing ? "Yoga technique updated!" : "Yoga technique added!",
          icon: "success",
          confirmButtonColor: "#4CAF50",
        });
        setFormData({
          techniqueName: "",
          sanskritName: "",
          category: "",
          style: "",
          level: "",
          benefits: "",
          instructions: "",
          precautions: "",
          image: "",
        });
        setEditing(null);
        fetchTechniques();
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (error) {
      Swal.fire({
        title: "❌ Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#f87171",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the technique.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e74c3c",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/yoga-techniques?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Yoga technique removed successfully.", "success");
        fetchTechniques();
      } else {
        throw new Error(data.message || "Could not delete.");
      }
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleEdit = (tech) => {
    setEditing(tech);
    setFormData({
      techniqueName: tech.techniqueName,
      sanskritName: tech.sanskritName,
      category: tech.category,
      style: tech.style,
      level: tech.level,
      benefits: tech.benefits,
      instructions: tech.instructions,
      precautions: tech.precautions,
      image: tech.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-secondary)" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl font-bold mb-6 text-center"
          style={{ color: "var(--text-color-all)" }}
        >
          {editing ? "Update Yoga Technique" : (
            <>Add <span style={{ color: "var(--color-secondary)" }}>Yoga Technique</span></>
          )}
        </h1>
        <p
          className="text-lg sm:text-xl text-center mb-10 opacity-90"
          style={{ color: "var(--text-color-all)" }}
        >
          {editing
            ? "Edit the selected yoga technique below."
            : "Share your knowledge of ancient yoga practices by adding detailed techniques with proper guidance and safety instructions."}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border rounded-2xl p-8 shadow-xl space-y-6"
          style={{ borderColor: "var(--dashboard-border)" }}
        >
          {Object.entries({
            techniqueName: "Technique Name (English)",
            sanskritName: "Sanskrit Name",
            category: "Category",
            style: "Style",
          }).map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--text-color-all)",
                }}
                required
              />
            </div>
          ))}

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
              style={{
                borderColor: "var(--dashboard-border)",
                color: "var(--text-color-all)",
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
          {[["benefits", "Benefits"], ["instructions", "Instructions (Step-by-step)"], ["precautions", "Contraindications / Precautions"]].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--text-color-all)",
                }}
                rows="3"
              />
            </div>
          ))}

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Visual Aid (Image URL)</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
              style={{
                borderColor: "var(--dashboard-border)",
                color: "var(--text-color-all)",
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-white)",
            }}
          >
            {editing ? "Update Yoga Technique" : "Add Yoga Technique"}
          </button>
        </form>

        {/* Manage Section */}
        <div className="mt-16">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "var(--text-color-all)" }}
          >
            Manage Yoga Techniques
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {(techniques || []).map((tech) => (
              <div
                key={tech._id}
                className="p-6 bg-white/10 backdrop-blur-lg border rounded-2xl shadow-md flex flex-col justify-between"
                style={{ borderColor: "var(--dashboard-border)" }}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text-color-all)" }}>
                    {tech.techniqueName}
                  </h3>
                  <p className="text-sm opacity-80 mb-2">{tech.sanskritName}</p>
                  <p className="text-sm opacity-80 mb-2">Category: {tech.category}</p>
                  <p className="text-sm opacity-80 mb-2">Level: {tech.level}</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(tech)}
                    className="flex-1 py-2 rounded-lg font-medium hover:scale-105 transition-all"
                    style={{ backgroundColor: "var(--color-secondary)", color: "white" }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(tech._id)}
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


