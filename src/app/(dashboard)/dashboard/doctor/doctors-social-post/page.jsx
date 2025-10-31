"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import UseAuth from "@/app/Hooks/UseAuth";

const categories = ["Fitness", "Diet", "Yoga", "Mental Health"];

const Page = () => {
  const [animationData, setAnimationData] = useState(null);
  const { user } = UseAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetch("/mental-therapy.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  const fetchMyBlogs = async () => {
    if (!user?.email) return;
    const res = await fetch("/api/blogs");
    const data = await res.json();
    if (data.success) {
      const userBlogs = data.blogs.filter((b) => b.author.email === user.email);
      setMyBlogs(userBlogs);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("⚠️ Please log in to post.");
      return;
    }

    const blogData = {
      title: e.target.title.value,
      category: e.target.category.value,
      content: e.target.content.value,
      author: {
        email: user?.email,
        name: user?.displayName || "Anonymous",
        uid: user?.uid,
      },
    };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Blog posted successfully!");
        e.target.reset();
        fetchMyBlogs();
      } else {
        alert("⚠️ Failed to post blog");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("🗑️ Blog deleted!");
        fetchMyBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blogs?id=${editingBlog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: e.target.title.value,
          category: e.target.category.value,
          content: e.target.content.value,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✏️ Blog updated!");
        setEditingBlog(null);
        fetchMyBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ background: "var(--dashboard-bg)", color: "var(--text-color-all)" }}>
      <div className="max-w-6xl mx-auto p-8 pt-28">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ color: "var(--color-secondary)" }}
          >
            <span style={{ color: "var(--text-color-all)" }}>Social</span> Health Interaction
          </h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            A dedicated space for doctors to publish <span style={{ fontWeight: "600" }}>blogs</span> and <span style={{ fontWeight: "600" }}>health tips</span>, organized under <span style={{ fontStyle: "italic" }}>Fitness, Diet, Yoga</span>, and <span style={{ fontStyle: "italic" }}>Mental Health</span> categories.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <motion.div
            className="flex-1 p-8 rounded-2xl shadow-lg"
            style={{
              backgroundColor: "var(--dashboard-bg)",
              border: "1px solid var(--dashboard-border)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-sm">Title</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Enter blog or tip title"
                    required
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition duration-200"
                    style={{
                      backgroundColor: "var(--bg-color-all)",
                      color: "var(--text-color-all)",
                      borderColor: "var(--dashboard-border)",
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm">Category</label>
                  <select
                    name="category"
                    required
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition duration-200"
                    style={{
                      backgroundColor: "var(--bg-color-all)",
                      color: "var(--text-color-all)",
                      borderColor: "var(--dashboard-border)",
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm">Content</label>
                <textarea
                  name="content"
                  placeholder="Write your blog or health tip..."
                  rows={6}
                  required
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition duration-200"
                  style={{
                    backgroundColor: "var(--bg-color-all)",
                    color: "var(--text-color-all)",
                    borderColor: "var(--dashboard-border)",
                  }}
                />
              </div>

              <motion.div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-lg font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-white)",
                  }}
                >
                  Post
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Lottie */}
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {animationData && <Lottie animationData={animationData} loop />}
          </motion.div>
        </div>

        {/* My Blogs */}
        {user && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-secondary)" }}>
              My Blogs
            </h2>

            {myBlogs.length === 0 && <p style={{ color: "var(--text-color-all)" }}>You haven’t posted any blogs yet.</p>}

            <div className="space-y-6">
              {myBlogs.map((blog) =>
                editingBlog?._id === blog._id ? (
                  <form
                    key={blog._id}
                    onSubmit={handleUpdate}
                    className="p-6 rounded-xl shadow-lg space-y-4"
                    style={{
                      backgroundColor: "var(--dashboard-bg)",
                      border: "1px solid var(--dashboard-border)",
                    }}
                  >
                    <input
                      type="text"
                      name="title"
                      defaultValue={blog.title}
                      className="w-full p-3 rounded-lg border"
                      style={{
                        backgroundColor: "var(--bg-color-all)",
                        color: "var(--text-color-all)",
                        borderColor: "var(--dashboard-border)",
                      }}
                    />
                    <select
                      name="category"
                      defaultValue={blog.category}
                      className="w-full p-3 rounded-lg border"
                      style={{
                        backgroundColor: "var(--bg-color-all)",
                        color: "var(--text-color-all)",
                        borderColor: "var(--dashboard-border)",
                      }}
                    >
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <textarea
                      name="content"
                      defaultValue={blog.content}
                      rows={5}
                      className="w-full p-3 rounded-lg border"
                      style={{
                        backgroundColor: "var(--bg-color-all)",
                        color: "var(--text-color-all)",
                        borderColor: "var(--dashboard-border)",
                      }}
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-white)",
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{
                          backgroundColor: "var(--bg-color-all)",
                          color: "var(--text-color-all)",
                          border: "1px solid var(--dashboard-border)",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div
                    key={blog._id}
                    className="p-6 rounded-xl shadow-lg"
                    style={{
                      backgroundColor: "var(--dashboard-bg)",
                      border: "1px solid var(--dashboard-border)",
                    }}
                  >
                    <h3 style={{ color: "var(--color-secondary)", fontWeight: "600", fontSize: "1.25rem" }}>
                      {blog.title}
                    </h3>
                    <p style={{ color: "var(--text-color-all)", marginBottom: "0.5rem" }}>Category: {blog.category}</p>
                    <p style={{ color: "var(--text-color-all)", marginBottom: "1rem" }}>{blog.content}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingBlog(blog)}
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-white)",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{
                          backgroundColor: "var(--bg-color-all)",
                          color: "var(--text-color-all)",
                          border: "1px solid var(--dashboard-border)",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
