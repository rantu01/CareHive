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
//           style={{ backgroundColor: "var(--color-calm-blue)" }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10 max-w-3xl">
//         {/* Headline */}
//         <h1
//           className="text-4xl sm:text-5xl font-bold mb-6 text-center"
//           style={{ color: "var(--fourground-color)" }}
//         >
//           Add <span style={{ color: "var(--color-calm-blue)" }}>Yoga Technique</span>
//         </h1>
//         <p
//           className="text-lg sm:text-xl text-center mb-10 opacity-90"
//           style={{ color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
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
//               style={{ borderColor: "var(--dashboard-border)", color: "var(--fourground-color)" }}
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl font-semibold text-lg transition-all hover:scale-105"
//             style={{
//               backgroundColor: "var(--color-calm-blue)",
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


// "use client";

// import { useState, useEffect } from "react";
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

//   const [techniques, setTechniques] = useState([]);
//   const [editing, setEditing] = useState(null);

//   const fetchTechniques = async () => {
//     try {
//       const res = await fetch("/api/yoga-techniques");
//       const data = await res.json();
//       if (data.success && Array.isArray(data.data)) {
//         setTechniques(data.data);
//       } else {
//         setTechniques([]);
//       }
//     } catch (error) {
//       setTechniques([]);
//       console.error("Error fetching yoga techniques:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTechniques();
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const method = editing ? "PUT" : "POST";
//     const url = editing
//       ? `/api/yoga-techniques?id=${editing._id}`
//       : "/api/yoga-techniques";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         Swal.fire({
//           title: "✅ Success!",
//           text: editing ? "Yoga technique updated!" : "Yoga technique added!",
//           icon: "success",
//           confirmButtonColor: "#4CAF50",
//         });
//         setFormData({
//           techniqueName: "",
//           sanskritName: "",
//           category: "",
//           style: "",
//           level: "",
//           benefits: "",
//           instructions: "",
//           precautions: "",
//           image: "",
//         });
//         setEditing(null);
//         fetchTechniques();
//       } else {
//         throw new Error(data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "❌ Error!",
//         text: error.message,
//         icon: "error",
//         confirmButtonColor: "#f87171",
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the technique.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#e74c3c",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const res = await fetch(`/api/yoga-techniques?id=${id}`, { method: "DELETE" });
//       const data = await res.json();

//       if (data.success) {
//         Swal.fire("Deleted!", "Yoga technique removed successfully.", "success");
//         fetchTechniques();
//       } else {
//         throw new Error(data.message || "Could not delete.");
//       }
//     } catch (error) {
//       Swal.fire("Error!", error.message, "error");
//     }
//   };

//   const handleEdit = (tech) => {
//     setEditing(tech);
//     setFormData({
//       techniqueName: tech.techniqueName,
//       sanskritName: tech.sanskritName,
//       category: tech.category,
//       style: tech.style,
//       level: tech.level,
//       benefits: tech.benefits,
//       instructions: tech.instructions,
//       precautions: tech.precautions,
//       image: tech.image,
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <section
//       className="py-24 sm:py-32 relative overflow-hidden"
//       style={{ backgroundColor: "var(--dashboard-bg)" }}
//     >
//       {/* Background glow */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
//           style={{ backgroundColor: "var(--color-calm-blue)" }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10 max-w-3xl">
//         {/* Headline */}
//         <h1
//           className="text-4xl sm:text-5xl font-bold mb-6 text-center"
//           style={{ color: "var(--fourground-color)" }}
//         >
//           {editing ? "Update Yoga Technique" : (
//             <>Add <span style={{ color: "var(--color-calm-blue)" }}>Yoga Technique</span></>
//           )}
//         </h1>
//         <p
//           className="text-lg sm:text-xl text-center mb-10 opacity-90"
//           style={{ color: "var(--fourground-color)" }}
//         >
//           {editing
//             ? "Edit the selected yoga technique below."
//             : "Share your knowledge of ancient yoga practices by adding detailed techniques with proper guidance and safety instructions."}
//         </p>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white/10 backdrop-blur-lg border rounded-2xl p-8 shadow-xl space-y-6"
//           style={{ borderColor: "var(--dashboard-border)" }}
//         >
//           {Object.entries({
//             techniqueName: "Technique Name (English)",
//             sanskritName: "Sanskrit Name",
//             category: "Category",
//             style: "Style",
//           }).map(([name, label]) => (
//             <div key={name}>
//               <label className="block text-sm font-medium mb-2">{label}</label>
//               <input
//                 type="text"
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//                 style={{
//                   borderColor: "var(--dashboard-border)",
//                   color: "var(--fourground-color)",
//                 }}
//                 required
//               />
//             </div>
//           ))}

//           {/* Difficulty */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Difficulty Level</label>
//             <select
//               name="level"
//               value={formData.level}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{
//                 borderColor: "var(--dashboard-border)",
//                 color: "var(--fourground-color)",
//               }}
//               required
//             >
//               <option value="">Select level</option>
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>

//           {/* Textareas */}
//           {[["benefits", "Benefits"], ["instructions", "Instructions (Step-by-step)"], ["precautions", "Contraindications / Precautions"]].map(([name, label]) => (
//             <div key={name}>
//               <label className="block text-sm font-medium mb-2">{label}</label>
//               <textarea
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//                 style={{
//                   borderColor: "var(--dashboard-border)",
//                   color: "var(--fourground-color)",
//                 }}
//                 rows="3"
//               />
//             </div>
//           ))}

//           {/* Image */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Visual Aid (Image URL)</label>
//             <input
//               type="url"
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
//               style={{
//                 borderColor: "var(--dashboard-border)",
//                 color: "var(--fourground-color)",
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl font-semibold text-lg transition-all hover:scale-105"
//             style={{
//               backgroundColor: "var(--color-calm-blue)",
//               color: "var(--color-white)",
//             }}
//           >
//             {editing ? "Update Yoga Technique" : "Add Yoga Technique"}
//           </button>
//         </form>

//         {/* Manage Section */}
//         <div className="mt-16">
//           <h2
//             className="text-2xl font-bold mb-6 text-center"
//             style={{ color: "var(--fourground-color)" }}
//           >
//             Manage Yoga Techniques
//           </h2>

//           <div className="grid sm:grid-cols-2 gap-6">
//             {(techniques || []).map((tech) => (
//               <div
//                 key={tech._id}
//                 className="p-6 bg-white/10 backdrop-blur-lg border rounded-2xl shadow-md flex flex-col justify-between"
//                 style={{ borderColor: "var(--dashboard-border)" }}
//               >
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--fourground-color)" }}>
//                     {tech.techniqueName}
//                   </h3>
//                   <p className="text-sm opacity-80 mb-2">{tech.sanskritName}</p>
//                   <p className="text-sm opacity-80 mb-2">Category: {tech.category}</p>
//                   <p className="text-sm opacity-80 mb-2">Level: {tech.level}</p>
//                 </div>

//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => handleEdit(tech)}
//                     className="flex-1 py-2 rounded-lg font-medium hover:scale-105 transition-all"
//                     style={{ backgroundColor: "var(--color-calm-blue)", color: "white" }}
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(tech._id)}
//                     className="flex-1 py-2 rounded-lg font-medium hover:scale-105 transition-all"
//                     style={{ backgroundColor: "#e74c3c", color: "white" }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Flower2,
  ClipboardPlus,
  PencilLine,
  Trash2,
  HeartPulse,
  BookOpenText,
} from "lucide-react";

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
      console.error("Error fetching yoga techniques:", error);
      setTechniques([]);
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
      } else throw new Error(data.message || "Something went wrong.");
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
      const res = await fetch(`/api/yoga-techniques?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Yoga technique removed successfully.", "success");
        fetchTechniques();
      } else throw new Error(data.message || "Could not delete.");
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
      {/* Background accent glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: "var(--color-calm-blue)" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        {/* Headline */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight flex justify-center items-center gap-3"
            style={{ color: "var(--fourground-color)" }}
          >
            <Flower2 className="w-8 h-8 text-green-400 animate-pulse" />
            {editing ? "Update Yoga Technique" : "Add Yoga Technique"}
          </h1>
          <p
            className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto"
            style={{ color: "var(--fourground-color)" }}
          >
            {editing
              ? "Edit the selected yoga technique below and update details."
              : "Share detailed yoga techniques — include benefits, steps, and safety guidelines to help others practice mindfully."}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
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
                className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none transition-all"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
                required
              />
            </div>
          ))}

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Difficulty Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
              style={{
                borderColor: "var(--dashboard-border)",
                color: "var(--fourground-color)",
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
          {[
            ["benefits", "Benefits"],
            ["instructions", "Instructions (Step-by-step)"],
            ["precautions", "Contraindications / Precautions"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
                rows="3"
              />
            </div>
          ))}

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Visual Aid (Image URL)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 outline-none"
              style={{
                borderColor: "var(--dashboard-border)",
                color: "var(--fourground-color)",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
            style={{
              background:
                "linear-gradient(90deg, var(--color-calm-blue), var(--color-primary))",
              color: "white",
            }}
          >
            {editing ? "Update Yoga Technique" : "Add Yoga Technique"}
          </button>
        </form>

        {/* Manage Techniques */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BookOpenText className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h2
              className="text-2xl font-bold text-center"
              style={{ color: "var(--fourground-color)" }}
            >
              Manage Yoga Techniques
            </h2>
          </div>

          {techniques.length === 0 ? (
            <p className="text-center text-lg opacity-70">
              No techniques found yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {techniques.map((tech) => (
                <div
                  key={tech._id}
                  className="relative bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-lg shadow-md transition-all hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                >
                  {/* Pulse Badge */}
                  <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>

                  <div>
                    <h3
                      className="text-xl font-semibold mb-1 flex items-center gap-2"
                      style={{ color: "var(--fourground-color)" }}
                    >
                      <HeartPulse className="w-5 h-5 text-green-400" />
                      {tech.techniqueName}
                    </h3>
                    <p className="text-sm opacity-80 mb-1">
                      {tech.sanskritName}
                    </p>
                    <p className="text-sm opacity-80 mb-1">
                      Category: {tech.category}
                    </p>
                    <p className="text-sm opacity-80 mb-1">
                      Level: {tech.level}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(tech)}
                      className="flex-1 py-2 rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: "var(--color-calm-blue)",
                        color: "white",
                      }}
                    >
                      <PencilLine className="w-4 h-4" /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(tech._id)}
                      className="flex-1 py-2 rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#e74c3c", color: "white" }}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}



