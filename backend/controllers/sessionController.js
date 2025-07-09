import Question from '../models/questionModel.js';
import sessionModel from '../models/sessionModel.js';


// create a new session 
export const createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id;


        const session = await new sessionModel({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        })

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await new Question({
                    session: session._id,
                    questions: q.question,
                    answer: q.answer,
                });

                return question._id;
            })

        );

        session.questions = questionDocs;
        await session.save();


        res.status(201).json({ success: true, message: "Session created successfully", session });


    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// get all sessions for the logged in user 
export const getMySessions = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}



// get a session by Id with populated questions
export const getSessionById = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// delete the sessions 
export const deletesession = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}