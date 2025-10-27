import React from 'react';
import { CheckCircle2, Sparkles, Loader2, FileText, Image as ImageIcon } from 'lucide-react';

const FilePreview = ({ file, filePreview, isAnalyzing, onAnalyze }) => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#19b4b4]/5 to-[#29e6e6]/5 rounded-xl border border-[#19b4b4]/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-lg flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">File Uploaded</p>
                        <p className="text-xs text-gray-500">{file?.name}</p>
                    </div>
                </div>
                <button
                    onClick={onAnalyze}
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
                    {file?.type.startsWith('image/') ? (
                        <ImageIcon className="w-4 h-4 text-[#19b4b4]" />
                    ) : (
                        <FileText className="w-4 h-4 text-[#19b4b4]" />
                    )}
                    File Preview
                </h3>
                <div className="max-h-[500px] overflow-auto bg-white rounded-lg p-4 border border-gray-100">
                    {filePreview ? (
                        <img 
                            src={filePreview} 
                            alt="Preview" 
                            className="w-full h-auto rounded-lg"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                            <FileText className="w-16 h-16 mb-3 text-[#19b4b4]" />
                            <p className="text-sm font-medium">{file?.name}</p>
                            <p className="text-xs mt-1">PDF Document</p>
                            <p className="text-xs mt-1">{(file?.size / 1024).toFixed(2)} KB</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilePreview;