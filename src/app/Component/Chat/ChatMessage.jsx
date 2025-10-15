"use client";
import React from "react";

const ChatMessage = ({ message, isSender }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`p-3 rounded-xl max-w-xs ${
          isSender
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-[var(--gray-color)] text-[var(--fourground-color)] rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.message}</p>
        <span className="block text-[10px] opacity-60 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
