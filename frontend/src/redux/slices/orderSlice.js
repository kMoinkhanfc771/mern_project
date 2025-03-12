import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearCart } from './cartSlice';

const API_URL = 'http://localhost:8000/api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const response = await axios.post(
        'http://localhost:8000/api/orders/create', 
        orderData, 
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Dispatch clearCart action after successful order
      if (response.data.success) {
        await dispatch(clearCart());
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'order/fetchAll',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        return rejectWithValue('Admin authentication required');
      }

      let url = `${API_URL}/orders/all`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await axios.get(url, {
        headers: { 
          'Authorization': `Bearer ${adminToken}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('isAdmin');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    loading: false,
    error: null,
    success: false,
    orders: []
  },
  reducers: {
    clearOrderStatus: (state) => {
      state.error = null;
      state.success = false;
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentOrder = action.payload.order;
        state.error = null;
        // Clear cart data from localStorage here as backup
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
