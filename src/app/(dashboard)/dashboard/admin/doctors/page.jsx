"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors-admin-fetch");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Update doctor verification and send notification
  const toggleVerify = async (id, currentStatus, email) => {
    try {
      // 1️⃣ Update the doctor status in DB
      const res = await fetch(`/api/doctors-admin-fetch/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: { isVerified: !currentStatus } }),
      });

      if (!res.ok) throw new Error("Failed to update doctor");

      // 2️⃣ Update UI immediately
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === id
            ? { ...doc, status: { ...doc.status, isVerified: !currentStatus } }
            : doc
        )
      );

      // 3️⃣ Send notification to the doctor
      const notificationTitle = !currentStatus
        ? "Your account has been approved ✅"
        : "Your account access has been revoked ❌";
      const notificationBody = !currentStatus
        ? "You can now access all features as a verified doctor."
        : "You no longer have access to doctor features.";

      const notifRes = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail: email,
          title: notificationTitle,
          body: notificationBody,
        }),
      });

      const notifData = await notifRes.json();

      if (notifData.success) {
        toast.success(
          !currentStatus 
            ? "Doctor approved and notified successfully!" 
            : "Doctor access revoked and notified successfully!"
        );
      } else {
        toast.error("Failed to send notification");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("Something went wrong");
    }
  };

  // Filter doctors based on search and status
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.personalInfo?.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      doctor.personalInfo?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "verified" && doctor.status?.isVerified) ||
      (statusFilter === "pending" && !doctor.status?.isVerified);

    return matchesSearch && matchesStatus;
  });

  // Get stats
  const stats = {
    total: doctors.length,
    verified: doctors.filter(d => d.status?.isVerified).length,
    pending: doctors.filter(d => !d.status?.isVerified).length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-[var(--fourground-color)]">
            Loading doctors...
          </p>
          <p className="text-sm text-[var(--fourground-color)] opacity-70 mt-2">
            Please wait while we fetch doctor profiles
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gray-color)] p-4 sm:p-6 lg:p-8">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] mb-4">
              Doctor Management
            </h1>
            <p className="text-lg text-[var(--fourground-color)] opacity-80 max-w-2xl">
              Manage verification status and access permissions for medical professionals
            </p>
          </div>
          <div className="bg-[var(--dashboard-bg)] px-6 py-4 rounded-2xl shadow-lg border border-[var(--dashboard-border)] text-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--color-primary)]">{stats.total}</div>
                <div className="text-sm text-[var(--fourground-color)] opacity-70">Total</div>
              </div>
              <div className="w-px h-8 bg-[var(--dashboard-border)]"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{stats.verified}</div>
                <div className="text-sm text-[var(--fourground-color)] opacity-70">Verified</div>
              </div>
              <div className="w-px h-8 bg-[var(--dashboard-border)]"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
                <div className="text-sm text-[var(--fourground-color)] opacity-70">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-[var(--fourground-color)] mb-3">
              Search Doctors
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-[var(--color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--sidebar-bg)] text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-[var(--fourground-color)] mb-3">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-4 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--sidebar-bg)] text-[var(--fourground-color)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified Only</option>
              <option value="pending">Pending Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Doctors Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-[var(--dashboard-bg)] rounded-2xl shadow-lg border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
          >
            {/* Status Indicator Bar */}
            <div
              className={`h-2 w-full ${
                doctor.status?.isVerified
                  ? "bg-[var(--color-primary)]"
                  : "bg-amber-400"
              }`}
            ></div>

            <div className="p-6">
              {/* Doctor Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {doctor.personalInfo?.fullName?.charAt(0) || "D"}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--fourground-color)] group-hover:text-[var(--color-primary)] transition-colors">
                      {doctor.personalInfo?.fullName || "Unnamed Doctor"}
                    </h2>
                    <p className="text-[var(--fourground-color)] opacity-70 text-sm mt-1">
                      {doctor.personalInfo?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center mb-6">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
                    doctor.status?.isVerified
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {doctor.status?.isVerified ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Verified
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Pending Review
                    </>
                  )}
                </span>
                <span className="text-xs text-[var(--fourground-color)] opacity-70">
                  ID: {doctor._id?.slice(-6)}
                </span>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-[var(--gray-color)]">
                  <span className="text-sm text-[var(--fourground-color)] opacity-70">
                    Specialty:
                  </span>
                  <span className="text-sm font-medium text-[var(--fourground-color)]">
                    {doctor.specialization || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[var(--gray-color)]">
                  <span className="text-sm text-[var(--fourground-color)] opacity-70">
                    Experience:
                  </span>
                  <span className="text-sm font-medium text-[var(--fourground-color)]">
                    {doctor.experience || "N/A"} years
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group ${
                  doctor.status?.isVerified
                    ? "bg-rose-500 hover:bg-rose-600"
                    : "bg-[var(--color-primary)] hover:bg-emerald-600"
                }`}
                onClick={() =>
                  toggleVerify(
                    doctor._id,
                    doctor.status?.isVerified,
                    doctor.personalInfo?.email
                  )
                }
              >
                {doctor.status?.isVerified ? (
                  <>
                    <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                    Revoke Access
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Approve Doctor
                  </>
                )}
              </button>

              {/* Quick Actions */}
              <div className="flex justify-between mt-4 pt-4 border-t border-[var(--gray-color)]">
                <button className="text-xs text-[var(--color-primary)] font-medium hover:underline transition-colors">
                  View Profile
                </button>
                <button className="text-xs text-[var(--color-secondary)] font-medium hover:underline transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {filteredDoctors.length === 0 && !loading && (
        <div className="text-center py-16 bg-[var(--dashboard-bg)] rounded-2xl shadow-lg border border-[var(--dashboard-border)]">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center text-4xl bg-[var(--color-primary)] text-white shadow-lg">
            👨‍⚕️
          </div>
          <h3 className="text-2xl font-bold text-[var(--fourground-color)] mb-3">
            {searchTerm || statusFilter !== "all" ? "No Matching Doctors Found" : "No Doctors Available"}
          </h3>
          <p className="text-[var(--fourground-color)] opacity-80 max-w-md mx-auto mb-8">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search criteria or filters to find what you're looking for."
              : "There are no doctor profiles available for management at the moment."
            }
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      {filteredDoctors.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--fourground-color)] opacity-70">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </p>
        </div>
      )}
    </div>
  );
}