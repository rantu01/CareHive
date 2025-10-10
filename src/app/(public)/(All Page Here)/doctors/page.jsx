
"use client";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedDoctors, setBookedDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // 👈 for modal
  const { user } = useUser();

  // Fetch all doctors
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

  // Fetch booked appointments
  useEffect(() => {
    const fetchBookedAppointments = async () => {
      if (!user) {
        setBookedDoctors([]);
        return;
      }
      try {
        const res = await fetch(`/api/appointments?userId=${user.uid}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const bookedIds = data.map((appointment) => appointment.doctorId);
          setBookedDoctors(bookedIds);
        }
      } catch (error) {
        console.error("Error fetching booked appointments:", error);
      }
    };
    fetchBookedAppointments();
  }, [user]);

  // Book appointment
  const handleBookAppointment = async (doc) => {
    try {

      const response=await axios.post('/api/payment',{
        name:"Dip Chondo Partho",
        price:1500
      })

      const responseData=await response.data
      window.location.href=responseData.url
      console.log("the response data",responseData.sucess)


    } catch (error) {
      console.log(error)
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.educationAndCredentials?.specialization
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="container mx-auto min-h-screen py-28 px-5"
      style={{
        fontFamily: "var(--font-primary)",
        color: "var(--fourground-color)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-20">
        <h1
          className="text-5xl font-extrabold mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-calm-blue)",
          }}
        >
          Meet Our <span className="text-6xl">E</span>xpert Doctors
        </h1>
        <p
          className="max-w-3xl mx-auto text-lg"
          style={{
            fontFamily: "var(--font-primary)",
            color: "var(--fourground-color)",
          }}
        >
          Find highly skilled medical professionals. Use the search to quickly
          locate your specialist.
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
            className="w-full px-6 py-3 rounded-full shadow-lg focus:outline-none focus:ring-4 transition duration-300"
            style={{
              border: "2px solid var(--dashboard-blue)",
              color: "var(--fourground-color)",
              fontFamily: "var(--font-primary)",
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 transition-colors"
              style={{ color: "var(--fourground-color)" }}
            >
              ✖
            </button>
          )}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors?.map((doc) => {
            const personal = doc.personalInfo || {};
            const education = doc.educationAndCredentials || {};
            const practice = doc.practiceInfo || {};
            const isBooked = bookedDoctors.includes(doc._id);

            return (
              <div
                key={doc._id}
                className="flex flex-col rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden border"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  borderColor: "var(--dashboard-border)",
                }}
              >
                {/* Card Header */}
                <div className="px-6 py-5 flex justify-between items-center">
                  <div>
                    <h2
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--fourground-color)",
                      }}
                    >
                      {personal.fullName || "N/A"}
                    </h2>
                    <span
                      className="inline-block px-3 py-1 mt-1 rounded-full text-sm font-semibold text-white"
                      style={{
                        background: "var(--color-light-green)",
                      }}
                    >
                      {education.specialization || "General"}
                    </span>
                  </div>

                  {/* Details Button */}
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="px-3 py-2 rounded-full font-medium text-white text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: "var(--dashboard-blue)",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Details
                  </button>
                </div>

                {/* Doctor Info */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div
                    className="p-3 rounded-lg shadow-sm"
                    style={{ backgroundColor: "var(--gray-color)" }}
                  >
                    <p>
                      <strong>Email:</strong> {personal.email || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {personal.contactNumber?.mobile || "N/A"}
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-lg shadow-sm"
                    style={{ backgroundColor: "var(--gray-color)" }}
                  >
                    <p>
                      <strong>Education:</strong>{" "}
                      {education.medicalDegree || "N/A"},{" "}
                      {education.postGraduate || "N/A"}
                    </p>
                    <p>
                      <strong>Affiliation:</strong>{" "}
                      {education.currentAffiliation || "N/A"}
                    </p>
                  </div>

                  {/* Book Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleBookAppointment(doc)}
                      disabled={isBooked}
                      className={`w-full py-3 font-semibold rounded-full text-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl whitespace-nowrap ${
                        isBooked
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:bg-opacity-90"
                      }`}
                      style={{
                        backgroundColor: isBooked
                          ? "gray"
                          : "var(--color-calm-blue)",
                        color: "var(--color-white)",
                      }}
                    >
                      {isBooked ? "Appointment Booked ✅" : "Book Appointment"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-lg font-medium">
            No doctors found for this specialization.
          </p>
        )}
      </div>

      {/* MODAL */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div
            className="relative max-w-3xl w-full mx-4 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
            style={{
              backgroundColor: "var(--dashboard-bg)",
              color: "var(--fourground-color)",
              border: "2px solid var(--dashboard-border)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-2xl font-bold hover:scale-110 transition"
              style={{ color: "var(--color-calm-blue)" }}
            >
              ✖
            </button>

            {/* Doctor Info */}
            <div className="p-8 space-y-5">
              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedDoctor.practiceInfo?.profilePhoto || "/doctor-placeholder.png"}
                  alt="Doctor"
                  className="w-40 h-40 rounded-full mb-4 border-4"
                  style={{ borderColor: "var(--dashboard-blue)" }}
                />
                <h2
                  className="text-3xl font-extrabold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {selectedDoctor.personalInfo?.fullName}
                </h2>
                <p>{selectedDoctor.educationAndCredentials?.specialization}</p>
              </div>

              <hr style={{ borderColor: "var(--dashboard-border)" }} />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Personal Info</h3>
                <p><strong>Email:</strong> {selectedDoctor.personalInfo?.email}</p>
                <p><strong>Phone:</strong> {selectedDoctor.personalInfo?.contactNumber?.mobile}</p>
                <p><strong>Address:</strong> {selectedDoctor.personalInfo?.address?.current}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Education & Experience</h3>
                <p><strong>Degree:</strong> {selectedDoctor.educationAndCredentials?.medicalDegree}</p>
                <p><strong>Post Graduate:</strong> {selectedDoctor.educationAndCredentials?.postGraduate}</p>
                <p><strong>Affiliation:</strong> {selectedDoctor.educationAndCredentials?.currentAffiliation}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Practice Info</h3>
                <p><strong>Clinic:</strong> {selectedDoctor.practiceInfo?.clinicAddress}</p>
                <p><strong>Languages:</strong> {selectedDoctor.practiceInfo?.languagesSpoken?.join(", ")}</p>
                <p>
                  <strong>Fees:</strong> Online ৳{selectedDoctor.practiceInfo?.consultationFees?.online} | In-person ৳{selectedDoctor.practiceInfo?.consultationFees?.inPerson}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

