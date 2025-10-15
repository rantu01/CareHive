


// "use client";

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export function YogaTechnique() {
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
//           style={{ backgroundColor: "var(--color-calm-blue)" }}
//         ></div>
//         <div
//           className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"
//           style={{ backgroundColor: "var(--color-light-green)" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-5 blur-2xl"
//           style={{
//             backgroundColor: "var(--color-light-green)",
//             transform: "translate(-50%, -50%)",
//           }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10 max-w-6xl">
//         {/* Headline */}
//         <h1
//           className="text-4xl sm:text-5xl font-bold mb-12 text-center"
//           style={{ color: "var(--fourground-color)" }}
//         >
//           Yoga <span style={{ color: "var(--color-calm-blue)" }}>Techniques</span>
//         </h1>
//         <p
//           className="text-lg sm:text-xl text-center mb-12 opacity-90"
//           style={{ color: "var(--fourground-color)" }}
//         >
//           Explore detailed yoga techniques with benefits, instructions, and precautions for safe practice.
//         </p>

//         {/* Grid of Yoga Techniques */}
//         {techniques.length === 0 ? (
//           <p className="text-center text-lg" style={{ color: "var(--fourground-color)" }}>
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
//                     style={{ color: "var(--fourground-color)" }}
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

// // Default export for easy import
// export default YogaTechnique;



// "use client";

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import {
//   Flower2,
//   HeartPulse,
//   ShieldAlert,
//   Sparkles,
//   Brain,
//   Wind,
// } from "lucide-react";

// export default function YogaTechnique() {
//   const [techniques, setTechniques] = useState([]);

//   // Fetch all yoga techniques
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
//       className="relative py-24 sm:py-32 overflow-hidden"
//       style={{ backgroundColor: "var(--dashboard-bg)" }}
//     >
//       {/* Glowing background orbs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className="absolute -top-40 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
//           style={{ backgroundColor: "var(--color-calm-blue)" }}
//         />
//         <div
//           className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
//           style={{ backgroundColor: "var(--color-light-green)" }}
//         />
//         <div
//           className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] rounded-full opacity-10 blur-3xl"
//           style={{
//             backgroundColor: "var(--color-calm-blue)",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="container relative z-10 mx-auto max-w-6xl px-6">
//         {/* Headline */}
//         <div className="text-center mb-16">
//           <h1
//             className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight"
//             style={{ color: "var(--fourground-color)" }}
//           >
//             Discover{" "}
//             <span className="bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text drop-shadow-md">
//               Yoga Techniques
//             </span>
//           </h1>
//           <p
//             className="text-lg sm:text-xl opacity-90"
//             style={{ color: "var(--fourground-color)" }}
//           >
//             Deepen your practice with guided techniques — explore benefits,
//             instructions, and mindful precautions.
//           </p>
//         </div>

//         {/* Grid of cards */}
//         {techniques.length === 0 ? (
//           <p
//             className="text-center text-lg"
//             style={{ color: "var(--fourground-color)" }}
//           >
//             No yoga techniques found.
//           </p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
//             {techniques.map((tech, index) => (
//               <div
//                 key={tech._id}
//                 className="relative bg-white/10 border border-white/20 rounded-2xl overflow-hidden group shadow-lg backdrop-blur-lg p-6 transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl hover:border-white/40"
//               >
//                 {/* Glowing hover border */}
//                 <div
//                   className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, var(--color-calm-blue), var(--color-light-green))",
//                   }}
//                 />

//                 {/* Floating pulse */}
//                 <span
//                   className="absolute -top-3 -right-3 w-4 h-4 rounded-full opacity-60 animate-ping"
//                   style={{ backgroundColor: "var(--color-light-green)" }}
//                 ></span>

//                 {/* Image */}
//                 {tech.image && (
//                   <div className="relative mb-5 overflow-hidden rounded-xl">
//                     <img
//                       src={tech.image}
//                       alt={tech.techniqueName}
//                       className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
//                   </div>
//                 )}

//                 {/* Info */}
//                 <div className="relative z-10 space-y-2">
//                   <h2
//                     className="text-2xl font-bold flex items-center gap-2"
//                     style={{ color: "var(--fourground-color)" }}
//                   >
//                     <Flower2
//                       className="w-5 h-5 text-green-400 group-hover:rotate-12 transition-transform"
//                     />
//                     {tech.techniqueName}
//                   </h2>
//                   <p className="text-sm opacity-70">{tech.sanskritName}</p>
//                   <p className="text-sm opacity-80">
//                     <Sparkles className="inline w-4 h-4 mr-1 text-cyan-400" />
//                     Category: {tech.category}
//                   </p>
//                   <p className="text-sm opacity-80">
//                     <Brain className="inline w-4 h-4 mr-1 text-yellow-400" />
//                     Level: {tech.level}
//                   </p>

//                   {tech.benefits && (
//                     <p className="text-sm">
//                       <HeartPulse className="inline w-4 h-4 mr-1 text-green-400" />
//                       <span className="font-semibold text-green-400">
//                         Benefits:
//                       </span>{" "}
//                       {tech.benefits}
//                     </p>
//                   )}
//                   {tech.instructions && (
//                     <p className="text-sm">
//                       <Wind className="inline w-4 h-4 mr-1 text-cyan-400" />
//                       <span className="font-semibold text-cyan-400">
//                         Instructions:
//                       </span>{" "}
//                       {tech.instructions}
//                     </p>
//                   )}
//                   {tech.precautions && (
//                     <p className="text-sm">
//                       <ShieldAlert className="inline w-4 h-4 mr-1 text-red-400" />
//                       <span className="font-semibold text-red-400">
//                         Precautions:
//                       </span>{" "}
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

"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Flower2,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  Brain,
  Wind,
} from "lucide-react";

export default function YogaTechnique() {
  const [techniques, setTechniques] = useState([]);

  // Fetch all yoga techniques
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
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {/* Headline */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight"
            style={{ color: "var(--fourground-color)" }}
          >
            Discover{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text drop-shadow-md">
              Yoga Techniques
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl opacity-90"
            style={{ color: "var(--fourground-color)" }}
          >
            Deepen your practice with guided techniques — explore benefits,
            instructions, and mindful precautions.
          </p>
        </div>

        {/* Grid of cards */}
        {techniques.length === 0 ? (
          <p
            className="text-center text-lg"
            style={{ color: "var(--fourground-color)" }}
          >
            No yoga techniques found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {techniques.map((tech) => (
              <div
                key={tech._id}
                className="relative bg-white/10 border border-white/20 rounded-2xl overflow-hidden group shadow-md backdrop-blur-lg p-6 
                transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
              >
                {/* Pulse badge */}
                <span
                  className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                ></span>

                {/* Image */}
                {tech.image && (
                  <div className="relative mb-5 overflow-hidden rounded-xl">
                    <img
                      src={tech.image}
                      alt={tech.techniqueName}
                      className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                )}

                {/* Info */}
                <div className="relative z-10 space-y-2">
                  <h2
                    className="text-2xl font-bold flex items-center gap-2"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    <Flower2 className="w-5 h-5 text-green-400 group-hover:rotate-12 transition-transform" />
                    {tech.techniqueName}
                  </h2>
                  <p className="text-sm opacity-70">{tech.sanskritName}</p>
                  <p className="text-sm opacity-80">
                    <Sparkles className="inline w-4 h-4 mr-1 text-cyan-400" />
                    Category: {tech.category}
                  </p>
                  <p className="text-sm opacity-80">
                    <Brain className="inline w-4 h-4 mr-1 text-yellow-400" />
                    Level: {tech.level}
                  </p>

                  {tech.benefits && (
                    <p className="text-sm">
                      <HeartPulse className="inline w-4 h-4 mr-1 text-green-400" />
                      <span className="font-semibold text-green-400">
                        Benefits:
                      </span>{" "}
                      {tech.benefits}
                    </p>
                  )}
                  {tech.instructions && (
                    <p className="text-sm">
                      <Wind className="inline w-4 h-4 mr-1 text-cyan-400" />
                      <span className="font-semibold text-cyan-400">
                        Instructions:
                      </span>{" "}
                      {tech.instructions}
                    </p>
                  )}
                  {tech.precautions && (
                    <p className="text-sm">
                      <ShieldAlert className="inline w-4 h-4 mr-1 text-red-400" />
                      <span className="font-semibold text-red-400">
                        Precautions:
                      </span>{" "}
                      {tech.precautions}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}



