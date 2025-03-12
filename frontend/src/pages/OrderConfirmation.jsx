import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, Navigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { currentOrder } = useSelector(state => state.order);

  if (!currentOrder) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Thank You for Your Order!</h1>
            <p className="text-gray-600 mt-2">Order #{orderId}</p>
          </div>

          <div className="border-t border-b py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order Total:</span>
              <span>Rs. {currentOrder.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Delivery Address:</span>
              <span className="text-right">
                {currentOrder.shippingAddress.streetAddress}<br />
                {currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}<br />
                {currentOrder.shippingAddress.phoneNumber}
              </span>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/" 
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
