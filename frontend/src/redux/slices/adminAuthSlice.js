import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export const loginAdmin = createAsyncThunk('adminAuth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, 
      {
        email: credentials.email,
        password: credentials.password,
        secretKey: credentials.secretKey
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('isAdmin', 'true');
      return response.data;
    }

    throw new Error(response.data.message || 'Login failed');
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || 
      'Invalid admin credentials'
    );
  }
});

export const logoutAdmin = createAsyncThunk('adminAuth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    return { success: true };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    admin: null,
    isAuthenticated: localStorage.getItem('isAdmin') === 'true',
    loading: false,
    error: null
  },
  reducers: {
    adminLogout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('isAdmin');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.user;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.isAuthenticated = false;
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
