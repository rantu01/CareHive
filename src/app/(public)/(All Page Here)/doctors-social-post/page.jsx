





"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import UseAuth from "@/app/Hooks/UseAuth";
import {
  PenLine,
  Trash2,
  HeartPulse,
  BookText,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

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

  // Fetch user blogs
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

  // Add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("⚠️ Please login", "You need to login first.", "warning");
      return;
    }
    const blogData = {
      title: e.target.title.value,
      category: e.target.category.value,
      content: e.target.content.value,
      image: e.target.image.value,
      author: {
        email: user.email,
        name: user.displayName || "Anonymous",
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
        Swal.fire("✅ Success", "Blog posted successfully!", "success");
        e.target.reset();
        fetchMyBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      fetchMyBlogs();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs?id=${editingBlog._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: e.target.title.value,
        category: e.target.category.value,
        content: e.target.content.value,
        image: e.target.image.value,
      }),
    });
    const data = await res.json();
    if (data.success) {
      Swal.fire("✏️ Updated!", "Blog updated successfully!", "success");
      setEditingBlog(null);
      fetchMyBlogs();
    }
  };

  return (
    <div
      style={{
        background: "var(--dashboard-bg)",
        color: "var(--text-color-all)",
        minHeight: "100vh",
      }}
      className="relative overflow-hidden"
    >
      {/* Background Glow & Pulse Dots */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-secondary)] opacity-10 blur-3xl rounded-full animate-pulse" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[var(--color-primary)] w-3 h-3 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-8 pt-28 relative z-10 space-y-20">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <HeartPulse
              className="text-[var(--color-secondary)] animate-pulse"
              size={40}
            />
            <span>
              Social <span className="text-[var(--color-secondary)]">Health</span> Interaction
            </span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            A space for doctors to post{" "}
            <span className="font-semibold text-[var(--color-secondary)]">blogs</span> &{" "}
            <span className="font-semibold text-[var(--color-secondary)]">health tips</span> — promoting wellness through Fitness, Diet, Yoga, and Mental Health.
          </p>
        </motion.div>

        {/* Form + Animation */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Blog Form */}
          <motion.div
            className="flex-1 bg-white/10 backdrop-blur-lg border rounded-2xl p-8 shadow-lg hover:shadow-glow transition-all"
            style={{ borderColor: "var(--dashboard-border)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Title</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Enter blog title"
                    required
                    className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--color-secondary)] hover:shadow-glow transition"
                    style={{ borderColor: "var(--dashboard-border)" }}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Category</label>
                  <select
                    name="category"
                    required
                    className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--color-secondary)] hover:shadow-glow transition"
                    style={{ borderColor: "var(--dashboard-border)" }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Field */}
              <div>
                <label className=" mb-2 font-medium flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[var(--color-secondary)] animate-pulse" />
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--color-secondary)] hover:shadow-glow transition"
                  style={{ borderColor: "var(--dashboard-border)" }}
                />
              </div>

              {/* Content */}
              <div>
                <label className="block mb-2 font-medium">Content</label>
                <textarea
                  name="content"
                  rows={5}
                  required
                  placeholder="Write your blog..."
                  className="w-full p-3 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--color-secondary)] hover:shadow-glow transition"
                  style={{ borderColor: "var(--dashboard-border)" }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px var(--color-secondary)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "white",
                }}
              >
                <Sparkles size={20} className="inline-block mr-2 animate-pulse" />
                Post Blog
              </motion.button>
            </form>
          </motion.div>

          {/* Lottie Animation */}
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {animationData && <Lottie animationData={animationData} loop />}
          </motion.div>
        </div>

        {/* User Blogs */}
        {user && (
          <div className="mt-20 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-[var(--color-secondary)]">
              <BookText size={26} /> My Blogs
            </h2>

            {myBlogs.length === 0 ? (
              <p className="text-gray-400">No blogs posted yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {myBlogs.map((blog) =>
                  editingBlog?._id === blog._id ? (
                    <form
                      key={blog._id}
                      onSubmit={handleUpdate}
                      className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border shadow-lg hover:shadow-glow space-y-4"
                      style={{ borderColor: "var(--dashboard-border)" }}
                    >
                      <input
                        type="text"
                        name="title"
                        defaultValue={blog.title}
                        className="w-full p-3 rounded-lg border bg-transparent hover:shadow-glow transition"
                        style={{ borderColor: "var(--dashboard-border)" }}
                      />
                      <select
                        name="category"
                        defaultValue={blog.category}
                        className="w-full p-3 rounded-lg border bg-transparent hover:shadow-glow transition"
                        style={{ borderColor: "var(--dashboard-border)" }}
                      >
                        {categories.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <input
                        type="url"
                        name="image"
                        defaultValue={blog.image}
                        className="w-full p-3 rounded-lg border bg-transparent hover:shadow-glow transition"
                        style={{ borderColor: "var(--dashboard-border)" }}
                      />
                      <textarea
                        name="content"
                        defaultValue={blog.content}
                        rows={4}
                        className="w-full p-3 rounded-lg border bg-transparent hover:shadow-glow transition"
                        style={{ borderColor: "var(--dashboard-border)" }}
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 py-2 rounded-lg font-semibold hover:shadow-glow transition"
                          style={{ backgroundColor: "var(--color-secondary)", color: "white" }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="flex-1 py-2 rounded-lg font-semibold bg-gray-400 text-white hover:shadow-glow transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      key={blog._id}
                      className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border shadow-md hover:scale-[1.02] hover:shadow-glow transition-all cursor-pointer"
                      style={{ borderColor: "var(--dashboard-border)" }}
                    >
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="rounded-lg mb-4 w-full h-48 object-cover hover:shadow-glow transition"
                        />
                      )}
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <Sparkles size={20} className="animate-pulse text-[var(--color-primary)]" />
                        {blog.title}
                      </h3>
                      <p className="text-sm opacity-70 mb-2 flex items-center gap-1">
                        <HeartPulse size={16} className="animate-pulse text-[var(--color-secondary)]" />
                        Category: {blog.category}
                      </p>
                      <p className="opacity-90 mb-4">{blog.content}</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditingBlog(blog)}
                          className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg font-semibold hover:shadow-glow transition"
                          style={{ backgroundColor: "var(--color-secondary)", color: "white" }}
                        >
                          <PenLine size={18} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg font-semibold bg-red-500 text-white hover:shadow-glow transition"
                        >
                          <Trash2 size={18} /> Delete
                        </button>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

