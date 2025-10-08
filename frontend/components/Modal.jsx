import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../redux/BookSlice'
import { userSlice } from '../redux/UserSlice'
import { Listbox } from '@headlessui/react';
import StarRating from './StarRating';
import Button from './Button'
function Modal() {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.book);
  
  const categories = [
    "Novel", "Science", "Biography", "Fantasy", "History",
    "Mystery", "Romance", "Thriller", "Self-Help", "Philosophy",
    "Poetry", "Travel", "Health", "Business", "Technology",
    "Religion", "Art", "Children", "Young Adult", "Classic", "Comics", "Other"
  ];

  const [formData, setFormData] = useState({ 
    title: "",
    author: "",
    category: "Select Category",
    readingStatus: "to-read",
    startDate: "",
    readDate: "",
    rating: 0,
    review: "",
    isFavorite: false,
    image: ""
  });

  // Update form data when user changes
  useEffect(() => {
    if (isAuth && user) {
      setFormData(prevData => ({ ...prevData, user: user.id || user }));
    }
  }, [isAuth, user]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuth && formData.title && formData.author) {
      dispatch(addBook(formData));
      // Reset form after successful submission
      if (success) {
        setFormData({
          title: "",
          author: "",
          category: "Other",
          readingStatus: "to-read",
          startDate: "",
          readDate: "",
          rating: 0,
          review: "",
          isFavorite: false,
          image: ""
        });
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file' && files && files[0]) {
      // Handle file input
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prevData => ({
          ...prevData,
          image: reader.result // This will be a base64 string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // Handle other inputs
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  return (
    
    
    <div className='w-[70%] mx-auto md:w-[70%] md:h-1/2 lg:w-[50%] my-10 md:mx-auto h-1/2 bg-[#dfdbd0] rounded-lg shadow-lg text-gray-700 '>
      <div className='text-2xl font-bold text-center pt-5'>Add Book</div>
      <div className='flex flex-col items-center justify-center mx-5 p-5'>
        <form onSubmit={handleSubmit} className='w-full max-w-md'>
          <div className='mb-4'>
            {formData.image && (
              <img src={formData.image} alt="book" className='w-32 h-32 object-cover mx-auto mb-4 bg-white rounded-lg' />
            )}
          </div>
          <div className='space-y-4'>
            <input 
              type="text" 
              name="title"
              placeholder='Title' 
              value={formData.title} 
              onChange={handleInputChange}
              className='w-full p-2 border rounded bg-white hover:bg-[#b6b9a4]'
              required
            />
            <input 
              type="text" 
              name="author"
              placeholder='Author' 
              value={formData.author} 
              onChange={handleInputChange}
              className='w-full p-2 border rounded bg-white hover:bg-[#b6b9a4]'
              required
            />
            <Listbox value={formData.category} onChange={(value) => setFormData({...formData, category: value})}>
              <Listbox.Button className="w-full p-2 border rounded bg-white hover:bg-[#b6b9a4] text-left">
                {formData.category}
              </Listbox.Button>
              <Listbox.Options className="border rounded mt-1 bg-  shadow-md max-h-60 overflow-auto z-10">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category}
                    value={category}
                    className={({ active }) =>
                      `cursor-pointer p-2 ${
                        active ? 'bg-[#b6b9a4] text-black' : 'bg-white text-gray-700'
                      }`
                    }
                  >
                    {category}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            <select 
              name="readingStatus"
              value={formData.readingStatus} 
              onChange={handleInputChange}
              className='w-full p-2 border rounded bg-white hover:bg-[#b6b9a4]'
            >
              <option value="to-read">To Read</option>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
            </select>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input 
              type="date" 
              name="startDate"
              placeholder='Start Date' 
              value={formData.startDate} 
              onChange={handleInputChange}
              className='w-full p-1 border rounded bg-white hover:bg-[#b6b9a4]'
            />
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input 
              type="date" 
              name="readDate"
              placeholder='Read Date' 
              value={formData.readDate} 
              onChange={handleInputChange}
              className='w-full p-1 border rounded bg-white hover:bg-[#b6b9a4]'
            />



            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <StarRating 
                rating={formData.rating}
                onRatingChange={(rating) => {
                  console.log('Rating changed to:', rating);
                  setFormData(prevData => ({ ...prevData, rating: rating }));
                }}
                interactive={true}
              />
            </div>
            
            <textarea 
              name="review"
              placeholder='Review' 
              value={formData.review} 
              onChange={handleInputChange}
              className='w-full p-2 border rounded bg-white hover:bg-[#b6b9a4]'
              rows="3"
            />

            <div className='flex items-center justify-center gap-x-1'>
            <label htmlFor='image'>Select Image</label>
            <input 
              type="file" 
              name="image"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
              className='w-full p-2 border rounded bg-white hover:bg-[#b6b9a4]'
            />
            </div>
            <div className='flex items-center justify-center'>
            <Button
            name='Add Book'
            size='lg'
            type='submit'
            disabled={loading}
            onClick={handleSubmit}
            >
              {loading ? 'Adding Book...' : 'Add Book'}
            </Button>
            </div>
            
            
          </div>
        </form>
        
        {error && (
          <div className='text-red-500 mt-4'>{error}</div>
        )}
        
        {success && (
          <div className='text-green-500 mt-4'>Book added successfully!</div>
        )}
      </div>
    </div>
  )
}

export default Modal