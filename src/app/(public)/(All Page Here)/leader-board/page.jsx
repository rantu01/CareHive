"use client";

import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Calendar, Filter, Search, Crown, Star, Zap } from 'lucide-react';

const LeaderboardPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for top performers
  const topPerformers = [
    { id: 1, name: 'Sarah Chen', score: 2847, avatar: 'SC', streak: 45, rank: 1, trend: '+12%' },
    { id: 2, name: 'Alex Kumar', score: 2653, avatar: 'AK', streak: 38, rank: 2, trend: '+8%' },
    { id: 3, name: 'Maya Rodriguez', score: 2541, avatar: 'MR', streak: 42, rank: 3, trend: '+15%' }
  ];

  // Mock data for leaderboard
  const leaderboardData = [
    { id: 4, name: 'John Smith', score: 2398, avatar: 'JS', streak: 28, challenges: 156, trend: '+5%' },
    { id: 5, name: 'Emma Wilson', score: 2287, avatar: 'EW', streak: 35, challenges: 142, trend: '+7%' },
    { id: 6, name: 'David Lee', score: 2156, avatar: 'DL', streak: 21, challenges: 138, trend: '+3%' },
    { id: 7, name: 'Sofia Garcia', score: 2089, avatar: 'SG', streak: 31, challenges: 145, trend: '+9%' },
    { id: 8, name: 'Michael Brown', score: 1998, avatar: 'MB', streak: 19, challenges: 133, trend: '+4%' },
    { id: 9, name: 'Lisa Anderson', score: 1876, avatar: 'LA', streak: 27, challenges: 129, trend: '+6%' },
    { id: 10, name: 'Ryan Park', score: 1754, avatar: 'RP', streak: 15, challenges: 121, trend: '+2%' }
  ];

  const challenges = ['All Challenges', 'Code Sprint', 'Design Quest', 'Algorithm Master', 'Data Wizard'];
  const timeFilters = ['Daily', 'Weekly', 'Monthly', 'All Time'];

  const getPodiumColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 via-amber-500 to-yellow-600';
    if (rank === 2) return 'from-slate-300 via-slate-400 to-slate-500';
    if (rank === 3) return 'from-orange-400 via-amber-600 to-orange-700';
  };

  const getPodiumHeight = (rank) => {
    if (rank === 1) return 'h-72';
    if (rank === 2) return 'h-56';
    if (rank === 3) return 'h-48';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2 mb-6">
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-purple-300 text-sm font-medium">Live Competition</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Global Leaderboard
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Compete with the best minds worldwide and climb to the top
          </p>
        </header>

        {/* Top Performers Podium */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Top Champions</h2>
            <Crown className="w-6 h-6 text-yellow-400" />
          </div>

          <div className="flex items-end justify-center gap-6 px-4">
            {/* Second Place */}
            <div className="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-2xl font-bold text-white shadow-2xl border-4 border-slate-400 group-hover:shadow-slate-400/50 transition-all duration-300">
                  {topPerformers[1].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {topPerformers[1].trend}
                </div>
              </div>
              <div className={`${getPodiumHeight(2)} w-40 bg-gradient-to-br ${getPodiumColor(2)} rounded-t-2xl shadow-2xl flex flex-col items-center justify-start pt-8 border-t-4 border-slate-200 group-hover:shadow-slate-400/50 transition-all duration-300`}>
                <Medal className="w-12 h-12 text-white mb-3" />
                <h3 className="text-white font-bold text-lg text-center px-2">{topPerformers[1].name}</h3>
                <p className="text-2xl font-bold text-white mt-2">{topPerformers[1].score}</p>
                <div className="flex items-center gap-1 mt-2 text-slate-100">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{topPerformers[1].streak} day streak</span>
                </div>
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-yellow-300 group-hover:shadow-yellow-400/50 transition-all duration-300 animate-pulse">
                  {topPerformers[0].avatar}
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Crown className="w-12 h-12 text-yellow-300 animate-bounce" />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {topPerformers[0].trend}
                </div>
              </div>
              <div className={`${getPodiumHeight(1)} w-44 bg-gradient-to-br ${getPodiumColor(1)} rounded-t-2xl shadow-2xl flex flex-col items-center justify-start pt-8 border-t-4 border-yellow-300 group-hover:shadow-yellow-400/50 transition-all duration-300`}>
                <Trophy className="w-14 h-14 text-white mb-3 animate-pulse" />
                <h3 className="text-white font-bold text-xl text-center px-2">{topPerformers[0].name}</h3>
                <p className="text-3xl font-bold text-white mt-2">{topPerformers[0].score}</p>
                <div className="flex items-center gap-1 mt-2 text-yellow-100">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{topPerformers[0].streak} day streak</span>
                </div>
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl font-bold text-white shadow-2xl border-4 border-orange-400 group-hover:shadow-orange-400/50 transition-all duration-300">
                  {topPerformers[2].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {topPerformers[2].trend}
                </div>
              </div>
              <div className={`${getPodiumHeight(3)} w-40 bg-gradient-to-br ${getPodiumColor(3)} rounded-t-2xl shadow-2xl flex flex-col items-center justify-start pt-8 border-t-4 border-orange-300 group-hover:shadow-orange-400/50 transition-all duration-300`}>
                <Award className="w-12 h-12 text-white mb-3" />
                <h3 className="text-white font-bold text-lg text-center px-2">{topPerformers[2].name}</h3>
                <p className="text-2xl font-bold text-white mt-2">{topPerformers[2].score}</p>
                <div className="flex items-center gap-1 mt-2 text-orange-100">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{topPerformers[2].streak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search participants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Challenge Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  {challenges.map((challenge, idx) => (
                    <option key={idx} value={challenge.toLowerCase().replace(' ', '-')}>
                      {challenge}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Filter */}
            <div className="flex gap-2">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter.toLowerCase())}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    timeFilter === filter.toLowerCase()
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Participant</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Streak</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Challenges</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leaderboardData.map((user, idx) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-slate-500 group-hover:text-purple-400 transition-colors">
                          #{user.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-purple-500/50 transition-all">
                          {user.avatar}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold text-white">{user.score}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-300 font-semibold">{user.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-300 font-medium">{user.challenges}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 font-semibold">{user.trend}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
            Load More Results
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LeaderboardPage;