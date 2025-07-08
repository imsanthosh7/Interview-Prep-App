import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        role: { type: String, required: true },
        experience: { type: String, required: true },
        topicsToFocus: { type: String, required: true },
        descriptiobn: String,
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
    },
    {
        timestamps: true,
    }
)


const sessionModel = mongoose.model.Session || mongoose.model("Session", sessionSchema)

export default sessionModel;

