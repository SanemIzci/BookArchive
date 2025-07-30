import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        if (!name || !email || !password || !avatar) {
            return res.status(400).json({ message: "All fields are required " });
            
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "This email is already in use" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const uploadedAvatar = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 130,
            crop: "scale",
            overwrite: true
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: uploadedAvatar.public_id,
                url: uploadedAvatar.secure_url
            }
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
  
      // Password alanı seçilsin
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '15m' }
      );
  
      const refreshToken = jwt.sign(
        { userId: user._id }, 
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d' }
      );
  
      user.refreshToken = refreshToken;
      await user.save();
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
      });
  
      // FIX: Send the accessToken back to frontend
      res.status(200).json({
        message: 'Login successful',
        accessToken,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar
          // Don't send password or refreshToken
        }
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
export const logout=async(req,res)=>{
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) {
            return res.status(204).json({ message: "No content" });
        }
        const refreshToken = cookies.refreshToken;

        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            return res.status(204).json({ message: "No content" });
        }

        foundUser.refreshToken = '';
        await foundUser.save();

        res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        
    }
}

export const getUserProfile = async (req, res) => {
    try {
        // Check if user exists from middleware
        if (!req.user) {
            console.log('❌ No req.user found - middleware issue');
            return res.status(401).json({ message: "Authentication failed" });
        }
        const user = await User.findById(req.user._id).select('-password -refreshToken');

        if (!user) {
            console.log('❌ User not found in database');
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email:req.body.email });
        if (!user) {    
            return res.status(404).json({ message: "User not found" });
        }   
        
        
        const resetToken=crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 dakika geçerli
        await user.save({validateBeforeSave: false});

        try {
            console.log("Attempting to send email...");
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            
            const mailData = {
                from: '"E-Commerce App" <noreply@ecommerce.com>',
                to: req.body.email,
                subject: 'Password Reset Request',
                text: `You can use the following code to reset your password: ${resetToken}. This code will expire in 5 minutes.`,
                html: `<p>You can use the following code to reset your password: <strong>${resetToken}</strong></p>
                       <p>This code will expire in 5 minutes.</p>`
            };
    
            await transporter.sendMail(mailData)
            console.log("Email sent successfully with token:", resetToken);
            res.status(200).json({
                message: "We've sent a verification code to your email. Please check your inbox and enter the code to proceed."
            });
        } catch (error) {
            console.error("Error sending email:", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            res.status(500).json({ message: error.message });
        }
    }
export const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
        return res.status(400).json({ message: "Reset token and new password are required" });
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpire: { $gt: Date.now() } // Token süresi geçmemiş olmalı
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }
        if (!req.body.newPassword) {
            console.log("No password provided");
            return res.status(400).json({ message: "Password is required" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }


        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};