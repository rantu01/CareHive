


// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import UseAuth from "@/app/Hooks/UseAuth";

// const UserInteractions = () => {
//   const { user } = UseAuth();
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [commentText, setCommentText] = useState({}); // track comments per blog

//   // Fetch all blogs
//   const fetchBlogs = async () => {
//     setLoading(true);
//     const res = await fetch("/api/blogs");
//     const data = await res.json();
//     if (data.success) setBlogs(data.blogs);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Handle like
//   const handleLike = async (blogId) => {
//     if (!user) return alert("⚠️ Login to like");

//     await fetch("/api/blogs", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         blogId,
//         type: "like",
//         user: { email: user.email, name: user.displayName || "Anonymous" },
//       }),
//     });

//     // Refresh blogs from DB so everyone sees updates
//     fetchBlogs();
//   };

//   // Handle comment
//   const handleComment = async (blogId) => {
//     if (!user) return alert("⚠️ Login to comment");
//     if (!commentText[blogId]) return;

//     await fetch("/api/blogs", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         blogId,
//         type: "comment",
//         text: commentText[blogId],
//         user: { email: user.email, name: user.displayName || "Anonymous" },
//       }),
//     });

//     // Refresh blogs from DB
//     fetchBlogs();

//     // Clear input field
//     setCommentText((prev) => ({ ...prev, [blogId]: "" }));
//   };

//   if (loading) return <p className="text-center py-10">Loading blogs...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Community Blogs & Tips
//       </h1>

//       {blogs.map((blog) => (
//         <motion.div
//           key={blog._id}
//           className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
//           <p className="text-sm text-gray-500 mb-2">
//             Category: {blog.category}
//           </p>
//           <p className="text-gray-700 dark:text-gray-300 mb-4">
//             {blog.content}
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             By {blog?.author?.name} ({blog?.author?.email})
//           </p>

//           {/* Like Button */}
//           <button
//             onClick={() => handleLike(blog._id)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-3"
//           >
//             👍 Like ({blog.likes?.length || 0})
//           </button>

//           {/* Comments */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Comments</h3>
//             <div className="space-y-2">
//               {(blog.comments || []).map((c, idx) => (
//                 <div
//                   key={idx}
//                   className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
//                 >
//                   <p className="text-sm">
//                     <span className="font-medium">{c.user.name}:</span>{" "}
//                     {c.text}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {new Date(c.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Add Comment */}
//             {user && (
//               <div className="mt-3 flex gap-2">
//                 <input
//                   type="text"
//                   value={commentText[blog._id] || ""}
//                   onChange={(e) =>
//                     setCommentText((prev) => ({
//                       ...prev,
//                       [blog._id]: e.target.value,
//                     }))
//                   }
//                   placeholder="Write a comment..."
//                   className="flex-1 p-2 border rounded-lg"
//                 />
//                 <button
//                   onClick={() => handleComment(blog._id)}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg"
//                 >
//                   Post
//                 </button>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default UserInteractions;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import UseAuth from "@/app/Hooks/UseAuth";

// const UserInteractions = () => {
//   const { user } = UseAuth();
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [commentText, setCommentText] = useState({});
//   const [editingComment, setEditingComment] = useState({}); // track editing mode

//   // Fetch all blogs
//   const fetchBlogs = async () => {
//     setLoading(true);
//     const res = await fetch("/api/blogs");
//     const data = await res.json();
//     if (data.success) setBlogs(data.blogs);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Handle like
//   const handleLike = async (blogId) => {
//     if (!user) return alert("⚠️ Login to like");

//     await fetch("/api/blogs", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         blogId,
//         type: "like",
//         user: { email: user.email, name: user.displayName || "Anonymous" },
//       }),
//     });

//     fetchBlogs();
//   };

//   // Handle add comment
//   const handleComment = async (blogId) => {
//     if (!user) return alert("⚠️ Login to comment");
//     if (!commentText[blogId]) return;

//     await fetch("/api/blogs", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         blogId,
//         type: "comment",
//         text: commentText[blogId],
//         user: { email: user.email, name: user.displayName || "Anonymous" },
//       }),
//     });

//     fetchBlogs();
//     setCommentText((prev) => ({ ...prev, [blogId]: "" }));
//   };

//   // Handle update comment
//   const handleUpdateComment = async (blogId, commentId) => {
//     if (!editingComment[commentId]) return;

//     await fetch("/api/blogs", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         blogId,
//         type: "update-comment",   // ✅ match backend
//         commentId,
//         text: editingComment[commentId], // ✅ match backend key
//         user: { email: user.email },
//       }),
//     });

//     fetchBlogs();
//     setEditingComment((prev) => ({ ...prev, [commentId]: "" }));
//   };

//   // Handle delete comment
//   const handleDeleteComment = async (blogId, commentId) => {
//     await fetch("/api/blogs", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         blogId,
//         type: "delete-comment",   // ✅ match backend
//         commentId,
//         user: { email: user.email },
//       }),
//     });

//     fetchBlogs();
//   };

//   if (loading) return <p className="text-center py-10">Loading blogs...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Community Blogs & Tips
//       </h1>

//       {blogs.map((blog) => (
//         <motion.div
//           key={blog._id}
//           className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
//           <p className="text-sm text-gray-500 mb-2">
//             Category: {blog.category}
//           </p>
//           <p className="text-gray-700 dark:text-gray-300 mb-4">
//             {blog.content}
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             By {blog?.author?.name} ({blog?.author?.email})
//           </p>

//           {/* Like Button */}
//           <button
//             onClick={() => handleLike(blog._id)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-3"
//           >
//             👍 Like ({blog.likes?.length || 0})
//           </button>

//           {/* Comments */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Comments</h3>
//             <div className="space-y-3">
//               {(blog.comments || []).map((c) => (
//                 <div
//                   key={c._id}
//                   className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md"
//                 >
//                   {editingComment[c._id] !== undefined ? (
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={editingComment[c._id]}
//                         onChange={(e) =>
//                           setEditingComment((prev) => ({
//                             ...prev,
//                             [c._id]: e.target.value,
//                           }))
//                         }
//                         className="flex-1 p-2 border rounded-lg"
//                       />
//                       <button
//                         onClick={() => handleUpdateComment(blog._id, c._id)}
//                         className="px-3 py-1 bg-green-500 text-white rounded-lg"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() =>
//                           setEditingComment((prev) => {
//                             const copy = { ...prev };
//                             delete copy[c._id];
//                             return copy;
//                           })
//                         }
//                         className="px-3 py-1 bg-gray-400 text-white rounded-lg"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <p className="text-sm">
//                         <span className="font-medium">{c.user.name}:</span>{" "}
//                         {c.text}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {new Date(c.createdAt).toLocaleString()}
//                       </p>

//                       {user?.email === c.user.email && (
//                         <div className="flex gap-2 mt-2">
//                           <button
//                             onClick={() =>
//                               setEditingComment((prev) => ({
//                                 ...prev,
//                                 [c._id]: c.text,
//                               }))
//                             }
//                             className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleDeleteComment(blog._id, c._id)
//                             }
//                             className="px-3 py-1 bg-red-500 text-white rounded-lg"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Add Comment */}
//             {user && (
//               <div className="mt-3 flex gap-2">
//                 <input
//                   type="text"
//                   value={commentText[blog._id] || ""}
//                   onChange={(e) =>
//                     setCommentText((prev) => ({
//                       ...prev,
//                       [blog._id]: e.target.value,
//                     }))
//                   }
//                   placeholder="Write a comment..."
//                   className="flex-1 p-2 border rounded-lg"
//                 />
//                 <button
//                   onClick={() => handleComment(blog._id)}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg"
//                 >
//                   Post
//                 </button>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default UserInteractions;



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

  // const handleUpdateComment = async (blogId, commentId) => {
  //   if (!editingComment[commentId]) return;

  //   await fetch("/api/blogs", {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       blogId,
  //       type: "update-comment",
  //       commentId,
  //       text: editingComment[commentId],
  //       user: { email: user.email },
  //     }),
  //   });

  //   fetchBlogs();
  //   setEditingComment((prev) => ({ ...prev, [commentId]: "" }));
  // };










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

  // Remove editing state for this comment
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

  if (loading) return <p className="text-center py-10">Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Community Blogs & Tips
      </h1>

      {blogs.map((blog) => (
        <motion.div
          key={blog._id}
          className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            Category: {blog.category}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {blog.content}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            By {blog?.author?.name} ({blog?.author?.email})
          </p>

          <button
            onClick={() => handleLike(blog._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-3"
          >
            👍 Like ({blog.likes?.length || 0})
          </button>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Comments</h3>
            <div className="space-y-3">
              {(blog.comments || []).map((c) => (
                <div
                  key={c._id}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md"
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
                      />
                      <button
                        onClick={() => handleUpdateComment(blog._id, c._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg"
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
                        className="px-3 py-1 bg-gray-400 text-white rounded-lg"
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
                      <p className="text-xs text-gray-400">
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
                            className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteComment(blog._id, c._id)
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded-lg"
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
