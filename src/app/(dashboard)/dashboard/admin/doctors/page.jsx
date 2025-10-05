"use client";
import { useEffect, useState } from "react";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Update doctor verification
  const toggleVerify = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/doctors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "status.isVerified": !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update doctor");

      // Update UI immediately
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === id
            ? { ...doc, status: { ...doc.status, isVerified: !currentStatus } }
            : doc
        )
      );
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-pulse text-[var(--color-calm-blue)] text-lg">
          Loading doctors...
        </div>
      </div>
    );

  return (
    <div className="p-6 bg-[var(--dashboard-bg)] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--fourground-color)] mb-2">
          Doctor Management
        </h1>
        <p className="text-[var(--color-calm-blue)]">
          Manage verification status of medical professionals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-[var(--dashboard-bg)] rounded-2xl shadow-lg border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--fourground-color)] group-hover:text-[var(--color-calm-blue)] transition-colors">
                    {doctor.personalInfo?.fullName || "Unnamed Doctor"}
                  </h2>
                  <p className="text-[var(--color-calm-blue)] text-sm mt-1">
                    {doctor.personalInfo?.email}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    doctor.status?.isVerified
                      ? "bg-[var(--color-light-green)] text-[var(--fourground-color)]"
                      : "bg-[var(--gray-color)] text-[var(--fourground-color)]"
                  }`}
                >
                  {doctor.status?.isVerified ? "✓ Verified" : "⏳ Pending"}
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center py-2 border-t border-[var(--gray-color)]">
                  <span className="text-[var(--fourground-color)] font-medium">
                    Status:
                  </span>
                  <span
                    className={`font-bold ${
                      doctor.status?.isVerified
                        ? "text-[var(--color-light-green)]"
                        : "text-[var(--color-calm-blue)]"
                    }`}
                  >
                    {doctor.status?.isVerified ? "Active" : "Awaiting Review"}
                  </span>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    doctor.status?.isVerified
                      ? "bg-[var(--gray-color)] text-[var(--fourground-color)] hover:bg-[var(--color-calm-blue)] hover:text-[var(--color-white)]"
                      : "bg-[var(--color-calm-blue)] text-[var(--color-white)] hover:bg-[var(--color-light-green)] hover:text-[var(--fourground-color)]"
                  }`}
                  onClick={() =>
                    toggleVerify(doctor._id, doctor.status?.isVerified)
                  }
                >
                  {doctor.status?.isVerified ? "Revoke Access" : "Approve Doctor"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-[var(--color-calm-blue)] text-6xl mb-4">👨‍⚕️</div>
          <h3 className="text-xl font-semibold text-[var(--fourground-color)] mb-2">
            No Doctors Found
          </h3>
          <p className="text-[var(--color-calm-blue)]">
            No doctor profiles available for management.
          </p>
        </div>
      )}
    </div>
  );
}
