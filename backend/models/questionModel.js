import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
        question: String,
        answer: String,
        nots: String,
        isPinned: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
)


const questionModel = mongoose.model.Question || mongoose.model("Qustion", questionSchema);

export default questionModel;