"use client"


import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import { Calendar, Camera, Phone, User } from "lucide-react";
import { use } from "react";

const page = () => {

    const { appointmentData } = use(DashBoardDataContext)

    console.log(appointmentData)

    return (
        <div>
            <header className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="text-[var(--fourground-color)] text-3xl font-bold">Appointments</h1>
                    <p className="text-[var(--fourground-color)]/60">Manage your medical appointments</p>
                </div>
                <button
                    className="px-5 py-2 gap-3 rounded-lg font-medium text-white bg-[var(--dashboard-blue)] hover:bg-[var(--color-calm-blue)] transition-colors duration-300 self-start md:self-auto flex cursor-pointer"
                >
                    <span><Calendar />  </span><span>Book A Appointment</span>
                </button>

            </header>

            <div className="flex flex-col gap-10">
                {appointmentData?.map(({ doctorName, specialist, doctorId }) => (
                    <div key={doctorId} className=" shadow-lg rounded-lg p-5 border border-[var(--dashboard-border)] ">

                        <div className="flex justify-between items-center gap-5 py-5 px-3 rounded ">

                            {/* Doctor Info Section */}
                            <div className="flex gap-5 items-center">
                                <div className="w-12 h-12 rounded-full flex justify-center items-center">
                                    <User className="w-8 h-8 bg-[var(--dashboard-blue)] rounded-full p-2" />
                                </div>

                                <div>
                                    <p className="text-[var(--fourground-color)] font-semibold text-lg">{doctorName}</p>
                                    <p className="text-sm text-[var(--fourground-color)]/50">{specialist}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 items-center">
                                {/* Video Call Button */}
                                <button className="flex gap-2 items-center px-4 py-2 border-1 border-[var(--dashboard-border)] rounded-[6px] shadow transition cursor-pointer">
                                    <Camera size={20} color="var(--dashboard-blue)" />
                                    <span className="text-[var(--fourground-color)]">Video Call</span>
                                </button>

                                {/* Call Button */}
                                <button className="flex gap-2 items-center px-4 py-2 border-1 border-[var(--dashboard-border)] rounded-[6px] shadow transition cursor-pointer">
                                    <Phone size={20} color="var(--dashboard-blue)" />
                                    <span className="text-[var(--fourground-color)]">Call</span>
                                </button>
                            </div>

                        </div>

                    </div>

                ))

                }
            </div>


        </div>
    );
};

export default page;