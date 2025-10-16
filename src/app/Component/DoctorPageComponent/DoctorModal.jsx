import AppointmentDropdown from "./AppoinmentDropDown";

const DoctorModal = ({ selectedDoctor, setSelectedDoctor, handleBookAppointment }) => {
  if (!selectedDoctor) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: "rgba(59, 127, 129, 0.5)", // translucent calm-blue overlay
      }}
    >
      <div
        className="relative max-w-7xl w-full rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
          backdropFilter: "blur(14px)",
          color: "var(--color-white)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDoctor(null)}
          className="absolute top-6 right-6 z-60 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-white)",
          }}
          aria-label="Close modal"
        >
          ✖
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="grid lg:grid-cols-2 gap-0 min-h-full">
            {/* Left Side */}
            <div className="p-6 md:p-10 flex flex-col justify-center space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h1
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "var(--color-white)" }}
                >
                  Doctor Professional Details
                </h1>
                <p className="text-base opacity-80">
                  The Doctor Professional Detail Page displays key information including
                  specialization, experience, and achievements.
                </p>
              </div>

              {/* Professional Details */}
              <div
                className="rounded-2xl p-6 shadow-lg space-y-6"
                style={{
                  backgroundColor: "rgba(25, 180, 180, 0.25)",
                  border: "1px solid var(--color-white)",
                }}
              >
                <h2
                  className="text-xl font-bold border-b pb-2"
                  style={{
                    borderColor: "var(--color-white)",
                    color: "var(--color-white)",
                  }}
                >
                  Professional Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "❤️",
                      title: "Department",
                      text: selectedDoctor.educationAndCredentials?.specialization,
                      bg: "var(--color-primary)",
                    },
                    {
                      icon: "🏥",
                      title: "Workplace",
                      text: selectedDoctor.educationAndCredentials?.currentAffiliation,
                      bg: "var(--color-secondary)",
                    },
                    {
                      icon: "👤",
                      title: "Position",
                      text: "Head of Department",
                      bg: "var(--color-primary)",
                    },
                    {
                      icon: "⭐",
                      title: "Experience",
                      text: "15+ Years",
                      bg: "var(--color-secondary)",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: item.bg, color: "var(--color-white)" }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold opacity-80">{item.title}</p>
                          <p className="font-bold">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div
                className="rounded-2xl p-6 shadow-lg space-y-4"
                style={{
                  backgroundColor: "rgba(25, 180, 180, 0.25)",
                  border: "1px solid var(--color-white)",
                }}
              >
                <h2 className="text-xl font-bold">Educational Qualification</h2>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      icon: "🎓",
                      title:
                        selectedDoctor.educationAndCredentials?.medicalDegree?.split(",")[0] ||
                        "MBBS",
                      subtitle: "Medical Degree",
                      bg: "var(--color-primary)",
                    },
                    {
                      icon: "🏥",
                      title:
                        selectedDoctor.educationAndCredentials?.postGraduate ||
                        "MD in Cardiology",
                      subtitle: "Specialization",
                      bg: "var(--color-secondary)",
                    },
                    {
                      icon: "📜",
                      title: "Certification",
                      subtitle: "Advanced Training",
                      bg: "var(--color-primary)",
                    },
                  ].map((edu, i) => (
                    <div key={i} className="text-center space-y-2">
                      <div
                        className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: edu.bg, color: "var(--color-white)" }}
                      >
                        {edu.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{edu.title}</p>
                        <p className="text-xs opacity-80">{edu.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact & Fees */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Contact",
                    value: selectedDoctor.personalInfo?.contactNumber?.mobile,
                    sub: selectedDoctor.personalInfo?.email,
                  },
                  {
                    label: "Consultation Fees",
                    value: `Online: ৳${selectedDoctor.practiceInfo?.consultationFees?.online}`,
                    sub: `In-person: ৳${selectedDoctor.practiceInfo?.consultationFees?.inPerson}`,
                  },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 shadow-lg"
                    style={{
                      backgroundColor: "rgba(59, 127, 129, 0.25)",
                      border: "1px solid var(--color-white)",
                    }}
                  >
                    <p className="text-xs opacity-80 mb-1">{info.label}</p>
                    <p className="font-semibold text-sm">{info.value}</p>
                    <p className="text-xs opacity-80 mt-1">{info.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Doctor Image */}
            <div className="relative flex flex-col items-center justify-center p-6 md:p-10 min-h-[400px] lg:min-h-full gap-2">
              <div className="relative z-10 w-full">
                <img
                  src={selectedDoctor.practiceInfo?.profilePhoto || "/doctor-placeholder.png"}
                  alt={selectedDoctor.personalInfo?.fullName || "Doctor"}
                  className="w-full max-h-[400px] object-cover rounded-t-3xl"
                />
                <div
                  className="rounded-b-3xl p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
                  }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {selectedDoctor.personalInfo?.fullName}
                  </h2>
                  <p className="text-white text-lg font-medium">
                    {selectedDoctor.educationAndCredentials?.specialization}
                  </p>
                </div>
              </div>

              {/* Appointment Booking */}
              <div
                className="rounded-2xl p-6 shadow-lg w-full"
                style={{
                  backgroundColor: "rgba(59, 127, 129, 0.25)",
                  border: "1px solid var(--color-white)",
                }}
              >
                <AppointmentDropdown
                  selectedDoctor={selectedDoctor}
                  handleBookAppointment={handleBookAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
