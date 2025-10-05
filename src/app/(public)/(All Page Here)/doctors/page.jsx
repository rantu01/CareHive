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

  const filteredDoctors = doctors.filter((doc) =>
    doc.educationAndCredentials?.specialization
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-28 px-5" style={{ backgroundColor: "var(--gray-color)" }}>
      
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-5xl text-[#4682B4] font-extrabold mb-2 ;"  >
          Meet Our <span className="text-6xl">E</span>xpert Doctors
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Find highly skilled medical professionals. Use the search to quickly locate your specialist.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-20">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="🔍 Search by specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-full shadow-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-4 transition duration-300"
            style={{
              backgroundColor: "var(--color-white)",
              border: "2px solid var(--dashboard-blue)",
              color: "var(--fourground-color)",
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => {
            const personal = doc.personalInfo || {};
            const education = doc.educationAndCredentials || {};
            const experienceYears =
              education.workExperience?.reduce((sum, exp) => sum + (exp.years || 0), 0) || 0;

            return (
              <div
                key={doc._id}
                className="flex flex-col rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden border border-gray-200"
                style={{ backgroundColor: "var(--dashboard-bg)" }}
              >
                {/* Card Header */}
                <div className="px-6 py-5 flex flex-col items-start space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">{personal.fullName || "N/A"}</h2>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{
                      background: "linear-gradient(90deg, #2e7d32, #4caf50)",
                    }}
                  >
                    {education.specialization || "General"}
                  </span>
                </div>

                {/* Doctor Info */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4 text-gray-700">
                  {/* Email & Phone */}
                  <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
                    <p><strong>Email:</strong> {personal.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {personal.contactNumber?.mobile || "N/A"}</p>
                  </div>

                  {/* Education & Affiliation */}
                  <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
                    <p><strong>Education:</strong> {education.medicalDegree || "N/A"}, {education.postGraduate || "N/A"}</p>
                    <p><strong>Affiliation:</strong> {education.currentAffiliation || "N/A"}</p>
                  </div>

                  {/* Work Experience */}
                  <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
                    <strong className="block mb-2 text-lg" style={{ color: "var(--dashboard-blue)" }}>
                      Work Experience:
                    </strong>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {education.workExperience?.length ? (
                        education.workExperience.map((exp, i) => (
                          <li key={i}>{exp.position} at {exp.hospitalName} ({exp.years || "N/A"} yrs)</li>
                        ))
                      ) : (
                        <li>No experience data</li>
                      )}
                    </ul>
                    {experienceYears >= 5 && (
                      <span
                        className="inline-block mt-2 px-2 py-1 text-xs font-bold rounded"
                        style={{ backgroundColor: "#4682B4", color: "white" }}
                      >
                        Experienced ({experienceYears} yrs)
                      </span>
                    )}
                  </div>

                  {/* Book Appointment Button */}
                  <div className="mt-6">
                    <button
                      className="w-full py-3 font-semibold rounded-full text-white text-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                      style={{
                        background: "linear-gradient(270deg, #4682B4, #5a9bd4, #4682B4)",
                        backgroundSize: "600% 600%",
                        animation: "gradientFlow 8s ease infinite",
                        boxShadow: "0 5px 20px rgba(70, 130, 180, 0.4)",
                      }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-lg font-medium" style={{ color: "var(--dashboard-blue)" }}>
            No doctors found for this specialization.
          </p>
        )}
      </div>
    </div>
  );
}
