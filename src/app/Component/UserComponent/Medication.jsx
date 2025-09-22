import { Plus } from "lucide-react";


const Medication = () => {

    return (
        <div>
            <header className="flex justify-between items-center ">
                <div>
                    <h1 className="text-2xl text-[var(--fourground-color)] font-bold mb-1">Medications</h1>
                    <p>Manage your medication schedule</p>
                </div>
                <button className="bg-[var(--dashboard-blue)] rounded flex items-center gap-4 h-fit p-2 cursor-pointer">
                    <Plus /> Add Medication
                </button>
            </header>

            <main>
                
            </main>
        </div>
    );
};

export default Medication;