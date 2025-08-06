import express from 'express';
import { register, login, logout,resetPassword,forgotPassword ,getUserProfile} from '../controllers/userController.js';
import { authenticationMid } from '../middleware/auth.js';
import { refreshToken } from '../controllers/refreshTokenController.js';
const router = express.Router();

// Test route to verify backend is working
router.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);  
router.post('/forgot-password', forgotPassword); 
router.post('/reset-password', resetPassword);
router.post('/refresh-token', refreshToken);
router.get('/profile', authenticationMid, getUserProfile);

export default router;
