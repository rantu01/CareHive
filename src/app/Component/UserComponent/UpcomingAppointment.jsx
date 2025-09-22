
"use client"

import { Calendar, UserRound, X } from "lucide-react";
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
        <div className="border border-[var(--dashboard-border)] p-6 rounded-xl h-[24.5rem] max-h-[24.5rem] max-w-9/12 mx-auto shadow-md bg-[var(--dashboard-bg)]">
            <header className="flex justify-between items-center mb-6">
                <div className="flex gap-2 items-center text-xl font-semibold text-[var(--fourground-color)]">
                    <Calendar color="var(--dashboard-blue)" size={22} />
                    Upcoming Appointments
                </div>
                <button
                    className="bg-[var(--dashboard-blue)] text-white font-medium p-2 px-4 rounded-lg transition-colors cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    View All
                </button>
            </header>

            <main className="flex flex-col gap-3 overflow-y-auto max-h-[17rem]">
                {
                    (!appointmentData || appointmentData.length === 0) &&
                    <div className="flex flex-col justify-center items-center py-10">
                        <p className="text-gray-500 text-center mb-4">You have not booked any doctor</p>
                        <Link href={"/hello"} className="bg-[var(--dashboard-blue)] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                            Book Now
                        </Link>
                    </div>
                }

                {appointmentData?.slice(0, 3)?.map((appointment) => (
                    <div
                        key={appointment?.doctorName}
                        className="flex items-center justify-between p-3 rounded-xl border border-[var(--dashboard-border)] shadow-sm hover:shadow-lg transition-shadow bg-gray-50"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-[var(--dashboard-blue)] p-3 rounded-full flex items-center justify-center">
                                <UserRound color="white" size={20} />
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-[var(--fourground-color)]">Dr. {appointment?.doctorName}</p>
                                <p className="text-gray-500 text-sm">{appointment?.specialist}</p>
                                <p className="text-gray-400 text-xs">{formatAppointmentDate(appointment.appointmentDate)}</p>
                            </div>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-[var(--dashboard-blue)] hover:text-white transition-colors cursor-pointer">
                            Join
                        </button>
                    </div>
                ))}
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="bg-[var(--dashboard-bg)] w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto rounded-2xl shadow-xl transform transition-transform duration-300 scale-100 p-5">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-[var(--fourground-color)]">
                                <Calendar color="var(--dashboard-blue)" size={20} /> All Appointments
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {appointmentData?.map((appointment) => (
                                <div
                                    key={appointment?.doctorName}
                                    className="flex items-center justify-between p-3 rounded-xl border border-[var(--dashboard-border)] shadow-sm hover:shadow-md transition-shadow bg-gray-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[var(--dashboard-blue)] p-3 rounded-full flex items-center justify-center">
                                            <UserRound color="white" size={20} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-semibold text-[var(--fourground-color)]">Dr. {appointment?.doctorName}</p>
                                            <p className="text-gray-500 text-sm">{appointment?.specialist}</p>
                                            <p className="text-gray-400 text-xs">{formatAppointmentDate(appointment.appointmentDate)}</p>
                                        </div>
                                    </div>
                                    <button className="border border-gray-300 px-3 py-1 rounded-lg hover:bg-[var(--dashboard-blue)] hover:text-white transition-colors cursor-pointer">
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpcomingAppointment;
