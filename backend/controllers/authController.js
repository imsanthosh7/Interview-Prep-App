import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';


// user register 

export const registerUser = async (req, res) => {

    const { name, email, password, profileImageUrl } = req.body;

    if (!name || !email || !password) {
        return res.json({ succcess: false, message: "Missing details" })
    }


    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            res.json({ succcess: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            profileImageUrl,
            password: hashedPassword,
        })

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true, message: "Register Successfully", _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token,
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }



}


// user login 

export const loginUser = async (req, res) => {


    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password are required' })
    }

    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'Invalid email' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // return res.status(200).json({ success: true, message: 'loggedin Successfully' })

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token,
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}


// user profile 

export const getUserProfile = async (req, res) => {

    try {

        const user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}