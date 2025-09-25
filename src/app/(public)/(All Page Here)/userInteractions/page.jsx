"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, MessageSquare, Edit3, Trash2, Send } from "lucide-react";
import UseAuth from "@/app/Hooks/UseAuth";

const UserInteractions = () => {
  const { user } = UseAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [editingComment, setEditingComment] = useState({});

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
  fetchBlogs();
}, []);

  const handleLike = async (blogId) => {
    if (!user) return alert("⚠️ Please login to like this post");
    await fetch("/api/blogs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        type: "like",
        user: { email: user.email, name: user.displayName || "Anonymous" },
      }),
    });
    fetchBlogs();
  };

  const handleComment = async (blogId) => {
    if (!user) return alert("⚠️ Please login to comment");
    if (!commentText[blogId]) return;
    await fetch("/api/blogs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        type: "comment",
        text: commentText[blogId],
        user: { email: user.email, name: user.displayName || "Anonymous" },
      }),
    });
    fetchBlogs();
    setCommentText((prev) => ({ ...prev, [blogId]: "" }));
  };

  const handleUpdateComment = async (blogId, commentId) => {
    if (!editingComment[commentId]) return;
    await fetch("/api/blogs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        type: "update-comment",
        commentId,
        text: editingComment[commentId],
        user: { email: user.email },
      }),
    });
    fetchBlogs();
    setEditingComment((prev) => {
      const copy = { ...prev };
      delete copy[commentId];
      return copy;
    });
  };

  const handleDeleteComment = async (blogId, commentId) => {
    await fetch("/api/blogs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        type: "delete-comment",
        commentId,
        user: { email: user.email },
      }),
    });
    fetchBlogs();
  };

 if (loading) {
  return (
    <div className="flex justify-center items-center h-80">
      <motion.div
        className="w-12 h-12 border-4 border-[var(--color-calm-blue)] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
}

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-28 space-y-16"
    >
      {/* Title */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-calm-blue)] relative inline-block">
          Community Blogs & Health Insights
          <span className="absolute left-0 -bottom-2 w-full h-1 bg-[var(--color-light-green)] rounded-full"></span>
        </h1>
        <p className="text-base md:text-lg text-[var(--fourground-color)] opacity-80 max-w-2xl mx-auto leading-relaxed">
          Discover inspiring blogs, share your thoughts, and engage with the
          health community through meaningful discussions.
        </p>
      </header>

      {/* Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-10">
        {blogs.map((blog) => (
          <motion.article
            key={blog._id}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="p-6 md:p-8 rounded-2xl shadow-md bg-[var(--bg-surface)] border border-[var(--dashboard-border)] hover:shadow-xl transition-all duration-300"
          >
            {/* Blog Header */}
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--fourground-color)]">
              {blog.title}
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-4 text-sm text-[var(--fourground-color)] opacity-70">
              <p>📌 {blog.category}</p>
              <p>
                ✍️ {blog?.author?.name} ({blog?.author?.email})
              </p>
            </div>

            <p className="text-base text-[var(--fourground-color)] opacity-90 mb-6 leading-relaxed">
              {blog.content}
            </p>

            {/* Actions */}
            <div className="flex  sm:flex-row sm:items-center sm:gap-6 gap-3 border-t border-[var(--dashboard-border)] pt-4">
             <button
  onClick={() => handleLike(blog._id)}
  className={`inline-flex px-4 py-2 rounded-lg items-center gap-2 font-medium transition-all duration-300 shadow-sm max-w-max ${
    blog.likes?.some((l) => l.email === user?.email)
      ? "bg-green-500 text-white hover:bg-green-600"
      : "bg-[var(--color-calm-blue)] text-white hover:brightness-90"
  }`}
>
  <ThumbsUp size={18} /> {blog.likes?.length || 0}
</button>
              <span className="text-sm flex items-center gap-1 text-[var(--fourground-color)] opacity-70">
                <MessageSquare size={16} /> {blog.comments?.length || 0} Comments
              </span>
            </div>

            {/* Comments */}
            <section className="mt-8">
              <h3 className="font-semibold text-lg mb-4 text-[var(--fourground-color)] flex items-center gap-2">
                💬 Comments
              </h3>

              <div className="max-h-64 overflow-y-auto pr-2 space-y-5">
                <AnimatePresence>
                  {(blog.comments || []).map((c) => (
                    <motion.div
                      key={c._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-xl border border-[var(--dashboard-border)] shadow-sm ${
                        user?.email === c.user.email
                          ? "bg-blue-50 dark:bg-blue-900"
                          : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      {editingComment[c._id] !== undefined ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={editingComment[c._id]}
                            onChange={(e) =>
                              setEditingComment((prev) => ({
                                ...prev,
                                [c._id]: e.target.value,
                              }))
                            }
                            className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-[var(--dashboard-border)] text-[var(--fourground-color)] focus:ring-2 focus:ring-[var(--color-calm-blue)]"
                          />
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <button
                              onClick={() =>
                                handleUpdateComment(blog._id, c._id)
                              }
                              className="px-4 py-2 bg-[var(--color-light-green)] text-[var(--color-black)] rounded-lg font-medium hover:brightness-90 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() =>
                                setEditingComment((prev) => {
                                  const copy = { ...prev };
                                  delete copy[c._id];
                                  return copy;
                                })
                              }
                              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-[var(--fourground-color)] rounded-lg hover:brightness-90 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-[var(--fourground-color)] leading-relaxed">
                            <span className="font-medium">{c.user.name}:</span>{" "}
                            {c.text}
                          </p>
                          <p className="text-xs text-[var(--fourground-color)] opacity-60 mt-1">
                            {new Date(c.createdAt).toLocaleString()}
                          </p>

                          {user?.email === c.user.email && (
                            <div className="flex sm:flex-row gap-2 mt-3">
                              <button
  onClick={() =>
    setEditingComment((prev) => ({
      ...prev,
      [c._id]: c.text,
    }))
  }
  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 hover:brightness-90 text-white rounded-lg shadow-sm max-w-max"
>
  <Edit3 size={14} /> Edit
</button>
<button
  onClick={() => handleDeleteComment(blog._id, c._id)}
  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-900 hover:brightness-90 text-white rounded-lg shadow-sm max-w-max"
>
  <Trash2 size={14} /> Delete
</button>

                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Add Comment */}
              {user && (
                <div className="mt-6 flex  sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    value={commentText[blog._id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [blog._id]: e.target.value,
                      }))
                    }
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-3 rounded-full border border-[var(--dashboard-border)] bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[var(--color-calm-blue)] text-[var(--fourground-color)]"
                  />
                  <button
                    onClick={() => handleComment(blog._id)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-light-green)] hover:shadow-md hover:scale-105 transition-all duration-300 text-[var(--color-black)] font-semibold"
                  >
                    <Send size={18} /> Post
                  </button>
                </div>
              )}
            </section>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default UserInteractions;
