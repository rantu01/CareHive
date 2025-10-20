import React from 'react';
import { Calendar, Users, Award, Clock } from 'lucide-react';

export default function ChallengeCard() {
  const challenge = {
    title: "Mindful Morning Routine Challenge",
    description: "Start your day with 10 minutes of meditation and journaling for 14 days to improve focus and reduce stress.",
    category: "Mindfulness",
    coverImage: "https://cdn.pixabay.com/photo/2017/08/06/00/27/yoga-2587066_960_720.jpg",
    duration: {
      totalDays: 14
    },
    goal: {
      targetValue: 10,
      unit: "minutes"
    },
    difficulty: "medium",
    stats: {
      totalParticipants: 220,
      completionRate: 68
    },
    reward: {
      value: 80,
      title: "Mindful Master"
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f1f5f9' }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: '#ffffff' }}>
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={challenge.coverImage} 
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: '#19b4b4' }}
            >
              {challenge.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium capitalize"
              style={{ 
                backgroundColor: '#ffffff',
                color: '#1e293b'
              }}
            >
              {challenge.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ 
              color: '#111827',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {challenge.title}
          </h2>
          
          <p 
            className="text-sm mb-6 leading-relaxed"
            style={{ color: '#1e293b' }}
          >
            {challenge.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar 
                size={20} 
                style={{ color: '#19b4b4' }}
              />
              <div>
                <p className="text-xs" style={{ color: '#1e293b', opacity: 0.7 }}>Duration</p>
                <p className="font-semibold" style={{ color: '#111827' }}>{challenge.duration.totalDays} days</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock 
                size={20} 
                style={{ color: '#19b4b4' }}
              />
              <div>
                <p className="text-xs" style={{ color: '#1e293b', opacity: 0.7 }}>Daily Goal</p>
                <p className="font-semibold" style={{ color: '#111827' }}>{challenge.goal.targetValue} {challenge.goal.unit}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users 
                size={20} 
                style={{ color: '#19b4b4' }}
              />
              <div>
                <p className="text-xs" style={{ color: '#1e293b', opacity: 0.7 }}>Participants</p>
                <p className="font-semibold" style={{ color: '#111827' }}>{challenge.stats.totalParticipants}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award 
                size={20} 
                style={{ color: '#19b4b4' }}
              />
              <div>
                <p className="text-xs" style={{ color: '#1e293b', opacity: 0.7 }}>Reward</p>
                <p className="font-semibold" style={{ color: '#111827' }}>{challenge.reward.value} pts</p>
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: '#1e293b' }}>Completion Rate</span>
              <span className="text-sm font-bold" style={{ color: '#19b4b4' }}>{challenge.stats.completionRate}%</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#f1f5f9' }}>
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${challenge.stats.completionRate}%`,
                  backgroundColor: '#19b4b4'
                }}
              />
            </div>
          </div>

          {/* Join Button */}
          <button 
            className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#19b4b4' }}
          >
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
}