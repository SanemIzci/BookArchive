import express from 'express'
import { addBook, allBooks,deleteBook,starReview,updateBook } from '../controllers/bookController.js'
import upload from '../config/multer.js';
const router = express.Router()

router.get('/', allBooks)
router.post('/add', upload.single('image'), addBook);
router.delete('/:id',deleteBook);
router.put('/:id',updateBook);
router.put('/:id',starReview);


export default router;