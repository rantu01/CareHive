import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessages = ({ messages, isSending, chatEndRef }) => {
    return (
        <>
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                    {message.role === 'assistant' && (
                        <div className="w-9 h-9 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                    )}
                    <div
                        className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm ${
                            message.role === 'user'
                                ? 'bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] text-white'
                                : 'bg-white text-gray-800 border border-gray-100'
                        }`}
                    >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                        <div className="w-9 h-9 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                    )}
                </div>
            ))}
            {isSending && (
                <div className="flex gap-3 animate-fadeIn">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 bg-[#19b4b4] rounded-full animate-bounce"></div>
                            <div className="w-2.5 h-2.5 bg-[#19b4b4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2.5 h-2.5 bg-[#19b4b4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
        </>
    );
};

export default ChatMessages;