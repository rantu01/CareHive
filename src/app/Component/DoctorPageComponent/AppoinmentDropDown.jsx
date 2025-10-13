import { AuthContext } from "@/app/context/authContext";
import { use, useState } from "react";
import Swal from "sweetalert2";

const AppointmentDropdown = ({ selectedDoctor, handleBookAppointment }) => {



    const [selectedSlot, setSelectedSlot] = useState("");
    const [meetingType, setMeetingType] = useState("inPerson");

    const selectedDay = selectedSlot.split("-")[0];




    const handleMeetingType = (type) => {
        setMeetingType(type);
    };

    const { user } = use(AuthContext)
    // console.log(user)
    const booking = {
        doctorName: selectedDoctor.personalInfo.fullName,
        hospitalName: selectedDoctor.practiceInfo.clinicAddress,
        bookedSlot: selectedSlot,
        meetingType: meetingType,
        docId: selectedDoctor._id,
        patientName: user.displayName,
        patientEmail: user.email,
        fees: selectedDoctor.practiceInfo.consultationFees[meetingType],
        bookedAt: new Date()
    }

    const handleBooking = (booking) => {
        if (selectedDoctor.practiceInfo.patientLimit[selectedDay] === 0) {
            Swal.fire("Slot is full")
            return
        } else {
            return handleBookAppointment(booking)
        }
    }


    const workingHours = selectedDoctor.practiceInfo?.workingHours || {};


    const consultationType = selectedDoctor.practiceInfo?.consultationType;

    const meetingButtons = (
        <div className={`grid ${consultationType === "both" ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
            {(consultationType === "inPerson" || consultationType === "both") && (
                <button
                    onClick={() => handleMeetingType("inPerson")}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${meetingType === "inPerson" ? "scale-105" : "hover:scale-102"
                        }`}
                    style={{
                        backgroundColor: meetingType === "inPerson" ? 'var(--color-calm-blue)' : 'var(--dashboard-bg)',
                        borderColor: meetingType === "inPerson" ? 'var(--color-calm-blue)' : 'var(--dashboard-border)',
                        color: meetingType === "inPerson" ? 'white' : 'var(--fourground-color)',
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">🏥</span>
                        <span className="font-semibold text-sm">In-Person</span>
                        <span className="text-xs opacity-80">
                            ৳{selectedDoctor.practiceInfo?.consultationFees?.inPerson}
                        </span>
                    </div>
                    {meetingType === "inPerson" && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <span className="text-xs">✓</span>
                        </div>
                    )}
                </button>
            )}

            {(consultationType === "online" || consultationType === "both") && (
                <button
                    onClick={() => handleMeetingType("online")}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${meetingType === "online" ? "scale-105" : "hover:scale-102"
                        }`}
                    style={{
                        backgroundColor: meetingType === "online" ? 'var(--color-calm-blue)' : 'var(--dashboard-bg)',
                        borderColor: meetingType === "online" ? 'var(--color-calm-blue)' : 'var(--dashboard-border)',
                        color: meetingType === "online" ? 'white' : 'var(--fourground-color)',
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">💻</span>
                        <span className="font-semibold text-sm">Online</span>
                        <span className="text-xs opacity-80">
                            ৳{selectedDoctor.practiceInfo?.consultationFees?.online}
                        </span>
                    </div>
                    {meetingType === "online" && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <span className="text-xs">✓</span>
                        </div>
                    )}
                </button>
            )}
        </div>
    );

    return (
        <div className="space-y-5">
            {/* Meeting Type Selection */}
            <div className="space-y-3">
                <label className="block text-base font-semibold" style={{ color: 'var(--fourground-color)' }}>
                    Consultation Type
                </label>
                {meetingButtons}
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-3">
                <label className="block text-base font-semibold" style={{ color: 'var(--fourground-color)' }}>
                    Select Appointment Time
                </label>
                <select
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-base"
                    style={{
                        backgroundColor: 'var(--dashboard-bg)',
                        borderColor: 'var(--dashboard-border)',
                        color: 'var(--fourground-color)',
                    }}
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                >
                    <option value="">-- Select a time slot --</option>
                    {Object.entries(workingHours).map(([day, time]) => (
                        <option key={day} value={`${day}-${time}`}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}: {time}
                        </option>
                    ))}
                </select>
            </div>

            {/* Confirmation Message */}
            {selectedSlot && (
                <div className="flex items-start gap-3 p-4 rounded-xl animate-fadeIn" style={{ backgroundColor: 'var(--dashboard-border)' }}>
                    <span className="text-xl">✅</span>
                    <div className="flex-1">
                        <p className="font-semibold text-sm" style={{ color: 'var(--color-calm-blue)' }}>
                            Appointment Confirmed
                        </p>
                        <p className="text-xs opacity-80 mt-1">
                            {meetingType === "online" ? "Online" : "In-Person"} consultation on <strong>{selectedSlot}</strong>
                        </p>
                    </div>
                </div>
            )}

            {/* Book Button */}
            {selectedSlot && (
                <button
                    onClick={() => handleBooking(booking)}
                    className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                    style={{ backgroundColor: 'var(--color-calm-blue)' }}
                >
                    Confirm Booking
                </button>
            )}
        </div>
    );
};


export default AppointmentDropdown