"use client";

import { useUser } from "@/app/context/UserContext";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddDonorPage() {
  const { user, loading: userLoading } = useUser();

  const [formData, setFormData] = useState({
    type: "blood",
    fullName: "",
    email: "",
    contactNumber: "",
    location: "",
    bloodGroup: "",
    organs: "",
    verified: false,
    donationHistory: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Prefill email when user data available
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== 3) return;

    const confirmColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim();
    const bgColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--bg-color-all")
      .trim();
    const textColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--text-color-all")
      .trim();

    const result = await Swal.fire({
      title: "Confirm Submission?",
      text: "Please confirm to complete your donor registration.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
      background: bgColor,
      color: textColor,
      confirmButtonColor: confirmColor,
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const endpoint =
        formData.type === "blood" ? "/api/blood-donation" : "/api/organ-donation";

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        location: formData.location,
        verified: formData.verified,
        createdAt: new Date(),
      };

      if (formData.type === "blood") {
        payload.bloodGroup = formData.bloodGroup;
      } else {
        payload.organs = formData.organs
          .split(",")
          .map((o) => o.trim())
          .filter((o) => o);
      }

      if (formData.donationHistory) {
        payload.donationHistory = [
          {
            date: new Date().toISOString().split("T")[0],
            hospital: formData.donationHistory,
            recipient: "N/A",
            notes: "User entered record",
          },
        ];
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add donor");

      await Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Thank you for your generosity!",
        background: bgColor,
        color: textColor,
        confirmButtonColor: confirmColor,
      });

      setMessage("✅ Donor registration successful!");
      setFormData({
        type: "blood",
        fullName: "",
        email: user?.email || "",
        contactNumber: "",
        location: "",
        bloodGroup: "",
        organs: "",
        verified: false,
        donationHistory: "",
      });
      setCurrentStep(1);
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Submission Failed ❌",
        text: err.message,
        background: bgColor,
        color: textColor,
        confirmButtonColor: confirmColor,
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => currentStep < 3 && setCurrentStep((s) => s + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep((s) => s - 1);

  if (userLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color-all)]">
        <span className="loading loading-spinner text-[var(--color-primary)]"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--bg-color-all)] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[var(--bg-color-all)] rounded-2xl shadow-xl p-8 border border-[var(--color-primary)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-secondary)] font-heading mb-3">
            Become a Lifesaver
          </h1>
          <p className="text-[var(--text-color-all)] opacity-80">
            Join our donor registry and help save lives.
          </p>
        </div>

        {/* Steps */}
        <div className="flex justify-between mb-10">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-[var(--bg-color-all)] ${
                  step === currentStep
                    ? "bg-[var(--color-primary)] scale-110"
                    : step < currentStep
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {step < currentStep ? "✓" : step}
              </div>
              <p
                className={`mt-2 text-sm ${
                  step === currentStep
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--text-color-all)] opacity-70"
                }`}
              >
                {step === 1 && "Basic Info"}
                {step === 2 && "Donation Type"}
                {step === 3 && "Final Details"}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="text-2xl text-[var(--color-secondary)] font-semibold">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="input input-bordered bg-[var(--bg-color-all)] text-[var(--text-color-all)] border border-[var(--color-primary)]"
                />
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="input input-bordered bg-[var(--bg-color-all)] text-[var(--text-color-all)] border border-[var(--color-primary)]"
                />
              </div>

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="input input-bordered w-full bg-[var(--bg-color-all)] text-[var(--text-color-all)] border border-[var(--color-primary)]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="input input-bordered w-full bg-[var(--bg-color-all)] text-[var(--text-color-all)] opacity-70"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl text-[var(--color-secondary)] font-semibold">
                Donation Type
              </h2>
              <div className="flex gap-4">
                <label
                  className={`flex-1 border-2 p-4 rounded-xl cursor-pointer ${
                    formData.type === "blood"
                      ? "border-[var(--color-primary)] bg-[var(--bg-color-all)]"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="blood"
                    checked={formData.type === "blood"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <p className="text-[var(--text-color-all)] font-medium">🩸 Blood Donation</p>
                </label>

                <label
                  className={`flex-1 border-2 p-4 rounded-xl cursor-pointer ${
                    formData.type === "organ"
                      ? "border-[var(--color-primary)] bg-[var(--bg-color-all)]"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="organ"
                    checked={formData.type === "organ"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <p className="text-[var(--text-color-all)] font-medium">💚 Organ Donation</p>
                </label>
              </div>

              {formData.type === "blood" && (
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full border border-[var(--color-primary)] bg-[var(--bg-color-all)] text-[var(--text-color-all)]"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              )}

              {formData.type === "organ" && (
                <input
                  type="text"
                  name="organs"
                  placeholder="Organs to Donate (e.g., Kidney, Liver)"
                  value={formData.organs}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full bg-[var(--bg-color-all)] text-[var(--text-color-all)] border border-[var(--color-primary)]"
                />
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl text-[var(--color-secondary)] font-semibold">
                Additional Information
              </h2>
              <input
                type="text"
                name="donationHistory"
                placeholder="Hospital name (if any)"
                value={formData.donationHistory}
                onChange={handleChange}
                className="input input-bordered w-full bg-[var(--bg-color-all)] text-[var(--text-color-all)] border border-[var(--color-primary)]"
              />
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                  className="checkbox checkbox-success"
                />
                <span className="text-[var(--text-color-all)]">Verified Donor</span>
              </label>
            </div>
          )}
        </form>

        {/* Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-300">
          <button
            type="button"
            onClick={prevStep}
            className={`btn border border-[var(--color-primary)] text-[var(--color-primary)] ${
              currentStep === 1 ? "invisible" : ""
            }`}
          >
            ← Previous
          </button>
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn bg-[var(--color-primary)] text-[var(--bg-color-all)] border-none"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`btn bg-[var(--color-primary)] text-[var(--bg-color-all)] border-none ${
                loading ? "loading" : ""
              }`}
            >
              {loading ? "Submitting..." : "Complete Registration"}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
