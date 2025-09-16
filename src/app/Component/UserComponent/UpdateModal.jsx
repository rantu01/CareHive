import { useState } from "react";

const UpdateModal = ({setIsOpen}) => {
  const [formData, setFormData] = useState({
    bloodPressure: "",
    dailyStep: "",
    heartRate: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: send formData to backend
  };

  return (
    <div className="absolute top-5 right-10 w-[20rem] rounded shadow-lg bg-white border border-gray-200">
      {/* Header */}
      <div className="px-5 py-3 border-b  rounded flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Update Health Data</h2>
        <button onClick={()=>setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition cursor-pointer">✕</button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <input
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
          type="text"
          placeholder="Blood Pressure"
          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
        />
        <input
          name="dailyStep"
          value={formData.dailyStep}
          onChange={handleChange}
          type="text"
          placeholder="Daily Step"
          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
        />
        <input
          name="heartRate"
          value={formData.heartRate}
          onChange={handleChange}
          type="text"
          placeholder="Heart Rate"
          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
        />
        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          type="text"
          placeholder="Weight"
          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
        />

        <button
          type="submit"
          className="w-full bg-[var(--dashboard-blue)] text-white py-2 rounded-lg font-medium hover:bg-[var(--dashboard-blue)]/80 transition cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateModal;
