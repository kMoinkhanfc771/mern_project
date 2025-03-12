import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../redux/slices/adminAuthSlice';
import { FaBoxOpen, FaClipboardList, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import img from "../assets/img.png";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/auth');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link to="/admin">
          <img src={img} alt="Logo" className="h-14 cursor-pointer" />
        </Link>
        <Link to="/admin" className="text-black text-2xl font-semibold">Dashboard</Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-lg font-medium">
        <li>
          <Link to="/admin/add-product" className="text-black hover:text-gray-600 px-4 flex items-center gap-2">
            <FaBoxOpen />
            Add Product
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="text-black hover:text-gray-600 px-4 flex items-center gap-2">
            <FaClipboardList />
            Get Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/update-orders" className="text-black hover:text-gray-600 px-4 flex items-center gap-2">
            <FaEdit />
            Update Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/delete-orders" className="text-black hover:text-gray-600 px-4 flex items-center gap-2">
            <FaTrash />
            Delete Orders
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="flex space-x-6 text-2xl text-black px-4">
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;


