import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/UserSlice';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [token,Settoken]=useState('');
    const [newpassword,SetNewPassword]=useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const {loading,state,error}=useSelector(state => state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()


    const handleSubmit=(e)=>{
        e.preventDefault();
        if (newpassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        if (newpassword.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }
        dispatch(resetPassword({ resetToken: token, password: newpassword }))
        window.location.href='/login'

    }

  return (
    <div className='flex min-h-screen'>
    <div className='flex-1 flex items-center justify-center m'>
        <div className='bg-white shadow-lg rounded-lg flex flex-col items-center justify-center' style={{ width: 500, height: 500 }}>
            <h2 className='mb-6 text-center text-2xl font-extrabold text-gray-900'>Reset Password</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div>
                    <input 
                        placeholder="Enter reset token from email"
                        onChange={(e) => Settoken(e.target.value)}
                        value={token}
                        name="token"
                        type="token"
                        required
                        className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                </div>
                <div>
                    <input 
                        placeholder="password"
                        onChange={(e) => SetNewPassword(e.target.value)}
                        value={newpassword}
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                </div>
                <div>
                    <input 
                        placeholder="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                </div>
                <div>
                    <button 
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Reset'}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default ResetPassword