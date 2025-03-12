import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from "../assets/heroimg.jpg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      if (value && !validateName(value)) {
        setValidationErrors(prev => ({
          ...prev,
          name: 'Name should only contain English alphabets'
        }));
      } else {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.name;
          return newErrors;
        });
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateName(formData.name)) {
      setValidationErrors(prev => ({
        ...prev,
        name: 'Name should only contain English alphabets'
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const result = await dispatch(signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })).unwrap();

      if (result.success || result.message === "User registered successfully!") {
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert(err?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      {/* Banner Section */}
      <div className="relative h-[200px]" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-md"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold">Create Account</h1>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-md mx-auto mt-8 p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded focus:outline-none focus:border-gray-500 ${
                  validationErrors.name ? 'border-red-500' : ''
                }`}
                placeholder="Enter your full name"
                required
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:border-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:border-gray-500"
                placeholder="Create password"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:border-gray-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition-colors"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account? {' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
