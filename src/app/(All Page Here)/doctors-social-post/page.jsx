"use client";
import { AuthContext } from "@/app/context/authContext";
import React, { useContext, useEffect, useState } from "react";

const categories = ["Fitness", "Diet", "Yoga", "Mental Health"];

const page = () => {
  const { user } = useContext(AuthContext); // logged-in doctor
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Fitness",
  });

  // Load posts from localStorage on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem("doctorPosts");
    if (storedPosts) setPosts(JSON.parse(storedPosts));
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("doctorPosts", JSON.stringify(posts));
  }, [posts]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in as a doctor to post.");
      return;
    }
    const newPost = {
      id: Date.now(),
      doctor: user.email,
      ...form,
    };
    setPosts([newPost, ...posts]); // newest first
    setForm({ title: "", content: "", category: "Fitness" });
  };

  // Delete a post
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("doctorPosts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Health Interaction</h1>

      {/* Post Form */}
      {user ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow space-y-3"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog or health tip..."
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Post
          </button>
        </form>
      ) : (
        <p className="text-red-500 mb-6">Please log in as a doctor to post.</p>
      )}

      {/* Display Posts */}
      <div className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-3 rounded bg-gray-50 shadow relative">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600">
                By {post.doctor} | Category: {post.category}
              </p>
              <p className="mt-2">{post.content}</p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(post.id)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
