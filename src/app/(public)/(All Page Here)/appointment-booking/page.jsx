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
    <div className="min-h-screen bg-gray-50 py-28 px-5">
      {/* 🩺 Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3">
          Meet Our Expert Doctors
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Browse through our list of professional and experienced doctors. Use
          the search bar below to find specialists based on your medical needs.
        </p>
      </div>

      {/* 🔍 Enhanced Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="🔍 Search by specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 border-2 border-blue-400 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 text-gray-700 placeholder-gray-400 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      {/* 👨‍⚕️ Doctors Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => {
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
          })
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No doctors found for this specialization.
          </p>
        )}
      </div>
    </div>
  );
}
