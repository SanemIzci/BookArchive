import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { forgot } from '../redux/UserSlice';
import Footer from '../layout/Footer';

function ForgotPassword() {
    const [email1, setEmail1] = useState('')
    const [email2, setEmail2] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Check you email for the reset token")
        if (email1.trim() !== email2.trim()) {
          alert("Emails do not match");
          return;
        }
    
        dispatch(forgot(email1.trim()));
        
        setTimeout(() => {
            navigate('/resetPassword');
        }, 2000);
    };
    
    return (
        <div className='flex min-h-screen flex-col'>
            <div className='flex-1 flex items-center justify-center'>
                <div className='bg-white shadow-lg rounded-lg flex flex-col items-center justify-center' style={{ width: 500, height: 500 }}>
                    <h2 className='mb-6 text-center text-2xl font-extrabold text-gray-900'>Forgot password</h2>
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div>
                            <input 
                                placeholder="Enter your email"
                                onChange={(e) => setEmail1(e.target.value)}
                                value={email1}
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#d6a49b] focus:border-[#d6a49b] focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div>
                            <input 
                                placeholder="Confirm your email"
                                onChange={(e) => setEmail2(e.target.value)}
                                value={email2}
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#d6a49b] focus:border-[#d6a49b] focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#d6a49b] hover:bg-[#dfdbd0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6a49b] disabled:opacity-50 transition-colors duration-200"
                            >
                                {loading ? 'Sending...' : 'Send Reset Token'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ForgotPassword