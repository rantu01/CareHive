"use client";

import { useEffect, useState } from "react";

export default function OrganDonorsPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [organFilter, setOrganFilter] = useState("");
  const [activeTab, setActiveTab] = useState("carousel");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch("/api/organ-donation");
        if (!res.ok) throw new Error("Failed to fetch organ donors");
        
        let data = await res.json();

        // Normalize each donor to always have an 'organs' array
        data = data.map(donor => ({
          ...donor,
          organs: donor.organs || []  // ensure 'organs' exists
        }));

        setDonors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDonors();
  }, []);

  useEffect(() => {
    if (donors.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % donors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [donors.length]);

  const nextDonor = () => setCurrentIndex((prev) => (prev + 1) % donors.length);
  const prevDonor = () =>
    setCurrentIndex((prev) => (prev - 1 + donors.length) % donors.length);

  const getVisibleDonors = () => {
    if (donors.length <= 3) return donors;
    const left = (currentIndex - 1 + donors.length) % donors.length;
    const right = (currentIndex + 1) % donors.length;
    return [donors[left], donors[currentIndex], donors[right]];
  };

  // Filter donors based on search and organ filter
  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (donor.email && donor.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesOrgan = organFilter
      ? donor.organs?.some((organ) => organ.toLowerCase() === organFilter.toLowerCase())
      : true;
    return matchesSearch && matchesOrgan;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonors = filteredDonors.slice(startIndex, endIndex);

  // Pagination controls
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, organFilter]);

  const organColors = {
    Heart: "bg-[var(--color-primary)]",
    Liver: "bg-[var(--color-primary)]",
    Kidney: "bg-[var(--color-primary)]",
    Lungs: "bg-[var(--color-primary)]",
    Pancreas: "bg-[var(--color-primary)]",
    Cornea: "bg-[var(--color-primary)]",
    Skin: "bg-[var(--color-primary)]",
    "Bone Marrow": "bg-[var(--color-primary)]",
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
        {/* Header */}
        <div className="text-center mb-12 px-2 sm:px-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl text-white">💚</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-[var(--color-secondary)] font-heading">
            Organ Donor Heroes
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-color-all)] max-w-2xl mx-auto">
            Meet the incredible individuals who have pledged to save lives through organ donation
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">{donors.length}</div>
              <div className="text-sm text-[var(--text-color-all)] opacity-70">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {donors.reduce((acc, donor) => acc + (donor.organs?.length || 0), 0)}
              </div>
              <div className="text-sm text-[var(--text-color-all)] opacity-70">Organs Pledged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {donors.filter(d => d.verified).length}
              </div>
              <div className="text-sm text-[var(--text-color-all)] opacity-70">Verified Heroes</div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-[var(--dashboard-bg)] rounded-2xl p-1.5 shadow-lg border border-[var(--dashboard-border)]">
            <button
              onClick={() => setActiveTab("carousel")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "carousel"
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "text-[var(--text-color-all)] hover:text-[var(--color-secondary)]"
              }`}
            >
              Featured Heroes
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "table"
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "text-[var(--text-color-all)] hover:text-[var(--color-secondary)]"
              }`}
            >
              All Donors
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[var(--text-color-all)] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--text-color-all)] transition-all duration-300"
            />
          </div>
          <select
            value={organFilter}
            onChange={(e) => setOrganFilter(e.target.value)}
            className="w-full md:w-64 px-4 py-3 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--text-color-all)] transition-all duration-300"
          >
            <option value="">All Organs</option>
            {Object.keys(organColors).map(organ => (
              <option key={organ} value={organ}>{organ}</option>
            ))}
          </select>
        </div>

        {/* Carousel View */}
        {activeTab === "carousel" && (
          <>
            {donors.length === 0 ? (
              <div className="text-center py-16 bg-[var(--dashboard-bg)] rounded-3xl shadow-xl border border-[var(--dashboard-border)]">
                <div className="w-24 h-24 mx-auto mb-6 bg-[var(--bg-color-all)] rounded-full flex items-center justify-center">
                  <span className="text-3xl">💔</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-color-all)] mb-3">No Heroes Yet</h3>
                <p className="text-[var(--text-color-all)] opacity-70 max-w-md mx-auto">
                  Be the first to join our network of life-savers and make a difference that lasts forever.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Navigation */}
                <button
                  onClick={prevDonor}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-[var(--text-color-all)] group-hover:text-[var(--color-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextDonor}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-[var(--text-color-all)] group-hover:text-[var(--color-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Cards Container */}
                <div className="flex items-center justify-center gap-6 px-12">
                  {getVisibleDonors().map((donor, i) => {
                    const position = i === 1 ? "center" : i === 0 ? "left" : "right";
                    return (
                      <div
                        key={donor._id}
                        className={`transition-all duration-700 ease-out ${
                          position === "center"
                            ? "scale-100 opacity-100 z-10 transform -translate-y-2"
                            : "scale-90 opacity-70 z-0"
                        } w-full max-w-md`}
                      >
                        <div className={`bg-[var(--dashboard-bg)] rounded-3xl shadow-2xl border border-[var(--dashboard-border)] overflow-hidden transition-all duration-500 ${
                          position === "center" ? "ring-4 ring-[var(--color-primary)]/20" : ""
                        }`}>
                          {/* Header */}
                          <div className={`p-6 ${
                            donor.verified 
                              ? "bg-[var(--color-primary)]" 
                              : "bg-amber-500"
                          } text-white relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl font-bold">{donor.fullName}</h2>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  donor.verified 
                                    ? "bg-white/20 text-white" 
                                    : "bg-white/30 text-white"
                                }`}>
                                  {donor.verified ? "✅ Verified Hero" : "⏳ Awaiting Verification"}
                                </div>
                              </div>
                              <p className="text-white/90 text-sm">Life Giver • Organ Donor</p>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-6 space-y-4">
                            {/* Organs */}
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-[var(--color-primary)] text-lg">💚</span>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-[var(--text-color-all)] text-sm mb-2">Organs Pledged</h3>
                                <div className="flex flex-wrap gap-2">
                                  {donor.organs?.map((organ, i) => (
                                    <span 
                                      key={i}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[var(--color-primary)] shadow-sm`}
                                    >
                                      {organ.trim()}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-[var(--color-primary)] text-lg">📍</span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-[var(--text-color-all)] text-sm">Location</h3>
                                <p className="text-[var(--text-color-all)] text-sm">{donor.location}</p>
                              </div>
                            </div>

                            {/* Contact */}
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-[var(--color-primary)] text-lg">📞</span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-[var(--text-color-all)] text-sm">Contact</h3>
                                <p className="text-[var(--text-color-all)] text-sm">{donor.contactNumber}</p>
                              </div>
                            </div>

                            {/* Email */}
                            {donor.email && (
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <span className="text-[var(--color-primary)] text-lg">✉️</span>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-[var(--text-color-all)] text-sm">Email</h3>
                                  <p className="text-[var(--text-color-all)] text-sm break-all">{donor.email}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="p-4 bg-[var(--bg-color-all)] border-t border-[var(--dashboard-border)]">
                            <button className="w-full py-3 px-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                              View Hero Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dots */}
                {donors.length > 3 && (
                  <div className="flex justify-center mt-8 space-x-3">
                    {donors.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "bg-[var(--color-primary)] scale-125 shadow-lg"
                            : "bg-[var(--dashboard-border)] hover:bg-[var(--color-primary)]/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Counter */}
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-[var(--dashboard-bg)] px-4 py-2 rounded-full shadow-lg border border-[var(--dashboard-border)]">
                    <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-[var(--text-color-all)]">
                      Hero {currentIndex + 1} of {donors.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Table View */}
        {activeTab === "table" && (
          <div className="bg-[var(--dashboard-bg)] rounded-3xl shadow-2xl border border-[var(--dashboard-border)] overflow-hidden">
            <div className="p-6 border-b border-[var(--dashboard-border)] flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-secondary)]">All Life Savers</h3>
                <p className="text-[var(--text-color-all)] mt-1">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredDonors.length)} of {filteredDonors.length} donors
                </p>
              </div>
              
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--text-color-all)]">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-sm text-[var(--text-color-all)]"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--bg-color-all)] border-b border-[var(--dashboard-border)]">
                    <th className="px-6 py-4 text-left font-semibold text-[var(--color-secondary)]">Hero</th>
                    <th className="px-6 py-4 text-left font-semibold text-[var(--color-secondary)]">Organs</th>
                    <th className="px-6 py-4 text-left font-semibold text-[var(--color-secondary)]">Location</th>
                    <th className="px-6 py-4 text-left font-semibold text-[var(--color-secondary)]">Contact</th>
                    <th className="px-6 py-4 text-left font-semibold text-[var(--color-secondary)]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--dashboard-border)]">
                  {currentDonors.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-[var(--text-color-all)] opacity-70">No matching heroes found</div>
                      </td>
                    </tr>
                  ) : (
                    currentDonors.map((donor) => (
                      <tr key={donor._id} className="hover:bg-[var(--bg-color-all)] transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center">
                              <span className="text-[var(--color-primary)]">❤️</span>
                            </div>
                            <div>
                              <div className="font-semibold text-[var(--text-color-all)]">{donor.fullName}</div>
                              <div className="text-sm text-[var(--text-color-all)] opacity-70">{donor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {donor.organs?.map((organ, i) => (
                              <span 
                                key={i}
                                className={`px-2 py-1 rounded-md text-xs font-medium text-white bg-[var(--color-primary)]`}
                              >
                                {organ.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[var(--text-color-all)]">{donor.location}</td>
                        <td className="px-6 py-4 text-[var(--text-color-all)]">{donor.contactNumber}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            donor.verified
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {donor.verified ? "✅ Verified" : "⏳ Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-[var(--dashboard-border)] bg-[var(--bg-color-all)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[var(--text-color-all)]">
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        currentPage === 1
                          ? "bg-[var(--dashboard-border)] text-[var(--text-color-all)] opacity-50 cursor-not-allowed"
                          : "bg-[var(--dashboard-bg)] text-[var(--text-color-all)] border border-[var(--dashboard-border)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium text-sm transition-all duration-300 ${
                              currentPage === pageNum
                                ? "bg-[var(--color-primary)] text-white shadow-md"
                                : "bg-[var(--dashboard-bg)] text-[var(--text-color-all)] border border-[var(--dashboard-border)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        currentPage === totalPages
                          ? "bg-[var(--dashboard-border)] text-[var(--text-color-all)] opacity-50 cursor-not-allowed"
                          : "bg-[var(--dashboard-bg)] text-[var(--text-color-all)] border border-[var(--dashboard-border)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}