import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../app/slices/authSlice';
import { loginUser } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Loader } from '../../index';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await loginUser({ email, password });

      dispatch(
        loginSuccess({
          token: data.token,
          user: data.user,
        })
      );

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-animation px-6">
      <div className="w-full max-w-lg bg-zinc-800 shadow-lg rounded-lg p-10 relative z-10">

        {/* Title */}
        <h2 className="text-4xl font-bold text-teal-400 text-center mb-8">Login</h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-bold rounded-lg flex items-center justify-center transition transform duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-400 hover:scale-105'
            }`}
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-teal-400 hover:underline hover:text-teal-300 transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
      {loading && <Loader />}
      {/* <Loader/> */}
    </div>
  );
}

export default Login;
