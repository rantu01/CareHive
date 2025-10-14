"use client";

import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

// Testimonials Data
const testimonials = [
  {
    name: "Rahim Hasan",
    designation: "CEO, HealthPlus",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "আমাদের সাথে কাজ করে অসাধারণ ফল পেয়েছি!",
  },
  {
    name: "Selina Akter",
    designation: "Wellness Coach",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "সেবা সত্যিই চমৎকার, জীবন অনেক সহজ হয়ে গেছে।",
  },
  {
    name: "Arif Chowdhury",
    designation: "Fitness Trainer",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    quote: "পরামর্শগুলো খুবই কার্যকর এবং ফলপ্রসূ।",
  },
  {
    name: "Nadia Karim",
    designation: "Nutritionist",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "পরামর্শগুলো বাস্তবায়ন করলে সত্যিই ফল পাওয়া যায়।",
  },
  {
    name: "Imran Ali",
    designation: "Health Consultant",
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
    quote: "প্রফেশনাল সার্ভিস, খুবই সন্তুষ্ট।",
  },
  {
    name: "Farzana Akter",
    designation: "Yoga Instructor",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "আমার জীবনধারার উন্নতি হয়েছে এই সার্ভিসের মাধ্যমে।",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 bg-[var(--gray-color)] dark:bg-[var(--dashboard-bg)]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--fourground-color)]">
          What Our Clients Say
        </h2>
        <p className="mb-12 text-gray-900 dark:text-gray-300">
          আমাদের ক্লায়েন্টরা কেমন ফল পেয়েছেন তা দেখুন।
        </p>

        {/* Grid: 2 rows × 3 columns desktop, responsive 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="relative p-8 bg-white dark:bg-[var(--sidebar-bg)] rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 border-4 border-transparent
                bg-gradient-to-br from-[var(--dashboard-blue)] to-[var(--color-calm-blue)] p-[2px]"
            >
              <div className="bg-white dark:bg-[var(--sidebar-bg)] rounded-2xl p-6 h-full flex flex-col items-center text-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                </div>
                <div className="text-[var(--color-calm-blue)] text-4xl mb-4">
                  <FaQuoteLeft />
                </div>
                <p className="text-[var(--fourground-color)] italic text-lg mb-4 leading-relaxed">
                  {t.quote}
                </p>
                <h3 className="font-semibold text-[var(--fourground-color)] text-xl mb-1">
                  {t.name}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t.designation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
