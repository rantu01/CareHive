


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Flower2, HeartPulse, ShieldAlert, Wind } from "lucide-react";

export default function YogaTechnique() {
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);

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
        confirmButtonColor: "var(--color-primary)",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechniques();
  }, []);

  if (loading) {
    return (
      <div
        className="text-center mt-20 text-lg font-semibold"
        style={{ color: "var(--color-secondary)" }}
      >
        Loading yoga techniques...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen py-24 px-6 overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--bg-color-all)",
        color: "var(--text-color-all)",
      }}
    >
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/20 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/20 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/2 w-[400px] h-[400px] bg-[var(--color-primary)]/10 blur-[220px] rounded-full animate-pulse-slow"></div>

      {/* Header */}
      <div className="relative text-center mb-28 mt-14 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent drop-shadow-md tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              backgroundImage:
                "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
            }}
          >
            Explore Yoga Techniques
          </h1>
          <p
            className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed opacity-90"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "var(--text-color-all)",
            }}
          >
            Deepen your practice with techniques that balance body, mind, and
            spirit — each crafted for mindfulness and wellness.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <motion.div
        className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {techniques.map((tech) => (
          <motion.div
            key={tech._id}
            variants={{
              hidden: { opacity: 0, y: 70 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.06, translateY: -6 }}
            transition={{ duration: 0.5 }}
            className="relative border rounded-3xl p-6 shadow-xl hover:shadow-3xl transition-all flex flex-col overflow-hidden group"
            style={{
              background: "var(--dashboard-bg, #ffffff)",
              borderColor: "var(--dashboard-border, #dce9e8)",
            }}
          >
            {/* Image */}
            {tech.image && (
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={tech.image}
                  alt={tech.techniqueName}
                  className="w-full h-60 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-2xl"></div>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 relative z-10">
              <h2
                className="text-2xl font-bold mb-2 flex items-center gap-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--color-secondary)",
                }}
              >
                <Flower2
                  className="w-5 h-5 group-hover:rotate-12 transition-transform"
                  style={{ color: "var(--color-primary)" }}
                />
                {tech.techniqueName}
              </h2>

              <p
                className="text-sm mb-2 italic opacity-80"
                style={{ color: "var(--color-secondary)" }}
              >
                {tech.sanskritName} • {tech.category} • {tech.level}
              </p>

              <div className="text-sm leading-relaxed space-y-2">
                {tech.benefits && (
                  <p>
                    <HeartPulse
                      className="inline w-4 h-4 mr-1"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Benefits:
                    </span>{" "}
                    {tech.benefits}
                  </p>
                )}
                {tech.instructions && (
                  <p>
                    <Wind
                      className="inline w-4 h-4 mr-1"
                      style={{ color: "var(--color-secondary)" }}
                    />
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      Instructions:
                    </span>{" "}
                    {tech.instructions}
                  </p>
                )}
                {tech.precautions && (
                  <p>
                    <ShieldAlert
                      className="inline w-4 h-4 mr-1"
                      style={{ color: "var(--color-secondary)" }}
                    />
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      Precautions:
                    </span>{" "}
                    {tech.precautions}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}










