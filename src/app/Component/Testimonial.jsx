"use client";

import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (data.success) setTestimonials(data.testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to share your testimonial!",
        confirmButtonColor: "var(--color-primary)",
      });
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: "Share Your Experience",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Your Name" />
        <input id="swal-designation" class="swal2-input" placeholder="Your Designation (optional)" />
        <input id="swal-photo" class="swal2-input" placeholder="Photo URL (optional)" />
        <textarea id="swal-quote" class="swal2-textarea" placeholder="Write your testimonial"></textarea>
        <input id="swal-rating" class="swal2-input" type="number" placeholder="Rating (1-5)" min="1" max="5" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value.trim();
        const designation = document.getElementById("swal-designation").value.trim();
        const photo = document.getElementById("swal-photo").value.trim();
        const quote = document.getElementById("swal-quote").value.trim();
        const rating = parseInt(document.getElementById("swal-rating").value);

        if (!quote || rating < 1 || rating > 5) {
          Swal.showValidationMessage("Please provide a testimonial and a valid rating (1–5).");
        }

        return { name, designation, photo, quote, rating };
      },
    });

    if (formValues) {
      try {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formValues,
            email: user.email,
          }),
        });

        const data = await res.json();
        if (data.success) {
          Swal.fire("Thank you!", "Your testimonial has been submitted!", "success");
          setTestimonials((prev) => [data.testimonial, ...prev]);
        } else {
          Swal.fire("Error", data.message || "Failed to post testimonial", "error");
        }
      } catch (error) {
        console.error("Error posting testimonial:", error);
      }
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading)
    return (
      <div className="py-20 text-center text-[var(--text-color-all)]">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
        <p className="mt-4 text-lg">Loading testimonials...</p>
      </div>
    );

  if (testimonials.length === 0)
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold text-[var(--text-color-all)] mb-4">
          No testimonials yet
        </h2>
        <button
          onClick={handleShare}
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--color-secondary)] transition-all duration-300"
        >
          Be the first to share your experience
        </button>
      </section>
    );

  return (
    <section className="py-20 bg-[var(--bg-color-all)] dark:bg-[var(--dashboard-bg)] container mx-auto">
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

          <p className="text-xl text-[var(--text-color-all)] max-w-2xl mx-auto leading-relaxed">
            See the results our clients have achieved
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-white dark:bg-[var(--sidebar-bg)] rounded-3xl shadow-2xl p-8 md:p-12 border border-[var(--dashboard-border)]">
            <div className="text-center">
              {/* Rating Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl leading-relaxed text-[var(--text-color-all)] mb-8 font-light italic">
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
                  <h3 className="font-bold text-xl text-[var(--text-color-all)]">
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-all duration-300 shadow-lg hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-all duration-300 shadow-lg hover:scale-110"
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
                  <h4 className="font-semibold text-[var(--text-color-all)]">
                    {testimonial.name}
                  </h4>
                  <span className="text-xs text-[var(--color-primary)] font-medium">
                    {testimonial.designation}
                  </span>
                </div>
              </div>

              <div className="flex gap-1 mb-3">{renderStars(testimonial.rating)}</div>

              <p className="text-[var(--text-color-all)] text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleShare}
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center gap-3"
          >
            Share Your Experience
            <FaQuoteLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
