import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postReview, getReviews, updateReview } from '../redux/BookSlice'

function Review({ bookId }) {
  const [reviewText, setReviewText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, success, currentReview } = useSelector((state) => state.book)
  const { user } = useSelector((state) => state.user)

  // Component mount olduğunda mevcut review'ı getir
  useEffect(() => {
    if (bookId) {
      dispatch(getReviews(bookId))
    }
  }, [bookId, dispatch])

  // Mevcut review varsa textarea'ya yükle
  useEffect(() => {
    if (currentReview) {
      setReviewText(currentReview)
      setIsEditing(true)
    }
  }, [currentReview])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reviewText.trim()) {
      alert('Please write a review before submitting')
      return
    }

    try {
      if (isEditing) {
        // Mevcut review'ı güncelle
        await dispatch(updateReview({ id: bookId, review: reviewText })).unwrap()
        alert('Review updated successfully!')
      } else {
        // Yeni review ekle
        await dispatch(postReview({ id: bookId, review: reviewText })).unwrap()
        setReviewText('')
        setIsEditing(true)
        alert('Review posted successfully!')
      }
    } catch (error) {
      console.error('Failed to handle review:', error)
      alert('Failed to handle review. Please try again.')
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setReviewText('')
  }

  return (
    <div className='w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-[#b6b9a4] shadow-[-30px_30px_30px_10px_#00000040] rounded-lg md:rounded-none'>
      <div className='w-full px-4 md:px-8 py-6 md:py-8'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 md:space-y-6'>
          <label htmlFor="review" className="text-sm md:text-base font-medium text-gray-700">
            {isEditing ? 'Edit your review' : 'Add a review'}
          </label>
          <textarea 
            id="review" 
            rows="4" 
            className="block p-3 md:p-4 w-full text-sm md:text-base text-gray-900 bg-[#dfdbd0] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" 
            placeholder="Write your thoughts here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={loading}
          />
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              type="submit"
              disabled={loading || !reviewText.trim()}
              className="flex-1 px-4 py-2 md:py-3 bg-[#dfdbd0] text-gray-700 font-medium rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#c8c4b8] transition-colors"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Review' : 'Post Review')}
            </button>
            
            {isEditing && (
              <button 
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 px-4 py-2 md:py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
          
          {error && <p className="text-red-600 text-sm md:text-base text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Review