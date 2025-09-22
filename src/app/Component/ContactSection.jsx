"use client";
import React from "react";

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <section
      className="py-16 px-6 transition-colors duration-500 linear-gradient(to right, var(--color-calm-blue), var(--color-white))"
      style={{
        background: "var(--gray-color)",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Glass Form */}
        <div
          className="backdrop-blur-lg p-8 rounded-3xl shadow-lg border transition-colors duration-500"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <h2
            className="text-4xl font-extrabold mb-4 relative inline-block"
            style={{ color: "var(--fourground-color)" }}
          >
            Contact Us
            <span
              className="absolute left-0 -bottom-2 w-1/2 h-1 rounded"
              style={{ backgroundColor: "var(--color-calm-blue)" }}
            ></span>
          </h2>
          <p
            className="mb-6 text-lg"
            style={{ color: "var(--fourground-color)", opacity: 0.7 }}
          >
            We'd love to hear from you! Reach out anytime.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-0 py-2 border-b-2 bg-transparent placeholder-gray-400 focus:outline-none transition-colors duration-300"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-calm-blue)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--dashboard-border)")}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-0 py-2 border-b-2 bg-transparent placeholder-gray-400 focus:outline-none transition-colors duration-300"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-calm-blue)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--dashboard-border)")}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-medium"
                style={{ color: "var(--fourground-color)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message..."
                required
                className="w-full px-0 py-2 border-b-2 bg-transparent placeholder-gray-400 focus:outline-none transition-colors duration-300"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-calm-blue)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--dashboard-border)")}
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="py-2 px-6 rounded-lg font-medium transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-calm-blue)",
                color: "var(--color-white)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--color-light-green)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--color-calm-blue)")}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://i.ibb.co.com/B5Ks6ZXV/mobail.png"
            alt="Contact Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
