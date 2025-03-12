import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../redux/slices/adminAuthSlice';
import bgImage from "../assets/heroimg.jpg";

const AdminAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.adminAuth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    secretKey: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.email || !formData.password || !formData.secretKey) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const result = await dispatch(loginAdmin(formData)).unwrap();
      if (result.success) {
        navigate('/admin/orders');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      alert(err || 'Invalid admin credentials. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      {/* Banner Section */}
      <div className="relative h-[200px]" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-md"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold">Admin Login</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-8 p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border rounded focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-3 border rounded focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Admin Secret Key</label>
              <input
                type="password"
                value={formData.secretKey}
                onChange={(e) => setFormData({...formData, secretKey: e.target.value})}
                className="w-full p-3 border rounded focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to User Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
