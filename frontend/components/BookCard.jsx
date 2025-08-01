import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import StarRating from './StarRating';

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
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs hover:shadow-lg transition flex flex-col items-center space-y-1">
        <button className='self-end'>
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
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">{author}</p>
        </div>
        
      </div>

      <span className="text-xs mt-1 inline-block bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
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

      <button
        onClick={onClick}
        className="mt-3 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        Detay
      </button>
    </div>
  );
};

export default BookCard;