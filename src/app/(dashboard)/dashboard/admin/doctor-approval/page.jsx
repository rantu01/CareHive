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

  async function handleApprove(id, email) {
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
        confirmButtonColor: "#3b82f6",
      });

      if (!notifData.success)
        console.error("Notification error:", notifData.message);

      fetchRequests();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
    }
  }

  async function handleReject(id, email) {
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
        if (!value) return "You need to provide a reason!";
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
          title: "Your application has been rejected ❌",
          body: `Reason: ${remarks}`,
        }),
      });
      const notifData = await notifRes.json();

      // 3️⃣ Show feedback
      Swal.fire({
        title: "Rejected!",
        text: data.message || "Doctor rejected successfully",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });

      if (!notifData.success)
        console.error("Notification error:", notifData.message);

      fetchRequests();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        color: "var(--fourground-color)",
      }}
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
              <p className="font-semibold">
                {req.personalInfo?.fullName || "Name not available"}
              </p>
              <p className="text-sm">
                {req.personalInfo?.email || "Email not available"}
              </p>
              <p className="text-sm text-gray-600">
                {req.educationAndCredentials?.specialization ||
                  "Specialization not available"}
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
                  onClick={() =>
                    handleApprove(req._id, req.personalInfo?.email)
                  }
                  className="px-3 py-1 rounded-lg shadow text-sm font-medium transition hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-light-green)",
                    color: "var(--color-black)",
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(req._id, req.personalInfo?.email)}
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
            className="rounded-2xl shadow-2xl w-6xl py-6 h-full p-8 relative overflow-y-auto 
                 bg-white/30 backdrop-blur-lg border border-white/40 transition-all duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Doctor Details */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={
                  selectedDoctor.practiceInfo?.profilePhoto ||
                  "/placeholder.jpg"
                }
                alt={selectedDoctor.personalInfo?.fullName || "Doctor"}
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-blue-400 shadow"
              />

              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">
                  {selectedDoctor.personalInfo?.fullName}
                </h2>
                <p>
                  <strong>Email:</strong> {selectedDoctor.personalInfo?.email}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {selectedDoctor.personalInfo?.dateOfBirth}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedDoctor.personalInfo?.gender}
                </p>
                <p>
                  <strong>Mobile:</strong>{" "}
                  {selectedDoctor.personalInfo?.contactNumber?.mobile}
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  {selectedDoctor.personalInfo?.contactNumber?.whatsapp}
                </p>
                <p>
                  <strong>Current Address:</strong>{" "}
                  {selectedDoctor.personalInfo?.address?.current}
                </p>
                <p>
                  <strong>Permanent Address:</strong>{" "}
                  {selectedDoctor.personalInfo?.address?.permanent}
                </p>

                <hr className="my-2 border-gray-400" />

                <h3 className="font-semibold">Education & Credentials</h3>
                <p>
                  <strong>Medical Degree:</strong>{" "}
                  {selectedDoctor.educationAndCredentials?.medicalDegree}
                </p>
                <p>
                  <strong>Post Graduate:</strong>{" "}
                  {selectedDoctor.educationAndCredentials?.postGraduate}
                </p>
                <p>
                  <strong>University:</strong>{" "}
                  {selectedDoctor.educationAndCredentials?.university?.name} (
                  {
                    selectedDoctor.educationAndCredentials?.university
                      ?.graduationYear
                  }
                  )
                </p>
                <p>
                  <strong>Specialization:</strong>{" "}
                  {selectedDoctor.educationAndCredentials?.specialization}
                </p>

                <div>
                  <strong>Work Experience:</strong>
                  <ul className="list-disc list-inside">
                    {selectedDoctor.educationAndCredentials?.workExperience?.map(
                      (exp, i) => (
                        <li key={i}>
                          {exp.position} at {exp.hospitalName} ({exp.years})
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <p>
                  <strong>Current Affiliation:</strong>{" "}
                  {selectedDoctor.educationAndCredentials?.currentAffiliation}
                </p>

                <hr className="my-2 border-gray-400" />

                <h3 className="font-semibold">License & Verification</h3>
                <p>
                  <strong>Medical License:</strong>{" "}
                  {selectedDoctor.licenseAndVerification?.medicalLicenseNumber}
                </p>
                <p>
                  <strong>Expiry Date:</strong>{" "}
                  {selectedDoctor.licenseAndVerification?.expiryDate}
                </p>
                <div>
                  <strong>Documents:</strong>
                  <ul className="list-disc list-inside">
                    <li>
                      <a
                        href={
                          selectedDoctor.licenseAndVerification?.documents
                            ?.licenseCertificate
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        License Certificate
                      </a>
                    </li>
                    <li>
                      <a
                        href={
                          selectedDoctor.licenseAndVerification?.documents
                            ?.govtId
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Govt ID
                      </a>
                    </li>
                  </ul>
                </div>

                <hr className="my-2 border-gray-400" />

                <h3 className="font-semibold">Practice Info</h3>
                <p>
                  <strong>Consultation Type:</strong>{" "}
                  {selectedDoctor.practiceInfo?.consultationType}
                </p>
                <p>
                  <strong>Online Fees:</strong>{" "}
                  {selectedDoctor.practiceInfo?.consultationFees?.online}
                </p>
                <p>
                  <strong>In-Person Fees:</strong>{" "}
                  {selectedDoctor.practiceInfo?.consultationFees?.inPerson}
                </p>
                <p>
                  <strong>Languages Spoken:</strong>{" "}
                  {selectedDoctor.practiceInfo?.languagesSpoken?.join(", ")}
                </p>

                <hr className="my-2 border-gray-400" />

                <h3 className="font-semibold">Status</h3>
                <p>
                  <strong>Verified:</strong>{" "}
                  {selectedDoctor.status?.isVerified ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Admin Remarks:</strong>{" "}
                  {selectedDoctor.status?.adminRemarks || "N/A"}
                </p>
                <p>
                  <strong>Submitted At:</strong>{" "}
                  {new Date(
                    selectedDoctor.status?.submittedAt
                  ).toLocaleString()}
                </p>
                <p>
                  <strong>Approved At:</strong>{" "}
                  {selectedDoctor.status?.approvedAt
                    ? new Date(
                        selectedDoctor.status?.approvedAt
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>

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
