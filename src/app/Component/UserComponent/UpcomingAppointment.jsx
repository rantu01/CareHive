
"use client"

import { Calendar, UserRound, X } from "lucide-react";
import { useState } from "react";


const UpcomingAppointment = ({appointmentData}) => {


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
        <div className="border-1 border-gray-200 p-4 rounded  ">
            <header className="flex justify-between items-center mb-5">
                <div className="flex gap-2">
                    <div><Calendar color="var(--dashboard-blue)" /></div>
                    <div>Upcoming Appointments</div>
                </div>
                <div>
                    <button className="border-1 border-gray-200 p-1 px-3 rounded cursor-pointer" onClick={() => setIsModalOpen(true)}>View All</button>
                </div>
            </header>

            <main className="flex flex-col gap-2">
                {
                    appointmentData?.slice(0,3)?.map((appointment) => (

                        <div key={appointment?.doctorName} className="flex items-center border-1 p-2 border-gray-200 justify-between rounded-sm">
                            <div className="flex items-center  gap-4">
                                <div className="bg-[var(--dashboard-blue)] p-2 rounded-full">
                                    <UserRound color="white"/>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold">Dr.{appointment?.doctorName}</p>
                                    <p className="text-gray-500">{appointment?.specialist}</p>
                                    <p className="text-gray-500">{formatAppointmentDate(appointment.appointmentDate)}</p>

                                </div>
                            </div>

                            <div>
                                <button className="border-1 border-gray-200 p-1 px-3 rounded cursor-pointer">Join</button>
                            </div>
                        </div>
                    ))
                }
            </main>


            {isModalOpen && (
               <div className="fixed inset-0 flex items-center justify-center bg-gray-200/40 backdrop-blur-sm z-50">

                    <div className="bg-white w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto rounded-lg shadow-lg transform transition-all duration-300 scale-100 p-4">
                        <div className="flex justify-between items-center border-b pb-2 mb-3">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Calendar color="var(--dashboard-blue)" /> All Appointments
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {appointmentData?.map((appointment) => (
                                <div
                                    key={appointment?.doctorName}
                                    className="flex items-center border-1 p-2 border-gray-200 justify-between rounded-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[var(--dashboard-blue)] p-2 rounded-full">
                                            <UserRound color="white"/>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold">Dr.{appointment?.doctorName}</p>
                                            <p className="text-gray-500">{appointment?.specialist}</p>
                                            <p className="text-gray-500">{formatAppointmentDate(appointment.appointmentDate)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="border-1 border-gray-200 p-1 px-3 rounded cursor-pointer">
                                            Join
                                        </button>
                                    </div>
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