import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { register } from '../redux/UserSlice.js';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: '',
    password: '',
    avatar: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user} = useSelector(state => state.user);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result // base64 string burada
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  useEffect(()=>{
    if(user && !loading && !error){
      navigate('/login');
    }
  },[user, loading, error, navigate]);

  return (

    <div className='flex min-h-screen'>
      <div className='flex-1 flex items-center justify-center m'>
      <div className='bg-white shadow-lg flex flex-col items-center justify-center' style={{ width: 500, height: 500 }}>
      <h2 className='mb-6 text-center text-2xl font-extrabold text-gray-900'>Register</h2>
      <form className='w-full space-y-4 ' onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            type="name"
            required
            className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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

        </div>
        <input
          name="password"
          type="password"
          required
          className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
          value={formData.password}
          onChange={handleChange}
        />
        <div>
          <input
          name="avatar"
          type="file"
          required
          onChange={handleChange}
          />
        </div>
        <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Registering' : 'Register'}
        </button>


      </form>
      </div>
    </div>
    </div>
  )
}

export default Register