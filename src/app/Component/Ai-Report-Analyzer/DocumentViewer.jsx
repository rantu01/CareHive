import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import FileUploadEmpty from './FileUploadEmpty';
import FilePreview from './FilePreview';

const DocumentViewer = ({ 
    file, 
    filePreview, 
    isAnalyzing, 
    onAnalyze, 
    onUploadClick 
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)]">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#19b4b4]/10 to-[#29e6e6]/10 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[#19b4b4]" />
                        </div>
                        <div>
                            <h2 className="font-bold text-[#111827] text-lg">Document Preview</h2>
                            <p className="text-xs text-gray-500">Upload PDF or Image</p>
                        </div>
                    </div>
                    {file && (
                        <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Ready
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                {!file ? (
                    <FileUploadEmpty onUploadClick={onUploadClick} />
                ) : (
                    <FilePreview 
                        file={file}
                        filePreview={filePreview}
                        isAnalyzing={isAnalyzing}
                        onAnalyze={onAnalyze}
                    />
                )}
            </div>
        </div>
    );
};

export default DocumentViewer;