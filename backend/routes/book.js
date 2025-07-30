import express from 'express'
import { addBook, allBooks, deleteBook, starReview, updateBook } from '../controllers/bookController.js'
import upload from '../config/multer.js';
import { authenticationMid } from '../middleware/auth.js';
const router = express.Router()

// Tüm route'lara authentication middleware ekle
router.get('/', authenticationMid, allBooks)
router.post('/add', authenticationMid, upload.single('image'), addBook);
router.delete('/:id', authenticationMid, deleteBook);
router.put('/:id', authenticationMid, updateBook);
router.put('/:id/star', authenticationMid, starReview); 

export default router;