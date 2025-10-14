"use client";
import React from "react";
import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa";

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <section
      className="py-16 px-6 bg-[var(--gray-color)] min-h-screen flex items-center justify-center container mx-auto"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Left: Contact Form */}
        <div
          className="backdrop-blur-lg p-10 rounded-3xl shadow-xl border transition-colors duration-500"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
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
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--color-calm-blue)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--dashboard-border)")
                }
              />
            </div>

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
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--color-calm-blue)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--dashboard-border)")
                }
              />
            </div>

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
                rows="5"
                placeholder="Write your message..."
                required
                className="w-full px-0 py-2 border-b-2 bg-transparent placeholder-gray-400 focus:outline-none transition-colors duration-300"
                style={{
                  borderColor: "var(--dashboard-border)",
                  color: "var(--fourground-color)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--color-calm-blue)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--dashboard-border)")
                }
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-lg font-medium transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-calm-blue)",
                color: "var(--color-white)",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "var(--color-light-green)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "var(--color-calm-blue)")
              }
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Info Cards + Map */}
<div className="flex flex-col gap-6">
  {/* Info Cards */}
  <div className="flex flex-col gap-4">
    {/* Email Card */}
    <div className="flex items-center gap-4 p-5 rounded-2xl shadow-lg backdrop-blur-lg transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <FaEnvelope className="text-2xl text-blue-600" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-800">Email Us</h4>
        <p className="text-gray-600 opacity-90">contact@company.com</p>
      </div>
    </div>

    {/* Phone Card */}
    <div className="flex items-center gap-4 p-5 rounded-2xl shadow-lg backdrop-blur-lg transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <FaPhone className="text-2xl text-blue-600" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-800">Call Us</h4>
        <p className="text-gray-600 opacity-90">+1 234 567 890</p>
      </div>
    </div>

    {/* Office Hours Card */}
    <div className="flex items-center gap-4 p-5 rounded-2xl shadow-lg backdrop-blur-lg transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <FaClock className="text-2xl text-blue-600" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-800">Office Hours</h4>
        <p className="text-gray-600 opacity-90">Mon - Fri, 9:00 AM - 6:00 PM</p>
      </div>
    </div>
  </div>

  {/* Map */}
  <div
    className="backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border mt-6"
    style={{
      backgroundColor: "rgba(255,255,255,0.85)",
      borderColor: "var(--dashboard-border)",
      minHeight: "300px",
    }}
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d90.412521!3d23.810331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b0c7c5c5f1%3A0x1a5a1c1c1a1b1b1b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Office Location"
    ></iframe>
  </div>
</div>

      </div>
    </section>
  );
};

export default ContactSection;
