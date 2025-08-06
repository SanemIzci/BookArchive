import express from 'express'
import { addBook, allBooks, BookDetail, deleteBook, starReview, updateBook, updateReadingStatus ,postReview,getReviews,updateReview, getFavorites,toggleFavorite} from '../controllers/bookController.js'
import upload from '../config/multer.js';
import { authenticationMid } from '../middleware/auth.js';
const router = express.Router()


router.get('/', authenticationMid, allBooks)
router.get('/favorites',authenticationMid,getFavorites)
router.get('/:id',authenticationMid,BookDetail)
router.post('/add', authenticationMid, upload.single('image'), addBook);
router.delete('/:id', authenticationMid, deleteBook);
router.put('/:id', authenticationMid, updateBook);
router.patch('/:id/rating', authenticationMid, starReview); // ✅ daha doğru
router.patch('/:id/status', authenticationMid, updateReadingStatus);
router.post('/:id/review', authenticationMid, postReview);  
router.get('/:id/reviews', authenticationMid, getReviews);
router.put('/:id/review', authenticationMid, updateReview);
router.patch('/:id/favorite', authenticationMid, toggleFavorite);
export default router;