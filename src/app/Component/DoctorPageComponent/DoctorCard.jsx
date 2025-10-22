import axios from 'axios';
import React from 'react';

const DoctorCard = ({ doc, personal, education, practice, isBooked, setSelectedDoctor }) => {

    return (
        <div
            className="flex flex-col rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-full max-w-sm"
            style={{
                backgroundColor: "var(--dashboard-bg)",
                borderColor: "var(--dashboard-border)",
            }}
        >
            {/* Doctor Image Section */}
            <div className="relative">
                <div
                    className="w-full h-[14rem] flex items-center justify-center overflow-hidden"
                    style={{
                        backgroundColor: "var(--bg-color-all)",
                    }}
                >
                    {practice?.profilePhoto ? (
                        <img
                            src={practice.profilePhoto}
                            alt={personal.fullName || "Doctor"}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-center" style={{ color: "var(--text-color-all)" }}>
                            <svg className="w-24 h-24 mx-auto mb-2 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <p className="text-sm opacity-50">No Image</p>
                        </div>
                    )}
                </div>

                {/* Experience Badge */}
                {practice?.yearsOfExperience && (
                    <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-white)",
                        }}
                    >
                        {practice.yearsOfExperience} years of experience
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col space-y-4">
                {/* Doctor Name */}
                <h2
                    className="text-2xl font-bold"
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--text-color-all)",
                    }}
                >
                    {personal.fullName ? `${personal.fullName.slice(0, 20)}${personal.fullName > 20 ? '...' : ''}` : "General Practitioner"}

                </h2>

                {/* Rating and Reviews */}
                {/* <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <span style={{ color: "#FFA500" }}>★★★★</span>
                        <span style={{ color: "var(--text-color-all)", opacity: 0.3 }}>★</span>
                        <span
                            className="ml-1 text-sm font-medium"
                            style={{ color: "var(--text-color-all)" }}
                        >
                            4.5
                        </span>
                    </div>
                    <div
                        className="flex items-center gap-1 text-sm"
                        style={{ color: "var(--text-color-all)", opacity: 0.7 }}
                    >
                        <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-white)" }}
                        >
                            ✓
                        </span>
                        <span>14</span>
                    </div>
                </div> */}

                {/* Specialization */}
                <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-color-all)", opacity: 0.8 }}
                >
                    {education.specialization || "General Practitioner"}
                </p>

                <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-color-all)", opacity: 0.8 }}
                >
                    {practice.clinicAddress ? `${practice.clinicAddress.slice(0, 27)}${practice.clinicAddress.length > 27 ? '...' : ''}` : "General Practitioner"}
                </p>


                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    {/* <button
                        onClick={() => handleBookAppointment()}
                        disabled={isBooked}
                        className={`py-3 px-4 font-semibold rounded-xl text-sm transition-all duration-300 cursor-pointer ${isBooked ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                            }`}
                        style={{
                            backgroundColor: isBooked ? "gray" : "#FF6B35",
                            color: "var(--color-white)",
                        }}
                    >
                        {isBooked ? "Booked ✅" : "Book appointment"}
                    </button> */}

                    <button
                        onClick={() => setSelectedDoctor(doc)}
                        className="flex-1 py-3 px-4 font-semibold rounded-xl text-sm transition-all duration-300 hover:opacity-90 cursor-pointer"
                        style={{
                            backgroundColor: "#1A3A3A",
                            color: "var(--color-white)",
                        }}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;