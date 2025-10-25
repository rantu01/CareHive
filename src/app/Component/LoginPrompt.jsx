"use client";
import React from "react";
import Link from "next/link";

export default function LoginPrompt() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color-all)] text-center px-6">
      <div className="max-w-md w-full border border-[var(--color-primary)] rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">
          Please Log In
        </h1>
        <p className="text-[var(--text-color-all)] mb-6 opacity-80">
          You need to be logged in to access this page.
        </p>
        <Link
          href="/login"
          className="btn bg-[var(--color-primary)] text-white border-none w-full py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Go to Login
        </Link>

        <p className="mt-4 text-[var(--text-color-all)] text-sm">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
