
"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Wellness() {
  const router = useRouter();

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Background Glow and Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-primary)" }}
        ></div>
        <div
          className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-primary)" }}
        ></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        {/* Header Tagline */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(var(--color-white), 0.8)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--color-primary)" }}
          ></span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-secondary)" }}
          >
            Your Path to Better Living
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          style={{ color: "var(--text-color-all)" }}
        >
          Personalized <span style={{ color: "var(--color-primary)" }}>Wellness</span>
        </h2>

        {/* Description */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 opacity-90"
          style={{ color: "var(--text-color-all)" }}
        >
          To get your <strong>personalized wellness report</strong>, head over to our{" "}
          <span style={{ color: "var(--color-secondary)" }}>Wellness</span> page and explore
          tailored recommendations for your body and mind.
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/wellness")}
          className="group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 hover:shadow-2xl overflow-hidden"
          style={{
            color: "var(--color-white)",
            backgroundColor: "var(--color-primary)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Go to Fitness Page
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
          <div
            className="absolute -inset-0.5 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            style={{ backgroundColor: "var(--color-primary)" }}
          ></div>
        </motion.button>
      </div>
    </section>
  );
}


