"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatMessage from "@/app/Component/Chat/ChatMessage";
import UseAuth from "@/app/Hooks/UseAuth";
import Swal from "sweetalert2";

const DoctorChat = () => {
  const { user } = UseAuth();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Fetch verified doctors
  useEffect(() => {
    setLoading(true);
    axios.get("/api/doctors")
      .then((res) => setDoctors(res.data))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Fetch messages with selected doctor
  useEffect(() => {
    if (!selectedDoctor || !user) return;

    setLoading(true);
    axios
      .get(`/api/messages?userEmail=${user.email}&doctorEmail=${selectedDoctor.personalInfo.email}`)
      .then((res) => {
        setMessages(res.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
      })
      .finally(() => setLoading(false));
  }, [selectedDoctor, user]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message & notification
  const sendMessage = async () => {
    if (!text.trim() || !selectedDoctor) return;

    const newMsg = {
      senderEmail: user.email,
      receiverEmail: selectedDoctor.personalInfo.email,
      message: text.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      // 1️⃣ Save message
      await axios.post("/api/messages", newMsg);
      setMessages((prev) => [...prev, newMsg]);
      setText("");

      // 2️⃣ Send notification
      const notifRes = await axios.post("/api/send-notification", {
        targetEmail: selectedDoctor.personalInfo.email,
        title: `New Message from ${user.name || user.email}`,
        body: text.trim(),
      });

      if (!notifRes.data.success) console.error("Notification error:", notifRes.data.message);

    } catch (error) {
      console.error("Failed to send message:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to send message",
        icon: "error",
        confirmButtonColor: "var(--color-primary)",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-[var(--sidebar-bg)] rounded-2xl p-6 shadow-lg border border-[var(--dashboard-border)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-color-all)] font-heading">
            Chat with Doctors
          </h2>
          <p className="text-sm text-[var(--color-secondary)] mt-1">
            Connect with verified healthcare professionals
          </p>
        </div>
        {selectedDoctor && (
          <div className="flex items-center gap-3 bg-[var(--bg-color-all)] px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[var(--text-color-all)]">
              Online
            </span>
          </div>
        )}
      </div>

      {/* Doctor Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-color-all)] mb-2">
          Select a Doctor
        </label>
        <select
          onChange={(e) => setSelectedDoctor(e.target.value ? JSON.parse(e.target.value) : null)}
          className="w-full p-3 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] text-[var(--text-color-all)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all appearance-none cursor-pointer"
          disabled={loading}
        >
          <option value="">Choose a doctor to chat with...</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={JSON.stringify(doc)}>
              Dr. {doc.personalInfo.fullName} • {doc.specialization}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Window */}
      {selectedDoctor ? (
        <div className="bg-[var(--dashboard-bg)] rounded-2xl border border-[var(--dashboard-border)] overflow-hidden shadow-sm">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                {selectedDoctor.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  Dr. {selectedDoctor.personalInfo.fullName}
                </h3>
                <p className="text-white/80 text-sm">
                  {selectedDoctor.specialization}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-4 bg-gradient-to-b from-[var(--bg-color-all)] to-[var(--sidebar-bg)]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-color-all)] mb-2">
                  Start a Conversation
                </h3>
                <p className="text-sm text-[var(--color-secondary)] max-w-sm">
                  Send your first message to Dr. {selectedDoctor.personalInfo.fullName} to begin your consultation.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <ChatMessage
                    key={i}
                    message={msg}
                    isSender={msg.senderEmail === user.email}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[var(--dashboard-border)] p-4 bg-[var(--dashboard-bg)]">
            <div className="flex gap-3">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 rounded-xl border border-[var(--dashboard-border)] bg-[var(--sidebar-bg)] text-[var(--text-color-all)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                disabled={!text.trim() || loading}
                className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-[var(--color-secondary)] mt-2 text-center">
              Press Enter to send quickly
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--dashboard-bg)] rounded-2xl border-2 border-dashed border-[var(--dashboard-border)] p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-[var(--bg-color-all)] rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-color-all)] mb-2">
            Select a Doctor to Start Chatting
          </h3>
          <p className="text-[var(--color-secondary)] max-w-md mx-auto">
            Choose from our verified healthcare professionals to begin your secure medical consultation.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorChat;
