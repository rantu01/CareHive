"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Helper component for the modal's section title
const ModalSectionTitle = ({ title }) => (
  <h3 className="text-xl font-bold mb-3 border-b pb-2" style={{ color: "var(--color-primary)", borderColor: "var(--dashboard-border)" }}>
    {title}
  </h3>
);

// Helper component for displaying a detail pair
const DetailItem = ({ label, value, isLink = false, linkText }) => (
  <div className="flex justify-between items-start py-2 border-b border-[var(--dashboard-border)] last:border-b-0">
    <span className="text-sm font-medium opacity-80">{label}:</span>
    {isLink ? (
      <a 
        href={value} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-sm font-semibold hover:underline" 
        style={{ color: "var(--color-primary)" }}
      >
        {linkText || "View Document"}
      </a>
    ) : (
      <span className="text-sm font-semibold text-right max-w-xs">{value || 'N/A'}</span>
    )}
  </div>
);

export default function ApprovalRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [consultationTypeFilter, setConsultationTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Get unique specializations for filter
  const specializations = [...new Set(requests
    .map(req => req.educationAndCredentials?.specialization)
    .filter(Boolean)
  )];

  // Get unique consultation types for filter
  const consultationTypes = [...new Set(requests
    .map(req => req.practiceInfo?.consultationType)
    .filter(Boolean)
  )];

  async function fetchRequests() {
    try {
      setLoading(true);
      // NOTE: Using '/api/approved-doctor' might be misleading if it only fetches *unapproved* doctors.
      // Assuming this endpoint fetches all pending applications.
      const res = await fetch("/api/approved-doctor");
      const data = await res.json();
      if (data.ok) {
        // Filter to show only unverified/pending requests if the endpoint returns all doctors
        const pendingRequests = data.data.filter(req => !req.status?.isVerified);
        setRequests(pendingRequests);
        setFilteredRequests(pendingRequests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load approval requests",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "var(--color-primary)",
      });
    } finally {
      setLoading(false);
    }
  }

  // Apply filters and search
  useEffect(() => {
    let result = requests;

    // Apply search
    if (searchTerm) {
      result = result.filter(req =>
        req.personalInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.personalInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.educationAndCredentials?.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.practiceInfo?.consultationType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply specialization filter
    if (specializationFilter !== "all") {
      result = result.filter(req =>
        req.educationAndCredentials?.specialization === specializationFilter
      );
    }

    // Apply consultation type filter
    if (consultationTypeFilter !== "all") {
      result = result.filter(req =>
        req.practiceInfo?.consultationType === consultationTypeFilter
      );
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.status?.submittedAt || 0);
      const dateB = new Date(b.status?.submittedAt || 0);

      switch (sortBy) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "name":
          return (a.personalInfo?.fullName || "").localeCompare(b.personalInfo?.fullName || "");
        default:
          return dateB - dateA;
      }
    });

    setFilteredRequests(result);
  }, [requests, searchTerm, specializationFilter, consultationTypeFilter, sortBy]);

  async function handleApprove(id, email) {
    const result = await Swal.fire({
      title: "Approve Doctor?",
      text: "This will grant full access to the doctor",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      // 1️⃣ Update approval in DB
      const res = await fetch(`/api/approved-doctor/${id}/approve`, {
        method: "POST",
      });
      const data = await res.json();

      // 2️⃣ Send notification
      const notifRes = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail: email,
          title: "Your account has been approved ✅",
          body: "You can now access all features as a verified doctor.",
        }),
      });
      const notifData = await notifRes.json();

      // 3️⃣ Show feedback
      Swal.fire({
        title: data.ok ? "Approved!" : "Error",
        text: data.message || data.error,
        icon: data.ok ? "success" : "error",
        confirmButtonColor: "var(--color-primary)",
      });

      if (!notifData.success)
        console.error("Notification error:", notifData.message);

      fetchRequests();
      setSelectedDoctor(null); // Close modal on action
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "var(--color-primary)",
      });
    }
  }

  async function handleReject(id, email) {
    const { value: remarks } = await Swal.fire({
      title: "Reject Doctor",
      input: "textarea",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Please provide detailed reason for rejection...",
      inputAttributes: {
        rows: 4
      },
      showCancelButton: true,
      confirmButtonText: "Reject Application",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      inputValidator: (value) => {
        if (!value) return "You need to provide a reason!";
        if (value.length < 10) return "Please provide a more detailed reason (min. 10 characters)";
      },
    });

    if (!remarks) return;

    try {
      // 1️⃣ Update rejection in DB
      const res = await fetch(`/api/approved-doctor/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remarks }),
      });

      const data = await res.json();

      // 2️⃣ Send rejection notification
      const notifRes = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail: email,
          title: "Your application has been reviewed ❌",
          body: `Your doctor application has been rejected. Reason: ${remarks}`,
        }),
      });
      const notifData = await notifRes.json();

      // 3️⃣ Show feedback
      Swal.fire({
        title: "Application Rejected",
        text: "The doctor has been notified with the provided reason",
        icon: "success",
        confirmButtonColor: "var(--color-primary)",
      });

      if (!notifData.success)
        console.error("Notification error:", notifData.message);

      fetchRequests();
      setSelectedDoctor(null); // Close modal on action
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "var(--color-primary)",
      });
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setSpecializationFilter("all");
    setConsultationTypeFilter("all");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--dashboard-bg)" }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold" style={{ color: "var(--text-color-all)" }}>Loading Applications...</p>
        </div>
      </div>
    );
  }

  // --- Modal Content Rendering Helper ---
  const renderModalContent = (doctor) => {
    if (!doctor) return null;

    const { personalInfo, educationAndCredentials, licenseAndVerification, practiceInfo, status } = doctor;

    return (
      <div className="p-6 space-y-8">
        {/* Doctor Header Section */}
        <div className="flex items-center gap-6 pb-4 border-b border-[var(--dashboard-border)]">
          <img
            src={practiceInfo?.profilePhoto || "/placeholder.jpg"}
            alt={personalInfo?.fullName || "Doctor"}
            className="w-24 h-24 object-cover rounded-full border-4 shadow-xl"
            style={{ borderColor: "var(--color-primary)" }}
          />
          <div>
            <h2 className="text-3xl font-extrabold">{personalInfo?.fullName || "Name Unknown"}</h2>
            <p className="text-lg opacity-80">{educationAndCredentials?.specialization || "General Practitioner"}</p>
            <span className="text-sm px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold mt-2 inline-block">
              Status: Pending Review
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Personal Information */}
          <div className="bg-[var(--bg-color-all)] p-4 rounded-xl shadow">
            <ModalSectionTitle title="Personal Information" />
            <DetailItem label="Full Name" value={personalInfo?.fullName} />
            <DetailItem label="Email" value={personalInfo?.email} />
            <DetailItem label="Date of Birth" value={personalInfo?.dateOfBirth} />
            <DetailItem label="Gender" value={personalInfo?.gender} />
            <DetailItem label="Mobile" value={personalInfo?.contactNumber?.mobile} />
            <DetailItem label="Permanent Address" value={personalInfo?.address?.permanent} />
          </div>

          {/* Professional Credentials */}
          <div className="bg-[var(--bg-color-all)] p-4 rounded-xl shadow">
            <ModalSectionTitle title="Professional Credentials" />
            <DetailItem label="Specialization" value={educationAndCredentials?.specialization} />
            <DetailItem label="Medical Degree" value={educationAndCredentials?.medicalDegree} />
            <DetailItem label="Post Graduate" value={educationAndCredentials?.postGraduate} />
            <DetailItem label="University" value={educationAndCredentials?.university?.name} />
            <DetailItem label="Graduation Year" value={educationAndCredentials?.university?.graduationYear} />
            <DetailItem label="Current Affiliation" value={educationAndCredentials?.currentAffiliation} />
          </div>

          {/* Practice Details */}
          <div className="bg-[var(--bg-color-all)] p-4 rounded-xl shadow">
            <ModalSectionTitle title="Practice Details" />
            <DetailItem label="Consultation Type" value={practiceInfo?.consultationType} />
            <DetailItem label="Online Fee" value={practiceInfo?.consultationFees?.online ? `$${practiceInfo.consultationFees.online}` : 'N/A'} />
            <DetailItem label="In-Person Fee" value={practiceInfo?.consultationFees?.inPerson ? `$${practiceInfo.consultationFees.inPerson}` : 'N/A'} />
            <DetailItem label="Languages Spoken" value={practiceInfo?.languagesSpoken?.join(', ') || 'N/A'} />
            <div className="py-2 border-b border-[var(--dashboard-border)]">
              <span className="text-sm font-medium opacity-80 block mb-1">Working Hours (Thursday example):</span>
              <span className="text-sm font-semibold block text-right">
                {practiceInfo?.workingHours?.thursday || 'N/A'}
              </span>
            </div>
          </div>
          
          {/* License & Documents */}
          <div className="bg-[var(--bg-color-all)] p-4 rounded-xl shadow">
            <ModalSectionTitle title="License & Verification" />
            <DetailItem label="License Number" value={licenseAndVerification?.medicalLicenseNumber} />
            <DetailItem label="Expiry Date" value={licenseAndVerification?.expiryDate} />
            <DetailItem 
              label="License Certificate" 
              value={licenseAndVerification?.documents?.licenseCertificate} 
              isLink={!!licenseAndVerification?.documents?.licenseCertificate}
              linkText="View Certificate ↗"
            />
            <DetailItem 
              label="Government ID" 
              value={licenseAndVerification?.documents?.govtId} 
              isLink={!!licenseAndVerification?.documents?.govtId}
              linkText="View ID ↗"
            />
            <DetailItem 
              label="Application Submitted" 
              value={status?.submittedAt ? new Date(status.submittedAt).toLocaleString() : 'N/A'}
            />
          </div>
          
          {/* Work Experience */}
          <div className="md:col-span-2 bg-[var(--bg-color-all)] p-4 rounded-xl shadow">
            <ModalSectionTitle title="Work Experience" />
            <div className="space-y-3">
              {educationAndCredentials?.workExperience?.length > 0 ? (
                educationAndCredentials.workExperience.map((exp, index) => (
                  <div key={index} className="border border-[var(--dashboard-border)] p-3 rounded-lg bg-[var(--dashboard-bg)]">
                    <p className="font-semibold" style={{ color: "var(--color-primary)" }}>{exp.position || 'Position N/A'}</p>
                    <p className="text-sm opacity-90">{exp.hospitalName || 'Hospital N/A'}</p>
                    <p className="text-xs opacity-70 mt-1">{exp.years || 'Years N/A'}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm opacity-70">No work experience listed.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        color: "var(--text-color-all)",
      }}
    >
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
          Doctor Approval Requests
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Review and manage pending doctor applications. Carefully evaluate each application before approval.
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></div>
          <span className="text-sm opacity-70">{filteredRequests.length} pending applications</span>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-[var(--bg-color-all)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold mb-2">Search Applications</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, email, specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--dashboard-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Specialization Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2">Specialization</label>
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--dashboard-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Consultation Type Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2">Consultation Type</label>
            <select
              value={consultationTypeFilter}
              onChange={(e) => setConsultationTypeFilter(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--dashboard-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Types</option>
              {consultationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--dashboard-border)] rounded-xl bg-[var(--dashboard-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Active Filters and Clear Button */}
        <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-sm rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="ml-1 hover:opacity-70">×</button>
              </span>
            )}
            {specializationFilter !== "all" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1">
                Spec: {specializationFilter}
                <button onClick={() => setSpecializationFilter("all")} className="ml-1 hover:opacity-70">×</button>
              </span>
            )}
            {consultationTypeFilter !== "all" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center gap-1">
                Type: {consultationTypeFilter}
                <button onClick={() => setConsultationTypeFilter("all")} className="ml-1 hover:opacity-70">×</button>
              </span>
            )}
          </div>

          {(searchTerm || specializationFilter !== "all" || consultationTypeFilter !== "all") && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-white rounded-xl transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm opacity-70">
          Showing {filteredRequests.length} of {requests.length} applications
        </p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary)] animate-pulse"></div>
          <span className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
            {filteredRequests.length} Pending Review
          </span>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-16 bg-[var(--bg-color-all)] rounded-2xl border border-[var(--dashboard-border)]">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center text-4xl text-white shadow-lg" style={{ backgroundColor: "var(--color-primary)" }}>
            👨‍⚕️
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-color-all)" }}>
            {requests.length === 0 ? "No Pending Applications" : "No Matching Applications Found"}
          </h3>
          <p className="opacity-80 max-w-md mx-auto mb-6" style={{ color: "var(--text-color-all)" }}>
            {requests.length === 0
              ? "There are no pending doctor applications at the moment. Check back later for new submissions."
              : "Try adjusting your search criteria or filters to find what you're looking for."
            }
          </p>
          {requests.length > 0 && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <div
              key={req._id}
              className="bg-[var(--bg-color-all)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Status Indicator */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-amber-400"></div>

              <div className="flex items-start gap-4 mb-4">
                <img
                  src={req.practiceInfo?.profilePhoto || "/placeholder.jpg"}
                  alt={req.personalInfo?.fullName || "Doctor"}
                  className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate group-hover:text-[var(--color-primary)] transition-colors">
                    {req.personalInfo?.fullName || "Name not available"}
                  </h3>
                  <p className="text-sm opacity-70 truncate">
                    {req.personalInfo?.email || "Email not available"}
                  </p>
                  <p className="text-sm font-medium mt-1" style={{ color: "var(--color-primary)" }}>
                    {req.educationAndCredentials?.specialization || "General Practitioner"}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Consultation:</span>
                  <span className="font-medium">{req.practiceInfo?.consultationType || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Medical Degree:</span>
                  <span className="font-medium">
                    {req.educationAndCredentials?.medicalDegree || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Applied:</span>
                  <span className="font-medium">
                    {req.status?.submittedAt ? new Date(req.status.submittedAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setSelectedDoctor(req)}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View Details
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleApprove(req._id, req.personalInfo?.email)}
                    className="py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-1 text-sm"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(req._id, req.personalInfo?.email)}
                    className="py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-1 text-sm bg-rose-500 hover:bg-rose-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="bg-[var(--dashboard-bg)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[var(--dashboard-bg)] border-b border-[var(--dashboard-border)] p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                    Doctor Application Details
                  </h2>
                  <p className="opacity-70 mt-1">Review all information before making a decision</p>
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--bg-color-all)] transition-colors"
                  style={{ color: "var(--text-color-all)" }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - IMPLEMENTED HERE */}
            {renderModalContent(selectedDoctor)}

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[var(--dashboard-bg)] border-t border-[var(--dashboard-border)] p-6 rounded-b-2xl z-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={() => handleApprove(selectedDoctor._id, selectedDoctor.personalInfo?.email)}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Approve Application
                </button>
                <button
                  onClick={() => handleReject(selectedDoctor._id, selectedDoctor.personalInfo?.email)}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 bg-rose-500 hover:bg-rose-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Reject Application
                </button>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-6 py-3 rounded-xl font-semibold border border-[var(--dashboard-border)] hover:bg-[var(--bg-color-all)] transition-all duration-300"
                  style={{ color: "var(--text-color-all)" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}