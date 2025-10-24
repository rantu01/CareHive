"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaUserMd, FaTrashAlt, FaFileMedical } from "react-icons/fa";

export default function EHealthReportPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [patientName, setPatientName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchReports = async () => {
      try {
        const res = await fetch(`/api/ehealth-report?userEmail=${user.email}`);
        const data = await res.json();
        setReports(data.reports || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, [user, refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/ehealth-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientName, imageLink, userEmail: user.email }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Report Added!",
          text: "The health report has been saved successfully.",
          background: "var(--bg-color-all)",
          color: "var(--text-color-all)",
          confirmButtonColor: "var(--color-primary)",
        });
        setPatientName("");
        setImageLink("");
        setRefresh(!refresh);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong.",
          background: "var(--bg-color-all)",
          color: "var(--text-color-all)",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to save report.",
        background: "var(--bg-color-all)",
        color: "var(--text-color-all)",
      });
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This report will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "var(--bg-color-all)",
      color: "var(--text-color-all)",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const res = await fetch(`/api/ehealth-report/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The report has been removed.",
          background: "var(--bg-color-all)",
          color: "var(--text-color-all)",
          confirmButtonColor: "var(--color-primary)",
        });
        setRefresh(!refresh);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to delete report.",
          background: "var(--bg-color-all)",
          color: "var(--text-color-all)",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete report.",
        background: "var(--bg-color-all)",
        color: "var(--text-color-all)",
      });
    }
  };

  if (loading || !user)
    return <p className="text-center mt-10 animate-pulse">Loading...</p>;

  return (
    <div
      className="max-w-4xl mx-auto my-32 p-10 rounded-3xl shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_30px_var(--color-primary)]"
      style={{
        background: "linear-gradient(145deg, var(--dashboard-bg), var(--bg-color-all))",
        color: "var(--text-color-all)",
      }}
    >
      <h1
        className="text-4xl font-extrabold mb-10 flex items-center justify-center gap-3 tracking-wide uppercase"
        style={{ color: "var(--color-secondary)" }}
      >
        <FaFileMedical className="text-3xl animate-pulse" />
        E-Health Report Portal
      </h1>

      {/* -------- FORM -------- */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 mb-12 p-8 rounded-2xl border shadow-lg transition-all duration-500 hover:shadow-[0_0_25px_var(--color-primary)]"
        style={{
          background:
            "linear-gradient(135deg, var(--dashboard-bg) 0%, var(--bg-color-all) 100%)",
          border: "1px solid var(--dashboard-border)",
        }}
      >
        <div>
          <label className="block font-semibold mb-2 text-sm uppercase tracking-wider opacity-80">
            Patient Name
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            placeholder="Enter patient name..."
            className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:scale-[1.01]"
            style={{
              borderColor: "var(--dashboard-border)",
              background: "var(--bg-color-all)",
              color: "var(--text-color-all)",
            }}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm uppercase tracking-wider opacity-80">
            Report / Image Link
          </label>
          <input
            type="url"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            placeholder="https://example.com/report.pdf or .jpg"
            className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:scale-[1.01]"
            style={{
              borderColor: "var(--dashboard-border)",
              background: "var(--bg-color-all)",
              color: "var(--text-color-all)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_25px_var(--color-primary)]"
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            letterSpacing: "1px",
          }}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      {/* -------- REPORT LIST -------- */}
      <h2
        className="text-2xl font-bold mb-8 flex items-center gap-3 border-b pb-3 tracking-wide"
        style={{
          borderColor: "var(--dashboard-border)",
          color: "var(--color-secondary)",
        }}
      >
        <FaUserMd className="text-xl" />
        My Uploaded Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-center text-sm italic opacity-70">
          No reports have been added yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <li
              key={report._id}
              className="p-6 rounded-2xl border shadow-md flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-primary)]"
              style={{
                background: "var(--dashboard-bg)",
                borderColor: "var(--dashboard-border)",
              }}
            >
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">
                  👤 {report.patientName}
                </p>
                {report.imageLink && (
                  <a
                    href={report.imageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sm hover:opacity-80"
                    style={{ color: "var(--color-primary)" }}
                  >
                    View Report / Prescription
                  </a>
                )}
              </div>

              <button
                onClick={() => handleDelete(report._id)}
                className="flex bg-gray-400 items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_#dc2626]"
                style={{
                  
                  color: "#fff",
                }}
              >
                <FaTrashAlt /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
