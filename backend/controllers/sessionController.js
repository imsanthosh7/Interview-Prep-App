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
        });

        await session.save();

        const questionIds = await Promise.all(
            questions.map(async (q) => {
                const questionDoc = await new Question({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                await questionDoc.save();
                return questionDoc._id;
            })

        );

        session.questions = questionIds;
        await session.save();

        res.status(201).json({ success: true, message: "Session created successfully", session });


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// get all sessions for the logged in user 
export const getMySessions = async (req, res) => {
    try {

        const sessions = await sessionModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate("questions");
        res.status(200).json(sessions);

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}



// get a session by Id with populated questions
export const getSessionById = async (req, res) => {
    try {

        const session = await sessionModel.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: { isPinnd: -1, createdAt: 1 } }
            })
            .exec();

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        res.status(200).json({ success: true, session })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// delete the sessions 
export const deletesession = async (req, res) => {
    try {
        const session = await sessionModel.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not authorized to delete this session" });
        }
         
        // delete all auestions in linked session 
        await Question.deleteMany({ session: session._id });
        
        // delete the session
        await sessionModel.deleteOne({ _id: session._id });


        res.status(200).json({ success: true, message: "Session deleted successfully" });

    } catch (error) {
        console.error("DELETE SESSION ERROR:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
