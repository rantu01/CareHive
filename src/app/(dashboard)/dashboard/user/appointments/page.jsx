
"use client"
import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import { formatDate, parseTimeSlot } from "@/app/utils/appoinmentPageFn";
import { Calendar, Camera, Phone, User, Clock, MapPin, Building2, Hash, CreditCard, Video } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const page = () => {
    const { appointmentData } = use(DashBoardDataContext);

    console.log("appointment data is", appointmentData);


    return (
        <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4 md:gap-6">
                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--color-light-green)] to-emerald-500 bg-clip-text text-transparent">
                            My Appointments
                        </h1>
                        <p className="text-[var(--fourground-color)]/60 text-sm sm:text-base md:text-lg">
                            View and manage your medical appointments
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[var(--fourground-color)]/50">
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Calendar size={14} className="sm:w-4 sm:h-4" />
                                {appointmentData?.length || 0} Appointments
                            </span>
                        </div>
                    </div>
                    <Link href={"/doctors"} className="w-full lg:w-auto px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 gap-2 sm:gap-3 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-[var(--color-light-green)] to-emerald-500 hover:from-emerald-500 hover:to-[var(--color-light-green)] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group">
                        <Calendar className="group-hover:rotate-12 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Book New Appointment</span>
                    </Link>
                </header>

                {/* Appointments List */}
                <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    {appointmentData?.map(({ doctorName, hospitalName, bookedAt, bookedSlot, meetingType, serialNo, fees, docId }) => (
                        <div 
                            key={bookedAt} 
                            className="group backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-[var(--dashboard-border)]/30 hover:border-[var(--color-light-green)]/30 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-[var(--color-light-green)]/5 to-transparent rounded-full blur-2xl -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tr from-emerald-400/5 to-transparent rounded-full blur-xl translate-y-10 sm:translate-y-12 -translate-x-10 sm:-translate-x-12"></div>

                            <div className="relative z-10">
                                {/* Main Content */}
                                <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6">
                                    {/* Left Section - Doctor Info */}
                                    <div className="flex gap-3 sm:gap-4 md:gap-5 items-start flex-1">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[var(--color-light-green)] to-emerald-500 rounded-xl sm:rounded-2xl flex justify-center items-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <User className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 sm:space-y-2.5 md:space-y-3 flex-1 min-w-0">
                                            <div>
                                                <p className="text-[var(--fourground-color)] font-bold text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-[var(--color-light-green)] transition-colors duration-300 truncate">
                                                    Dr. {doctorName}
                                                </p>
                                                <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                                                    <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[var(--fourground-color)]/50" />
                                                    <p className="text-[var(--fourground-color)]/60 text-xs sm:text-sm md:text-base font-medium truncate">
                                                        {hospitalName}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Appointment Details Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-3">
                                                <div className="flex items-center gap-2 sm:gap-2.5 bg-[var(--dashboard-border)]/10 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl">
                                                    <div className="p-1.5 sm:p-2 bg-[var(--color-light-green)]/10 rounded-lg">
                                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-light-green)]" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[var(--fourground-color)]/50 text-[10px] sm:text-xs font-medium">Booked On</p>
                                                        <p className="text-[var(--fourground-color)] text-xs sm:text-sm font-semibold truncate">
                                                            {formatDate(bookedAt)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 sm:gap-2.5 bg-[var(--dashboard-border)]/10 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl">
                                                    <div className="p-1.5 sm:p-2 bg-emerald-500/10 rounded-lg">
                                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[var(--fourground-color)]/50 text-[10px] sm:text-xs font-medium">Time Slot</p>
                                                        <p className="text-[var(--fourground-color)] text-xs sm:text-sm font-semibold truncate">
                                                            {parseTimeSlot(bookedSlot)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 sm:gap-2.5 bg-[var(--dashboard-border)]/10 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl">
                                                    <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg">
                                                        <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[var(--fourground-color)]/50 text-[10px] sm:text-xs font-medium">Serial No</p>
                                                        <p className="text-[var(--fourground-color)] text-xs sm:text-sm font-semibold">
                                                            #{serialNo}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 sm:gap-2.5 bg-[var(--dashboard-border)]/10 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl">
                                                    <div className="p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
                                                        <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[var(--fourground-color)]/50 text-[10px] sm:text-xs font-medium">Fees</p>
                                                        <p className="text-[var(--fourground-color)] text-xs sm:text-sm font-semibold">
                                                            ৳{fees}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section - Action Buttons */}
                                    <div className="flex flex-col gap-2.5 sm:gap-3 lg:min-w-[200px]">
                                        {meetingType === "online" ? (
                                            <button className="group/btn flex gap-2 sm:gap-2.5 md:gap-3 items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border-2 border-green-500/20 hover:border-green-500/40 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                                                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 group-hover/btn:scale-110 transition-transform duration-300" />
                                                <span className="text-[var(--fourground-color)] font-semibold text-sm sm:text-base">Join Video Call</span>
                                            </button>
                                        ) : (
                                            <button className="group/btn flex gap-2 sm:gap-2.5 md:gap-3 items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[var(--color-light-green)]/10 to-emerald-500/10 hover:from-[var(--color-light-green)]/20 hover:to-emerald-500/20 border-2 border-[var(--color-light-green)]/20 hover:border-[var(--color-light-green)]/40 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-light-green)] group-hover/btn:scale-110 transition-transform duration-300" />
                                                <span className="text-[var(--fourground-color)] font-semibold text-sm sm:text-base">In-Person Visit</span>
                                            </button>
                                        )}
                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {(!appointmentData || appointmentData.length === 0) && (
                    <div className="text-center py-12 sm:py-16 md:py-20">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[var(--color-light-green)]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <Calendar className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[var(--color-light-green)]/50" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--fourground-color)] mb-2 sm:mb-3">No appointments yet</h3>
                        <p className="text-sm sm:text-base text-[var(--fourground-color)]/60 mb-4 sm:mb-6">Book your first appointment to get started</p>
                        <Link href={"/doctors"} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[var(--color-light-green)] to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                            Browse Doctors
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;