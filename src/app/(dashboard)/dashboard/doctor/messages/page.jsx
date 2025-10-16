"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "@/app/Hooks/UseAuth";
import Swal from "sweetalert2";

const DoctorMessages = () => {
  const { user } = UseAuth();
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeReply, setActiveReply] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`/api/messages?doctorEmail=${user.email}`)
      .then((res) => {
        // Show only messages involving this doctor (redundant safety)
        const filtered = res.data.filter(
          (m) => m.senderEmail === user.email || m.receiverEmail === user.email
        );

        const sorted = filtered.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setMessages(sorted);
      })

      .catch((err) => console.error("Error fetching messages:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleReply = async (receiverEmail, index) => {
    const message = replyText[index];
    if (!message || message.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Empty Message",
        text: "Please write a reply before sending.",
      });
      return;
    }

    try {
      const newMsg = {
        senderEmail: user.email,
        receiverEmail,
        message,
        timestamp: new Date().toISOString(),
      };

      // 1️⃣ Save message
      await axios.post("/api/messages", newMsg);
      setMessages((prev) => [newMsg, ...prev]);
      setReplyText((prev) => ({ ...prev, [index]: "" }));
      setActiveReply(null);

      // 2️⃣ Send notification to patient
      const notifRes = await axios.post("/api/send-notification", {
        targetEmail: receiverEmail,
        title: `New Message from Dr. ${user.name || user.email}`,
        body: message,
      });

      if (!notifRes.data.success) {
        console.error("Notification error:", notifRes.data.message);
      }

      Swal.fire({
        icon: "success",
        title: "Reply Sent!",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      console.error("Error sending reply:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to send reply",
        text: "Please try again later.",
      });
    }
  };

  const toggleReply = (index) => {
    setActiveReply(activeReply === index ? null : index);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--sidebar-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-color-all)] font-heading">
            Patient Messages
          </h2>
          <p className="text-sm text-[var(--color-secondary)] mt-1">
            Manage your conversations with patients
          </p>
        </div>
        <div className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
          {messages.length} {messages.length === 1 ? "Message" : "Messages"}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-color-all)] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-secondary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-color-all)] mb-2">
              No messages yet
            </h3>
            <p className="text-sm text-[var(--color-secondary)]">
              Patient messages will appear here when they contact you.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isSender = msg.senderEmail === user.email;
            const isReplyActive = activeReply === i;

            return (
              <div
                key={i}
                className={`relative rounded-xl p-5 transition-all duration-300 ${
                  isSender
                    ? "bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border-l-4 border-[var(--color-primary)] ml-8"
                    : "bg-[var(--bg-color-all)] border-l-4 border-[var(--color-secondary)] mr-8"
                }`}
              >
                {/* Message Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        isSender
                          ? "bg-[var(--color-primary)]"
                          : "bg-[var(--color-secondary)]"
                      }`}
                    >
                      {isSender ? "D" : "P"}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isSender
                            ? "text-[var(--color-primary)]"
                            : "text-[var(--color-secondary)]"
                        }`}
                      >
                        {isSender ? "You" : msg.senderEmail.split("@")[0]}
                      </h3>
                      <p className="text-xs text-[var(--text-color-all)] opacity-70">
                        {msg.senderEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-[var(--text-color-all)] opacity-80">
                      {formatTime(msg.timestamp)}
                    </span>
                    <div className="text-xs text-[var(--color-secondary)]">
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mb-4">
                  <p className="text-[var(--text-color-all)] leading-relaxed">
                    {msg.message}
                  </p>
                </div>

                {/* Reply Section */}
                {!isSender && (
                  <div className="border-t border-[var(--dashboard-border)] pt-4">
                    {!isReplyActive ? (
                      <button
                        onClick={() => toggleReply(i)}
                        className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors text-sm font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                        Reply to Patient
                      </button>
                    ) : (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Type your reply message..."
                              className="w-full px-4 py-3 rounded-xl bg-[var(--sidebar-bg)] text-[var(--text-color-all)] border border-[var(--dashboard-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                              value={replyText[i] || ""}
                              onChange={(e) =>
                                setReplyText((prev) => ({
                                  ...prev,
                                  [i]: e.target.value,
                                }))
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleReply(msg.senderEmail, i);
                                }
                              }}
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReply(msg.senderEmail, i)}
                              className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
                            >
                              Send
                            </button>
                            <button
                              onClick={() => toggleReply(i)}
                              className="px-4 py-3 bg-[var(--bg-color-all)] hover:bg-[var(--dashboard-border)] text-[var(--text-color-all)] rounded-xl font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-[var(--color-secondary)]">
                          Press Enter to send, or click the Send button
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Quick Stats */}
      {messages.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[var(--dashboard-border)]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[var(--bg-color-all)] rounded-lg p-3">
              <div className="text-lg font-bold text-[var(--color-primary)]">
                {
                  messages.filter((msg) => msg.senderEmail === user.email)
                    .length
                }
              </div>
              <div className="text-xs text-[var(--text-color-all)] opacity-70">
                Sent
              </div>
            </div>
            <div className="bg-[var(--bg-color-all)] rounded-lg p-3">
              <div className="text-lg font-bold text-[var(--color-secondary)]">
                {
                  messages.filter((msg) => msg.senderEmail !== user.email)
                    .length
                }
              </div>
              <div className="text-xs text-[var(--text-color-all)] opacity-70">
                Received
              </div>
            </div>
            <div className="bg-[var(--bg-color-all)] rounded-lg p-3">
              <div className="text-lg font-bold text-[var(--text-color-all)]">
                {messages.length}
              </div>
              <div className="text-xs text-[var(--text-color-all)] opacity-70">
                Total
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorMessages;
