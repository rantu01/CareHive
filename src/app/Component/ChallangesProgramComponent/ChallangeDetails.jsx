"use client";

import React, { use, useState } from 'react';
import { Users, ChevronUp, ChevronDown, Facebook, Twitter, Instagram } from 'lucide-react';
import { AuthContext } from '@/app/context/authContext';

export default function StepChallenge() {
    const [rulesExpanded, setRulesExpanded] = useState(true);
    const [instructionsExpanded, setInstructionsExpanded] = useState(false);

    const { user } = use(AuthContext)
    console.log(user)

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
            { day: 7, title: "First Week Down!", message: "You've made a great start. Keep up the momentum!", completed: true },
            { day: 15, title: "Halfway There!", message: "You are halfway through the challenge. Amazing progress!", completed: true },
            { day: 30, title: "Challenge Complete!", message: "Congratulations on finishing the challenge!", completed: false }
        ]
    };

    return (
        <div className="min-h-screen bg-[var(--dashboard-bg)]">
            {/* Header */}
            <header className="border-b border-[var(--dashboard-border)] ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[var(--color-primary)] rounded"></div>
                            <span className="text-xl font-semibold text-[var(--text-color-all)]">Mindful Challenges</span>
                        </div>

                        <nav className="hidden md:flex items-center gap-8">
                            <p className="text-[var(--text-color-all)] hover:text-[var(--color-primary)] transition-colors">Fitness</p>
                            <p className="text-[var(--text-color-all)] hover:text-[var(--color-primary)] transition-colors">Mindfulness</p>
                            <p className="text-[var(--text-color-all)] hover:text-[var(--color-primary)] transition-colors">Growth</p>
                        </nav>

                        <div className="flex items-center gap-4">
                            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-white)] px-6 py-2 rounded-lg transition-colors font-medium">
                                Join the Challenge
                            </button>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={user?.photoURL} alt={user?.displayName} />
                                </div>
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
                        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-white)] p-8">
                            30-Day Step Challenge
                        </h1>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[var(--text-color-all)] text-lg mb-8 max-w-4xl">
                    {challengeData.description}
                </p>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl p-6">
                        <div className="text-sm text-[var(--text-color-all)] mb-2">Duration</div>
                        <div className="text-3xl font-bold text-[var(--text-color-all)]">{challengeData.duration}</div>
                    </div>

                    <div className="bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl p-6">
                        <div className="text-sm text-[var(--text-color-all)] mb-2">Goal</div>
                        <div className="text-3xl font-bold text-[var(--text-color-all)]">{challengeData.goal}</div>
                    </div>

                    <div className="bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl p-6">
                        <div className="text-sm text-[var(--text-color-all)] mb-2">Reward</div>
                        <div className="text-3xl font-bold text-[var(--text-color-all)]">{challengeData.reward}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Rules */}
                        <div className="bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl overflow-hidden">
                            <button
                                onClick={() => setRulesExpanded(!rulesExpanded)}
                                className="w-full flex items-center justify-between p-6 hover:bg-[var(--bg-color-all)] transition-colors text-[var(--text-color-all)]"
                            >
                                <span className="text-xl font-semibold text-[var(--text-color-all)]">Rules</span>
                                {rulesExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </button>

                            {rulesExpanded && (
                                <div className="px-6 pb-6">
                                    <ul className="space-y-3">
                                        {challengeData.rules.map((rule, index) => (
                                            <li key={index} className="flex gap-3 text-[var(--text-color-all)]">
                                                <span className="text-[var(--color-primary)] font-bold">•</span>
                                                <span>{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Instructions */}
                        <div className="bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl overflow-hidden">
                            <button
                                onClick={() => setInstructionsExpanded(!instructionsExpanded)}
                                className="w-full flex items-center justify-between p-6 hover:bg-[var(--bg-color-all)] transition-colors text-[var(--text-color-all)]"
                            >
                                <span className="text-xl font-semibold text-[var(--text-color-all)]">Instructions</span>
                                {instructionsExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </button>

                            {instructionsExpanded && (
                                <div className="px-6 pb-6">
                                    <p className="text-[var(--text-color-all)]">
                                        Use your smartwatch or fitness app to sync step data automatically. Ensure your device is connected to our platform for accurate tracking.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Checkpoints */}
                        <div className="bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-[var(--text-color-all)] mb-6">Checkpoints</h3>
                            <div className="space-y-4">
                                {challengeData.checkpoints.map((checkpoint, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${checkpoint.completed ? 'bg-[var(--color-primary)]' : 'bg-[var(--dashboard-border)]'
                                            }`}></div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-[var(--text-color-all)]">
                                                Day {checkpoint.day}: {checkpoint.title}
                                            </div>
                                            <div className="text-sm text-[var(--text-color-all)] mt-1">
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
                        <div className="bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-[var(--text-color-all)] mb-6">Statistics</h3>

                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="text-[var(--color-primary)]" size={24} />
                                    <div className="text-3xl font-bold text-[var(--text-color-all)]">
                                        {challengeData.stats.totalParticipants.toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-sm text-[var(--text-color-all)]">Total Participants</div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm text-[var(--text-color-all)]">Completion Rate</div>
                                    <div className="text-xl font-bold text-[var(--text-color-all)]">
                                        {challengeData.stats.completionRate}%
                                    </div>
                                </div>
                                <div className="w-full bg-[var(--dashboard-border)] rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] h-2.5 rounded-full transition-all"
                                        style={{ width: `${challengeData.stats.completionRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Share Section */}
                <div className="mt-12 bg-[var(--bg-color-all)] border border-[var(--dashboard-border)] rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-lg font-semibold text-[var(--text-color-all)]">Share your progress!</span>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-[var(--bg-color-all)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-all flex items-center justify-center text-[var(--text-color-all)]">
                                <Facebook size={20} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-[var(--bg-color-all)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-all flex items-center justify-center text-[var(--text-color-all)]">
                                <Twitter size={20} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-[var(--bg-color-all)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] transition-all flex items-center justify-center text-[var(--text-color-all)]">
                                <Instagram size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}