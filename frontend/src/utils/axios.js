import axios from 'axios';
import store from '../redux/store';
import { logout, refreshToken } from '../redux/slices/authSlice';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response?.data?.isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshToken()).unwrap();
        const newToken = store.getState().auth.token;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
