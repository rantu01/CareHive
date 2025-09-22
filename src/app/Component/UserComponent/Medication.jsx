import { Plus, Bell, Check, Pill } from "lucide-react";

const Medication = () => {
  const medicationData = [
    {
      medicineName: "Vitamin D3",
      status: "pending",
      douseType: "1 tablet daily",
      perDouse: "Morning",
      timeToTake: "2025-09-23T08:00:00",
    },
    {
      medicineName: "Paracetamol",
      status: "taken",
      douseType: "1 tablet",
      perDouse: "Every 6 hours",
      timeToTake: "2025-09-22T14:00:00",
    },
    {
      medicineName: "Antibiotic A",
      status: "pending",
      douseType: "2 tablets",
      perDouse: "Twice a day",
      timeToTake: "2025-09-23T20:00:00",
    },
  ];

  const formatNextTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6 max-w-9/12 mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center ">
        <div>
          <h1 className="text-3xl text-[var(--fourground-color)] font-bold mb-1">
            Medications
          </h1>
          <p className="text-[var(--fourground-color)]">
            Manage your medication schedule
          </p>
        </div>
        <button className="bg-[var(--dashboard-blue)] text-[var(--fourground-color)] rounded flex items-center gap-2 h-fit px-4 py-2 cursor-pointer hover:opacity-90 transition">
          <Plus size={18} /> Add Medication
        </button>
      </header>

      {/* Medication Cards */}
      <main className="grid grid-cols-3 gap-4">
        {medicationData.map((med, idx) => (
          <div
            key={idx}
            className="bg-[var(--card-bg)]  p-4 shadow-sm"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-semibold text-[var(--dashboard-blue)] flex items-center gap-2">
               <Pill/> {med.medicineName}
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  med.status === "taken"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-yellow-900/30 text-yellow-400"
                }`}
              >
                {med.status}
              </span>
            </div>

            {/* Details */}
            <div className="mb-4">
              <p className="text-[var(--fourground-color)] text-xl">
                {med.douseType}
              </p>
              <p className="text-[var(--fourground-color)] text-lg">
                {med.perDouse}
              </p>
              <p className="text-[var(--fourground-color)] text-sm flex items-center gap-2 mt-1">
                <Bell size={14} /> Next: {formatNextTime(med.timeToTake)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex items-center gap-1 border border-[var(--dashboard-border)] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--hover-color)] transition">
                <Bell size={16} /> Remind
              </button>
              <button className="flex items-center gap-1 border border-[var(--dashboard-border)] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--accent-color)] transition">
                <Check size={16} /> Mark Taken
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Medication;
