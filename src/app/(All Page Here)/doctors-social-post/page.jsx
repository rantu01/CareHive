"use client";
import { AuthContext } from "@/app/context/authContext";
import React, { useContext, useEffect, useState } from "react";


const Page = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", type: "blog" });

  // Load posts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("doctorPosts");
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("doctorPosts", JSON.stringify(posts));
  }, [posts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in as a doctor to post!");
      return;
    }
    const newPost = {
      id: Date.now(),
      doctor: user.email,
      ...form,
    };
    setPosts([newPost, ...posts]);
    setForm({ title: "", content: "", type: "blog" });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Blog or Health Tip</h1>

      {/* Form */}
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
            rows="4"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="blog">Blog</option>
            <option value="tip">Health Tip</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="text-red-500">Please log in as a doctor to post.</p>
      )}

      {/* Display Posts */}
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="border p-3 rounded bg-gray-50 shadow-sm"
            >
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600">By {post.doctor}</p>
              <p className="mt-2">{post.content}</p>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {post.type}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
