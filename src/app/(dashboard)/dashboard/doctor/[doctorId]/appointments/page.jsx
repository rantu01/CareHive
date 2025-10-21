"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileDown,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AppointmentsPage() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch appointments
  const fetchAppointments = async () => {
    if (!doctorId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/doctor-appointments/${doctorId}`);
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();

      setAppointments(data.appointments || []);
      setFilteredAppointments(data.appointments || []);
      setTotal(data.total || 0);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  // 📅 Filter by date
  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    if (!selected) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter((a) => {
      if (!a.bookedAt) return false;
      const appointmentDate = new Date(a.bookedAt).toISOString().split("T")[0];
      return appointmentDate === selected;
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1);
  };

  // 📄 Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // 📤 Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAppointments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
    XLSX.writeFile(workbook, "appointments.xlsx");
  };

  // 📄 Export to PDF (Styled & Clean)
  const exportToPDF = () => {
    if (!filteredAppointments || filteredAppointments.length === 0) {
      alert("No data available to export!");
      return;
    }

    const doc = new jsPDF("landscape"); // 🧭 Landscape view for wide tables

    // 🧠 Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Doctor Appointment Report", 14, 15);

    // 🗓️ Subtext / Meta Info
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString("en-BD")}`, 14, 22);
    doc.text(`Total Appointments: ${filteredAppointments.length}`, 14, 27);

    // 📊 AutoTable with Styling
    autoTable(doc, {
      startY: 35,
      head: [
        [
          "#",
          "Patient",
          "Email",
          "Slot",
          "Fee (৳)",
          "Status",
          "Payment",
          "Hospital",
          "Booked At",
        ],
      ],
      body: filteredAppointments.map((a, i) => [
        i + 1,
        a.patientName || "-",
        a.patientEmail || "-",
        a.bookedSlot || "-",
        a.fees || a.doctorFee || "-",
        a.status || "upcoming",
        a.paymentStatus || "Pending",
        a.hospitalName || "-",
        a.bookedAt
          ? new Date(a.bookedAt).toLocaleString("en-BD", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "—",
      ]),
      theme: "striped",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        valign: "middle",
      },
      headStyles: {
        fillColor: [0, 153, 153], // turquoise / teal header
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 248, 248] }, // soft gray rows
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 35 },
        2: { cellWidth: 45 },
        3: { cellWidth: 35 },
        4: { cellWidth: 20, halign: "right" },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 },
        7: { cellWidth: 40 },
        8: { cellWidth: 40 },
      },
    });

    // 🖨️ Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10
      );
    }

    // 💾 Save file
    doc.save(`appointments_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // 🌀 Loading UI
  if (loading)
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg text-[var(--color-primary)]"></div>
        <p className="mt-3 text-gray-500">Loading appointments...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-teal-500 bg-clip-text text-transparent">
          My Appointments
        </h1>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Filter */}
          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="pl-10 pr-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />
          </div>

          {/* Export Buttons */}
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm font-medium"
          >
            <FileDown size={16} /> Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-500 text-rose-600 hover:bg-rose-50 text-sm font-medium"
          >
            <FileDown size={16} /> PDF
          </button>

          {/* Refresh */}
          <button
            onClick={fetchAppointments}
            className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium hover:scale-105 transition-all duration-200"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            <RefreshCcw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl shadow-lg p-6 text-white bg-gradient-to-r from-[var(--color-primary)] to-[#007777]">
          <h2 className="text-lg font-semibold">Total Appointments</h2>
          <div className="text-5xl font-bold mt-2">{total}</div>
        </div>

        <div className="rounded-2xl shadow-lg p-6 text-white bg-gradient-to-r from-[#00a5a5] to-[var(--color-primary)]">
          <h2 className="text-lg font-semibold">Filtered Results</h2>
          <div className="text-5xl font-bold mt-2">
            {filteredAppointments.length}
          </div>
        </div>

        <div className="rounded-2xl shadow-lg p-6 text-white bg-gradient-to-r from-[var(--color-primary)] to-[#00a58a]">
          <h2 className="text-lg font-semibold">Latest Appointment</h2>
          <div className="mt-2 text-lg">
            {appointments[0]?.patientName || "No recent appointment"}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-xl font-semibold text-[var(--color-primary)]">
            Appointment Details
          </h2>
          <span className="text-sm text-gray-500">
            {filteredAppointments.length} records
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No appointments found.
          </div>
        ) : (
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <table className="min-w-[850px] w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-[#00c2a8] to-[var(--color-primary)] text-white text-xs sm:text-sm uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Slot</th>
                  <th className="px-4 py-3 text-left">Fee</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Hospital</th>
                  <th className="px-4 py-3 text-left">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((a, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gradient-to-r hover:from-[#f0fdfa] hover:to-[#e6fffb] transition border-b border-gray-100"
                  >
                    <td className="px-4 py-3">{startIndex + i + 1}</td>
                    <td className="px-4 py-3 font-medium">{a.patientName}</td>
                    <td className="px-4 py-3">{a.patientEmail || "-"}</td>
                    <td className="px-4 py-3">{a.bookedSlot}</td>
                    <td className="px-4 py-3">{a.fees || a.doctorFee}</td>
                    <td className="px-4 py-3 capitalize">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          a.status === "upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {a.status || "upcoming"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          a.paymentStatus === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {a.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{a.hospitalName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {a.bookedAt
                        ? new Date(a.bookedAt).toLocaleString("en-BD", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-5 bg-gray-50 border-t">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
