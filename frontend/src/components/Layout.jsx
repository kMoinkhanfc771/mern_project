import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeCart } from '../redux/slices/cartSlice';
import CartSidebar from './CartSidebar';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector(state => state.cart);
  const { isAuthenticated: isAdminAuthenticated } = useSelector(state => state.adminAuth);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Outlet />
      {!isAdminRoute && (
        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => dispatch(closeCart())} 
        />
      )}
    </>
  );
};

export default Layout;
