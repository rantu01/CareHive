import React from 'react';
import { Calendar, Users, Award, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ChallengeCard({ challenges }) {

  const { _id, title, description, category, coverImage, difficulty, stats } = challenges
  return (
    <div className="p-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: '#ffffff' }}>
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: '#19b4b4' }}
            >
              {category}
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
              {difficulty}
            </span>
          </div>
        </div>


        <div className="p-6">
          <h2
            className="text-2xl font-bold mb-2"
            style={{
              color: '#111827',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}


          </h2>

          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: '#1e293b' }}
          >

            {description.length > 55 ? `${description.slice(0, 80)}...` : description}
          </p>

          {/* Completion Rate */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: '#1e293b' }}>Completion Rate</span>
              <span className="text-sm font-bold" style={{ color: '#19b4b4' }}>{stats?.completionRate}%</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#f1f5f9' }}>
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${stats?.completionRate}%`,
                  backgroundColor: '#19b4b4'
                }}
              />
            </div>
          </div>

          {/* Join Button */}
          <Link
            href={`challange-details/${_id}`}
            className="block w-full py-3 rounded-lg font-semibold text-white text-center transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
            style={{ backgroundColor: '#19b4b4' }}
          >
            Join Challenge
          </Link>

        </div>


      </div>
    </div>
  );
}