import React from 'react';
import { Upload, Sparkles, FileCheck, FileText, Zap } from 'lucide-react';

const FileUploadEmpty = ({ onUploadClick }) => {
    return (
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
                Upload medical reports, prescriptions, lab results (PDF or Image) to get instant AI-powered analysis
            </p>
            <button
                onClick={onUploadClick}
                className="px-8 py-4 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:shadow-xl hover:shadow-[#19b4b4]/30 text-white rounded-xl transition-all duration-300 font-bold flex items-center gap-3 transform hover:scale-105"
            >
                <Upload className="w-5 h-5" />
                Choose File
            </button>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">PDF Reports</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <FileCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Images</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">AI Analysis</p>
                </div>
            </div>
        </div>
    );
};

export default FileUploadEmpty;