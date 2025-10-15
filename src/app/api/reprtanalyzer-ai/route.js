
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * Builds an enhanced prompt for medical document analysis
 * @param {string} documentText - Extracted text from medical document
 * @param {string|null} conversationHistory - Previous conversation context
 * @param {string|null} userQuestion - User's specific question
 * @returns {string} Formatted prompt for AI
 */
function buildMedicalAnalysisPrompt(documentText, conversationHistory = null, userQuestion = null) {
    // Initial analysis prompt (when no conversation exists)
    if (!userQuestion) {
        return `You are an expert medical AI assistant specializing in interpreting health reports, prescriptions, and lab results. Your role is to explain medical documents in clear, accessible language while maintaining accuracy.

DOCUMENT CONTENT:
"""
${documentText}
"""

TASK: Provide a comprehensive yet concise analysis of this medical document.

ANALYSIS STRUCTURE:

1. Document Type Identification: Identify what type of document this is (lab report, prescription, imaging report, consultation notes, etc.)

2. Summary: Provide a brief 2-3 sentence overview of the document's key purpose and findings

3. Key Findings: List the most important medical findings, test results, or prescriptions. For each:
   - State the measurement/finding clearly
   - Indicate if it's normal, abnormal, or borderline
   - Explain clinical significance in simple terms

4. Medications & Dosages (if applicable): List all medications with:
   - Drug name and dosage
   - Purpose/indication
   - Important administration instructions
   - Common side effects to watch for

5. Abnormal Values & Concerns: Highlight any results outside normal ranges or concerning findings:
   - Explain what the abnormality means
   - Potential implications
   - Level of urgency (routine follow-up vs immediate attention)

6. Recommendations: Based on the document, provide:
   - Follow-up actions mentioned
   - Lifestyle modifications suggested
   - When to seek medical attention

GUIDELINES:
- Use simple, patient-friendly language
- Avoid unnecessary medical jargon; when used, explain it
- Be empathetic and reassuring while being honest about findings
- Never diagnose conditions not explicitly stated in the document
- For concerning findings, always recommend consulting with a healthcare provider
- Include normal reference ranges when discussing lab values
- Highlight urgent matters clearly

IMPORTANT DISCLAIMERS:
- Clearly state you're providing information, not medical advice
- Emphasize the importance of discussing results with their doctor
- Note that individual circumstances may affect interpretation

Respond in a structured, easy-to-read format with clear sections.`;
    }

    // Conversation follow-up prompt (when user asks questions)
    return `You are an expert medical AI assistant helping a patient understand their health document.

ORIGINAL DOCUMENT:
"""
${documentText}
"""

${conversationHistory ? `CONVERSATION HISTORY:\n${conversationHistory}\n` : ''}

USER'S QUESTION:
"""
${userQuestion}
"""

INSTRUCTIONS:
- Answer the user's specific question based on the medical document provided
- Reference specific values, medications, or findings from the document when relevant
- Keep your response focused and concise (3-5 sentences unless more detail is needed)
- Use simple, patient-friendly language
- If the question cannot be answered from the document alone, explain what information is missing
- For medical advice questions, remind them to consult their healthcare provider
- If the question is about prognosis, treatment options, or diagnosis not in the document, explain you can only interpret what's written
- Be supportive and reduce anxiety when appropriate

RESPONSE TONE:
- Professional yet warm and approachable
- Empathetic and reassuring
- Clear and educational
- Non-judgmental

Provide a direct, helpful answer to their question.`;
}

/**
 * POST /api/reprtanalyzer-ai
 * Analyzes medical documents using AI
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { text, conversationHistory, userQuestion } = body;

        // Validate required fields
        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { status: 400, error: "Document text is required" },
                { status: 400 }
            );
        }

        // Build appropriate prompt based on whether it's initial analysis or chat
        const prompt = buildMedicalAnalysisPrompt(
            text,
            conversationHistory || null,
            userQuestion || null
        );

        console.log('Processing medical document analysis...');

        // Call Gemini API with your API key
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
           {
               contents: [
                    {
                        parts: [
                            {
                                 text: prompt || 'Explain how AI works in a few words',
                           },
                        ],
                     },
                ],
            },
           {
               headers: {
                   'Content-Type': 'application/json',
                     'X-goog-api-key': `${process.env.NEXT_PUBLIC_OPEN_AI}`,
                 },
            }
         );

        // Extract AI response
        const aiResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            console.error('No response from AI:', response.data);
            return NextResponse.json(
                { status: 500, error: "Failed to generate AI response" },
                { status: 500 }
            );
        }

        console.log('Analysis completed successfully');

        // Return response in format expected by frontend
        return NextResponse.json({ 
            status: 200, 
            data: aiResponse 
        });

    } catch (error) {
        console.error('Error in report analyzer API:', error);

        // Handle specific error types
        if (error.response) {
            // API returned an error
            return NextResponse.json(
                {
                    status: error.response.status,
                    error: "AI service error",
                    details: error.response.data?.error?.message || "Unknown API error"
                },
                { status: error.response.status }
            );
        } else if (error.request) {
            // Request made but no response
            return NextResponse.json(
                { status: 503, error: "AI service unavailable. Please try again later." },
                { status: 503 }
            );
        } else {
            // Other errors
            return NextResponse.json(
                { status: 500, error: "Internal server error" },
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
        status: "healthy",
        service: "Medical Report Analyzer API",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
}