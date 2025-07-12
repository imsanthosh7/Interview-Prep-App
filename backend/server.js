import exprss from "express";
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
import sessionRoutes from "./routes/sessionRoutes.js"
import questionsRoutes from "./routes/questionRoutes.js"

const app = exprss();


connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(cors({
    origin: function (origin, callback) {
        console.log("Request origin:", origin); // Debug
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));



app.use(exprss.json());
app.use(cookieParser());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionsRoutes);
// app.use("api/ai/generate-questions", protect, generateInterviewQuestions);
// app.use("api/ai/generate-explanation", protect, generateConceptExplanation);








app.get("/", (req, res) => {
    return res.send("hello world");
})



const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server start on PORT: ${PORT}`)
})