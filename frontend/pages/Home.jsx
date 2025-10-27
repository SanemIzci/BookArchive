import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LibraryImage from '../assets/Library.jpg';

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div 
        className='absolute inset-0 bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `url(${LibraryImage})`,
          opacity: 0.8
        }}
      />
      
      <div className='absolute inset-0 bg-white/30' />
      
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-20'>
        <div className='max-w-4xl text-center'>
          <div className='mb-8'>
            <h1 className='text-5xl md:text-7xl font-noto-italic-bold text-[#272935] mb-4 drop-shadow-[2px_2px_4px_rgba(255,255,255,0.8)]'>
              Book Archive
            </h1>
            <p className='text-xl md:text-2xl text-gray-700 font-medium drop-shadow-[1px_1px_2px_rgba(255,255,255,0.8)]'>
              Your Personal Reading Companion
            </p>
          </div>

          <div className='bg-[#dfdbd0] backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-xl mb-8'>
            <h2 className='text-3xl md:text-4xl font-noto-italic-bold text-[#272935] mb-6 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]'>
              About Us
            </h2>
            <div className='text-lg text-gray-700 space-y-4'>
              <p className='drop-shadow-[1px_1px_2px_rgba(255,255,255,0.5)]'>
                BookArchive is your personal library management system designed to help you track, 
                organize, and remember your reading journey.
              </p>
              <p className='drop-shadow-[1px_1px_2px_rgba(255,255,255,0.5)]'>
                Whether you're an avid reader or just starting your literary adventure, our platform 
                helps you keep track of what you've read, what you're currently reading, and what 
                you plan to explore next.
              </p>
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-6 mb-8'>
            <div className='bg-[#dfdbd0] backdrop-blur-sm rounded-lg p-6 shadow-lg'>
              <div className='text-4xl mb-4 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]'>📚</div>
              <h3 className='text-xl font-noto-italic-bold text-[#272935] mb-2 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]'>
                Track Your Books
              </h3>
              <p className='text-gray-700 drop-shadow-[1px_1px_2px_rgba(255,255,255,0.5)]'>
                Log every book you read with details about authors, categories, and ratings.
              </p>
            </div>
            
            <div className='bg-[#dfdbd0] backdrop-blur-sm rounded-lg p-6 shadow-lg'>
              <div className='text-4xl mb-4 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]'>⭐</div>
              <h3 className='text-xl font-noto-italic-bold text-[#272935] mb-2 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]'>
                Rate & Review
              </h3>
              <p className='text-gray-700 drop-shadow-[1px_1px_2px_rgba(255,255,255,0.5)]'>
                Share your thoughts and rate books to remember your favorites forever.
              </p>
            </div>
            
            <div className='bg-[#dfdbd0] backdrop-blur-sm rounded-lg p-6 shadow-lg'>
              <div className='text-4xl mb-4 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]'>📊</div>
              <h3 className='text-xl font-noto-italic-bold text-[#272935] mb-2 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]'>
                Reading Insights
              </h3>
              <p className='text-gray-700 drop-shadow-[1px_1px_2px_rgba(255,255,255,0.5)]'>
                View statistics about your reading habits and discover your preferences.
              </p>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            {!isAuth ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className='w-full sm:w-auto px-8 py-4 bg-[#d6a49b] hover:bg-[#dfdbd0] text-white text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg'
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className='w-full sm:w-auto px-8 py-4 bg-white/90 hover:bg-white text-[#d6a49b] text-lg font-medium rounded-lg border-2 border-[#d6a49b] transition-colors duration-200 shadow-lg'
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className='w-full sm:w-auto px-8 py-4 bg-[#d6a49b] hover:bg-[#dfdbd0] text-white text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg'
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;