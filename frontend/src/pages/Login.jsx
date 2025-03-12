import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from "../assets/heroimg.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const { loading, error, isAuthenticated } = auth || { loading: false, error: null, isAuthenticated: false };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      <div className="relative h-[200px]" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-md"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold">Login</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-8 p-6 relative">
        {/* Admin Login Link */}
        <div className="absolute -right-48 top-0 bg-red-50 p-4 rounded-lg shadow-sm border border-red-100">
          <Link 
            to="/admin/auth" 
            className="text-red-600 hover:text-red-700 flex flex-col items-center"
          >
            <span className="text-sm font-medium">Admin Access</span>
            <span className="text-xs">Click here for Admin Login & Register</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          User Login
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
