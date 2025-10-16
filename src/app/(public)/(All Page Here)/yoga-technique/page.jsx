// "use client";

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function YogaTechnique() {
//   const [techniques, setTechniques] = useState([]);

//   // Fetch all yoga techniques from API
//   const fetchTechniques = async () => {
//     try {
//       const res = await fetch("/api/yoga-techniques");
//       const data = await res.json();
//       if (data.success) setTechniques(data.data);
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: "❌ Error!",
//         text: "Failed to load yoga techniques.",
//         icon: "error",
//         confirmButtonColor: "#f87171",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchTechniques();
//   }, []);

//   return (
//     <section
//       className="py-24 sm:py-32 relative overflow-hidden"
//       style={{ backgroundColor: "var(--dashboard-bg)" }}
//     >
//       {/* Background glow */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
//           style={{ backgroundColor: "var(--color-secondary)" }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10 max-w-5xl">
//         {/* Headline */}
//         <h1
//           className="text-4xl sm:text-5xl font-bold mb-12 text-center"
//           style={{ color: "var(--text-color-all)" }}
//         >
//           Yoga <span style={{ color: "var(--color-secondary)" }}>Techniques</span>
//         </h1>

//         {/* Grid of Yoga Techniques */}
//         {techniques.length === 0 ? (
//           <p
//             className="text-center text-lg"
//             style={{ color: "var(--text-color-all)" }}
//           >
//             No yoga techniques found.
//           </p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {techniques.map((tech) => (
//               <div
//                 key={tech._id}
//                 className="bg-white/10 backdrop-blur-lg border rounded-2xl p-6 shadow-md flex flex-col justify-between transition-transform hover:scale-105"
//                 style={{ borderColor: "var(--dashboard-border)" }}
//               >
//                 {/* Image */}
//                 {tech.image && (
//                   <img
//                     src={tech.image}
//                     alt={tech.techniqueName}
//                     className="w-full h-48 object-cover rounded-xl mb-4"
//                   />
//                 )}

//                 {/* Info */}
//                 <div className="flex-1">
//                   <h2
//                     className="text-2xl font-bold mb-1"
//                     style={{ color: "var(--text-color-all)" }}
//                   >
//                     {tech.techniqueName}
//                   </h2>
//                   <p className="text-sm opacity-80 mb-1">{tech.sanskritName}</p>
//                   <p className="text-sm opacity-80 mb-1">Category: {tech.category}</p>
//                   <p className="text-sm opacity-80 mb-1">Style: {tech.style || "-"}</p>
//                   <p className="text-sm opacity-80 mb-2">Level: {tech.level}</p>

//                   {/* Benefits */}
//                   {tech.benefits && (
//                     <p className="text-sm mb-2">
//                       <span className="font-semibold">Benefits:</span> {tech.benefits}
//                     </p>
//                   )}

//                   {/* Instructions */}
//                   {tech.instructions && (
//                     <p className="text-sm mb-2">
//                       <span className="font-semibold">Instructions:</span>{" "}
//                       {tech.instructions}
//                     </p>
//                   )}

//                   {/* Precautions */}
//                   {tech.precautions && (
//                     <p className="text-sm">
//                       <span className="font-semibold">Precautions:</span>{" "}
//                       {tech.precautions}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function YogaTechnique() {
//   const [techniques, setTechniques] = useState([]);

//   // Fetch all yoga techniques from API
//   const fetchTechniques = async () => {
//     try {
//       const res = await fetch("/api/yoga-techniques");
//       const data = await res.json();
//       if (data.success) setTechniques(data.data);
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: "❌ Error!",
//         text: "Failed to load yoga techniques.",
//         icon: "error",
//         confirmButtonColor: "#f87171",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchTechniques();
//   }, []);

//   return (
//     <section
//       className="py-24 sm:py-32 relative overflow-hidden"
//       style={{ backgroundColor: "var(--dashboard-bg)" }}
//     >
//       {/* Background glow */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"
//           style={{ backgroundColor: "var(--color-secondary)" }}
//         ></div>
//         <div
//           className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"
//           style={{ backgroundColor: "var(--color-light-green)" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-5 blur-2xl"
//           style={{ backgroundColor: "var(--color-light-green)", transform: "translate(-50%, -50%)" }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10 max-w-6xl">
//         {/* Headline */}
//         <h1
//           className="text-4xl sm:text-5xl font-bold mb-12 text-center"
//           style={{ color: "var(--text-color-all)" }}
//         >
//           Yoga <span style={{ color: "var(--color-secondary)" }}>Techniques</span>
//         </h1>
//         <p
//           className="text-lg sm:text-xl text-center mb-12 opacity-90"
//           style={{ color: "var(--text-color-all)" }}
//         >
//           Explore detailed yoga techniques with benefits, instructions, and precautions for safe practice.
//         </p>

//         {/* Grid of Yoga Techniques */}
//         {techniques.length === 0 ? (
//           <p className="text-center text-lg" style={{ color: "var(--text-color-all)" }}>
//             No yoga techniques found.
//           </p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {techniques.map((tech, index) => (
//               <div
//                 key={tech._id}
//                 className="bg-white/10 backdrop-blur-lg border rounded-2xl p-6 shadow-md flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl relative group"
//                 style={{ borderColor: "var(--dashboard-border)" }}
//               >
//                 {/* Glowing border */}
//                 <div
//                   className="absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"
//                   style={{ backgroundColor: "var(--color-light-green)", zIndex: 0 }}
//                 ></div>

//                 {/* Image */}
//                 {tech.image && (
//                   <img
//                     src={tech.image}
//                     alt={tech.techniqueName}
//                     className="w-full h-48 object-cover rounded-xl mb-4 relative z-10"
//                   />
//                 )}

//                 {/* Info */}
//                 <div className="flex-1 relative z-10">
//                   <h2
//                     className="text-2xl font-bold mb-1 transition-colors duration-300"
//                     style={{ color: "var(--text-color-all)" }}
//                   >
//                     {tech.techniqueName}
//                   </h2>
//                   <p className="text-sm opacity-80 mb-1">{tech.sanskritName}</p>
//                   <p className="text-sm opacity-80 mb-1">Category: {tech.category}</p>
//                   <p className="text-sm opacity-80 mb-1">Style: {tech.style || "-"}</p>
//                   <p className="text-sm opacity-80 mb-2">Level: {tech.level}</p>

//                   {/* Benefits */}
//                   {tech.benefits && (
//                     <p className="text-sm mb-2">
//                       <span className="font-semibold text-green-400">Benefits:</span> {tech.benefits}
//                     </p>
//                   )}

//                   {/* Instructions */}
//                   {tech.instructions && (
//                     <p className="text-sm mb-2">
//                       <span className="font-semibold text-cyan-400">Instructions:</span> {tech.instructions}
//                     </p>
//                   )}

//                   {/* Precautions */}
//                   {tech.precautions && (
//                     <p className="text-sm">
//                       <span className="font-semibold text-red-400">Precautions:</span> {tech.precautions}
//                     </p>
//                   )}
//                 </div>

//                 {/* Floating pulse circle */}
//                 <span
//                   className="absolute -top-3 -right-3 w-4 h-4 rounded-full opacity-60 animate-ping"
//                   style={{ backgroundColor: "var(--color-light-green)" }}
//                 ></span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function YogaTechnique() {
  const [techniques, setTechniques] = useState([]);

  // Fetch all yoga techniques from API
  const fetchTechniques = async () => {
    try {
      const res = await fetch("/api/yoga-techniques");
      const data = await res.json();
      if (data.success) setTechniques(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "❌ Error!",
        text: "Failed to load yoga techniques.",
        icon: "error",
        confirmButtonColor: "#f87171",
      });
    }
  };

  useEffect(() => {
    fetchTechniques();
  }, []);

  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: "var(--color-secondary)" }}
        ></div>
        <div
          className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: "var(--color-light-green)" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-5 blur-2xl"
          style={{
            backgroundColor: "var(--color-light-green)",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
          style={{ color: "var(--text-color-all)" }}
        >
          Yoga <span style={{ color: "var(--color-secondary)" }}>Techniques</span>
        </h1>
        <p
          className="text-lg sm:text-xl text-center mb-12 opacity-90"
          style={{ color: "var(--text-color-all)" }}
        >
          Explore detailed yoga techniques with benefits, instructions, and precautions for safe practice.
        </p>

        {/* Grid of Yoga Techniques */}
        {techniques.length === 0 ? (
          <p className="text-center text-lg" style={{ color: "var(--text-color-all)" }}>
            No yoga techniques found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techniques.map((tech, index) => (
              <div
                key={tech._id}
                className="bg-white/10 backdrop-blur-lg border rounded-2xl p-6 shadow-md flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl relative group"
                style={{ borderColor: "var(--dashboard-border)" }}
              >
                {/* Glowing border */}
                <div
                  className="absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundColor: "var(--color-light-green)", zIndex: 0 }}
                ></div>

                {/* Image */}
                {tech.image && (
                  <img
                    src={tech.image}
                    alt={tech.techniqueName}
                    className="w-full h-48 object-cover rounded-xl mb-4 relative z-10"
                  />
                )}

                {/* Info */}
                <div className="flex-1 relative z-10">
                  <h2
                    className="text-2xl font-bold mb-1 transition-colors duration-300"
                    style={{ color: "var(--text-color-all)" }}
                  >
                    {tech.techniqueName}
                  </h2>
                  <p className="text-sm opacity-80 mb-1">{tech.sanskritName}</p>
                  <p className="text-sm opacity-80 mb-1">Category: {tech.category}</p>
                  <p className="text-sm opacity-80 mb-1">Style: {tech.style || "-"}</p>
                  <p className="text-sm opacity-80 mb-2">Level: {tech.level}</p>

                  {/* Benefits */}
                  {tech.benefits && (
                    <p className="text-sm mb-2">
                      <span className="font-semibold text-green-400">Benefits:</span> {tech.benefits}
                    </p>
                  )}

                  {/* Instructions */}
                  {tech.instructions && (
                    <p className="text-sm mb-2">
                      <span className="font-semibold text-cyan-400">Instructions:</span> {tech.instructions}
                    </p>
                  )}

                  {/* Precautions */}
                  {tech.precautions && (
                    <p className="text-sm">
                      <span className="font-semibold text-red-400">Precautions:</span> {tech.precautions}
                    </p>
                  )}
                </div>

                {/* Floating pulse circle */}
                <span
                  className="absolute -top-3 -right-3 w-4 h-4 rounded-full opacity-60 animate-ping"
                  style={{ backgroundColor: "var(--color-light-green)" }}
                ></span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Default export for easy import
export default YogaTechnique;

