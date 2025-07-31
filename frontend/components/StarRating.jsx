import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, totalStars = 5, onRatingChange, interactive = false }) => {
    const filledStars = Math.round(rating);
  
    const handleStarClick = (index) => {
      if (interactive && onRatingChange) {
        onRatingChange(index + 1);
      }
    };
  
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (_, index) => (
          <FaStar
            size={20}
            key={index}
            className={`cursor-${interactive ? 'pointer' : 'default'} ${
              index < filledStars ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => handleStarClick(index)}
          />
        ))}
      </div>
    );
  };
  
  export default StarRating;