import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ProductSinglePage from "./pages/ProductSinglePage"
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Checkout from "./pages/Checkout";
import Register from "./pages/Register"; // Add this import
import AdminAuth from './pages/AdminAuth';
import AdminRoute from './components/AdminRoute';
import AdminNavbar from './components/AdminNavbar';
import { useSelector } from 'react-redux';
import GetOrders from './pages/admin/GetOrders';
import UpdateOrders from './pages/admin/UpdateOrders';
import DeleteOrders from './pages/admin/DeleteOrders';
import AddProduct from './pages/admin/AddProduct';  // Add this import
import './utils/axiosConfig';  // Add this import at the top
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import OrderConfirmation from './pages/OrderConfirmation';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated: isAdminAuthenticated } = useSelector(state => state.adminAuth);
  const { isAuthenticated: isUserAuthenticated } = useSelector(state => state.auth);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            {/* Protected routes */}
            <Route path="/shop" element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <ProductSinglePage />
              </ProtectedRoute>
            } />
            {/* Public routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/admin/auth" element={
              <PublicRoute>
                <AdminAuth />
              </PublicRoute>
            } />
            {/* Admin routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <Navigate to="/admin/orders" replace />
              </AdminRoute>
            } />
            <Route path="/admin/add-product" element={
              <AdminRoute>
                <AddProduct />  {/* Replace div with actual component */}
              </AdminRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminRoute>
                <GetOrders />
              </AdminRoute>
            } />
            <Route path="/admin/update-orders" element={
              <AdminRoute>
                <UpdateOrders />
              </AdminRoute>
            } />
            <Route path="/admin/delete-orders" element={
              <AdminRoute>
                <DeleteOrders />
              </AdminRoute>
            } />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/admin/login" element={<AdminAuth />} />
          </Route>
        </Routes>
      </Router>
    </PersistGate>
  );
}

export default App;
