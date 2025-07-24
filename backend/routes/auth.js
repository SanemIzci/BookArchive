import express from 'express';
import { register, login, logout,resetPassword,forgotPassword ,getUserProfile} from '../controllers/userController.js';
import { authenticationMid } from '../middleware/auth.js';
import { refreshToken } from '../controllers/refreshTokenController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);  
router.post('/forgot-password', forgotPassword); // Şifre sıfırlama isteği için
router.post('/reset-password', resetPassword);
router.post('/refresh-token', refreshToken); // Access token yenileme  // Şifre sıfırlama işlemi için
router.get('/profile', authenticationMid, getUserProfile); // Kullanıcı profili için
export default router;
