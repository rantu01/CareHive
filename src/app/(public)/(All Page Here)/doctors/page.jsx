
"use client";
import DoctorCard from "@/app/Component/DoctorPageComponent/DoctorCard";
import DoctorModal from "@/app/Component/DoctorPageComponent/DoctorModal";
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



  const handleBookAppointment = async (booking) => {
    
    try {

      const response = await axios.post('/api/payment', booking)

      const responseData = await response.data


      console.log("the response data is 🔥🔥🔥🔥🔥🔥",responseData)
      window.location.href = responseData.url
      console.log("the response data", responseData.sucess)


    } catch (error) {
      console.log(error)
    }
  };

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


  const filteredDoctors = doctors?.filter((doc) =>
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
              <DoctorCard handleBookAppointment={handleBookAppointment} key={doc._id} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} doc={doc} personal={personal} education={education} practice={practice} isBooked={isBooked} />
            );
          })
        ) : (
          <p className="col-span-full text-center text-lg font-medium">
            No doctors found for this specialization.
          </p>
        )}
      </div>

      {/* MODAL */}
      {selectedDoctor && <DoctorModal handleBookAppointment={handleBookAppointment} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />}


    </div>
  );
}

