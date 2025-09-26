
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import UseAuth from "@/app/Hooks/UseAuth";
import Navbar from "@/app/Component/Navbar";

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

  // Fetch current user blogs
  const fetchMyBlogs = async () => {
    if (!user?.email) return;
    const res = await fetch("/api/blogs");
    const data = await res.json();
    if (data.success) {
      const userBlogs = data.blogs.filter(
        (b) => b.author.email === user.email
      );
      setMyBlogs(userBlogs);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, [user]);

  // Submit new blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const category = e.target.category.value;
    const content = e.target.content.value;

    if (!user) {
      alert("⚠️ Please log in to post.");
      return;
    }

    const blogData = {
      title,
      category,
      content,
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
      console.error("Error posting blog:", err);
      alert("⚠️ Something went wrong.");
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("🗑️ Blog deleted!");
        fetchMyBlogs();
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // Update blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const content = e.target.content.value;

    try {
      const res = await fetch(`/api/blogs?id=${editingBlog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✏️ Blog updated!");
        setEditingBlog(null);
        fetchMyBlogs();
      }
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <div style={{ background: "var(--dashboard-bg)", color: "var(--fourground-color)" }}>
      <div  className="max-w-6xl mx-auto p-8 pt-28">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ color: "var(--color-calm-blue)" }}
          >
            <span className="text-gray-600">Social</span> Health Interaction
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A dedicated space for doctors to publish{" "}
            <span className="font-semibold">blogs</span> and{" "}
            <span className="font-semibold">health tips</span>, organized under{" "}
            <span className="italic">Fitness, Diet, Yoga</span>, and{" "}
            <span className="italic">Mental Health</span> categories, helping
            users gain reliable insights and guidance for a healthier lifestyle.
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
              {/* Title + Category */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Enter blog or tip title"
                    required
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-calm-blue)] transition duration-200"
                    style={{
                      backgroundColor: "var(--gray-color)",
                      color: "var(--fourground-color)",
                      borderColor: "var(--dashboard-border)",
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-calm-blue)] transition duration-200"
                    style={{
                      backgroundColor: "var(--gray-color)",
                      color: "var(--fourground-color)",
                      borderColor: "var(--dashboard-border)",
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                  Content
                </label>
                <textarea
                  name="content"
                  placeholder="Write your blog or health tip..."
                  rows={6}
                  required
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-calm-blue)] transition duration-200"
                  style={{
                    backgroundColor: "var(--gray-color)",
                    color: "var(--fourground-color)",
                    borderColor: "var(--dashboard-border)",
                  }}
                />
              </div>

              {/* Button */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: "var(--color-calm-blue)",
                    color: "var(--color-white)",
                  }}
                >
                  Post
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Lottie Animation */}
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {animationData && (
              <Lottie animationData={animationData} loop={true} />
            )}
          </motion.div>
        </div>

        {/* My Blogs Section */}
        {user && (
          <div className="mt-16">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--color-calm-blue)" }}
            >
              My Blogs
            </h2>

            {myBlogs.length === 0 && (
              <p className="text-gray-500">You haven’t posted any blogs yet.</p>
            )}

            <div className="space-y-6">
              {myBlogs.map((blog) =>
                editingBlog?._id === blog._id ? (
                  // Edit Form
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
                    />
                    <select
                      name="category"
                      defaultValue={blog.category}
                      className="w-full p-3 rounded-lg border"
                    >
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <textarea
                      name="content"
                      defaultValue={blog.content}
                      rows={5}
                      className="w-full p-3 rounded-lg border"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{
                          backgroundColor: "var(--color-calm-blue)",
                          color: "var(--color-white)",
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 rounded-lg font-semibold bg-gray-400 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Blog Card
                  <div
                    key={blog._id}
                    className="p-6 rounded-xl shadow-lg"
                    style={{
                      backgroundColor: "var(--dashboard-bg)",
                      border: "1px solid var(--dashboard-border)",
                    }}
                  >
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Category: {blog.category}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {blog.content}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingBlog(blog)}
                        className="px-4 py-2 rounded-lg font-semibold"
                        style={{
                          backgroundColor: "var(--color-calm-blue)",
                          color: "var(--color-white)",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white"
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


