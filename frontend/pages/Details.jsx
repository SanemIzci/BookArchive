import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getBookDetail, starReview, updateReadingStatus } from '../redux/BookSlice';
import { FaStar } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import Review from '../components/Review';

function Details() {
    const { book, loading, error } = useSelector((state) => state.book);
    const { isAuth, user } = useSelector((state) => state.user);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // Token kontrolü
    const checkAuth = () => {
        const token = localStorage.getItem('accessToken');
        return !!token; 
    };

    useEffect(() => {
        
        if (!isInitialized) {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }
            setIsInitialized(true);
        }

        
        if (isInitialized && checkAuth() && id) {
            dispatch(getBookDetail(id));
        }
    }, [dispatch, navigate, id, isInitialized]); 
    
    useEffect(() => {
        if (book?.rating) {
            setSelectedRating(book.rating);
        }
    }, [book?.rating]);

    useEffect(() => {
        if (selectedRating > 0 && hasRated) {
            dispatch(starReview({ id: id, rating: selectedRating }));
        }
    }, [selectedRating, hasRated, id, dispatch]);

    useEffect(() => {
        console.log("Book:", book);
    }, [book]);
    useEffect(()=>{
        console.log()
    })
    const handleRatingChange = (newRating) => {
        setSelectedRating(newRating);
        setHasRated(true);
    };

    
    if (!isInitialized) {
        return <div className="flex justify-center items-center h-screen">Initializing...</div>;
    }

    if (!checkAuth()) {
        return <div className="flex justify-center items-center h-screen">Please login to continue...</div>;
    }

    return (
        
    <div className='min-h-screen bg-[#f0eee2] px-4 md:px-0'>
        {/**Book Content */}
        <div className='flex justify-center w-full'>
            <div className='flex flex-col lg:flex-row lg:space-x-20 w-full lg:w-[60%] xl:w-[70%] relative z-10'>
                {/* Book Image */}
                <div className='w-full lg:w-auto flex justify-center lg:justify-start mt-8 lg:mt-20'>
                    <div className='w-full max-w-[250px] h-[375px] lg:w-[250px] lg:h-[375px] shadow-[-30px_30px_30px_10px_#00000045] rounded-lg lg:rounded-none'>
                        {book && book.image && (
                            <img src={book.image.url} alt={book.title} className="w-full h-full object-cover rounded-lg lg:rounded-none"/>
                        )}
                    </div>
                </div>    
                
                {/* Book Info */}
                <div className='flex flex-col space-y-4 md:space-y-5 mt-6 lg:mt-20 w-full lg:w-auto mb-10'>
                    {book && (
                        <h2 className="text-2xl md:text-3xl font-noto-italic-bold text-[#272935] mb-2 md:mb-4 leading-tight text-center lg:text-left">
                            {book.title}
                        </h2>
                    )}
                    
                    <div className="space-y-4 md:space-y-5 md:mb-20 md:mx-auto w-[60%]">
                        <div className="flex flex-col space-y-4">
                            {/* Rating Section */}
                            <div className="flex flex-row items-center space-x-4">
                                <label className="block text-[#272935] text-sm md:text-base font-medium min-w-[100px]">Rating</label>
                                <div className="flex justify-start">
                                    <StarRating
                                        rating={selectedRating}
                                        onRatingChange={handleRatingChange}
                                        interactive={true}
                                    />
                                </div>
                            </div>
                            
                            {/* Reading Status Dropdown */}
                            {book && (
                                <div className="flex flex-row items-center space-x-4">
                                    <label className="block text-[#272935] text-sm md:text-base font-medium min-w-[100px]">Reading Status</label>
                                    <select
                                        value={book.readingStatus || ''}
                                        onChange={(e) => {
                                            dispatch(updateReadingStatus({ 
                                                id: id, 
                                                readingStatus: e.target.value 
                                            }));
                                        }}
                                        className="px-3 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#272935] text-sm md:text-base w-full max-w-xs"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="to-read">To Read</option>
                                        <option value="reading">Currently Reading</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/**Review Content */}
        {book && book._id && (
            <div className='w-full px-4 md:px-0 md:w-[90%] lg:w-[75%] mx-auto min-h-[400px] md:h-[500px] bg-[#fdfcf7] relative z-0 -mt-10 md:-mt-20 lg:-mt-30 flex justify-center items-center rounded-lg md:rounded-none shadow-lg md:shadow-none'>
                <Review bookId={book._id} />
            </div>
        )}
        
    </div>
        
    )
}

export default Details