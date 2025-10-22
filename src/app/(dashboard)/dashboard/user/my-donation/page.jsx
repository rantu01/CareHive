"use client";

import { useUser } from "@/app/context/UserContext";
import { useState, useEffect } from "react";

export default function MyDonorsPage() {
  const { user, loading: userLoading } = useUser();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  // Fetch user-specific donors
  const fetchDonors = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const resBlood = await fetch("/api/blood-donation");
      const bloodData = await resBlood.json();

      const resOrgan = await fetch("/api/organ-donation");
      const organData = await resOrgan.json();

      const userDonors = [...bloodData, ...organData].filter(
        (d) => d.email === user.email
      );

      setDonors(userDonors);
    } catch (err) {
      setError("Failed to fetch donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [user]);

  // Filter donors based on active tab
  const filteredDonors = donors.filter(donor => {
    if (activeTab === "all") return true;
    if (activeTab === "blood") return donor.type === "blood";
    if (activeTab === "organ") return donor.type === "organ";
    if (activeTab === "verified") return donor.verified;
    if (activeTab === "pending") return !donor.verified;
    return true;
  });

  // Handle input change for editing
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Save updated donor
  const handleSave = async (donor) => {
    const endpoint =
      donor.type === "blood" ? "/api/blood-donation" : "/api/organ-donation";

    try {
      const payload = { ...editData, _id: donor._id, email: donor.email };

      if (donor.type === "organ") {
        payload.organs = payload.organs
          ? payload.organs
              .split(",")
              .map((o) => o.trim())
              .filter((o) => o)
          : [];
      }

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update donor");

      setEditingId(null);
      fetchDonors();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete donor
  const handleDelete = async (donor) => {
    if (!confirm("Are you sure you want to delete this donor?")) return;

    const endpoint =
      donor.type === "blood" ? "/api/blood-donation" : "/api/organ-donation";

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: donor._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete donor");

      fetchDonors();
    } catch (err) {
      alert(err.message);
    }
  };

  if (userLoading || loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--bg-color-all)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 text-[var(--color-secondary)] font-heading">
            My Donor Portfolio
          </h1>
          <p className="text-lg text-[var(--text-color-all)] max-w-2xl mx-auto">
            Manage and track all your donation entries in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-color-all)] opacity-80">Total Entries</p>
                <p className="text-2xl font-bold text-[var(--color-secondary)]">{donors.length}</p>
              </div>
              <div className="w-12 h-12 bg-[var(--color-primary)] bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-[var(--color-primary)] text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-color-all)] opacity-80">Blood Donations</p>
                <p className="text-2xl font-bold text-[var(--color-secondary)]">
                  {donors.filter(d => d.type === "blood").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">🩸</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-color-all)] opacity-80">Organ Donations</p>
                <p className="text-2xl font-bold text-[var(--color-secondary)]">
                  {donors.filter(d => d.type === "organ").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">💚</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--dashboard-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-color-all)] opacity-80">Verified</p>
                <p className="text-2xl font-bold text-[var(--color-secondary)]">
                  {donors.filter(d => d.verified).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl p-2 mb-6 shadow-lg border border-[var(--dashboard-border)]">
          <div className="flex flex-wrap gap-2">
            {["all", "blood", "organ", "verified", "pending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[var(--color-primary)] text-white shadow-md"
                    : "text-[var(--text-color-all)] hover:bg-[var(--bg-color-all)]"
                }`}
              >
                {tab === "all" && "All Entries"}
                {tab === "blood" && "🩸 Blood"}
                {tab === "organ" && "💚 Organ"}
                {tab === "verified" && "✅ Verified"}
                {tab === "pending" && "⏳ Pending"}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[var(--dashboard-bg)] rounded-2xl shadow-xl border border-[var(--dashboard-border)] overflow-hidden">
          {error && (
            <div className="alert alert-error m-4">
              <span>{error}</span>
            </div>
          )}

          {filteredDonors.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-[var(--bg-color-all)] rounded-full flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-color-all)] mb-2">
                No donor entries found
              </h3>
              <p className="text-[var(--text-color-all)] opacity-70">
                {activeTab !== "all" 
                  ? `No ${activeTab} entries found.` 
                  : "You haven't created any donor entries yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-[var(--bg-color-all)] border-b border-[var(--dashboard-border)]">
                    <th className="text-[var(--text-color-all)] font-semibold py-4">Type</th>
                    <th className="text-[var(--text-color-all)] font-semibold">Full Name</th>
                    <th className="text-[var(--text-color-all)] font-semibold">Donation Details</th>
                    <th className="text-[var(--text-color-all)] font-semibold">Location</th>
                    <th className="text-[var(--text-color-all)] font-semibold">Status</th>
                    <th className="text-[var(--text-color-all)] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((donor) => (
                    <tr 
                      key={donor._id} 
                      className="border-b border-[var(--dashboard-border)] hover:bg-[var(--bg-color-all)] transition-colors duration-150"
                    >
                      <td>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                          donor.type === "blood" 
                            ? "bg-red-50 text-red-700 border border-red-200" 
                            : "bg-green-50 text-green-700 border border-green-200"
                        }`}>
                          <span>{donor.type === "blood" ? "🩸" : "💚"}</span>
                          <span className="font-medium capitalize">{donor.type}</span>
                        </div>
                      </td>
                      <td className="font-medium text-[var(--text-color-all)]">
                        {editingId === donor._id ? (
                          <input
                            type="text"
                            name="fullName"
                            value={editData.fullName}
                            onChange={handleEditChange}
                            className="input input-bordered w-full max-w-xs bg-white"
                          />
                        ) : (
                          donor.fullName
                        )}
                      </td>
                      <td>
                        {editingId === donor._id ? (
                          donor.type === "blood" ? (
                            <input
                              type="text"
                              name="bloodGroup"
                              value={editData.bloodGroup}
                              onChange={handleEditChange}
                              className="input input-bordered w-full max-w-xs bg-white"
                              placeholder="e.g., A+"
                            />
                          ) : (
                            <input
                              type="text"
                              name="organs"
                              value={editData.organs}
                              onChange={handleEditChange}
                              className="input input-bordered w-full max-w-xs bg-white"
                              placeholder="e.g., Kidney, Liver"
                            />
                          )
                        ) : donor.type === "blood" ? (
                          <span className="font-semibold text-red-600">{donor.bloodGroup}</span>
                        ) : donor.organs ? (
                          <div className="flex flex-wrap gap-1">
                            {(Array.isArray(donor.organs) ? donor.organs : [donor.organs]).map((organ, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium"
                              >
                                {organ.trim()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="text-[var(--text-color-all)]">
                        {editingId === donor._id ? (
                          <input
                            type="text"
                            name="location"
                            value={editData.location}
                            onChange={handleEditChange}
                            className="input input-bordered w-full max-w-xs bg-white"
                          />
                        ) : (
                          donor.location
                        )}
                      </td>
                      <td>
                        {editingId === donor._id ? (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="verified"
                              checked={editData.verified}
                              onChange={handleEditChange}
                              className="checkbox checkbox-success"
                            />
                            <span className="text-sm text-[var(--text-color-all)]">Verified</span>
                          </label>
                        ) : donor.verified ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            ✅ Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                            ⏳ Pending
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {editingId === donor._id ? (
                            <>
                              <button
                                className="btn btn-sm bg-[var(--color-primary)] text-white border-none hover:bg-[var(--color-secondary)] transition-colors"
                                onClick={() => handleSave(donor)}
                              >
                                💾 Save
                              </button>
                              <button
                                className="btn btn-sm btn-outline border-gray-300 text-[var(--text-color-all)] hover:bg-gray-100"
                                onClick={() => setEditingId(null)}
                              >
                                ❌ Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-sm bg-blue-500 text-white border-none hover:bg-blue-600 transition-colors"
                                onClick={() => {
                                  setEditingId(donor._id);
                                  setEditData({
                                    fullName: donor.fullName,
                                    bloodGroup: donor.bloodGroup || "",
                                    organs: donor.organs
                                      ? Array.isArray(donor.organs)
                                        ? donor.organs.join(", ")
                                        : donor.organs
                                      : "",
                                    location: donor.location,
                                    verified: donor.verified,
                                  });
                                }}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn btn-sm bg-red-500 text-white border-none hover:bg-red-600 transition-colors"
                                onClick={() => handleDelete(donor)}
                              >
                                🗑️ Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-[var(--text-color-all)] opacity-70">
          <p>Your generosity saves lives. Thank you for being a donor! ❤️</p>
        </div>
      </div>
    </div>
  );
}