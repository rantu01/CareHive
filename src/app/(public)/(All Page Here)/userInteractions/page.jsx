"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UseAuth from "@/app/Hooks/UseAuth";

const UserInteractions = () => {
  const { user } = UseAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [editingComment, setEditingComment] = useState({});

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/blogs");
    const data = await res.json();
    if (data.success) setBlogs(data.blogs);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = async (blogId) => {
    if (!user) return alert("⚠️ Login to like");

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
    if (!user) return alert("⚠️ Login to comment");
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

  if (loading)
    return (
      <p
        className="text-center py-10"
        style={{ color: "var(--fourground-color)" }}
      >
        Loading blogs...
      </p>
    );

  return (
    <div
      style={{ background: "var(--dashboard-bg)", color: "var(--fourground-color)" }}
    >
      <div className="max-w-5xl mx-auto p-6 space-y-8 pt-30">
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "var(--color-calm-blue)" }}
        >
          Community Blogs & Tips
        </h1>

        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="p-6 rounded-xl shadow-lg border"
            style={{
              background: "var(--dashboard-bg)",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-sm mb-2" style={{ color: "var(--fourground-color)" }}>
              Category: {blog.category}
            </p>
            <p className="mb-4" style={{ color: "var(--fourground-color)" }}>
              {blog.content}
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--fourground-color)" }}>
              By {blog?.author?.name} ({blog?.author?.email})
            </p>

            <button
              onClick={() => handleLike(blog._id)}
              className="px-4 py-2 rounded-lg mr-3"
              style={{ background: "var(--dashboard-blue)", color: "var(--color-white)" }}
            >
              👍 Like ({blog.likes?.length || 0})
            </button>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Comments</h3>
              <div className="space-y-3">
                {(blog.comments || []).map((c) => (
                  <div
                    key={c._id}
                    className="p-3 rounded-md"
                    style={{ background: "var(--gray-color)" }}
                  >
                    {editingComment[c._id] !== undefined ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingComment[c._id]}
                          onChange={(e) =>
                            setEditingComment((prev) => ({
                              ...prev,
                              [c._id]: e.target.value,
                            }))
                          }
                          className="flex-1 p-2 border rounded-lg"
                          style={{
                            borderColor: "var(--dashboard-border)",
                            color: "var(--fourground-color)",
                            background: "var(--dashboard-bg)",
                          }}
                        />
                        <button
                          onClick={() => handleUpdateComment(blog._id, c._id)}
                          className="px-3 py-1 rounded-lg"
                          style={{ background: "var(--color-light-green)", color: "var(--color-black)" }}
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
                          className="px-3 py-1 rounded-lg"
                          style={{ background: "var(--dashboard-border)", color: "var(--color-white)" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm">
                          <span className="font-medium">{c.user.name}:</span>{" "}
                          {c.text}
                        </p>
                        <p className="text-xs" style={{ color: "var(--dashboard-border)" }}>
                          {new Date(c.createdAt).toLocaleString()}
                        </p>

                        {user?.email === c.user.email && (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() =>
                                setEditingComment((prev) => ({
                                  ...prev,
                                  [c._id]: c.text,
                                }))
                              }
                              className="px-3 py-1 rounded-lg"
                              style={{ background: "var(--color-calm-blue)", color: "var(--color-white)" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteComment(blog._id, c._id)
                              }
                              className="px-3 py-1 rounded-lg"
                              style={{ background: "var(--color-black)", color: "var(--color-white)" }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {user && (
                <div className="mt-3 flex gap-2">
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
                    className="flex-1 p-2 border rounded-lg"
                    style={{
                      borderColor: "var(--dashboard-border)",
                      color: "var(--fourground-color)",
                      background: "var(--dashboard-bg)",
                    }}
                  />
                  <button
                    onClick={() => handleComment(blog._id)}
                    className="px-4 py-2 rounded-lg"
                    style={{ background: "var(--color-light-green)", color: "var(--color-black)" }}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserInteractions;
