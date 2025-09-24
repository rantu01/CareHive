"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UseAuth from "@/app/Hooks/UseAuth";
// import UseAuth from "@/context/useAuth";

const UserInteractions = () => {
  const { user } = UseAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({}); // track comments per blog

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
        setLoading(false);
      });
  }, []);

  const handleLike = async (blogId) => {
    if (!user) return alert("⚠️ Login to like");
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, type: "like", user: { email: user.email, name: user.displayName || "Anonymous" } }),
    });
    setBlogs((prev) =>
      prev.map((b) =>
        b._id === blogId ? { ...b, likes: [...new Set([...(b.likes || []), user.email])] } : b
      )
    );
  };

  const handleComment = async (blogId) => {
    if (!user) return alert("⚠️ Login to comment");
    if (!commentText[blogId]) return;

    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        type: "comment",
        comment: commentText[blogId],
        user: { email: user.email, name: user.displayName || "Anonymous" },
      }),
    });

    setBlogs((prev) =>
      prev.map((b) =>
        b._id === blogId
          ? {
              ...b,
              comments: [
                ...(b.comments || []),
                {
                  user: { email: user.email, name: user.displayName || "Anonymous" },
                  text: commentText[blogId],
                  createdAt: new Date(),
                },
              ],
            }
          : b
      )
    );

    setCommentText((prev) => ({ ...prev, [blogId]: "" }));
  };

  if (loading) return <p className="text-center py-10">Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Community Blogs & Tips</h1>

      {blogs.map((blog) => (
        <motion.div
          key={blog._id}
          className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-sm text-gray-500 mb-2">Category: {blog.category}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{blog.content}</p>
          <p className="text-sm text-gray-500 mb-4">By {blog?.author?.name} ({blog?.author?.email})</p>

          {/* Like Button */}
          <button
            onClick={() => handleLike(blog._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-3"
          >
            👍 Like ({blog.likes?.length || 0})
          </button>

          {/* Comments */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Comments</h3>
            <div className="space-y-2">
              {(blog.comments || []).map((c, idx) => (
                <div key={idx} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">{c.user.name}:</span> {c.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            {user && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={commentText[blog._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({ ...prev, [blog._id]: e.target.value }))
                  }
                  placeholder="Write a comment..."
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  onClick={() => handleComment(blog._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UserInteractions;
