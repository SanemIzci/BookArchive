import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <div className='md:h-40 h-30 flex flex-col items-center gap-2 z-0'>
      <div>
        {/* Bilgilendirme */}
        
        <div className='flex flex-col gap-2 items-center mx-auto text-wrap'>
          <p className='font-cormorant'>Deep dive in books</p>
          <h1 className='text-xl md:text-3xl font-noto'>Your Personal Library</h1>
          <p className="hidden md:block">
            Create your personal library, track your books, and analyze your reading habits.
          </p>
          <p className='hidden md:block'>Gather the books you've read or want to read. Build your own book collection, keep track, and record your thoughts.</p>
        </div>
      </div>

      <div className='flex flex-col'>         
        <div className="flex flex-wrap gap-4 mb-6 mx-auto items-center">
          <a href="/about" className="hover:underline">About</a>
          <a href="/profile" className="hover:underline">Profile</a>
          <a href="/dashboard" className="hover:underline">Book Shelve</a>
          <a href="/favorites" className="hover:underline">Favorites</a>
        </div>

        <div className='flex flex-row md:space-x-4  space-x-2' >
          <p>© {new Date().getFullYear()} Sanem İzci - Book Archive</p>
          <div className="flex space-x-2 text-xl md:mt-1">
            <a href="https://github.com/sanemizci" target="_blank" className="hover:text-gray-900" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/sanemizci" target="_blank" className="hover:text-blue-600" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:sanem@example.com" className="hover:text-red-500">
              <FaEnvelope />
            </a>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer