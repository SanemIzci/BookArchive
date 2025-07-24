import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import crypto from 'crypto';

export const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log("Cookies:", cookies);
    if (!cookies?.refreshToken) {
        return res.status(401).json({ success: false, message: "No refresh token" });
    }
    const refreshToken = cookies.refreshToken;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403); 

   
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser._id.toString() !== decoded.userId) {
            return res.sendStatus(403);
        }
        
        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '15m' }
        );
        res.json({ accessToken });
    });
};