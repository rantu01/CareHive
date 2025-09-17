"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import SocialLogin from "@/app/Component/Auth/SocialLogin";
import { AuthContext } from "@/app/context/authContext";

const Page = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { createUser } = useContext(AuthContext);
  const router = useRouter();

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

    if (hasError) return; // stop submission if validation fails

    try {
      await createUser(email, password); 

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Welcome to CareHive!",
        confirmButtonText: "Continue",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Back to Home */}
        <div className="mb-4">
          <Link
            href="/"
            className="text-sm text-black hover:text-[var(--dashboard-blue)] flex items-center gap-1"
          >
            <span className="text-lg">←</span> Back to Home
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <Link
              href="/"
              className="flex items-center space-x-2 justify-center"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--dashboard-blue)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Create Account
            </h2>
            <p className="text-sm text-gray-500">
              Fill in your details to get started
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black">Full Name *</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full focus:border-[var(--dashboard-blue)] focus:ring focus:ring-[var(--dashboard-blue)]"
              />
              {nameError && (
                <span className="text-red-500 text-sm mt-1">{nameError}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-black">Email Address *</span>
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full focus:border-[var(--dashboard-blue)] focus:ring focus:ring-[var(--dashboard-blue)]"
              />
              {emailError && (
                <span className="text-red-500 text-sm mt-1">{emailError}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control w-full relative">
              <label className="label">
                <span className="label-text text-black">Password *</span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-12 focus:border-[var(--dashboard-blue)] focus:ring focus:ring-[var(--dashboard-blue)]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>

              {passwordError && (
                <span className="text-red-500 text-sm mt-1">{passwordError}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full cursor-pointer p-2 rounded-2xl bg-[var(--dashboard-blue)] text-white hover:bg-blue-600 transition-colors mt-5"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <hr className="flex-1 border-gray-200" />
              OR CONTINUE WITH
              <hr className="flex-1 border-gray-200" />
            </div>
          </form>

          <SocialLogin />

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
