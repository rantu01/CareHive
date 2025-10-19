"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageSquare,
  Edit3,
  Trash2,
  Send,
  User,
  ArrowRight,
} from "lucide-react";
import Swal from "sweetalert2";
import UseAuth from "@/app/Hooks/UseAuth";

const UserInteractions = () => {
  const { user } = UseAuth();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [editingComment, setEditingComment] = useState({});

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
        setSelectedBlog(data.blogs[0]); // Default: first blog
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchBlogs();
  }, []);

  // Handle like
  const handleLike = async (blogId) => {
    if (!user) {
      Swal.fire("⚠️ Please login", "You need to login to like a post.", "warning");
      return;
    }

    setBlogs((prev) =>
      prev.map((b) => {
        if (b._id === blogId) {
          const alreadyLiked = b.likes?.some((l) => l.email === user.email);
          const updatedLikes = alreadyLiked
            ? b.likes.filter((l) => l.email !== user.email)
            : [...(b.likes || []), { email: user.email, name: user.displayName || "Anonymous" }];
          if (selectedBlog?._id === b._id) setSelectedBlog({ ...b, likes: updatedLikes });
          return { ...b, likes: updatedLikes };
        }
        return b;
      })
    );

    await fetch("/api/blogs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        type: "like",
        user: { email: user.email, name: user.displayName || "Anonymous" },
      }),
    });
  };

  // Handle add comment
  const handleComment = async (blogId) => {
    if (!user || !commentText[blogId]) return;

    const newComment = {
      _id: Date.now().toString(), // temporary id for UI
      text: commentText[blogId],
      user: { email: user.email, name: user.displayName || "Anonymous" },
      createdAt: new Date().toISOString(),
    };

    setBlogs((prev) =>
      prev.map((b) => {
        if (b._id === blogId) {
          const updatedComments = [...(b.comments || []), newComment];
          if (selectedBlog?._id === b._id) setSelectedBlog({ ...b, comments: updatedComments });
          return { ...b, comments: updatedComments };
        }
        return b;
      })
    );

    setCommentText((prev) => ({ ...prev, [blogId]: "" }));

    await fetch("/api/blogs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        type: "comment",
        text: newComment.text,
        user: newComment.user,
      }),
    });
  };

  // Update comment
  const handleUpdateComment = async (blogId, commentId) => {
    if (!editingComment[commentId]) return;

    setBlogs((prev) =>
      prev.map((b) => {
        if (b._id === blogId) {
          const updatedComments = b.comments.map((c) =>
            c._id === commentId ? { ...c, text: editingComment[commentId] } : c
          );
          if (selectedBlog?._id === b._id) setSelectedBlog({ ...b, comments: updatedComments });
          return { ...b, comments: updatedComments };
        }
        return b;
      })
    );

    setEditingComment((prev) => {
      const copy = { ...prev };
      delete copy[commentId];
      return copy;
    });

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
  };

  // Delete comment
  const handleDeleteComment = async (blogId, commentId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      setBlogs((prev) =>
        prev.map((b) => {
          if (b._id === blogId) {
            const updatedComments = b.comments.filter((c) => c._id !== commentId);
            if (selectedBlog?._id === b._id) setSelectedBlog({ ...b, comments: updatedComments });
            return { ...b, comments: updatedComments };
          }
          return b;
        })
      );

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

      Swal.fire("Deleted!", "Your comment has been deleted.", "success");
    }
  };

  // Select blog
  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 mt-10 container mx-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: Selected Blog */}
        <motion.div
          key={selectedBlog?._id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          {selectedBlog ? (
            <>
              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                {selectedBlog.image && (
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full h-96 object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedBlog.title}</h2>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <User size={16} />
                    <span>{selectedBlog.author?.name}</span>
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed" style={{ color: "var(--text-color-all)" }}>
                {selectedBlog.content}
              </p>

              <div className="flex items-center gap-6 pt-4 border-t" style={{ borderColor: "var(--dashboard-border)" }}>
                <button
                  onClick={() => handleLike(selectedBlog._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedBlog.likes?.some((l) => l.email === user?.email)
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-secondary)] text-white"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={
                      selectedBlog.likes?.some((l) => l.email === user?.email)
                        ? "currentColor"
                        : "none"
                    }
                  />
                  {selectedBlog.likes?.length || 0}
                </button>
                <div className="flex items-center gap-2 text-[var(--text-color-all)]">
                  <MessageSquare size={18} />
                  <span>{selectedBlog.comments?.length || 0} Comments</span>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-secondary)" }}>
                  💬 Comments
                </h3>

                <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                  <AnimatePresence>
                    {(selectedBlog.comments || []).map((c) => (
                      <motion.div
                        key={c._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] shadow-md"
                      >
                        {editingComment[c._id] !== undefined ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editingComment[c._id]}
                              onChange={(e) =>
                                setEditingComment((prev) => ({
                                  ...prev,
                                  [c._id]: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg border bg-[var(--bg-color-all)] text-[var(--text-color-all)]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdateComment(selectedBlog._id, c._id)}
                                className="px-4 py-1 bg-[var(--color-primary)] text-white rounded-lg"
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
                                className="px-4 py-1 bg-[var(--dashboard-bg)] text-[var(--text-color-all)] rounded-lg"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm mb-1">
                              <span className="font-medium text-[var(--color-secondary)]">{c.user.name}:</span> {c.text}
                            </p>
                            <p className="text-xs opacity-70">{new Date(c.createdAt).toLocaleString()}</p>
                            {user?.email === c.user.email && (
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() =>
                                    setEditingComment((prev) => ({
                                      ...prev,
                                      [c._id]: c.text,
                                    }))
                                  }
                                  className="text-xs px-3 py-1 bg-[var(--color-secondary)] text-white rounded-lg"
                                >
                                  <Edit3 size={12} /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteComment(selectedBlog._id, c._id)}
                                  className="text-xs px-3 py-1 bg-red-600 text-white rounded-lg"
                                >
                                  <Trash2 size={12} /> Delete
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {user && (
                  <div className="mt-6 flex gap-3">
                    <input
                      type="text"
                      value={commentText[selectedBlog._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [selectedBlog._id]: e.target.value,
                        }))
                      }
                      placeholder="Write a comment..."
                      className="flex-1 px-4 py-3 rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] text-[var(--text-color-all)] focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    <button
                      onClick={() => handleComment(selectedBlog._id)}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:scale-105 transition-all"
                    >
                      <Send size={18} /> Post
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-lg text-gray-500">Select a blog to view details</div>
          )}
        </motion.div>

        {/* RIGHT: Blog List */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 overflow-y-auto max-h-[85vh] pr-2"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              onClick={() => handleSelectBlog(blog)}
              whileHover={{ scale: 1.02 }}
              className={`cursor-pointer rounded-2xl p-4 shadow-md transition-all ${
                selectedBlog?._id === blog._id ? "ring-2 ring-[var(--color-primary)]" : ""
              }`}
              style={{
                backgroundColor: "var(--dashboard-bg)",
                border: "1px solid var(--dashboard-border)",
              }}
            >
              <div className="flex gap-4">
                {blog.image && (
                  <img src={blog.image} alt={blog.title} className="w-24 h-24 object-cover rounded-xl" />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold mb-2" style={{ color: "var(--text-color-all)" }}>
                    {blog.title.length > 40 ? blog.title.slice(0, 40) + "..." : blog.title}
                  </h4>
                  <p className="text-sm line-clamp-3 mb-2" style={{ color: "var(--text-color-all)" }}>
                    {blog.content.slice(0, 100)}...
                  </p>
                  <button className="text-sm font-medium flex items-center gap-1" style={{ color: "var(--color-primary)" }}>
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserInteractions;

