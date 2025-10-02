"use client";
import { useEffect, useState } from "react";

export default function ApprovalRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // for modal

  async function fetchRequests() {
    const res = await fetch("/api/approved-doctor");
    const data = await res.json();
    if (data.ok) setRequests(data.data);
  }

  async function handleApprove(id) {
    if (!confirm("Approve this request?")) return;
    const res = await fetch(`/api/approved-doctor/${id}/approve`, { method: "POST" });
    const data = await res.json();
    alert(data.message || data.error);
    fetchRequests();
  }

  async function handleReject(id) {
    const remarks = prompt("Reason for rejection:");
    if (!remarks) return;
    const res = await fetch(`/api/approved-doctor/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remarks }),
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchRequests();
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--dashboard-bg)", color: "var(--fourground-color)" }}
    >
      {/* Page Title */}
      <h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 
                   bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                   text-transparent bg-clip-text drop-shadow-lg"
      >
        Pending Doctor Applications
      </h1>

      {/* 2-column card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests?.map((req) => (
          <div
            key={req._id}
            className="flex items-start gap-4 p-5 rounded-xl shadow-md transition hover:shadow-lg hover:scale-[1.02]"
            style={{
              border: "1px solid var(--dashboard-border)",
              backgroundColor: "var(--gray-color)",
            }}
          >
            <img
              src={req.practiceInfo?.profilePhoto || "/placeholder.jpg"}
              alt={req.personalInfo?.fullName || "Doctor"}
              className="w-20 h-20 object-cover rounded-full border shadow"
            />

            <div className="flex-1">
              <p className="font-semibold">{req.personalInfo?.fullName || "Name not available"}</p>
              <p className="text-sm">{req.personalInfo?.email || "Email not available"}</p>
              <p className="text-sm text-gray-400">
                {req.educationAndCredentials?.specialization || "Specialization not available"}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDoctor(req)}
                  className="px-3 py-1 rounded-lg shadow text-sm font-medium transition hover:scale-105"
                  style={{
                    backgroundColor: "var(--dashboard-blue)",
                    color: "var(--color-white)",
                  }}
                >
                  Check Doctor
                </button>

                <button
                  onClick={() => handleApprove(req._id)}
                  className="px-3 py-1 rounded-lg shadow text-sm font-medium transition hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-light-green)",
                    color: "var(--color-black)",
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(req._id)}
                  className="px-3 py-1 rounded-lg shadow text-sm font-medium transition hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-calm-blue)",
                    color: "var(--color-white)",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[90vh] 
                       bg-white/30 backdrop-blur-lg border border-white/40 transition-all duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 
                           bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 
                           text-transparent bg-clip-text drop-shadow-lg">
              Doctor Profile Details
            </h2>

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 border-b border-white/40 pb-5">
              <img
                src={selectedDoctor.practiceInfo?.profilePhoto || "/placeholder.jpg"}
                alt={selectedDoctor.personalInfo?.fullName || "Doctor"}
                className="w-28 h-28 object-cover rounded-full border-2 border-white/50 shadow-lg"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 drop-shadow-md">
                  {selectedDoctor.personalInfo?.fullName || "Name not available"}
                </h3>
                <p className="text-gray-700">{selectedDoctor.personalInfo?.email || "Email not available"}</p>
                <p className="text-sm text-indigo-500 font-medium">
                  {selectedDoctor.educationAndCredentials?.specialization || "Specialization not available"}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-5 text-sm text-gray-800">
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Personal Info</h4>
                <p><b>DOB:</b> {selectedDoctor.personalInfo?.dateOfBirth || "N/A"}</p>
                <p><b>Gender:</b> {selectedDoctor.personalInfo?.gender || "N/A"}</p>
                <p><b>Mobile:</b> {selectedDoctor.personalInfo?.contactNumber?.mobile || "N/A"}</p>
                <p><b>Address:</b> {selectedDoctor.personalInfo?.address?.current || "N/A"}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Education</h4>
                <p><b>Degree:</b> {selectedDoctor.educationAndCredentials?.medicalDegree || "N/A"}</p>
                <p><b>Postgraduate:</b> {selectedDoctor.educationAndCredentials?.postGraduate || "N/A"}</p>
                <p>
                  <b>University:</b> {selectedDoctor.educationAndCredentials?.university?.name || "N/A"} (
                  {selectedDoctor.educationAndCredentials?.university?.graduationYear || "N/A"})
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Work Experience</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {selectedDoctor.educationAndCredentials?.workExperience?.length > 0
                    ? selectedDoctor.educationAndCredentials.workExperience.map((we, i) => (
                        <li key={i}>{we.position} at {we.hospitalName} ({we.years})</li>
                      ))
                    : <li>N/A</li>
                  }
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-1 text-gray-900">License & Practice</h4>
                <p><b>License No:</b> {selectedDoctor.licenseAndVerification?.medicalLicenseNumber || "N/A"}</p>
                <p><b>Authority:</b> {selectedDoctor.licenseAndVerification?.issuingAuthority || "N/A"}</p>
                <p><b>Expiry:</b> {selectedDoctor.licenseAndVerification?.expiryDate || "N/A"}</p>
                <p><b>Clinic:</b> {selectedDoctor.practiceInfo?.clinicAddress || "N/A"}</p>
                <p><b>Consultation:</b> {selectedDoctor.practiceInfo?.consultationType || "N/A"}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Working Hours</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {selectedDoctor.practiceInfo?.workingHours
                    ? Object.entries(selectedDoctor.practiceInfo.workingHours).map(([day, hours]) => (
                        <li key={day}>{day}: {hours}</li>
                      ))
                    : <li>N/A</li>
                  }
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Other Info</h4>
                <p>
                  <b>Fees:</b> Online {selectedDoctor.practiceInfo?.consultationFees?.online || "N/A"} BDT, 
                  In-person {selectedDoctor.practiceInfo?.consultationFees?.inPerson || "N/A"} BDT
                </p>
                <p>
                  <b>Languages:</b> {selectedDoctor.practiceInfo?.languagesSpoken?.join(", ") || "N/A"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-center border-t border-white/40 pt-4">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="px-6 py-2 rounded-lg shadow-md transition transform hover:scale-110 
                           bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
