"use client";

import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUser,
  FaEnvelope,
  FaFileMedical,
  FaTimes,
  FaDownload,
} from "react-icons/fa";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // ---------------- Fetch All Reports ----------------
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/ehealth-report/all");
        const data = await res.json();
        setReports(data.reports || []);
        setFilteredReports(data.reports || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ---------------- Filter by Patient Name ----------------
  useEffect(() => {
    const results = reports.filter((r) =>
      r.patientName.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredReports(results);
  }, [searchName, reports]);

  // ---------------- Image Modal Handler ----------------
  const openImage = (img) => setSelectedImage(img);
  const closeImage = () => setSelectedImage(null);
  const downloadImage = (imgUrl) => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = "health-report.jpg";
    link.click();
  };

  if (loading)
    return (
      <p
        className="text-center mt-10 animate-pulse text-lg tracking-wide"
        style={{ color: "var(--text-color-all)" }}
      >
        Loading reports...
      </p>
    );

  return (
    <div
      className="max-w-6xl mx-auto mt-12 p-10 rounded-3xl shadow-2xl transition-all duration-500 border backdrop-blur-md"
      style={{
        background: "linear-gradient(135deg, var(--dashboard-bg), var(--bg-color-all))",
        borderColor: "var(--dashboard-border)",
        color: "var(--text-color-all)",
      }}
    >
      {/* -------- Page Heading -------- */}
      <h1
        className="text-4xl font-extrabold mb-10 flex items-center justify-center gap-4 tracking-wide"
        style={{ color: "var(--color-secondary)" }}
      >
        <FaFileMedical className="text-3xl animate-pulse" />
        All Patient Reports
      </h1>

      {/* -------- Search Bar -------- */}
      <div className="relative mb-10">
        <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full rounded-xl pl-12 pr-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--color-primary)]"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--dashboard-border)",
            color: "var(--text-color-all)",
            caretColor: "var(--color-primary)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          }}
        />
      </div>

      {/* -------- Reports List -------- */}
      {filteredReports.length === 0 ? (
        <p className="text-center text-sm opacity-70 italic">
          No reports found.
        </p>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <li
              key={report._id}
              className="p-6 rounded-2xl border shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "var(--dashboard-border)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2 rounded-full"
                  style={{
                    background: "var(--color-primary)",
                    color: "#fff",
                    boxShadow: "0 0 10px var(--color-primary)",
                  }}
                >
                  <FaUser className="text-sm" />
                </div>
                <p className="font-semibold text-lg tracking-wide">
                  {report.patientName || "Unknown"}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm mb-4 opacity-90">
                <FaEnvelope />
                <p>{report.userEmail || "N/A"}</p>
              </div>

              {report.imageLink && (
                <div
                  className="overflow-hidden rounded-lg border mb-4 transition-all duration-300 cursor-pointer"
                  onClick={() => openImage(report.imageLink)}
                >
                  <img
                    src={report.imageLink}
                    alt={report.patientName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}

              <p className="text-xs opacity-70 italic">
                Uploaded on:{" "}
                {new Date(report.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* -------- Image Modal -------- */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-sm"
          onClick={closeImage}
        >
          <div
            className="relative p-4 rounded-xl shadow-2xl transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--dashboard-bg)",
              border: "1px solid var(--dashboard-border)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-3 right-3 text-xl hover:scale-110 transition-transform"
              style={{ color: "var(--text-color-all)" }}
            >
              <FaTimes />
            </button>

            {/* Download Button */}
            <button
              onClick={() => downloadImage(selectedImage)}
              className="absolute top-3 left-3 text-xl hover:scale-110 transition-transform"
              style={{ color: "var(--color-primary)" }}
            >
              <FaDownload />
            </button>

            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-[90vw] max-h-[80vh] rounded-lg object-contain transition-transform duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
}
