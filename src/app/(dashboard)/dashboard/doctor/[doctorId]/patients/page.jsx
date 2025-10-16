"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { User, Search, ChevronLeft, ChevronRight } from "lucide-react";
import PatientModal from "./PatientModal";

export default function PatientsPage() {
  const { doctorId } = useParams();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Fetch patients
  useEffect(() => {
    if (!doctorId) return;

    const fetchPatients = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/doctor-patients/${doctorId}`);
        const data = await res.json();
        setPatients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [doctorId]);

  // Filtered patients based on search term
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients;
    return patients.filter((p) =>
      p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.patientEmail || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.userId || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  const totalPages = Math.ceil(filteredPatients.length / perPage);
  const displayedPatients = filteredPatients.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[#008b8b] bg-clip-text text-transparent">
          My Patients
        </h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fourground-color)]" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page when searching
            }}
            placeholder="Search patients..."
            className="pl-10 pr-3 py-2 w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition text-[var(--fourground-color)]"
          />
        </div>
      </div>

      {/* Patients Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="loading loading-spinner loading-lg text-[var(--color-primary)]"></div>
        </div>
      ) : displayedPatients.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPatients.map((p, i) => (
            <div
              key={p.userId || i}
              onClick={() => setSelectedPatient(p)}
              className="cursor-pointer group relative bg-white rounded-2xl border hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${p.patientName}`}
                    alt={p.patientName}
                    className="w-14 h-14 rounded-full border-2 border-[var(--color-primary)] shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{p.patientName}</h3>
                    <p className="text-sm text-gray-500 truncate">{p.patientEmail}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>
                    <User size={14} className="inline-block mr-1" /> ID:{" "}
                    <span className="font-medium">{p.userId}</span>
                  </p>
                  <p>
                    Last Visit:{" "}
                    <span className="font-medium text-[var(--color-primary)]">
                      {p.lastBookedAt
                        ? new Date(p.lastBookedAt).toLocaleDateString("en-BD", {
                            dateStyle: "medium",
                          })
                        : "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-medium text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Patient Modal */}
      {selectedPatient && (
        <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );
}
