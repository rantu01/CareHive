"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch doctors
        const resDoctors = await fetch("/api/doctors");
        const doctors = await resDoctors.json();
        setDoctorCount(doctors.length);

        // Fetch users (patients)
        const resUsers = await fetch("/api/users");
        const users = await resUsers.json();

        // Optionally, filter only patients if you store roles
        const patients = users.filter((u) => u.role === "user");
        setUserCount(patients.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);
  return (
    <section
      className="relative bg-gradient-to-b from-[var(--color-calm-blue)] to-[var(--color-primary)] min-h-screen flex items-center pt-16 pb-12"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-2">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-10">
          <h1
            className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your Journey to Better Health{" "}
            <span className="text-[var(--color-primary)]">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light">
            Connect with healthcare professionals, track your wellness, and
            transform your life with CareHive.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start w-full">
            <button
              className="w-full sm:w-auto bg-white text-[var(--color-calm-blue)] hover:bg-gray-50 font-semibold py-2 px-6 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              <Link href="/doctors">Book an Appointment</Link>
            </button>
            <button
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-calm-blue)] font-semibold py-2 px-6 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Explore Wellness Programs
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center md:justify-start mt-12 gap-8">
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {doctorCount}+
              </div>
              <div className="text-white/80 text-sm font-medium tracking-wide">
                Verified Doctors
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {userCount}+
              </div>
              <div className="text-white/80 text-sm font-medium tracking-wide">
                Happy Patients
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                24/7
              </div>
              <div className="text-white/80 text-sm font-medium tracking-wide">
                Health Support
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <img
              src="https://i.ibb.co/7x0r29bf/front-view-young-female-with-carpet-exercises-blue-wall.webp"
              alt="Woman practicing wellness exercises"
              className="w-full h-auto object-cover rounded-3xl"
            />
            {/* Overlay card */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl max-w-xs border border-white/20">
              <div className="flex items-center">
                <div className="bg-[var(--color-primary)] p-3 rounded-full mr-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-bold text-gray-900 text-lg"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    Wellness Program
                  </h3>
                  <p
                    className="text-sm text-gray-600 font-medium"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    Personalized for you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
