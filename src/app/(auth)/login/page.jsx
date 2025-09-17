"use client"; 
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useRouter } from "next/navigation"; // Next.js router
// import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import { AuthContext } from "@/app/context/authContext";
import SocialLogin from "@/app/Component/Auth/SocialLogin";


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signInUser } = useContext(AuthContext);
  const router = useRouter(); // Next.js navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    try {
      await signInUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonText: "Continue",
      }).then(() => router.push("/")); // navigate in Next.js
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found" || errorCode === "auth/invalid-email") {
        setEmailError("Email doesn't match any account.");
      } else if (errorCode === "auth/invalid-credential") {
        setPasswordError("Password doesn't match.");
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <a href="/" className="text-sm text-black hover:text-[var(--dashboard-blue)] flex items-center gap-1">
            <span className="text-lg">←</span> Back to Home
          </a>
        </div>

        <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 justify-center">
            <div className="flex items-center">
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

            </div>
          </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Join CareHive</h2>
            <p className="text-sm text-gray-500">Sign in to access your dashboard</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin} >
            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email Address *</span>
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />
              {emailError && <span className="text-red-500 text-sm mt-1">{emailError}</span>}
            </div>

            {/* Password */}
            <div className="form-control w-full relative">
              <label className="label">
                <span className="label-text">Password *</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {passwordError && <span className="text-red-500 text-sm mt-1">{passwordError}</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn bg-[var(--dashboard-blue)] w-full cursor-pointer p-2 rounded-2xl">
              Sign In
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
            Don't have an account?{" "}
            <a href="/signup" className="text-primary underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
