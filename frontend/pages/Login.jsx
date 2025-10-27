import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/UserSlice';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, accessToken } = useSelector(state => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  return (
    <div className="flex h-screen">
    
      <div className="flex-1 flex items-center justify-center m">
        <div className="bg-white shadow-lg rounded-lg" style={{ width: 500, height: 500 }} >
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h2 className="mb-6 text-center text-xl md:text-3xl font-noto-italic-bold">
              Sign in to your account
            </h2>
            <div className="w-full px-8">
              <form className="w-full space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#d6a49b] focus:border-[#d6a49b] focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div> 
                  <input
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#d6a49b] focus:border-[#d6a49b] focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#d6a49b] hover:bg-[#dfdbd0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6a49b] disabled:opacity-50 transition-colors duration-200"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
                <div className='text-center'>
                  <p>Don't have an account? <Link to="/register" className="text-[#d6a49b] hover:text-[#dfdbd0] hover:underline transition-colors"> Register</Link></p>
                </div>
                <div className='text-center'>
                  <p>Forgot Password<Link to="/forgotPassword" className="text-[#d6a49b] hover:text-[#dfdbd0] hover:underline transition-colors"> Forgot?</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 