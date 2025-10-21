"use client";
import React, { useState } from 'react';
import { Users, ChevronUp, ChevronDown, Facebook, Twitter, Instagram, Award, TrendingUp } from 'lucide-react';

export default function ChallangeDetails() {
  const [rulesExpanded, setRulesExpanded] = useState(true);
  const [instructionsExpanded, setInstructionsExpanded] = useState(false);

  const challengeData = {
    title: "30-Day Step Challenge",
    description: "Join our 30-day step challenge to improve your physical and mental well-being. Walk your way to a healthier you, one step at a time. Embrace the journey and discover the transformative power of consistent daily movement.",
    duration: "30 Days",
    goal: "10,000 Steps/Day",
    reward: "Exclusive Badge",
    stats: {
      totalParticipants: 1254,
      completionRate: 78
    },
    rules: [
      "Track your steps daily using a fitness tracker or smartphone.",
      "Sync your data with our platform every day.",
      "Complete the daily goal for 30 consecutive days."
    ],
    checkpoints: [
      {
        day: 7,
        title: "First Week Down!",
        message: "You've made a great start. Keep up the momentum!",
        completed: true
      },
      {
        day: 15,
        title: "Halfway There!",
        message: "You are halfway through the challenge. Amazing progress!",
        completed: true
      },
      {
        day: 30,
        title: "Challenge Complete!",
        message: "Congratulations on finishing the challenge!",
        completed: false
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#19b4b4] rounded"></div>
              <span className="text-xl font-semibold text-[#1e293b]">Mindful Challenges</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-[#1e293b] hover:text-[#19b4b4] transition-colors">Fitness</a>
              <a href="#" className="text-[#1e293b] hover:text-[#19b4b4] transition-colors">Mindfulness</a>
              <a href="#" className="text-[#1e293b] hover:text-[#19b4b4] transition-colors">Growth</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="bg-[#19b4b4] hover:bg-[#3b7f81] text-white px-6 py-2 rounded-lg transition-colors font-medium">
                Join the Challenge
              </button>
              <div className="w-10 h-10 bg-[#f1f5f9] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-8">
          <img 
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=400&fit=crop" 
            alt="Person walking at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <h1 className="text-4xl sm:text-5xl font-bold text-white p-8">
              30-Day Step Challenge
            </h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#1e293b] text-lg mb-8 max-w-4xl">
          {challengeData.description}
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
            <div className="text-sm text-[#1e293b] mb-2">Duration</div>
            <div className="text-3xl font-bold text-[#111827]">{challengeData.duration}</div>
          </div>
          
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
            <div className="text-sm text-[#1e293b] mb-2">Goal</div>
            <div className="text-3xl font-bold text-[#111827]">{challengeData.goal}</div>
          </div>
          
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
            <div className="text-sm text-[#1e293b] mb-2">Reward</div>
            <div className="text-3xl font-bold text-[#111827]">{challengeData.reward}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rules */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
              <button 
                onClick={() => setRulesExpanded(!rulesExpanded)}
                className="w-full flex items-center justify-between p-6 hover:bg-[#f8fafc] transition-colors"
              >
                <span className="text-xl font-semibold text-[#111827]">Rules</span>
                {rulesExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {rulesExpanded && (
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {challengeData.rules.map((rule, index) => (
                      <li key={index} className="flex gap-3 text-[#1e293b]">
                        <span className="text-[#19b4b4] font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
              <button 
                onClick={() => setInstructionsExpanded(!instructionsExpanded)}
                className="w-full flex items-center justify-between p-6 hover:bg-[#f8fafc] transition-colors"
              >
                <span className="text-xl font-semibold text-[#111827]">Instructions</span>
                {instructionsExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {instructionsExpanded && (
                <div className="px-6 pb-6">
                  <p className="text-[#1e293b]">
                    Use your smartwatch or fitness app to sync step data automatically. Ensure your device is connected to our platform for accurate tracking.
                  </p>
                </div>
              )}
            </div>

            {/* Checkpoints */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-6">Checkpoints</h3>
              <div className="space-y-4">
                {challengeData.checkpoints.map((checkpoint, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                      checkpoint.completed ? 'bg-[#19b4b4]' : 'bg-[#e2e8f0]'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#111827]">
                        Day {checkpoint.day}: {checkpoint.title}
                      </div>
                      <div className="text-sm text-[#1e293b] mt-1">
                        {checkpoint.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-6">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#111827] mb-6">Statistics</h3>
              
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-[#19b4b4]" size={24} />
                  <div className="text-3xl font-bold text-[#111827]">
                    {challengeData.stats.totalParticipants.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-[#1e293b]">Total Participants</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-[#1e293b]">Completion Rate</div>
                  <div className="text-xl font-bold text-[#111827]">
                    {challengeData.stats.completionRate}%
                  </div>
                </div>
                <div className="w-full bg-[#e2e8f0] rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] h-2.5 rounded-full transition-all"
                    style={{ width: `${challengeData.stats.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 bg-white border border-[#e2e8f0] rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-lg font-semibold text-[#111827]">Share your progress!</span>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-[#f1f5f9] hover:bg-[#19b4b4] hover:text-white transition-all flex items-center justify-center">
                <Facebook size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#f1f5f9] hover:bg-[#19b4b4] hover:text-white transition-all flex items-center justify-center">
                <Twitter size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#f1f5f9] hover:bg-[#19b4b4] hover:text-white transition-all flex items-center justify-center">
                <Instagram size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}