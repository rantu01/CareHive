"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import HospitalDetailsModal from "@/app/Component/HospitalDetailsModal";

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  useEffect(() => {
    const fetchHospitals = async () => {
      const params = new URLSearchParams({ q, city, page });
      const res = await fetch(`/api/hospital-list?${params.toString()}`);
      const data = await res.json();
      setHospitals(data.hospitals || []);
      setTotal(data.total || 0);
    };
    fetchHospitals();
  }, [q, city, page]);

  const totalPages = Math.ceil(total / limit);
  const getVisiblePages = () => {
    const range = [];
    const visible = 8;
    let start = Math.max(1, page - Math.floor(visible / 2));
    let end = Math.min(totalPages, start + visible - 1);
    if (end - start < visible - 1) start = Math.max(1, end - visible + 1);
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4 sm:px-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto text-center mb-10 mt-18">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md text-white"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-gradient))",
          }}
        >
          <MapPin size={16} />
          <span>Find Your Hospital</span>
        </div>

        <h1
          className="mt-5 text-5xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, var(--color-primary), var(--color-gradient))",
          }}
        >
          Hospital Directory
        </h1>
        <p className="mt-3 text-gray-600">
          Explore top hospitals, view contact info, specialties, and more.
        </p>
      </header>

      {/* Search */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 flex-1 w-full">
            <Search className="text-gray-500" />
            <input
              className="w-full rounded-xl px-4 py-2 border-2 border-transparent bg-gradient-to-r from-teal-50 to-teal-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-var(--color-primary) transition-all duration-300"
              placeholder="Search hospitals, locations..."
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
            />
          </div>

          <select
            className="border rounded-xl px-4 py-2 w-full md:w-56 focus:ring-2 focus:ring-var(--color-primary) text-gray-900"
            value={city}
            onChange={(e) => {
              setPage(1);
              setCity(e.target.value);
            }}
          >
            <option value="">All Cities</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Khulna">Khulna</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Barisal">Barisal</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Comilla">Comilla</option>
            <option value="Narsingdi">Narsingdi</option>
            <option value="Gazipur">Gazipur</option>
            <option value="Narail">Narail</option>
            <option value="Cox's Bazar">Cox's Bazar</option>
            <option value="Jessore">Jessore</option>
            <option value="Bogra">Bogra</option>
            <option value="Pabna">Pabna</option>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Thakurgaon">Thakurgaon</option>
            <option value="Habiganj">Habiganj</option>
            <option value="Moulvibazar">Moulvibazar</option>
            <option value="Tangail">Tangail</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Satkhira">Satkhira</option>
            <option value="Brahmanbaria">Brahmanbaria</option>
            <option value="Feni">Feni</option>
            <option value="Narayanganj">Narayanganj</option>
            <option value="Sirajganj">Sirajganj</option>
            <option value="Kushtia">Kushtia</option>
          </select>

          <button
            onClick={() => {
              setQ("");
              setCity("");
              setPage(1);
            }}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hosp) => (
          <motion.div
            key={hosp._id}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white rounded-2xl border border-teal-100 shadow hover:shadow-2xl transition-all overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div
              className="p-5 text-white flex items-start gap-4"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-primary))",
              }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base line-clamp-2 h-12 overflow-hidden">
                  {hosp.name}
                </h3>
                <p className="text-sm opacity-90">{hosp.city}</p>
              </div>
              <Heart size={16} className="opacity-80" />
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-grow">
              <p className="text-gray-600 mb-3 line-clamp-2">{hosp.address}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100">
                  {hosp.care_type}
                </span>
                <span className="text-sm bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100">
                  Beds: {hosp.bedcount}
                </span>
              </div>

              <div className="flex-grow"></div>

              <button
                onClick={() => {
                  setSelectedHospital(hosp);
                  setIsModalOpen(true);
                }}
                className="w-full py-2 rounded-xl text-white font-medium hover:opacity-90 transition shadow-sm cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-gradient))",
                }}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="p-2 rounded-lg text-teal-700 hover:bg-teal-50 disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {getVisiblePages().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              page === num
                ? "text-white"
                : "text-teal-700 bg-white hover:bg-teal-50"
            }`}
            style={{
              background: page === num ? "linear-gradient(135deg, var(--color-primary), var(--color-primary))" : "",
              borderColor: "var(--color-primary)",
            }}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 rounded-lg text-teal-700 hover:bg-teal-50 disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Modal */}
      <HospitalDetailsModal
        hospital={selectedHospital}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
