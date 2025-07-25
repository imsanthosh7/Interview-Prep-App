import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String },

    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model.user || mongoose.model('user', UserSchema);

export default userModel;