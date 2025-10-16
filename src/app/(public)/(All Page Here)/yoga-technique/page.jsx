


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
            style={{ color: "var(--text-color-all)" }}
          >
            Discover{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text drop-shadow-md">
              Yoga Techniques
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl opacity-90"
            style={{ color: "var(--text-color-all)" }}
          >
            Deepen your practice with guided techniques — explore benefits,
            instructions, and mindful precautions.
          </p>
        </div>

        {/* Grid of cards */}
        {techniques.length === 0 ? (
          <p
            className="text-center text-lg"
            style={{ color: "var(--text-color-all)" }}
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
                    style={{ color: "var(--text-color-all)" }}
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



