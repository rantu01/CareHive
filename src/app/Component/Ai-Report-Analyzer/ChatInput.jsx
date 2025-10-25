import React from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ 
    inputMessage, 
    setInputMessage, 
    onSend, 
    file, 
    isSending 
}) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="p-5 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={file ? "Ask me anything about your document..." : "Upload and analyze a file first..."}
                    disabled={!file || isSending}
                    className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19b4b4] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-200"
                />
                <button
                    onClick={onSend}
                    disabled={!inputMessage.trim() || !file || isSending}
                    className="px-5 py-3.5 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:shadow-lg hover:shadow-[#19b4b4]/40 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold transform hover:scale-105 disabled:transform-none"
                >
                    {isSending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Press Enter to send • Shift+Enter for new line
            </p>
        </div>
    );
};

export default ChatInput;