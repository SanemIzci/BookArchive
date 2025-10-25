import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticationMid = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Please login to continue" });
        }

        const token = authHeader.split(" ")[1];

        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({ message: "Please login to continue" });
        }

        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decodedData.userId);

        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Token invalid" });
    }
};