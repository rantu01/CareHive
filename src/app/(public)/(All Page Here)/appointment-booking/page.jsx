// app/doctors/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors by specialization
  const filteredDoctors = doctors.filter((doc) =>
    doc.educationAndCredentials?.specialization
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-10">Our Doctors</h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.map((doc) => {
          const personal = doc.personalInfo || {};
          const education = doc.educationAndCredentials || {};

          return (
            <div
              key={doc._id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {personal.fullName || "N/A"}
                </h2>

                <p className="text-gray-600 mt-2">
                  <strong>Email:</strong> {personal.email || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong>{" "}
                  {personal.contactNumber?.mobile || "N/A"}
                </p>

                <p className="text-gray-600 mt-2">
                  <strong>Education:</strong>{" "}
                  {education.medicalDegree || "N/A"},{" "}
                  {education.postGraduate || ""}
                </p>

                <p className="text-gray-600">
                  <strong>Specialization:</strong>{" "}
                  {education.specialization || "N/A"}
                </p>

                <p className="text-gray-600 mt-2">
                  <strong>Current Affiliation:</strong>{" "}
                  {education.currentAffiliation || "N/A"}
                </p>

                <div className="mt-2">
                  <strong className="block text-gray-700 mb-1">
                    Work Experience:
                  </strong>
                  <ul className="text-gray-600 list-disc list-inside">
                    {education.workExperience?.length ? (
                      education.workExperience.map((exp, i) => (
                        <li key={i}>
                          {exp.position} at {exp.hospitalName} (
                          {exp.years || "N/A"})
                        </li>
                      ))
                    ) : (
                      <li>No experience data</li>
                    )}
                  </ul>
                </div>
              </div>

              <button className="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Book Appointment
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
