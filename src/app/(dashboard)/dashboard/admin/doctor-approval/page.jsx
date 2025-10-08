"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ApprovalRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  async function fetchRequests() {
    const res = await fetch("/api/approved-doctor");
    const data = await res.json();
    if (data.ok) setRequests(data.data);
  }

  async function handleApprove(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this doctor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/approved-doctor/${id}/approve`, { method: "POST" });
      const data = await res.json();
      Swal.fire({
        title: data.ok ? "Approved!" : "Error",
        text: data.message || data.error,
        icon: data.ok ? "success" : "error",
        confirmButtonColor: "#3b82f6",
      });
      fetchRequests();
    }
  }

  async function handleReject(id) {
    const { value: remarks } = await Swal.fire({
      title: "Reject Doctor",
      input: "text",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Enter reason...",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a reason!";
        }
      },
    });

    if (remarks) {
      const res = await fetch(`/api/approved-doctor/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remarks }),
      });
      const data = await res.json();

      Swal.fire({
        title: data.ok ? "Rejected!" : "Error",
        text: data.message || data.error,
        icon: data.ok ? "success" : "error",
        confirmButtonColor: "#3b82f6",
      });

      fetchRequests();
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--dashboard-bg)", color: "var(--fourground-color)" }}
    >
      <h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 
                   bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                   text-transparent bg-clip-text drop-shadow-lg"
      >
        Pending Doctor Applications
      </h1>

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
              className="w-20 h-20 object-cover rounded-full border-4 border-blue-400 shadow"
            />

            <div className="flex-1">
              <p className="font-semibold">{req.personalInfo?.fullName || "Name not available"}</p>
              <p className="text-sm">{req.personalInfo?.email || "Email not available"}</p>
              <p className="text-sm text-gray-600">
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

      {/* ===================== MODAL ===================== */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-blue/40 z-50 backdrop-blur-sm"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative overflow-y-auto max-h-[90vh] 
                       bg-white/30 backdrop-blur-lg border border-white/40 transition-all duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 
                           bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 
                           text-transparent bg-clip-text drop-shadow-lg">
              Doctor Profile Details
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 border-b border-black/40 pb-5">
              <img
                src={selectedDoctor.practiceInfo?.profilePhoto || "/placeholder.jpg"}
                alt={selectedDoctor.personalInfo?.fullName}
                className="w-28 h-28 object-cover rounded-full border-4 border-blue-400 shadow-lg"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-black">{selectedDoctor.personalInfo?.fullName}</h3>
                <p className="text-black">{selectedDoctor.personalInfo?.email}</p>
                <p className="text-sm text-indigo-500 font-medium">
                  {selectedDoctor.educationAndCredentials?.specialization}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-5 text-sm text-black">
              {/* Personal Info */}
              <section>
                <h4 className="font-semibold mb-1">Personal Info</h4>
                <p><b>DOB:</b> {selectedDoctor.personalInfo?.dateOfBirth}</p>
                <p><b>Gender:</b> {selectedDoctor.personalInfo?.gender}</p>
                <p><b>Mobile:</b> {selectedDoctor.personalInfo?.contactNumber?.mobile}</p>
                <p><b>WhatsApp:</b> {selectedDoctor.personalInfo?.contactNumber?.whatsapp}</p>
                <p><b>Current Address:</b> {selectedDoctor.personalInfo?.address?.current}</p>
                <p><b>Permanent Address:</b> {selectedDoctor.personalInfo?.address?.permanent}</p>
              </section>

              {/* Education */}
              <section>
                <h4 className="font-semibold mb-1">Education & Credentials</h4>
                <p><b>Medical Degree:</b> {selectedDoctor.educationAndCredentials?.medicalDegree}</p>
                <p><b>Post Graduate:</b> {selectedDoctor.educationAndCredentials?.postGraduate}</p>
                <p>
                  <b>University:</b> {selectedDoctor.educationAndCredentials?.university?.name} (
                  {selectedDoctor.educationAndCredentials?.university?.graduationYear})
                </p>
                <p><b>Specialization:</b> {selectedDoctor.educationAndCredentials?.specialization}</p>
                <h5 className="font-semibold mt-2">Work Experience:</h5>
                <ul className="list-disc ml-5 space-y-1">
                  {selectedDoctor.educationAndCredentials?.workExperience?.map((we, i) => (
                    <li key={i}>{we.position} at {we.hospitalName} ({we.years})</li>
                  ))}
                </ul>
              </section>

              {/* License Info */}
              <section>
                <h4 className="font-semibold mb-1">License & Verification</h4>
                <p><b>License No:</b> {selectedDoctor.licenseAndVerification?.medicalLicenseNumber}</p>
                <p><b>Expiry Date:</b> {selectedDoctor.licenseAndVerification?.expiryDate}</p>
                <p>
                  <b>License Certificate:</b>{" "}
                  <a href={selectedDoctor.licenseAndVerification?.documents?.licenseCertificate} target="_blank" className="text-blue-600 underline">
                    View PDF
                  </a>
                </p>
                <p>
                  <b>Govt ID:</b>{" "}
                  <a href={selectedDoctor.licenseAndVerification?.documents?.govtId} target="_blank" className="text-blue-600 underline">
                    View PDF
                  </a>
                </p>
              </section>

              {/* Practice Info */}
              <section>
                <h4 className="font-semibold mb-1">Practice Information</h4>
                <p><b>Consultation Type:</b> {selectedDoctor.practiceInfo?.consultationType}</p>
                <p><b>Fees:</b> Online {selectedDoctor.practiceInfo?.consultationFees?.online} BDT, In-person {selectedDoctor.practiceInfo?.consultationFees?.inPerson} BDT</p>
                <p><b>Languages:</b> {selectedDoctor.practiceInfo?.languagesSpoken?.join(", ")}</p>
                <h5 className="font-semibold mt-2">Working Hours:</h5>
                <ul className="list-disc ml-5 space-y-1">
                  {Object.entries(selectedDoctor.practiceInfo?.workingHours || {}).length > 0
                    ? Object.entries(selectedDoctor.practiceInfo.workingHours).map(([day, time]) => (
                        <li key={day}>{day}: {time}</li>
                      ))
                    : <li>N/A</li>
                  }
                </ul>
              </section>

              {/* Status */}
              <section>
                <h4 className="font-semibold mb-1">Application Status</h4>
                <p><b>Verified:</b> {selectedDoctor.status?.isVerified ? "Yes" : "No"}</p>
                <p><b>Admin Remarks:</b> {selectedDoctor.status?.adminRemarks || "None"}</p>
                <p><b>Submitted At:</b> {new Date(selectedDoctor.status?.submittedAt).toLocaleString()}</p>
                <p><b>Approved At:</b> {selectedDoctor.status?.approvedAt ? new Date(selectedDoctor.status.approvedAt).toLocaleString() : "Not yet approved"}</p>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-center border-t border-black/40 pt-4">
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
