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
    <div style={{ backgroundColor: "var(--dashboard-bg)", color: "var(--fourground-color)", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ color: "var(--dashboard-blue)", marginBottom: "1.5rem" }}>Pending Doctor Applications</h1>

      {requests?.map(req => (
        <div
          key={req._id}
          className="border p-4 mb-4 rounded"
          style={{
            borderColor: "var(--dashboard-border)",
            backgroundColor: "var(--gray-color)"
          }}
        >
          <p><b>Name:</b> {req.personalInfo?.fullName}</p>
          <p><b>Email:</b> {req.personalInfo?.email}</p>
          <p><b>Specialization:</b> {req.educationAndCredentials?.specialization}</p>

          <button
            onClick={() => setSelectedDoctor(req)}
            className="px-3 py-1 mr-2 rounded"
            style={{ backgroundColor: "var(--dashboard-blue)", color: "var(--color-white)" }}
          >
            Check Doctor
          </button>

          <button
            onClick={() => handleApprove(req._id)}
            className="px-3 py-1 mr-2 rounded"
            style={{ backgroundColor: "var(--color-light-green)", color: "var(--color-black)" }}
          >
            Approve
          </button>

          <button
            onClick={() => handleReject(req._id)}
            className="px-3 py-1 rounded"
            style={{ backgroundColor: "var(--color-calm-blue)", color: "var(--color-white)" }}
          >
            Reject
          </button>
        </div>
      ))}

      {/* Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full relative"
            style={{ backgroundColor: "var(--dashboard-bg)", color: "var(--fourground-color)" }}
            onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 style={{ color: "var(--dashboard-blue)", marginBottom: "1rem" }}>
              {selectedDoctor.personalInfo.fullName} - Details
            </h2>
            <img
              src={selectedDoctor.practiceInfo.profilePhoto}
              alt="Doctor"
              className="w-32 h-32 object-cover rounded mb-4"
            />

            <p><b>Date of Birth:</b> {selectedDoctor.personalInfo.dateOfBirth}</p>
            <p><b>Gender:</b> {selectedDoctor.personalInfo.gender}</p>
            <p><b>Mobile:</b> {selectedDoctor.personalInfo.contactNumber.mobile}</p>
            <p><b>Email:</b> {selectedDoctor.personalInfo.email}</p>
            <p><b>Current Address:</b> {selectedDoctor.personalInfo.address.current}</p>
            <p><b>Permanent Address:</b> {selectedDoctor.personalInfo.address.permanent}</p>

            <hr className="my-2" />

            <p><b>Medical Degree:</b> {selectedDoctor.educationAndCredentials.medicalDegree}</p>
            <p><b>Postgraduate:</b> {selectedDoctor.educationAndCredentials.postGraduate}</p>
            <p><b>Specialization:</b> {selectedDoctor.educationAndCredentials.specialization}</p>
            <p><b>University:</b> {selectedDoctor.educationAndCredentials.university.name} ({selectedDoctor.educationAndCredentials.university.graduationYear})</p>

            <h3 className="mt-2 font-bold">Work Experience:</h3>
            {selectedDoctor.educationAndCredentials.workExperience.map((we, i) => (
              <p key={i}>{we.position} at {we.hospitalName} ({we.years})</p>
            ))}

            <hr className="my-2" />

            <p><b>Current Affiliation:</b> {selectedDoctor.educationAndCredentials.currentAffiliation}</p>
            <p><b>Medical License:</b> {selectedDoctor.licenseAndVerification.medicalLicenseNumber}</p>
            <p><b>Issuing Authority:</b> {selectedDoctor.licenseAndVerification.issuingAuthority}</p>
            <p><b>License Expiry:</b> {selectedDoctor.licenseAndVerification.expiryDate}</p>

            <hr className="my-2" />

            <p><b>Clinic Address:</b> {selectedDoctor.practiceInfo.clinicAddress}</p>
            <p><b>Consultation Type:</b> {selectedDoctor.practiceInfo.consultationType}</p>
            <p><b>Working Hours:</b></p>
            <ul>
              {Object.entries(selectedDoctor.practiceInfo.workingHours).map(([day, hours]) => (
                <li key={day}>{day}: {hours}</li>
              ))}
            </ul>
            <p><b>Consultation Fees:</b> Online: {selectedDoctor.practiceInfo.consultationFees.online} BDT, In-person: {selectedDoctor.practiceInfo.consultationFees.inPerson} BDT</p>
            <p><b>Languages:</b> {selectedDoctor.practiceInfo.languagesSpoken.join(", ")}</p>

            <button
              onClick={() => setSelectedDoctor(null)}
              className="mt-4 px-3 py-1 rounded"
              style={{ backgroundColor: "var(--color-calm-blue)", color: "var(--color-white)" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
