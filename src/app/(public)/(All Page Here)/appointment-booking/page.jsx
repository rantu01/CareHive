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
    <div
      className="min-h-screen py-28 px-5"
      style={{ backgroundColor: "var(--gray-color)" }}
    >
      {/* 🩺 Page Header */}
      <div className="text-center mb-12">
        <h1
          className="text-4xl font-extrabold mb-3"
          style={{ color: "var(--color-calm-blue)" }}
        >
          Meet Our Expert Doctors
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg leading-relaxed"
          style={{ color: "var(--fourground-color)" }}
        >
          Discover a team of highly skilled and compassionate medical
          professionals. Use the search bar below to find specialists that fit
          your healthcare needs.
        </p>
      </div>

      {/* 🔍 Enhanced Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="🔍 Search by specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border-2 rounded-full shadow-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-200"
            style={{
              borderColor: "var(--dashboard-blue)",
              boxShadow: "0 2px 8px rgba(49, 153, 238, 0.15)",
              backgroundColor: "var(--dashboard-bg)",
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      {/* 👨‍⚕️ Doctors Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => {
            const personal = doc.personalInfo || {};
            const education = doc.educationAndCredentials || {};

            return (
              <div
                key={doc._id}
                className="p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  border: "1px solid var(--dashboard-border)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div>
                  <h2
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    {personal.fullName || "N/A"}
                  </h2>

                  <div className="space-y-1 text-sm" style={{ color: "#555" }}>
                    <p>
                      <strong>Email:</strong> {personal.email || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {personal.contactNumber?.mobile || "N/A"}
                    </p>
                    <p>
                      <strong>Education:</strong>{" "}
                      {education.medicalDegree || "N/A"},{" "}
                      {education.postGraduate || ""}
                    </p>
                    <p>
                      <strong>Specialization:</strong>{" "}
                      {education.specialization || "N/A"}
                    </p>
                    <p>
                      <strong>Current Affiliation:</strong>{" "}
                      {education.currentAffiliation || "N/A"}
                    </p>
                  </div>

                  <div className="mt-3">
                    <strong
                      className="block mb-1"
                      style={{ color: "var(--color-calm-blue)" }}
                    >
                      Work Experience:
                    </strong>
                    <ul className="list-disc list-inside text-sm text-gray-700">
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

                <button
                  className="mt-6 py-2.5 font-medium rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: "var(--dashboard-blue)",
                    color: "var(--color-white)",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--color-calm-blue)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--dashboard-blue)")
                  }
                >
                  Book Appointment
                </button>
              </div>
            );
          })
        ) : (
          <p
            className="text-center text-lg font-medium col-span-full"
            style={{ color: "var(--color-calm-blue)" }}
          >
            No doctors found for this specialization.
          </p>
        )}
      </div>
    </div>
  );
}
