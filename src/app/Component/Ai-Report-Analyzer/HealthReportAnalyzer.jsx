"use client";
import React, { useState, useRef } from 'react';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

// Import components
import Header from './components/Header';
import DocumentViewer from './components/DocumentViewer';
import ChatInterface from './components/ChatInterface';

export default function HealthReportAnalyzer() {
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const fileInputRef = useRef(null);

    // Analyze file with Gemini
    const analyzeFile = async (formData) => {
        const response = await axios.post('/api/reprtanalyzer-ai', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    };

    const { mutate: analyzeReport, isPending: isAnalyzing } = useMutation({
        mutationFn: analyzeFile,
        onSuccess: (data) => {
            console.log('Analysis successful:', data);
            const aiMessage = {
                id: Date.now(),
                role: 'assistant',
                content: data.data?.aiResponse || 'Analysis completed successfully!'
            };
            setMessages([aiMessage]);
        },
        onError: (error) => {
            console.error('Error analyzing:', error);
            Swal.fire({
                icon: 'error',
                title: 'Analysis Failed',
                text: error.response?.data?.error || 'Failed to analyze the document. Please try again.'
            });
        },
    });

    // Send chat message with file context
    const sendChatMessage = async (formData) => {
        const response = await axios.post('/api/reprtanalyzer-ai', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    };

    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: sendChatMessage,
        onSuccess: (data) => {
            const aiMessage = {
                id: Date.now(),
                role: 'assistant',
                content: data.data?.aiResponse || 'I understand your question.'
            };
            setMessages(prev => [...prev, aiMessage]);
        },
        onError: (error) => {
            console.error('Error sending message:', error);
            Swal.fire({
                icon: 'error',
                title: 'Message Failed',
                text: 'Failed to send message. Please try again.'
            });
        },
    });

    // Handle file upload
    const handleFileChange = async (e) => {
        const uploadedFile = e.target.files[0];

        if (!uploadedFile) return;

        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(uploadedFile.type)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid File Type',
                text: 'Please upload a PDF or image file (JPG, PNG)'
            });
            return;
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (uploadedFile.size > maxSize) {
            Swal.fire({
                icon: 'error',
                title: 'File Too Large',
                text: 'File size must be less than 10MB'
            });
            return;
        }

        setFile(uploadedFile);
        setMessages([]);

        // Create preview for images
        if (uploadedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(uploadedFile);
        } else {
            setFilePreview(null);
        }
    };

    // Analyze the uploaded file
    const handleAnalyze = () => {
        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'No File',
                text: 'Please upload a file first'
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        analyzeReport(formData);
    };

    // Send chat message
    const handleSendMessage = () => {
        if (!inputMessage.trim() || !file) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: inputMessage
        };

        setMessages(prev => [...prev, userMessage]);

        // Create FormData with file and question
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userQuestion', inputMessage);

        // Add conversation history
        const conversationHistory = messages.slice(-5)
            .map(m => `${m.role}: ${m.content}`)
            .join('\n');
        formData.append('conversationHistory', conversationHistory);

        sendMessage(formData);
        setInputMessage('');
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleReset = () => {
        setFile(null);
        setFilePreview(null);
        setMessages([]);
        setInputMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen">
            <Header
                file={file}
                onUploadClick={handleUploadClick}
                onReset={handleReset}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
            />

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Document Viewer */}
                    <DocumentViewer
                        file={file}
                        filePreview={filePreview}
                        isAnalyzing={isAnalyzing}
                        onAnalyze={handleAnalyze}
                        onUploadClick={handleUploadClick}
                    />

                    {/* Right Side - Chat Interface */}
                    <ChatInterface
                        messages={messages}
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        onSendMessage={handleSendMessage}
                        file={file}
                        isSending={isSending}
                    />
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
