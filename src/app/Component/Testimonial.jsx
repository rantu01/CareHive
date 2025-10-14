"use client";

import React, { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Hasan",
    designation: "CEO, HealthPlus",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "We've achieved outstanding results working with you!",
    rating: 5,
  },
  {
    name: "Selina Akter",
    designation: "Wellness Coach",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The service is truly excellent, life has become much easier.",
    rating: 5,
  },
  {
    name: "Arif Chowdhury",
    designation: "Fitness Trainer",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    quote: "The advice is very effective and fruitful.",
    rating: 4,
  },
  {
    name: "Nadia Karim",
    designation: "Nutritionist",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "Implementing the suggestions truly yields results.",
    rating: 5,
  },
  {
    name: "Imran Ali",
    designation: "Health Consultant",
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
    quote: "Professional service, very satisfied.",
    rating: 4,
  },
  {
    name: "Farzana Akter",
    designation: "Yoga Instructor",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "My lifestyle has improved through this service.",
    rating: 5,
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-[var(--gray-color)] dark:bg-[var(--dashboard-bg)] container mx-auto">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
            <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)] font-heading">
            What Our Clients Say
          </h2>

          <p className="text-xl text-[var(--fourground-color)] max-w-2xl mx-auto leading-relaxed">
            See the results our clients have achieved
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-white dark:bg-[var(--sidebar-bg)] rounded-3xl shadow-2xl p-8 md:p-12 border border-[var(--dashboard-border)]">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-white text-xl" />
              </div>
              <p className="text-[var(--fourground-color)] italic text-lg mb-4 leading-relaxed">
                {testimonials[currentIndex].quote}
              </p>
              <h3 className="font-semibold text-[var(--fourground-color)] text-xl mb-1">
                {testimonials[currentIndex].name}
              </h3>
              <span className="text-sm text-[var(--color-calm-blue)] uppercase tracking-wide">
                {testimonials[currentIndex].designation}
              </span>
            </div>

            <div className="text-center">
              {/* Rating Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl leading-relaxed text-[var(--fourground-color)] mb-8 font-light italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentIndex].photo}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full border-4 border-[var(--color-primary)] shadow-lg"
                />
                <div className="text-left">
                  <h3 className="font-bold text-xl text-[var(--fourground-color)]">
                    {testimonials[currentIndex].name}
                  </h3>
                  <span className="text-sm text-[var(--color-primary)] font-medium uppercase tracking-wide">
                    {testimonials[currentIndex].designation}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-calm-blue)] transition-all duration-300 shadow-lg hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-calm-blue)] transition-all duration-300 shadow-lg hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-[var(--sidebar-bg)] rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                index === currentIndex
                  ? "border-[var(--color-primary)] shadow-lg scale-105"
                  : "border-[var(--dashboard-border)] hover:border-[var(--color-primary)]"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)]"
                />
                <div>
                  <h4 className="font-semibold text-[var(--fourground-color)]">
                    {testimonial.name}
                  </h4>
                  <span className="text-xs text-[var(--color-primary)] font-medium">
                    {testimonial.designation}
                  </span>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-[var(--fourground-color)] text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[var(--color-calm-blue)] transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center gap-3">
            Share Your Experience
            <FaQuoteLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
