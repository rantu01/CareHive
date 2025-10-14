"use client";

import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahim Hasan",
    designation: "CEO, HealthPlus",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Working with them has delivered amazing results!",
  },
  {
    name: "Selina Akter",
    designation: "Wellness Coach",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The service is excellent, life has become much easier.",
  },
  {
    name: "Arif Chowdhury",
    designation: "Fitness Trainer",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    quote: "Their advice is very effective and productive.",
  },
  {
    name: "Nadia Karim",
    designation: "Nutritionist",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "Following their guidance really brings results.",
  },
  {
    name: "Imran Ali",
    designation: "Health Consultant",
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
    quote: "Professional service, extremely satisfied.",
  },
  {
    name: "Farzana Akter",
    designation: "Yoga Instructor",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "This service improved my lifestyle significantly.",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 bg-[var(--gray-color)] dark:bg-[var(--dashboard-bg)]">
      <div className="container mx-auto px-4 text-center">
 <h2
  className="text-3xl md:text-4xl font-[var(--font-heading)] font-extrabold mb-6 flex items-center justify-center relative whitespace-nowrap"
  style={{ gap: "6px" }}
>
  {/* Left vertical border */}
  <span
    className="inline-block w-[4px] h-10 rounded-full"
    style={{ backgroundColor: "var(--color-primary)" }}
  />
  {/* Emoji */}
  <span style={{ marginLeft: "6px", marginRight: "4px" }}>💬</span>
  {/* Text with split colors */}
  <span>
    <span style={{ color: "var(--fourground-color)" }}>What Our Clients </span>
    <span style={{ color: "var(--color-primary)" }}>Say</span>
  </span>
</h2>


        <p className="mb-12 text-[var(--fourground-color)]">
          See how our clients benefited from our services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="relative rounded-3xl bg-[var(--sidebar-bg)] p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 filter border-2"
              style={{
                borderColor: "var(--color-primary)",
                backdropFilter: "saturate(180%) blur(10px)",
              }}
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-24 h-24 rounded-full border-2 border-[var(--dashboard-bg)] shadow-md mb-4"
              />
              <div className="text-[var(--color-primary)] text-4xl mb-4">
                <FaQuoteLeft />
              </div>
              <p className="text-[var(--fourground-color)] italic text-lg mb-4 leading-relaxed">
                {t.quote}
              </p>
              <h3 className="font-semibold text-[var(--fourground-color)] text-xl mb-1">
                {t.name}
              </h3>
              <span className="text-sm text-[var(--color-calm-blue)] uppercase tracking-wide">
                {t.designation}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
