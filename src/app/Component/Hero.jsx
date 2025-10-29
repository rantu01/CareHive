"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of background images that will rotate
  const backgroundImages = [
    "https://i.ibb.co/WWFcMMpN/image.png",
    "https://i.ibb.co/7x0r29bf/front-view-young-female-with-carpet-exercises-blue-wall.webp",
    "https://i.ibb.co.com/vCp5hTY8/image.png",
    "https://i.ibb.co.com/3Y8ZvV85/image.png",
  ];

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

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 pb-12 overflow-hidden"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Healthcare background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)]/80 to-[var(--color-primary)]/70 mix-blend-multiply"></div>
          </div>
        ))}
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/40 via-transparent to-[var(--color-primary)]/30 z-0 animate-pulse-slow"></div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-2 relative z-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg"
            style={{ fontFamily: "var(--font-alt)" }} // Eye-catching font
          >
            Your Journey to{" "}
            <span className="text-transparent bg-clip-text animate-gradient-animated font-bold">
              Better Health
            </span>{" "}
            Starts Here
          </h1>

          <style jsx>{`
            /* Animate gradient for color-changing effect */
            @keyframes gradientShift {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            .animate-gradient-animated {
              background-image: linear-gradient(
                90deg,
                #3ddddd,
                #19b4b4,
                #ff6b6b,
                #f9c74f,
                #3ddddd
              );
              background-size: 300% 300%;
              animation: gradientShift 5s ease infinite;
            }
          `}</style>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light backdrop-blur-sm bg-white/10 p-4 rounded-2xl">
            Connect with healthcare professionals, track your wellness, and
            transform your life with CareHive.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start w-full">
            <button
              className="group w-full sm:w-auto bg-white text-[var(--color-primary)] hover:bg-gray-50 font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap relative overflow-hidden"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              <span className="relative z-10">
                <Link href="/doctors">Book an Appointment</Link>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            <button
              className="group w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary)] font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap relative overflow-hidden"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              <span className="relative z-10"><Link href="/fitness">Explore Wellness Programs</Link></span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center md:justify-start mt-12 gap-8">
            <div className="text-center backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {doctorCount}+
              </div>
              <div className="text-white/90 text-sm font-medium tracking-wide">
                Verified Doctors
              </div>
            </div>
            <div className="text-center backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {userCount}+
              </div>
              <div className="text-white/90 text-sm font-medium tracking-wide">
                Happy Patients
              </div>
            </div>
            <div className="text-center backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                24/7
              </div>
              <div className="text-white/90 text-sm font-medium tracking-wide">
                Health Support
              </div>
            </div>
          </div>
        </div>

        {/* Image Content - Now showing current background image preview */}
        <div className="md:w-1/2 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white/20 backdrop-blur-sm">
            <img
              src={backgroundImages[currentImageIndex]}
              alt="Healthcare background"
              className="w-full h-80 md:h-96 object-cover rounded-3xl"
            />

            {/* Image navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {backgroundImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Overlay card */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-2xl max-w-xs border border-white/20 animate-float">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-3 rounded-full mr-4 shadow-lg">
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
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
          <svg
            className="w-6 h-6 text-white"
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
      </div>
    </section>
  );
};

export default Hero;
