import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import bgImage from "../assets/heroimg.jpg";
import logo from "../assets/img.png";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);

  // Remove useEffect as we're using local storage directly

  const formatPrice = (price) => price.toLocaleString();

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className='bg-[#f9f5f0] font-sans'>
      {/* Banner */}
      <div className="relative text-center h-[330px] flex justify-center items-center" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" , backgroundPosition: "center"}}>
        <div className="absolute w-full h-full bg-white bg-opacity-50 backdrop-blur-md"></div>
        <div className="relative z-10">
          <img src={logo} alt="Logo" className="h-16 w-auto mx-auto" />
          <h1 className="text-4xl font-bold">Cart</h1>
          <p className="text-2xl text-gray-800"><strong>Home</strong> &gt; Cart</p>
        </div>
      </div>
      
      {/* Cart Section */}
      <div className="container mx-auto p-6 flex flex-wrap lg:flex-nowrap gap-6">
        {/* Cart Items */}
        <div className="w-full lg:w-3/4 p-6 rounded-xl">
          {items.length === 0 ? (
            <div className="text-center py-12">Your cart is empty</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FCEBD5] text-black">
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td className="p-4 flex items-center">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg mr-4" />
                      {item.name}
                    </td>
                    <td className="p-4">Rs. {formatPrice(item.price)}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4 font-semibold">Rs. {formatPrice(item.price * item.quantity)}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleRemoveItem(item._id)} className="text-red-500 hover:text-red-700">
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Cart Totals */}
        <div className="w-full lg:w-1/4 bg-[#FCEBD5] p-6 mt-6  shadow-md">
          <h3 className="text-3xl font-bold mb-4 text-center">Cart Totals</h3>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="text-gray-500">Rs. {formatPrice(totalAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-[#C89C5D]">Rs. {formatPrice(totalAmount)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full mt-8 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
            disabled={items.length === 0}
          >
            {items.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
