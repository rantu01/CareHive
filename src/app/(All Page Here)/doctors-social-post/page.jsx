"use client";
import React from "react";

const categories = ["Fitness", "Diet", "Yoga", "Mental Health"];

const Page = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Health Interaction</h1>

      {/* Static Post Form */}
      <form className="bg-white p-4 rounded shadow space-y-3">
        <input
          type="text"
          placeholder="Enter title"
          className="w-full border p-2 rounded"
         
        />
        <textarea
          placeholder="Write your blog or health tip..."
          className="w-full border p-2 rounded"
          rows={3}
         
        />
        <select className="w-full border p-2 rounded">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="button"
      
          className="bg-blue-600 text-white px-4 py-2 rounded "
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Page;
