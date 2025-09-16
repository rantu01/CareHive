import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-[var(--color-light-green)]/20 py-12 px-6">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-[var(--color-black)] mb-4 relative inline-block">
          Contact Us
          <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-[var(--color-calm-blue)] rounded"></span>
        </h2>
        <p className="text-[var(--color-black)]/70 text-lg mb-8">
          We’d love to hear from you! Reach out anytime.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-[var(--color-white)] p-8 rounded-2xl shadow-lg">
        <form className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div className="relative">
            <label className="block text-[var(--color-black)] font-medium mb-1">
              Full Name
            
            </label>
            
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border-b-2 border-gray-300 px-0 py-2 placeholder-gray-400 focus:outline-none focus:border-[var(--color-calm-blue)] transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-[var(--color-black)] font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-b-2 border-gray-300 px-0 py-2 placeholder-gray-400 focus:outline-none focus:border-[var(--color-calm-blue)] transition"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <label className="block text-[var(--color-black)] font-medium mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full border-b-2 border-gray-300 px-0 py-2 placeholder-gray-400 focus:outline-none focus:border-[var(--color-calm-blue)] transition"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-[var(--color-calm-blue)] text-[var(--color-white)] py-2 px-6 rounded-lg font-medium hover:bg-[var(--color-light-green)] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;







