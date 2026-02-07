import { GoogleGenAI } from "@google/genai";
import {
    questionAnswerPrompt,
    conceptExplainPrompt
} from "../utils/prompts.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

/* -------------------------------
   Generate Interview Questions
-------------------------------- */
export const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const prompt = questionAnswerPrompt(
            role,
            experience,
            topicsToFocus,
            numberOfQuestions
        );

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // ✅ FIXED MODEL
            contents: prompt,
        });

        const rawText = response.text;

        // Clean possible markdown wrappers
        const cleanedText = rawText
            .replace(/```json|```/g, "")
            .trim();

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (err) {
            console.error("JSON Parse Error (Questions):", cleanedText);
            return res.status(500).json({
                success: false,
                message: "Invalid JSON response from AI",
            });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error("Generate Questions Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};


/* ---------------------------------
   Generate Concept Explanation
---------------------------------- */
export const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // ✅ FIXED MODEL
            contents: prompt,
        });

        const rawText = response.text;

        // Clean markdown if Gemini adds it
        const cleanedText = rawText
            .replace(/```json|```/g, "")
            .trim();

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (err) {
            console.error("JSON Parse Error (Explanation):", cleanedText);

            // ✅ fallback: return plain text instead of crashing
            return res.status(200).json({
                success: true,
                title: "Concept Explanation",
                explanation: cleanedText,
            });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error("Generate Explanation Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};
