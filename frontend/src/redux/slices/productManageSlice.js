import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products';

export const addProduct = createAsyncThunk(
  'productManage/addProduct',
  async (productFormData, { rejectWithValue }) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) return rejectWithValue('Admin authentication required');

      const response = await axios.post(`${API_URL}/add`, productFormData, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

const productManageSlice = createSlice({
  name: 'productManage',
  initialState: {
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearProductStatus: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProductStatus } = productManageSlice.actions;
export default productManageSlice.reducer;
