import { buildMedicalAnalysisPrompt } from "@/app/utils/reportanalyzer-prompt";
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * Builds medical analysis prompt
 */

/**
 * Process file with Gemini 2.0 Flash
 */
async function processWithGemini(file, prompt) {
    const fileType = file.type;
    const apiKey = process.env.NEXT_PUBLIC_OPEN_AI;

    if (!apiKey) {
        throw new Error('Gemini API key not configured');
    }

    try {
        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');

        // Determine mime type
        let mimeType = fileType;
        if (fileType === 'application/pdf') {
            mimeType = 'application/pdf';
        } else if (fileType.startsWith('image/')) {
            mimeType = fileType;
        }

        // Call Gemini API with file and prompt
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            },
                            {
                                inline_data: {
                                    mime_type: mimeType,
                                    data: base64
                                }
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 60000 // 60 second timeout
            }
        );

        const aiResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            throw new Error('No response from Gemini API');
        }

        return aiResponse;

    } catch (error) {
        if (error.response) {
            console.error('Gemini API Error:', error.response.data);
            throw new Error(error.response.data?.error?.message || 'Gemini API error');
        }
        throw error;
    }
}

/**
 * POST /api/reprtanalyzer-ai
 * Analyzes medical documents using Gemini AI
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const userQuestion = formData.get('userQuestion');
        const conversationHistory = formData.get('conversationHistory');

        // Validate file
        if (!file) {
            return NextResponse.json(
                { status: 400, error: 'No file uploaded' },
                { status: 400 }
            );
        }

        console.log('File received:', {
            name: file.name,
            type: file.type,
            size: file.size,
            hasQuestion: !!userQuestion
        });

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { status: 400, error: 'File size exceeds 10MB limit' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { 
                    status: 400, 
                    error: `Unsupported file type: ${file.type}. Supported: PDF, JPG, PNG` 
                },
                { status: 400 }
            );
        }

        console.log('Processing document with Gemini 2.0 Flash...');

        // Build prompt based on whether it's initial analysis or follow-up question
        const prompt = buildMedicalAnalysisPrompt(
            userQuestion || null,
            conversationHistory || null
        );

        // Process with Gemini
        const aiResponse = await processWithGemini(file, prompt);

        console.log('Analysis completed successfully');

        // Return response
        return NextResponse.json({
            status: 200,
            data: { 
                aiResponse,
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Error in report analyzer API:', error);

        // Handle specific error types
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.error?.message || 'AI service error';
            
            // Handle rate limiting
            if (status === 429) {
                return NextResponse.json(
                    {
                        status: 429,
                        error: 'Rate limit exceeded. Please try again in a moment.'
                    },
                    { status: 429 }
                );
            }

            // Handle invalid API key
            if (status === 401 || status === 403) {
                return NextResponse.json(
                    {
                        status: 500,
                        error: 'API configuration error. Please contact support.'
                    },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                {
                    status: status,
                    error: 'AI service error',
                    details: message
                },
                { status: status }
            );
        } else if (error.request) {
            // Request made but no response
            return NextResponse.json(
                { 
                    status: 503, 
                    error: 'AI service unavailable. Please try again later.' 
                },
                { status: 503 }
            );
        } else if (error.code === 'ECONNABORTED') {
            // Timeout error
            return NextResponse.json(
                { 
                    status: 504, 
                    error: 'Request timeout. Please try with a smaller file.' 
                },
                { status: 504 }
            );
        } else {
            // Other errors
            return NextResponse.json(
                { 
                    status: 500, 
                    error: error.message || 'Internal server error' 
                },
                { status: 500 }
            );
        }
    }
}

/**
 * GET /api/reprtanalyzer-ai
 * Health check endpoint
 */
export async function GET() {
    return NextResponse.json({
        status: 'healthy',
        service: 'Medical Report Analyzer API',
        version: '2.0.0',
        model: 'Gemini 2.0 Flash',
        supportedFormats: ['PDF', 'JPG', 'PNG'],
        maxFileSize: '10MB',
        timestamp: new Date().toISOString(),
    });
}