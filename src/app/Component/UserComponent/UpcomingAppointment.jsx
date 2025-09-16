import { Calendar } from "lucide-react";


const UpcomingAppointment = () => {

    

    return (
        <div>
            <header className="flex justify-between border-1 border-gray-200 p-4 rounded items-center">
                <div className="flex">
                    <div><Calendar color="var(--dashboard-blue)" /></div>
                    <div>Upcoming Appointments</div>
                </div>
                <div>
                    <button className="border-1 border-gray-200 p-1 px-3 rounded cursor-pointer">View All</button>
                </div>
            </header>

            <main>
                <div>

                </div>
            </main>
        </div>
    );
};

export default UpcomingAppointment;