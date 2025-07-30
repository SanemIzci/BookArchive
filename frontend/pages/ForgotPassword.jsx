import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ForgotPassword } from '../redux/UserSlice';

const [email1,setEmail1]=useState('')
    const [email2,setEmail2 ]=useState('')

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { loading, error, user}=useSelector(state=>state.user)

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (email1.trim() !== email2.trim()) {
          alert("Emails do not match");
          return;
        }
    
        dispatch(ForgotPassword(email1.trim()));
      };
    
function ForgotPassword() {
    
  return (
    <div className=' flex min-h-screen'>
        <div className='flex-1 flex items-center justify-center m-5'>
            <div className='bg-white shadow-lg flex flex-col items-center justify-center' style={{ width: 500, height: 500 }}   >
            <h2 className='mb-6 text-center text-2xl font-extrabold text-gray-900'>Forgot password</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <Input 
                placeholder="Enter your email"
                onChange={(e) => setEmail1(e.target.value)}
                value={email1}
                name="email"
                type="email"
                required
            />
            </div>
            <div>
                <Input 
                placeholder="Confirm your email"
                onChange={(e) => setEmail2(e.target.value)}
                value={email2}
                name="email"
                type="email"
                required
            />
            </div>
            </form>
            </div>
        </div>


    </div>
  )
}

export default ForgotPassword