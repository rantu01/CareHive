import AppointmentDropdown from "./AppoinmentDropDown";

const DoctorModal = ({ selectedDoctor, setSelectedDoctor,handleBookAppointment }) => {
    if (!selectedDoctor) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50 p-4">
            <div
                className="relative max-w-7xl w-full rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
                style={{
                    background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(251, 207, 232, 0.3) 100%)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setSelectedDoctor(null)}
                    className="absolute top-6 right-6 z-60 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90 bg-white bg-opacity-80 backdrop-blur-sm cursor-pointer"
                    style={{ color: 'var(--color-calm-blue)' }}
                    aria-label="Close modal"
                >
                    <span className="text-xl font-bold">✖</span>
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1">
                    <div className="grid lg:grid-cols-2 gap-0 min-h-full">
                        {/* Left Side - Details */}
                        <div className="p-6 md:p-10 flex flex-col justify-center space-y-6">
                            {/* Header */}
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--fourground-color)' }}>
                                    Doctor Professional Details
                                </h1>
                                <p className="text-base opacity-80" style={{ color: 'var(--fourground-color)' }}>
                                    The Doctor Professional Detail Page displays key information, including specialization, experience and achievements.
                                </p>
                            </div>

                            {/* Professional Details Card */}
                            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
                                <h2 className="text-xl font-bold" style={{ color: 'var(--fourground-color)' }}>
                                    Professional Details
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Department */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-50">
                                                <span className="text-xl">❤️</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold opacity-70">Department</p>
                                                <p className="font-bold" style={{ color: 'var(--fourground-color)' }}>
                                                    {selectedDoctor.educationAndCredentials?.specialization}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-xs opacity-70 leading-relaxed">
                                            The {selectedDoctor.educationAndCredentials?.specialization} Department focuses on diagnosing and treating heart conditions, offering advanced care.
                                        </p>
                                    </div>

                                    {/* Workplace */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-50">
                                                <span className="text-xl">🏥</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold opacity-70">Workplace</p>
                                                <p className="font-bold" style={{ color: 'var(--fourground-color)' }}>
                                                    {selectedDoctor.educationAndCredentials?.currentAffiliation}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-xs opacity-70 leading-relaxed">
                                            At {selectedDoctor.educationAndCredentials?.currentAffiliation}, providing specialized care with a patient-focused approach.
                                        </p>
                                    </div>

                                    {/* Position */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                                                <span className="text-xl">👤</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold opacity-70">Position</p>
                                                <p className="font-bold" style={{ color: 'var(--fourground-color)' }}>
                                                    Head of Department
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-xs opacity-70 leading-relaxed">
                                            Leading the team, overseeing patient care, research, and advanced treatments, ensuring high-quality care.
                                        </p>
                                    </div>

                                    {/* Experience */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-50">
                                                <span className="text-xl">⭐</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold opacity-70">Experience</p>
                                                <p className="font-bold" style={{ color: 'var(--fourground-color)' }}>
                                                    15+ Years
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-xs opacity-70 leading-relaxed">
                                            A highly experienced specialist with expertise in heart disease, hypertension, and advanced cardiac care.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Educational Qualification Card */}
                            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4">
                                <h2 className="text-xl font-bold" style={{ color: 'var(--fourground-color)' }}>
                                    Educational Qualification
                                </h2>

                                <div className="grid grid-cols-3 gap-4">
                                    {/* MBBS */}
                                    <div className="text-center space-y-2">
                                        <div className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center bg-blue-50">
                                            <span className="text-2xl">🎓</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm" style={{ color: 'var(--fourground-color)' }}>
                                                {selectedDoctor.educationAndCredentials?.medicalDegree?.split(',')[0] || 'MBBS'}
                                            </p>
                                            <p className="text-xs opacity-70">Medical Degree</p>
                                        </div>
                                    </div>

                                    {/* MD */}
                                    <div className="text-center space-y-2">
                                        <div className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center bg-green-50">
                                            <span className="text-2xl">🏥</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm" style={{ color: 'var(--fourground-color)' }}>
                                                {selectedDoctor.educationAndCredentials?.postGraduate || 'MD in Cardiology'}
                                            </p>
                                            <p className="text-xs opacity-70">Specialization</p>
                                        </div>
                                    </div>

                                    {/* Certification */}
                                    <div className="text-center space-y-2">
                                        <div className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center bg-orange-50">
                                            <span className="text-2xl">📜</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm" style={{ color: 'var(--fourground-color)' }}>
                                                Certification
                                            </p>
                                            <p className="text-xs opacity-70">Advanced Training</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact & Fees */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                    <p className="text-xs opacity-70 mb-1">Contact</p>
                                    <p className="font-semibold text-sm" style={{ color: 'var(--fourground-color)' }}>
                                        {selectedDoctor.personalInfo?.contactNumber?.mobile}
                                    </p>
                                    <p className="text-xs opacity-70 mt-1">{selectedDoctor.personalInfo?.email}</p>
                                </div>
                                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                    <p className="text-xs opacity-70 mb-1">Consultation Fees</p>
                                    <p className="font-semibold text-sm" style={{ color: 'var(--fourground-color)' }}>
                                        Online: ৳{selectedDoctor.practiceInfo?.consultationFees?.online}
                                    </p>
                                    <p className="text-xs opacity-70 mt-1">In-person: ৳{selectedDoctor.practiceInfo?.consultationFees?.inPerson}</p>
                                </div>
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
                                        background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.8) 0%, rgba(251, 207, 232, 0.8) 100%)',
                                        backdropFilter: 'blur(10px)',
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
                            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 shadow-lg w-full">
                                <AppointmentDropdown selectedDoctor={selectedDoctor} handleBookAppointment={handleBookAppointment} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorModal