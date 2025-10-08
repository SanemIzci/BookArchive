import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import Button from '../components/Button'

function Footer() {
  return (
    <footer className='w-full bg-[#dfdbd0] text-gray-700'>
      <div className='flex flex-col items-center gap-2 py-2'>
        <div>
          {/* Bilgilendirme */}
          
          <div className='flex flex-col gap-2 items-center mx-auto text-wrap'>
            <p className='font-cormorant-italic text-[1.2rem] leading-relaxed text-gray-700 max-w-3xl mx-auto text-center'>Deep dive in books</p>
            <h1 className='text-xl md:text-3xl font-noto-italic-bold'>Your Personal Library</h1>
            <p className="hidden md:block font-cormorant-italic text-[1.3rem] leading-relaxed text-gray-700 max-w-3xl mx-auto text-center">
              Create your personal library, track your books, and analyze your reading habits.
            </p>
            <p className='hidden md:block font-cormorant-italic text-[1.2rem] leading-relaxed text-gray-700 max-w-3xl mx-auto text-center'>Gather the books you've read or want to read. Build your own book collection, keep track, and record your thoughts.</p>
          </div>
        </div>

        <div className='flex flex-col'>         
          <div className="flex flex-nowrap gap-4 mb-6 mx-auto items-center justify-center">
            <Button href="/about" size="sm" name="About" font="font-cormorant-italic text-[1.2rem]  text-gray-700 text-center"/>
            <Button href="/profile" size="sm" name="Profile" font="font-cormorant-italic text-[1.2rem]  text-gray-700  text-center"/>
            <Button href="/dashboard" size="sm" name="Dashboard" font="font-cormorant-italic text-[1.2rem]  text-gray-700  text-center"/>
            <Button href="/favorites" size="sm" name="Favorites" font="font-cormorant-italic text-[1.2rem]  text-gray-700 text-center"/>
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
    </footer>
  )
}

export default Footer