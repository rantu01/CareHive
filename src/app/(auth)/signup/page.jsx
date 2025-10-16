"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import SocialLogin from "@/app/Component/Auth/SocialLogin";
import UseAuth from "@/app/Hooks/UseAuth";

const Page = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { createUser, updateUser, setUser } = UseAuth();
  const router = useRouter();

  // Background images that will rotate
  const backgroundImages = [
    "https://i.ibb.co.com/WWFcMMpN/image.png",
    "https://i.ibb.co.com/zVPrWsqN/image.png",
    "https://i.ibb.co.com/3Y8ZvV85/image.png"
  ];

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;
    if (!name) {
      setNameError("Name is required");
      hasError = true;
    }
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    try {
      const result = await createUser(email, password);
      const user = result?.user;

      updateUser(name)
        .then(() => {
          setUser({ ...user, displayName: name });
        })
        .catch((error) => {
          setUser(user);
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: error.message,
          });
        });

      if (user?.email) {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email: user.email,
            role: "user",
          }),
        });
      }

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Welcome to CareHive!",
        confirmButtonText: "Continue",
        customClass: {
          confirmButton:
            "bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-blue-600",
        },
        buttonsStyling: false,
      }).then(() => router.push("/"));
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        setEmailError("Email is already in use");
      } else if (errorCode === "auth/invalid-email") {
        setEmailError("Invalid email address");
      } else if (errorCode === "auth/weak-password") {
        setPasswordError("Password must be at least 6 characters");
      }

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form (20% width) */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 lg:px-12 py-8">
        {/* Back to Home */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>

        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--color-white)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-xl font-bold font-heading text-[var(--color-black)]">
              CareHive
            </span>
          </div>
        </div>

        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-heading text-[var(--color-black)] mb-2">
            Create Account
          </h2>
          <p className="text-[var(--color-black)] opacity-70">
            Join our community and get started today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-black)]">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border text-[var(--color-black)] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
            />
            {nameError && (
              <span className="text-red-500 text-sm block mt-1">
                {nameError}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-black)]">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border text-[var(--color-black)] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
            />
            {emailError && (
              <span className="text-red-500 text-sm block mt-1">
                {emailError}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-black)]">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border text-[var(--color-black)] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[var(--color-black)] transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <span className="text-red-500 text-sm block mt-1">
                {passwordError}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR CONTINUE WITH</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </form>

        {/* Social Login */}
        <SocialLogin />

        {/* Login Link */}
        <p className="text-center text-sm text-[var(--color-black)] mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Right Side - Background Image (80% width) */}
      <div className="hidden lg:block lg:w-3/5 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
        >
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)]/30 to-[var(--color-primary)]/20"></div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

        {/* Welcome Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h3 className="text-4xl font-bold font-heading mb-4">
            Welcome to CareHive
          </h3>
          <p className="text-xl opacity-90 max-w-md">
            Your journey to better healthcare starts here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
