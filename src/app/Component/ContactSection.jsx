"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin, Send, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! We'll get back to you soon.");
    setFormData({ fullName: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 px-4 bg-[var(--dashboard-bg)] min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
            <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)] font-heading">
            Contact Us
          </h2>
          
          <p className="text-xl text-[var(--fourground-color)] max-w-2xl mx-auto leading-relaxed opacity-80">
            Have questions or need support? We're here to help. Reach out to us and we'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl shadow-xl border border-[var(--dashboard-border)] p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[var(--color-primary)] text-[var(--gray-color)] rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 " />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                  Send us a Message
                </h3>
                <p className="text-[var(--fourground-color)] opacity-70">
                  Fill out the form below
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block font-semibold text-[var(--fourground-color)]"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--dashboard-border)]  focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all duration-300 outline-none"
                  style={{ color: "var(--fourground-color)" }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-semibold text-[var(--fourground-color)]"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--dashboard-border)]  focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all duration-300 outline-none"
                  style={{ color: "var(--fourground-color)" }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block font-semibold text-[var(--fourground-color)]"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--dashboard-border)]  focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all duration-300 outline-none resize-none"
                  style={{ color: "var(--fourground-color)" }}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[var(--color-primary)] text-[var(--gray-color)]  py-4 rounded-xl font-semibold text-lg hover:bg-[var(--color-secondary)] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Contact Information & Map */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className=" rounded-2xl p-6 border border-[var(--dashboard-border)] shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-[var(--color-primary)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[var(--color-primary)] bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6  text-[var(--gray-color)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--fourground-color)] mb-1">
                      Email Us
                    </h4>
                    <p className="text-[var(--color-primary)] font-medium">
                      support@carehive.com
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className=" rounded-2xl p-6 border border-[var(--dashboard-border)] shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-[var(--color-primary)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[var(--color-primary)] bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 tbg-[var(--color-primary)] text-[var(--gray-color)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--fourground-color)] mb-1">
                      Call Us
                    </h4>
                    <p className="text-[var(--color-primary)] font-medium">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className=" rounded-2xl p-6 border border-[var(--dashboard-border)] shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-[var(--color-primary)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[var(--color-primary)] bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 bg-[var(--color-primary)] text-[var(--gray-color)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--fourground-color)] mb-1">
                      Office Hours
                    </h4>
                    <p className="text-[var(--color-primary)] font-medium">
                      Mon - Fri: 9AM - 6PM
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className=" rounded-2xl p-6 border border-[var(--dashboard-border)] shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-[var(--color-primary)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[var(--color-primary)] bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 bg-[var(--color-primary)] text-[var(--gray-color)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--fourground-color)] mb-1">
                      Our Location
                    </h4>
                    <p className="text-[var(--color-primary)] font-medium">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className=" rounded-2xl shadow-xl border border-[var(--dashboard-border)] overflow-hidden"
            >
              <div className="p-6 border-b border-[var(--dashboard-border)]">
                <h3 className="text-xl font-bold text-[var(--color-primary)] flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  Visit Our Office
                </h3>
              </div>
              <div className="h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442311092!2d90.41252131543096!3d23.810331384584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b0c7c5c5f1%3A0x1a5a1c1c1a1b1b1b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CareHive Office Location"
                  className="rounded-b-2xl"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;