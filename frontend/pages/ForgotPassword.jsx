import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { forgot } from '../redux/UserSlice';

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
        <div className='flex min-h-screen'>
            <div className='flex-1 flex items-center justify-center m'>
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
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Reset Token'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword