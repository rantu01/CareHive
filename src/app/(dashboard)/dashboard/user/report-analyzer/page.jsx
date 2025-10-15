"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Loader2, Send, Bot, User, Sparkles, CheckCircle2, AlertCircle, FileCheck, Zap, MessageSquare, X } from 'lucide-react';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const ScanAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#19b4b4] to-transparent animate-scan shadow-lg shadow-[#19b4b4]/50"></div>
            <style jsx>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2.5s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default function HealthReportAnalyzer() {
    const [pdfjsLib, setPdfjsLib] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const fileInputRef = useRef(null);
    const chatEndRef = useRef(null);
    const [isExtracting, setIsExtracting] = useState(false);

    // Initialize PDF.js
    useEffect(() => {
        (async () => {
            const pdfjs = await import("pdfjs-dist/build/pdf");
            const workerSrc = await import("pdfjs-dist/build/pdf.worker.mjs");
            pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(
                new Blob([`importScripts("${workerSrc.default}")`], { type: "application/javascript" })
            );
            setPdfjsLib(pdfjs);
        })();
    }, []);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Send text to backend for analysis
    const sendTextToBackend = async (text) => {
        const response = await axios.post('/api/reprtanalyzer-ai', { text });
        return response.data;
    };

    const { mutate: analyzeReport, isPending: isAnalyzing } = useMutation({
        mutationFn: sendTextToBackend,
        onSuccess: (data) => {
            console.log('Analysis successful:', data);
            const aiMessage = {
                id: Date.now(),
                role: 'assistant',
                content: data.data?.fullText || data.data || 'Analysis completed successfully!'
            };
            setMessages([aiMessage]);
        },
        onError: (error) => {
            console.error('Error analyzing:', error);
            setMessages([{
                id: Date.now(),
                role: 'assistant',
                content: 'Sorry, I encountered an error while analyzing your report. Please try again.'
            }]);
        },
    });

    // Send chat message
    const sendChatMessage = async ({ text, userQuestion }) => {
        const response = await axios.post('/api/reprtanalyzer-ai', {
            text,
            userQuestion,
            conversationHistory: messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n')
        });
        return response.data;
    };

    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: sendChatMessage,
        onSuccess: (data) => {
            const aiMessage = {
                id: Date.now(),
                role: 'assistant',
                content: data.data?.fullText || data.data || 'I understand your question.'
            };
            setMessages(prev => [...prev, aiMessage]);
        },
        onError: (error) => {
            console.error('Error sending message:', error);
        },
    });

    // Handle PDF file upload and extraction
    const handleFile = async (e) => {
        if (!pdfjsLib) return;

        const file = e.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            alert('Please upload a valid PDF file');
            return;
        }

        setPdfFile(file);
        setIsExtracting(true);
        setText("");
        setMessages([]);

        try {
            const data = new Uint8Array(await file.arrayBuffer());
            const pdf = await pdfjsLib.getDocument({ data }).promise;
            let extracted = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                extracted += content.items.map((x) => x.str).join(" ") + "\n\n";
            }

            setText(extracted);
        } catch (error) {
            console.error('Error extracting PDF:', error);
            alert('Failed to extract text from PDF');
        } finally {
            setIsExtracting(false);
        }
    };

    // Analyze PDF
    const handleAnalyze = () => {
        if (!text) return;
        analyzeReport(text);
    };

    // Send chat message
    const handleSendMessage = () => {
        if (!inputMessage.trim() || !text) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: inputMessage
        };

        setMessages(prev => [...prev, userMessage]);
        sendMessage({ text, userQuestion: inputMessage });
        setInputMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleReset = () => {
        setPdfFile(null);
        setText("");
        setMessages([]);
        setInputMessage("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen">
            {/* Modern Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20 shadow-sm">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#19b4b4] via-[#29e6e6] to-[#19b4b4] rounded-2xl flex items-center justify-center shadow-lg shadow-[#19b4b4]/30 animate-pulse">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#19b4b4] to-[#3b7f81] bg-clip-text text-transparent">
                                    HealthAI Analyzer
                                </h1>
                                <p className="text-sm text-gray-600 font-medium">Intelligent Medical Document Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {pdfFile && (
                                <button
                                    onClick={handleReset}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium border border-gray-200"
                                >
                                    <X className="w-4 h-4" />
                                    Reset
                                </button>
                            )}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:shadow-lg hover:shadow-[#19b4b4]/40 text-white rounded-xl transition-all duration-200 font-semibold transform hover:scale-105"
                            >
                                <Upload className="w-4 h-4" />
                                <span className="hidden sm:inline">Upload Report</span>
                                <span className="sm:hidden">Upload</span>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={handleFile}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - PDF Viewer */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)]">
                        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#19b4b4]/10 to-[#29e6e6]/10 rounded-xl flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-[#19b4b4]" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-[#111827] text-lg">Document Preview</h2>
                                        <p className="text-xs text-gray-500">Extracted content from your PDF</p>
                                    </div>
                                </div>
                                {text && !isExtracting && (
                                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Ready
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-6">
                            {!pdfFile ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="relative mb-6">
                                        <div className="w-28 h-28 bg-gradient-to-br from-[#19b4b4]/10 to-[#29e6e6]/10 rounded-3xl flex items-center justify-center">
                                            <Upload className="w-14 h-14 text-[#19b4b4]" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-full flex items-center justify-center shadow-lg">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#111827] mb-3">Upload Your Health Report</h3>
                                    <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                                        Upload medical reports, prescriptions, or lab results to get instant AI-powered analysis and insights
                                    </p>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-8 py-4 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:shadow-xl hover:shadow-[#19b4b4]/30 text-white rounded-xl transition-all duration-300 font-bold flex items-center gap-3 transform hover:scale-105"
                                    >
                                        <Upload className="w-5 h-5" />
                                        Choose PDF File
                                    </button>
                                    <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                                                <FileCheck className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <p className="text-xs text-gray-600 font-medium">Lab Reports</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                                                <FileText className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <p className="text-xs text-gray-600 font-medium">Prescriptions</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                                                <Zap className="w-6 h-6 text-green-600" />
                                            </div>
                                            <p className="text-xs text-gray-600 font-medium">Fast Analysis</p>
                                        </div>
                                    </div>
                                </div>
                            ) : isExtracting ? (
                                <div className="h-full flex flex-col items-center justify-center relative">
                                    <div className="w-full max-w-md bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 relative overflow-hidden border border-gray-100 shadow-lg">
                                        <ScanAnimation />
                                        <div className="relative z-10">
                                            <FileText className="w-24 h-24 text-[#19b4b4] mx-auto mb-6 animate-pulse" />
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Loader2 className="w-6 h-6 animate-spin text-[#19b4b4]" />
                                                    <span className="text-gray-700 font-bold text-lg">Scanning Document...</span>
                                                </div>
                                                <p className="text-sm text-gray-500">Extracting text from your PDF</p>
                                                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
                                                    <div className="h-full bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] rounded-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#19b4b4]/5 to-[#29e6e6]/5 rounded-xl border border-[#19b4b4]/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-lg flex items-center justify-center shadow-md">
                                                <CheckCircle2 className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">Document Extracted</p>
                                                <p className="text-xs text-gray-500">{pdfFile?.name}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleAnalyze}
                                            disabled={isAnalyzing}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:shadow-lg hover:shadow-[#19b4b4]/40 text-white rounded-xl transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4" />
                                                    Analyze
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[#19b4b4]" />
                                            Extracted Content
                                        </h3>
                                        <div className="max-h-[500px] overflow-auto bg-white rounded-lg p-4 border border-gray-100">
                                            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">{text}</pre>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Chat Interface */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)]">
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
                                    <p className="text-sm text-white/90">Ask anything about your report</p>
                                </div>
                                <MessageSquare className="w-5 h-5 text-white/80" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
                            {messages.length === 0 ? (
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
                                        Upload and analyze your document to start an intelligent conversation about your health report
                                    </p>
                                    <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                            <p className="text-sm text-blue-900 font-medium">💡 Get instant medical insights</p>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                                            <p className="text-sm text-purple-900 font-medium">🔍 Understand complex terms</p>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                                            <p className="text-sm text-green-900 font-medium">📋 Ask specific questions</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
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
                                                className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm ${message.role === 'user'
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
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-5 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={text ? "Ask me anything about your report..." : "Upload and analyze a document first..."}
                                    disabled={!text || isSending}
                                    className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19b4b4] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-200"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim() || !text || isSending}
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
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}