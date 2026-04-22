import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};

    if (status === 401) {
      store.dispatch(logout());
      toast.error('Session expired. Please login again.');
      // Optionally redirect: window.location.href = '/login';
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status === 404) {
      toast.error(data?.message || 'The requested resource was not found.');
    } else if (status === 422) {
      toast.error(data?.message || 'Validation failed. Please check your inputs.');
    } else if (status >= 500) {
      toast.error('Server error. Our team is looking into it.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
    } else if (!error.response) {
      toast.error('Network error. Check your internet connection.');
    } else {
      toast.error(data?.message || 'An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default api;
