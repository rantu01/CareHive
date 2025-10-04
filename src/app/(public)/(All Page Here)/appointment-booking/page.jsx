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
    <div
      className="min-h-screen py-28 px-5"
      style={{ backgroundColor: "var(--gray-color)" }}
    >
      {/* Header */}
      <div
        className="text-center mb-16 py-14 px-6 rounded-3xl shadow-lg"
        style={{
          background: "linear-gradient(135deg, var(--color-calm-blue), var(--dashboard-blue))",
          color: "var(--color-white)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Meet Our Expert Doctors
        </h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          Discover our highly skilled and compassionate medical professionals. Use the search below to find the specialist you need.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-16">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="🔍 Search by specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-full shadow-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            style={{
              backgroundColor: "var(--color-white)",
              border: "2px solid var(--dashboard-blue)",
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
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => {
            const personal = doc.personalInfo || {};
            const education = doc.educationAndCredentials || {};

            return (
              <div
                key={doc._id}
                className="flex flex-col rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border-l-4"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  borderColor: "var(--dashboard-border)",
                  borderLeftColor: "var(--dashboard-blue)", // accent left border
                }}
              >
                {/* Doctor Name */}
                <div className="px-6 py-4 bg-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">{personal.fullName || "N/A"}</h2>
                  <p className="text-sm text-gray-600">{education.specialization || "General"}</p>
                </div>

                {/* Doctor Details */}
                <div className="p-6 flex flex-col flex-1 space-y-3 text-gray-700">
                  <p><strong>Email:</strong> {personal.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {personal.contactNumber?.mobile || "N/A"}</p>
                  <p><strong>Education:</strong> {education.medicalDegree || "N/A"}, {education.postGraduate || "N/A"}</p>
                  <p><strong>Affiliation:</strong> {education.currentAffiliation || "N/A"}</p>

                  {/* Work Experience */}
                  <div>
                    <strong className="block mb-2" style={{ color: "var(--color-calm-blue)" }}>
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
                  </div>

                  {/* Book Appointment Button */}
                  <button
                    className="mt-4 py-3 font-semibold rounded-xl shadow-md text-white transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, var(--dashboard-blue), var(--color-calm-blue))",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "linear-gradient(135deg, var(--color-calm-blue), var(--dashboard-blue))")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "linear-gradient(135deg, var(--dashboard-blue), var(--color-calm-blue))")
                    }
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-lg font-medium" style={{ color: "var(--color-calm-blue)" }}>
            No doctors found for this specialization.
          </p>
        )}
      </div>
    </div>
  );
}
