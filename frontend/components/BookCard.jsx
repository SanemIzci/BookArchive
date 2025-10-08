import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import StarRating from './StarRating';
import { toggleFavorite } from '../redux/BookSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
const BookCard = ({
  title,
  author,
  image,
  category,
  rating,
  readingStatus,
  readDate,
  isFavorite,
  onClick,
  _id,
  onFavoriteToggle
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleToggleFavorite = async () => {
    try {
      await dispatch(toggleFavorite({id:_id})).unwrap();
      // Reload favorites list after successful toggle
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  } 
  return (
    <div className="bg-[#dfdbd0]  rounded-xl shadow-md p-4 w-full max-w-xs hover:shadow-lg transition flex flex-col items-center space-y-1 justify-center">
        <button 
          className='self-end'
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" size={20}/>
          ) : (
            <FaRegHeart className="text-gray-400" size={20}/>
          )}
        </button>
      {image && (
        <img
          src={image}
          alt={title}   
          className="w-full h-50 object-contain rounded-md mb-3"
        />
      )}
       <div className="w-full text-center">
        <h3 className="text-lg font-noto-italic-bold">{title}</h3>
        <p className="text-gray-600 text-sm">{author}</p>
      </div>

      <span className="text-xs mt-1 inline-block bg-[#d6a49b] text-gray-700 px-2 py-0.5 rounded-full">
        {category}
      </span>

      <label className="block text-gray-700 mb-2">Rating</label>
        <StarRating
            rating={rating || 0}
            interactive={false}
        />

      <span className="text-sm text-gray-500">
        {readingStatus === 'completed' && readDate
          ? `Okundu: ${new Date(readDate).toLocaleDateString()}`
          : `Status: ${readingStatus}`}
      </span>


      <Button
        onClick={() => navigate(`/books/${_id}`)}
        name="Detay"
        size="sm"
        color="#d6a49b"
      />

      
    </div>
  );
};

export default BookCard;