import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getBookDetail, starReview, updateReadingStatus } from '../redux/BookSlice';
import { FaStar } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import { useState } from 'react';

function Details() {
    const { book, loading, error } = useSelector((state) => state.book);
    const { isAuth, user } = useSelector((state) => state.user);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        dispatch(getBookDetail(id));
    }, [dispatch, isAuth, navigate, id]);
    
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

    const handleRatingChange = (newRating) => {
        setSelectedRating(newRating);
        setHasRated(true);
    };

    if (!isAuth) {
        return <div className="flex justify-center items-center h-screen">Redirecting to login...</div>;
    }
    useEffect(() => {
        console.log("Book:", book);
      }, [book]);

    return (
        
    <div className='min-h-screen bg-[#f0eee2]'>
        {/**Book Content */}
        <div className='flex flex-row space-x-20 w-[60%] mx-auto relative z-10'>
        <div className='w-full md:w-[250px] md:h-[375px] mt-20 shadow-[-30px_30px_30px_10px_#00000045]'>
        {book && book.image && (
            <img src={book.image.url} alt={book.title}/>
        )}
        </div>
        <div className='flex flex-col space-y-5 mt-20'>
            {book && (
                <h2 className="text-3xl font-noto-italic-bold text-[#272935] mb-4 leading-tight">
                {book.title}</h2>
            )}
            <label className="block text-[#272935] mb-2">Rating</label>
            <StarRating
                rating={selectedRating}
                onRatingChange={handleRatingChange}
                interactive={true}
            />
            
            {/* Reading Status Dropdown */}
            {book && (
                <div className="flex flex-col space-y-2">
                    <label className="block text-[#272935] mb-2">Reading Status</label>
                    <select
                        value={book.readingStatus || ''}
                        onChange={(e) => {
                            dispatch(updateReadingStatus({ 
                                id: id, 
                                readingStatus: e.target.value 
                            }));
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#272935]"
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
        {/**Review Content */}
        <div className='w-[75%] mx-auto my-0 h-150 bg-[#fdfcf7] relative z-0 -mt-20'>

        </div>
                
                
    </div>
        
    )
}

export default Details