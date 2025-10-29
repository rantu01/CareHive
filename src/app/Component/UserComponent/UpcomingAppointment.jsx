"use client"

import { Calendar, UserRound, Clock, Video, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { formatDate } from "@/app/utils/appoinmentPageFn";

const UpcomingAppointment = () => {
    const { appointmentData } = use(DashBoardDataContext);

    function formatAppointmentDate(dateString) {
        const apptDate = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (apptDate.toDateString() === today.toDateString()) return "Today";
        if (apptDate.toDateString() === yesterday.toDateString()) return "Yesterday";
        return apptDate.toDateString();
    }
    console.log("my appoinment data", appointmentData)
    return (
        <div>
            <div className="bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] p-8 rounded-3xl h-[26rem] max-h-[26rem] shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-light-green)]/15 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--color-light-green)]/10 rounded-full blur-xl translate-y-12 -translate-x-12"></div>

                <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-8 ">
                        <div className="flex gap-4 items-center">
                            <div className="p-3 bg-[var(--color-primary)] rounded-2xl shadow-lg">
                                <Calendar className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="font-bold text-[var(--color-primary)] text-lg md:text-xl">
                                    Upcoming Appointments
                                </h2>
                                <p className="text-[var(--color-primary)] text-sm">
                                    Next {appointmentData?.length} scheduled appointments
                                </p>
                            </div>
                        </div>
                        <Link href='/dashboard/user/appointments'
                            className="group text-sm md:text-lg px-2 md:px-4 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
                        >
                            <div className="flex items-center">
                                <span className="text-[10px] md:text-[1rem]">View All</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </Link>
                    </header>

                    {/* Content */}
                    <main className="flex-1 flex flex-col overflow-auto gap-3.5">
                        {/* Empty State */}
                        {(!appointmentData || appointmentData.length === 0) && (
                            <div className="flex-1 flex flex-col justify-center items-center py-8">
                                <div className="w-20 h-20 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mb-6">
                                    <Calendar className="text-[var(--color-primary)]" size={32} />
                                </div>
                                <p className="text-[var(--text-color-all)] text-center mb-6 text-lg font-medium">
                                    You have not booked any appointments yet
                                </p>
                                <Link
                                    href={"/doctors"}
                                    className="group px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
                                >
                                    <Calendar size={18} />
                                    <span>Book Your First Appointment</span>
                                </Link>
                            </div>
                        )}

                        {/* Appointments List */}
                        {appointmentData?.slice(0, 3)?.map((appointment, index) => (
                            <div
                                key={index}
                                className="group bg-[var(--dashboard-bg)] p-4 md:p-5 rounded-2xl border-2 border-[var(--dashboard-border)] shadow-md hover:shadow-lg hover:border-[var(--color-light-green)]/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Desktop Layout */}
                                <div className="hidden md:flex items-center justify-between">
                                    {/* Doctor Info */}

                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="relative">
                                            <div className="bg-[var(--color-primary)] p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <UserRound className="text-[var(--white)] " size={22} />
                                            </div>
                                            {/* Online Status Indicator */}
                                            {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--color-primary)]">
                                                <div className="w-1.5 h-1.5  rounded-full mx-auto mt-0.5"></div>
                                            </div> */}
                                        </div>

                                        <div className="space-y-1 flex-1 min-w-0">
                                            <p className="font-bold text-[var(--color-primary)] text-lg  transition-colors duration-300">
                                                Dr. {appointment?.doctorName}
                                            </p>
                                            <p className="text-[var(--color-light-green)]/70 text-sm font-medium">
                                                {appointment?.specialist}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-[var(--color-primary)]/60">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    <span>{formatDate(appointment?.createdAt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={12} />
                                                    <span>{appointment?.meetingType?.toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Join Button */} 
                                    {/* <Link href={appointment?.meetLink} target="_blank" className="group/btn px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2">
                                        <Video size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                        <span>Join</span>
                                    </Link> */}
                                </div>

                                {/* Mobile Layout */}
                                <div className="md:hidden space-y-4">
                                    {/* Doctor Info Row */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0">
                                            <div className="bg-[var(--color-light-green)] p-2.5 rounded-xl shadow-lg">
                                                <UserRound className="text-white" size={20} />
                                            </div>
                                            {/* Online Status Indicator */}
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--color-light-green)] rounded-full border-2 border-white">
                                                <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-[var(--color-light-green)] text-base truncate">
                                                Dr. {appointment?.doctorName}
                                            </p>
                                            <p className="text-[var(--color-light-green)]/70 text-sm font-medium truncate">
                                                {appointment?.specialist}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Appointment Details */}
                                    <div className="flex items-center gap-4 text-xs text-[var(--color-light-green)]/60 bg-[var(--dashboard-border)]/10 p-2 rounded-lg">
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} className="text-[var(--color-light-green)]" />
                                            <span>{formatDate(appointment?.bookedAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} className="text-[var(--color-light-green)]" />
                                            <span>Virtual</span>
                                        </div>
                                    </div>

                                    {/* Join Button - Full Width */}
                                    <Link
                                        href={appointment?.meetLink || "https://meet.google.com/isu-djqo-qfv"}
                                        className="group/btn w-full px-4 py-2.5 bg-[var(--color-light-green)] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                                        target="_blank" // This opens the link in a new tab
                                        rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                    >
                                        <Video size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                        <span>Join Video Call</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>

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
                        background: var(--color-light-green);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: var(--color-light-green);
                    }
                `}</style>
            </div>
        </div>
    );
};

export default UpcomingAppointment;