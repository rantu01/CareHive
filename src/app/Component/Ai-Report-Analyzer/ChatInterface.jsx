import React, { useRef, useEffect } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import ChatEmptyState from './ChatEmptyState';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatInterface = ({ 
    messages, 
    inputMessage, 
    setInputMessage, 
    onSendMessage, 
    file, 
    isSending 
}) => {
    const chatEndRef = useRef(null);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)]">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-[#19b4b4] via-[#29e6e6] to-[#19b4b4]">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="font-bold text-white text-lg flex items-center gap-2">
                            AI Health Assistant
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        </h2>
                        <p className="text-sm text-white/90">Powered by Gemini 2.0 Flash</p>
                    </div>
                    <MessageSquare className="w-5 h-5 text-white/80" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
                {messages.length === 0 ? (
                    <ChatEmptyState />
                ) : (
                    <ChatMessages 
                        messages={messages} 
                        isSending={isSending} 
                        chatEndRef={chatEndRef} 
                    />
                )}
            </div>

            {/* Input */}
            <ChatInput 
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                onSend={onSendMessage}
                file={file}
                isSending={isSending}
            />
        </div>
    );
};

export default ChatInterface;