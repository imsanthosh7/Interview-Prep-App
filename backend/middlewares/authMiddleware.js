import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


export const protect = async (req, res, next) => {

    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Admin not found' })
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }


}