import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import bgImage from "../assets/heroimg.jpg";
import logo from "../assets/img.png";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);
  const { loading } = useSelector(state => state.order);
  
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const formatPrice = (price) => price.toLocaleString();

  const handleInputChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!billingDetails.firstName || !billingDetails.phoneNumber || !billingDetails.streetAddress) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const orderData = {
        items: items.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        shippingAddress: billingDetails,
        totalAmount
      };

      const result = await dispatch(createOrder(orderData)).unwrap();
      
      if (result.success) {
        // Navigate to confirmation page
        navigate(`/order-confirmation/${result.order._id}`);
      }
    } catch (err) {
      alert(err?.message || 'Failed to place order');
    }
  };

  return (
    <div className="bg-[#f9f5f0] min-h-screen">
      {/* Banner Section */}
      <div className="relative text-center h-[330px] flex justify-center items-center mb-8"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        <div className="absolute w-full h-full bg-white bg-opacity-60 backdrop-blur-md"></div>
        <div className="relative z-10">
          <img src={logo} alt="Logo" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-2xl text-gray-800">
            <span className="hover:text-gray-600 cursor-pointer">Home</span>
            <span className="mx-2">&gt;</span>
            <span className="font-semibold">Checkout</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between lg:flex-row gap-8">
                {/* Left Side - Billing Details */}
      <div className="w-1/2  p-6  rounded-md">
        <h2 className="text-4xl font-bold mb-4">Billing details</h2>
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={billingDetails.firstName}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={billingDetails.lastName}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Company Name (Optional)</label>
            <input
              type="text"
              name="companyName"
              value={billingDetails.companyName}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Country / Region</label>
            <select 
              name="country"
              value={billingDetails.country}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-md"
            >
              <option>Sri Lanka</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={billingDetails.streetAddress}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={billingDetails.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-semibold">Payment Method:</span>
              <span className="ml-2">Cash on Delivery</span>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold flex items-center justify-center"
            >
              {loading ? 'Processing...' : 'Place Order - Cash on Delivery'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className=" rounded-xl  p-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item._id} className="flex  gap-4 py-2 border-b">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="font-semibold">Rs. {formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>Rs. {formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rs. {formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 text-center mt-2">
                  You'll pay cash at the time of delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
