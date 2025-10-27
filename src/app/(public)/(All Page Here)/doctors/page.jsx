"use client";
import DoctorCard from "@/app/Component/DoctorPageComponent/DoctorCard";
import DoctorModal from "@/app/Component/DoctorPageComponent/DoctorModal";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedDoctors, setBookedDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8; // adjust as needed

  // Filter
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [consultationFilter, setConsultationFilter] = useState("All");

  // ✅ Handle appointment booking
  const handleBookAppointment = async (booking) => {
    try {
      const response = await axios.post("/api/payment", booking);
      const responseData = response.data;
      window.location.href = responseData.url;
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch all doctors
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

  // 🔹 Filtered Doctors with search & filters
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const personal = doc.personalInfo || {};
      const education = doc.educationAndCredentials || {};
      const practice = doc.practiceInfo || {};

      const combinedFields = `
        ${personal.fullName || ""}
        ${personal.gender || ""}
        ${education.specialization || ""}
        ${education.medicalDegree || ""}
        ${education.postGraduate || ""}
        ${education.university?.name || ""}
        ${practice.clinicAddress || ""}
        ${practice.consultationType || ""}
        ${practice.languagesSpoken?.join(" ") || ""}
      `.toLowerCase();

      const matchesSearch = combinedFields.includes(searchTerm.toLowerCase());

      const matchesSpecialization =
        specializationFilter === "All" || education.specialization === specializationFilter;

      const matchesConsultation =
        consultationFilter === "All" || practice.consultationType === consultationFilter;

      return matchesSearch && matchesSpecialization && matchesConsultation;
    });
  }, [doctors, searchTerm, specializationFilter, consultationFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLast = currentPage * doctorsPerPage;
  const indexOfFirst = indexOfLast - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirst, indexOfLast);

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div
      className="container mx-auto min-h-screen py-28 px-5"
      style={{ fontFamily: "var(--font-primary)", color: "var(--text-color-all)" }}
    >
      {/* Header */}
      <div className="text-center mb-20">
        <h1
          className="text-5xl font-extrabold mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-secondary)" }}
        >
          Meet Our <span className="text-6xl">E</span>xpert Doctors
        </h1>
        <p className="max-w-3xl mx-auto text-lg">
          Find highly skilled medical professionals. Use the search and filters to locate your specialist.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-center mb-10">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="🔍 Search by name, specialization, hospital..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-6 py-3 rounded-full shadow-lg focus:outline-none focus:ring-4 transition duration-300"
            style={{ border: "2px solid var(--dashboard-blue)" }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-5 top-1/2 transform -translate-y-1/2"
            >
              ✖
            </button>
          )}
        </div>

        {/* Specialization Filter */}
        <select
          value={specializationFilter}
          onChange={(e) => {
            setSpecializationFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 rounded-full shadow-lg focus:outline-none focus:ring-4 transition duration-300"
        >
          <option value="All">All Specializations</option>
          {Array.from(new Set(doctors.map((d) => d.educationAndCredentials?.specialization).filter(Boolean)))
            .map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
        </select>

        {/* Consultation Type Filter */}
        <select
          value={consultationFilter}
          onChange={(e) => {
            setConsultationFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 rounded-full shadow-lg focus:outline-none focus:ring-4 transition duration-300"
        >
          <option value="All">All Consultation Types</option>
          {Array.from(new Set(doctors.map((d) => d.practiceInfo?.consultationType).filter(Boolean)))
            .map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
        </select>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentDoctors.length > 0 ? (
          currentDoctors.map((doc) => {
            const personal = doc.personalInfo || {};
            const education = doc.educationAndCredentials || {};
            const practice = doc.practiceInfo || {};
            const isBooked = bookedDoctors.includes(doc._id);

            return (
              <DoctorCard
                key={doc._id}
                handleBookAppointment={handleBookAppointment}
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                doc={doc}
                personal={personal}
                education={education}
                practice={practice}
                isBooked={isBooked}
              />
            );
          })
        ) : (
          <p className="col-span-full text-center text-lg font-medium">
            No doctors found matching your search or filters.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full border ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full border ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedDoctor && (
        <DoctorModal
          handleBookAppointment={handleBookAppointment}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
        />
      )}
    </div>
  );
}
