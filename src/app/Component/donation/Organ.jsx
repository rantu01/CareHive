"use client";

import { useEffect, useState } from "react";

export default function OrganDonorsPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch("/api/organ-donation");
        if (!res.ok) throw new Error("Failed to fetch organ donors");
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDonors();
  }, []);

  // Auto-rotate cards
  useEffect(() => {
    if (donors.length <= 3) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % donors.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [donors.length]);

  const nextDonor = () => {
    setCurrentIndex((prev) => (prev + 1) % donors.length);
  };

  const prevDonor = () => {
    setCurrentIndex((prev) => (prev - 1 + donors.length) % donors.length);
  };

  const getVisibleDonors = () => {
    if (donors.length <= 3) return donors;
    
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((currentIndex + i + donors.length) % donors.length);
    }
    return indices.map(index => donors[index]);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color-all)]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[var(--color-primary)]"></span>
          <p className="mt-4 text-[var(--text-color-all)]">Loading organ donors...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color-all)] text-red-500 text-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--bg-color-all)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">💚</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-[var(--color-secondary)] font-heading">
            Organ Donor Heroes
          </h1>
          <p className="text-lg text-[var(--text-color-all)] max-w-2xl mx-auto">
            Meet the incredible individuals who have pledged to save lives through organ donation
          </p>
        </div>

        {donors.length === 0 ? (
          <div className="text-center py-16 bg-[var(--dashboard-bg)] rounded-2xl shadow-lg border border-[var(--dashboard-border)]">
            <div className="w-24 h-24 mx-auto mb-4 bg-[var(--bg-color-all)] rounded-full flex items-center justify-center">
              <span className="text-4xl">💔</span>
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-color-all)] mb-2">
              No organ donors found
            </h3>
            <p className="text-[var(--text-color-all)] opacity-70">
              Be the first to register as an organ donor and save lives.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevDonor}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-secondary)] transition-all duration-300 hover:scale-110"
            >
              ←
            </button>
            
            <button
              onClick={nextDonor}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-secondary)] transition-all duration-300 hover:scale-110"
            >
              →
            </button>

            {/* Cards Container */}
            <div className="flex items-center justify-center gap-6 px-12">
              {getVisibleDonors().map((donor, index) => {
                const isCenter = index === 1 && donors.length > 3;
                const position = donors.length > 3 ? 
                  index === 0 ? "left" : 
                  index === 1 ? "center" : "right" : "center";

                return (
                  <div
                    key={donor._id}
                    className={`transition-all duration-500 ease-in-out ${
                      position === "center"
                        ? "scale-100 opacity-100 z-20"
                        : "scale-90 opacity-70 z-10"
                    } ${
                      position === "left" ? "-translate-x-4" : 
                      position === "right" ? "translate-x-4" : ""
                    }`}
                    style={{
                      width: position === "center" ? "400px" : "360px",
                      flex: position === "center" ? "0 0 400px" : "0 0 360px"
                    }}
                  >
                    <div className={`bg-[var(--dashboard-bg)] rounded-2xl shadow-xl border-2 transition-all duration-300 ${
                      position === "center" 
                        ? "border-[var(--color-primary)] shadow-2xl" 
                        : "border-[var(--dashboard-border)] shadow-lg"
                    } overflow-hidden`}>
                      
                      {/* Card Header */}
                      <div className={`p-6 border-b border-[var(--dashboard-border)] ${
                        position === "center" ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80" : "bg-[var(--bg-color-all)]"
                      }`}>
                        <div className="flex items-center justify-between">
                          <h2 className={`text-xl font-bold ${
                            position === "center" ? "text-white" : "text-[var(--text-color-all)]"
                          }`}>
                            {donor.fullName}
                          </h2>
                          <div className={`badge badge-lg ${
                            donor.verified 
                              ? "bg-green-100 text-green-700 border-green-300" 
                              : "bg-yellow-100 text-yellow-700 border-yellow-300"
                          }`}>
                            {donor.verified ? "✅ Verified" : "⏳ Pending"}
                          </div>
                        </div>
                        <p className={`mt-2 text-sm ${
                          position === "center" ? "text-white/90" : "text-[var(--text-color-all)] opacity-70"
                        }`}>
                          Organ Donor Hero
                        </p>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        {/* Organs Section */}
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 text-sm">💚</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-[var(--text-color-all)] text-sm mb-1">
                              Organs Pledged
                            </h3>
                            <div className="flex flex-wrap gap-1">
                              {donor.organs?.map((organ, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium border border-green-200"
                                >
                                  {organ.trim()}
                                </span>
                              )) || "Not specified"}
                            </div>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-sm">📍</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-[var(--text-color-all)] text-sm">Location</h3>
                            <p className="text-[var(--text-color-all)] text-sm">{donor.location}</p>
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-600 text-sm">📞</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-[var(--text-color-all)] text-sm">Contact</h3>
                            <p className="text-[var(--text-color-all)] text-sm">{donor.contactNumber}</p>
                          </div>
                        </div>

                        {/* Email */}
                        {donor.email && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-orange-600 text-sm">✉️</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-[var(--text-color-all)] text-sm">Email</h3>
                              <p className="text-[var(--text-color-all)] text-sm break-all">{donor.email}</p>
                            </div>
                          </div>
                        )}

                        {/* Donation History */}
                        {donor.donationHistory?.length > 0 && (
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-indigo-600 text-sm">📋</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-[var(--text-color-all)] text-sm mb-2">
                                Donation History
                              </h3>
                              <div className="space-y-2">
                                {donor.donationHistory.slice(0, 2).map((d, i) => (
                                  <div key={i} className="bg-[var(--bg-color-all)] rounded-lg p-3">
                                    <p className="text-xs text-[var(--text-color-all)] font-medium">
                                      {new Date(d.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-xs text-[var(--text-color-all)] opacity-70">
                                      {d.hospital}
                                    </p>
                                    {d.recipient && d.recipient !== "N/A" && (
                                      <p className="text-xs text-green-600 font-medium">
                                        Recipient: {d.recipient}
                                      </p>
                                    )}
                                  </div>
                                ))}
                                {donor.donationHistory.length > 2 && (
                                  <p className="text-xs text-[var(--text-color-all)] opacity-70 text-center">
                                    +{donor.donationHistory.length - 2} more donations
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="p-4 bg-[var(--bg-color-all)] border-t border-[var(--dashboard-border)]">
                        <button className={`w-full py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
                          position === "center"
                            ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]"
                            : "bg-white text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                        }`}>
                          View Full Profile
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots Indicator */}
            {donors.length > 3 && (
              <div className="flex justify-center mt-8 space-x-2">
                {donors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[var(--color-primary)] scale-125"
                        : "bg-[var(--dashboard-border)] hover:bg-[var(--color-primary)]/50"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Counter */}
            <div className="text-center mt-6 text-[var(--text-color-all)] opacity-70">
              <p className="text-sm">
                Showing {currentIndex + 1} of {donors.length} donors
              </p>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <div className="bg-[var(--dashboard-bg)] rounded-2xl p-8 shadow-lg border border-[var(--dashboard-border)] max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-3">
              Ready to Make a Difference?
            </h3>
            <p className="text-[var(--text-color-all)] mb-4">
              Join these heroes and register as an organ donor today.
            </p>
            <button className="btn bg-[var(--color-primary)] text-white border-none hover:bg-[var(--color-secondary)] px-8">
              Become a Donor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}