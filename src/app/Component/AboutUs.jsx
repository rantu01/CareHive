"use client";
import React from "react";
import { motion } from "framer-motion";
import { Apple, Sparkles } from "lucide-react";
import { FaUserMd, FaClock, FaHeartbeat, FaLaptopMedical } from "react-icons/fa";

const experts = [
  {
    name: "Dr. Sophia Patel",
    specialty: "Orthopedic Surgeon",
    image: "https://i.ibb.co/dBj3xGn/doctor1.jpg",
  },
  {
    name: "Dr. James Anderson",
    specialty: "Cardiologist",
    image: "https://i.ibb.co/TP2BwdG/doctor2.jpg",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "https://i.ibb.co/nrSrCG2/doctor3.jpg",
  },
];

const features = [
  { icon: <FaUserMd />, title: "Certified Doctors" },
  { icon: <FaClock />, title: "24/7 Medical Support" },
  { icon: <FaHeartbeat />, title: "Patient-Centered Care" },
  { icon: <FaLaptopMedical />, title: "Advanced Technology" },
];

const AboutUs = () => {
  return (
    <section className="bg-gray-50 text-[var(--fourground-color)] font-sans">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Styled Section Title */}
          <div className="relative z-10 text-left mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
              <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
                About Our Mission
              </span>
              <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)] flex items-center gap-3">
              <Apple className="w-8 h-8" />
              Dedicated to Your Health & Wellness
              <Sparkles className="w-8 h-8" />
            </h1>

            <p className="text-lg opacity-80 max-w-xl">
              Your health is our top priority. We provide compassionate, modern,
              and personalized care tailored to your unique needs — ensuring
              your well-being every step of the way.
            </p>
          </div>
        </motion.div>

        <motion.img
          src="https://i.ibb.co/S6T6xkm/family-care.jpg"
          alt="Health care"
          className="rounded-3xl shadow-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        />
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-6 py-16">
       <h3 className="text-3xl font-bold text-center mb-10 text-[var(--color-primary)]">
  Why Choose <span className="text-[var(--color-primary)]">Us</span>?
</h3>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-[var(--color-primary)] text-4xl mb-4">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-lg text-[var(--color-primary)]">
                {feature.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Meet Experts */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10 text-[var(--color-primary)]">
            Meet Our{" "}
            <span className="text-[var(--color-primary)]">Dedicated Experts</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {experts.map((doc, index) => (
              <motion.div
                key={index}
                className="rounded-3xl bg-gray-50 shadow-md overflow-hidden hover:shadow-xl transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="font-semibold text-xl text-[var(--color-primary)]">
                    {doc.name}
                  </h4>
                  <p className="opacity-80">{doc.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="text-center bg-[var(--color-primary)] py-16 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold mb-4">
          Get Expert Medical Care at Your Fingertips!
        </h3>
        <p className="mb-6 text-lg opacity-90">
          Book appointments, consult online, and access top healthcare services —
          anytime, anywhere.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-[var(--color-primary)] font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
            Book Appointment
          </button>
          <button className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[var(--color-primary)] transition">
            Contact Us
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
