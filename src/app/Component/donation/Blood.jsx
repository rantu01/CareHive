"use client";

import { useEffect, useState } from "react";
import { Sparkles, Droplets, Heart, Shield } from "lucide-react";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import Link from "next/link";

export default function Blood() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");

  // Stats for impact section
  const [stats, setStats] = useState({
    totalDonors: 0,
    livesSaved: 0,
    activeDonors: 0,
  });

  // ✅ Fetch only blood donors
  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch("/api/blood-donation");
        if (!res.ok) throw new Error("Failed to fetch blood donors");
        const data = await res.json();

        const bloodDonors = data.filter(
          (donor) => donor.type && donor.type.toLowerCase() === "blood"
        );

        setDonors(bloodDonors);
        setFilteredDonors(bloodDonors);

        // Calculate stats
        setStats({
          totalDonors: bloodDonors.length,
          livesSaved: bloodDonors.length * 3, // Assuming each donor can save 3 lives
          activeDonors: bloodDonors.filter((d) => d.verified).length,
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDonors();
  }, []);

  // ✅ Handle Search + Filter
  useEffect(() => {
    let results = donors;

    if (searchQuery.trim()) {
      results = results.filter((donor) =>
        donor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (bloodFilter) {
      results = results.filter(
        (donor) =>
          donor.bloodGroup &&
          donor.bloodGroup.toLowerCase() === bloodFilter.toLowerCase()
      );
    }

    setFilteredDonors(results);
  }, [searchQuery, bloodFilter, donors]);

  // ✅ Loading
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color-all)]">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Heart className="w-6 h-6 text-[var(--color-primary)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="mt-4 text-[var(--text-color-all)] text-lg font-semibold">
            Loading Life Savers...
          </p>
        </div>
      </div>
    );

  // ✅ Error
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color-all)]">
        <div className="text-center p-8 rounded-2xl bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">
            Connection Issue
          </h3>
          <p className="text-[var(--text-color-all)]">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color-all)",
        color: "var(--text-color-all)",
      }}
    >
      {/* HERO SECTION - Enhanced */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-16 py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-primary)]/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--color-secondary)]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[var(--color-primary)]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              <Droplets className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                Life Saving Community
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-[var(--color-secondary)]">Donate</span>
              <br />
              <span className="text-[var(--color-primary)]">Blood,</span>
              <br />
              <span className="text-[var(--color-secondary)]">Save Lives</span>
            </h1>

            <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
              Join thousands of heroes who are making a difference. Your single
              donation can save up to 3 lives. Be the reason someone smiles
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#fff",
                }}
              >
                <Link href="dashboard/user/add-donor">
                  <span className="relative z-10">Become a Donor</span>
                </Link>

                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button
                className="px-8 py-4 rounded-xl font-bold border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://i.ibb.co/s9w0rb5h/donar.jpg"
                alt="Blood Donor Hero"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -top-4 -left-4 bg-[var(--dashboard-bg)] p-4 rounded-xl shadow-lg border border-[var(--dashboard-border)]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="font-bold text-[var(--color-secondary)]">
                  {stats.activeDonors}+
                </span>
              </div>
              <p className="text-xs opacity-70">Active Donors</p>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-[var(--dashboard-bg)] p-4 rounded-xl shadow-lg border border-[var(--dashboard-border)]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-bold text-[var(--color-secondary)]">
                  {stats.livesSaved}+
                </span>
              </div>
              <p className="text-xs opacity-70">Lives Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS SECTION */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--dashboard-bg)] p-8 rounded-2xl border border-[var(--dashboard-border)] text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">
                {stats.totalDonors}
              </h3>
              <p className="text-[var(--text-color-all)] opacity-80">
                Registered Donors
              </p>
            </div>

            <div className="bg-[var(--dashboard-bg)] p-8 rounded-2xl border border-[var(--dashboard-border)] text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">
                {stats.livesSaved}
              </h3>
              <p className="text-[var(--text-color-all)] opacity-80">
                Lives Impacted
              </p>
            </div>

            <div className="bg-[var(--dashboard-bg)] p-8 rounded-2xl border border-[var(--dashboard-border)] text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">
                {stats.activeDonors}
              </h3>
              <p className="text-[var(--text-color-all)] opacity-80">
                Verified Heroes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Search + Filter Bar - Enhanced */}
      <section className="py-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[var(--dashboard-bg)] rounded-2xl p-8 border border-[var(--dashboard-border)] shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">
                Find Your Blood Match
              </h2>
              <p className="text-[var(--text-color-all)] opacity-80">
                Search through our verified donors and connect instantly
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Search Input */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search by donor name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-[var(--dashboard-border)] rounded-xl bg-transparent text-[var(--text-color-all)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Blood Group Filter */}
              <div className="w-full lg:w-auto">
                <select
                  value={bloodFilter}
                  onChange={(e) => setBloodFilter(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-[var(--dashboard-border)] rounded-xl bg-transparent text-[var(--text-color-all)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
                >
                  <option value="">All Blood Groups</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DONOR CARDS - Enhanced */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3"
              style={{ color: "var(--color-secondary)" }}
            >
              Our Life Savers
              <Sparkles
                className="w-8 h-8"
                style={{ color: "var(--color-secondary)" }}
              />
            </h2>
            <p className="text-xl opacity-70 max-w-2xl mx-auto">
              Meet the heroes who are ready to donate blood and save lives in
              your community
            </p>
          </div>

          {filteredDonors.length === 0 ? (
            <div className="text-center py-20 bg-[var(--dashboard-bg)] rounded-2xl border border-[var(--dashboard-border)]">
              <div className="w-24 h-24 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-2">
                No Donors Found
              </h3>
              <p className="text-lg opacity-70 max-w-md mx-auto">
                {searchQuery || bloodFilter
                  ? "Try adjusting your search criteria"
                  : "Be the first to register as a blood donor in your area"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="group relative bg-[var(--dashboard-bg)] rounded-2xl overflow-hidden border border-[var(--dashboard-border)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Verified Badge */}
                  {donor.verified && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <AiOutlineCheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                  )}

                  {/* Header with Gradient */}
                  <div className="h-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"></div>

                  <div className="p-6">
                    {/* Donor Info */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src={
                            donor.image ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt={donor.fullName}
                          className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {donor.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <AiOutlineCheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl font-bold truncate"
                          style={{ color: "var(--color-secondary)" }}
                        >
                          {donor.fullName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                              donor.bloodGroup
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {donor.bloodGroup || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Donor Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-color-all)]">
                        <AiOutlinePhone className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                        <span className="text-sm truncate">
                          {donor.contactNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-color-all)]">
                        <AiOutlineMail className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                        <span className="text-sm truncate">
                          {donor.email || "Not provided"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-color-all)]">
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm truncate">
                          {donor.location}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <a
                      href={`https://wa.me/${donor.contactNumber.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=I%20need%20blood%20donation%20help`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-xl font-bold text-center shadow-lg hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "#fff",
                      }}
                    >
                      <span className="relative z-10">
                        Contact via WhatsApp
                      </span>
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Save a Life?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join our community of heroes today. Your donation could be the
                difference between life and death for someone in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-[var(--color-primary)] rounded-xl font-bold hover:scale-105 transition-transform duration-300">
                  Register as Donor
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300">
                  Learn About Donation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add missing icon component
function Users(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  );
}
