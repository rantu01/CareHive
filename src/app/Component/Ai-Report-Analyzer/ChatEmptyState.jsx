import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

const ChatEmptyState = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#19b4b4]/10 to-[#29e6e6]/10 rounded-3xl flex items-center justify-center">
                    <Bot className="w-12 h-12 text-[#19b4b4]" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-2">AI Assistant Ready</h3>
            <p className="text-gray-600 max-w-sm mb-6 leading-relaxed">
                Upload and analyze your document to start an intelligent conversation
            </p>
            <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium">💡 Instant medical insights</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <p className="text-sm text-purple-900 font-medium">🔍 Understand complex terms</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-purple-200">
                    <p className="text-sm text-green-900 font-medium">📋 Ask specific questions</p>
                </div>
            </div>
        </div>
    );
};

export default ChatEmptyState;