import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/BookSlice.js';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const { books, loading, error } = useSelector((state) => state.book);
 
  const { isAuth, user } = useSelector((state) => state.user);

  useEffect(() => {
   
    if (!isAuth) {
      navigate('/login');
      return;
    }
    

    dispatch(getBooks());
  }, [dispatch, isAuth, navigate]);

  
  if (!isAuth) {
    return <div className="flex justify-center items-center h-screen">Redirecting to login...</div>;
  }
  const HandleRoute=()=>{
    navigate('details')
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Books</h2>
        
      </div>

      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

      <div className="flex w-full md:w-[1/4] space-x-4">
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookCard
              _id={book._id}
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
          ))
        ) : (
          !loading && ( 
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No books are added yet</p>
              <button 
                onClick={HandleRoute}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Your First Bookq
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
