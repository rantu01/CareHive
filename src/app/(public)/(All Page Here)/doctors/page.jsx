
// "use client";
// import { useUser } from "@/app/context/UserContext";
// import { useEffect, useState } from "react";
// // import { useUser } from "../context/userContext"; // make sure path is correct

// export default function DoctorsPage() {
//   const [doctors, setDoctors] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { user } = useUser(); // get logged in Firebase user

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await fetch("/api/doctors");
//         const data = await res.json();
//         setDoctors(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // Function to handle booking
//   const handleBookAppointment = async (doc) => {
//     if (!user) {
//       alert("Please log in to book an appointment.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/appointments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user.uid,
//           doctorId: doc._id,
//           doctorName: doc.personalInfo?.fullName || "Unknown Doctor",
//           specialist: doc.educationAndCredentials?.specialization || "General",
//           appointmentDate: new Date().toISOString(),
//         }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert("✅ Appointment booked successfully!");
//       } else {
//         alert("❌ Failed to book appointment: " + (result.error || ""));
//       }
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       alert("❌ Something went wrong while booking appointment.");
//     }
//   };

//   const filteredDoctors = doctors.filter((doc) =>
//     doc.educationAndCredentials?.specialization
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div
//       className="container mx-auto min-h-screen py-28 px-5"
//       style={{
//         fontFamily: "var(--font-primary)",
//         color: "var(--fourground-color)",
//       }}
//     >
//       {/* Header */}
//       <div className="text-center mb-20">
//         <h1
//           className="text-5xl font-extrabold mb-2"
//           style={{
//             fontFamily: "var(--font-heading)",
//             color: "var(--color-calm-blue)",
//           }}
//         >
//           Meet Our <span className="text-6xl">E</span>xpert Doctors
//         </h1>

//         <p
//           className="max-w-3xl mx-auto text-lg"
//           style={{
//             fontFamily: "var(--font-primary)",
//             color: "var(--fourground-color)",
//           }}
//         >
//           Find highly skilled medical professionals. Use the search to quickly
//           locate your specialist.
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="flex justify-center mb-20">
//         <div className="relative w-full sm:w-1/2">
//           <input
//             type="text"
//             placeholder="🔍 Search by specialization..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-6 py-3 rounded-full shadow-lg focus:outline-none focus:ring-4 transition duration-300"
//             style={{
//               border: "2px solid var(--dashboard-blue)",
//               color: "var(--fourground-color)",
//               fontFamily: "var(--font-primary)",
//             }}
//           />
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute right-5 top-1/2 transform -translate-y-1/2 transition-colors"
//               style={{ color: "var(--fourground-color)" }}
//             >
//               ✖
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Doctors Grid */}
//       <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {filteredDoctors.length > 0 ? (
//           filteredDoctors.map((doc) => {
//             const personal = doc.personalInfo || {};
//             const education = doc.educationAndCredentials || {};
//             const experienceYears =
//               education.workExperience?.reduce(
//                 (sum, exp) => sum + (exp.years || 0),
//                 0
//               ) || 0;

//             return (
//               <div
//                 key={doc._id}
//                 className="flex flex-col rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden border"
//                 style={{
//                   backgroundColor: "var(--dashboard-bg)",
//                   borderColor: "var(--dashboard-border)",
//                   fontFamily: "var(--font-primary)",
//                 }}
//               >
//                 {/* Card Header */}
//                 <div className="px-6 py-5 flex flex-col items-start space-y-2">
//                   <h2
//                     className="text-2xl font-bold"
//                     style={{
//                       fontFamily: "var(--font-heading)",
//                       color: "var(--fourground-color)",
//                     }}
//                   >
//                     {personal.fullName || "N/A"}
//                   </h2>
//                   <span
//                     className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white whitespace-nowrap"
//                     style={{
//                       background: "var(--color-light-green)",
//                       fontFamily: "var(--font-primary)",
//                     }}
//                   >
//                     {education.specialization || "General"}
//                   </span>
//                 </div>

//                 {/* Doctor Info */}
//                 <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
//                   {/* Email & Phone */}
//                   <div
//                     className="p-3 rounded-lg shadow-sm transition"
//                     style={{ backgroundColor: "var(--gray-color)" }}
//                   >
//                     <p>
//                       <strong>Email:</strong> {personal.email || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Phone:</strong>{" "}
//                       {personal.contactNumber?.mobile || "N/A"}
//                     </p>
//                   </div>

//                   {/* Education & Affiliation */}
//                   <div
//                     className="p-3 rounded-lg shadow-sm transition"
//                     style={{ backgroundColor: "var(--gray-color)" }}
//                   >
//                     <p>
//                       <strong>Education:</strong>{" "}
//                       {education.medicalDegree || "N/A"},{" "}
//                       {education.postGraduate || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Affiliation:</strong>{" "}
//                       {education.currentAffiliation || "N/A"}
//                     </p>
//                   </div>

//                   {/* Work Experience */}
//                   <div
//                     className="p-3 rounded-lg shadow-sm transition"
//                     style={{ backgroundColor: "var(--gray-color)" }}
//                   >
//                     <strong
//                       className="block mb-2 text-lg"
//                       style={{
//                         color: "var(--dashboard-blue)",
//                         fontFamily: "var(--font-alt)",
//                       }}
//                     >
//                       Work Experience:
//                     </strong>
//                     <ul className="list-disc list-inside text-sm">
//                       {education.workExperience?.length ? (
//                         education.workExperience.map((exp, i) => (
//                           <li key={i}>
//                             {exp.position} at {exp.hospitalName} (
//                             {exp.years || "N/A"} yrs)
//                           </li>
//                         ))
//                       ) : (
//                         <li>No experience data</li>
//                       )}
//                     </ul>
//                     {experienceYears >= 5 && (
//                       <span
//                         className="inline-block mt-2 px-2 py-1 text-xs font-bold rounded whitespace-nowrap"
//                         style={{
//                           backgroundColor: "var(--color-calm-blue)",
//                           color: "var(--color-white)",
//                           fontFamily: "var(--font-primary)",
//                         }}
//                       >
//                         Experienced ({experienceYears} yrs)
//                       </span>
//                     )}
//                   </div>

//                   {/* Book Appointment Button */}
//                   <div className="mt-6">
//                     <button
//                       onClick={() => handleBookAppointment(doc)}
//                       className="w-full py-3 font-semibold rounded-full text-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl whitespace-nowrap"
//                       style={{
//                         backgroundColor: "var(--color-calm-blue)",
//                         color: "var(--color-white)",
//                         fontFamily: "var(--font-heading)",
//                       }}
//                     >
//                       Book Appointment
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p
//             className="col-span-full text-center text-lg font-medium"
//             style={{
//               color: "var(--dashboard-blue)",
//               fontFamily: "var(--font-primary)",
//             }}
//           >
//             No doctors found for this specialization.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedDoctors, setBookedDoctors] = useState([]); // track booked doctors
  const { user } = useUser(); // get logged in Firebase user

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

  // Function to handle booking
  const handleBookAppointment = async (doc) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Log In",
        text: "You must be logged in to book an appointment.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          doctorId: doc._id,
          doctorName: doc.personalInfo?.fullName || "Unknown Doctor",
          specialist: doc.educationAndCredentials?.specialization || "General",
          appointmentDate: new Date().toISOString(),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setBookedDoctors((prev) => [...prev, doc._id]); // mark as booked
        Swal.fire({
          icon: "success",
          title: "Appointment Booked!",
          text: `You have successfully booked an appointment with Dr. ${doc.personalInfo?.fullName || "Doctor"}.`,
          showConfirmButton: false,
          timer: 1800,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: result.error || "Could not book appointment.",
        });
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to complete your request right now.",
      });
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
          filteredDoctors.map((doc) => {
            const personal = doc.personalInfo || {};
            const education = doc.educationAndCredentials || {};
            const experienceYears =
              education.workExperience?.reduce(
                (sum, exp) => sum + (exp.years || 0),
                0
              ) || 0;

            const isBooked = bookedDoctors.includes(doc._id);

            return (
              <div
                key={doc._id}
                className="flex flex-col rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden border"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  borderColor: "var(--dashboard-border)",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {/* Card Header */}
                <div className="px-6 py-5 flex flex-col items-start space-y-2">
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
                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white whitespace-nowrap"
                    style={{
                      background: "var(--color-light-green)",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    {education.specialization || "General"}
                  </span>
                </div>

                {/* Doctor Info */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  {/* Email & Phone */}
                  <div
                    className="p-3 rounded-lg shadow-sm transition"
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

                  {/* Education & Affiliation */}
                  <div
                    className="p-3 rounded-lg shadow-sm transition"
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

                  {/* Work Experience */}
                  <div
                    className="p-3 rounded-lg shadow-sm transition"
                    style={{ backgroundColor: "var(--gray-color)" }}
                  >
                    <strong
                      className="block mb-2 text-lg"
                      style={{
                        color: "var(--dashboard-blue)",
                        fontFamily: "var(--font-alt)",
                      }}
                    >
                      Work Experience:
                    </strong>
                    <ul className="list-disc list-inside text-sm">
                      {education.workExperience?.length ? (
                        education.workExperience.map((exp, i) => (
                          <li key={i}>
                            {exp.position} at {exp.hospitalName} (
                            {exp.years || "N/A"} yrs)
                          </li>
                        ))
                      ) : (
                        <li>No experience data</li>
                      )}
                    </ul>
                    {experienceYears >= 5 && (
                      <span
                        className="inline-block mt-2 px-2 py-1 text-xs font-bold rounded whitespace-nowrap"
                        style={{
                          backgroundColor: "var(--color-calm-blue)",
                          color: "var(--color-white)",
                          fontFamily: "var(--font-primary)",
                        }}
                      >
                        Experienced ({experienceYears} yrs)
                      </span>
                    )}
                  </div>

                  {/* Book Appointment Button */}
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
                        fontFamily: "var(--font-heading)",
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
          <p
            className="col-span-full text-center text-lg font-medium"
            style={{
              color: "var(--dashboard-blue)",
              fontFamily: "var(--font-primary)",
            }}
          >
            No doctors found for this specialization.
          </p>
        )}
      </div>
    </div>
  );
}

