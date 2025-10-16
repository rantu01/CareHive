"use client";
import Link from "next/link";

export default function AdminToolsPage() {
  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-light-green)" }}
        ></div>
        <div
          className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-secondary)" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(var(--color-white), 0.8)",
            borderColor: "var(--dashboard-border)",
          }}>
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "green" }}
          ></span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-secondary)" }}
          >
            Admin Control Panel
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          style={{ color: "var(--text-color-all)" }}
        >
          Manage{" "}
          <span
            className="relative inline-block"
            style={{ color: "var(--color-light-green)" }}
          >
            Gym Plans
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 200 20"
            >
              <path
                d="M10,10 C40,5 160,15 190,10"
                stroke="var(--color-light-green)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          &{" "}
          <span style={{ color: "var(--color-secondary)" }}>
            Yoga Techniques
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90 mb-16"
          style={{ color: "var(--text-color-all)" }}
        >
          Empower your wellness platform by adding tailored gym training plans and calming yoga techniques for your users.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* Add Gym Plans Button */}
          <Link
            href="/add-gym-plans"
            className="group relative bg-white border border-solid border-green-900 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            
          >
            <span className="relative z-10 flex items-center gap-2">
              Add Gym Training Plans
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
              style={{ backgroundColor: "var(--color-light-green)" }}
            ></div>
          </Link>

          {/* Add Yoga Techniques Button */}
          <Link
            href="/add-yoga-technique"
            className="group relative px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{
              color: "var(--color-white)",
              backgroundColor: "var(--color-secondary)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Add Yoga Techniques
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
              style={{ backgroundColor: "var(--color-secondary)" }}
            ></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
