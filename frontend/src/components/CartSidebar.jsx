import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/slices/cartSlice';
import { FaTrash, FaTimes } from 'react-icons/fa';

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:text-gray-600">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 170px)' }}>
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Your cart is empty</div>
          ) : (
            items.map(item => (
              <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item._id)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">Rs. {totalAmount.toLocaleString()}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
