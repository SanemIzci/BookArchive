import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getBookDetail } from '../redux/BookSlice';

function Details() {
    const { book, loading, error } = useSelector((state) => state.book);
    const { isAuth, user } = useSelector((state) => state.user);
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

    if (!isAuth) {
        return <div className="flex justify-center items-center h-screen">Redirecting to login...</div>;
    }
    useEffect(() => {
        console.log("Book:", book);
      }, [book]);

    return (
        <>
            <div>
                {book && (
                    <BookCard
                        key={book._id}
                        title={book.title}
                        author={book.author}
                        image={book.image?.url}
                        category={book.category}
                        rating={book.rating}
                        readingStatus={book.readingStatus}
                        readDate={book.readDate}
                        isFavorite={book.isFavorite}
                        onClick={() => navigate(`/books/${book._id}`)}
                    />
                )}
            </div>
        </>
    )
}

export default Details