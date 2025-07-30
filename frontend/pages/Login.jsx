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
    <div className="flex min-h-screen">
      {/* Navbar solda, ana içerik ortalanıyor */}
      <div className="flex-1 flex items-center justify-center m">
        <div className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-center" style={{ width: 500, height: 500 }} >
          <h2 className="mb-6 text-center text-2xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <div className='text-center'>
              <p>Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline"> Register</Link></p>
            </div>
            <div className='text-center'>
              <p>Forgot Password<Link to="/forgotPassword" className="text-indigo-600 hover:underline"> Forgot?</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login; 