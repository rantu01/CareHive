"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { User, Search, ChevronLeft, ChevronRight } from "lucide-react";
import PatientModal from "./PatientModal";

export default function PatientsPage() {
  const { doctorId } = useParams();
  const router = useRouter();

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [total, setTotal] = useState(0);
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // Fetch patients for current page & search
  useEffect(() => {
    if (!doctorId) return;

    let cancelled = false;
    async function fetchPatients() {
      setLoading(true);
      try {
        const q = new URLSearchParams();
        q.set("page", String(page));
        q.set("perPage", String(perPage));
        if (searchTerm.trim()) q.set("search", searchTerm.trim());

        const res = await fetch(
          `/api/doctor-patients/${doctorId}?${q.toString()}`
        );
        if (!res.ok) throw new Error("Failed to fetch patients");
        const data = await res.json();

        if (!cancelled) {
          setPatients(Array.isArray(data.patients) ? data.patients : []);
          setTotal(Number(data.total || 0));
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        if (!cancelled) {
          setPatients([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPatients();
    return () => {
      cancelled = true;
    };
  }, [doctorId, page, searchTerm]);

  // UI helpers
  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const gotoPage = (n) => {
    if (n < 1 || n > totalPages) return;
    setPage(n);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[#008b8b] bg-clip-text text-transparent">
          My Patients
        </h1>

        <div className="relative w-full sm:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search patients by name, email or id..."
            className="pl-10 pr-3 py-2 w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition text-[var(--text-color-all)]"
          />
        </div>
      </div>

      {/* Grid / Loading / Empty */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: perPage > 6 ? 6 : perPage }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((p) => (
            <article
              key={p.userId}
              onClick={() => setSelectedPatient(p)}
              className="cursor-pointer group relative bg-white rounded-2xl border hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
                      p.patientName || p.userId
                    )}`}
                    alt={p.patientName || p.userId}
                    className="w-14 h-14 rounded-full border-2 border-[var(--color-primary)] object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {p.patientName || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {p.patientEmail || "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p className="truncate">
                    <User size={14} className="inline-block mr-1" />
                    ID:{" "}
                    <span className="font-medium break-words">{p.userId}</span>
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

                  <p>
                    Total Visits:{" "}
                    <span className="font-medium">
                      {p.totalAppointments || 1}
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
        {/* Prev Button */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="p-2 rounded-lg text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 disabled:opacity-40 transition cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages })
          .map((_, i) => i + 1)
          .filter((num) => {
            const start = Math.max(1, page - 3);
            const end = Math.min(totalPages, page + 4);
            return num >= start && num <= end;
          })
          .map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 rounded-lg border font-medium transition cursor-pointer ${
                page === num
                  ? "text-white"
                  : "text-[var(--color-primary)] bg-white hover:bg-[var(--color-primary)]/10"
              }`}
              style={{
                background:
                  page === num
                    ? "linear-gradient(135deg, var(--color-primary), #007b7b)"
                    : "",
                borderColor: "var(--color-primary)",
              }}
            >
              {num}
            </button>
          ))}

        {/* Next Button */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 rounded-lg text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 disabled:opacity-40 transition cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Patient modal */}
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
