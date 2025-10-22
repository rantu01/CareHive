"use client";

import { useUser } from "@/app/context/UserContext";
import { useState, useEffect } from "react";

export default function AddDonorPage() {
  const { user, role, loading: userLoading } = useUser();
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

  // ✅ Prefill email when user data is available
  useEffect(() => {
    if (user && user.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const endpoint =
        formData.type === "blood"
          ? "/api/blood-donation"
          : "/api/organ-donation";

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
            notes: "User-entered record",
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

      setMessage("✅ Donor registration successful! Thank you for your generosity.");
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Navigation between steps
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // ✅ Loading state for user
  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color-all)]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[var(--color-primary)]"></span>
          <p className="mt-4 text-[var(--text-color-all)]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color-all)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">❤️</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-[var(--color-secondary)] font-heading">
            Become a Lifesaver
          </h1>
          <p className="text-lg text-[var(--text-color-all)] max-w-2xl mx-auto">
            Join our community of donors and make a difference in someone's life
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] mb-8">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-2 transition-all duration-300 ${
                  step === currentStep
                    ? "bg-[var(--color-primary)] text-white shadow-lg scale-110"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-[var(--bg-color-all)] text-[var(--text-color-all)] border-2 border-[var(--dashboard-border)]"
                }`}>
                  {step < currentStep ? "✓" : step}
                </div>
                <span className={`text-sm font-medium ${
                  step === currentStep ? "text-[var(--color-primary)]" : "text-[var(--text-color-all)]"
                }`}>
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Donation Type"}
                  {step === 3 && "Final Details"}
                </span>
              </div>
            ))}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[var(--bg-color-all)] -translate-y-1/2 -z-10 mx-8">
              <div 
                className="h-full bg-[var(--color-primary)] transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl shadow-xl border border-[var(--dashboard-border)] overflow-hidden">
          <div className="p-8">
            {message && (
              <div className="alert alert-success mb-6 bg-green-50 border-green-200 text-green-800">
                <span>🎉 {message}</span>
              </div>
            )}
            {error && (
              <div className="alert alert-error mb-6 bg-red-50 border-red-200 text-red-800">
                <span>❌ {error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 font-heading">
                    Personal Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label font-semibold text-[var(--text-color-all)] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input input-bordered w-full bg-white border-[var(--dashboard-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20"
                        placeholder="Dr. Nayeem Khan"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label font-semibold text-[var(--text-color-all)] mb-2">
                        Contact Number *
                      </label>
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="input input-bordered w-full bg-white border-[var(--dashboard-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20"
                        placeholder="+8801XXXXXXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold text-[var(--text-color-all)] mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-white border-[var(--dashboard-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20"
                      placeholder="Dhaka, Chattogram, etc."
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold text-[var(--text-color-all)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="input input-bordered w-full bg-[var(--bg-color-all)] border-[var(--dashboard-border)] cursor-not-allowed"
                    />
                    <label className="label">
                      <span className="label-text-alt text-[var(--text-color-all)] opacity-70">
                        Your registered email (cannot be changed)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Donation Type */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 font-heading">
                    Donation Type
                  </h2>

                  <div className="form-control">
                    <label className="label font-semibold text-[var(--text-color-all)] mb-4">
                      I want to donate:
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 ${
                        formData.type === "blood" 
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 shadow-md" 
                          : "border-[var(--dashboard-border)] hover:border-[var(--color-primary)] hover:border-opacity-50"
                      }`}>
                        <input
                          type="radio"
                          name="type"
                          value="blood"
                          checked={formData.type === "blood"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-red-600">🩸</span>
                          </div>
                          <div>
                            <div className="font-semibold text-[var(--text-color-all)]">Blood Donation</div>
                            <div className="text-sm text-[var(--text-color-all)] opacity-70">Save lives with blood</div>
                          </div>
                        </div>
                      </label>

                      <label className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 ${
                        formData.type === "organ" 
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 shadow-md" 
                          : "border-[var(--dashboard-border)] hover:border-[var(--color-primary)] hover:border-opacity-50"
                      }`}>
                        <input
                          type="radio"
                          name="type"
                          value="organ"
                          checked={formData.type === "organ"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-green-600">💚</span>
                          </div>
                          <div>
                            <div className="font-semibold text-[var(--text-color-all)]">Organ Donation</div>
                            <div className="text-sm text-[var(--text-color-all)] opacity-70">Give the gift of life</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Conditional Fields */}
                  {formData.type === "blood" && (
                    <div className="form-control">
                      <label className="label font-semibold text-[var(--text-color-all)] mb-2">
                        Blood Group *
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="select select-bordered w-full bg-white border-[var(--dashboard-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20"
                        required
                      >
                        <option value="">Select your blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  )}

                  {formData.type === "organ" && (
                    <div className="form-control">
                      <label className="label font-semibold text-[var(--text-color-all)] mb-2">
                        Organs to Donate *
                      </label>
                      <input
                        type="text"
                        name="organs"
                        value={formData.organs}
                        onChange={handleChange}
                        className="input input-bordered w-full bg-white border-[var(--dashboard-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20"
                        placeholder="Kidney, Liver, Heart (comma separated)"
                        required
                      />
                      <label className="label">
                        <span className="label-text-alt text-[var(--text-color-all)] opacity-70">
                          Separate multiple organs with commas
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Additional Details */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 font-heading">
                    Additional Information
                  </h2>

                  <div className="form-control">
                    <label className="label font-semibold text-[var(--text-color-all)] mb-2">
                      Previous Donation History (Optional)
                    </label>
                    <input
                      type="text"
                      name="donationHistory"
                      value={formData.donationHistory}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-white border-[var(--dashboard-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20"
                      placeholder="e.g., Dhaka Medical College Hospital"
                    />
                    <label className="label">
                      <span className="label-text-alt text-[var(--text-color-all)] opacity-70">
                        Let us know about your previous donation experiences
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer flex items-start gap-3 p-4 border-2 border-[var(--dashboard-border)] rounded-xl hover:border-[var(--color-primary)] hover:border-opacity-50 transition-all duration-300">
                      <input
                        type="checkbox"
                        name="verified"
                        checked={formData.verified}
                        onChange={handleChange}
                        className="checkbox checkbox-success mt-1"
                      />
                      <div>
                        <div className="font-semibold text-[var(--text-color-all)]">Verified Donor</div>
                        <div className="text-sm text-[var(--text-color-all)] opacity-70 mt-1">
                          Check this if you have been previously verified as a donor by a medical institution
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[var(--bg-color-all)] rounded-xl p-4 border border-[var(--dashboard-border)]">
                    <h3 className="font-semibold text-[var(--text-color-all)] mb-3">Registration Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-color-all)] opacity-70">Name:</span>
                        <span className="font-medium text-[var(--text-color-all)]">{formData.fullName || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-color-all)] opacity-70">Donation Type:</span>
                        <span className="font-medium text-[var(--text-color-all)] capitalize">{formData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-color-all)] opacity-70">Location:</span>
                        <span className="font-medium text-[var(--text-color-all)]">{formData.location || "Not provided"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[var(--dashboard-border)]">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`btn btn-outline border-[var(--dashboard-border)] text-[var(--text-color-all)] hover:bg-[var(--bg-color-all)] ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                >
                  ← Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn bg-[var(--color-primary)] text-white border-none hover:bg-[var(--color-secondary)] ml-auto"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`btn bg-[var(--color-primary)] text-white border-none hover:bg-[var(--color-secondary)] ml-auto min-w-32 ${
                      loading ? "loading" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-[var(--text-color-all)] opacity-70">
          <p>Your information is secure and will only be used for matching with recipients in need.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}