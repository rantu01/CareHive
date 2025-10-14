// src/app/(public)/(All Page Here)/all-gym-plans/page.jsx
"use client";

import React, { useEffect, useState } from "react";

const AllGymPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/gym-plans");
      const data = await res.json();
      if (data.success) {
        setPlans(data.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Error fetching gym plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading gym plans...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">All Gym Plans</h1>
      {plans.length === 0 ? (
        <p className="text-center">No gym plans found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="p-6 border rounded-2xl shadow-md bg-white/10 backdrop-blur-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{plan.planName}</h2>
              <p className="mb-1">Category: {plan.category}</p>
              <p className="mb-1">Duration: {plan.duration}</p>
              <p className="mb-1">Intensity: {plan.intensity}</p>
              {plan.exercises && <p className="mb-1">Exercises: {plan.exercises}</p>}
              {plan.equipment && <p className="mb-1">Equipment: {plan.equipment}</p>}
              {plan.description && <p className="mb-2">Description: {plan.description}</p>}
              {plan.image && (
                <img
                  src={plan.image}
                  alt={plan.planName}
                  className="w-full h-48 object-cover rounded-lg mt-2"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGymPlansPage;
