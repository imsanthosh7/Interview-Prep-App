import express from "express";
import 'dotenv/config';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path';
import connectDB from "./config/db.js";
import passport from "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionsRoutes from "./routes/questionRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import {
  generateInterviewQuestions,
  generateConceptExplanation
} from './controllers/aiController.js';

// Create express app
const app = express();

// ===== Static Files =====
app.use('/uploads', express.static('uploads'));

// ===== Middlewares =====
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// ===== CORS Setup =====
const allowedOrigins = [
  'http://localhost:5173',
  'https://interview-prep-app-woad.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// ===== Root Route =====
app.get("/", (req, res) => {
  res.send("✅ API is running successfully");
});

// ===== Start Server After DB Connect =====
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB(); // Wait until MongoDB connects successfully
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
