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
);


const questionModel = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default questionModel;
