import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

const UpdateModal = ({ setIsOpen, userHealthStats, setHealthStats }) => {


  console.log(userHealthStats)

  const { userId } = useParams()

  const [formData, setFormData] = useState({});

  const [invalidInputError, setError] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();



    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    setError("")
    for (const [key, val] of Object.entries(values)) {
      if (val.trim() === "" || isNaN(val)) {
        setError(`Stat information must be a number`);
        return; // stop execution if invalid
      }
    }
    const updatedStats = [
      { title: "bp", value: parseFloat(values.bloodPressure) },
      { title: "daily-step", value: parseInt(values.dailyStep, 10), target: parseInt(values.dailyStepTarget, 10) },
      { title: "heart-rate", value: parseInt(values.heartRate, 10) },
      { title: "weight", value: parseInt(values.weight, 10) },
    ];

    try {
      const res = await axios.put(`/api/get-health-stats/${userId}`, {
        userStats: updatedStats,
        userId,
      });


      const healthStatsUrl = `/api/get-health-stats/${userId}`;
      const healthStatsResponse = await axios.get(healthStatsUrl)
      setHealthStats(healthStatsResponse?.data[0]?.userStats)


      console.log("Update success:", res.data);
      alert("Health stats updated successfully!");
    }

    catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong!");
    }

  }


  return (
    <div className="z-10 absolute top-5 right-10 w-[20rem] rounded shadow-lg bg-gray-500 border border-gray-200">
      {/* Header */}
      <div className="px-5 py-3 border-b  rounded flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Update Health Data</h2>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition cursor-pointer">✕</button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-2">
        <div>
          <label htmlFor="bloodPressure" className="block mb-1 text-sm font-medium text-gray-700">
            Blood Pressure
          </label>
          <input
            id="bloodPressure"
            name="bloodPressure"
            defaultValue={userHealthStats[0].value}
            type="text"
            placeholder="Blood Pressure"
            required
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
          />
        </div>

        <div>
          <label htmlFor="dailyStep" className="block mb-1 text-sm font-medium text-gray-700">
            Daily Step
          </label>
          <input
            id="dailyStep"
            name="dailyStep"
            defaultValue={userHealthStats[1].value}
            type="text"
            placeholder="Daily Step"
            required
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
          />
        </div>

        <div>
          <label htmlFor="dailyStepTarget" className="block mb-1 text-sm font-medium text-gray-700">
            Daily Step Target
          </label>
          <input
            id="dailyStepTarget"
            name="dailyStepTarget"
            defaultValue={userHealthStats[1].target}
            type="text"
            placeholder="Daily Step Target"
            required
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
          />
        </div>

        <div>
          <label htmlFor="heartRate" className="block mb-1 text-sm font-medium text-gray-700">
            Heart Rate
          </label>
          <input
            id="heartRate"
            name="heartRate"
            defaultValue={userHealthStats[2].value}
            type="text"
            placeholder="Heart Rate"
            required
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block mb-1 text-sm font-medium text-gray-700">
            Weight
          </label>
          <input
            id="weight"
            name="weight"
            defaultValue={userHealthStats[3].value}
            type="text"
            placeholder="Weight"
            required
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--dashboard-blue)] text-white py-2 rounded-lg font-medium hover:bg-[var(--dashboard-blue)]/80 transition cursor-pointer"
        >
          Submit
        </button>

        <p className="text-center text-red-500">{invalidInputError}</p>
      </form>

    </div>
  );
};

export default UpdateModal;
