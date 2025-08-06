import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../redux/BookSlice'; 
import { useEffect } from 'react';
import BookCard from '../components/BookCard';  
import Loading from '../components/Loading.jsx';
import { useNavigate } from 'react-router-dom';

function Favorites() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favorites, loading, error } = useSelector((state) => state.book);
    
    useEffect(() => {
        dispatch(getFavorites());
    }, [dispatch]);
    
    return (
        <div className="min-h-screen bg-[#f0eee2] px-4 md:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-noto-italic-bold text-[#272935] mb-2">
                        My Favorites
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        {favorites?.length || 0} favorite book{favorites?.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-lg text-gray-600">Loading your favorites...</div>
                        <Loading/>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-red-600 text-center">
                            <p className="text-lg font-medium mb-2">Error loading favorites</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && (!favorites || favorites.length === 0) && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <p className="text-gray-600 text-lg mb-2">No favorite books yet</p>
                            <p className="text-gray-500 text-sm">Start adding books to your favorites!</p>
                        </div>
                    </div>
                )}

                {/* Favorites Grid */}
                {!loading && !error && favorites && favorites.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((favorite) => (
                            <BookCard  
                                _id={favorite._id}
                                key={favorite._id}
                                title={favorite.title}
                                author={favorite.author}
                                image={favorite.image?.url}
                                category={favorite.category}
                                rating={favorite.rating}
                                readingStatus={favorite.readingStatus}  
                                isFavorite={favorite.isFavorite}
                                onClick={() => navigate(`/books/${favorite._id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites