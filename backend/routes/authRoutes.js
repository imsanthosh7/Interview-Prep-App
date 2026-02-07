import express from "express";
import { registerUser, loginUser, getUserProfile, googleAuthCallback } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import passport from "../config/passport.js";


const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);


router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imgUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({ imgUrl });
})


// Google OAuth Routes
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/?error=auth_failed`,
        session: false
    }),
    googleAuthCallback
);



export default router;