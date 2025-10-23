// "use client";

// import { useState, useEffect } from "react";

// export default function EHealthReportPage() {
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState("report");
//   const [reports, setReports] = useState([]);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ------------------ Fetch user's uploaded reports ------------------
//   const fetchReports = async () => {
//     if (!email) return;
//     try {
//       const res = await fetch(`/api/ereport?email=${email}`);
//       const data = await res.json();
//       if (data.reports) setReports(data.reports);
//     } catch (err) {
//       console.error("Error fetching reports:", err);
//     }
//   };

//   // ------------------ Handle file upload ------------------
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file || !email) {
//       alert("Please enter email and select a PDF file!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("category", category);
//       formData.append("email", email);

//       const res = await fetch("/api/ereport", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Report uploaded successfully!");
//         setFile(null);
//         fetchReports();
//       } else {
//         alert(data.error || "❌ Failed to upload report");
//       }
//     } catch (err) {
//       console.error("Upload failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, [email]);

//   return (
//     <section
//       className="min-h-screen flex flex-col items-center justify-start py-12 px-6"
//       style={{
//         backgroundColor: "var(--bg-color-all)",
//         color: "var(--text-color-all)",
//       }}
//     >
//       <div className="max-w-2xl w-full bg-white dark:bg-[var(--dashboard-bg)] rounded-2xl shadow-lg p-8 border border-[var(--dashboard-border)]">
//         <h2
//           className="text-3xl font-bold mb-6 text-center"
//           style={{ color: "var(--color-secondary)" }}
//         >
//           Electronic Health Report
//         </h2>

//         <form
//           onSubmit={handleUpload}
//           className="flex flex-col gap-4 items-center justify-center"
//         >
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full p-3 rounded-lg border outline-none text-black"
//             required
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full p-3 rounded-lg border outline-none text-black"
//           >
//             <option value="report">Medical Report</option>
//             <option value="prescription">Prescription</option>
//             <option value="test">Test Result</option>
//           </select>

//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full p-3 border rounded-lg bg-gray-50 text-black"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full p-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
//             style={{ backgroundColor: "var(--color-primary)" }}
//           >
//             {loading ? "Uploading..." : "Upload PDF"}
//           </button>
//         </form>
//       </div>

//       {/* ------------------ Uploaded Reports ------------------ */}
//       <div className="max-w-3xl w-full mt-12 bg-white dark:bg-[var(--dashboard-bg)] rounded-2xl shadow-lg p-8 border border-[var(--dashboard-border)]">
//         <h3
//           className="text-2xl font-semibold mb-4"
//           style={{ color: "var(--color-secondary)" }}
//         >
//           My Uploaded Reports
//         </h3>

//         {reports.length === 0 ? (
//           <p className="text-gray-400">No reports uploaded yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {reports.map((report) => (
//               <li
//                 key={report._id}
//                 className="p-4 rounded-xl border bg-gray-50 dark:bg-[var(--sidebar-bg)]"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-semibold text-[var(--text-color-all)]">
//                       {report.filename}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Category: {report.category} |{" "}
//                       {new Date(report.uploadedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";
import { useState, useEffect } from "react";

export default function EHealthReportPage() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("report");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [reports, setReports] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------- Load email from localStorage on page load -------------------
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // ------------------- Fetch reports whenever email changes -------------------
  useEffect(() => {
    if (email) fetchReports();
  }, [email]);

  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/ereport?email=${email}`);
      const data = await res.json();
      if (data.reports) setReports(data.reports);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !email || !doctorName || !date) {
      alert("Please fill in all fields and select a file!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("email", email);
      formData.append("doctorName", doctorName);
      formData.append("date", date);

      const res = await fetch("/api/ereport", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Report uploaded successfully!");
        setFile(null);
        localStorage.setItem("userEmail", email); // persist email
        fetchReports();
      } else {
        alert(data.error || "❌ Failed to upload report");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-start py-12 px-6"
      style={{
        backgroundColor: "var(--bg-color-all)",
        color: "var(--text-color-all)",
      }}
    >
      {/* Upload Form */}
      <div className="max-w-2xl w-full bg-white dark:bg-[var(--dashboard-bg)] rounded-2xl shadow-lg p-8 border border-[var(--dashboard-border)]">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          Electronic Health Record (EHR)
        </h2>

        <form
          onSubmit={handleUpload}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border outline-none text-black"
            required
          />

          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter doctor's name"
            className="w-full p-3 rounded-lg border outline-none text-black"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg border outline-none text-black"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg border outline-none text-black"
          >
            <option value="report">Medical Report</option>
            <option value="prescription">Prescription</option>
            <option value="test">Test Result</option>
          </select>

          <input
            type="file"
            accept="application/pdf, image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 border rounded-lg bg-gray-50 text-black"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {loading ? "Uploading..." : "Upload Record"}
          </button>
        </form>
      </div>

      {/* Uploaded Records */}
      <div className="max-w-3xl w-full mt-12 bg-white dark:bg-[var(--dashboard-bg)] rounded-2xl shadow-lg p-8 border border-[var(--dashboard-border)]">
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: "var(--color-secondary)" }}
        >
          My Uploaded Records
        </h3>

        {reports.length === 0 ? (
          <p className="text-gray-400">No records uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {reports.map((r) => (
              <li
                key={r._id}
                className="p-4 rounded-xl border bg-gray-50 dark:bg-[var(--sidebar-bg)]"
              >
                <p className="font-semibold text-[var(--text-color-all)]">
                  {r.filename}
                </p>
                <p className="text-sm text-gray-400">
                  Doctor: {r.doctorName} | Date: {r.date} | Type: {r.category}
                </p>
                <p className="text-xs text-gray-400">
                  Uploaded: {new Date(r.uploadedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
