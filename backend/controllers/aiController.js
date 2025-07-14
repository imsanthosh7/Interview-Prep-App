import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt, conceptExplainPrompt } from '../utils/prompts.js'


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



// generate interview questions and answer using gemini 
export const generateInterviewQuestions = async (req, res) => {

    try {

        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting ```json
            .replace(/```$/, "") // remove ending ```
            .trim(); // remove extra spaces

        // Now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);



    } catch (error) {
        res.status(500).json({ success: false, message: "Falid to generate questions", error: error.message })
    }
}



export const generateConceptExplanation = async (req, res) => {
    try {

        const { question } = req.body;
        if (!question) {
            return res.status(200).json({ success: false, message: "Missing required fields" })
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        })

        let rawText = response.text;


        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting ```json
            .replace(/```$/, "") // remove ending ```
            .trim(); // remove extra spaces

        // Now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data)


    } catch (error) {
        res.status(500).json({ success: false, message: "Something went worng", error: error.message })
    }
}