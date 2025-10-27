import React from 'react';
import { Upload, FileText, X } from 'lucide-react';

const Header = ({ file, onUploadClick, onReset, fileInputRef, onFileChange }) => {
    return (
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
                        {file && (
                            <button
                                onClick={onReset}
                                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium border border-gray-200"
                            >
                                <X className="w-4 h-4" />
                                Reset
                            </button>
                        )}
                        <button
                            onClick={onUploadClick}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:shadow-lg hover:shadow-[#19b4b4]/40 text-white rounded-xl transition-all duration-200 font-semibold transform hover:scale-105"
                        >
                            <Upload className="w-4 h-4" />
                            <span className="hidden sm:inline">Upload File</span>
                            <span className="sm:hidden">Upload</span>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf,image/jpeg,image/jpg,image/png"
                            onChange={onFileChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;