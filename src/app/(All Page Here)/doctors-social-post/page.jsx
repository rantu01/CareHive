"use client";
import { AuthContext } from "@/app/context/authContext";
import React, { useContext, useEffect, useState } from "react";


const categories = ["Fitness", "Diet", "Yoga", "Mental Health"];

const page = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Fitness",
  });
  const [commentText, setCommentText] = useState({}); // track comment input per post

  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem("doctorPosts");
    if (storedPosts) setPosts(JSON.parse(storedPosts));
  }, []);

  // Save posts to localStorage
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
      likes: 0,
      comments: [],
      ...form,
    };
    setPosts([newPost, ...posts]);
    setForm({ title: "", content: "", category: "Fitness" });
  };

  // Like a post
  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  // Add a comment
  const handleComment = (id) => {
    if (!commentText[id]) return;
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            comments: [
              ...post.comments,
              { id: Date.now(), user: user?.email || "Anonymous", text: commentText[id] },
            ],
          }
        : post
    );
    setPosts(updatedPosts);
    setCommentText({ ...commentText, [id]: "" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Health Interaction</h1>

      {/* Post Form (Doctors only) */}
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

      {/* Posts */}
      <div className="mt-6 space-y-6">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-4 rounded bg-gray-50 shadow">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-600">
                By {post.doctor} | Category: {post.category}
              </p>
              <p className="mt-2">{post.content}</p>

              {/* Likes */}
              <button
                onClick={() => handleLike(post.id)}
                className="mt-3 text-blue-600"
              >
                👍 Like ({post.likes})
              </button>

              {/* Comments */}
              <div className="mt-4">
                <h4 className="font-semibold">Comments:</h4>
                {post.comments.length === 0 ? (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                ) : (
                  <ul className="list-disc ml-6 text-sm">
                    {post.comments.map((c) => (
                      <li key={c.id}>
                        <span className="font-semibold">{c.user}:</span> {c.text}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex mt-2 space-x-2">
                  <input
                    type="text"
                    value={commentText[post.id] || ""}
                    onChange={(e) =>
                      setCommentText({ ...commentText, [post.id]: e.target.value })
                    }
                    placeholder="Write a comment..."
                    className="flex-grow border p-1 rounded"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="bg-green-600 text-white px-3 rounded"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
