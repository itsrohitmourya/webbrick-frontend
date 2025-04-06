import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/slices/authSlice';
import { User, LogOut, Menu, X } from 'lucide-react';  // Icons for UX

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);  // For mobile menu toggle

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');  // Redirect to login after logout
    setMenuOpen(false);   // Close menu on logout
  };

  return (
    <nav className="bg-zinc-900 h-18 text-white shadow-lg w-[100vw] z-50 sticky top-0 flex justify-center items-center">
      <div className="px-4 lg:px-12 flex justify-between items-center h-16 w-full lg:w-[70%]">

        {/* 🔥 Logo & Navigation Links */}
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-500 flex justify-center items-center gap-2 transition">
          <img
            src="/icon2.png"
            alt="logo"
            className='h-auto w-10'
          />
          <span className='text-3xl bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent font-extrabold font-[Poppins] mt-[4px]'>
            WebBrick
          </span>
        </Link>

        {/* ✅ Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>

          {/* Authenticated User Info */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowTooltip((prev) => !prev)}
                className="flex justify-center items-center hover:text-blue-400 transition overflow-hidden h-8 w-8"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
                className='h-full w-full' viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </button>

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute right-0 mt-2 w-44 bg-zinc-800 text-white shadow-lg rounded-md z-10">
                  <div className="p-4">
                    <p className="text-sm mb-3">Hello, {user?.username || 'User'}</p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition">
              LogIn
            </Link>
          )}
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white mt-2 hover:text-blue-400 transition"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-zinc-900 shadow-lg z-40 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <div className="flex flex-col gap-6 p-8">
          <Link
            to="/"
            className="text-lg hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/dashboard"
            className="text-lg hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/contact"
            className="text-lg hover:text-blue-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {/* Authenticated User Info */}
          {isAuthenticated ? (
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <User size={24} />
                <span className="text-lg">{user?.username || 'User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-lg hover:text-blue-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              LogIn
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Overlay when mobile menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Nav;
