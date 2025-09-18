
"use client";
import React from "react";
 

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <section className="py-16 px-6 bg-[var(--color-calm-blue)]/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Glass Form */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-lg">
          <h2 className="text-4xl font-extrabold text-[var(--color-black)] mb-4 relative inline-block">
            Contact Us
            <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-[var(--color-calm-blue)] rounded"></span>
          </h2>
          <p className="text-[var(--color-black)]/70 mb-6 text-lg">
            We'd love to hear from you! Reach out anytime.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="fullName" className="block mb-1 font-medium text-[var(--color-black)]">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-0 py-2 border-b-2 border-gray-600 bg-transparent placeholder-gray-400 focus:outline-none focus:border-[var(--color-calm-blue)] transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-[var(--color-black)]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-0 py-2 border-b-2 border-gray-600 bg-transparent placeholder-gray-400 focus:outline-none focus:border-[var(--color-calm-blue)] transition"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-[var(--color-black)]">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message..."
                required
                className="w-full px-0 py-2 border-b-2 border-gray-600 bg-transparent placeholder-gray-400 focus:outline-none focus:border-[var(--color-calm-blue)] transition"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-[var(--color-calm-blue)] text-white py-2 px-6 rounded-lg font-medium hover:bg-[var(--color-light-green)] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Image */ }
        <div className="flex justify-center md:justify-end">
          <img
            src="https://i.ibb.co.com/B5Ks6ZXV/mobail.png"
            alt="Contact Illustration"
            className="w-full max-w-md "
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
