import { createSlice } from '@reduxjs/toolkit';

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?._id;
};

const getCartKey = () => {
  const userId = getUserId();
  return userId ? `cart_${userId}` : 'cart_guest';
};

const loadCartState = () => {
  const cartData = localStorage.getItem(getCartKey());
  return cartData ? JSON.parse(cartData) : { items: [], totalAmount: 0 };
};

const saveCartState = (state) => {
  localStorage.setItem(getCartKey(), JSON.stringify({
    items: state.items,
    totalAmount: state.totalAmount
  }));
};

const initialState = {
  ...loadCartState(),
  isCartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
      
      saveCartState(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
      
      saveCartState(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      localStorage.removeItem(getCartKey());
    },
    syncCart: (state) => {
      const newState = loadCartState();
      state.items = newState.items;
      state.totalAmount = newState.totalAmount;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    }
  }
});

export const { addToCart, removeFromCart, clearCart, syncCart, toggleCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
