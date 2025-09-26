"use client"
import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import { Calendar, Camera, Phone, User, Video, Users, Clock, MapPin } from "lucide-react";
import { use } from "react";

const page = () => {
    const { appointmentData } = use(DashBoardDataContext)
    console.log(appointmentData)
    
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--dashboard-blue)] to-blue-600 bg-clip-text text-transparent">
                            Appointments
                        </h1>
                        <p className="text-[var(--fourground-color)]/60 text-base md:text-lg">
                            Manage your medical appointments
                        </p>
                        <div className="flex items-center gap-4 text-sm text-[var(--fourground-color)]/50">
                            <span className="flex items-center gap-1">
                                <Users size={16} />
                                {appointmentData?.length || 0} Doctors
                            </span>
                            {/* <span className="flex items-center gap-1">
                                <Clock size={16} />
                                Next: Today 2:30 PM
                            </span> */}
                        </div>
                    </div>
                    <button className="w-full lg:w-auto px-6 py-3 gap-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--dashboard-blue)] to-blue-600 hover:from-blue-600 hover:to-[var(--dashboard-blue)] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group">
                        <Calendar className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                        <span>Book Appointment</span>
                    </button>
                </header>

                {/* Appointments Grid */}
                <div className="grid gap-6 md:gap-8">
                    {appointmentData?.map(({ doctorName, specialist, doctorId }) => (
                        <div 
                            key={doctorId} 
                            className="group backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-6 md:p-8 border border-[var(--dashboard-border)]/30 hover:border-[var(--dashboard-blue)]/30 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--dashboard-blue)]/5 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/5 to-transparent rounded-full blur-xl translate-y-12 -translate-x-12"></div>

                            <div className="relative z-10">
                                {/* Desktop Layout */}
                                <div className="hidden md:flex justify-between items-center">
                                    {/* Doctor Info Section */}
                                    <div className="flex gap-6 items-center flex-1">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-[var(--dashboard-blue)] to-blue-600 rounded-2xl flex justify-center items-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <User className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <p className="text-[var(--fourground-color)] font-bold text-xl group-hover:text-[var(--dashboard-blue)] transition-colors duration-300">
                                                Dr. {doctorName}
                                            </p>
                                            <p className="text-[var(--fourground-color)]/60 text-base font-medium">
                                                {specialist}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-[var(--fourground-color)]/50">
                                                {/* <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    Next: Today 2:30 PM
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    City Hospital
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 items-center">
                                        <button className="group/btn flex gap-3 items-center px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border-2 border-green-500/20 hover:border-green-500/40 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                                            <Camera size={20} className="text-green-600 group-hover/btn:scale-110 transition-transform duration-300" />
                                            <span className="text-[var(--fourground-color)] font-semibold">Video Call</span>
                                        </button>
                                        <button className="group/btn flex gap-3 items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-[var(--dashboard-blue)]/10 hover:from-blue-500/20 hover:to-[var(--dashboard-blue)]/20 border-2 border-[var(--dashboard-blue)]/20 hover:border-[var(--dashboard-blue)]/40 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                                            <Phone size={20} className="text-[var(--dashboard-blue)] group-hover/btn:scale-110 transition-transform duration-300" />
                                            <span className="text-[var(--fourground-color)] font-semibold">Call</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile Layout */}
                                <div className="md:hidden space-y-4">
                                    {/* Doctor Info */}
                                    <div className="flex gap-4 items-center">
                                        <div className="relative">
                                            <div className="w-14 h-14 bg-gradient-to-br from-[var(--dashboard-blue)] to-blue-600 rounded-xl flex justify-center items-center shadow-lg">
                                                <User className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-[var(--fourground-color)] font-bold text-lg">
                                                Dr. {doctorName}
                                            </p>
                                            <p className="text-[var(--fourground-color)]/60 text-sm font-medium">
                                                {specialist}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Appointment Details */}
                                    <div className="flex items-center gap-4 text-xs text-[var(--fourground-color)]/50 bg-[var(--dashboard-border)]/10 p-3 rounded-lg">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            Today 2:30 PM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={12} />
                                            City Hospital
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="flex gap-2 items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/20 rounded-xl shadow-md transition-all duration-300 cursor-pointer">
                                            <Camera size={18} className="text-green-600" />
                                            <span className="text-[var(--fourground-color)] font-medium text-sm">Video</span>
                                        </button>
                                        <button className="flex gap-2 items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500/10 to-[var(--dashboard-blue)]/10 border-2 border-[var(--dashboard-blue)]/20 rounded-xl shadow-md transition-all duration-300 cursor-pointer">
                                            <Phone size={18} className="text-[var(--dashboard-blue)]" />
                                            <span className="text-[var(--fourground-color)] font-medium text-sm">Call</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {(!appointmentData || appointmentData.length === 0) && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-[var(--dashboard-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar size={40} className="text-[var(--dashboard-blue)]/50" />
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--fourground-color)] mb-2">No appointments yet</h3>
                        <p className="text-[var(--fourground-color)]/60 mb-6">Book your first appointment to get started</p>
                        <button className="px-6 py-3 bg-[var(--dashboard-blue)] text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                            Book Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;