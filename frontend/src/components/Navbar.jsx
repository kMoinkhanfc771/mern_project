import React from 'react';
import { FaUser, FaShoppingCart, FaHeart, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import img from "../assets/img.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img src={img} alt="Logo" className="h-14 cursor-pointer" />
        </Link>
        <Link to="/" className="text-black text-2xl font-semibold">Furniro</Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-lg font-medium">
        <li><Link to="/" className="text-black hover:text-gray-600 px-4">Home</Link></li>
        <li><Link to="/shop" className="text-black hover:text-gray-600 px-4">Shop</Link></li>
        <li><Link to="/blog" className="text-black hover:text-gray-600 px-4">Blog</Link></li>
        <li><Link to="/contact" className="text-black hover:text-gray-600 px-4">Contact</Link></li>
      </ul>

      {/* Icons */}
      <div className="flex space-x-6 text-2xl text-black px-4">
        <Link to="/profile"><FaUser className="hover:text-gray-600 cursor-pointer" /></Link>
        <Link to="/search"><FaSearch className="hover:text-gray-600 cursor-pointer" /></Link>
        <Link to="/wishlist"><FaHeart className="hover:text-gray-600 cursor-pointer" /></Link>
        <Link to="/cart" className="relative">
          <FaShoppingCart className="hover:text-gray-600 cursor-pointer" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt size={20} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
