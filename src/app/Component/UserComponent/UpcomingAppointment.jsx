"use client"

import { Calendar, UserRound, X, Clock, Video, Phone, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";

const UpcomingAppointment = () => {
    const { appointmentData } = use(DashBoardDataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function formatAppointmentDate(dateString) {
        const apptDate = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (apptDate.toDateString() === today.toDateString()) return "Today";
        if (apptDate.toDateString() === yesterday.toDateString()) return "Yesterday";
        return apptDate.toDateString();
    }

    return (
        <div className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] p-8 rounded-3xl h-[26rem] max-h-[26rem] shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--dashboard-blue)]/15 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--dashboard-blue)]/10 to-transparent rounded-full blur-xl translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-gradient-to-br from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/80 rounded-2xl shadow-lg">
                            <Calendar className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--fourground-color)] to-[var(--dashboard-blue)] bg-clip-text text-transparent">
                                Upcoming Appointments
                            </h2>
                            <p className="text-[var(--fourground-color)]/60 text-sm">
                                Next 3 scheduled appointments
                            </p>
                        </div>
                    </div>
                    <button
                        className="group px-4 py-2 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span>View All</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Empty State */}
                    {(!appointmentData || appointmentData.length === 0) && (
                        <div className="flex-1 flex flex-col justify-center items-center py-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-[var(--dashboard-blue)]/20 to-[var(--dashboard-blue)]/10 rounded-full flex items-center justify-center mb-6">
                                <Calendar className="text-[var(--dashboard-blue)]" size={32} />
                            </div>
                            <p className="text-[var(--fourground-color)]/60 text-center mb-6 text-lg font-medium">
                                You have not booked any appointments yet
                            </p>
                            <Link 
                                href={"/hello"} 
                                className="group px-6 py-3 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
                            >
                                <Calendar size={18} />
                                <span>Book Your First Appointment</span>
                            </Link>
                        </div>
                    )}

                    {/* Appointments List */}
                    {appointmentData && appointmentData.length > 0 && (
                        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                            {appointmentData?.slice(0, 3)?.map((appointment, index) => (
                                <div
                                    key={appointment?.doctorName}
                                    className="group bg-[var(--dashboard-bg)] p-5 rounded-2xl border-2 border-[var(--dashboard-border)] shadow-md hover:shadow-lg hover:border-[var(--dashboard-blue)]/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Doctor Info */}
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="relative">
                                                <div className="bg-gradient-to-br from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/80 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <UserRound className="text-white" size={22} />
                                                </div>
                                                {/* Online Status Indicator */}
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-0.5"></div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-1 flex-1 min-w-0">
                                                <p className="font-bold text-[var(--fourground-color)] text-lg group-hover:text-[var(--dashboard-blue)] transition-colors duration-300">
                                                    Dr. {appointment?.doctorName}
                                                </p>
                                                <p className="text-[var(--fourground-color)]/70 text-sm font-medium">
                                                    {appointment?.specialist}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-[var(--fourground-color)]/60">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        <span>{formatAppointmentDate(appointment.appointmentDate)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={12} />
                                                        <span>Virtual</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Join Button */}
                                        <button className="group/btn px-4 py-2 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2">
                                            <Video size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                            <span>Join</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 p-4">
                    <div className="bg-gradient-to-br from-[var(--dashboard-bg)] to-[var(--card-bg)] w-full md:w-[700px] max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-300 scale-100 border-2 border-[var(--dashboard-border)]">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b-2 border-[var(--dashboard-border)]/50 bg-gradient-to-r from-[var(--card-bg)] to-[var(--sidebar-bg)]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[var(--dashboard-blue)]/20 rounded-xl">
                                    <Calendar className="text-[var(--dashboard-blue)]" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-[var(--fourground-color)]">All Appointments</h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-[var(--dashboard-border)]/20 rounded-full transition-colors duration-300 cursor-pointer group"
                            >
                                <X size={20} className="text-[var(--fourground-color)]/60 group-hover:text-red-500 transition-colors duration-300" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
                            <div className="space-y-4">
                                {appointmentData?.map((appointment, index) => (
                                    <div
                                        key={appointment?.doctorName}
                                        className="group bg-[var(--sidebar-bg)] p-5 rounded-2xl border-2 border-[var(--dashboard-border)] shadow-md hover:shadow-lg hover:border-[var(--dashboard-blue)]/30 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="relative">
                                                    <div className="bg-gradient-to-br from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/80 p-3 rounded-2xl shadow-lg">
                                                        <UserRound className="text-white" size={22} />
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-0.5"></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-1 flex-1">
                                                    <p className="font-bold text-[var(--fourground-color)] text-lg">
                                                        Dr. {appointment?.doctorName}
                                                    </p>
                                                    <p className="text-[var(--fourground-color)]/70 text-sm font-medium">
                                                        {appointment?.specialist}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-xs text-[var(--fourground-color)]/60">
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            <span>{formatAppointmentDate(appointment.appointmentDate)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MapPin size={12} />
                                                            <span>Virtual Consultation</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <button className="group/btn px-4 py-2 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2">
                                                <Video size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                                <span>Join</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: var(--dashboard-border);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--dashboard-blue);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: var(--dashboard-blue);
                }
            `}</style>
        </div>
    );
};

export default UpcomingAppointment;