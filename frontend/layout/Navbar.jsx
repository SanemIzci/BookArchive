import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchUserProfile } from '../redux/UserSlice';
import { logout } from '../redux/AuthSlice';
import { MdOutlineLogout } from 'react-icons/md';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Log Books', path: '/log-books' },
    { label: 'Favorites', path: '/favorites' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    window.location.href='/'
    alert('Logged out successfully!');
  };

  return (
    <div className="flex h-screen">
      {/* Burger Button - only on mobile */}
      <button
        className="fixed top-4 left-4 z-30 text-2xl md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:fixed top-0 left-0 h-full shadow-2xl w-[2/5]  md:w-64
          p-2 transition-transform duration-300 z-20
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0`}
      >
      <div className="flex flex-row items-center bg-transparent">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-auto sm:h-6 md:h-10 lg:h-50 mx-3 cursor-pointer"
        />
      </div>



      <nav className="flex flex-col gap-0 w-full">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="w-full py-3 px-4 flex items-center gap-4 rounded hover:bg-[#d6a49b] opacity-75 transition"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-base w-full">{item.label}</span>
          </Link>
        ))}
          {!isAuth && (
            <Link
              to="/login"
              className="w-full px-3 py-3 flex items-center gap-4 rounded hover:bg-[#2D68FE] opacity-50 transition text-left"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-base">Login</span>
            </Link>
          )}
        </nav>

        {isAuth && (
          <button
            onClick={handleLogout}
            className="w-full px-3 py-3 flex items-center gap-4 rounded hover:bg-[#2D68FE] opacity-50 transition text-left absolute bottom-20 left-0"
          >
            <MdOutlineLogout size={22} />
            <span className="text-base">Logout</span>
          </button>
        )}

        {user && (
          <div className="absolute bottom-4 left-0 w-full px-3 py-3 flex items-center gap-4 bg-white rounded">
            <img
              src={user.avatar?.url}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border"
              onClick={()=>{
                navigate('/profile')
              }}
            />
            <span className="text-sm">{user.email}</span>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      )}

      <div>{/* Page content would go here */}</div>
    </div>
  );
}

export default Navbar;


