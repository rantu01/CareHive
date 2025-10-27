"use client";

import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Flame, 
  Bike, 
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const LeaderboardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const participants = [
    {
      rank: 4,
      name: "Michael Lee",
      avatar: "https://i.pravatar.cc/150?u=michael",
      score: "15,840",
      achievements: [
        { icon: Trophy, color: "text-yellow-500" },
        { icon: Target, color: "text-green-500" }
      ]
    },
    {
      rank: 5,
      name: "You",
      avatar: "https://i.pravatar.cc/150?u=you",
      score: "14,990",
      achievements: [
        { icon: Target, color: "text-cyan-500" }
      ],
      isCurrentUser: true
    },
    {
      rank: 6,
      name: "Jessica Williams",
      avatar: "https://i.pravatar.cc/150?u=jessica",
      score: "14,500",
      achievements: [
        { icon: Target, color: "text-green-500" },
        { icon: Bike, color: "text-purple-500" }
      ]
    },
    {
      rank: 7,
      name: "Chris Brown",
      avatar: "https://i.pravatar.cc/150?u=chris",
      score: "13,780",
      achievements: [
        { icon: Target, color: "text-green-500" }
      ]
    },
    {
      rank: 8,
      name: "Emily Jones",
      avatar: "https://i.pravatar.cc/150?u=emily",
      score: "12,950",
      achievements: [
        { icon: Flame, color: "text-red-500" }
      ]
    }
  ];

  return (
    <div className="w-full bg-[var(--color-secondary)] bg-opacity-5 rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[var(--color-secondary)] border-opacity-20 font-semibold">
        <div className="col-span-1">Rank</div>
        <div className="col-span-5 md:col-span-4">Participant</div>
        <div className="col-span-3 md:col-span-4 text-center md:text-left">Score</div>
        <div className="col-span-3 md:col-span-3 text-right">Achievements</div>
      </div>

      {/* Table Body */}
      <div>
        {participants.map((participant) => (
          <div
            key={participant.rank}
            className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all hover:bg-[var(--color-primary)] hover:bg-opacity-5 ${
              participant.isCurrentUser 
                ? 'bg-[var(--color-primary)] bg-opacity-10 border-l-4 border-[var(--color-primary)]' 
                : ''
            }`}
          >
            {/* Rank */}
            <div className="col-span-1 font-semibold text-lg">
              {participant.rank}
            </div>

            {/* Participant */}
            <div className="col-span-5 md:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--color-primary)] bg-opacity-20 flex-shrink-0">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium truncate">{participant.name}</span>
            </div>

            {/* Score */}
            <div className="col-span-3 md:col-span-4 font-bold text-center md:text-left">
              {participant.score}
            </div>

            {/* Achievements */}
            <div className="col-span-3 md:col-span-3 flex items-center justify-end gap-2">
              {participant.achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-[var(--color-secondary)] bg-opacity-10 flex items-center justify-center"
                  >
                    <Icon className={`w-4 h-4 ${achievement.color}`} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-secondary)] border-opacity-20">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--color-primary)] hover:bg-opacity-10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="text-sm">
          Page <span className="font-semibold">{currentPage}</span> of{' '}
          <span className="font-semibold">{totalPages}</span>
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--color-primary)] hover:bg-opacity-10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LeaderboardTable;