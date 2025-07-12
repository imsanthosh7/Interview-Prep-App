import Question from '../models/questionModel.js';
import Session from '../models/sessionModel.js';


export const addQuestionToSession = async (req, res) => {

    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(400).json({ success: false, message: "Session not found" });
        }

        // create new questions 
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        )

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json({ success: true, questions: createdQuestions });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}




export const togglePinQuestion = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}




export const updateQuestionNote = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}